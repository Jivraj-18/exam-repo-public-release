import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js"; 
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-sum-transform";
  const title = "FASTAPI: Indexed Power Transformer";

  // Seeded random numbers for reproducibility
  const random = seedrandom(`${user.email}#${id}`);
  const nums = Array.from({ length: 5 }, () => Math.floor(random() * 10) + 1); // 1–10

  // Transform: (number * index)^2
  const transformed = nums.map((n, i) => Math.pow(n * (i + 1), 2));
  const sumTransformed = transformed.reduce((sum, x) => sum + x, 0);

  const question = html`
    <div class="mb-3">
      <p>Create a <strong>FastAPI</strong> endpoint <code>/transform_numbers</code> that:</p>
      <ol>
        <li>Accepts a GET request with query parameters: <code>n1, n2, n3, n4, n5</code> (integers).</li>
        <li>Transforms the numbers by multiplying each by its 1-based index, then squaring the result.</li>
        <li>Returns a JSON object with:</li>
        <ul>
          <li><code>transformed</code>: an array of the transformed numbers.</li>
          <li><code>sumTransformed</code>: the sum of the transformed numbers.</li>
        </ul>
      </ol>
      <p>Example query for testing:</p>
      <pre><code>n1=${nums[0]}&n2=${nums[1]}&n3=${nums[2]}&n4=${nums[3]}&n5=${nums[4]}</code></pre>
      <p>Expected response:</p>
      <pre><code>{
  "transformed": [${transformed.join(", ")}],
  "sumTransformed": ${sumTransformed}
}</code></pre>

      <label class="form-label">Provide the URL to your endpoint for validation:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  // answer function dynamically checks the endpoint
  const answer = async (endpointUrl) => {
    try {
      const query = nums.map((n, i) => `n${i + 1}=${n}`).join("&");
      const res = await fetch(`${endpointUrl}?${query}`);
      const data = await res.json();
      const isTransformedCorrect = JSON.stringify(data.transformed) === JSON.stringify(transformed);
      const isSumCorrect = data.sumTransformed === sumTransformed;
      return isTransformedCorrect && isSumCorrect;
    } catch {
      return false;
    }
  };

  return { id, title, weight, question, answer };
};
