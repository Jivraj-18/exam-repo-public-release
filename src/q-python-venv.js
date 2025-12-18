import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-python-venv";
  const title = "Python: Virtual Environments";

  const random = seedrandom(`${user.email}#${id}`);
  const envNames = [".venv", "env", "venv_project", "py_env"];
  const envName = pick(envNames, random);

  const answer = async (value) => {
    const cmd = value.trim();
    // Allow various valid python invocations
    if (!cmd.match(/^(python3?|py) -m venv /)) {
        throw new Error("You must use the 'python -m venv' module syntax.");
    }
    if (!cmd.endsWith(envName)) {
        throw new Error(`You must name the environment '${envName}'.`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Python Environment Setup</h2>
      <p>
        Best practices in Data Science dictate that every project should have its own isolated dependencies.
        You are starting a new project and need to create a lightweight virtual environment named <code>${envName}</code>.
      </p>
      
      <label for="${id}" class="form-label">
        Enter the command to create a virtual environment named <code>${envName}</code> using the built-in <code>venv</code> module.
      </label>
      <input class="form-control font-monospace" id="${id}" name="${id}" type="text" placeholder="python -m ..." required />
    </div>
  `;

  return { id, title, weight, question, answer };
}