import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-function-calling";
  const title = "LLM Function Calling Schema";

  // Generate random parameters based on user
  const seed = user.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const functionNames = ["get_weather", "get_stock_price", "search_products"];
  const funcIndex = seed % functionNames.length;
  const functionName = functionNames[funcIndex];

  let answer;
  if (functionName === "get_weather") {
    answer = JSON.stringify({
      type: "function",
      function: {
        name: "get_weather",
        description: "Get the current weather for a location",
        parameters: {
          type: "object",
          properties: {
            location: { type: "string", description: "City name" },
          },
          required: ["location"],
          additionalProperties: false,
        },
        strict: true,
      },
    });
  } else if (functionName === "get_stock_price") {
    answer = JSON.stringify({
      type: "function",
      function: {
        name: "get_stock_price",
        description: "Get the current stock price for a symbol",
        parameters: {
          type: "object",
          properties: {
            symbol: { type: "string", description: "Stock ticker symbol" },
          },
          required: ["symbol"],
          additionalProperties: false,
        },
        strict: true,
      },
    });
  } else {
    answer = JSON.stringify({
      type: "function",
      function: {
        name: "search_products",
        description: "Search for products by query",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "Search query" },
          },
          required: ["query"],
          additionalProperties: false,
        },
        strict: true,
      },
    });
  }

  const descriptions = {
    get_weather: {
      desc: "Get the current weather for a location",
      param: "location",
      paramDesc: "City name",
    },
    get_stock_price: {
      desc: "Get the current stock price for a symbol",
      param: "symbol",
      paramDesc: "Stock ticker symbol",
    },
    search_products: {
      desc: "Search for products by query",
      param: "query",
      paramDesc: "Search query",
    },
  };

  const funcInfo = descriptions[functionName];

  const question = html`
    <div class="mb-3">
      <p>
        You are implementing OpenAI function calling. Write the JSON for a tool
        definition that:
      </p>
      <ul>
        <li>Has type <code>function</code></li>
        <li>Function name: <code>${functionName}</code></li>
        <li>Description: "${funcInfo.desc}"</li>
        <li>
          Has one required string parameter: <code>${funcInfo.param}</code> with
          description "${funcInfo.paramDesc}"
        </li>
        <li>Sets <code>additionalProperties</code> to false</li>
        <li>Sets <code>strict</code> to true</li>
      </ul>
      <label for="${id}" class="form-label">Tool Definition JSON:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="12"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
