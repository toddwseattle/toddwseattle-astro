# Firebase Hosting Manual Configuration

This repo ships Firebase Hosting configuration files (`firebase.json` and `.firebaserc`) plus npm scripts for deploy targets. To finish setup, you’ll need to wire those configs to your Firebase projects and (optionally) Hosting sites.

## 1) Install and authenticate Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

## 2) Create or select Firebase projects

Create (or choose existing) Firebase projects in the Firebase Console:

- **Staging project** (recommended)
- **Production project**

> Tip: You can also use a single project with two Hosting sites; see the next step.

## 3) Create Hosting sites and map targets

You can map hosting targets in one of two ways:

### Option A: Two separate Firebase projects (simplest)

1. Update `.firebaserc` to set `projects.default` to your **staging** project ID.
2. Deploy staging:
   ```bash
   npm run deploy:staging
   ```
3. Switch `projects.default` to your **production** project ID.
4. Deploy production:
   ```bash
   npm run deploy:prod
   ```

### Option B: One Firebase project with two Hosting sites

1. Create two Hosting sites in the same project (e.g., `staging` and `prod`).
2. Map targets:
   ```bash
   firebase target:apply hosting staging <STAGING_SITE_ID>
   firebase target:apply hosting prod <PROD_SITE_ID>
   ```
3. Update `.firebaserc` to use your project ID in `projects.default`.

> The repo’s `.firebaserc` uses placeholder values; replace them with your actual project ID and target mappings.

## 4) Build and deploy

```bash
npm run build
npm run deploy:staging
npm run deploy:prod
```

## 5) Verify redirects and caching

Use the local emulator as described in `docs/migration/firebase-local-test.md` and verify:

- `/blog` and `/blog/` return 301 to `/writing/`
- `/blog/<slug>/` returns 301 to `/writing/<slug>/`
- `/_astro/**` assets return long-lived cache headers

## 6) Custom domains (optional)

Configure custom domains in the Firebase Console for staging and production once DNS is ready.
