-- 📁 answers.sql
-- 📝 Assignment: Database Indexing and Optimization
-- ✅ Section 1: Add Indexes and Analyze Performance
-- Create and use the database
CREATE DATABASE IF NOT EXISTS defest_computer_institute;
USE defest_computer_institute;
-- Create a sample users table
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);
-- Create a sample orders table
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productCode VARCHAR(50),
    orderDate DATE
);
-- Add an index on the email column in users table
CREATE INDEX idx_users_email ON users(email);
-- Composite index on orders (for productCode and orderDate)
CREATE INDEX idx_orders_product_date ON orders(productCode, orderDate);
-- Analyze performance of a query using EXPLAIN
EXPLAIN
SELECT *
FROM users
WHERE email = 'ogunmayinfestus@yahoo.com';
-- ✅ Section 2: Create User Accounts and Assign Roles
-- Create a new user with a strong password
CREATE USER 'data_analyst' @'localhost' IDENTIFIED BY 'StrongPass123';
-- Grant SELECT, INSERT, and UPDATE privileges on the database
GRANT SELECT,
    INSERT,
    UPDATE ON defest_computer_institute.* TO 'data_analyst' @'localhost';
-- Apply changes
FLUSH PRIVILEGES;
-- ✅ Section 3: Database Security and Access Control
-- View all MySQL users
SELECT user,
    host
FROM mysql.user;
-- Show privileges assigned to a specific user
SHOW GRANTS FOR 'data_analyst' @'localhost';
-- Best practice (comment): Use least privilege, avoid root for daily use, enforce password policies
-- ✅ Section 4: Advanced SQL Queries (Real-World Scenarios)
-- 1. Top 5 highest-paying customers
SELECT customerName,
    SUM(amount) AS total_paid
FROM customers
    JOIN payments ON customers.customerNumber = payments.customerNumber
GROUP BY customerName
ORDER BY total_paid DESC
LIMIT 5;
-- 2. Find products with no orders
SELECT productCode,
    productName
FROM products
WHERE productCode NOT IN (
        SELECT productCode
        FROM orderdetails
    );
-- 3. Monthly sales summary
SELECT DATE_FORMAT(paymentDate, '%Y-%m') AS month,
    SUM(amount) AS total_monthly_sales
FROM payments
GROUP BY month
ORDER BY month DESC;
-- 📚 Additional Assignment Questions
-- Question 1 🗑️
-- Drop an index named IdxPhone from the customers table
DROP INDEX IdxPhone ON customers;
-- Question 2 👤
-- Create a user named bob with a secure password (restricted to localhost)
CREATE USER 'bob' @'localhost' IDENTIFIED BY 'S$cu3r3!';
-- Question 3 🔑
-- Grant INSERT privilege on the salesDB database to bob
GRANT INSERT ON salesDB.* TO 'bob' @'localhost';
-- Question 4 🔐
-- Change the password for the user bob
ALTER USER 'bob' @'localhost' IDENTIFIED BY 'P$55!23';