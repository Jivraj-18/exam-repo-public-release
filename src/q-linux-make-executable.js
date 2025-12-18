import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-linux-make-executable";
  const title = "Linux: File Permissions";

  const random = seedrandom(`${user.email}#${id}`);
  const scripts = ["deploy.sh", "run_analysis.sh", "backup_db.sh", "start_server.sh"];
  const filename = pick(scripts, random);

  const answer = async (value) => {
    const cmd = value.trim().replace(/\s+/g, ' '); // Normalize spaces
    const validCommands = [
      `chmod +x ${filename}`,
      `chmod u+x ${filename}`,
      `chmod 755 ${filename}`,
      `chmod 700 ${filename}`
    ];
    
    if (!validCommands.includes(cmd)) {
      throw new Error("Command not recognized. Use the standard symbolic mode to add execute permissions.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Linux Permissions</h2>
      <p>
        You have just written a shell script named <code>${filename}</code> to automate your data preprocessing.
        However, when you try to run it using <code>./${filename}</code>, you get a "Permission denied" error.
      </p>
      <p>
        You need to modify the file permissions to make it executable for the owner.
      </p>
      
      <label for="${id}" class="form-label">
        Enter the command to make <code>${filename}</code> executable.
      </label>
      <input class="form-control font-monospace" id="${id}" name="${id}" type="text" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}