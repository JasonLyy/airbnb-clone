# AirBnb Clone

## Overview
This project was started to be the learning platform for new languages/tools/technologies. 

The primary goal was to learn some Go. 

## Features
- Basic search
- Show Listings
- Show Listing
- Authentication (which has no purpose other than to authenticate :P)

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
cd backend
go run cmd/fixtures/main.go
```

## Development

### Sample Inputs 

You need to load fixtures data to use the sample app in any meaningful way. Some working search inputs include: 

```
Melbourne, Victoria, Australia
Braybrook, Victoria, Australia
Sunshine, Victoria, Australia
```

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

### Tests 
Not many tests to run as that wasn't the point of this sample project but...
```
go test -v ./...
```

## Deploy

```
cd infra
cdk deploy --all --output-files ./cdk-outputs.json
```