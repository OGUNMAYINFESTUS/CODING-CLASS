-- Create the database
CREATE DATABASE IF NOT EXISTS payment_db;
USE payment_db;
-- Create the payments table
DROP TABLE IF EXISTS payments;
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL
);
-- Insert sample data
INSERT INTO payments (payment_date, amount)
VALUES ('2025-04-25', 100.00),
    ('2025-04-25', 50.00),
    ('2025-04-26', 200.00),
    ('2025-04-26', 75.00),
    ('2025-04-27', 120.00),
    ('2025-04-28', 250.00),
    ('2025-04-28', 80.00),
    ('2025-04-29', 150.00),
    ('2025-04-29', 130.00),
    ('2025-04-30', 300.00),
    ('2025-05-01', 100.00),
    ('2025-05-01', 60.00),
    ('2025-05-02', 150.50),
    ('2025-05-02', 75.00),
    ('2025-05-03', 120.00),
    ('2025-05-03', 130.00),
    ('2025-05-04', 200.00),
    ('2025-05-05', 90.00),
    ('2025-05-05', 80.00),
    ('2025-05-06', 110.00),
    ('2025-05-06', 95.00),
    ('2025-05-07', 180.00),
    ('2025-05-07', 210.00),
    ('2025-05-08', 175.00),
    ('2025-05-08', 160.00);
-- Query: Show total amount per payment date (Top 5 most recent dates)
SELECT payment_date,
    SUM(amount) AS total_amount
FROM payments
GROUP BY payment_date
ORDER BY payment_date DESC
LIMIT 5;
-- Add a new version of payments table with check numbers
DROP TABLE IF EXISTS payments;
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_date DATE NOT NULL,
    checkNumber VARCHAR(20),
    amount DECIMAL(10, 2) NOT NULL
);
-- Insert sample data (includes check numbers)
INSERT INTO payments (payment_date, checkNumber, amount)
VALUES ('2025-04-25', 'CHK001', 100.00),
    ('2025-04-25', 'CHK001', 150.00),
    ('2025-04-26', 'CHK002', 200.00),
    ('2025-04-26', 'CHK002', 175.00),
    ('2025-04-27', 'CHK003', 120.00),
    ('2025-04-27', 'CHK003', 220.00),
    ('2025-04-28', 'CHK004', 80.00),
    ('2025-04-28', 'CHK004', 95.00);
--Query (Question 4): Highest payment per check number
SELECT checkNumber,
    MAX(amount) AS highest_amount
FROM payments
GROUP BY checkNumber;