import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const toBase = (num, base) => {
  if (base === 10) return String(num);
  if (base === 2) return num.toString(2);
  if (base === 8) return num.toString(8);
  if (base === 16) return num.toString(16).toUpperCase();
  return num.toString(base);
};

const baseNames = {
  2: "binary",
  8: "octal",
  10: "decimal",
  16: "hexadecimal",
};

const taskFactories = [
  (random) => {
    const num = randInt(random, 50, 500);
    return {
      id: "dec-to-bin",
      number: String(num),
      fromBase: 10,
      toBase: 2,
      expected: toBase(num, 2),
      description: `convert ${num} from decimal to binary`,
    };
  },
  (random) => {
    const num = randInt(random, 50, 500);
    return {
      id: "dec-to-hex",
      number: String(num),
      fromBase: 10,
      toBase: 16,
      expected: toBase(num, 16),
      description: `convert ${num} from decimal to hexadecimal`,
    };
  },
  (random) => {
    const num = randInt(random, 50, 300);
    return {
      id: "dec-to-oct",
      number: String(num),
      fromBase: 10,
      toBase: 8,
      expected: toBase(num, 8),
      description: `convert ${num} from decimal to octal`,
    };
  },
  (random) => {
    const num = randInt(random, 50, 255);
    const binary = toBase(num, 2);
    return {
      id: "bin-to-dec",
      number: binary,
      fromBase: 2,
      toBase: 10,
      expected: String(num),
      description: `convert ${binary} from binary to decimal`,
    };
  },
  (random) => {
    const num = randInt(random, 100, 4095);
    const hex = toBase(num, 16);
    return {
      id: "hex-to-dec",
      number: hex,
      fromBase: 16,
      toBase: 10,
      expected: String(num),
      description: `convert ${hex} from hexadecimal to decimal`,
    };
  },
  (random) => {
    const num = randInt(random, 50, 255);
    const binary = toBase(num, 2);
    return {
      id: "bin-to-hex",
      number: binary,
      fromBase: 2,
      toBase: 16,
      expected: toBase(num, 16),
      description: `convert ${binary} from binary to hexadecimal`,
    };
  },
  (random) => {
    const num = randInt(random, 100, 500);
    const hex = toBase(num, 16);
    return {
      id: "hex-to-bin",
      number: hex,
      fromBase: 16,
      toBase: 2,
      expected: toBase(num, 2),
      description: `convert ${hex} from hexadecimal to binary`,
    };
  },
  (random) => {
    const num = randInt(random, 50, 200);
    const octal = toBase(num, 8);
    return {
      id: "oct-to-dec",
      number: octal,
      fromBase: 8,
      toBase: 10,
      expected: String(num),
      description: `convert ${octal} from octal to decimal`,
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-number-base";
  const title = "Number Base Converter API";
  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Number Base Converter API</h4>
      <p>
        <strong>Scenario:</strong> Build a FastAPI endpoint that converts numbers between different bases (binary,
        octal, decimal, hexadecimal).
      </p>
      <ol>
        <li>Implement a FastAPI app with a <code>GET /convert</code> route.</li>
        <li>Accept query parameters: <code>?number=...&from_base=...&to_base=...</code></li>
        <li>
          Respond with: <code>{ "result": "...", "email": "${user.email}" }</code>
        </li>
        <li>For hexadecimal output, use uppercase letters (A-F).</li>
        <li>Enable CORS for cross-origin requests.</li>
      </ol>
      <p>
        For grading: ${task.description}<br />
        Number: <code>${task.number}</code><br />
        From base: <code>${task.fromBase}</code> (${baseNames[task.fromBase]})<br />
        To base: <code>${task.toBase}</code> (${baseNames[task.toBase]})
      </p>
      <label for="${id}" class="form-label">Enter the base URL of your API</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const baseUrl = url.replace(/\/$/, "");
    const endpoint = `${baseUrl}/convert?number=${encodeURIComponent(task.number)}&from_base=${task.fromBase}&to_base=${task.toBase}`;

    const resp = await fetch(endpoint);
    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}`);

    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (data.email !== user.email) throw new Error("Email must match");

    const result = String(data.result).toUpperCase();
    const expected = String(task.expected).toUpperCase();

    if (result !== expected) {
      throw new Error(`Expected "${expected}", got "${result}"`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}