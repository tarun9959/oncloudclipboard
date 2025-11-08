# Railway Deployment Guide

This guide will help you deploy your Cloud Clipboard application to Railway.

## Prerequisites

1. A [Railway](https://railway.app/) account (sign up with GitHub)
2. Git installed on your system
3. Your project pushed to a GitHub repository

## Part 1: Deploy Backend to Railway

### Step 1: Prepare Your Repository

Make sure your code is committed to Git:

```bash
git init
git add .
git commit -m "Prepare for Railway deployment"
```

Push to GitHub:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Create New Project on Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway will auto-detect your Node.js app

### Step 3: Configure Backend Service

1. Select the **backend** directory as your service root:
   - Click on your service
   - Go to **Settings** → **Service Settings**
   - Set **Root Directory**: `backend`

2. Add Environment Variables:
   - Go to **Variables** tab
   - Add the following variables:
     ```
     MONGO_URI=mongodb+srv://lunayoga31_db_user:tarun1234@cluster0.ozsbizd.mongodb.net/cloudclipboard?retryWrites=true&w=majority
     JWT_SECRET=your_secret_key_here_change_this
     PORT=5002
     NODE_ENV=production
     ```

3. **IMPORTANT**: Generate a new domain:
   - Go to **Settings** → **Networking**
   - Click **"Generate Domain"**
   - Copy the generated URL (e.g., `https://your-app.up.railway.app`)
   - **Save this URL** - you'll need it for the frontend!

### Step 4: Deploy Backend

Railway will automatically deploy your backend. Wait for the deployment to complete.

You can verify it's working by visiting:
```
https://your-backend-url.up.railway.app/
```

You should see: `{"message":"Cloud Clipboard API is running"}`

## Part 2: Deploy Frontend to Railway (Option 1)

### Step 1: Create Another Service for Frontend

1. In the same Railway project, click **"New Service"**
2. Select **"Deploy from GitHub repo"**
3. Choose the same repository
4. Set **Root Directory**: `frontend`

### Step 2: Configure Frontend Service

1. Add Environment Variables:
   - Go to **Variables** tab
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.up.railway.app
     ```
   - Replace `your-backend-url.up.railway.app` with your actual backend URL

2. Generate Domain:
   - Go to **Settings** → **Networking**
   - Click **"Generate Domain"**
   - Copy the URL

### Step 3: Update Backend CORS

1. Go back to your backend service
2. Add another environment variable:
   ```
   FRONTEND_URL=https://your-frontend-url.up.railway.app
   ```

3. Or set it to `*` for development (not recommended for production):
   ```
   FRONTEND_URL=*
   ```

## Part 2: Deploy Frontend to Vercel (Option 2 - Recommended)

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure Project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. Add Environment Variables:
   - Click **"Environment Variables"**
   - Add:
     ```
     Name: REACT_APP_API_URL
     Value: https://your-backend-url.up.railway.app
     ```

6. Click **"Deploy"**

### Step 3: Update Backend CORS

Add the Vercel URL to your backend environment variables on Railway:
```
FRONTEND_URL=https://your-frontend.vercel.app
```

## Testing Your Deployment

1. Visit your frontend URL
2. Try signing up with a new account
3. Create a clip
4. Share the code and access it

## Troubleshooting

### Backend Not Starting

- Check Railway logs: Go to service → **"Deployments"** → Click on latest deployment → View logs
- Verify all environment variables are set correctly
- Ensure MongoDB URI is correct and accessible

### Frontend Can't Connect to Backend

1. Check browser console for errors
2. Verify `REACT_APP_API_URL` is set correctly
3. Ensure backend CORS allows your frontend domain
4. Check that backend is running (visit the health check endpoint)

### CORS Errors

Update backend environment variable:
```
FRONTEND_URL=https://your-frontend-domain.com
```

Or temporarily use `*` for testing:
```
FRONTEND_URL=*
```

## Environment Variables Summary

### Backend (Railway)
```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<generate-a-secure-random-string>
PORT=5002
NODE_ENV=production
FRONTEND_URL=<your-frontend-url>
```

### Frontend (Railway/Vercel)
```
REACT_APP_API_URL=<your-backend-railway-url>
```

## Security Notes

1. **Change JWT_SECRET**: Generate a secure random string
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **MongoDB Security**: 
   - Use strong password
   - Restrict IP access in MongoDB Atlas
   - Use environment-specific databases

3. **CORS Configuration**: 
   - In production, set specific frontend URL instead of `*`

## Useful Commands

### View Railway Logs
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs
```

### Redeploy
Railway auto-deploys on every git push to your main branch.

## Cost Estimation

- **Railway**: Free tier includes $5 credit/month (sufficient for small projects)
- **Vercel**: Free tier includes unlimited deployments for personal projects
- **MongoDB Atlas**: Free tier (M0) includes 512MB storage

## Next Steps

1. Set up custom domain (optional)
2. Configure SSL certificates (automatic on Railway/Vercel)
3. Set up monitoring and alerts
4. Configure automatic backups for MongoDB

## Support

- Railway Docs: https://docs.railway.app/
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/

---

**Deployment Date**: November 8, 2025
**Last Updated**: November 8, 2025
