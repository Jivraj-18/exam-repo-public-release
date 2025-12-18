import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 0.5 }) {
  const id = "q-dirty-log-cleaning";
  const title = "Data Preparation: Cleaning Dirty Logs";
  const random = seedrandom(`${user.email}#${id}`);

  // Generate dirty logs
  const logs = [];
  let validErrorCount = 0;

  for (let i = 0; i < 100; i++) {
    const isError = random() > 0.7;
    const isMalformed = random() > 0.8;
    const timestamp = new Date(1700000000000 + i * 60000).toISOString();

    let entry;
    if (isMalformed) {
      // Missing braces or bad quotes
      entry = `[${timestamp}] INFO: User ${Math.floor(random()*100)} logged in`;
    } else {
      const level = isError ? "ERROR" : "INFO";
      const code = isError ? Math.floor(random() * 500) + 100 : 200;
      if (isError) validErrorCount++;
      // JSON-ish format
      entry = `{"ts": "${timestamp}", "level": "${level}", "code": ${code}, "msg": "process_id_${i}"}`;
    }
    logs.push(entry);
  }

  const blob = new Blob([logs.join("\n")], { type: "text/plain" });

  const answer = async (response) => {
    if (parseInt(response) !== validErrorCount) throw new Error("Incorrect count of valid ERROR JSON objects.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: IoT Debugging at SmartHome Corp</h2>
      <p>
        A legacy gateway device is uploading mixed-format logs. Some lines are valid JSON, while others are plain text system messages caused by a firmware bug.
      </p>
      <p>
        The Data Engineering team needs to know exactly how many <strong>valid JSON log lines</strong> contain the level <code>ERROR</code>.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Download the log file below.</li>
        <li>Parse the file line by line.</li>
        <li>Discard any line that is NOT valid JSON.</li>
        <li>Count how many of the <strong>valid JSON</strong> lines have <code>"level": "ERROR"</code>.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.log`)}>
          Download ${id}.log
        </button>
      </p>

      <label for="${id}" class="form-label">Count of Valid JSON Error Logs</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}


/* Solution

# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "json"
# ]
# ///

import json

# Replace with the actual filename if different
filename = "q-dirty-log-cleaning.log" 
count = 0

try:
    with open(filename, "r") as f:
        for line in f:
            try:
                # Attempt to parse the line as JSON
                data = json.loads(line)
                
                # Check if it is a dictionary and has level="ERROR"
                if isinstance(data, dict) and data.get("level") == "ERROR":
                    count += 1
            except json.JSONDecodeError:
                # Ignore lines that are not valid JSON (the "dirty" logs)
                continue

    print(f"Answer: {count}")
    
except FileNotFoundError:
    print(f"Could not find {filename}. Make sure the script is in the same folder.")
*/