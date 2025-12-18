import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { pick } from "./utils/random.js";

const expectNumber = (target) => (output) => {
  if (!String(output).includes(String(target))) {
    throw new Error(`Output must include ${target}`);
  }
};

const taskFactories = [
  (random) => {
    return {
      id: "weather-rain-count",
      description:
        "Write and run a program that fetches the BBC Weather API forecast for Bengaluru and prints the number of days whose enhancedWeatherDescription contains the word 'rain' (case-insensitive).",
      validate: expectNumber(""),
      summary: "count of rainy days",
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-agent-weather";
  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  const question = html`
    <h4>Delegated Data Sourcing: Weather Aggregation</h4>
    <p>Task sent to your coding agent:</p>
    <code>${task.description}</code>
    <label>Enter your <code>/task</code> endpoint URL</label>
    <input class="form-control" id="${id}" type="url" />
  `;

  const answer = async (url) => {
    const resp = await fetch(`${url}?q=${encodeURIComponent(task.description)}`);
    const data = await resp.json();
    if (data.email !== user.email) throw new Error("Email mismatch");
    task.validate(data.output);
    return true;
  };

  return { id, title: "Weather API via Agent", weight, question, answer };
}
