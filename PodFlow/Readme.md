# PodFlow: A Platform for Listening and Uploading Podcasts

## Introduction

**PodFlow** is a user-friendly platform designed for podcast enthusiasts to listen to their favorite podcasts and upload their own. Built with a modern tech stack, PodFlow ensures a seamless and engaging user experience. The backend is powered by **Node.js** with **Express**, and **MongoDB**, while the frontend leverages **React** for an interactive interface.

---

## Key Features

- **Podcast Streaming**: Users can browse, search, and listen to a variety of podcasts.
- **Podcast Uploads**: Registered users can upload their own podcasts with ease.
- **Authentication**: Secure user login and registration using **JWT**.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Management**: dotenv

---

## Folder Structure

```
PodFlow/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── podcastController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Podcast.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── podcastRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── app.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PodcastCard.js
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── UploadPage.js
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

---

## Setup and Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud-based)
- **npm** or **yarn**

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   DB_URI=mongodb://localhost:27017/podflow
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```bash
   npm run server
   ```
   The backend will run at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


3. Start the React application:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:3000`.

---

## How to Run

1. Start the backend server:
   ```bash
   cd backend
   npm run server
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

---

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login for existing users.

### Podcasts

- **GET** `/api/podcasts`: Fetch all podcasts.
- **POST** `/api/podcasts/upload`: Upload a new podcast.

### Users

- **GET** `/api/users/me`: Fetch logged-in user details.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to the branch:
   ```bash
   git push origin feature-name
   ```
4. Submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy PodFlow and share your voice with the world! 🌟