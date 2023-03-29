CREATE TABLE IF NOT EXISTS orders (
   id SERIAL PRIMARY KEY,
   title VARCHAR,
   description VARCHAR,
   status BOOLEAN,
   created_at TIMESTAMP,
   return_date TIMESTAMP,
   customer_id INTEGER,
   car_id INTEGER,
   -- FOREIGN KEY (customer_id) REFERENCES customers (id),
   -- FOREIGN KEY (car_id) REFERENCES cars (id)
);
