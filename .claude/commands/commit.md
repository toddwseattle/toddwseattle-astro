# Commit Changes

Create a git commit for the current changes.

## Instructions

# Step-by-step

1. Insure astro build succeeds and all tests pass:
   - Run `npm run build`
   - Run `npm test:run`
   - Run Format check `npm run format`
2. If all checks pass, create a commit with a concise title and detailed message of changes; if not fix the issues first. Otherwise, work on correcting.
3. Run `git status` to see all untracked and modified files
4. Run `git diff` to see unstaged changes and `git diff --staged` to see staged changes
5. Provide the concise title and a list of changes from the output of the `git diff` command.
6. Stage appropriate files:
   - Prefer staging specific files over `git add -A`
   - Never commit secrets (.env, credentials, API keys)
   - Never commit large binaries unless necessary

7. Classify changes as 'feat', 'fix', 'docs', 'style', 'refactor', 'test' 'new-content' or 'chore' based on the content.
8. If there are multiple classifications for the changes, choose the one that best represents the overall change; and for each sub change, list in the commit message. aggregate similar changes under the same classification.
9. Create the commit with the message formatted as:

```<type>: <concise title>
<blank line>
- <change 1>
- <change 2>
...
```

6. Use the `git commit` command to create the commit.
7. Output only the commit hash and a summary of the commit message.```plaintext
   feat: enhance route ID mapping with stop and headsign matching

- Added stop name fallback to route ID mapping in `parser.ts`
- Implemented location-aware matching using vehicle GPS position in `parser.ts`

## Example

```
feat: Add design token system for monochrome palette

Migrates all hardcoded colors to centralized tokens in tailwind.config.js.
Tokens follow ink/graphite/paper naming convention per design brief.

- Updated src/assets/styles/global.css to use design tokens
- Refactored src/components/blog/BlogCard.astro to replace hex colors with tokens
```
