CREATE TABLE [IF NOT EXISTS] customers (
   id serial PRIMARY KEY,
   name VARCHAR,
   description VARCHAR,
   email VARCHAR,
   created_date TIMESTAMP NOT NULL,
   age INT,
   driver_license VARCHAR,
);