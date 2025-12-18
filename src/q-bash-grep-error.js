import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-bash-grep-error";
  const title = "Bash: Log Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  const errorCodes = ["ERROR_500", "CRITICAL_FAIL", "TIMEOUT_ERR", "DB_CONN_LOST"];
  const logFiles = ["server.log", "app_debug.log", "access_history.txt"];
  
  const errorCode = pick(errorCodes, random);
  const logFile = pick(logFiles, random);

  const answer = async (value) => {
    const cmd = value.trim();
    const parts = cmd.split(" ");
    
    if (!cmd.startsWith("grep")) {
        throw new Error("Command must start with 'grep'.");
    }
    if (!cmd.includes(errorCode) || !cmd.includes(logFile)) {
        throw new Error(`Command must search for '${errorCode}' in '${logFile}'.`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Server Log Analysis</h2>
      <p>
        Your web server is acting up. You have a large log file named <code>${logFile}</code> and you suspect 
        that a specific error, <code>${errorCode}</code>, is the cause.
      </p>
      <p>
        Use the <code>grep</code> command to search for all occurrences of the string <code>${errorCode}</code> 
        inside the file <code>${logFile}</code>.
      </p>
      
      <label for="${id}" class="form-label">
        Enter the grep command.
      </label>
      <input class="form-control font-monospace" id="${id}" name="${id}" type="text" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}