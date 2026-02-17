#!/bin/bash
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
    opencode run "Implement the next step from the plan in $PLAN_FILE for the Astro project. Focus on TypeScript safety and Astro best practices. After making changes, run 'npm run test:run' to ensure nothing is broken. If tests fail, do not fix them here; just implement the planned changes. Summarize changes made." \
        --agent worker
    # Step B: The Governor Check (Local Compiler)
    echo "⚖️ [Governor] Running Astro Check..."
    npx astro check > .ralph_errors.log 2>&1
    CHECK_EXIT=$?

    if [ $CHECK_EXIT -eq 0 ]; then
        echo "✅ Astro Check passed!"
        npm run test:run > .ralph_errors.log 2>&1
        TEST_EXIT=$?
        if [ $TEST_EXIT -ne 0 ]; then
            echo "❌ Tests failed. Calling Qwen to fix..."

            opencode run "Fix the failing tests reported by 'npm run test:run': $(cat .ralph_errors.log)" \
                --agent fixer 
            opencode run "Ensure all tests pass after fixes." \
                --agent tester
            opencode run "prepare a commit message" \
                --agent committer
            git add . && git commit -F .ralph/docs/generated/commit-message.txt
            ((ITERATION++))
            rm .ralph/docs/generated/commit-message.txt
            continue
        fi
        echo "✅ All tests passed!"

        read -p "Commit changes? (y/n): " confirm
        if [[ "$confirm" != "y" ]]; then
            echo "Aborting as per user request."
            exit 1
        fi
        opencode run "prepare a commit message" \
                --agent committer
        git add . && git commit -F .ralph/docs/generated/commit-message.txt
        rm .ralph/docs/generated/commit-message.txt
        # Check if model actually finished
        if grep -q "<promise>COMPLETE</promise>" .ralph_errors.log; then
            echo "🎊 Task fully completed by Ralph."
            exit 0
        fi
    else
        echo "⚠️ Check failed. Calling Qwen to fix..."
        # Step C: Precision Fix (Qwen 3 via Zen)
        opencode run "Fix these errors reported by 'npx astro check': $(cat .ralph_errors.log)" \
            --agent fixer 
        
        git add . && git commit -m "Ralph iteration $ITERATION: Fixing errors"
    fi

    ((ITERATION++))
    # Safety sleep to prevent API throttling
    sleep 2
done

echo "❌ Ralph hit the iteration limit. Review the git history for progress."