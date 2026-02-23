# Vercel Deployment Guide

## ✅ Issues Fixed

1. **Renamed `index1.html` to `index.html`** - Vercel expects the main file to be named `index.html`
2. **Fixed image paths** - Changed from `images/` to root directory paths
3. **Added `vercel.json`** - Configuration file for clean URLs

## 🚀 How to Deploy on Vercel

### Option 1: Push to GitHub (Recommended)

You have a Git permission issue. To fix it:

1. **Update your Git credentials:**
   ```bash
   git config user.name "your-github-username"
   git config user.email "your-github-email"
   ```

2. **Push the changes:**
   ```bash
   git push
   ```
   
   If you get a 403 error, you may need to:
   - Update your GitHub credentials in Windows Credential Manager
   - Or use a Personal Access Token instead of password

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a static site
   - Click "Deploy"

### Option 2: Deploy Directly from Vercel

If you can't push to GitHub:

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Choose "Upload" instead of importing from Git
4. Drag and drop these files:
   - `index.html`
   - `logo (1).png`
   - `project1.png`
   - `project2.png`
   - `hero (1).webp`
   - `hero2 (1).webp`
   - `vercel.json`
5. Click "Deploy"

### Option 3: Use Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

## 📝 What Was Changed

### File Renamed
- `index1.html` → `index.html`

### Image Paths Fixed
- `images/logo (1).png` → `logo (1).png`
- `images/hero (1).webp` → `hero (1).webp`
- `images/project1.png` → `project1.png`
- `images/project2.png` → `project2.png`

### Files Added
- `vercel.json` - Configuration for clean URLs

## ✨ Your Site is Ready!

All the 404 errors should be fixed now. Once deployed, your website will work perfectly on Vercel.

## 🔧 Troubleshooting

If you still see 404 errors after deployment:
1. Make sure all files are uploaded
2. Check that `index.html` is in the root directory
3. Clear your browser cache
4. Wait 1-2 minutes for Vercel to propagate changes
