# 🚀 Netlify Deployment Guide

## Prerequisites
- GitHub account
- Netlify account (free)
- Your local repository is ready

## Step 1: Push to GitHub

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it: `ecommerce-website`
   - Keep it public or private (your choice)
   - Do NOT initialize with README (we already have one)

2. **Push your code**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ecommerce-website.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Netlify

1. **Go to Netlify Dashboard**
   - Visit https://netlify.com
   - Click "New site from Git"

2. **Connect Repository**
   - Choose "GitHub"
   - Select your `ecommerce-website` repository

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Branch**: `main` (or `master`)

4. **Add Environment Variables**
   In Netlify dashboard → Site Settings → Environment Variables, add:
   ```
   DATABASE_URL=file:./dev.db
   JWT_SECRET=your-super-secret-jwt-key-generate-a-strong-one
   NEXTAUTH_SECRET=your-nextauth-secret-generate-a-strong-one
   NEXTAUTH_URL=https://YOUR_SITE_NAME.netlify.app
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (5-10 minutes)

## Step 3: Update Site URL

1. **Get your site URL**
   - After deployment, copy your site URL (e.g., `https://amazing-site-123.netlify.app`)

2. **Update Environment Variables**
   - Go back to Site Settings → Environment Variables
   - Update `NEXTAUTH_URL` with your actual site URL

3. **Redeploy**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"

## Step 4: Test Your Site

Visit your site URL and test:
- ✅ Homepage loads with products
- ✅ Sign up for a new account
- ✅ Log in with your account
- ✅ Add products to cart
- ✅ View cart and modify quantities
- ✅ Log out and log back in (cart should persist)

## Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check build logs in Netlify dashboard
   - Ensure all environment variables are set

2. **API Routes Don't Work**
   - Make sure `@netlify/plugin-nextjs` is installed
   - Check `netlify.toml` configuration

3. **Authentication Issues**
   - Verify `NEXTAUTH_URL` matches your site URL exactly
   - Ensure JWT_SECRET and NEXTAUTH_SECRET are set

4. **Database Issues**
   - For production, consider using a cloud database
   - SQLite works for demo but has limitations on serverless

## Production Improvements

For a production site, consider:
- Using PostgreSQL or PlanetScale instead of SQLite
- Setting up proper domain name
- Adding SSL certificate (Netlify provides free SSL)
- Setting up monitoring and analytics

## Support

If you encounter issues:
1. Check Netlify build logs
2. Verify all environment variables
3. Test locally first with `npm run build && npm start`