import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-bash-pipeline";
    const title = "Bash Pipeline";

    const random = seedrandom(`${user.email}#${id}`);

    // Generate a random number of files for different extensions
    const numTxt = Math.floor(random() * 20) + 5;
    const numLog = Math.floor(random() * 15) + 3;
    const numCsv = Math.floor(random() * 10) + 2;

    const totalFiles = numTxt + numLog + numCsv;
    const answer = numLog;

    const question = html`
    <div class="mb-3">
      <p>You have a directory containing the following files:</p>
      <ul>
        <li>${numTxt} .txt files</li>
        <li>${numLog} .log files</li>
        <li>${numCsv} .csv files</li>
      </ul>
      <p>
        You run the following command to count the number of log files:
      </p>
      <pre><code class="language-bash">ls | grep ".log" | wc -l</code></pre>
      
      <label for="${id}" class="form-label">What is the output of this command?</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
