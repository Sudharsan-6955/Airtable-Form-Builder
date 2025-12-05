# 🔒 Security & Privacy Checklist

## ✅ Pre-Deployment Checklist

### Environment Variables
- [ ] All `.env` files are in `.gitignore`
- [ ] Removed all hardcoded credentials from code
- [ ] Created `.env.example` templates
- [ ] Generated strong JWT secrets (min 32 characters)
- [ ] Generated strong session secrets
- [ ] Created unique encryption key (32-char hex)

### Sensitive Data Removed
- [ ] MongoDB connection strings
- [ ] Airtable Client ID & Secret
- [ ] Cloudinary credentials
- [ ] JWT secrets
- [ ] Encryption keys
- [ ] Personal email addresses
- [ ] Any API keys or tokens

### Code Review
- [ ] No `console.log` with sensitive data
- [ ] No hardcoded passwords or tokens
- [ ] Error messages don't expose system details
- [ ] File uploads are validated and restricted
- [ ] Rate limiting is enabled
- [ ] CORS is properly configured

### Git History
- [ ] Verified no secrets in commit history
- [ ] If secrets were committed, consider:
  - Rotating all compromised credentials
  - Using `git filter-branch` to clean history (advanced)
  - Creating a fresh repository

### Production Configuration
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS for all URLs
- [ ] Update all localhost URLs to production domains
- [ ] Enable MongoDB IP whitelist
- [ ] Add production redirect URIs to Airtable OAuth

## 🛡️ Security Features Implemented

### Authentication & Authorization
- ✅ OAuth 2.0 with PKCE flow
- ✅ JWT-based session management
- ✅ Token expiration (7 days)
- ✅ Refresh token support
- ✅ Protected routes with middleware

### API Security
- ✅ Helmet.js for HTTP headers
- ✅ CORS configuration
- ✅ Rate limiting (100 requests/15min)
- ✅ Request validation with express-validator
- ✅ Error handling middleware

### Data Protection
- ✅ MongoDB connection over TLS
- ✅ Environment variable isolation
- ✅ Soft deletes (no permanent data loss)
- ✅ File upload size limits (10MB)
- ✅ File type validation

## 🔐 Credential Management

### How to Generate Secure Secrets

**JWT Secret (32+ characters):**
```bash
# Option 1: OpenSSL
openssl rand -hex 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Online (use with caution)
# https://generate-secret.now.sh/32
```

**Encryption Key (32 characters hex):**
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### Airtable OAuth
1. Never share Client Secret publicly
2. Rotate secrets if exposed
3. Use different credentials for dev/staging/production
4. Limit OAuth scopes to minimum required

### MongoDB
1. Use MongoDB Atlas with IP whitelist
2. Create dedicated database user (not admin)
3. Use strong passwords (20+ characters)
4. Enable MongoDB encryption at rest

### Cloudinary
1. Enable unsigned uploads only if necessary
2. Set upload presets with restrictions
3. Use transformation parameters to optimize storage
4. Monitor usage to detect abuse

## 📝 What's Safe to Commit

✅ **Safe:**
- `.env.example` files (with placeholder values)
- Public configuration (port numbers, feature flags)
- Airtable Client ID (public identifier, not secret)
- Frontend environment variables (VITE_* are public)

❌ **Never Commit:**
- `.env` files with real credentials
- MongoDB connection strings
- Airtable Client Secret
- JWT secrets
- Encryption keys
- Cloudinary API secret
- Private keys or certificates

## 🚨 If You Accidentally Commit Secrets

### Immediate Actions
1. **Rotate all exposed credentials immediately**:
   - Generate new Airtable Client Secret
   - Create new MongoDB user with new password
   - Generate new JWT and session secrets
   - Rotate Cloudinary API secret

2. **Remove from Git history** (if recent):
   ```bash
   # If it's the last commit
   git reset --soft HEAD~1
   git reset HEAD .env
   git commit -m "Your commit message"
   
   # Force push (only if you haven't shared the branch)
   git push --force-with-lease
   ```

3. **For older commits**:
   - Consider creating a fresh repository
   - Or use `git filter-branch` (complex, use with caution)

4. **Update .gitignore**:
   ```bash
   git rm --cached .env backend/.env
   git add .gitignore
   git commit -m "Remove sensitive files from tracking"
   ```

## 🔍 Pre-Push Verification

**Run these checks before pushing to GitHub:**

```bash
# 1. Check for sensitive patterns
git diff --cached | grep -i "password\|secret\|key\|token\|mongodb"

# 2. Verify .env is ignored
git status | grep ".env"
# Should return nothing or only .env.example

# 3. Check for hardcoded credentials
grep -r "mongodb+srv://" --exclude-dir=node_modules .
grep -r "AKIA" --exclude-dir=node_modules .  # AWS keys
grep -r "sk_live" --exclude-dir=node_modules .  # Stripe keys

# 4. Verify .gitignore is working
git ls-files | grep ".env$"
# Should return nothing
```

## 📋 Deployment Security Checklist

### Railway/Render (Backend)
- [ ] All environment variables set via platform UI (not .env)
- [ ] Database connection uses TLS/SSL
- [ ] HTTPS only (no HTTP)
- [ ] Webhook URLs use HTTPS
- [ ] Logs don't expose secrets

### Vercel/Netlify (Frontend)
- [ ] Environment variables set via platform UI
- [ ] API URL uses HTTPS
- [ ] No sensitive data in frontend code
- [ ] Build logs don't expose secrets

### MongoDB Atlas
- [ ] IP whitelist configured (not 0.0.0.0/0 in production)
- [ ] Dedicated database user (limited permissions)
- [ ] Connection string uses SRV format with TLS
- [ ] Backup enabled

### Airtable
- [ ] OAuth scopes limited to minimum required
- [ ] Redirect URIs use HTTPS in production
- [ ] Test with a non-production base first
- [ ] Webhook notification URL uses HTTPS

## 📚 References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [12-Factor App](https://12factor.net/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Git Filter-Repo](https://github.com/newren/git-filter-repo)

---

**Last Updated**: December 5, 2025
**Status**: Ready for secure deployment ✅
