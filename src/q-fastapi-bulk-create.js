import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-bulk-create";
  const title = "FastAPI: Bulk create (atomic validation)";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate sample payloads: some valid, one duplicate id, one empty name
  const makeItem = (i) => ({ id: i, name: `name-${String(i).padStart(2, "0")}`, data: { value: Math.floor(random() * 100) } });
  const items = [makeItem(1), makeItem(2), makeItem(3), makeItem(3), { id: 5, name: "", data: { value: 77 } }, makeItem(6)];

  const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });

  const expected = (() => {
    const ids = new Map();
    const errors = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!Number.isInteger(it.id)) errors.push(`invalid id at index ${i}`);
      if (!it.name || typeof it.name !== "string" || it.name.trim() === "") errors.push(`empty name at index ${i}`);
      if (ids.has(it.id)) errors.push(`duplicate id ${it.id} (first index ${ids.get(it.id)}, another index ${i})`);
      else ids.set(it.id, i);
    }
    if (errors.length) {
      return { accepted: 0, rejected: items.length, errors };
    }
    return { accepted: items.length, rejected: 0, errors: [] };
  })();

  const answer = async (value) => {
    if (typeof value !== "string") throw new Error("Submit the JSON summary as text.");

    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch (e) {
      throw new Error("Invalid JSON");
    }

    if (parsed.accepted !== expected.accepted) throw new Error(`accepted should be ${expected.accepted}`);
    if (parsed.rejected !== expected.rejected) throw new Error(`rejected should be ${expected.rejected}`);
    if (!Array.isArray(parsed.errors)) throw new Error("errors should be an array");
    if (parsed.errors.length !== expected.errors.length) throw new Error(`errors length should be ${expected.errors.length}`);

    // Ensure same messages (order matters here)
    for (let i = 0; i < expected.errors.length; i++) {
      if (parsed.errors[i] !== expected.errors[i]) throw new Error(`errors[${i}] mismatch: expected "${expected.errors[i]}"`);
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Atomic Bulk Create for Inventory Service</h2>
      <p>
        Your task is to implement a FastAPI endpoint <code>POST /bulk-create</code> that accepts an array of items
        <code>{id: int, name: str, data: object}</code>. The endpoint must validate the whole batch atomically:
        if any item is invalid (duplicate ids or empty name), the entire request is rejected and a summary describing
        the failures is returned.
      </p>
      <ol>
        <li>Download the sample payload and implement your endpoint locally (or write a script that simulates the endpoint logic).</li>
        <li>Run your validation against the provided file. Do not actually POST it anywhere — just simulate the server behavior.</li>
        <li>Submit the JSON summary your endpoint would return (an object with <code>accepted</code>, <code>rejected</code>, and <code>errors</code>).</li>
      </ol>

      <p>
        Download the payload for validation:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.json`)}>${id}.json</button>
      </p>

      <label for="${id}" class="form-label">Paste the JSON summary returned by your endpoint</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" required></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution (Python pseudocode)

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

class Item(BaseModel):
    id: int
    name: str
    data: Dict

app = FastAPI()

@app.post("/bulk-create")
async def bulk_create(items: List[Item]):
    ids = set()
    errors = []
    for i, it in enumerate(items):
        if it.id in ids:
            errors.append(f"duplicate id {it.id} (first index ..., another index {i})")
        ids.add(it.id)
        if not it.name.strip():
            errors.append(f"empty name at index {i}")
    if errors:
        return {"accepted": 0, "rejected": len(items), "errors": errors}
    return {"accepted": len(items), "rejected": 0, "errors": []}

*/