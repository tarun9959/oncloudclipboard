# 🚀 Quick Start: Deploy to Railway in 5 Minutes

## Step 1: Push Code to GitHub (2 minutes)

```bash
cd "c:\Users\tarun\Downloads\cloud final"
git init
git add .
git commit -m "Initial commit for Railway deployment"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend (2 minutes)

1. Go to [railway.app](https://railway.app) → Sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Click on the deployed service → **Settings**
   - **Root Directory**: `backend`
5. Go to **Variables** tab, add these:
   ```
   MONGO_URI=mongodb+srv://lunayoga31_db_user:tarun1234@cluster0.ozsbizd.mongodb.net/cloudclipboard?retryWrites=true&w=majority
   JWT_SECRET=change_this_to_something_secure
   PORT=5002
   NODE_ENV=production
   ```
6. Go to **Settings** → **Networking** → Click **"Generate Domain"**
7. **COPY YOUR BACKEND URL** (e.g., `https://cloud-clipboard-backend.up.railway.app`)

## Step 3: Deploy Frontend (1 minute)

### Option A: Railway (Same Project)

1. In your Railway project, click **"New"** → **"Service"**
2. Select **"GitHub Repo"** → Choose same repository
3. Click on service → **Settings**
   - **Root Directory**: `frontend`
4. Go to **Variables** tab, add:
   ```
   REACT_APP_API_URL=https://YOUR-BACKEND-URL-FROM-STEP-2
   ```
5. Go to **Settings** → **Networking** → **"Generate Domain"**
6. Copy your frontend URL

### Option B: Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. **"Add New Project"** → Import your repo
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Create React App
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://YOUR-BACKEND-URL-FROM-STEP-2
   ```
5. Click **"Deploy"**

## Step 4: Update Backend CORS

1. Go back to Railway → Your backend service → **Variables**
2. Add:
   ```
   FRONTEND_URL=https://your-frontend-url-from-step-3
   ```
   (Or use `*` for testing: `FRONTEND_URL=*`)

## ✅ Test Your App!

Visit your frontend URL and:
- Sign up a new account
- Create a clip
- Share and access it

---

## 📋 Environment Variables Reference

### Backend (Railway)
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Random secure string
- `PORT` - `5002`
- `NODE_ENV` - `production`
- `FRONTEND_URL` - Your frontend URL or `*`

### Frontend (Railway/Vercel)
- `REACT_APP_API_URL` - Your Railway backend URL

---

## 🆘 Troubleshooting

**Can't connect to backend?**
- Check if `REACT_APP_API_URL` is set correctly in frontend
- Verify backend is running (visit backend URL, should show JSON message)

**CORS errors?**
- Set `FRONTEND_URL=*` in backend temporarily
- Check browser console for exact error

**Backend not starting?**
- Check Railway logs (Service → Deployments → Click latest → View Logs)
- Verify all environment variables are set

---

**Need more help?** See `RAILWAY_DEPLOYMENT.md` for detailed instructions.
