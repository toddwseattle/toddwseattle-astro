# Create the structure
mkdir -p .ralph/specs/blog-enhancements
mkdir -p .ralph/specs/seo-improvements
mkdir -p .ralph/specs/accessibility
mkdir -p .ralph/specs/stdlib
mkdir -p .ralph/logs
mkdir -p .ralph/docs/generated
mkdir -p .ralph/examples

# Copy my custom config files
# (Assuming you extracted ralph-config-files/ from the zip)
cp ralph-config-files/PROMPT.md .ralph/
cp ralph-config-files/AGENT.md .ralph/
cp ralph-config-files/IMPLEMENTATION_PLAN.md .ralph/
cp ralph-config-files/AGENTS.md .ralph/
cp ralph-config-files/specs/blog-enhancements/reading-time.md .ralph/specs/blog-enhancements/
cp ralph-config-files/specs/seo-improvements/meta-tags.md .ralph/specs/seo-improvements/

# Update .gitignore
cat >> .gitignore << 'EOF'

# Ralph working directories
.ralph/logs/
.ralph/docs/generated/
.ralphrc
EOF