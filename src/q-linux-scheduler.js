import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-linux-scheduler-core";
  const title = "Who actually decides which process runs next?";

  const question = html`
    <div class="mb-3">
      <p>
        You are debugging a production Linux server that randomly feels “laggy” whenever
        multiple CPU‑intensive data pipelines run together. A senior engineer tells you:
      </p>
      <blockquote class="blockquote">
        “Stop blaming <code>top</code> and <code>ps</code>. Those are just reporters.
        The <em>real</em> decision about which process gets the CPU next is made by a
        very specific part of the Linux kernel. If that part misbehaves, every user‑space
        program will feel slow, even if their code is perfect.”
      </blockquote>
      <p>
        You check the codebase and documentation. User‑space libraries, daemons, shells,
        and drivers all <em>rely</em> on this kernel component, but they do not implement
        the decision logic themselves. Even the system calls that create processes
        eventually hand control to this logic.
      </p>
      <p>
        <strong>Question:</strong>
        In a modern Linux system, what is the <em>specific</em> kernel subsystem whose job
        is to decide which runnable process/thread gets CPU time next, using policies like
        CFS (Completely Fair Scheduling)?
      </p>
      <p class="text-muted">
        Answer as a single lowercase technical term (one word, no spaces, e.g.
        <code>example</code>, not “Example subsystem”).
      </p>

      <label for="${id}" class="form-label">Your answer (one word):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  const answer = (input) => {
    const normalized = String(input || "")
      .trim()
      .toLowerCase();

    if (!normalized) throw new Error("Answer cannot be empty");

    // Accept a few closely related phrasings, but force the core concept.
    const accepted = ["scheduler", "scheduling"];
    if (!accepted.includes(normalized)) {
      throw new Error("Think of the kernel component that implements CFS and picks the next task.");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
