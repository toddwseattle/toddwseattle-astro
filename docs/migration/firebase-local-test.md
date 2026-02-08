# Firebase Hosting Local Verification

## Build and serve

```bash
npm run build
firebase emulators:start --only hosting
```

The emulator serves the `dist/` output defined in `firebase.json`.

## Redirect checks

Use `curl -I` to verify redirects and headers:

```bash
curl -I http://localhost:5000/blog
curl -I http://localhost:5000/blog/
curl -I http://localhost:5000/blog/some-legacy-post/
```

Expected results:

- Status `301`
- `Location: /writing/` for `/blog` and `/blog/`
- `Location: /writing/some-legacy-post/` for slugged URLs

## 404 handling

```bash
curl -I http://localhost:5000/this-page-should-not-exist
```

Expected result: `404` response from Firebase Hosting.

## Trailing slash behavior

Confirm that canonical URLs align with the desired trailing slash format:

```bash
curl -I http://localhost:5000/writing
curl -I http://localhost:5000/writing/
```

If necessary, add explicit redirects in `firebase.json` to enforce the canonical style.
