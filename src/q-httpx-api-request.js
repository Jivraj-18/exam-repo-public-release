import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-httpx-api-request";
    const title = "Fetch Data from JSONPlaceholder API";

    const random = seedrandom(`${user.email}#${id}`);

    // Generate random parameters for the API query
    const userId = Math.floor(random() * 10) + 1; // 1-10
    let expected;

    const answer = async (input) => {
        input = input.trim();

        if (!expected) {
            // Fetch the expected answer from the API
            const response = await fetch(`/proxy/https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            if (!response.ok) throw new Error(`Failed to fetch from API: ${response.status}`);
            const posts = await response.json();

            // Calculate the sum of all post IDs for this user
            expected = posts.reduce((sum, post) => sum + post.id, 0);
        }

        const parsed = parseInt(input, 10);
        if (isNaN(parsed)) throw new Error("Please enter a valid integer.");
        if (parsed !== expected) throw new Error(`Incorrect sum. Make sure you're fetching posts for userId=${userId} and summing all post IDs.`);

        return true;
    };

    const question = html`
    <div class="mb-3">
      <h2>APIConnect: Data Retrieval Challenge</h2>
      <p>
        <strong>APIConnect Solutions</strong> is testing candidates on their ability to work with REST APIs
        using Python's <code>httpx</code> library. They use the popular 
        <a href="https://jsonplaceholder.typicode.com/" target="_blank">JSONPlaceholder</a> fake API for testing.
      </p>

      <h3>Task</h3>
      <p>Write a Python script using <code>httpx</code> to:</p>
      <ol>
        <li>Fetch all posts from <code>https://jsonplaceholder.typicode.com/posts</code> where <code>userId=${userId}</code></li>
        <li>Calculate the <strong>sum of all post IDs</strong> returned</li>
        <li>Enter the sum below</li>
      </ol>

      <h3>API Details</h3>
      <ul>
        <li><strong>Endpoint:</strong> <code>https://jsonplaceholder.typicode.com/posts</code></li>
        <li><strong>Query Parameter:</strong> <code>userId=${userId}</code></li>
        <li><strong>Response:</strong> JSON array of post objects, each with an <code>id</code> field</li>
      </ul>

      <h3>Example Python Code Structure</h3>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;"><code class="language-python">import httpx

response = httpx.get("https://...", params={...})
data = response.json()
# Sum the 'id' field from each post
result = sum(post['id'] for post in data)
print(result)</code></pre>

      <label for="${id}" class="form-label">
        What is the sum of all post IDs for userId=${userId}?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}

/* Solution

# /// script
# requires-python = ">=3.12"
# dependencies = ["httpx"]
# ///
import httpx
import sys

def get_sum_of_post_ids(user_id: int) -> int:
    url = "https://jsonplaceholder.typicode.com/posts"
    response = httpx.get(url, params={"userId": user_id})
    response.raise_for_status()
    posts = response.json()
    return sum(post['id'] for post in posts)

if __name__ == "__main__":
    user_id = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    result = get_sum_of_post_ids(user_id)
    print(f"Sum of post IDs for userId {user_id}: {result}")

*/
