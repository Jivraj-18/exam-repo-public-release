import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-validation";
  const title = "FastAPI Server-Side Validation";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate random constraints for the question
  const minAge = 18 + Math.floor(random() * 5); // 18-22
  const maxAge = 60 + Math.floor(random() * 40); // 60-99
  const minNameLength = 2 + Math.floor(random() * 2); // 2-3
  const maxNameLength = 30 + Math.floor(random() * 20); // 30-49

  const question = html`
    <div class="mb-3">
      <h4>User Registration Endpoint with Server-Side Validation</h4>
      <p>
        <strong>Scenario:</strong> You are building a user registration system that requires strict server-side 
        validation. The system must reject invalid inputs before processing them.
      </p>
      <p>
        Create a FastAPI endpoint that validates user registration data with the following requirements:
      </p>
      <ol>
        <li>Create a <code>POST /register</code> endpoint that accepts JSON data.</li>
        <li>
          The endpoint must validate:
          <ul>
            <li><code>name</code>: string, length between ${minNameLength} and ${maxNameLength} characters</li>
            <li><code>email</code>: valid email format</li>
            <li><code>age</code>: integer between ${minAge} and ${maxAge}</li>
          </ul>
        </li>
        <li>
          On successful validation, return JSON:
          <code>{ "status": "success", "message": "User registered", "email": "${user.email}" }</code>
        </li>
        <li>On validation errors, FastAPI should automatically return 422 with error details.</li>
        <li>Enable CORS to allow cross-origin POST requests.</li>
      </ol>
      <label for="${id}" class="form-label">Enter the full URL of your <code>/register</code> endpoint</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
      <p class="text-muted">
        We'll test with valid data (name: "Alice Johnson", email: "alice@example.com", age: ${minAge + 10})
        and invalid data to verify validation works.
      </p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const cleanUrl = url.trim();
    
    // Test 1: Valid data
    const validAge = minAge + 10;
    const validData = {
      name: "Alice Johnson",
      email: "alice@example.com",
      age: validAge,
    };

    let response = await fetch(cleanUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validData),
    });

    if (!response.ok) {
      throw new Error(`Endpoint returned ${response.status} for valid data. Expected 200.`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("Response must be application/json");
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Response body is not valid JSON");
    }

    if (!data || typeof data !== "object") {
      throw new Error("Response must be a JSON object");
    }

    if (data.status !== "success") {
      throw new Error("Response must have status: 'success' for valid data");
    }

    if (data.email !== user.email) {
      throw new Error(`Response must include your email: ${user.email}`);
    }

    // Test 2: Invalid age (too young)
    const invalidAgeData = {
      name: "Bob Smith",
      email: "bob@example.com",
      age: minAge - 1,
    };

    response = await fetch(cleanUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidAgeData),
    });

    if (response.status !== 422) {
      throw new Error(`Expected 422 for age=${invalidAgeData.age} (min: ${minAge}), got ${response.status}`);
    }

    // Test 3: Invalid email format
    const invalidEmailData = {
      name: "Charlie Brown",
      email: "not-an-email",
      age: validAge,
    };

    response = await fetch(cleanUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidEmailData),
    });

    if (response.status !== 422) {
      throw new Error(`Expected 422 for invalid email format, got ${response.status}`);
    }

    // Test 4: Invalid name (too short)
    const invalidNameData = {
      name: "X",
      email: "short@example.com",
      age: validAge,
    };

    response = await fetch(cleanUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidNameData),
    });

    if (response.status !== 422) {
      throw new Error(`Expected 422 for name length < ${minNameLength}, got ${response.status}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: app.py

# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "fastapi",
#   "uvicorn",
#   "pydantic",
#   "email-validator",
# ]
# ///

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRegistration(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    age: int = Field(..., ge=18, le=100)

@app.post("/register")
async def register_user(user: UserRegistration):
    return {
        "status": "success",
        "message": "User registered",
        "email": "your-email@example.com"  # Replace with actual user email
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# Note: Install email-validator for EmailStr validation:
# pip install email-validator
*/
