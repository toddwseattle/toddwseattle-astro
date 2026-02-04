#!/bin/bash
ß
# Configuration
TASK=$1
MAX_ITERATIONS=15
PLAN_FILE=".ralph_plan.md"

if [ -z "$TASK" ]; then
    echo "Usage: ./ralph.sh \"Your Astro task here\""
    exit 1
fi

echo "🚀 Starting RalphLoop: $TASK"

# PHASE 1: Planning with Claude Pro
echo "🧠 [Architect: Claude Pro] Planning the work..."
opencode run "Plan this task: $TASK. Save the plan to $PLAN_FILE. Focus on Astro components and TS safety." --agent architect

# PHASE 2: The Loop
ITERATION=1
while [ $ITERATION -le $MAX_ITERATIONS ]; do
    echo "--- 🔨 Iteration $ITERATION of $MAX_ITERATIONS ---"

    # Step A: Mechanical Work (GitHub Copilot)
    echo "📝 [Worker: Copilot] Implementing next step..."
    opencode run "Follow the plan in $PLAN_FILE. Execute the next logical code change. If done, say <promise>COMPLETE</promise>" \
        --agent worker --non-interactive

    # Step B: The Governor Check (Local Compiler)
    echo "⚖️ [Governor] Running Astro Check..."
    npx astro check > .ralph_errors.log 2>&1
    CHECK_EXIT=$?

    if [ $CHECK_EXIT -eq 0 ]; then
        echo "✅ Astro Check passed!"
        git add . && git commit -m "Ralph iteration $ITERATION: Success"
        
        # Check if model actually finished
        if grep -q "<promise>COMPLETE</promise>" .ralph_errors.log; then
            echo "🎊 Task fully completed by Ralph."
            exit 0
        fi
    else
        echo "⚠️ Check failed. Calling Qwen to fix..."
        # Step C: Precision Fix (Qwen 3 via Zen)
        opencode run "Fix these errors reported by 'npx astro check': $(cat .ralph_errors.log)" \
            --agent fixer --non-interactive
        
        git add . && git commit -m "Ralph iteration $ITERATION: Fixing errors"
    fi

    ((ITERATION++))
    # Safety sleep to prevent API throttling
    sleep 2
done

echo "❌ Ralph hit the iteration limit. Review the git history for progress."