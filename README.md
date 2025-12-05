# 📝 Airtable Form Builder

A full-stack MERN application that allows users to create dynamic forms connected to their Airtable bases, featuring OAuth authentication, conditional logic, and real-time webhook synchronization.

> **⚠️ Security Note**: All sensitive credentials (API keys, secrets, MongoDB URIs) have been removed from this repository. Use the `.env.example` files to configure your own environment.

## 🌟 Features

- **Airtable OAuth Integration**: Secure authentication using Airtable OAuth 2.0 with PKCE
- **Dynamic Form Builder**: Create forms by selecting Airtable bases, tables, and fields
- **Conditional Logic**: Show/hide questions based on previous answers (AND/OR logic)
- **Form Response Submission**: Automatically saves responses to both Airtable and MongoDB
- **Webhook Synchronization**: Real-time sync of Airtable record updates/deletes
- **File Upload Support**: Handle multiple attachment fields with Cloudinary integration
- **Response Management**: View all form submissions with filtering options

## 🛠️ Tech Stack

### Frontend
- React 19 with Vite
- React Router Dom for routing
- Zustand for state management
- React Hook Form for form validation
- Axios for API calls
- Tailwind CSS for styling
- React Dropzone for file uploads

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for session management
- Airtable API integration
- Cloudinary for file storage
- Node-cron for webhook cursor refresh
- Jest for testing

## 📋 Prerequisites

- Node.js 18.x or higher
- MongoDB Atlas account (or local MongoDB)
- Airtable account with developer access
- Cloudinary account (for file uploads)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd airtable-form-builder
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
```

### 3. Frontend Setup

```bash
# Navigate to root directory
cd ..

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
```

### 4. Airtable OAuth Configuration

1. Go to [Airtable Developer Hub](https://airtable.com/create/oauth)
2. Create a new OAuth integration
3. Configure OAuth settings:
   - **Redirect URLs**: 
     - Backend: `http://localhost:5000/api/auth/airtable/callback`
     - Frontend: `http://localhost:5173/callback`
   - **Scopes**: `data.records:read data.records:write schema.bases:read webhook:manage`
4. Copy **Client ID** and **Client Secret** to your `.env` files

### 5. Run the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd ..
npm run dev
```

- Backend API: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## 📐 Data Models

See full documentation in the project for User, Form, Response, and Webhook schemas.

## 🎯 Conditional Logic

The conditional logic engine allows dynamic form behavior. Example:

```javascript
// Show "GitHub URL" field only if role equals "Engineer"
{
  questionKey: "githubUrl",
  conditionalRules: {
    logic: "AND",
    conditions: [
      { questionKey: "role", operator: "equals", value: "Engineer" }
    ]
  }
}
```

**Operators**: equals, notEquals, contains  
**Logic**: AND, OR

## 🔗 Webhook Synchronization

Webhooks keep MongoDB synced with Airtable changes:
- Record updates → Update MongoDB
- Record deletes → Mark as `deletedInAirtable: true`
- Automatic cursor refresh every 6 days via cron job

## 🚢 Deployment

### Step 1: Deploy Backend to Railway

1. **Create Railway Account**: https://railway.app
2. **New Project** → Deploy from GitHub repo
3. **Settings**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Environment Variables** (copy from `backend/.env.example`):
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   AIRTABLE_CLIENT_ID=your_client_id
   AIRTABLE_CLIENT_SECRET=your_client_secret
   AIRTABLE_REDIRECT_URI=https://your-backend.railway.app/api/auth/airtable/callback
   JWT_SECRET=generate_strong_random_secret
   JWT_EXPIRES_IN=7d
   SESSION_SECRET=generate_another_secret
   FRONTEND_URL=https://your-app.vercel.app
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   WEBHOOK_BASE_URL=https://your-backend.railway.app
   ENCRYPTION_KEY=32_char_hex_string
   AIRTABLE_API_BASE_URL=https://api.airtable.com/v0
   AIRTABLE_META_API_URL=https://api.airtable.com/v0/meta
   ```
5. **Deploy** and copy the Railway URL

### Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account**: https://vercel.com
2. **New Project** → Import from GitHub
3. **Framework Preset**: Vite
4. **Root Directory**: `./` (leave as root)
5. **Environment Variables**:
   ```env
   VITE_API_BASE_URL=https://your-backend.railway.app/api
   VITE_AIRTABLE_CLIENT_ID=your_client_id
   VITE_OAUTH_REDIRECT_URI=https://your-app.vercel.app/callback
   ```
6. **Deploy** and copy the Vercel URL

### Step 3: Update Airtable OAuth

1. Go to https://airtable.com/create/oauth
2. Open your OAuth integration
3. **Add Production Redirect URLs**:
   - `https://your-backend.railway.app/api/auth/airtable/callback`
   - `https://your-app.vercel.app/callback`
4. Save changes

### Step 4: Test Production

1. Visit `https://your-app.vercel.app`
2. Click "Login with Airtable"
3. Create a form and test submission
4. Verify data in Airtable and MongoDB
5. Test webhook sync by editing/deleting records in Airtable

## 📝 Environment Variables

See `backend/.env.example` and `.env.example` for complete configuration.

## 🧪 Testing

```bash
cd backend
npm test              # Run tests
npm test -- --coverage  # With coverage
```

## 📚 Resources

- [Airtable OAuth Documentation](https://airtable.com/developers/web/api/oauth-reference)
- [Airtable REST API](https://airtable.com/developers/web/api/introduction)
- [Airtable Webhooks](https://airtable.com/developers/web/api/webhooks-overview)

## 📄 License

MIT
