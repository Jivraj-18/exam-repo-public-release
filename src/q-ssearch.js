import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { pick } from "./utils/random.js";

const animeDocs = [
  {
    id: "a1",
    text: "A young ninja trains relentlessly to become the leader of his village.",
  },
  {
    id: "a2",
    text: "Humanity fights for survival against giant humanoid creatures behind massive walls.",
  },
  {
    id: "a3",
    text: "A high school student gains the power to eliminate criminals by writing names in a notebook.",
  },
];

const tasks = [
  () => ({
    id: "anime-semantic-notebook",
    description:
      "Identify the anime synopsis that best matches the theme: eliminating criminals using supernatural power.",
    validate: (out) => {
      if (!String(out).toLowerCase().includes("a3")) {
        throw new Error("Incorrect answer");
      }
    },
    summary: "anime about a supernatural notebook",
  }),
];

export default async function ({ user, weight = 2 }) {
  const id = "q-semantic-anime";
  const title = "Semantic Matching: Anime Synopses";

  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(tasks, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Case Study: Anime Recommendation Intelligence</h4>

      <p>
        An anime streaming platform is building a semantic recommendation engine.
        Each anime is represented by a short synopsis. Your task is to identify
        which synopsis best matches a given theme.
      </p>

      <h5>Available Anime Synopses</h5>
      <ul>
        <li><strong>a1</strong>: A young ninja trains relentlessly to become the leader of his village.</li>
        <li><strong>a2</strong>: Humanity fights for survival against giant humanoid creatures behind massive walls.</li>
        <li><strong>a3</strong>: A high school student gains the power to eliminate criminals by writing names in a notebook.</li>
      </ul>

      <p>
        <strong>Task:</strong> ${task.description}
      </p>

      <label for="${id}" class="form-label">
        Enter the most relevant anime ID
      </label>

      <textarea
        id="${id}"
        name="${id}"
        class="form-control"
        rows="3"
        required
      ></textarea>

      <p class="text-muted">
        Return only the anime ID (for example: <code>a3</code>).
      </p>
    </div>
  `;

  const answer = async (output) => {
    if (!output) throw new Error("Output required");
    task.validate(output);
    return true;
  };

  return { id, title, weight, question, answer };
}
