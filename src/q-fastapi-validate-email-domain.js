export default {
  id: "fastapi-validate-email-domain",
  title: "Validate email domain in FastAPI",
  description: `
Create a FastAPI endpoint \`POST /register\` that accepts a JSON body with a single field \`email\` (string).

Requirements:
- If \`email\` does not contain \`"@"\`, return HTTP 422 using FastAPI's standard validation (use a Pydantic model with \`EmailStr\`).
- If the email domain is not "example.com" (i.e., part after "@"), return HTTP 400 with JSON \`{"error": "Invalid domain"}\`.
- Otherwise, return HTTP 200 with JSON \`{"status": "registered"}\`.
`,
  starter: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr

app = FastAPI()

class RegisterRequest(BaseModel):
    email: EmailStr

@app.post("/register")
async def register(data: RegisterRequest):
    # TODO: check that domain is "example.com"
    # If invalid, raise HTTPException(status_code=400, detail={"error": "Invalid domain"})
    # Otherwise, return {"status": "registered"}
    pass
`,
  tests: [
    {
      id: "valid-example-domain",
      description: "Returns 200 for valid example.com email",
      code: `
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

resp = client.post("/register", json={"email": "user@example.com"})
assert resp.status_code == 200
assert resp.json() == {"status": "registered"}
`
    },
    {
      id: "invalid-domain",
      description: "Returns 400 for non-example.com domain",
      code: `
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

resp = client.post("/register", json={"email": "user@gmail.com"})
assert resp.status_code == 400
assert resp.json() == {"error": "Invalid domain"}
`
    },
    {
      id: "invalid-email-format",
      description: "FastAPI/Pydantic should return 422 for invalid email format",
      code: `
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

resp = client.post("/register", json={"email": "not-an-email"})
assert resp.status_code == 422
`
    }
  ]
};
