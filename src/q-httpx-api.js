import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const taskFactories = [
  (random) => {
    const country = pick(["US", "GB", "DE", "FR", "IN", "JP", "AU", "CA"], random);
    return {
      id: "country-info",
      apiUrl: `https://restcountries.com/v3.1/alpha/${country}`,
      extractField: "population",
      description: `Fetch country data for "${country}" and extract the population`,
      apiType: "restcountries",
      param: country,
    };
  },
  (random) => {
    const userId = randInt(random, 1, 10);
    return {
      id: "user-posts",
      apiUrl: `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      extractField: "count",
      description: `Fetch posts for user ID ${userId} and count total posts`,
      apiType: "jsonplaceholder-posts",
      param: userId,
    };
  },
  (random) => {
    const postId = randInt(random, 1, 100);
    return {
      id: "post-comments",
      apiUrl: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      extractField: "count",
      description: `Fetch comments for post ID ${postId} and count them`,
      apiType: "jsonplaceholder-comments",
      param: postId,
    };
  },
  (random) => {
    const userId = randInt(random, 1, 10);
    return {
      id: "user-todos",
      apiUrl: `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
      extractField: "completed_count",
      description: `Fetch todos for user ID ${userId} and count completed todos`,
      apiType: "jsonplaceholder-todos",
      param: userId,
    };
  },
  (random) => {
    const albumId = randInt(random, 1, 10);
    return {
      id: "album-photos",
      apiUrl: `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
      extractField: "count",
      description: `Fetch photos in album ID ${albumId} and count them`,
      apiType: "jsonplaceholder-photos",
      param: albumId,
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-httpx-api";
  const title = "HTTP API Data Fetching with httpx";
  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  // Pre-calculate expected answer by making the actual API call
  let expectedValue;
  try {
    const resp = await fetch(task.apiUrl);
    const data = await resp.json();
    
    if (task.apiType === "restcountries") {
      expectedValue = data[0]?.population || 0;
    } else if (task.apiType === "jsonplaceholder-posts") {
      expectedValue = Array.isArray(data) ? data.length : 0;
    } else if (task.apiType === "jsonplaceholder-comments") {
      expectedValue = Array.isArray(data) ? data.length : 0;
    } else if (task.apiType === "jsonplaceholder-todos") {
      expectedValue = Array.isArray(data) ? data.filter((t) => t.completed).length : 0;
    } else if (task.apiType === "jsonplaceholder-photos") {
      expectedValue = Array.isArray(data) ? data.length : 0;
    }
  } catch {
    expectedValue = -1;
  }

  const question = html`
    <div class="mb-3">
      <h4>HTTP API Data Fetching</h4>
      <p>
        <strong>Scenario:</strong> You need to fetch data from external APIs using Python's <code>httpx</code> or <code>requests</code> library.
        Build a FastAPI endpoint that fetches data from a given API URL and extracts specific information.
      </p>
      <ol>
        <li>Implement a FastAPI app with a <code>GET /fetch</code> route.</li>
        <li>Accept query parameters: <code>?api_type=...&param=...</code></li>
        <li>Use <code>httpx</code> or <code>requests</code> to fetch data from the appropriate API.</li>
        <li>Extract and return the requested information.</li>
        <li>Respond with: <code>{ "result": value, "email": "${user.email}" }</code></li>
        <li>Enable CORS for cross-origin requests.</li>
      </ol>
      <p>
        Task: <strong>${task.description}</strong><br />
        API Type: <code>${task.apiType}</code><br />
        Parameter: <code>${task.param}</code><br />
        API URL for reference: <code>${task.apiUrl}</code>
      </p>
      <label for="${id}" class="form-label">Enter the base URL of your API</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = `${url.replace(/\/$/, "")}/fetch?api_type=${encodeURIComponent(task.apiType)}&param=${encodeURIComponent(task.param)}`;
    const resp = await fetch(endpoint);

    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}`);

    let respData;
    try {
      respData = await resp.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (respData.email !== user.email) throw new Error("Email must match");

    // Re-fetch expected value at grading time for accuracy
    let currentExpected;
    try {
      const checkResp = await fetch(task.apiUrl);
      const checkData = await checkResp.json();
      
      if (task.apiType === "restcountries") {
        currentExpected = checkData[0]?.population || 0;
      } else if (task.apiType === "jsonplaceholder-posts") {
        currentExpected = Array.isArray(checkData) ? checkData.length : 0;
      } else if (task.apiType === "jsonplaceholder-comments") {
        currentExpected = Array.isArray(checkData) ? checkData.length : 0;
      } else if (task.apiType === "jsonplaceholder-todos") {
        currentExpected = Array.isArray(checkData) ? checkData.filter((t) => t.completed).length : 0;
      } else if (task.apiType === "jsonplaceholder-photos") {
        currentExpected = Array.isArray(checkData) ? checkData.length : 0;
      }
    } catch {
      throw new Error("Could not verify expected value");
    }

    const result = Number(respData.result);
    if (result !== currentExpected) {
      throw new Error(`Expected ${currentExpected}, got ${result}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: main.py

# /// script
# requires-python = ">=3.12"
# dependencies = ["fastapi", "uvicorn", "httpx"]
# ///

import httpx
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/fetch")
async def fetch_api(api_type: str = Query(...), param: str = Query(...)):
    async with httpx.AsyncClient() as client:
        if api_type == "restcountries":
            resp = await client.get(f"https://restcountries.com/v3.1/alpha/{param}")
            data = resp.json()
            result = data[0]["population"] if data else 0
        
        elif api_type == "jsonplaceholder-posts":
            resp = await client.get(f"https://jsonplaceholder.typicode.com/posts?userId={param}")
            data = resp.json()
            result = len(data)
        
        elif api_type == "jsonplaceholder-comments":
            resp = await client.get(f"https://jsonplaceholder.typicode.com/posts/{param}/comments")
            data = resp.json()
            result = len(data)
        
        elif api_type == "jsonplaceholder-todos":
            resp = await client.get(f"https://jsonplaceholder.typicode.com/todos?userId={param}")
            data = resp.json()
            result = sum(1 for t in data if t["completed"])
        
        elif api_type == "jsonplaceholder-photos":
            resp = await client.get(f"https://jsonplaceholder.typicode.com/albums/{param}/photos")
            data = resp.json()
            result = len(data)
        
        else:
            result = 0
    
    return {"result": result, "email": "YOUR_EMAIL@ds.study.iitm.ac.in"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
*/