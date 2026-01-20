---
category: "software-engineering"
title: "VSCode Setup Recommendations for CS394 Spring 2025"
date: "2025-03-24"
tags: [
    "teaching",
    "software development",
    "software engineering",
    "northwestern"
  ]
description: "How to to set up your VSCode for the CS394 Spring 2025 course to develop typescript, react, firebase apps"
published: false
excerpt_separator: <!--more-->
---
# Getting Started with the CS394 React TypeScript Starter Template

In CS394, we'll be using a custom starter template for our React projects. This guide will walk you through setting up and using the template for your coursework.

## Table of Contents
1. [About the Template](#about-the-template)
2. [Prerequisites](#prerequisites)
3. [Setting Up a New Project](#setting-up-a-new-project)
4. [Template Structure](#template-structure)
5. [Development Workflow](#development-workflow)
6. [Testing with Vitest](#testing-with-vitest)
7. [Code Quality Tools](#code-quality-tools)
8. [Customizing the Template](#customizing-the-template)
9. [Troubleshooting](#troubleshooting)

---

## About the Template

The [pretty-vitest-react-ts-template](https://github.com/toddwseattle/pretty-vitest-react-ts-template) is designed specifically for CS394 to provide you with a solid foundation for React development. It includes:

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: Adds static typing to JavaScript for better code quality
- **Vite**: A modern, fast build tool that significantly improves development speed
- **Vitest**: An efficient testing framework compatible with Vite
- **ESLint**: Helps identify and fix problems in your JavaScript/TypeScript code
- **Prettier**: Ensures consistent code formatting
- **Pre-configured settings**: Ready-to-use configuration for an optimal development experience

The template is lightweight and easy to customize for your projects. It includes a simple component structure, testing setup, and linting rules to help you get started quickly.
---

## Prerequisites

Before using the template, make sure you have:

- **Node.js**: Version 20.x or newer recommended
- **npm**: For package management (comes bundled with Node.js)
- **Git**: For version control
- **VS Code**: Recommended editor (see the [VS Code setup](../2025-03-15-VSCode-Setup-Recomendations/index.md) guide)

To check your Node.js and npm versions:

```bash
node -v
npm -v
```

If you need to update or install Node.js, visit [nodejs.org](https://nodejs.org/) and download the current LTS version (20.x or newer) or use a version manager like nvm.

---

## Setting Up a New Project

Follow these steps to create a new project using the template:

```bash
# Create a new project using the template
npx degit toddwseattle/pretty-vitest-react-ts-template my-project-name

# Navigate to your project directory
cd my-project-name

# Initialize a new git repository
git init

# Install dependencies
npm install
```

Next, make your first commit to establish your project history:

```bash
# Add all files to staging
git add .

# Commit the files
git commit -m "Initial commit from starter template"
```

If you plan to use GitHub, create a new repository on GitHub, then connect your local repo:

```bash
# Add the remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/your-username/your-repo-name.git

# Push to GitHub
git push -u origin main
```

---

## Template Structure

Once you've set up your project, you'll find the following structure:

```
pretty-vitest-react-ts-template/
├── public/                # Static assets (favicon, etc.)
├── src/                   # Source code
│   ├── assets/            # Project assets (images, etc.)
│   ├── components/        # React components
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite type definitions
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore file
├── .prettierrc            # Prettier configuration
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # TypeScript config for Node.js
└── vite.config.ts         # Vite configuration
```

Key files to be aware of:

- **src/App.tsx**: This is where you'll start building your application
- **src/main.tsx**: The entry point that renders your App component
- **index.html**: Contains the root div where your React app will be mounted
- **package.json**: Lists all dependencies and scripts for your project
- **.eslintrc.json**: Contains rules for code quality
- **.prettierrc**: Defines code formatting rules

---

## Development Workflow

Here's how to work with the template:

### Starting the Development Server

```bash
# Start development server
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173`. The page will automatically reload when you make changes to the code.

### Building for Production

```bash
# Build for production
npm run build
```

This creates a `dist` folder with optimized production files.

### Previewing the Production Build

```bash
# Preview the production build
npm run preview
```

This serves the production build locally for testing.

---

## Testing with Vitest

The template is pre-configured with Vitest for testing. Here's how to use it:

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Writing Tests

Test files should be placed next to the files they test with a `.test.tsx` or `.test.ts` extension. For example:

- `src/components/Button.tsx` → `src/components/Button.test.tsx`

Here's a simple example of a component test:

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## Code Quality Tools

The template includes several tools to help maintain code quality:

### ESLint

ESLint is configured to catch common errors and enforce best practices. To run ESLint:

```bash
# Run ESLint
npm run lint

# Fix automatically fixable issues
npm run lint:fix
```

### Prettier

Prettier ensures consistent code formatting. To format your code:

```bash
# Format code
npm run format
```

In VS Code with the Prettier extension installed, you can also format on save.

---

## Customizing the Template

You may want to customize the template for your specific project needs:

### Adding Dependencies

```bash
# Add a new dependency
npm install package-name

# Add a development dependency
npm install --save-dev package-name
```

### Modifying TypeScript Configuration

You can adjust the TypeScript settings in `tsconfig.json`. For example, to add path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

### Customizing Vite Configuration

You can modify the Vite configuration in `vite.config.ts`. For example, to add a proxy for API calls:

```typescript
export default defineConfig({
  // ... existing config
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});
```

---

## Troubleshooting

Here are solutions to common issues you might encounter:

### Module Not Found Errors

If you're getting "Module not found" errors:

1. Make sure the module is installed: `npm install module-name`
2. Restart the development server
3. Check import paths (case sensitivity matters)

### TypeScript Errors

For TypeScript errors:

1. Check the error message carefully
2. Ensure you're using the correct types
3. Try running `npm run typecheck` to verify all types

### Build Errors

If you're having trouble building:

1. Check the console for specific error messages
2. Try clearing the cache: `npm run clean`
3. Ensure all dependencies are installed: `npm install`

### Test Failures

If tests are failing:

1. Check if the component has changed functionality
2. Update test expectations to match new behavior
3. Verify testing environment setup

---

## Getting Help

If you encounter issues with the template that you can't resolve:

1. Check the [Vite documentation](https://vitejs.dev/guide/)
2. Look for solutions on the [React TypeScript documentation](https://react-typescript-cheatsheet.netlify.app/)
4. Bring your questions to office hours

---

*This guide was last updated on March 15, 2025, for CS394: Software Engineering.*
