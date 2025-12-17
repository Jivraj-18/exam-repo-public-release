import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-batch-processing";
  const title = "Batch File Processing";

  const question = html`
    <div class="mb-3">
      <p>
        You have a directory containing: <code>data.txt</code>, <code>image.png</code>, and <code>script.sh</code>.
      </p>
      <p>
        You run the following script:
      </p>
      <pre><code>
#!/bin/bash
for file in *.txt; do
    mv "$file" "$(date +%Y)-${file}"
done
      </code></pre>
      <p>
        Assuming the current year is <strong>2025</strong>, what will be the new name of <code>data.txt</code>?
      </p>
      <label for="${id}" class="form-label">Enter the full new filename:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: (val) => val.trim() === "2025-data.txt"
  };
}
