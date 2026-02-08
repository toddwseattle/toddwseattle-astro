# Firebase Hosting Manual Configuration

This repo ships Firebase Hosting configuration files (`firebase.json` and `.firebaserc`) plus npm scripts for deploy targets. To finish setup, you’ll need to wire those configs to your Firebase projects and (optionally) Hosting sites.

## Table of Contents

1. [Firebase Setup](#1-install-and-authenticate-firebase-cli)
2. [Google Analytics Setup](#google-analytics-setup-optional)
3. [Hosting Configuration](#2-create-or-select-firebase-projects)

## 1) Install and authenticate Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

## Google Analytics Setup (Optional)

Google Analytics 4 tracking is configured in `src/components/GoogleAnalytics.astro` and uses environment variables. To enable GA:

> **Important**: The legacy Gatsby site (`toddwseattle-gb`) has its own GA property (toddwseattle-gb, ID 305361602). Create a **new separate GA4 property** for this Astro site to keep analytics isolated.

### Step 1: Create new GA4 property for Astro

1. Go to [Google Analytics Console](https://analytics.google.com)
2. Create a **new GA4 property** (not the legacy toddwseattle-gb):
   - Property name: `toddwseattle-astro` or similar
   - Website URL: `https://toddwseattle.com`

### Step 2: Create separate data streams for staging and production

In your new GA4 property, create **two Web data streams**:

**Stream 1: Staging**

- Stream URL: `https://my-site-staging.web.app` (your Firebase staging domain)
- Stream name: `astro-staging`
- Note the **Measurement ID** (format: `G-XXXXXXXXXX`)

**Stream 2: Production**

- Stream URL: `https://toddwseattle.com` (your production domain)
- Stream name: `astro-production`
- Note the **Measurement ID** (different from staging)

Example measurement IDs you'll collect:

```
Staging:     G-STAGING123
Production:  G-PROD456
```

### Step 3: Configure environment variables

1. Create `.env` file in the project root:

   ```bash
   cp .env.example .env
   ```

2. Add your **staging** Measurement ID:

   ```dotenv
   # .env (for local dev and staging deployment)
   PUBLIC_GA_ID=G-STAGING123
   ```

3. Test locally:
   ```bash
   npm run dev
   # GA loads in production mode: npm run build && npm run preview
   ```

### Step 4: Deploy with production environment variables

For **Firebase Hosting production**, set the environment variable to use your **production** Measurement ID:

**Option A: Firebase Console (recommended)**

1. In Firebase Console: Project Settings > Environment variables
2. Create variable `PUBLIC_GA_ID` with your **production** Measurement ID (e.g., `G-PROD456`)
3. This applies only to production builds

**Option B: Command-line deployment**

```bash
# Deploy staging with staging GA ID
firebase deploy --env .env --only hosting:staging

# Deploy production with production GA ID
# Set PUBLIC_GA_ID=G-PROD456 in your environment first
firebase deploy --only hosting:prod
```

> **Note**: `PUBLIC_GA_ID` only loads when `PROD=true` (during build time), not in dev mode. The staging and production Measurement IDs are independent—data won't mix between environments.

## 2) Create or select Firebase projects

Create (or select) **one Firebase project** in the Firebase Console. This project will host both staging and production sites.

> **Single Project Strategy**: Keep things organized by using one project with two separate Hosting sites. This is ideal when you have many Firebase projects and want to consolidate.

## 3) Create Hosting sites and map targets

### Recommended: One project with two Hosting sites

1. In **Firebase Console**, go to Hosting and create two separate sites:
   - Name them clearly: `staging` and `prod` (or `your-site-staging` / `your-site-prod`)
   - Note their site IDs

2. Map the targets to your project:

   ```bash
   firebase target:apply hosting staging <STAGING_SITE_ID>
   firebase target:apply hosting prod <PROD_SITE_ID>
   ```

   Example:

   ```bash
   firebase target:apply hosting staging my-site-staging
   firebase target:apply hosting prod my-site-prod
   ```

3. Update `.firebaserc` with your project ID **only once**:

   ```json
   {
     "projects": {
       "default": "your-firebase-project-id"
     },
     "targets": {
       "your-firebase-project-id": {
         "hosting": {
           "staging": ["my-site-staging"],
           "prod": ["my-site-prod"]
         }
       }
     }
   }
   ```

4. Verify setup:
   ```bash
   firebase target
   # Should show both staging and prod targets mapped
   ```

### Alternative: Two separate Firebase projects

If you prefer complete isolation (staging and production in separate projects):

1. Create two Firebase projects in the Console.
2. In `.firebaserc`, set one project ID at a time and deploy:

   ```bash
   # Deploy staging
   firebase deploy --project=staging-project-id --only hosting:staging

   # Deploy production
   firebase deploy --project=prod-project-id --only hosting:prod
   ```

**Trade-offs (One project vs Two projects):**

| Aspect                | One Project                             | Two Projects           |
| --------------------- | --------------------------------------- | ---------------------- |
| Setup Complexity      | Minimal                                 | More config            |
| Billing               | Single invoice                          | Separate tracking      |
| Environment Isolation | Shared resources                        | Complete isolation     |
| GA Integration        | Combined analytics (requires filtering) | Separate GA properties |
| Quota Limits          | Shared                                  | Independent            |
| Firestore/Database    | Shared rules & rates                    | Fully isolated         |
| Secrets Management    | Variable naming convention needed       | Natural separation     |

**One project is better for you because:**

- You already have many Firebase projects
- Keeps organization simpler with two clear sites
- Single billing invoice for this site
- Staging/prod analytics can be monitored together
- No database/backend needed for this static site

## 4) Build and deploy

Build the project once:

```bash
npm run build
```

Deploy to both staging and production using the mapped targets:

```bash
# Deploy to staging site
npm run deploy:staging

# Deploy to production site
npm run deploy:prod
```

Both commands use the same project ID from `.firebaserc` but deploy to different Hosting sites based on their target mappings.

To deploy only one environment:

```bash
# Staging only
firebase deploy --only hosting:staging

# Production only
firebase deploy --only hosting:prod
```

## 5) Verify redirects and caching

Use the local emulator as described in `docs/migration/firebase-local-test.md` and verify:

- `/blog` and `/blog/` return 301 to `/writing/`
- `/blog/<slug>/` returns 301 to `/writing/<slug>/`
- `/_astro/**` assets return long-lived cache headers

## 6) Custom domains (optional)

Configure custom domains in the Firebase Console for staging and production once DNS is ready.
