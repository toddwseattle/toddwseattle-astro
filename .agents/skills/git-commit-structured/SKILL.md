---
name: git-commit
description: Examines git working tree changes, stages files intelligently, and creates structured commits. Proposes multiple logical commits if changes span different activities.
author: Todd Warren
version: 1.0.0
keywords:
  - git
  - commit
  - structured-message
  - changelog
  - conventional-commits
tags:
  - workflow
  - version-control
  - documentation
---

# Git Commit with Structured Message

Examines git working tree changes, stages files intelligently, and creates commits with structured messages. If changes involve significantly different activities, proposes multiple logical commits.

## Workflow

### 1. Examine Working Tree

```bash
git status                    # See all modified/untracked files
git diff --name-status        # Show file change types (M/A/D)
git diff HEAD                 # Review actual changes by file
git diff --stat               # Summary of what changed
```

### 2. Categorize Changes

Group changes by logical activity:

- **Same feature/fix:** Group together in one commit
- **Different features/fixes:** Separate into different commits
- **Unrelated files:** Create separate commits

**Example grouping:**

```
Activity 1: GitHub Actions deployment workflows
  - .github/workflows/deploy-prod.yml (new)
  - .github/workflows/deploy-staging.yml (modified)

Activity 2: Skill documentation
  - .agents/skills/git-commit-structured/SKILL.md (new)

→ Propose 2 commits
```

### 3. Stage Files by Activity

```bash
# Stage files for first commit
git add .github/workflows/deploy-prod.yml
git add .github/workflows/deploy-staging.yml

# Verify staged changes
git diff --cached

# Commit
git commit -m "(chore): update github deployment actions

- Add production deployment workflow with manual trigger
- Implement manual workflow dispatch trigger for production
- Add confirmation gate requiring explicit deploy-production text
- Update staging workflow to trigger on push and CI success"

# Stage files for second commit
git add .agents/skills/git-commit-structured/

# Commit
git commit -m "(chore): add git commit skill with working tree analysis

- Examine git diff to categorize changes
- Propose multiple commits for logically distinct activities
- Stage files incrementally by activity group
- Create structured commit messages with bullet point summaries"
```

## Message Format

**Subject line:** `(type): short summary`

**Body:** Markdown bullet points describing changes (2–5 bullets)

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `chore` - Maintenance, tooling, configs, deployments
- `refactor` - Code restructuring without behavior change
- `test` - Test additions/updates
- `docs` - Documentation
- `style` - Code formatting/style

## Workflow Steps (Agent Usage)

1. **Run `git status` and `git diff --stat`**
   - Identify all modified, added, deleted files
   - Group changes into logical activities

2. **Propose commit breakdown** (show to user if multiple commits)
   - List files per commit
   - Suggest commit type and subject for each
   - Ask for confirmation before proceeding

3. **Stage files incrementally**
   - `git add` files for first logical commit
   - Verify with `git diff --cached`
   - Commit with structured message
   - Repeat for each activity group

4. **Report summary**
   - List commits created
   - Confirm all changes are committed

5. **Ask about pushing to origin**
   - Prompt user: "Push commits to origin?" (yes/no)
   - If user declines, stop here
   - If user accepts, proceed to step 6

6. **Check if branch exists on remote and push**
   - Run: `git push origin <current-branch>` (first attempt)
   - If branch doesn't exist on remote:
     ```bash
     # Set upstream and push with -u flag
     git push -u origin <current-branch>
     ```
   - If branch exists on remote:
     ```bash
     # Normal push to existing remote branch
     git push origin <current-branch>
     ```
   - Confirm push succeeded

## Best Practices

- **One logical unit per commit:** Each commit should represent a single, coherent change
- **Subject line:** Imperative mood, under 72 characters ("add", "update", not "added", "updated")
- **Body bullets:** Focus on _what_ changed and _why_, not implementation details
- **Avoid mixing concerns:** Don't commit tests with features; don't mix docs with code
- **Use git status regularly:** Check for unintended changes or forgotten files

## Example: Multi-Commit Scenario

**Working tree changes:**

```
Modified:  src/components/Timeline.tsx
Added:     src/components/Timeline.test.tsx
Modified:  src/data/timeline-data.ts
Added:     docs/timeline-feature.md
Modified:  package.json (version bump)
```

**Proposed commits:**

**Commit 1:** `(feat): add timeline component with filtering`

- Stage: Timeline.tsx, Timeline.test.tsx, timeline-data.ts

**Commit 2:** `(docs): document timeline feature`

- Stage: docs/timeline-feature.md

**Commit 3:** `(chore): bump version to 1.2.0`

- Stage: package.json

## Push & Upstream Tracking

When pushing commits to a new branch (one that doesn't exist on `origin` yet):

### Step-by-step Push Process

```bash
# Get current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Attempt to push
git push origin $BRANCH

# If push fails with "no upstream" or "branch does not exist" error:
git push -u origin $BRANCH

# Verify upstream is set
git branch -vv
```

### What the `-u` flag does

`git push -u origin <branch>` performs two actions:

1. **Pushes** the commits to `origin/<branch>`
2. **Sets the upstream** tracking so `git pull` and `git status` know where to sync from

### Checking Upstream Status

```bash
# View all branches with upstream tracking
git branch -vv

# Example output:
# main                 abcd123 [origin/main] commit message
# feature/new-thing    xyz9999 [origin/feature/new-thing] commit message
```

### Best Practices for Push

- **Ask before pushing:** Always confirm with the user before pushing commits
- **Use `-u` for new branches:** Auto-set upstream when pushing a new branch with `-u origin <branch>`
- **Verify success:** Check that the push command completed without errors
- **Confirm tracking:** Run `git branch -vv` to confirm upstream is correctly set

## Integration with Agents

**When to use:**

- After completing feature/fix work with multiple files
- When unsure whether changes should be split across commits
- To ensure consistent, structured commit history

**Preferred invocation:**

```
Use the git-commit-structured skill to:
1. Examine all working tree changes with git status and git diff --stat
2. Propose logical commit groupings if changes span multiple activities
3. Stage and commit files incrementally with structured messages
```
