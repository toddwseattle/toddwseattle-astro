---
category: "blog"
cover: "./2025-03-15-VSCode-Setup-Recomendations-vscode-cat.jpeg"
title: "VSCode Setup Recommendations for CS394 Spring 2025"
date: "2025-03-24"
tags:
  ["teaching", "software development", "software engineering", "northwestern"]
description: "How to to set up your VSCode for the CS394 Spring 2025 course to develop typescript, react, firebase apps"
published: true
excerpt_separator: <!--more-->
---

# Setting Up VS Code for CS394: A Complete Guide

Welcome to CS394: Software Engineering! This guide will help you set up Visual Studio Code (VS Code) - the recommended code editor for this course. You'll need a properly configured development environment for working with React, TypeScript, Firebase, and Git throughout the quarter. This guide works for both Windows and Mac operating systems.

## Table of Contents

1. [TLDR;](#tldr)
2. [Installing VS Code](#installing-vs-code)
3. [Node.js Setup](#nodejs-setup)
4. [Firebase Integration](#firebase-integration)
5. [Git and GitHub Configuration](#git-and-github-configuration)
6. [Essential VS Code Extensions and VSCode Configuration](#essential-extensions)
7. [Troubleshooting Common Issues](#troubleshooting-common-issues)
8. [Conclusion](#conclusion)

---

## TLDR;

This guide goes through each element of setting up your development environment for CS394. If you think you already have your dev machine setup correctly with VSCode, Git, GitHub, and Node.js, You can verify your setup by using the following commands:

First, you should have node installed at a version greater than 20; and npm greater than 10:

```bash
node --version
npm --version
```

you should be able to launch vs code from the command line:

```bash
code
```

you should be able to clone a repository from github; so for example to clone a local copy of the CS394 typescript template to the CS394-template directory:

```bash
git clone https://github.com/toddwseattle/pretty-vitest-react-ts-template.git CS394-template
```

**Note**: when you actually use the template we will use a utility called `degit` to clone the template. this is just to test that git is connected properly to github.

````bash
Verify you have the firebase command line interface (cli):

```bash
firebase --version
````

should return 13 or higher.

**be sure to submit your github ID (username) to the course website in the appropriate assignment**

You can skip to the [Essential VS Code Extensions](#essential-extensions) section to install the recommended extensions for CS394.

## Installing VS Code

### Windows Installation

1. Visit [code.visualstudio.com](https://code.visualstudio.com/) and download the Windows installer
2. Run the downloaded `.exe` file
3. Follow the installation wizard (the default settings work well for most users)
4. Launch VS Code after installation completes

### Mac Installation

1. Visit [code.visualstudio.com](https://code.visualstudio.com/) and download the Mac installer
2. Open the downloaded `.zip` file to extract the application
3. Drag Visual Studio Code to your Applications folder
4. Launch VS Code from your Applications folder or Spotlight search (Command + Space)

### Command Line Integration

#### On Windows:

1. Open VS Code
2. Press `Ctrl+Shift+P` to open the command palette
3. Type "Shell Command: Install 'code' command in PATH" and select it from the dropdown

If you don't see this option, you may need to install the VS Code Insiders version or manually add the `code` command to your PATH.

#### On Mac:

1. Open VS Code
2. Press `Command+Shift+P` to open the command palette
3. Type "Shell Command: Install 'code' command in PATH" and select it from the dropdown

If you don't see this option, you may need to manually add the `code` command to your PATH by creating a symbolic link:

```bash
sudo ln -s /Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code /usr/local/bin/code
```

This allows you to type `code .` in any terminal to open VS Code with the current directory.

## Node.js Setup

For CS394, we recommend using Node.js version 20.x or newer. We'll be using npm (Node Package Manager) which comes bundled with Node.js for managing packages.

### Checking Your Node.js Version

Check your current Node.js version:

```bash
node -v
npm -v
```

If your version is below 20.x or Node.js is not installed:

### Install the LTS version of Node.js

Windows and Mac:

Visit [nodejs.org](https://nodejs.org) and download the current LTS version (which should be 22.x or newer as of this writing)
Follow the installation instructions for your platform.

## Firebase Integration

Firebase will be our backend platform for CS394 projects. Here's how to set it up:

1. Install the Firebase CLI globally:

```bash
npm install -g firebase-tools
```

2. Log in to Firebase:

```bash
firebase login
```

**Note: you will need to use a non u.northwestern.edu google account for firebase. the university does not enable firebase for its accounts.**

## Git and GitHub Configuration

Version control is essential for software engineering. In CS394, we'll use Git and GitHub for all projects.

### Installing GitHub Desktop

I recommend installing both github desktop and git. First for GitHub Desktop:

1. Download and install GitHub Desktop from [desktop.github.com](https://desktop.github.com)
2. During installation, GitHub Desktop will:
   - Guide you through signing in to your GitHub account (or creating one)
   - Configure Git with your credentials

**be sure to submit your github ID (username) to the course website in the appropriate assignment**

### Configuring GitHub Desktop

After installation:

1. Open GitHub Desktop
2. If you haven't already, sign in to your GitHub account
3. Configure your name and email (preferably using your Northwestern email for course projects)
4. GitHub Desktop will automatically configure Git with these settings

### Install Git on your machine

Enable Git from the command line by installing it on your machine. Download and install Git from [git-scm.com](https://git-scm.com/) and In setup; you should be able to configure to use vscode as the editor for your commit messages.

You can check if Git is installed by running:

```bash
git --version
```

it should be greater than 2.44

### Verify Git Configuration

you can check that vscode is configured as the editor, and that your email and other information is correct for git by running:

```bash
git config --global -e
```

This should open vscode with your git configuration file.

### GitHub Integration with VS Code

You should also install the GitHub extension for VS Code, from within VS Code:

1. Open VS Code Extensions (Ctrl+Shift+X or Cmd+Shift+X)
2. Search for "GitHub Pull Requests and Issues"
3. Install the extension by GitHub
4. Sign in to your GitHub account when prompted

This extension will help you manage pull requests and issues directly from VS Code, which will be useful for team projects and homework submissions.

## Testing with Vitest

### Vitest in templates

The starter templates for [Typescript](https://github.com/toddwseattle/pretty-vitest-react-ts-template) and Javascript already include Vitest configuration.

Vitest will also be used in many of the labs.

### Setting Up Vitest Extensions

Several VSCode extension make using vitest easier. See [Recommended Extensions](#recommended-extensions-for-cs394).

## Essential Extensions

The following VS Code extensions will significantly improve your development experience in CS394. Install them from VS Code's Extensions marketplace (press `Ctrl+Shift+X` on Windows or `Cmd+Shift+X` on Mac to open the Extensions view):

### Recommended Extensions for CS394

1. **ESLint** - For code linting

   - Search: "ESLint"
   - Publisher: Microsoft
   - This helps catch errors and enforce coding standards
   - why: ESLint will help catch errors earlier in development

2. **Prettier - Code formatter** - For consistent code formatting (essential)

   - Search: "Prettier"
   - Publisher: Prettier
   - Ensures your code is consistently formatted
   - why: we will talk about coding standards in the course; prettier helps a project automatically adhere to them
   - **Note**: to prevent frustrations with prettier, I recommend enabling on save. This will fix many issues with formatting. You can do this by going to settings (Ctrl + ,) and searching for "format on save". Make sure the box is checked. see [VSCode settings below](#vscode-sesttings)

3. **CSpell** - For spell checking in code

   - Search: "Code Spell Checker"
   - Publisher: Street Side Software
   - Catches spelling errors in code, strings, and comments
   - why: helps adhere to a coding standard and prevent silly naming mistakes
   - **Note** for unknown words in your code; recommend adding to your workspace. if you check the .vscode settings file in with your project these will be shared with others.

4. **Vitest** - For Vitest test integration

   - Search: "Vitest"
   - Publisher: ZixuanChen
   - Provides UI integration for our testing framework
   - why: provides convenience features for working with projects with vitest

5. **Vitest Runner for VSCode that Actually works**

   - Search: "Vitest Runner"
   - Publisher: Raz Luvaton
   - Provides a UI for running tests in vscode
   - why: provides buttons to easily run and debug vitest's within the editor

6. **Jest** - For additional test support

   - Search: "Jest"
   - Publisher: Orta
   - Works alongside Vitest for improved testing experience
   - why: provides a test outline in the left pane of vscode when clicking the flask icon

7. **Firebase Explorer** - For Firebase integration
   - Search: "Firebase"
   - Publisher: Google
   - Manages Firebase resources directly in VS Code
   - why: view what's happening in firebase without going to console.firebase.com.

### VSCode Settings

To ensure a smooth development experience, you can customize your VS Code settings. Here are some recommended settings for CS394:

1. **Open Settings**: Press `Ctrl + ,` (Windows) or `Cmd + ,` (Mac)
2. **Search for the following settings** and adjust them as needed:

   - **Editor: Format On Save**: Enable this to automatically format your code when you save it.
   - **Editor: Code Actions On Save**: Add `source.fixAll.eslint` to automatically fix ESLint issues on save.
   - **Prettier: Formatter**: Set this to `Prettier - Formatter esbenp.prettier-vscode` to ensure Prettier is used for formatting; and that it's consistent with eslint
   - **Prettier: Require Config**: Enable this to ensure Prettier only formats files in projects with a Prettier configuration file. It looks for `.prettierrc` or `.prettierrc.json` in the project root. see [Prettier documentation](https://prettier.io/docs/en/configuration.html) for more details. Many labs will already have this file for the workspace.

## Troubleshooting Common Issues

### TypeScript Path Aliases Not Working

If you're using path aliases in your `tsconfig.json` and VS Code doesn't recognize them:

1. Make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

2. Restart the TypeScript server:
   - Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
   - Type "TypeScript: Restart TS Server"

### Prettier / ESLint generating random errors

If you see random errors in your code that don't make sense, or if Prettier isn't fixing the file when you save, be sure you have your [VSCode settings](#vscode-settings) configured correctly. If you have a prettier config file in your project, it will override the default settings.

You can also fix eslint/prettier errors by pressing Ctrl-. or Cmd-. This will show you the available fixes for the current line. You can also use the command palette to run "ESLint: Fix all auto-fixable problems" to fix all eslint errors in the file.

### Git Authentication Problems

If you're having issues with Git authentication:

1. Make sure you're signed in to GitHub Desktop properly
2. Try refreshing your authentication in GitHub Desktop:
   - Go to File > Options (Windows) or GitHub Desktop > Preferences (Mac)
   - Under Accounts, sign out and sign back in
3. If using VS Code's built-in Git features and having issues:
   - Try pushing changes through GitHub Desktop instead
   - Or, set up a Personal Access Token if using HTTPS authentication directly in VS Code

### VS Code Extensions Not Working

If extensions aren't working as expected:

1. Make sure the extension is properly installed
2. Check if the extension requires any additional configuration
3. Try reloading VS Code: `Ctrl+Shift+P` / `Cmd+Shift+P` → "Developer: Reload Window"

### Command Line Integration Issues

#### On Windows:

If you don't see the "Install 'code' command in PATH" option, you can manually add VS Code to your PATH. Here's how you can do it:

##### Manual Setup

1. **Find the VS Code Installation Path:**

   - Open File Explorer and navigate to the folder where VS Code is installed.
   - Typically, this is:
     ```
     C:\Users\<YourUsername>\AppData\Local\Programs\Microsoft VS Code
     ```
   - Look for the `Code.exe` file in this directory.

2. **Copy the Installation Path:**

   - Copy the folder path where the `Code.exe` file is located (e.g., `C:\Users\<YourUsername>\AppData\Local\Programs\Microsoft VS Code`).
   - Note "AppData" is a hidden folder, so you may need to enable viewing hidden items in File Explorer.

3. **Add the Path to Environment Variables:**

   - Open the Start menu, search for **"Environment Variables"**, and select **"Edit the system environment variables"**.
   - In the System Properties window, click **"Environment Variables"**.
   - In the **User variables** section, find the variable named `Path` and click **Edit**.
   - Add the path you copied earlier as a new entry.

4. **Save and Restart:**

   - Save your changes and restart any open command-line terminal (e.g., `cmd.exe` or PowerShell).

5. **Test It:**
   - Open a terminal and type `code`. If everything is set correctly, VS Code should launch.

#### On Mac:

If you don't see the "Install 'code' command in PATH" option, you may need to manually add the `code` command to your PATH by creating a symbolic link:

```bash
sudo ln -s /Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code /usr/local/bin/code
```

This allows you to type `code .` in any terminal to open VS Code with the current directory.

---

## Conclusion

Whew! Now you have a setup that should work well for the rest of the quarter. Any problems follow up with me via my northwestern email or contact the teaching assistant in the syllabus.
