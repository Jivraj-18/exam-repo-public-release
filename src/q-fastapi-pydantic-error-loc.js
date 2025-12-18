import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1.25 }) {
  const id = "q-fastapi-pydantic-error-loc";
  const title = "FastAPI: Debugging Nested Pydantic Validation Errors";

  const random = seedrandom(`${user.email}#${id}`);

  // Randomize which item in the array has the error
  const errorIndex = Math.floor(random() * 3); // 0, 1, or 2

  // Randomize which field has the error
  const errorFields = ["price", "stock"];
  const errorField = errorFields[Math.floor(random() * errorFields.length)];

  // Generate valid items and one invalid item
  const items = [
    { name: "Apple", price: 1.5, stock: 10 },
    { name: "Banana", price: 0.8, stock: 15 },
    { name: "Orange", price: 2.0, stock: 8 },
  ];

  // Make the selected item invalid
  items[errorIndex][errorField] = errorField === "price" ? -0.5 : 0;

  const expectedLoc = ["body", "items", errorIndex, errorField];

  const answer = (userInput) => {
    let parsedInput;
    try {
      parsedInput = JSON.parse(userInput);
    } catch (e) {
      throw new Error("Invalid JSON format. Please enter a valid JSON array, e.g., ['body', 'items', 1, 'price']");
    }

    if (!Array.isArray(parsedInput)) {
      throw new Error("Expected a JSON array. Format: ['body', 'items', <index>, '<field>']");
    }

    if (parsedInput.length !== 4) {
      throw new Error("The loc array should have exactly 4 elements: ['body', 'items', <index>, '<field>']");
    }

    // Compare arrays
    const matches =
      parsedInput[0] === expectedLoc[0] &&
      parsedInput[1] === expectedLoc[1] &&
      parsedInput[2] === expectedLoc[2] &&
      parsedInput[3] === expectedLoc[3];

    if (!matches) {
      throw new Error(
        `Incorrect loc value. Check which item in the array has the validation error and which field is invalid. The loc format should be: ['body', 'items', <item_index>, '<field_name>']`,
      );
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Debugging Nested Validation Errors in FastAPI</h2>
      <p>
        <strong>FreshMart API</strong> is building an e-commerce platform using FastAPI and Pydantic for data
        validation. The frontend team is encountering <code>422 Unprocessable Entity</code> errors when submitting
        orders, but they don't understand FastAPI's error response structure.
      </p>
      <p>
        Your task is to analyze the Pydantic models and a buggy request payload to determine the exact location (<code>loc</code>)
        of the validation error as reported by FastAPI.
      </p>

      <h3>Pydantic Models</h3>
      <pre style="background-color: #f5f5f5; padding: 10px; border: 1px solid #ddd;"><code>from pydantic import BaseModel, Field
from typing import List

class Item(BaseModel):
    name: str
    price: float = Field(gt=0)  # Price must be greater than 0
    stock: int = Field(ge=0)    # Stock must be greater than or equal to 0

class Order(BaseModel):
    order_id: int
    items: List[Item]</code></pre>

      <h3>FastAPI Endpoint</h3>
      <pre style="background-color: #f5f5f5; padding: 10px; border: 1px solid #ddd;"><code>@app.post("/submit_order")
def submit_order(order: Order):
    return {"msg": "Order received", "order_id": order.order_id}</code></pre>

      <h3>Request Payload (Contains a Bug)</h3>
      <p>The frontend sends this JSON payload:</p>
      <pre style="background-color: #fff3cd; padding: 10px; border: 1px solid #ffc107;"><code>{
  "order_id": 101,
  "items": [
    { "name": "${items[0].name}", "price": ${items[0].price}, "stock": ${items[0].stock} },
    { "name": "${items[1].name}", "price": ${items[1].price}, "stock": ${items[1].stock} },
    { "name": "${items[2].name}", "price": ${items[2].price}, "stock": ${items[2].stock} }
  ]
}</code></pre>

      <h3>FastAPI's 422 Validation Error Response</h3>
      <p>When Pydantic validation fails, FastAPI returns a response in this structure:</p>
      <pre style="background-color: #f5f5f5; padding: 10px; border: 1px solid #ddd;"><code>{
  "detail": [
    {
      "loc": ["body", "items", <index>, "<field>"],
      "msg": "Input should be greater than 0",
      "type": "greater_than"
    }
  ]
}</code></pre>

      <h3>Your Task</h3>
      <p>
        Analyze the request payload above and identify which item has the validation error. Then, provide the exact
        value of the <code>loc</code> array that FastAPI would return in the error response.
      </p>
      <p><strong>Important:</strong></p>
      <ul>
        <li>The <code>loc</code> field is an array that points to the exact location of the error</li>
        <li>Array indices are 0-based (first item is index 0, second is index 1, etc.)</li>
        <li>Format: <code>['body', 'items', &lt;index&gt;, '&lt;field_name&gt;']</code></li>
      </ul>

      <h3>Example</h3>
      <p>
        If the <strong>first</strong> item (index 0) had an invalid <code>price</code>, the loc would be:
        <code>['body', 'items', 0, 'price']</code>
      </p>

      <label for="${id}" class="form-label">
        What is the exact value of the <code>loc</code> array? (Enter as JSON array)
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="text"
        required
        placeholder='["body", "items", 1, "price"]'
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
