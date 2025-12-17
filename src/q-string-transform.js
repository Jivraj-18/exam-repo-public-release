import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const reverseString = (s) => s.split("").reverse().join("");
const countVowels = (s) => (s.match(/[aeiouAEIOU]/g) || []).length;
const toTitleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
const removeSpaces = (s) => s.replace(/\s+/g, "");
const countWords = (s) => s.trim().split(/\s+/).length;
const toCamelCase = (s) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
const toSnakeCase = (s) => s.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
const isPalindrome = (s) => {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
};

const words = [
  "hello world",
  "data science",
  "machine learning",
  "python programming",
  "web development",
  "artificial intelligence",
  "deep learning",
  "natural language",
  "computer vision",
  "neural network",
];

const palindromes = ["racecar", "level", "radar", "civic", "rotor", "kayak", "madam", "refer"];
const nonPalindromes = ["hello", "world", "python", "coding", "data", "science"];

const taskFactories = [
  (random) => {
    const input = pick(words, random);
    return {
      id: "reverse",
      operation: "reverse",
      input,
      expected: reverseString(input),
      description: `reverse the string "${input}"`,
    };
  },
  (random) => {
    const input = pick(words, random);
    return {
      id: "vowels",
      operation: "count_vowels",
      input,
      expected: countVowels(input),
      description: `count vowels in "${input}"`,
    };
  },
  (random) => {
    const input = pick(words, random);
    return {
      id: "title",
      operation: "title_case",
      input,
      expected: toTitleCase(input),
      description: `convert "${input}" to title case`,
    };
  },
  (random) => {
    const input = pick(words, random);
    return {
      id: "words",
      operation: "word_count",
      input,
      expected: countWords(input),
      description: `count words in "${input}"`,
    };
  },
  (random) => {
    const input = pick(words, random);
    return {
      id: "camel",
      operation: "camel_case",
      input,
      expected: toCamelCase(input),
      description: `convert "${input}" to camelCase`,
    };
  },
  (random) => {
    const input = pick(words, random);
    return {
      id: "snake",
      operation: "snake_case",
      input,
      expected: toSnakeCase(input),
      description: `convert "${input}" to snake_case`,
    };
  },
  (random) => {
    const usePalindrome = random() > 0.5;
    const input = usePalindrome ? pick(palindromes, random) : pick(nonPalindromes, random);
    return {
      id: "palindrome",
      operation: "is_palindrome",
      input,
      expected: isPalindrome(input),
      description: `check if "${input}" is a palindrome`,
    };
  },
  (random) => {
    const input = pick(words, random);
    return {
      id: "nospace",
      operation: "remove_spaces",
      input,
      expected: removeSpaces(input),
      description: `remove spaces from "${input}"`,
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-string-transform";
  const title = "String Transformation API";
  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>String Transformation API</h4>
      <p>
        <strong>Scenario:</strong> Build a FastAPI endpoint that performs various string transformations.
      </p>
      <ol>
        <li>Implement a FastAPI app with a <code>POST /transform</code> route.</li>
        <li>Accept JSON: <code>{ "text": "...", "operation": "..." }</code></li>
        <li>
          Supported operations: <code>reverse</code>, <code>count_vowels</code>, <code>title_case</code>,
          <code>word_count</code>, <code>camel_case</code>, <code>snake_case</code>, <code>is_palindrome</code>,
          <code>remove_spaces</code>
        </li>
        <li>Respond with: <code>{ "result": ..., "email": "${user.email}" }</code></li>
        <li>Enable CORS for cross-origin requests.</li>
      </ol>
      <p>
        For grading: ${task.description}<br />
        Input: <code>"${task.input}"</code><br />
        Operation: <code>${task.operation}</code>
      </p>
      <label for="${id}" class="form-label">Enter the base URL of your API</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = url.replace(/\/$/, "") + "/transform";
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: task.input, operation: task.operation }),
    });

    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}`);

    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (data.email !== user.email) throw new Error("Email must match");

    const result = data.result;
    const expected = task.expected;

    if (typeof expected === "boolean") {
      if (result !== expected) throw new Error(`Expected ${expected}, got ${result}`);
    } else if (typeof expected === "number") {
      if (Number(result) !== expected) throw new Error(`Expected ${expected}, got ${result}`);
    } else {
      if (String(result).toLowerCase() !== String(expected).toLowerCase()) {
        throw new Error(`Expected "${expected}", got "${result}"`);
      }
    }

    return true;
  };

  return { id, title, weight, question, answer };
}