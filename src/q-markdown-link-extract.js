import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-markdown-link-extract";
    const title = "Extract Link from Markdown";

    const random = seedrandom(`${user.email}#${id}`);
    const pick = (arr) => arr[Math.floor(random() * arr.length)];
    const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

    const domains = ["example.com", "test.org", "docs.io", "api.net"];
    const paths = ["guide", "ref", "v1", "home"];

    const generateLink = () => {
        const domain = pick(domains);
        const path = pick(paths);
        const num = randInt(1, 999);
        return `https://${domain}/${path}/${num}`;
    };

    const numLinks = 5;
    const links = [];
    let markdown = "";

    for (let i = 0; i < numLinks; i++) {
        const url = generateLink();
        links.push(url);
        const text = `Link ${i + 1}`;
        markdown += `- [${text}](${url})\n`;
    }

    const targetIndex = randInt(0, numLinks - 1);
    const targetUrl = links[targetIndex];

    const question = html`
    <div class="mb-3">
      <p>
        Extract the URL of the <strong>${targetIndex + 1}${['st', 'nd', 'rd'][targetIndex] || 'th'} link</strong> from the markdown below:
      </p>
      <pre style="white-space: pre-wrap"><code>
${markdown}
      </code></pre>
      <label for="${id}" class="form-label">URL:</label>
      <input type="url" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        if (input.trim() !== targetUrl) {
            throw new Error(`Incorrect. Expected ${targetUrl}`);
        }
        return true;
    };

    return { id, title, weight, question, answer };
}
