-- Create the database if not already there
CREATE DATABASE IF NOT EXISTS customer_db;
USE customer_db;
-- Create the customers table
DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    country VARCHAR(100),
    credit_limit DECIMAL(10, 2)
);
-- Insert sample data
INSERT INTO customers (customer_name, country, credit_limit)
VALUES ('Alice Smith', 'USA', 5000.00),
    ('Alice Smith', 'USA', 5500.00),
    ('Bob Johnson', 'Canada', 6000.00),
    ('Charlie Lee', 'UK', 4500.00),
    ('Charlie Lee', 'UK', 4700.00),
    ('David Kim', 'South Korea', 5200.00);
-- Query: Average credit limit by customer and country
SELECT customer_name,
    country,
    AVG(credit_limit) AS average_credit_limit
FROM customers
GROUP BY customer_name,
    country;