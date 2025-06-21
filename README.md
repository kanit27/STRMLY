# STRMLY

STRMLY is a decentralized entertainment platform built with a React frontend and a Node.js/Express backend. Users can sign up, log in, upload videos, and view a feed of uploaded content. The project uses MongoDB for data storage and Cloudinary for video hosting.

---

## Environment Variables

### Backend (`Backend/.env`)

```
MONGO_URL=mongodb://localhost:27017/strmly
PORT=3000
JWT_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

- **MONGO_URL**: MongoDB connection string.
- **PORT**: Port for the backend server.
- **JWT_KEY**: Secret key for JWT authentication.
- **CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET**: Credentials for Cloudinary video hosting.

---

### Frontend (`Frontend/.env`)

```
VITE_API_URL=http://localhost:3000/api
```

- **VITE_API_URL**: Base URL for backend API requests.

---

## How It Works

- **Authentication**: Users can sign up and log in. JWT tokens are used for authentication and stored in localStorage.
- **Protected Routes**: Only authenticated users can access `/feed`, `/upload`, and `/profile`.
- **Video Upload**: Authenticated users can upload videos (MP4) to Cloudinary.
- **Feed**: All uploaded videos are displayed in the feed.
- **Profile**: Users can view their profile and their uploaded videos.

---

## Getting Started

### Backend

1. Install dependencies:
   ```
   cd Backend
   npm install
   ```
2. Set up `.env` with your MongoDB and Cloudinary credentials.
3. Start the server:
   ```
   node app.js
   ```

### Frontend

1. Install dependencies:
   ```
   cd Frontend
   npm install
   ```
2. Set up `.env` with the backend API URL.
3. Start the development server:
   ```
   npm run dev
   ```

---

## Notes

- Make sure MongoDB and your Cloudinary account are set up and accessible.
- The backend must be running before starting the frontend for API requests to work.
- For production, update CORS and environment variables as needed.

---
