export default async function question({ user, weight = 1 }) {
  const id = "q-workers-kv";

  return {
    id,
    title: "Cloudflare Workers KV Cache",
    weight,
    description: `
      <p><strong>Build a Cloudflare Worker with KV caching:</strong></p>
      <p>Write an async function that:</p>
      <ol>
        <li>Checks if key <code>"user-stats"</code> exists in <code>env.KV_NAMESPACE</code></li>
        <li>If it exists, return the cached JSON response</li>
        <li>If not, fetch from <code>https://jsonplaceholder.typicode.com/users/1</code></li>
        <li>Store the result in KV with TTL of 300 seconds using <code>.put()</code></li>
        <li>Return the JSON as response</li>
      </ol>
      <p><em>Write only the function implementation in JavaScript/TypeScript.</em></p>
    `,
    inputType: "textarea",
    placeholder: `async function handleRequest(request, env) {\n  const cache = env.KV_NAMESPACE;\n  // Implement the caching logic here\n}`,
    answer: async (code) => {
      if (!code || code.trim().length < 30) return false;
      const required = ["KV_NAMESPACE", "get", "put", "fetch"];
      return required.every((word) => code.includes(word));
    },
  };
}