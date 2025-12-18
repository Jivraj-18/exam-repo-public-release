import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.75 }) {
    const id = "q-base64-encoding";
    const title = "Encode and Decode Base64";

    const random = seedrandom(`${user.email}#${id}`);
    const pick = (arr) => arr[Math.floor(random() * arr.length)];

    // Generate random secret message
    const adjectives = ["secret", "hidden", "private", "confidential", "secure", "encrypted", "protected"];
    const nouns = ["message", "data", "code", "key", "token", "password", "phrase"];
    const verbs = ["unlock", "decode", "reveal", "discover", "access", "retrieve", "obtain"];

    const randomNum = Math.floor(random() * 9000) + 1000; // 4-digit number
    const secretMessage = `The ${pick(adjectives)} ${pick(nouns)} to ${pick(verbs)} is: ${randomNum}`;

    // Encode to Base64
    const base64Encoded = btoa(secretMessage);

    const answer = (input) => {
        if (!input) throw new Error("Please enter the decoded message.");
        const trimmed = input.trim();

        if (trimmed !== secretMessage) {
            throw new Error("Incorrect decoded message. Make sure to decode the entire Base64 string precisely.");
        }
        return true;
    };

    const question = html`
    <div class="mb-3">
      <h2>CryptoSafe: Base64 Decoding Challenge</h2>
      <p>
        <strong>CryptoSafe Security</strong> uses Base64 encoding for transmitting sensitive configuration data.
        Your task is to decode a Base64-encoded message to retrieve the original text.
      </p>

      <h3>What is Base64?</h3>
      <p>
        Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
        It's commonly used in data URLs, email attachments, and API authentication tokens.
      </p>

      <h3>Base64 Encoded String</h3>
      <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; word-break: break-all;"><code>${base64Encoded}</code></pre>

      <h3>Your Task</h3>
      <p>Decode the above Base64 string and enter the original message below.</p>

      <h3>Methods to Decode</h3>
      <ul>
        <li><strong>Python:</strong> <code>import base64; base64.b64decode("...").decode()</code></li>
        <li><strong>JavaScript:</strong> <code>atob("...")</code></li>
        <li><strong>Command Line:</strong> <code>echo "..." | base64 -d</code></li>
        <li><strong>Online Tools:</strong> base64decode.org or similar</li>
      </ul>

      <label for="${id}" class="form-label">
        What is the decoded message?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}

/* Solution

# Using Python:
# /// script
# requires-python = ">=3.12"
# ///
import base64
import sys

encoded = sys.argv[1] if len(sys.argv) > 1 else "YOUR_BASE64_STRING"
decoded = base64.b64decode(encoded).decode('utf-8')
print(decoded)

# Or in browser console:
# atob("YOUR_BASE64_STRING")

# Or command line:
# echo "YOUR_BASE64_STRING" | base64 -d

*/
