import { html } from "./utils/display.js";

export default function ({ user, weight = 1 }) {
  const id = "q-fastapi-validation";
  
  return {
    id,
    weight,
    question: html`
      <h3>FastAPI Request Validation</h3>
      <p>You're building a FastAPI endpoint that accepts user registration data. Which implementation provides the BEST server-side validation?</p>
    `,
    type: "multiple-choice",
    options: [
      {
        value: "a",
        label: html`
          <pre>@app.post("/register")
def register(username: str, email: str, age: int):
    return {"username": username}</pre>
        `,
      },
      {
        value: "b",
        label: html`
          <pre>from pydantic import BaseModel, EmailStr, Field

class User(BaseModel):
    username: str = Field(min_length=3, max_length=20)
    email: EmailStr
    age: int = Field(ge=18, le=120)

@app.post("/register")
def register(user: User):
    return {"username": user.username}</pre>
        `,
      },
      {
        value: "c",
        label: html`
          <pre>@app.post("/register")
def register(data: dict):
    if len(data["username"]) < 3:
        raise ValueError("Username too short")
    return data</pre>
        `,
      },
      {
        value: "d",
        label: html`
          <pre>@app.post("/register")
def register(request: Request):
    data = request.json()
    return data</pre>
        `,
      },
    ],
    answer: "b",
  };
}
