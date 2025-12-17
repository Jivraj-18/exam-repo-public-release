import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs";

let pyodideReadyPromise = loadPyodide();

export default async function({ user, weight = 1 }) {
  const id = "q-messy-cleaning";
  const title = "Messy Data Cleaning";

  const question = html`
    <div class="mb-3">
      <p>
        You have a list of raw price strings: <code>["$100", "200 USD", "€50", "300"]</code>.
      </p>
      <p>
        Write a Python function <code>clean_prices(prices)</code> that:
        <ol>
          <li>Removes "$" and "USD".</li>
          <li>Ignores any string containing "€".</li>
          <li>Converts the rest to integers.</li>
          <li>Returns the sum of these integers.</li>
        </ol>
      </p>
      <label for="${id}" class="form-label">Write your Python code:</label>
      <textarea class="form-control font-monospace" rows="10" id="${id}" name="${id}"></textarea>
    </div>
  `;

  const checkAnswer = async (code) => {
    const pyodide = await pyodideReadyPromise;
    try {
      await pyodide.runPythonAsync(code);
      // Test case
      const testCode = `
try:
    prices = ["$100", "200 USD", "€50", "300"]
    result = clean_prices(prices)
    assert result == 600 # 100 + 200 + 300
except Exception as e:
    raise e
      `;
      await pyodide.runPythonAsync(testCode);
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return { id, title, weight, question, answer: checkAnswer };
}
