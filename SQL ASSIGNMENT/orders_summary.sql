-- Create the database
CREATE DATABASE IF NOT EXISTS orders_db;
USE orders_db;
-- Create the orderdetails table
DROP TABLE IF EXISTS orderdetails;
CREATE TABLE orderdetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productCode VARCHAR(50),
    quantityOrdered INT,
    priceEach DECIMAL(10, 2)
);
-- Insert sample data
INSERT INTO orderdetails (productCode, quantityOrdered, priceEach)
VALUES ('P001', 10, 25.50),
    ('P001', 10, 25.50),
    ('P002', 5, 50.00),
    ('P003', 7, 30.00),
    ('P003', 7, 30.00),
    ('P004', 3, 100.00);
-- Query: Total price per product and quantity group
SELECT productCode,
    quantityOrdered,
    SUM(quantityOrdered * priceEach) AS total_price
FROM orderdetails
GROUP BY productCode,
    quantityOrdered;