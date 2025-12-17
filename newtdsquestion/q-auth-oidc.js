export default function ({ user, weight }) {
  return {
    id: "oidc_backend_token_substitution_attack",
    weight,

    question: `
A FastAPI backend implements Google OpenID Connect for authentication.

Flow:
1. Frontend performs OAuth login with Google
2. Frontend sends the received id_token to the backend
3. Backend verifies the token and creates a session

Assumptions:
- HTTPS is correctly enforced
- Token signature verification is implemented
- exp and email_verified are checked

During a security review, it is discovered that an attacker can authenticate
as another user by replaying a valid id_token obtained from a DIFFERENT client
application registered under the same Google account.

Which missing backend validation MOST directly enables this attack?

A. Not verifying the token signature using Google's JWKS  
B. Not validating that the aud matches the backend’s OAuth client_id  
C. Not checking the token expiration time  
D. Not restricting the allowed email domain  

    `,

    answer: "B",
  };
}
