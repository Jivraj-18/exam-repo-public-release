import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-bash-sort-logs";
  const title = "Bash: Sort and Count Log Entries";

  const question = html`
    <div class="mb-3">
      <p>Given a file <code>logs.txt</code> with the following content:</p>
      <pre><code class="language-text">ERROR
INFO
INFO
ERROR
WARN
ERROR
INFO</code></pre>
      
      <p>You run the following command:</p>
      <pre><code class="language-bash">sort logs.txt | uniq -c | sort -nr | head -1</code></pre>
      
      <p>What is the output of this command?</p>
      <p class="text-muted">Enter the exact output including spaces and count.</p>
      
      <label for="${id}" class="form-label">Output:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  const answer = (input) => {
    const normalized = input.trim().replace(/\s+/g, " ");
    return normalized === "3 INFO";
  };

  return { id, title, weight, question, answer };
}
