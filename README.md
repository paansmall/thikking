# Thikking - Authentication System

A secure customer login system built with Node.js, Express, and MongoDB.

## Features

- User Registration & Login
- Secure Password Hashing (bcrypt)
- JWT Token Authentication
- Email & Password Storage
- Responsive UI
- Session Management

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Security**: bcrypt, JWT

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB

### Setup

1. Clone repository
   ```bash
   git clone https://github.com/paansmall/thikking.git
   cd thikking
   ```

2. Install backend dependencies
   ```bash
   cd server
   npm install
   ```

3. Create `.env` file in server folder
   ```
   MONGODB_URI=mongodb://localhost:27017/thikking
   JWT_SECRET=your_secret_key_here
   PORT=5000
   ```

4. Start MongoDB
   ```bash
   mongod
   ```

5. Run server
   ```bash
   npm start
   ```

6. Open frontend
   ```
   http://localhost:5000
   ```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user (protected)

## License

MIT