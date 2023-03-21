CREATE TABLE IF NOT EXISTS customers (
   id SERIAL PRIMARY KEY,
   name VARCHAR,
   description VARCHAR,
   email VARCHAR,
   age INTEGER,
   driver_license VARCHAR,
   created_at TIMESTAMP,
   updated_at TIMESTAMP
);