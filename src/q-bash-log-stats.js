import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-bash-log-stats";
    const title = "Bash Pipeline: IP Frequency";

    const random = seedrandom(`${user.email}#${id}`);

    // We just ask for the command structure or specific tool order.
    // "Which command sorts the input?" -> "sort"
    // "Which command counts unique lines?" -> "uniq -c"

    // Let's ask: What key flag must be used with `uniq` to display counts?
    const expected = "-c";

    const answer = (input) => {
        return input.trim() === "-c" || input.trim() === "c";
    };

    const question = html`
    <div class="mb-3">
      <p>
        You are constructing a Bash pipeline to count the top IP addresses in a log file.
        The sequence is:
      </p>
      <code>awk '{print $1}' access.log | sort | uniq ??? | sort -nr | head -n 5</code>
      <p>
        The <code>uniq</code> command normally just removes duplicates. 
        What <strong>flag</strong> (option) must you pass to <code>uniq</code> so that it outputs the <strong>count</strong> of occurrences alongside each line?
      </p>
      <label for="${id}" class="form-label">Flag:</label>
      <input type="text" class="form-control" id="${id}" name="${id}" placeholder="-?" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}