import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 3.5 }) {
  const id = "q-git-signed-squash-surgery";
  const title = "Git: Cryptographically Signed History Reconstruction with Squash Constraints";

  const random = seedrandom(`${user.email}#${id}`);
  
  const targetSHA = String(Math.floor(random() * 900000 + 100000)).substring(0, 6); // 6-character SHA prefix
  const authorDomain = ['company.com', 'opensource.org', 'research.edu'][Math.floor(random() * 3)];
  const commitYear = 2023 + Math.floor(random() * 2); // 2023 or 2024
  const minSquashedCommits = 5 + Math.floor(random() * 4); // 5-8 commits
  const maxFileSize = 100 + Math.floor(random() * 50); // 100-149 bytes per file
  const requiredBranches = 3;
  const gpgKeyId = `${Math.floor(random() * 900000000 + 100000000).toString(16).toUpperCase()}`; // Mock GPG key
  
  const answer = null; // Manual validation

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Compliance-Ready Git History for Regulated Open Source Release</h2>
      <p>
        <strong>ComplianceCorp</strong> must release internal code as open source while meeting regulatory requirements:
        cryptographic commit signing, specific authorship attribution, and verifiable lineage.
      </p>

      <h3>Mandatory Requirements</h3>
      <ol>
        <li><strong>Exactly ${requiredBranches} branches</strong>: main, develop, and one feature branch</li>
        <li><strong>Main branch tip SHA</strong> must start with <code>${targetSHA}</code> (requires commit mining)</li>
        <li><strong>All commits</strong> must have:
          <ul>
            <li>Author email ending with <code>@${authorDomain}</code></li>
            <li>Timestamp in year ${commitYear} (Jan 1 00:00 UTC to Dec 31 23:59 UTC)</li>
            <li>GPG signature (real or mocked with <code>-S</code> flag)</li>
            <li>Commit message format: <code>type(scope): description</code></li>
          </ul>
        </li>
        <li><strong>Squashed history</strong>: Feature branch must have ≥${minSquashedCommits} original commits, squashed into 1 merge commit</li>
        <li><strong>File constraints</strong>:
          <ul>
            <li>Exactly 5 files: README.md, .gitignore, src/main.py, tests/test_main.py, setup.py</li>
            <li>Each file ≤${maxFileSize} bytes</li>
            <li>No binary files</li>
          </ul>
        </li>
        <li><strong>Linear history on main</strong>: No merge bubbles except the final feature merge</li>
        <li><strong>Repository size</strong>: &lt;100KB (check with <code>du -sh .git</code>)</li>
        <li><strong>Verified lineage</strong>: <code>git log --graph --all</code> must show clear feature → develop → main flow</li>
      </ol>

      <h3>Advanced Constraints</h3>
      <ul class="border border-warning p-3">
        <li><strong>SHA mining challenge</strong>: The main branch tip must have SHA starting with <code>${targetSHA}</code>
          <ul>
            <li>Mine by varying commit metadata (GIT_AUTHOR_NAME, tree hash, etc.)</li>
            <li>Cannot simply amend messages—must find valid combination</li>
          </ul>
        </li>
        <li><strong>Cryptographic signatures</strong>: Each commit must pass <code>git verify-commit</code>
          <ul>
            <li>Setup GPG key: <code>gpg --quick-gen-key "Build Bot &lt;bot@${authorDomain}&gt;"</code></li>
            <li>Configure Git: <code>git config user.signingkey &lt;key-id&gt;</code></li>
            <li>Sign on commit: <code>git commit -S -m "..."</code></li>
          </ul>
        </li>
        <li><strong>Squash merge validation</strong>: Feature branch history must be preserved but unreachable from main
          <ul>
            <li>Use <code>git merge --squash feature</code> to collapse ${minSquashedCommits}+ commits</li>
            <li>Original commits remain in reflog but not in git log from main</li>
          </ul>
        </li>
      </ul>

      <h3>Step-by-Step Approach</h3>
      <pre><code class="language-bash"># 1. Initialize repository
git init compliance-repo
cd compliance-repo

# 2. Configure GPG signing
git config user.name "Build Bot"
git config user.email "bot@${authorDomain}"
git config commit.gpgsign true
git config user.signingkey YOUR_GPG_KEY_ID

# 3. Set timestamp (example for ${commitYear}-06-15 10:00 UTC)
export GIT_AUTHOR_DATE="${commitYear}-06-15T10:00:00Z"
export GIT_COMMITTER_DATE="${commitYear}-06-15T10:00:00Z"

# 4. Create initial commit on main
echo "# Compliance Project" > README.md
git add README.md
git commit -S -m "feat(init): initial commit"

# 5. Create develop branch
git checkout -b develop
echo "*.pyc" > .gitignore
git add .gitignore
git commit -S -m "chore(config): add gitignore"

# 6. Create feature branch with ${minSquashedCommits}+ commits
git checkout -b feature/analytics
for i in {1..${minSquashedCommits}}; do
  echo "# Commit $i" >> src/main.py
  git add src/main.py
  export GIT_AUTHOR_DATE="${commitYear}-07-$(printf %02d $((i+1)))T14:00:00Z"
  export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
  git commit -S -m "feat(analytics): add feature part $i"
done

# 7. Merge feature into develop with squash
git checkout develop
git merge --squash feature/analytics
git commit -S -m "feat(analytics): complete analytics module"

# 8. Mine for target SHA on main
git checkout main
# ... SHA mining logic here (iterate until SHA matches ${targetSHA})

# 9. Validate
git log --graph --all --oneline
git log --show-signature
git verify-commit HEAD
du -sh .git
ls -lh src/ tests/ setup.py</code></pre>

      <h3>SHA Mining Strategy</h3>
      <p>To find a commit starting with <code>${targetSHA}</code>:</p>
      <pre><code class="language-bash">#!/bin/bash
# Mine for target SHA by varying author name suffix
TARGET_PREFIX="${targetSHA}"
COUNTER=0

while true; do
  export GIT_AUTHOR_NAME="Build Bot $COUNTER"
  export GIT_AUTHOR_DATE="${commitYear}-12-31T23:00:00Z"
  export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
  
  # Create a commit
  git commit --amend --no-edit --allow-empty -S
  
  SHA=$(git rev-parse HEAD)
  if [[ "$SHA" == "$TARGET_PREFIX"* ]]; then
    echo "Found! SHA: $SHA"
    break
  fi
  
  ((COUNTER++))
  if ((COUNTER % 100 == 0)); then
    echo "Tried $COUNTER attempts..."
  fi
done</code></pre>

      <h3>Validation Commands</h3>
      <pre><code class="language-bash"># Branch count
git branch --list | wc -l  # Should be 3

# SHA prefix check
git rev-parse main | head -c 6  # Should be ${targetSHA}

# Signature verification
git log --show-signature main

# Author email check
git log --all --pretty=format:"%ae" | grep -v "@${authorDomain}" | wc -l  # Should be 0

# Timestamp range check
git log --all --pretty=format:"%ct" | awk '{
  if ($1 < $(date -d "${commitYear}-01-01 00:00:00 UTC" +%s) || 
      $1 > $(date -d "${commitYear}-12-31 23:59:59 UTC" +%s)) {
    print "Timestamp out of range: " $1
  }
}'

# File count and size
git ls-tree -r main --name-only | wc -l  # Should be 5
git cat-file -s main:src/main.py  # Should be ≤${maxFileSize}

# Repository size
du -sh .git  # Should be &lt;100KB

# Commit message format
git log --all --pretty=format:"%s" | grep -v "^[a-z]\\+([a-z]\\+):" | wc -l  # Should be 0

# Graph structure
git log --graph --all --oneline</code></pre>

      <h3>Deliverables</h3>
      <p>Submit the following:</p>
      <ol>
        <li>Output of <code>git log --graph --all --pretty=format:"%H %s %ae %ct" --show-signature</code></li>
        <li>Output of <code>git ls-tree -r -l main</code></li>
        <li>Explanation of your SHA mining approach</li>
      </ol>

      <label for="${id}" class="form-label">
        Paste output of <code>git log --graph --all --oneline</code>:
      </label>
      <textarea class="form-control font-monospace" id="${id}" name="${id}" rows="20"></textarea>
      
      <div class="mt-2 text-muted">
        <small>
          Time estimate: 2-3 hours including SHA mining<br>
          Evaluation: Automated verification of all constraints
        </small>
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
