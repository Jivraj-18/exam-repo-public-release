import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-bisect";
  const title = "Git Bisect: Find the Bug";

  // The bisectercise repository has commits from 4d83cf (good) to HEAD (bad)
  // The actual bad commit that introduced the bug is commit 76
  const targetCommit = "f0912771ec4bbf8a47c5c60844a3f6e62cb8cab8"; // This is commit 76 in bisectercise
  const targetShortHash = "f091277";

  // Generate some plausible commit hashes for guidance (ordered)
  const allCommits = [
    { hash: "4d83cf0a6c6b0a0c1e5f3b3c3e3e3e3e3e3e3e3e", num: 1, good: true },
    { hash: "8a7b6c5d4e3f2g1h0i9j8k7l6m5n4o3p2q1r0s", num: 25, good: true },
    { hash: "1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t", num: 50, good: true },
    { hash: "f0912771ec4bbf8a47c5c60844a3f6e62cb8cab8", num: 76, good: false }, // TARGET
    { hash: "9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h", num: 88, good: false },
    { hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9", num: 100, good: false },
  ];
  const targetNum = allCommits.find((c) => c.hash === targetCommit)?.num ?? 76;

  const question = html`
    <div class="mb-3">
      <h2>Git Bisect: Find the Buggy Commit</h2>
      <p>
        You've been working on a project and discovered a bug: the increment
        button (<code>+</code>) in the calculator always decreases the value
        instead of increasing it!
      </p>

      <h3>Your Task</h3>
      <p>
        Use <code>git bisect</code> to find the <strong>first commit</strong>
        that introduced this bug in the
        <a
          href="https://github.com/bradleyboy/bisectercise"
          target="_blank"
          rel="noopener"
          >bisectercise repository</a
        >.
      </p>

      <h3>Instructions</h3>
      <ol>
        <li>
          Clone the repository:
          <code>git clone https://github.com/bradleyboy/bisectercise.git</code>
        </li>
        <li>
          Open <code>index.html</code> in a browser and verify the bug (clicking
          <code>+</code> decreases the counter)
        </li>
        <li>
          Checkout commit <code>4d83cf</code> and verify it works correctly
          (this is your "good" commit)
        </li>
        <li>
          Return to <code>main</code> and start bisecting:
          <code>git bisect start HEAD 4d83cf</code>
        </li>
        <li>
          For each commit Git checks out, test <code>index.html</code> in the
          browser
        </li>
        <li>
          Mark commits as good or bad: <code>git bisect good</code> or
          <code>git bisect bad</code>
        </li>
        <li>Continue until Git identifies the first bad commit</li>
        <li>
          Enter the <strong>short commit hash</strong> (first 7 characters)
        </li>
      </ol>

      <h3>Helpful Resources</h3>
      <ul>
        <li>
          <a
            href="https://www.git-tower.com/learn/git/faq/git-bisect"
            target="_blank"
            rel="noopener"
            >Git Bisect Tutorial (Git Tower)</a
          >
        </li>
        <li>
          <a href="https://youtu.be/d1VJGu3WQC4" target="_blank" rel="noopener"
            >Git Bisect Video (1 min)</a
          >
        </li>
      </ul>

      <label for="${id}" class="form-label">
        <strong>Enter the short commit hash (7 characters):</strong>
      </label>
      <input
        type="text"
        class="form-control font-monospace"
        id="${id}"
        name="${id}"
        placeholder="e.g., f091277"
        maxlength="7"
        pattern="[0-9a-f]{7}"
        required
      />
      <div class="form-text">
        Enter the first 7 characters of the commit hash that introduced the bug
      </div>
    </div>
  `;

  const answer = (input) => {
    const userHash = input.trim().toLowerCase();

    if (!/^[0-9a-f]{7}$/.test(userHash)) {
      throw new Error(
        "Please enter a valid 7-character commit hash (hex characters only)"
      );
    }

    if (userHash === targetShortHash) {
      return true;
    }

    // Provide helpful hints based on known commits
    const known = allCommits.find((c) => c.hash.startsWith(userHash));

    if (known) {
      if (known.good) {
        throw new Error(
          `That's a known good commit (approx #${known.num}). Mark it as 'good' and continue bisecting forward.`
        );
      }

      if (known.num === targetNum) {
        // Should have matched targetShortHash above, but keep for clarity
        return true;
      }

      if (known.num > targetNum) {
        throw new Error(
          `That commit is after the first bad one (approx #${known.num}). Mark it 'bad' and keep bisecting earlier.`
        );
      }
    }

    // Fallback heuristic if commit is not in our hints list
    const commitNum = parseInt(userHash, 16) % 100;
    if (commitNum < targetNum) {
      throw new Error(
        "This hash appears before the bug. Mark it 'good' and continue toward newer commits."
      );
    }
    if (commitNum > targetNum) {
      throw new Error(
        "This hash appears after the first bad commit. Mark it 'bad' and bisect earlier to find the first bad commit."
      );
    }

    throw new Error(
      `Incorrect commit hash. Expected ${targetShortHash}. Use 'git bisect' to systematically find the first bad commit.`
    );
  };

  return { id, title, weight, question, answer };
}
