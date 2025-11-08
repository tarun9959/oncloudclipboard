# Deployment Guide

This guide will help you deploy the Cloud Clipboard application to various cloud platforms.

## Prerequisites

Before deploying, ensure you have:

1. A MongoDB Atlas account with a cluster set up
2. A GitHub account with the repository cloned
3. Accounts on your chosen deployment platforms (Render, Vercel, etc.)

## Backend Deployment

### Option 1: Render

1. Go to [Render](https://render.com/) and create an account
2. Click "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: cloud-clipboard-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables in the "Advanced" section:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key
   - `PORT`: 5000 (Render will set this automatically)
6. Click "Create Web Service"

### Option 2: Railway

1. Go to [Railway](https://railway.app/) and create an account
2. Click "New Project" and select "Deploy from GitHub repo"
3. Connect your GitHub repository
4. Railway will automatically detect it's a Node.js project
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key
6. Deploy the application

### Option 3: Heroku (Alternative)

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Log in to Heroku: `heroku login`
3. Create a new app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGO_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_secret_key
   ```
5. Deploy: `git push heroku main`

## Frontend Deployment

### Option 1: Vercel

1. Go to [Vercel](https://vercel.com/) and create an account
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
5. Add environment variables if needed
6. Deploy the application

### Option 2: Netlify

1. Go to [Netlify](https://netlify.com/) and create an account
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
5. Deploy the site

## Environment Variables

### Backend Variables

```bash
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/cloudclipboard?retryWrites=true&w=majority
JWT_SECRET=your_very_strong_secret_key_here
PORT=5000
```

### Frontend Considerations

The frontend makes API calls to `/api/*` which are proxied to the backend during development. 
In production, you'll need to set the full backend URL in your frontend configuration.

Create a `.env.production` file in the frontend directory:
```bash
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Then update your API calls in the frontend components to use this base URL.

## Domain Configuration

### Custom Domain on Render

1. In your Render dashboard, go to your web service
2. Click "Settings" tab
3. Scroll to "Custom Domains"
4. Add your domain and follow the DNS instructions

### Custom Domain on Vercel

1. In your Vercel dashboard, go to your project
2. Click "Settings" then "Domains"
3. Add your domain
4. Follow the DNS configuration instructions

## Monitoring and Logging

### Render Monitoring

Render provides built-in monitoring:
- Visit your service dashboard
- Check the "Logs" tab for real-time logs
- Set up alerts in the "Settings" tab

### Error Tracking

Consider integrating error tracking services:
- [Sentry](https://sentry.io/)
- [Rollbar](https://rollbar.com/)

## Scaling Considerations

### Database

MongoDB Atlas clusters can be scaled up as needed:
1. Go to your Atlas dashboard
2. Select your cluster
3. Click "Scale Cluster"
4. Adjust the tier as needed

### Backend

Most deployment platforms automatically scale based on demand:
- Render: Automatic scaling based on traffic
- Railway: Automatic scaling
- Vercel: Serverless functions automatically scale

## Security Best Practices

1. **Environment Variables**: Never commit secrets to version control
2. **CORS**: Restrict CORS origins in production
3. **HTTPS**: Ensure all platforms use HTTPS (most do by default)
4. **JWT Expiration**: Consider shorter token expiration times for production
5. **Rate Limiting**: Implement rate limiting for API endpoints

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check your MONGO_URI
   - Ensure IP whitelist includes your deployment platform
   - Verify database user credentials

2. **CORS Errors**
   - Update CORS configuration in `server.js`
   - Add your frontend domain to allowed origins

3. **Build Failures**
   - Check build logs on your deployment platform
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

### Getting Help

If you encounter issues:
1. Check the deployment platform's logs
2. Verify all environment variables are set correctly
3. Ensure your MongoDB Atlas cluster is accessible
4. Check that you're using the correct Node.js version (16+ recommended)