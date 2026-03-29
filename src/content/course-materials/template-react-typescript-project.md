---
title: "Setting Up a React + TypeScript Project with the Template"
description: "Learn how to use degit to clone the pretty-vitest-react-ts-template, create a GitHub repository, and push your first project."
courses: ["software-engineering"]
type: "tutorial"
date: "2026-03-25"
slug: "template-react-typescript-project"
draft: false
---

## Overview

This tutorial walks you through using the **pretty-vitest-react-ts-template** to create a new React + TypeScript project. You'll learn how to clone the template with `degit`, initialize a new GitHub repository, push your code, and verify your development environment.

By the end, you will have:

- A working React + TypeScript development environment
- A GitHub repository connected to your local project
- Confidence running tests, building, and deploying your project

**Prerequisites**: You should have completed [Setting Up VS Code for Software Engineering](/course-materials/vscode-setup-tutorial/) first to install Node.js, npm, Git, and GitHub Desktop.

## Step 1: Check Your Prerequisites

Before starting, verify that you have the required tools installed.

### Node.js and npm

Open a terminal and check your Node.js and npm versions:

```bash
node --version
npm --version
```

Expected output:

- Node.js: **22.0.0 or higher**
- npm: **10.0.0 or higher**

If your versions are older, visit [nodejs.org](https://nodejs.org) and download Node.js 22 LTS or newer.

### Git

Verify Git is installed and configured with your name and email:

```bash
git --version
git config --global user.name
git config --global user.email
```

If your name is blank, configure it:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### GitHub Account

You should have a GitHub account. If you don't, create one at [github.com/signup](https://github.com/signup).

## Step 2: Clone the Template with degit

`degit` is a fast, lightweight tool for copying a repository template without its Git history. This gives you a clean slate for your new project.

### Create Your Project

Open a terminal in the folder where you want to create your project. Then run:

```bash
npx degit toddwseattle/pretty-vitest-react-ts-template my-project
```

Replace `my-project` with your desired project name (use lowercase with hyphens, like `photo-gallery` or `todo-app`).

### Expected Output

You should see:

```
⚠ remote: Using 'master' as the name for the initial branch.
✔ cloned toddwseattle/pretty-vitest-react-ts-template#main to my-project
```

### Navigate into Your Project

```bash
cd my-project
```

## Step 3: Install Dependencies

Now install the project's npm dependencies:

```bash
npm install
```

This downloads all required packages (React, TypeScript, Vitest, etc.) and may take 1–2 minutes.

### If You Use nvm

If you use Node Version Manager (`nvm`), ensure you're on the correct Node version:

```bash
nvm use
```

This reads the `.nvmrc` file in the project and switches to the matching Node version.

## Step 4: Verify the Development Environment

Test that your development server starts correctly:

```bash
npm run dev
```

You should see output like:

```
  VITE v8.0.0  ready in 140 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Visit `http://localhost:5173/` in your browser. You should see the template's React app running with a counter button.

Press `Control+C` (or `Cmd+C` on Mac) to stop the server.

## Step 5: Understand the Project Structure

The template includes the following key folders and files:

```
my-project/
├── src/
│   ├── App.tsx              # Main React component
│   ├── App.test.tsx         # Example unit test
│   ├── main.tsx             # Entry point
│   └── test/
│       └── setup.ts         # Vitest configuration
├── node_modules/            # Dependencies (created by npm install)
├── package.json             # Project metadata and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
├── vitest.config.ts         # Vitest test configuration
└── README.md                # Template documentation
```

Key files you'll edit:

- **`src/App.tsx`** – Your main React component
- **`src/App.test.tsx`** – Unit tests for your components
- **`package.json`** – Project name, version, scripts, and dependencies

## Step 6: Create a New GitHub Repository

### Create a Blank Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Enter a **Repository name** (use the same name as your project folder, like `my-project`)
3. Add an optional description (e.g., "A React TypeScript project")
4. Choose **Public** or **Private** (students typically use Public)
5. **Do NOT** initialize with README, .gitignore, or license (your template already has these)
6. Click **Create repository**

GitHub will show you the next steps. Note the repository URL (you'll need it shortly).

### Initialize Git and Link Your Local Project

In your terminal (in the `my-project` folder), run:

```bash
git init
git add .
git commit -m "Initial commit from pretty-vitest-react-ts-template"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/my-project.git
git push -u origin main
```

Replace:

- `YOUR-USERNAME` with your GitHub username
- `my-project` with your actual repository name

### Expected Output

The first push will show:

```
Enumerating objects: XX, done.
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Visit your repository on GitHub to confirm your code is there.

## Step 7: Understand Available npm Scripts

The template includes useful commands for development and testing:

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement (HMR). Your changes appear instantly in the browser.

### Testing

```bash
npm test
```

Runs unit tests in watch mode. Tests re-run when you change source files.

```bash
npm run test:ui
```

Opens the Vitest UI (browser-based test dashboard) for a visual view of test results and coverage.

### Building

```bash
npm run build
```

Builds your project for production. Output is in the `dist/` folder, ready to deploy.

```bash
npm run type-check
```

Runs the TypeScript compiler to check for type errors without building.

### Code Quality and Formatting

```bash
npm run lint
```

Runs Prettier (formatting) and ESLint (linting) on all files. Use before committing.

**Note on Husky Pre-commit Hooks**: The template includes Husky, which automatically runs `npm run lint` before each commit. This prevents code with formatting or linting errors from being committed to your repository. If `npm run lint` fails, the commit will be blocked. Fix the issues and try committing again.

### What is linting and Formatting?

Linting was invented in 1978. You can read about the history [here](<https://en.wikipedia.org/wiki/Lint_(software)>).

- **Prettier**: Automatically formats your code to a consistent style (e.g., indentation, quotes, line breaks). It can be configured in `.prettierrc.cjs`. To customize rules see the [Prettier documentation](https://prettier.io/docs/en/configuration.html).

- **ESLint**: Analyzes your code for potential errors and enforces coding standards. It can be configured in `.eslint.config.cjs`. To customize rules see the [ESLint documentation](https://eslint.org/docs/user-guide/configuring/).

Both tools can diagnose (npm run lint) and fix (npm run lint:fix) issues.

## Step 8: Make Your First Commit and Push

Edit a file in your project (e.g., change the title in `src/App.tsx`), then:

```bash
git add .
git commit -m "Update App title"
git push
```

### What Happens When You Commit

When you run `git commit`, Husky automatically runs `npm run lint` to check your code for formatting and linting errors. If errors are found, your commit will be blocked with a message like:

```
✔ Preparing lint-staged
⚠ Running tasks for staged files...
✔ packages/lint --fix "src/App.tsx"
✖ npm run lint-staged -- --allow-empty
  ✖ ESLint error: unexpected whitespace

husky - commit hook failed (add --no-verify to bypass)
```

**To fix this:**

1. Run `npm run lint:fix` to automatically fix formatting issues
2. Review any errors ESLint reports
3. Stage and commit again: `git add . && git commit -m "Update App title"`

#### What is a pre-commit hook?

a [pre-commit hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) is a script that runs automatically before a commit is finalized. It can perform checks or tasks (like linting) to ensure code quality. If the hook fails, the commit is blocked until issues are resolved. The goal is to keep the codebase clean and consistent by preventing commits with errors or formatting problems.

Husky ensures code quality by preventing commits with linting or formatting problems. This is a standard practice in professional development.

### View Your Commit on GitHub

Visit your GitHub repository in your browser. You should see your commit in the commit history.

## Troubleshooting

### "Command not found: npx" or "npm install fails"

**Issue**: npm is not installed or not in your PATH.

**Solution**:

1. Reinstall Node.js from [nodejs.org](https://nodejs.org)
2. Restart your terminal
3. Verify: `npm --version`

### "EACCES: permission denied" during `npm install`

**Issue**: npm doesn't have permission to write to directories.

**Solution** (Do not use `sudo`):

```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### "fatal: could not read Username for 'https://github.com/': No such file or directory"

**Issue**: Git doesn't have your GitHub credentials configured.

**Solution**:

1. Use GitHub Desktop instead (easier)
2. Or, set up SSH keys for Git (see [GitHub SSH Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh))

### Dev server won't start (error on `npm run dev`)

**Issue**: Port 5173 is already in use, or Node version is incompatible.

**Solution**:

1. Check Node version: `node --version` (should be 22+)
2. Kill other processes on 5173: `lsof -i :5173` (Mac) or `netstat -ano | findstr :5173` (Windows)
3. Try a different port: `npm run dev -- --port 3000`

### Tests fail even though code looks correct

**Issue**: Test dependencies might not be fully installed.

**Solution**:

```bash
rm -rf node_modules
npm install
npm test
```

### Commit is blocked by Husky with lint errors

**Issue**: Husky runs `npm run lint` before committing, and linting/formatting errors prevent the commit.

**Solution**:

1. Let Prettier auto-fix formatting:
   ```bash
   npm run lint:fix
   ```
2. Review the errors Prettier couldn't fix (ESLint warnings/errors)
3. If needed, bypass the hook temporarily:
   ```bash
   git commit --no-verify -m "Your message"
   ```
   ⚠️ Only use `--no-verify` as a last resort; try to fix the errors first.
4. Stage and commit again:
   ```bash
   git add .
   git commit -m "Your message"
   ```

## Next Steps

1. **Learn React Fundamentals**: Modify `src/App.tsx` to build a simple component (e.g., a to-do list).
2. **Write Tests**: Follow the example in `src/App.test.tsx` and write tests for your components.
3. **Use Vitest UI**: Run `npm run test:ui` to see test results visually.

For detailed documentation on the template, see the [full README](https://github.com/toddwseattle/pretty-vitest-react-ts-template).
