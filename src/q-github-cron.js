import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
    const id = "q-github-cron";
    const title = "GitHub Actions: Cron timing";

    const expected = "daily";

    const answer = async () => {
        const v = document.getElementById(id).value.trim().toLowerCase();
        if (v !== expected) throw new Error("Incorrect");
        return true;
    };

    const question = html`
    <p>
      The cron expression:
    </p>
    <pre>0 3 * * *</pre>
    <p>
      runs the workflow how often?
    </p>
    <input id="${id}" class="form-control" />
  `;

    return { id, title, weight: 1, question, answer };
}