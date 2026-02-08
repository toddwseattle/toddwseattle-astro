# Hosting Audit: SSR vs Static

## Output mode

**Current output mode:** Static (default).

**Evidence:**
- `astro.config.mjs` does not set `output` or include a server adapter; it only configures integrations and markdown settings, which implies the default `output: "static"`.
- `package.json` does not include any Astro SSR adapters (such as `@astrojs/node`) in dependencies.

## Adapter usage

**Adapter:** None configured.

**Evidence:**
- `astro.config.mjs` only references `@astrojs/react`, `@astrojs/tailwind`, and `@astrojs/sitemap` integrations.
- `package.json` dependencies do not include any Astro SSR adapters.

## Redirect inventory (hosting layer)

Redirects are now handled at the Firebase Hosting layer, keeping the site static.

| From | To | Status | Pattern type | Source |
| --- | --- | --- | --- | --- |
| `/blog` | `/writing/` | 301 | exact | `firebase.json` |
| `/blog/` | `/writing/` | 301 | exact | `firebase.json` |
| `/blog/**` | `/writing/:splat/` | 301 | wildcard | `firebase.json` |

## Decision

Redirects are static mappings only (no runtime conditions like auth, cookies, or database access). The site should remain **static** and keep redirects in Firebase Hosting configuration.
