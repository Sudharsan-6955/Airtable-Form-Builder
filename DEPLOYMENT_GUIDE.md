# 🚀 Deployment Guide: Render + Vercel

Complete step-by-step guide to deploy the Airtable Form Builder application.

---

## 📦 Prerequisites

- ✅ GitHub repositories created:
  - Frontend: https://github.com/Sudharsan-6955/Airtable-Form-Builder
  - Backend: https://github.com/Sudharsan-6955/Airtable-Form-Builder---backend
- ✅ MongoDB Atlas database ready
- ✅ Airtable OAuth integration created
- ✅ Cloudinary account configured

---

## 🔧 Part 1: Deploy Backend to Render

### Step 1: Create Web Service

1. Go to **https://dashboard.render.com**
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"** (authorize GitHub if needed)
4. Select: **`Airtable-Form-Builder---backend`**

### Step 2: Configure Service

```
Name: airtable-form-builder-backend
Runtime: Node
Region: Choose closest to you
Branch: main
Build Command: npm install
Start Command: npm start
Instance Type: Free (or Starter)
```

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Copy-paste these (update placeholder values):

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://sudharsanV:sudharsan2006@cluster0.tixfu7h.mongodb.net/airtable-forms?retryWrites=true&w=majority&appName=Cluster0
AIRTABLE_CLIENT_ID=a6d1c60b-eb04-4725-a628-4bfd600729d6
AIRTABLE_CLIENT_SECRET=d88da2bcae43b9be73fa9d7f94bb95ef8635851fc81f9a591a3781f8f5749fdc
AIRTABLE_REDIRECT_URI=https://YOUR-SERVICE-NAME.onrender.com/api/auth/airtable/callback
JWT_SECRET=your-super-secret-jwt-key-production-2024
JWT_EXPIRES_IN=7d
SESSION_SECRET=your-session-secret-production-2024
FRONTEND_URL=https://YOUR-VERCEL-APP.vercel.app
CLOUDINARY_CLOUD_NAME=airtable
CLOUDINARY_API_KEY=196739398969157
CLOUDINARY_API_SECRET=9Kh1DfYuGMP66lSHVwvNtt93wFc
WEBHOOK_BASE_URL=https://YOUR-SERVICE-NAME.onrender.com
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef
AIRTABLE_API_BASE_URL=https://api.airtable.com/v0
AIRTABLE_META_API_URL=https://api.airtable.com/v0/meta
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for build to complete
3. **Copy your Render URL**: `https://your-service-name.onrender.com`

### Step 5: Test Backend

Visit: `https://your-service-name.onrender.com/health`

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-12-05T...",
  "environment": "production"
}
```

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Import Project

1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select: **`Airtable-Form-Builder`**

### Step 2: Configure Project

```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 3: Add Environment Variables

Click **"Environment Variables"** and add:

```env
VITE_API_URL=https://YOUR-RENDER-URL.onrender.com/api
VITE_AIRTABLE_CLIENT_ID=a6d1c60b-eb04-4725-a628-4bfd600729d6
VITE_OAUTH_REDIRECT_URI=https://YOUR-VERCEL-APP.vercel.app/callback
```

**Important**: Replace `YOUR-RENDER-URL` with your actual Render backend URL from Part 1!

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. **Copy your Vercel URL**: `https://your-app.vercel.app`

---

## 🔄 Part 3: Cross-Link Services

### Update Render Environment Variables

Go back to Render dashboard → Your service → Environment:

1. **Update `FRONTEND_URL`**:
   ```
   FRONTEND_URL=https://your-actual-vercel-url.vercel.app
   ```

2. **Update `AIRTABLE_REDIRECT_URI`**:
   ```
   AIRTABLE_REDIRECT_URI=https://your-actual-render-url.onrender.com/api/auth/airtable/callback
   ```

3. **Update `WEBHOOK_BASE_URL`**:
   ```
   WEBHOOK_BASE_URL=https://your-actual-render-url.onrender.com
   ```

4. Click **"Save Changes"** → Service will auto-redeploy

---

## 🔐 Part 4: Update Airtable OAuth

### Add Production Redirect URI

1. Go to: **https://airtable.com/create/oauth**
2. Find your integration: **"Airtable Form Builder"**
3. Under **"Redirect URIs"**, click **"Add"**
4. Add: `https://your-render-url.onrender.com/api/auth/airtable/callback`
5. Click **"Save changes"**

---

## ✅ Part 5: Test Production

### 1. Test Login Flow

1. Visit: `https://your-vercel-app.vercel.app`
2. Click **"Login with Airtable"**
3. Should redirect to Airtable consent page
4. Click **"Grant access"**
5. Should redirect back to dashboard logged in

### 2. Test Form Creation

1. Click **"Create New Form"**
2. Select your Airtable base
3. Select a table
4. Choose fields
5. Add conditional logic (optional)
6. Click **"Save Form"**

### 3. Test Form Submission

1. Copy the public form link
2. Open in incognito/private window
3. Fill out the form
4. Submit
5. **Verify in Airtable**: Check that record was created

### 4. Test Response Listing

1. Go back to dashboard
2. Click **"View Responses"** on your form
3. Should see the submitted response

### 5. Test Webhook Sync

1. Open Airtable
2. Edit or delete the submitted record
3. Refresh the responses page in your app
4. Should show updated status (e.g., "Deleted in Airtable")

---

## 🐛 Troubleshooting

### Backend won't start on Render

- Check **Logs** tab in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct
- Check that `npm start` script exists in `package.json`

### Frontend shows "Network Error"

- Check `VITE_API_URL` points to correct Render URL
- Ensure CORS is configured on backend (`FRONTEND_URL` env var)
- Check browser console for errors

### OAuth callback fails

- Verify `AIRTABLE_REDIRECT_URI` matches exactly what's in Airtable
- Ensure redirect URI is added in Airtable OAuth integration
- Check that `AIRTABLE_CLIENT_SECRET` is correct

### Webhooks not working

- Verify `WEBHOOK_BASE_URL` is set correctly
- Check that Render service is not sleeping (use Starter plan or keep-alive service)
- Test webhook endpoint: `POST https://your-render-url.onrender.com/api/webhooks/airtable`

### Files not uploading

- Verify Cloudinary credentials are correct
- Check that API key has upload permissions
- Ensure file size is under 10MB limit

---

## 📊 Monitoring

### Render Dashboard

- **Logs**: Real-time server logs
- **Metrics**: CPU, memory, bandwidth usage
- **Events**: Deploy history

### Vercel Dashboard

- **Deployments**: Build logs and status
- **Analytics**: Page views, performance
- **Logs**: Function execution logs

---

## 💰 Cost Estimate

### Free Tier

- **Render Free**: Backend hosting (sleeps after 15 min inactivity)
- **Vercel Hobby**: Frontend hosting (unlimited bandwidth)
- **MongoDB Atlas Free**: 512MB storage
- **Cloudinary Free**: 25 GB storage, 25 GB bandwidth/month

### Upgrade Recommended For Production

- **Render Starter ($7/mo)**: Always-on backend, better performance
- **MongoDB Atlas Shared ($9/mo)**: Better performance, backups
- **Cloudinary Pro ($89/mo)**: More storage and transformations

---

## 🔒 Security Checklist

- ✅ Environment variables not committed to Git
- ✅ JWT secrets are random and unique
- ✅ MongoDB connection uses authentication
- ✅ CORS limited to frontend domain only
- ✅ Rate limiting enabled (100 req/15min)
- ✅ Helmet.js security headers enabled
- ✅ OAuth uses PKCE flow
- ✅ Webhook endpoints validate requests

---

## 🎉 Deployment Complete!

Your Airtable Form Builder is now live:

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend.onrender.com
- **Health Check**: https://your-backend.onrender.com/health

Share the frontend URL with users to start collecting form responses! 🚀
