# Preview Domain Setup Guide

## Overview

The preview deployment workflow now supports assigning a custom domain to preview deployments. This allows you to use a consistent domain (e.g., `preview.yourdomain.com`) for all preview deployments instead of the auto-generated Vercel URLs.

## Setup Instructions

### Option 1: Using a Static Preview Domain (Recommended)

1. **Add GitHub Secret:**
   - Go to your GitHub repository
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `PREVIEW_DOMAIN`
   - Value: Your preview domain (e.g., `preview.yourdomain.com` or `staging.yourdomain.com`)

2. **Configure Domain in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to **Settings** → **Domains**
   - Add your preview domain (e.g., `preview.yourdomain.com`)
   - Follow Vercel's DNS configuration instructions
   - Wait for domain verification (usually takes a few minutes)

3. **How It Works:**
   - Each preview deployment will be assigned to the same domain
   - The latest preview deployment will replace the previous one on that domain
   - This gives you a consistent URL for testing

### Option 2: Using Dynamic Preview Domains (Advanced)

If you want each preview deployment to have its own subdomain (e.g., `pr-123.yourdomain.com`), you would need to:

1. Set up a wildcard domain in Vercel: `*.preview.yourdomain.com`
2. Modify the workflow to generate dynamic subdomains based on PR number or branch name
3. Use the `vercel alias` command with the dynamic domain

### Option 3: Using Vercel's Preview Deployment Suffix (Pro/Enterprise)

If you're on a Vercel Pro or Enterprise plan:

1. Go to **Project Settings** → **General**
2. Scroll to **Preview Deployment Suffix**
3. Enter your custom domain suffix
4. All preview deployments will automatically use this domain pattern

## Current Workflow Behavior

- **Without `PREVIEW_DOMAIN` secret:** Deployments will use auto-generated Vercel URLs (e.g., `project-name-abc123.vercel.app`)
- **With `PREVIEW_DOMAIN` secret:** Deployments will be assigned to your custom domain

## Example

If you set `PREVIEW_DOMAIN=preview.thesoleil.vn`:
- All preview deployments will be accessible at `https://preview.thesoleil.vn`
- The latest deployment replaces the previous one on this domain

## Notes

- The domain must be added and verified in your Vercel project first
- DNS changes may take up to 48 hours to propagate
- SSL certificates are automatically provisioned by Vercel
- The workflow will skip domain assignment if `PREVIEW_DOMAIN` secret is not set

