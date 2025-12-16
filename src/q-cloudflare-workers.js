import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const generateRandomString = (random, length) => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(random() * chars.length)];
  }
  return result;
};

const generateRandomArray = (random, length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(randInt(random, 1, 100));
  }
  return arr;
};

const reverseString = (str) => str.split("").reverse().join("");

const reverseArray = (arr) => [...arr].reverse();

const taskFactories = [
  (random) => {
    const str = generateRandomString(random, randInt(random, 8, 15));
    const expected = reverseString(str);
    return {
      id: `reverse-string-${str}`,
      description: `Reverse the string "${str}"`,
      payload: { type: "string", value: str },
      validate: (output) => {
        if (output.reversed !== expected) {
          throw new Error(`Expected reversed string "${expected}", got "${output.reversed}"`);
        }
      },
      summary: `the reversed string`,
    };
  },
  (random) => {
    const arr = generateRandomArray(random, randInt(random, 5, 10));
    const expected = reverseArray(arr);
    return {
      id: `reverse-array-${arr.join("-")}`,
      description: `Reverse the array [${arr.join(", ")}]`,
      payload: { type: "array", value: arr },
      validate: (output) => {
        const result = output.reversed;
        if (!Array.isArray(result)) {
          throw new Error("Expected reversed to be an array");
        }
        if (result.length !== expected.length) {
          throw new Error(`Expected array length ${expected.length}, got ${result.length}`);
        }
        for (let i = 0; i < expected.length; i++) {
          if (result[i] !== expected[i]) {
            throw new Error(`Expected ${expected[i]} at index ${i}, got ${result[i]}`);
          }
        }
      },
      summary: `the reversed array`,
    };
  },
  (random) => {
    const words = [];
    const count = randInt(random, 3, 6);
    for (let i = 0; i < count; i++) {
      words.push(generateRandomString(random, randInt(random, 4, 8)));
    }
    const sentence = words.join(" ");
    const expected = words.reverse().join(" ");
    return {
      id: `reverse-words-${words.length}`,
      description: `Reverse the order of words in "${sentence}"`,
      payload: { type: "words", value: sentence },
      validate: (output) => {
        if (output.reversed !== expected) {
          throw new Error(`Expected "${expected}", got "${output.reversed}"`);
        }
      },
      summary: `the words in reversed order`,
    };
  },
  (random) => {
    const num = randInt(random, 1000, 99999);
    const expected = parseInt(String(num).split("").reverse().join(""), 10);
    return {
      id: `reverse-digits-${num}`,
      description: `Reverse the digits of the number ${num}`,
      payload: { type: "number", value: num },
      validate: (output) => {
        if (output.reversed !== expected) {
          throw new Error(`Expected ${expected}, got ${output.reversed}`);
        }
      },
      summary: `the number with reversed digits`,
    };
  },
];

const normalizeOutput = (output) => {
  if (!output || typeof output !== "object") {
    throw new Error("Response must be a JSON object with 'reversed' field");
  }
  if (!("reversed" in output)) {
    throw new Error("Response must include 'reversed' field");
  }
  return output;
};

export default async function ({ user, weight = 1.5 }) {
  const id = "q-cloudflare-workers";
  const title = "Cloudflare Workers Serverless Deployment";
  const random = seedrandom(`${user.email}#${id}`);
  const taskFactory = pick(taskFactories, random);
  const task = taskFactory(random);

  const question = html`
    <div class="mb-3">
      <h4>Case Study: Deploying Serverless Functions with Cloudflare Workers</h4>
      <p>
        <strong>Scenario:</strong> Your team needs a lightweight, globally distributed serverless endpoint for
        processing data transformations. Cloudflare Workers provide edge computing capabilities with minimal latency.
        You must deploy a Worker that processes POST requests and returns transformed data.
      </p>
      <ol>
        <li>
          Create and deploy a Cloudflare Worker with a <code>POST /data</code> route using
          <a href="https://developers.cloudflare.com/workers/" target="_blank">Cloudflare Workers</a>.
        </li>
        <li>
          The endpoint should accept JSON with <code>{ "type": "...", "value": ... }</code> and return
          <code>{ "reversed": ..., "email": "${user.email}" }</code>.
        </li>
        <li>
          Based on the <code>type</code> field:
          <ul>
            <li><code>"string"</code>: Reverse the characters of the string value</li>
            <li><code>"array"</code>: Reverse the order of array elements</li>
            <li><code>"words"</code>: Reverse the order of words in the string</li>
            <li><code>"number"</code>: Reverse the digits of the number (return as integer)</li>
          </ul>
        </li>
        <li>Ensure CORS headers allow cross-origin POST requests.</li>
      </ol>
      <p>
        For grading, we will POST this data:
        <code class="d-block my-2">${JSON.stringify(task.payload)}</code>
      </p>
      <label for="${id}" class="form-label"
        >Enter the full URL of your Worker endpoint (e.g., <code>https://your-worker.your-subdomain.workers.dev/data</code>)</label
      >
      <input class="form-control" id="${id}" name="${id}" type="url" />
      <p class="text-muted">
        We'll POST to your endpoint, expect <code>application/json</code> response with <code>reversed</code> and
        <code>email</code> fields, and verify the output matches ${task.summary}.
      </p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      throw new Error("URL must start with http:// or https://");
    }

    if (!url.includes(".workers.dev")) {
      throw new Error("URL must be a Cloudflare Workers endpoint (ending with .workers.dev)");
    }

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task.payload),
    });

    if (!resp.ok) {
      throw new Error(`Endpoint returned ${resp.status} ${resp.statusText}, expected 200 OK`);
    }

    const contentType = resp.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("Response must be application/json");
    }

    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("Response body is not valid JSON");
    }

    if (!data || typeof data !== "object") {
      throw new Error("Response must be a JSON object");
    }

    if (data.email !== user.email) {
      throw new Error("Email must match your registered email address");
    }

    const output = normalizeOutput(data);
    task.validate(output);

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Cloudflare Worker solution sketch: worker.js

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/data") {
      try {
        const { type, value } = await request.json();
        let reversed;

        switch (type) {
          case "string":
            reversed = value.split("").reverse().join("");
            break;
          case "array":
            reversed = [...value].reverse();
            break;
          case "words":
            reversed = value.split(" ").reverse().join(" ");
            break;
          case "number":
            reversed = parseInt(String(value).split("").reverse().join(""), 10);
            break;
          default:
            return new Response(JSON.stringify({ error: "Unknown type" }), {
              status: 400,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            });
        }

        return new Response(
          JSON.stringify({ reversed, email: "your-email@example.com" }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
};
*/
