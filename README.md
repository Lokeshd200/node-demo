# Backend API with Node.js, Express.js, PostgreSQL, and Firebase Authentication

## Overview

This project is a backend service built with Node.js and Express.js, integrating PostgreSQL for data storage and Firebase for authentication. The API includes user authentication, data retrieval, and CRUD operations.

## Features

- Firebase authentication with middleware to verify tokens.
- PostgreSQL database integration for user management.
- RESTful API endpoints for user CRUD operations.
- CORS enabled for frontend communication.
- Secure environment variables using `.env`.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL (pg library)
- Firebase Admin SDK
- dotenv (for environment variables)
- CORS (for cross-origin requests)

## Prerequisites

Ensure you have the following installed:

- [Node.js]
- [PostgreSQL]
- Firebase project setup with a service account JSON file.

## Installation & Setup

1. **Clone the repository:**

   git clone https://github.com/your-username/backend-api.git
   cd backend-api
   

2. **Install dependencies:**

   npm install


3. Create a `.env` file in the project root:


   PORT=3000
   DATABASE_URL=postgresql://username:password@hostname:port/database_name
   FIREBASE_SERVICE_ACCOUNT={"type": "service_account", "project_id": "your-project-id", ...}

   - Replace `username`, `password`, `hostname`, `port`, and `database_name` with your actual PostgreSQL credentials.
   - Obtain the `FIREBASE_SERVICE_ACCOUNT` JSON from your Firebase console.

4. **Run the server:**

   npm start
 
   The server should start on `http://localhost:3000`.

## API Endpoints

### **Authentication**

- `GET /protected` → Protected route (requires Firebase authentication).

### **User Management (PostgreSQL-based)**

- **Create User:** `POST /users`
  - Body: `{ "id": "uuid", "name": "John Doe", "email": "john@example.com" }`
- **Get User by ID:** `GET /users/:id`
- **Update User:** `PUT /users/:id`
  - Body: `{ "name": "New Name", "email": "new@example.com" }`
- **Delete User:** `DELETE /users/:id`

## Database Schema (PostgreSQL)

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




