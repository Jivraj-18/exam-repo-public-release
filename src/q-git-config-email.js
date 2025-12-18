import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-git-config-email";
  const title = "Git: Global Configuration";

  const random = seedrandom(`${user.email}#${id}`);
  const domains = ["example.com", "corp.org", "dev.net", "studio.io"];
  const usernames = ["jdoe", "alice_dev", "coder_sam", "alex.p"];
  
  const targetEmail = `${pick(usernames, random)}@${pick(domains, random)}`;

  const answer = async (value) => {
    const cmd = value.trim();
    const expected = `git config --global user.email "${targetEmail}"`;
    const altExpected = `git config --global user.email ${targetEmail}`;
    
    if (cmd !== expected && cmd !== altExpected) {
      throw new Error(`Incorrect command. Make sure you are setting the global email to ${targetEmail}`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Git Identity Configuration</h2>
      <p>
        You are setting up a fresh development environment on a remote CI/CD runner. 
        Before you can commit any code, Git requires you to identify yourself.
      </p>
      <p>
        Your team lead has assigned you the email <code>${targetEmail}</code> for this project.
        You need to configure this email globally for all repositories on this machine.
      </p>
      
      <label for="${id}" class="form-label">
        Enter the exact Git command to set your global user email to <code>${targetEmail}</code>.
      </label>
      <input class="form-control font-monospace" id="${id}" name="${id}" type="text" placeholder='git config ...' required />
    </div>
  `;

  return { id, title, weight, question, answer };
}