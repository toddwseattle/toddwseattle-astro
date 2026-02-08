---
title: "Setting Up VS Code for Software Engineering"
description: "Complete step-by-step guide to configure VS Code for web development with React, TypeScript, Firebase, and Git tools."
courses: ["software-engineering"]
type: "tutorial"
date: "2026-02-07"
---

## Overview

VS Code is the recommended editor for software engineering courses. This tutorial will help you configure a professional development environment for React, TypeScript, Firebase, and version control.

## Step 1: Install VS Code

### On Mac

1. Visit [code.visualstudio.com](https://code.visualstudio.com/)
2. Download the Mac installer
3. Extract and drag Visual Studio Code to your Applications folder
4. Launch from Applications folder or Spotlight (Command + Space)

### On Windows

1. Visit [code.visualstudio.com](https://code.visualstudio.com/)
2. Download and run the Windows installer
3. Follow the installation wizard
4. Complete installation and launch

### Enable Command Line Integration

1. Open VS Code
2. Press `Command+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Type "Shell Command: Install 'code' command in PATH"
4. Select and run

This lets you type `code .` in any terminal to open VS Code.

## Step 2: Install Node.js

VS Code development requires Node.js and npm (included with Node).

1. Visit [nodejs.org](https://nodejs.org)
2. Download the current LTS version (22.x or newer)
3. Install following platform-specific instructions

### Verify Installation

```bash
node --version
npm --version
```

Both should show current versions (Node 20+ and npm 10+).

## Step 3: Configure Git and GitHub

### Install Git

1. Download from [git-scm.com](https://git-scm.com/)
2. During setup, configure VS Code as your commit editor
3. Verify installation:

```bash
git --version
```

Should show version 2.44 or newer.

### Configure Git Locally

```bash
git config --global -e
```

This opens your Git configuration in VS Code. Ensure your email and name are set correctly.

### Set Up GitHub Desktop

1. Download from [desktop.github.com](https://desktop.github.com)
2. Sign in with your GitHub account
3. Configure your commit name and email

### Install GitHub Extension for VS Code

1. Open VS Code Extensions (`Cmd+Shift+X` or `Ctrl+Shift+X`)
2. Search "GitHub Pull Requests and Issues"
3. Install the extension by GitHub
4. Sign in when prompted

### Verify Git Connection

```bash
git clone https://github.com/toddwseattle/pretty-vitest-react-ts-template.git test-repo
```

If this succeeds, your Git setup is working.

## Step 4: Configure VS Code for Development

### Install Essential Extensions

Open VS Code Extensions and install:

1. **ESLint** (Microsoft) - Code linting and error detection
2. **Prettier - Code formatter** (Prettier) - Automatic code formatting
3. **CSpell** (Street Side Software) - Spell checking in code
4. **Vitest** (ZixuanChen) - Test framework integration
5. **Vitest Runner** (Raz Luvaton) - UI for running tests
6. **Jest** (Orta) - Additional test support and outlines
7. **Firebase Explorer** (Google) - Firebase resource management

### Configure VS Code Settings

Press `Cmd + ,` (Mac) or `Ctrl + ,` (Windows) to open Settings, then search for and enable:

- **Format On Save** - Auto-format code when saving
- **Code Actions On Save** - Add `source.fixAll.eslint` to fix ESLint issues automatically
- **Prettier: Formatter** - Set to `esbenp.prettier-vscode`
- **Prettier: Require Config** - Enable to use project Prettier configuration

Your settings should include something like:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsx]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Step 5: Enable GitHub Copilot Pro for Students

As a verified student, you have free access to **GitHub Copilot Pro**—a significant upgrade from the free tier. Copilot Pro gives you unlimited code suggestions and access to advanced AI models.

### Get GitHub Student Benefits

1. Visit [github.com/education/students](https://education.github.com/students)
2. Click "Get verified" or "Join GitHub Education"
3. Verify your student status using your school email
4. Once verified, you automatically get:
   - **Free GitHub Copilot Pro** (normally $10/month)
   - Free GitHub Pro account
   - GitHub Codespaces hours
   - Student Developer Pack with 30+ partner tools

### Install Copilot in VS Code

1. Open VS Code Extensions (`Cmd+Shift+X` or `Ctrl+Shift+X`)
2. Search "GitHub Copilot Chat"
3. Install the extension by GitHub
4. Install "GitHub Copilot" (main extension) as well
5. Sign in with your GitHub account

### Verify Copilot is Active

1. Open a code file in VS Code
2. Start typing a function or code block
3. You should see AI-powered suggestions appearing
4. Press `Tab` to accept a suggestion or `Escape` to dismiss

You'll know Copilot Pro is active when you see the Copilot icon in the bottom status bar (showing a Copilot symbol).

### What Copilot Pro Gives You

- **Unlimited code completions** (vs 2,000/month on free tier)
- **Unlimited chat and agent requests** (vs 50/month on free tier)
- Access to GPT-5 mini and other advanced models
- Copilot coding agent for complex tasks
- Code review assistance

### Using Copilot in Your Projects

Press `Ctrl+I` (Windows) or `Cmd+I` (Mac) to open Copilot inline chat:

- Ask Copilot to explain code
- Request code generation
- Ask for debugging help
- Get refactoring suggestions

## Step 6: Set Up Firebase CLI

Firebase provides backend services for projects.

```bash
npm install -g firebase-tools
```

Verify installation:

```bash
firebase --version
```

Should show version 13 or higher.

Login to Firebase:

```bash
firebase login
```

**Note**: Use a personal Google account (not your school email - university accounts don't support Firebase).

## Step 7: Verify Your Complete Setup

Run these commands to confirm everything is working:

```bash
# Check Node and npm
node --version
npm --version

# Check Git
git --version

# Check Firebase
firebase --version

# Test VS Code command line
code .
```

All should return valid version numbers.

## Troubleshooting

### TypeScript Path Aliases Not Working

If VS Code doesn't recognize path aliases in `tsconfig.json`:

1. Make sure your `tsconfig.json` has `"baseUrl": "."`
2. Restart TypeScript server: `Cmd/Ctrl+Shift+P` → "TypeScript: Restart TS Server"

### Prettier or ESLint Errors

1. Verify VS Code settings are configured correctly (see Step 4)
2. Check that project has a `.prettierrc` or `prettier.config.js`
3. Press `Cmd + .` or `Ctrl + .` to see available fixes
4. Use Command Palette → "ESLint: Fix all auto-fixable problems"

### Git Authentication Issues

1. Sign out and back into GitHub Desktop
2. Retry `git clone` to test authentication
3. For persistent issues, generate a Personal Access Token on GitHub and use it for HTTPS authentication

### Extensions Not Working

1. Verify extension is properly installed in Extensions panel
2. Try reloading VS Code: `Cmd/Ctrl+Shift+P` → "Developer: Reload Window"

## Next Steps

Your VS Code environment is now configured. You're ready to:

- Clone course repositories
- Work with React and TypeScript projects
- Write and run tests with Vitest
- Manage code with Git and GitHub
- Deploy projects with Firebase

For specific course requirements or setup issues, reach out to your instructor.
