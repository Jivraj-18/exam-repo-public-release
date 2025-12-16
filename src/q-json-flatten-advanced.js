import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-flatten-advanced";
  const title = "Flatten nested JSON";

  const source = {
    user: {
      id: 7,
      profile: {
        email: "a@b.com",
        skills: ["js", "sql"]
      }
    }
  };

  const expectedKeys = [
    "user.id",
    "user.profile.email",
    "user.profile.skills.0",
    "user.profile.skills.1"
  ];

  const answer = async () => {
    const file = document.getElementById(id).files[0];
    if (!file) throw new Error("No file uploaded");

    const json = JSON.parse(await file.text());

    expectedKeys.forEach(k => {
      if (!(k in json)) throw new Error(`Missing key ${k}`);
    });

    return true;
  };

  const question = html`
    <p><strong>Case Study: Feature Engineering</strong></p>
    <p>Flatten the following JSON using dot notation and array indices.</p>
    <pre>${JSON.stringify(source, null, 2)}</pre>
    <label class="form-label">Upload flattened JSON</label>
    <input class="form-control" id="${id}" type="file" accept=".json" />
  `;

  return { id, title, weight, question, answer };
}
