<<<<<<< HEAD
# Cloud Clipboard MVP

A secure, cloud-based platform that allows users to save, share, and manage clipboard items called Clip Cards.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Clip Cards**: Support for Text, Link, and Code snippets
- **Sharing**: Unique share codes with expiry timers
- **Access Logging**: Track who accesses your clips
- **Auto-deletion**: Expired clips are automatically deleted

## Technology Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT + bcrypt
- **Frontend**: React.js
- **Deployment**: Render/Railway (Backend), Vercel (Frontend)

## Setup & Installation

### MongoDB Setup

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. In the "Network Access" section, add your IP address or allow access from anywhere (0.0.0.0/0)
4. In the "Database Access" section, create a new database user
5. Get your connection string from the "Connect" button in your cluster dashboard
6. Replace `<username>`, `<password>`, and `<cluster-url>` with your actual credentials

### Environment Variables

Create a `.env` file in the `backend` directory:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Example MONGO_URI format:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/cloudclipboard?retryWrites=true&w=majority
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint           | Description                   |
|--------|--------------------|-------------------------------|
| POST   | /api/auth/signup   | Register a new user           |
| POST   | /api/auth/signin   | Login & get JWT               |
| POST   | /api/clip/add      | Create a new clip             |
| GET    | /api/clip/:code    | Retrieve a clip using share code |
| GET    | /api/clip/:id/logs | Get clip access logs          |

## Folder Structure

```
cloud-clipboard/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Clip.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── clip.js
│   └── middleware/
│       └── authMiddleware.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ClipForm.jsx
│   │   │   └── ClipView.jsx
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│
└── README.md
```

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command to: `npm install`
4. Set the start command to: `npm start`
5. Add environment variables in the Render dashboard:
   - MONGO_URI
   - JWT_SECRET
   - PORT (Render will set this automatically)

### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the build command to: `npm run build`
4. Set the output directory to: `build`
5. Set the install command to: `npm install`

### Database (MongoDB Atlas)

Continue using your MongoDB Atlas cluster. Make sure to update the IP whitelist if needed.

## Development

### Running Locally

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. The application will be available at:
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:3000

## Security Considerations

- Always use environment variables for sensitive data
- JWT tokens are set to expire in 30 days
- Passwords are hashed using bcrypt
- CORS is enabled for development but should be restricted in production
=======
# oncloudclipboard
>>>>>>> 3a1a09409866c1b6206690e17a5b6bf5970963e0
