-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS book_exchange_db;

-- Use the database
USE book_exchange_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    profile_picture VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO users (
    first_name, 
    last_name, 
    username, 
    password, 
    mobile_number, 
    address, 
    email, 
    is_approved, 
    is_admin
) 
VALUES (
    'Admin',
    'User',
    'admin',
    '$2b$10$mUDOBbTsJJllh7ew6vyBuejDWTcFnD5ps7tjxfHR2f7tzTGe5.QEy',
    'N/A',
    'N/A',
    'admin@bookexchange.com',
    TRUE,
    TRUE
) ON DUPLICATE KEY UPDATE username = username; 