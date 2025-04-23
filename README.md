# Online Book Exchange Platform - Authentication Module

This repository contains the authentication and user management module of the Online Book Exchange Platform. This module handles user registration, admin approval, and login functionality.

## Features

1. **User Authentication**

   - User registration with profile picture
   - Login with JWT authentication
   - Admin approval required for new accounts

2. **Admin Panel**
   - Review and approve new user registrations
   - User management dashboard
   - Email notifications sent upon user approval

## Tech Stack

- Node.js & Express.js
- MySQL
- Tailwind CSS
- JWT Authentication
- Bcrypt Password Hashing
- Nodemailer

## Setup Instructions

1. **Clone the repository**

   ```
   git clone <repository-url>
   cd book-exchange-platform
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file with:

   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=book_exchange_db
   JWT_SECRET=your_jwt_secret_key
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. **Set up database**

   - Create MySQL database named `book_exchange_db`
   - Run the SQL script in `config/database.sql`

5. **Start the application**

   ```
   npm start
   ```

   Development mode:

   ```
   npm run dev
   ```

6. **Access the application**
   Open `http://localhost:3000` in your browser

## Note

This is only the authentication and user management module. The book exchange functionality will be implemented in future updates.
