COPY Guests FROM '/docker-entrypoint-initdb.d/guests.csv'
    WITH (FORMAT CSV, HEADER);

COPY Hosts FROM '/docker-entrypoint-initdb.d/hosts.csv'
    WITH (FORMAT CSV, HEADER);

COPY Listings FROM '/docker-entrypoint-initdb.d/listings.csv'
    WITH (FORMAT CSV, HEADER);

-- Hack: Disable reviews trigger to allow persisting on missing FK
-- As this dataset can contain listings taken down (or possibly)
-- due to Airbnb privacy reasons from their datasets.
BEGIN;
    ALTER TABLE reviews DISABLE TRIGGER ALL;

    COPY Reviews FROM '/docker-entrypoint-initdb.d/reviews_1.csv'
        WITH (FORMAT CSV, HEADER);
    COPY Reviews FROM '/docker-entrypoint-initdb.d/reviews_2.csv'
        WITH (FORMAT CSV, HEADER);
    
    ALTER TABLE reviews ENABLE TRIGGER ALL;
    -- update review_id to be MAX of all ids (inc. imported)
    SELECT setval('reviews_review_id_seq', COALESCE((SELECT MAX(review_id)+1 FROM reviews), 1), false); 
COMMIT;
