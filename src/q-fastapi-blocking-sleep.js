import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 2 }) {
  const id = "q-fastapi-blocking-sleep";
  const title = "FastAPI Event Loop Blocking";
  const random = seedrandom(`${user.email}#${id}`);
  
  // Randomize sleep time to prevent copying
  const sleepTime = Math.floor(random() * 5) + 5; // 5 to 9 seconds
  
  const question = html`
    <p>You have deployed the following FastAPI endpoint:</p>
    <pre><code class="language-python">
@app.get("/heavy")
async def heavy_computation():
    time.sleep(${sleepTime})  # Simulating blocking I/O or CPU work
    return {"status": "done"}
    </code></pre>
    <p><strong>Scenario:</strong></p>
    <ul>
      <li>Client A sends a request at <strong>T = 0s</strong>.</li>
      <li>Client B sends a request at <strong>T = 1s</strong>.</li>
    </ul>
    <p>Assuming the server has a single worker process and standard configuration, at exactly what time (in seconds, T = ?) will <strong>Client B</strong> receive their response?</p>
    <p>Enter the number only.</p>
  `;

  return {
    id,
    title,
    question,
    // Syllabus mapping: Deployment Tools > FastAPI > Concurrency
    check: (answer) => {
      const ans = parseInt(String(answer).trim(), 10);
      // Logic: 
      // 'async def' runs on the main event loop.
      // 'time.sleep' blocks the main event loop.
      // Request A starts at 0, blocks loop until T = sleepTime.
      // Request B arrives at 1, but waits in backlog/socket until loop is free at T = sleepTime.
      // Request B starts executing at T = sleepTime.
      // Request B finishes at T = sleepTime + sleepTime.
      // Correct answer = 2 * sleepTime.
      if (ans === sleepTime * 2) return true;
      throw new Error(`Incorrect. Remember that 'async def' does NOT run in a threadpool; time.sleep() blocks the entire loop.`);
    },
    weight,
  };
}
