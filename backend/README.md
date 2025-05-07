# Authentication API

This is a complete authentication system with signup, signin, and protected routes using JWT.

## Setup

1. Copy the example environment file and update the values:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your PostgreSQL database and update the `.env` file with your database credentials.

4. Reset the database (this will drop and recreate the users table):
   ```bash
   npm run reset-db
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Sign Up
- **URL**: `POST /signup`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "status": 201,
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "created_at": "2023-01-01T00:00:00.000Z"
      },
      "token": "jwt.token.here"
    }
  }
  ```

### Sign In
- **URL**: `POST /signin`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Login successful",
    "data": {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "created_at": "2023-01-01T00:00:00.000Z"
      },
      "token": "jwt.token.here"
    }
  }
  ```

### Get Current User (Protected)
- **URL**: `GET /me`
- **Headers**:
  ```
  Authorization: Bearer your.jwt.token.here
  ```
- **Response**:
  ```json
  {
    "status": 200,
    "message": "User profile retrieved successfully",
    "data": {
      "id": 1,
      "email": "user@example.com",
      "created_at": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

## Error Responses

### 400 Bad Request
```json
{
  "status": 400,
  "message": "User already exists with this email"
}
```

### 401 Unauthorized
```json
{
  "status": 401,
  "message": "Invalid email or password"
}
```

### 401 Unauthorized (Invalid/Missing Token)
```json
{
  "status": 401,
  "message": "No token, authorization denied"
}
```

## Protected Routes

All routes under `/user` are protected and require a valid JWT token in the Authorization header:
```
Authorization: Bearer your.jwt.token.here
```

## Security

- Passwords are hashed using bcrypt before being stored in the database
- JWT tokens are used for stateless authentication
- Passwords are never returned in API responses
