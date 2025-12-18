export default function fastapiOAuthValidationQuestion({ user, weight }) {
  return {
    id: "q-fastapi-oauth-validation",
    title: "FastAPI /patient-data with OAuth2 role validation",
    weight,
    prompt: `
Implement a FastAPI /patient-data endpoint:
- Only accessible to users with role "doctor"
- Validate JWT tokens
- Return {"status":"authorized","token":"auth-9xkq2"} if valid
- Else return {"error":"unauthorized","guardrail":"ga6-7p2d"}
    `,
  };
}
