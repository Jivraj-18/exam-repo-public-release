import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 2 }) {
  const id = "q-github-evil";
  const title = "The Repo Time Paradox";

  const answer = "created_at";

  const question = html`
    <div class="mb-3">
      <p>
        A GitHub repository has:
        <br />• new commits today  
        <br />• a recent release  
        <br />• stars added just now  
        <br /><br />
        Yet you want the one timestamp that
        <strong>never changes</strong>,
        survives forks, edits, and hype,
        and represents the repo’s
        <em>true origin moment</em>.
        <br /><br />
        Which GitHub API field reveals this,
        no matter how much history is rewritten?
      </p>
      <label for="${id}" class="form-label">Field name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
