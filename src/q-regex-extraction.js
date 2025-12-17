import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const generateEmail = (random) => {
  const names = ["john", "jane", "bob", "alice", "mike", "sara", "raj", "priya", "amit", "sneha"];
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "iitm.ac.in", "company.org"];
  return `${pick(names, random)}${randInt(random, 1, 999)}@${pick(domains, random)}`;
};

const generatePhone = (random) => {
  const formats = [
    () => `+91-${randInt(random, 70000, 99999)}${randInt(random, 10000, 99999)}`,
    () => `${randInt(random, 7000000000, 9999999999)}`,
    () => `+91 ${randInt(random, 70000, 99999)} ${randInt(random, 10000, 99999)}`,
  ];
  return pick(formats, random)();
};

const generateDate = (random) => {
  const day = randInt(random, 1, 28);
  const month = randInt(random, 1, 12);
  const year = randInt(random, 2020, 2025);
  const formats = [
    `${day}/${month}/${year}`,
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    `${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year}`,
  ];
  return pick(formats, random);
};

const generateText = (random, type, count) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    if (type === "email") items.push(generateEmail(random));
    else if (type === "phone") items.push(generatePhone(random));
    else if (type === "date") items.push(generateDate(random));
  }
  return items;
};

const generateMixedText = (random, emails, phones, dates) => {
  const fillers = [
    "Contact us at",
    "Please reach out to",
    "For inquiries email",
    "Call us on",
    "Meeting scheduled for",
    "Updated on",
    "Registered on",
    "Phone number:",
    "Email:",
  ];
  
  let text = "";
  emails.forEach((e) => (text += `${pick(fillers, random)} ${e}. `));
  phones.forEach((p) => (text += `${pick(fillers, random)} ${p}. `));
  dates.forEach((d) => (text += `${pick(fillers, random)} ${d}. `));
  return text;
};

const taskFactories = [
  (random) => {
    const count = randInt(random, 3, 6);
    const emails = generateText(random, "email", count);
    const phones = generateText(random, "phone", randInt(random, 1, 3));
    const text = generateMixedText(random, emails, phones, []);
    return {
      id: "extract-emails",
      text,
      extractType: "emails",
      expected: emails.length,
      expectedItems: emails,
      description: `extract all email addresses from the text`,
      pattern: `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`,
    };
  },
  (random) => {
    const count = randInt(random, 3, 5);
    const phones = generateText(random, "phone", count);
    const emails = generateText(random, "email", randInt(random, 1, 3));
    const text = generateMixedText(random, emails, phones, []);
    return {
      id: "extract-phones",
      text,
      extractType: "phones",
      expected: phones.length,
      expectedItems: phones,
      description: `extract all phone numbers from the text`,
      pattern: `(\\+91[- ]?)?[6-9]\\d{9}|\\+91[- ]?\\d{5}[- ]?\\d{5}`,
    };
  },
  (random) => {
    const count = randInt(random, 3, 5);
    const dates = generateText(random, "date", count);
    const emails = generateText(random, "email", randInt(random, 1, 2));
    const text = generateMixedText(random, emails, [], dates);
    return {
      id: "extract-dates",
      text,
      extractType: "dates",
      expected: dates.length,
      expectedItems: dates,
      description: `extract all dates from the text`,
      pattern: `\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4}|\\d{4}-\\d{2}-\\d{2}`,
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-regex-extraction";
  const title = "Regular Expression Data Extraction";
  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Regular Expression Data Extraction</h4>
      <p>
        <strong>Scenario:</strong> You need to extract structured data (emails, phones, or dates) from unstructured text using regular expressions.
        Build a FastAPI endpoint that extracts the requested data type from the given text.
      </p>
      <ol>
        <li>Implement a FastAPI app with a <code>POST /extract</code> route.</li>
        <li>Accept JSON: <code>{ "text": "...", "extract_type": "emails|phones|dates" }</code></li>
        <li>Use regex to extract all matches of the specified type.</li>
        <li>Respond with: <code>{ "matches": [...], "count": number, "email": "${user.email}" }</code></li>
        <li>Enable CORS for cross-origin requests.</li>
      </ol>
      <p>For grading, we will send this text:</p>
      <pre class="bg-light p-2" style="font-size: 0.85em; max-height: 120px; overflow: auto;">${task.text}</pre>
      <p>
        Task: <strong>${task.description}</strong><br />
        Extract type: <code>${task.extractType}</code> | Expected count: <code>${task.expected}</code>
      </p>
      <label for="${id}" class="form-label">Enter the base URL of your API</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = url.replace(/\/$/, "") + "/extract";
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: task.text, extract_type: task.extractType }),
    });

    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}`);

    let respData;
    try {
      respData = await resp.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (respData.email !== user.email) throw new Error("Email must match");

    const count = Number(respData.count);
    if (count !== task.expected) {
      throw new Error(`Expected ${task.expected} matches, got ${count}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: main.py

# /// script
# requires-python = ">=3.12"
# dependencies = ["fastapi", "uvicorn"]
# ///

import re
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class ExtractInput(BaseModel):
    text: str
    extract_type: str

PATTERNS = {
    "emails": r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}",
    "phones": r"(\+91[-\s]?)?[6-9]\d{9}|\+91[-\s]?\d{5}[-\s]?\d{5}",
    "dates": r"\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2}",
}

@app.post("/extract")
async def extract(data: ExtractInput):
    pattern = PATTERNS.get(data.extract_type, "")
    matches = re.findall(pattern, data.text)
    # Flatten tuples if any (from groups in regex)
    matches = [m if isinstance(m, str) else m[0] if m[0] else m for m in matches]
    matches = [m for m in matches if m]  # Remove empty strings
    
    return {"matches": matches, "count": len(matches), "email": "YOUR_EMAIL@ds.study.iitm.ac.in"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
*/