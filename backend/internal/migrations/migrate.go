package migrations

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/jackc/pgx/v4"
)

type Migration struct {
	TableName string
	Dir       string
	Columns   []string
}

type Migrations struct {
	Migrations []Migration
}

type Migrator interface {
	migrate() error
}

//todo: update this such that it is a transaction for ALL the migrations and returns count of all rows updated
func (m *Migrations) Migrate() error {
	for _, migration := range m.Migrations {
		file, err := os.Open(migration.Dir)
		if err != nil {
			return err
		}

		_, err = migrateCSV(file, migration.TableName, migration.Columns)
		if err != nil {
			return err
		}
	}

	return nil
}

func migrateCSV(reader io.Reader, table string, columns []string) (int64, error) {
	db, err := InitConnection()
	if err != nil {
		return -1, err
	}
	defer db.Close(context.Background())

	tx, err := db.BeginTx(context.Background(), pgx.TxOptions{})
	if err != nil {
		return -1, err
	}

	// disable trigger to allow 'dirty' airbnb dataset to be inserted
	_, err = tx.Exec(context.Background(), fmt.Sprintf("ALTER TABLE %s DISABLE TRIGGER ALL", table))
	if err != nil {
		return -1, err
	}

	// insert data from csv
	res, err := tx.Conn().PgConn().CopyFrom(
		context.Background(),
		reader,
		fmt.Sprintf(
			"COPY %s (%s) FROM STDIN (FORMAT csv, HEADER, DELIMITER ',')",
			table,
			strings.Join(columns, ","),
		),
	)
	if err != nil {
		return -1, err
	}

	// re-enable the triggers after 'dirty' insert
	_, err = tx.Exec(context.Background(), fmt.Sprintf("ALTER TABLE %s ENABLE TRIGGER ALL", table))
	if err != nil {
		return -1, err
	}

	// update index to be max of imported data. PK MUST be singular of table name and id (i.e. if table is guests, PK is guest_id)
	_, err = tx.Exec(
		context.Background(),
		fmt.Sprintf("SELECT setval('%ss_%s_id_seq', COALESCE((SELECT MAX(%s_id)+1 FROM %ss), 1), false)",
			table[:len(table)-1],
			table[:len(table)-1],
			table[:len(table)-1],
			table[:len(table)-1],
		))
	if err != nil {
		return -1, err
	}

	tx.Commit(context.Background())

	return res.RowsAffected(), nil
}
