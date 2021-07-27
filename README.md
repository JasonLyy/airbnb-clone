# AirBnb Clone

## Overview
This project was started to be the learning platform for new languages/tools/technologies. 

The primary goal was to learn some Go. 

## Current Bugs
- Need to fix case where redis invalidates JWT but frontend does not reflect this.

## Pre-requisites 
- Go
- Yarn
- Docker

## Getting Started

```
docker-compose up -f docker-compose.yml -f docker-compose.override.yml up
```

## Loading Fixtures Data 
Real datasets from Airbnb are loaded via fixtures (which explains the large CSV files). Ensure the backend is running before loading fixtures.

```
go run cmd/fixtures/main.go
```

## Development

### GraphQL

To generate the queries/mutations on the frontend:
```
cd frontend
yarn generate
```

To generate the resolvers on the backend:
```
cd backend
go run generate
```