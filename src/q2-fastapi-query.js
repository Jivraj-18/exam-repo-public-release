export default async function q2({ weight = 1 }) {
  return {
    id: 'q2-fastapi-query',
    title: 'FastAPI Query Validation',
    type: 'text',
    description: `<p>Create a FastAPI app with a <code>GET /items</code> endpoint that uses FastAPI/Pydantic validation.</p>
<ul>
  <li><code>page</code>: integer, default 1, minimum 1, maximum 100.</li>
  <li><code>sort</code>: string, default <code>"name"</code>, allowed values: <code>"name"</code>, <code>"date"</code>, <code>"score"</code>.</li>
  <li>Return <code>{"page": page, "sort": sort}</code> on success.</li>
  <li>Invalid values (e.g., <code>page=0</code>, <code>page=abc</code>, <code>sort=xyz</code>) must cause FastAPI to return a 422 error.</li>
</ul>
<p><strong>Expected file:</strong> <code>main.py</code></p>`,
    weight,
  };
}
