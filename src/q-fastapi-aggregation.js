import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3.0.5/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-parsing";
  const title = "FastAPI Request Parsing";

  const random = seedrandom(`${user.email}#${id}`);

  // Deterministic values
  const base = Math.floor(50 + random() * 30);
  const multiplier = Math.floor(2 + random() * 4);

  /**
   * What FastAPI will compute internally
   */
  const quantity = base;          // from query
  const price = 10;               // default value (body missing)
  const discount = multiplier;    // from query
  const answer = quantity * price - discount;

  const question = html`
    <div class="mb-3">
      <p>
        Consider the following <strong>FastAPI</strong> application.
      </p>

      <h6>FastAPI Code</h6>
      <pre><code class="language-python">
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Order(BaseModel):
    quantity: int
    price: int = 10

@app.post("/total")
def compute_total(
    order: Order,
    discount: int = 0
):
    return order.quantity * order.price - discount
      </code></pre>

      <h6>Incoming HTTP Request</h6>
      <pre><code>
POST /total?quantity=${base}&discount=${multiplier}
Content-Type: application/json

{
  "quantity": ${base}
}
      </code></pre>

      <h6>Task</h6>
      <p>
        Using your knowledge of how FastAPI parses
        <strong>query parameters</strong> and
        <strong>JSON request bodies</strong>, determine:
      </p>

      <p class="fw-bold">
        What value does the API return?
      </p>

      <p class="text-muted">
        Notes:
        <ul>
          <li>Query parameters override only matching function parameters</li>
          <li>Missing Pydantic fields use default values</li>
          <li>FastAPI does <strong>not</strong> merge query params into request bodies</li>
        </ul>
      </p>

      <label for="${id}" class="form-label">
        API response value
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
