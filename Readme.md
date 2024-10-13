# Online Quiz API

This is a RESTful API for a basic online quiz application built with Node.js and Express.js. It allows users to register, login, and manage multiple choice quizzes.

## Features

- **User Authentication:**
  - User registration with email and password.
  - User login with JWT authentication.
- **Quiz Management:**
  - Create new quizzes with multiple choice questions (single correct answer, four options).
  - Get a list of all quizzes.
  - Get details of a specific quiz.
  - Take a quiz and submit answers.
  - View quiz results.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token) for authentication

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Annany2002/QuizApp.git

   ```

2. **Install dependencies:**

   ```bash
   cd online-quiz-api
   npm install

   ```

3. **Configure environment variables:**
   Create a .env file in the root directory and add the following:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key

   ```

4. **Start the Server:**

   ```bash
       npm run dev
   ```

## API Endpoints

### User Authentication

- > **POST** /api/users/register: Register a new user.
- > **POST** /api/users/login: Login an existing user.

## Quiz Management (requires authentication)

- > **GET** /api/quizzes/all: Get a list of all quizzes.
- > **GET** /api/quizzes/:quizId: Get details of a specific quiz.
- > **GET** /api/quizzes/:quizId/results: View results for a quiz.
- > **POST** /api/quizzes/create: Create a new quiz.
- > **POST** /api/quizzes/:quizId/take: Take a quiz and submit answers.
