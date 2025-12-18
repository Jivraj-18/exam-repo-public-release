import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-23f2001072-5";
    const title = "Machine Learning: Metrics";

    // deterministic RNG
    const random = seedrandom(`${user.email}#${id}`);

    // Generate Confusion Matrix
    // [ TP, FN ]
    // [ FP, TN ]
    const tp = 20 + Math.floor(random() * 50);
    const fn = 5 + Math.floor(random() * 20);
    const fp = 5 + Math.floor(random() * 30);
    const tn = 50 + Math.floor(random() * 100);

    const metric = random() > 0.5 ? "Precision" : "Recall";

    let expected = 0;
    if (metric === "Precision") {
        // TP / (TP + FP)
        expected = tp / (tp + fp);
    } else {
        // Recall: TP / (TP + FN)
        expected = tp / (tp + fn);
    }

    // Format to 2 decimal places
    const expectedStr = expected.toFixed(2);

    const answer = (input) => {
        return parseFloat(input).toFixed(2) === expectedStr;
    };

    const question = html`
    <div class="mb-3">
      <p>Given the following Confusion Matrix:</p>
      <table class="table table-bordered w-auto">
        <thead>
          <tr>
            <th></th>
            <th>Predicted Positive</th>
            <th>Predicted Negative</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Actual Positive</th>
            <td>${tp} (TP)</td>
            <td>${fn} (FN)</td>
          </tr>
          <tr>
            <th>Actual Negative</th>
            <td>${fp} (FP)</td>
            <td>${tn} (TN)</td>
          </tr>
        </tbody>
      </table>

      <p>Calculate the <strong>${metric}</strong>.</p>
      <p>Enter your answer rounded to <strong>2 decimal places</strong> (e.g., 0.75).</p>
      
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
