import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-pydantic-typo";
  const title = "FastAPI Pydantic Validation";
  const random = seedrandom(`${user.email}#${id}`);

  const fieldType = Math.random() > 0.5 ? "int" : "float";
  const wrongValue = fieldType === "int" ? '"five"' : '"xyz"';

  const question = html`
    <p>You have a FastAPI endpoint defined with this Pydantic model:</p>
    <pre><code>class Item(BaseModel):
    name: str
    price: ${fieldType}
    is_offer: bool = None</code></pre>
    <p>A client sends the following JSON payload:</p>
    <pre><code>{
    "name": "Widget",
    "price": ${wrongValue},
    "is_offer": false
}</code></pre>
    <p>FastAPI will return a <strong>422 Unprocessable Entity</strong> error.</p>
    <p>Which field name will be cited as the source of the validation error in the response JSON?</p>
  `;

  return {
    id,
    title,
    question,
    // Syllabus mapping: Deployment Tools > FastAPI > Validation
    check: (answer) => {
      const ans = String(answer).trim().toLowerCase();
      if (ans === "price") return true;
      throw new Error("Incorrect. Look at which field received the wrong data type.");
    },
    weight,
  };
}
