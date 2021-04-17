CREATE TABLE IF NOT EXISTS guests (
  guest_id SERIAL PRIMARY KEY,
  first_name VARCHAR (100)
);

CREATE TABLE IF NOT EXISTS hosts (
  host_id SERIAL PRIMARY KEY,
  url VARCHAR(255),
  first_name VARCHAR(100),
  since VARCHAR(100),
  location VARCHAR(500),
  about VARCHAR(9000),
  is_superhost BOOLEAN,
  thumbnail_url VARCHAR(255),
  picture_url  VARCHAR(255),
  neighbourhood  VARCHAR(100),
  verifications VARCHAR[],
  identity_verified BOOLEAN
);

CREATE TABLE IF NOT EXISTS listings (
  listing_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(9000),
  neighbourhood_overview VARCHAR(1000),
  picture_url VARCHAR(255),
  neighbourhood VARCHAR(100),
  neighbourhood_cleansed VARCHAR(100),
  latitude DECIMAL(8,6),
  longitude DECIMAL(9,6),
  property_type VARCHAR(50),
  room_type VARCHAR(50),
  accommodates INTEGER,
  bathrooms INTEGER,
  bathrooms_text VARCHAR(50),
  bedrooms INTEGER,
  beds INTEGER,
  amenities VARCHAR[],
  price DECIMAL(19,4),
  minimum_nights INTEGER, 
  maximum_nights INTEGER,
  host_id INTEGER,
  CONSTRAINT fk_host
      FOREIGN KEY (host_id)
      REFERENCES hosts (host_id)
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY,
  review_date DATE,
  comment VARCHAR(10000),
  rating INTEGER, 
  guest_id INTEGER,
  listing_id INTEGER,

  CONSTRAINT fk_guest
    FOREIGN KEY (guest_id)
    REFERENCES Guests (guest_id),
  CONSTRAINT fk_listing
    FOREIGN KEY (listing_id)
    REFERENCES listings (listing_id)
);


