# EventFlow Backend API Documentation

This document provides an overview of the backend API for EventFlow and how frontend developers can interact with it.

## Base URL
The base URL for the API is:
```
http://localhost:3000/api
```

## Authentication
### 1. **Register User**
- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "User registered successfully",
    "user": {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "user",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

### 2. **Login User**
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "JWT_TOKEN",
    "user": {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "user"
    }
  }
  ```

### 3. **Google Authentication**
- **Endpoint**: `/auth/google`
- **Method**: `GET`
- Redirects to Google for authentication.

## Events
### 1. **Create Event**
- **Endpoint**: `/events/create`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body** (Form Data):
  ```json
  {
    "title": "Event Title",
    "date": "2023-01-01",
    "time": "14:00",
    "location": "Event Location",
    "description": "Event Description",
    "image": <file>
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Event created successfully",
    "event": {
      "title": "Event Title",
      "date": "2023-01-01",
      "time": "14:00",
      "location": "Event Location",
      "description": "Event Description",
      "imageUrl": "https://example.com/image.jpg"
    }
  }
  ```

### 2. **Get All Events**
- **Endpoint**: `/events/allEvents`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "events": [
      {
        "title": "Event Title",
        "date": "2023-01-01",
        "time": "14:00",
        "location": "Event Location",
        "description": "Event Description",
        "imageUrl": "https://example.com/image.jpg",
        "isRegistered": false,
        "isSaved": false
      }
    ]
  }
  ```

### 3. **RSVP to Event**
- **Endpoint**: `/events/rsvp/:id`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "message": "You have successfully registered for the event"
  }
  ```

### 4. **Save Event**
- **Endpoint**: `/events/save/:id`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "message": "Event saved successfully"
  }
  ```

## Password Management
### 1. **Request Password Reset**
- **Endpoint**: `/password/request-password-reset`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Password reset email sent"
  }
  ```

### 2. **Reset Password**
- **Endpoint**: `/password/reset-password/:token`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "password": "newpassword123"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Password has been updated"
  }
  ```

## Admin
### 1. **Become Admin**
- **Endpoint**: `/admin`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "msg": "User has been promoted to admin"
  }
  ```

## Notes
- All protected routes require a valid JWT token in the `Authorization` header.
- For file uploads, use `multipart/form-data` with the `image` field.
- Ensure to handle errors and edge cases on the frontend based on the response codes and messages.

