export default function ({ user, weight = 1 }) {
  return {
    id: "codespaces_port_forwarding",
    weight,

    prompt: `
You run a FastAPI app on port 8000 inside GitHub Codespaces.

To allow external access via a browser, what must the port visibility be set to?
    `.trim(),

    answer: "public",
  };
}
