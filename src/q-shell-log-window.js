import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-shell-log-window";
    const title = "Shell: Count errors in a time window";

    const expected = 17;

    const answer = async () => {
        const val = document.getElementById(id).value.trim();
        if (!/^\d+$/.test(val)) throw new Error("Enter a number");
        if (Number(val) !== expected) throw new Error("Incorrect count");
        return true;
    };

    const question = html`
    <p>
      A production log contains timestamped HTTP entries. You run:
    </p>
    <pre>
grep "ERROR" app.log | grep "2024-10-15T14" | wc -l
    </pre>
    <p>
      The output is <strong>${expected}</strong>.  
      Enter the number of ERROR logs in this time window.
    </p>
    <input id="${id}" class="form-control" />
  `;

    return { id, title, weight, question, answer };
}