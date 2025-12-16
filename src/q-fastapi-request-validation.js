export default {
  id: "fastapi-request-validation",
  title: "FastAPI Request Validation",
  description: "Validate incoming request data using Pydantic models.",
  question: `
A FastAPI endpoint receives a POST request with the following JSON body:

{
  "email": "string",
  "age": number
}

Write a Pydantic model that:
- Validates email as a proper email address
- Ensures age is an integer greater than or equal to 18
`,
  answer: `
from pydantic import BaseModel, EmailStr, Field

class User(BaseModel):
    email: EmailStr
    age: int = Field(ge=18)
`
};
