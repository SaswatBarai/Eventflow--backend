# EventFlow Backend

EventFlow Backend is a Node.js and Express-based authentication system that supports local and Google OAuth authentication. It uses MongoDB as a database and integrates session management with `express-session` and `connect-mongo`.

## Features
- User registration and login with validation
- Google OAuth authentication
- Session-based authentication using `express-session`
- JWT-based authentication support
- Secure password handling with bcrypt
- Environment variables support via `dotenv`

## Tech Stack
- **Backend**: Node.js, Express.js
- **Authentication**: Passport.js (Local & Google OAuth)
- **Database**: MongoDB with Mongoose
- **Session Management**: `express-session` with `connect-mongo`
- **Validation**: `express-validator`
- **Environment Management**: `dotenv`

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/eventflow-backend.git
   cd eventflow-backend
   ```

2. **Install dependencies**
   ```sh
   pnpm install
   ```

3. **Create a `.env` file** and add the required environment variables (refer to `.env.example`):
   ```plaintext
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   ```

4. **Run the server**
   ```sh
   pnpm dev
   ```
   The server runs on `http://localhost:3000` by default.

## API Endpoints

### Auth Routes (`/api/auth`)
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Log in with email and password

### Google OAuth (`/auth`)
- `GET /auth/google` – Redirect to Google login
- `GET /auth/google/callback` – Google OAuth callback
- `GET /auth/profile` – Get the logged-in user's profile
- `GET /auth/logout` – Logout the user

## Folder Structure
```
eventflow-backend/
│── routes/
│   ├── authRoute.js
│   ├── googleAuth.js
│── controllers/
│── utils/
│   ├── validate.login.js
│   ├── validate.reg.js
│── config/
│── app.js
│── package.json
│── .gitignore
│── .env (not committed)
```

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

