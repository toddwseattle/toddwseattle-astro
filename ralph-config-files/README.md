# Ralph Wiggum Configuration Files
## for toddwseattle-astro

This directory contains all the configuration files needed to set up Ralph Wiggum autonomous coding for your Astro blog.

## Quick Start

1. **Copy these files to your repo:**
   ```bash
   cd ~/path/to/toddwseattle-astro
   
   # Create .ralph directory
   mkdir -p .ralph/specs/{blog-enhancements,seo-improvements,accessibility}
   
   # Copy config files
   cp PROMPT.md .ralph/
   cp AGENT.md .ralph/
   cp IMPLEMENTATION_PLAN.md .ralph/
   cp AGENTS.md .ralph/
   
   # Copy specs
   cp specs/blog-enhancements/reading-time.md .ralph/specs/blog-enhancements/
   cp specs/seo-improvements/meta-tags.md .ralph/specs/seo-improvements/
   ```

2. **Or run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Install Ralph:**
   ```bash
   npm install -g @anthropic-ai/claude-code
   npm install -g ralph-claude-code
   ```

4. **Initialize:**
   ```bash
   ralph init --backend claude
   ```

5. **Run your first task:**
   ```bash
   ralph run -p "Implement reading time feature from specs" --max-iterations 5
   ```

## Files Included

### Core Configuration
- **PROMPT.md** - Main instructions for Ralph (operating manual)
- **AGENT.md** - Build and test commands (backpressure enforcement)
- **IMPLEMENTATION_PLAN.md** - Task tracking and progress
- **AGENTS.md** - Learnings and patterns (updated during runs)

### Example Specs
- **specs/blog-enhancements/reading-time.md** - Add reading time to blog posts
- **specs/seo-improvements/meta-tags.md** - Comprehensive SEO meta tags

### Helper Scripts
- **setup.sh** - Automated setup script

## What Each File Does

### PROMPT.md
The "brain" of Ralph. Contains:
- Project overview and principles
- Task selection strategy
- Implementation guidelines
- Critical backpressure rules
- Reference documentation

**Edit this when:**
- Ralph makes consistent mistakes (add "signs")
- You want to change coding style
- You want to emphasize specific patterns

### AGENT.md
The "test suite" instructions. Contains:
- All commands Ralph must run before committing
- Expected outputs
- Debugging steps

**Edit this when:**
- You add new testing tools
- Build process changes
- New validation steps needed

### IMPLEMENTATION_PLAN.md
The "task board". Contains:
- List of all tasks (TODO, IN_PROGRESS, DONE)
- Acceptance criteria per task
- Attempt counters
- Completion notes

**Edit this when:**
- Adding new features to build
- Prioritizing work
- Marking tasks as blocked

### AGENTS.md
The "institutional knowledge". Contains:
- Patterns that work
- Common gotchas
- Project-specific conventions
- Debugging strategies

**Edit this when:**
- Ralph discovers new patterns
- You learn from failures
- Project conventions change

## How to Use

### First Run (Human-in-the-Loop)

Start supervised to see how Ralph works:

```bash
# Create a feature branch
git checkout -b feature/ralph-reading-time

# Run with limited iterations
ralph run -p "Implement reading time from specs/blog-enhancements/reading-time.md" --max-iterations 3

# Watch in another terminal
tail -f .ralph/logs/$(ls -t .ralph/logs/ | head -1)

# Review results
git diff
npm run test
npm run build

# If good, commit
git add .
git commit -m "feat(blog): add reading time calculation"
```

### Autonomous Run (After Tuning)

Once you trust Ralph:

```bash
# Run overnight
ralph run -p "Work through IMPLEMENTATION_PLAN.md" --max-iterations 20

# Review in the morning
git log --oneline
git diff main
```

### Planning Mode

Let Ralph analyze and plan:

```bash
ralph plan "Add reading time, improve SEO, add related posts"

# Review generated specs
ls -la .ralph/specs/
cat .ralph/IMPLEMENTATION_PLAN.md
```

## Customization Guide

### For Your Astro Site

The included configs are tailored to your Astro blog with:
- TypeScript strict mode
- Vitest testing
- Tailwind design system
- Content collections
- Writing-first aesthetic

If your project differs, update:
1. `PROMPT.md` - Build commands and principles
2. `AGENT.md` - Test and build scripts
3. Specs - Match your actual features

### Adding New Task Types

To add a new category of work:

1. **Create spec directory:**
   ```bash
   mkdir .ralph/specs/new-feature-type
   ```

2. **Create spec template:**
   ```markdown
   # Spec: Feature Name
   
   ## Job to Be Done
   [User need]
   
   ## Success Criteria
   - [ ] Criteria 1
   - [ ] Criteria 2
   
   ## Implementation Notes
   [Details]
   
   ## Acceptance Criteria
   - [ ] Tests pass
   - [ ] Build succeeds
   ```

3. **Add to IMPLEMENTATION_PLAN.md:**
   ```markdown
   ### TODO: New Feature
   - **Priority:** High/Medium/Low
   - **Spec:** `specs/new-feature-type/feature.md`
   - **Acceptance Criteria:** [from spec]
   - **Status:** TODO
   ```

## Monitoring & Debugging

### Watch Logs
```bash
tail -f .ralph/logs/$(ls -t .ralph/logs/ | head -1)
```

### Check Stuck Tasks
```bash
grep "Attempts: [5-9]" .ralph/IMPLEMENTATION_PLAN.md
```

### View Recent Work
```bash
git log --oneline -10
git diff HEAD~5
```

### Monitor Dashboard
```bash
ralph web  # Opens at localhost:3000
```

## Troubleshooting

### Ralph Won't Start
```bash
# Check installation
ralph --version
claude-code --version

# Check credentials
echo $ANTHROPIC_API_KEY

# Reinitialize
ralph init --backend claude
```

### Tasks Keep Failing
1. Read the logs in `.ralph/logs/`
2. Check if spec is clear enough
3. Verify backpressure is working (tests running?)
4. Split task into smaller pieces
5. Add learnings to `AGENTS.md`

### Build Errors
```bash
# Clear caches
rm -rf dist .astro node_modules/.cache

# Reinstall
npm install

# Rebuild
npm run build
```

## Safety Notes

1. **Always use a branch:**
   ```bash
   git checkout -b feature/ralph-work
   ```

2. **Set iteration limits:**
   ```bash
   ralph run --max-iterations 10  # Don't run unlimited initially
   ```

3. **Review before merging:**
   ```bash
   git log --oneline
   git diff main
   npm run test
   npm run build
   ```

4. **Monitor costs:**
   - Check Anthropic dashboard
   - Set budget alerts
   - ~$10-15/hour typical

## Resources

- **Full Setup Guide:** `ralph-setup-guide-toddwseattle-astro.md`
- **Ralph Technique:** https://ghuntley.com/ralph/
- **Claude Code:** https://docs.anthropic.com/
- **Your Project Docs:** `docs/04-style-guide.md`

## Next Steps

1. ✅ Copy these files to your repo
2. ✅ Run setup.sh or manual setup
3. ✅ Review and customize configs
4. ✅ Create your first spec
5. ✅ Run Ralph with max 3 iterations
6. ✅ Observe and tune
7. ✅ Gradually increase autonomy

## Support

For issues specific to:
- **Ralph setup:** Check setup.sh output
- **Your Astro site:** Reference docs/
- **Ralph technique:** See ghuntley.com/ralph
- **Claude Code:** Anthropic docs

---

**Good luck and happy autonomous coding!** 🎯
