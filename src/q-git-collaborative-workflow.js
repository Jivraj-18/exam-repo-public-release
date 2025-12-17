/**
 * TDS Exam Question: Git Collaborative Workflow Simulation
 * 
 * Topic: Version Control and Collaboration
 * Difficulty: Easy-Medium
 * Student: 24f2007461
 * Date: December 17, 2025
 */

export const info = {
  name: "q-git-collaborative-workflow",
  points: 8,
  desc: `
## Question 5: Git Collaborative Workflow Simulation

**Topic:** Version Control and Collaboration
**Difficulty:** Easy-Medium

**Description:**
You're working on a team project with the following scenario:

**Situation:**
- You're assigned to add a new feature: user authentication
- Repository: \`team-project\`
- Main branch: \`main\`
- Your task: Create login functionality in \`auth.py\`
- Your teammate just pushed changes to \`main\` that modified \`database.py\`
- You need to incorporate their changes before submitting your work

**Task:**
Write the complete sequence of Git commands (with explanations) for: 

1. Check current branch and status
2. Create a new feature branch \`feature-authentication\`
3. Create a new file \`auth.py\` with basic authentication code
4. Stage and commit your changes
5. Your teammate pushed to \`main\` - fetch latest changes
6. Merge \`main\` into your feature branch
7. Resolve any conflicts (explain the process)
8. Push your feature branch to remote
9. Create a pull request (describe the steps)
10. After PR approval, merge and delete the feature branch

**Bonus: Explain the difference between:**
- \`git merge\` vs \`git rebase\`
- \`git fetch\` vs \`git pull\`
- \`git reset\` vs \`git revert\`

**Expected Skills Tested:**
- Branching strategies
- Merge conflict resolution
- Pull request workflow
- Remote repository operations
- Git best practices

**Learning Outcomes:**
- Master collaborative Git workflows
- Understand branching and merging
- Handle merge conflicts effectively
- Follow industry-standard practices
  `,
  tags: ["git", "version-control", "collaboration", "branching", "workflow"]
};

export default function question(ctx) {
  const commandSequence = `
# Git Collaborative Workflow - Complete Command Sequence

# Step 1: Check current branch and status
git status
git branch

# Expected output:
# On branch main
# Your branch is up to date with 'origin/main'
# nothing to commit, working tree clean

# Step 2: Create and switch to feature branch
git checkout -b feature-authentication

# Alternative command (Git 2.23+):
git switch -c feature-authentication

# Verify you're on the new branch:
git branch
# Output should show: * feature-authentication

# Step 3: Create auth.py file with authentication code
# (This would be done manually or with an editor)
# echo "# Authentication module" > auth.py

# Step 4: Stage and commit your changes
git add auth.py
git status  # Verify file is staged

git commit -m "Add basic authentication module

- Implement user login functionality
- Add password validation
- Create session management
- Add logout feature"

# Verify commit was created:
git log --oneline -5

# Step 5: Fetch latest changes from main
git fetch origin main

# Check what changed:
git log --oneline main..origin/main

# Step 6: Merge main into your feature branch
git merge origin/main

# If there are conflicts, you'll see:
# Auto-merging [filename]
# CONFLICT (content): Merge conflict in [filename]
# Automatic merge failed; fix conflicts and then commit the result.

# Step 7: Resolve conflicts (if any)
# If conflicts occur:

# 7a. Check which files have conflicts:
git status

# 7b. Open conflicted files and resolve manually
# Look for conflict markers:
# <<<<<<< HEAD
# Your changes
# =======
# Changes from main
# >>>>>>> origin/main

# 7c. After resolving conflicts:
git add [resolved-file]
git commit -m "Resolve merge conflicts with main branch"

# Step 8: Push your feature branch to remote
git push origin feature-authentication

# Or set upstream for future pushes:
git push -u origin feature-authentication

# Step 9: Create Pull Request
# This is typically done through web interface (GitHub, GitLab, etc.)
# Steps in web interface:
# 1. Navigate to repository on GitHub
# 2. Click "Pull requests" tab
# 3. Click "New pull request"
# 4. Select base branch: main
# 5. Select compare branch: feature-authentication
# 6. Add title: "Add user authentication feature"
# 7. Add description explaining changes
# 8. Add reviewers and assignees
# 9. Click "Create pull request"

# Step 10: After PR approval and merge
# Switch back to main:
git checkout main

# Pull the latest changes (including your merged feature):
git pull origin main

# Delete the local feature branch:
git branch -d feature-authentication

# Delete the remote feature branch (optional):
git push origin --delete feature-authentication

# Verify cleanup:
git branch -a
  `;

  const bestPractices = `
# Git Best Practices and Advanced Workflows

# 1. BRANCH NAMING CONVENTIONS
# Use descriptive names with prefixes:
# feature/user-authentication
# bugfix/login-error
# hotfix/security-patch
# release/v1.2.0

# 2. COMMIT MESSAGE CONVENTIONS
# Follow conventional commit format:
git commit -m "feat: add user authentication module

Add login/logout functionality with session management.
Includes password validation and security features.

Closes #123"

# 3. INTERACTIVE REBASE FOR CLEAN HISTORY
# Before merging, clean up commit history:
git rebase -i HEAD~3

# This opens editor to squash, reword, or reorder commits

# 4. SAFE MERGE STRATEGIES
# Use --no-ff to preserve branch history:
git merge --no-ff feature-authentication

# 5. CHECKING WHAT WILL BE MERGED
git diff main...feature-authentication
git log main..feature-authentication

# 6. STASHING WORK IN PROGRESS
# If you need to switch branches with uncommitted changes:
git stash
git checkout main
# Do other work
git checkout feature-authentication
git stash pop

# 7. CHERRY-PICKING SPECIFIC COMMITS
# To apply specific commit to another branch:
git cherry-pick <commit-hash>

# 8. UNDOING CHANGES SAFELY
# Undo last commit (keep changes in working directory):
git reset --soft HEAD~1

# Undo last commit (discard changes):
git reset --hard HEAD~1

# Create a new commit that undoes previous commit:
git revert HEAD

# 9. TRACKING REMOTE BRANCHES
git branch -vv  # See tracking information
git remote show origin  # See remote branch information
  `;

  const conflictResolution = `
# Advanced Conflict Resolution Strategies

# 1. UNDERSTANDING CONFLICT MARKERS
# When Git can't automatically merge, you'll see:
"""
<<<<<<< HEAD (Current Change - Your Branch)
def authenticate(username, password):
    # Your implementation
    return validate_user_credentials(username, password)
=======
def authenticate(user, pwd):
    # Teammate's implementation  
    return check_user_login(user, pwd)
>>>>>>> origin/main (Incoming Change)
"""

# 2. CONFLICT RESOLUTION TOOLS
# Use built-in merge tool:
git mergetool

# Use VS Code as merge tool:
git config merge.tool vscode
git config mergetool.vscode.cmd 'code --wait $MERGED'

# Use vimdiff:
git config merge.tool vimdiff

# 3. DIFFERENT MERGE STRATEGIES
# Prefer your changes:
git checkout --ours conflicted-file.py

# Prefer their changes:
git checkout --theirs conflicted-file.py

# 4. ABORT MERGE IF NEEDED
git merge --abort

# 5. THREE-WAY MERGE UNDERSTANDING
# Git shows three versions:
# - Base version (common ancestor)
# - Your version (HEAD)
# - Their version (incoming branch)

# 6. PREVENTING CONFLICTS
# - Communicate with team about file changes
# - Keep feature branches short-lived
# - Regularly sync with main branch
# - Use smaller, focused commits
  `;

  const comparisonExplanations = `
# Git Command Comparisons and Explanations

## 1. git merge vs git rebase

### git merge:
- Creates a merge commit that combines two branches
- Preserves the history of both branches
- Non-destructive operation
- Good for feature integration

git checkout main
git merge feature-authentication
# Creates merge commit with two parents

### git rebase:
- Re-applies commits from one branch onto another
- Creates a linear history
- Rewrites commit history (destructive)
- Good for cleaning up feature branch before merge

git checkout feature-authentication
git rebase main
# Replays your commits on top of main

## 2. git fetch vs git pull

### git fetch:
- Downloads commits, files, and refs from remote
- Does NOT modify your working directory
- Safe operation - just updates remote-tracking branches
- Allows you to review changes before integrating

git fetch origin
git log HEAD..origin/main  # See what's new
git merge origin/main      # Manually integrate

### git pull:
- Combination of git fetch + git merge
- Automatically attempts to merge remote changes
- Can create unexpected merge commits
- Less control over the merge process

git pull origin main
# Equivalent to: git fetch origin && git merge origin/main

## 3. git reset vs git revert

### git reset:
- Moves branch pointer to different commit
- Can modify working directory and staging area
- Dangerous for shared branches (rewrites history)
- Three modes: --soft, --mixed, --hard

git reset --soft HEAD~1   # Undo commit, keep changes staged
git reset --mixed HEAD~1  # Undo commit and staging, keep changes in working dir
git reset --hard HEAD~1   # Undo commit, staging, and working directory changes

### git revert:
- Creates a new commit that undoes previous commit
- Safe for shared branches (doesn't rewrite history)
- Preserves history while undoing changes
- Can revert merge commits with -m option

git revert HEAD           # Create new commit undoing last commit
git revert -m 1 HEAD      # Revert merge commit

## When to use each:

### Use git merge when:
- Integrating feature branches
- You want to preserve branch history
- Working on a team project

### Use git rebase when:
- Cleaning up local commits before pushing
- Want linear history
- Feature branch hasn't been shared yet

### Use git fetch when:
- You want to see changes before merging
- Working on critical code that needs review
- Want to avoid unexpected merges

### Use git pull when:
- Simple updates to main branch
- You trust the remote changes
- Working on personal projects

### Use git reset when:
- Working on local branches not yet shared
- Need to undo local commits
- Want to restructure recent history

### Use git revert when:
- Need to undo commits on shared branches
- Want to maintain history integrity
- Undoing released changes
  `;

  const workflowExamples = `
# Real-World Git Workflow Examples

## 1. GITFLOW WORKFLOW
# Main branches: main (production) and develop (integration)

# Start new feature:
git checkout develop
git pull origin develop
git checkout -b feature/user-auth

# Work on feature:
git add .
git commit -m "feat: implement login form"

# Finish feature:
git checkout develop
git pull origin develop
git checkout feature/user-auth
git rebase develop
git checkout develop
git merge --no-ff feature/user-auth
git push origin develop
git branch -d feature/user-auth

## 2. GITHUB FLOW (Simpler)
# Only main branch, feature branches for everything

git checkout main
git pull origin main
git checkout -b add-password-reset

# Work and commit:
git add .
git commit -m "Add password reset functionality"
git push origin add-password-reset

# Create PR, review, merge through GitHub interface

## 3. FORKING WORKFLOW (Open Source)
# Fork repo on GitHub, clone your fork:

git clone https://github.com/yourusername/project.git
cd project
git remote add upstream https://github.com/original/project.git

# Create feature branch:
git checkout -b fix-bug-123

# Keep fork updated:
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# Submit PR from your fork to upstream repo

## 4. RELEASE WORKFLOW
# Preparing a release:

git checkout develop
git checkout -b release/v1.2.0

# Finalize release (version bumps, changelog):
git add .
git commit -m "Bump version to 1.2.0"

# Merge to main:
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"

# Merge back to develop:
git checkout develop
git merge --no-ff release/v1.2.0

# Push everything:
git push origin main
git push origin develop
git push origin v1.2.0

# Clean up:
git branch -d release/v1.2.0
  `;

  return {
    type: "git",
    commandSequence: commandSequence,
    bestPractices: bestPractices,
    conflictResolution: conflictResolution,
    comparisonExplanations: comparisonExplanations,
    workflowExamples: workflowExamples,
    keyFeatures: [
      "Complete collaborative workflow",
      "Conflict resolution strategies",
      "Branch management",
      "Pull request process",
      "Git command comparisons",
      "Real-world workflow examples"
    ]
  };
}
