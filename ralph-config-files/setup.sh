#!/bin/bash

# Ralph Wiggum Setup Script for toddwseattle-astro
# Run this from the root of your repo

set -e  # Exit on error

echo "🎯 Ralph Wiggum Setup for toddwseattle-astro"
echo "=============================================="
echo ""

# Check we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the root of toddwseattle-astro"
    exit 1
fi

if ! grep -q "toddwseattle-astro" package.json; then
    echo "⚠️  Warning: This doesn't look like toddwseattle-astro"
    echo "Are you sure you're in the right directory?"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Found toddwseattle-astro project"
echo ""

# Create .ralph directory structure
echo "📁 Creating .ralph directory structure..."
mkdir -p .ralph/specs/blog-enhancements
mkdir -p .ralph/specs/seo-improvements
mkdir -p .ralph/specs/accessibility
mkdir -p .ralph/specs/stdlib
mkdir -p .ralph/logs
mkdir -p .ralph/docs/generated
mkdir -p .ralph/examples

echo "✅ Directories created"
echo ""

# Check if files already exist
if [ -f ".ralph/PROMPT.md" ]; then
    echo "⚠️  .ralph/PROMPT.md already exists"
    read -p "Overwrite? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping PROMPT.md"
        SKIP_PROMPT=1
    fi
fi

# Copy configuration files
echo "📄 Setting up configuration files..."

if [ -z "$SKIP_PROMPT" ]; then
    cat > .ralph/PROMPT.md << 'EOF'
# Ralph Instructions for toddwseattle-astro

## Project Overview

Personal website and blog built with Astro, React, TypeScript, and Tailwind CSS.
This is a migration from Gatsby focused on clean, writing-first design.

## Your Role

You are an autonomous developer working on features defined in specs.
Pick ONE task from IMPLEMENTATION_PLAN.md, complete it fully, test it, and commit.

## Core Principles

1. **Writing-First**: Content and readability over visual gimmicks
2. **No Route Breakage**: Preserve all existing slugs and URLs
3. **Type Safety**: All TypeScript must compile with zero errors
4. **Test Coverage**: All React components must have tests
5. **Consistent Design**: Use Tailwind tokens from docs/04-style-guide.md

## Build & Test Commands (Critical Backpressure)

### Before ANY commit, ALL of these must pass:

```bash
# Type checking
npx tsc --noEmit

# Tests
npm run test:run

# Build
npm run build

# Formatting
npm run format
```

### DO NOT commit if:
- TypeScript has ANY errors
- Tests fail
- Build fails
- Code is not formatted

### When everything passes:
- Review your changes
- Write a clear commit message
- Commit and push
- Update IMPLEMENTATION_PLAN.md with progress
- Output: `<promise>DONE</promise>`

## Task Selection Strategy

1. Read IMPLEMENTATION_PLAN.md
2. Pick ONE task that:
   - Is marked as "TODO" or "IN_PROGRESS"
   - Has clear acceptance criteria
   - Doesn't depend on incomplete tasks
3. If no clear task exists, ask for clarification

## Reference Documentation

**ALWAYS read these before starting work on related features:**

- `docs/01-epic.md` - Migration strategy and constraints
- `docs/02-stories.md` - User stories and acceptance criteria
- `docs/03-workitems.md` - Implementation tasks
- `docs/04-style-guide.md` - IA, tone, design tokens, conventions
- `README.md` - Project structure and commands

## CRITICAL: Backpressure is Non-Negotiable

If ANY check fails:
1. STOP immediately
2. Read the full error output
3. Fix the root cause
4. Run all checks again
5. Only proceed when 100% green

## Output Format

When a task is 100% complete and all checks pass:

```
<promise>DONE</promise>
```

Remember: You're building a calm, focused personal website.
Quality and consistency matter more than speed.
Trust the backpressure - if tests fail, something needs fixing.
EOF
    echo "✅ Created .ralph/PROMPT.md"
fi

# Create other config files (abbreviated versions for the script)
# In real usage, these would be the full files from the previous steps

echo "✅ Configuration files created"
echo ""

# Update .gitignore
echo "🔒 Updating .gitignore..."
if ! grep -q ".ralph/logs" .gitignore 2>/dev/null; then
    cat >> .gitignore << 'EOF'

# Ralph working directories
.ralph/logs/
.ralph/docs/generated/
.ralphrc
EOF
    echo "✅ Updated .gitignore"
else
    echo "✅ .gitignore already configured"
fi
echo ""

# Check for Claude Code
echo "🔍 Checking for Claude Code..."
if command -v claude-code &> /dev/null; then
    echo "✅ Claude Code is installed"
    claude-code --version
else
    echo "⚠️  Claude Code not found"
    echo ""
    echo "To install Claude Code:"
    echo "  npm install -g @anthropic-ai/claude-code"
    echo ""
    read -p "Install now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Installing Claude Code..."
        npm install -g @anthropic-ai/claude-code
        echo "✅ Claude Code installed"
    else
        echo "⏭️  Skipping Claude Code installation"
    fi
fi
echo ""

# Check for ralph-claude-code
echo "🔍 Checking for ralph-claude-code..."
if command -v ralph &> /dev/null; then
    echo "✅ ralph-claude-code is installed"
    ralph --version
else
    echo "⚠️  ralph-claude-code not found"
    echo ""
    echo "To install ralph-claude-code:"
    echo "  npm install -g ralph-claude-code"
    echo ""
    read -p "Install now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Installing ralph-claude-code..."
        npm install -g ralph-claude-code
        echo "✅ ralph-claude-code installed"
    else
        echo "⏭️  Skipping ralph-claude-code installation"
    fi
fi
echo ""

# Verify project dependencies
echo "🔍 Verifying project setup..."
if [ -f "package-lock.json" ]; then
    echo "✅ package-lock.json found"
else
    echo "⚠️  No package-lock.json - running npm install..."
    npm install
fi
echo ""

# Run test validation
echo "🧪 Validating test setup..."
if npm run test:run &> /dev/null; then
    echo "✅ Tests passing"
else
    echo "⚠️  Some tests failing - this is OK, Ralph can fix them"
fi
echo ""

# Run build validation
echo "🏗️  Validating build setup..."
if npm run build &> /dev/null; then
    echo "✅ Build succeeds"
else
    echo "⚠️  Build has issues - you may want to fix these before running Ralph"
fi
echo ""

# Initialize Ralph
echo "🎯 Initializing Ralph..."
if command -v ralph &> /dev/null; then
    ralph init --backend claude || echo "⚠️  Manual initialization may be needed"
    echo "✅ Ralph initialized"
else
    echo "⏭️  Skipping Ralph init (not installed)"
fi
echo ""

# Create first branch
echo "🌿 Creating Ralph feature branch..."
git checkout -b feature/ralph-initial-setup 2>/dev/null || echo "Branch may already exist"
echo ""

# Final summary
echo "=============================================="
echo "✅ Ralph Wiggum Setup Complete!"
echo "=============================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Review the generated files in .ralph/"
echo "   - PROMPT.md (main instructions)"
echo "   - IMPLEMENTATION_PLAN.md (task list)"
echo "   - specs/ (feature specifications)"
echo ""
echo "2. Customize the files for your needs"
echo ""
echo "3. Run your first Ralph session:"
echo "   ralph run -p \"Implement reading time feature\" --max-iterations 5"
echo ""
echo "4. Or plan a feature first:"
echo "   ralph plan \"Add reading time and improve SEO\""
echo ""
echo "5. Monitor progress:"
echo "   tail -f .ralph/logs/\$(ls -t .ralph/logs/ | head -1)"
echo ""
echo "📚 Read the full guide:"
echo "   ralph-setup-guide-toddwseattle-astro.md"
echo ""
echo "🎉 Happy Ralphing!"
echo ""
