import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-base64-encode-decode";
  const title = "Base64: Encode and Decode Data";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate random phrases to encode
  const phrases = [
    "Hello, World!",
    "Data Science is fun",
    "Python rocks",
    "IIT Madras BS",
    "Tools in Data Science",
    "Machine Learning",
    "API requests",
    "JSON parsing",
    "Web scraping",
    "Data visualization",
    "Statistical analysis",
    "Deep learning",
    "Natural language",
    "Computer vision",
    "Neural networks",
  ];

  // Pick a random phrase
  const phraseIndex = Math.floor(random() * phrases.length);
  const originalPhrase = phrases[phraseIndex];

  // Base64 encode it (using browser's btoa equivalent logic)
  const base64Encoded = btoa(originalPhrase);

  // Randomly decide if we ask to encode or decode
  const isEncode = random() > 0.5;

  let questionText, expectedAnswer, inputLabel;

  if (isEncode) {
    questionText = html`
      <p>
        <strong>Task:</strong> Encode the following text string to Base64:
      </p>
      <pre><code>${originalPhrase}</code></pre>
      <p><strong>Hint:</strong> In Python, you can use:</p>
      <pre><code>import base64
text = "${originalPhrase}"
encoded = base64.b64encode(text.encode()).decode()
print(encoded)</code></pre>
    `;
    expectedAnswer = base64Encoded;
    inputLabel = "Enter the Base64 encoded string:";
  } else {
    questionText = html`
      <p>
        <strong>Task:</strong> Decode the following Base64 string to get the original text:
      </p>
      <pre><code>${base64Encoded}</code></pre>
      <p><strong>Hint:</strong> In Python, you can use:</p>
      <pre><code>import base64
encoded = "${base64Encoded}"
decoded = base64.b64decode(encoded).decode()
print(decoded)</code></pre>
    `;
    expectedAnswer = originalPhrase;
    inputLabel = "Enter the decoded text:";
  }

  const question = html`
    <div class="mb-3">
      <h4>Base64 Encoding/Decoding</h4>
      <p>
        Base64 encoding is commonly used in web applications and APIs to encode binary data or sensitive information
        into ASCII characters. Understanding Base64 is essential when working with APIs that transmit binary data (like
        images) or authentication tokens.
      </p>

      ${questionText}

      <label for="${id}" class="form-label">${inputLabel}</label>
      <input class="form-control" id="${id}" name="${id}" type="text" />
      <p class="text-muted">Make sure to enter the exact string with correct casing.</p>
    </div>
  `;

  const answer = (input) => {
    if (!input || input.trim() === "") throw new Error("Answer is required");

    const userAnswer = input.trim();

    if (userAnswer !== expectedAnswer) {
      throw new Error(`Incorrect. Expected: ${expectedAnswer}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

// Helper function for Base64 encoding (browser-compatible)
function btoa(str) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  let i = 0;

  while (i < str.length) {
    const a = str.charCodeAt(i++);
    const b = i < str.length ? str.charCodeAt(i++) : 0;
    const c = i < str.length ? str.charCodeAt(i++) : 0;

    const bitmap = (a << 16) | (b << 8) | c;

    result +=
      chars[(bitmap >> 18) & 63] +
      chars[(bitmap >> 12) & 63] +
      (i > str.length + 1 ? "=" : chars[(bitmap >> 6) & 63]) +
      (i > str.length ? "=" : chars[bitmap & 63]);
  }

  return result;
}
