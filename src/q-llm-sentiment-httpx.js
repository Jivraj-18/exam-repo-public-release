import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-llm-sentiment-httpx";
    const title = "LLM Sentiment Analysis via httpx";

    const answer = `import httpx

def analyze_sentiment():
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": "Bearer DUMMY_API_KEY",
        "Content-Type": "application/json",
    }
    json = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": "You are a sentiment analyzer. Classify text as GOOD, BAD, or NEUTRAL."
            },
            {
                "role": "user",
                "content": "24 hAg Pq e1  LMIV3g pc o9 TEHIT  HpAFOxKngeFnQt3q"
            },
        ],
    }
    response = httpx.post(url, json=json, timeout=10)
    response.raise_for_status()
    return response.json()
`;

  const question = html`
    <div class="mb-3">
      <p>
        DataLine Analytics is building an internal QA tool that sends arbitrary text
        snippets to an LLM to test its sentiment routing pipeline. One of the test
        cases uses meaningless text and expects the model to still return a label
        among <strong>GOOD</strong>, <strong>BAD</strong>, or <strong>NEUTRAL</strong>.
      </p>
      <p>
        Write a Python function <code>analyze_sentiment()</code> that uses the
        <code>httpx</code> library to send a <strong>POST</strong> request to
        <code>https://api.openai.com/v1/chat/completions</code> with:
      </p>
      <ul>
        <li>A dummy <code>Authorization</code> header: <code>Bearer DUMMY_API_KEY</code>.</li>
        <li>Model <code>gpt-4o-mini</code>.</li>
        <li>A <strong>system</strong> message telling the model it must classify text as GOOD, BAD, or NEUTRAL.</li>
        <li>A <strong>user</strong> message with the exact text: <code>24 hAg Pq e1  LMIV3g pc o9 TEHIT  HpAFOxKngeFnQt3q</code>.</li>
      </ul>
      <p>
        The function should send the request with <code>httpx.post</code>,
        call <code>raise_for_status()</code>, and return <code>response.json()</code>.
        Put the complete function definition in the box below.
      </p>
      <label for="${id}" class="form-label">Python function:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
