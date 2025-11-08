# Railway Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] Git repository created and code committed
- [ ] Code pushed to GitHub
- [ ] Railway account created
- [ ] MongoDB Atlas database is accessible from anywhere (0.0.0.0/0)

## 📦 Backend Deployment (Railway)

- [ ] Created new Railway project
- [ ] Connected GitHub repository
- [ ] Set root directory to `backend`
- [ ] Added environment variables:
  - [ ] `MONGO_URI`
  - [ ] `JWT_SECRET`
  - [ ] `PORT=5002`
  - [ ] `NODE_ENV=production`
- [ ] Generated domain for backend
- [ ] Saved backend URL: `_________________________`
- [ ] Verified backend is running (visit health check endpoint)

## 🎨 Frontend Deployment (Railway)

- [ ] Created new service in Railway project
- [ ] Set root directory to `frontend`
- [ ] Added environment variable:
  - [ ] `REACT_APP_API_URL=<backend-url>`
- [ ] Generated domain for frontend
- [ ] Saved frontend URL: `_________________________`
- [ ] Updated backend `FRONTEND_URL` variable with frontend URL

## 🎨 Frontend Deployment (Vercel - Alternative)

- [ ] Created Vercel account
- [ ] Imported GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Set framework to Create React App
- [ ] Added environment variable:
  - [ ] `REACT_APP_API_URL=<backend-url>`
- [ ] Deployed successfully
- [ ] Updated backend `FRONTEND_URL` on Railway

## 🧪 Testing

- [ ] Can access frontend URL
- [ ] Can sign up new user
- [ ] Can log in
- [ ] Can create a clip
- [ ] Can view a clip using share code
- [ ] Copy functionality works
- [ ] Clips expire correctly

## 🔒 Security (Production)

- [ ] Changed `JWT_SECRET` to secure random string
- [ ] Updated MongoDB password
- [ ] Configured specific CORS origin (not `*`)
- [ ] Verified HTTPS is working
- [ ] Tested on different devices/browsers

## 📝 URLs to Save

**Backend URL**: `_________________________`

**Frontend URL**: `_________________________`

**MongoDB URI**: `Already configured`

**Share this with users**: `_________________________`

## 🚀 Quick Deploy Commands

```bash
# 1. Commit and push code
git add .
git commit -m "Deploy to Railway"
git push origin main

# 2. Railway will auto-deploy
# No additional commands needed!
```

## 📞 Support Links

- Railway Dashboard: https://railway.app/dashboard
- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com/
- GitHub Repo: `_________________________`

---

**Status**: 
- [ ] Backend Deployed ✅
- [ ] Frontend Deployed ✅
- [ ] Testing Complete ✅
- [ ] Production Ready ✅
