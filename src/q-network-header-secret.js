import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const generateSecretCode = (random, length = 16) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(random() * chars.length)];
  }
  return result;
};

// Disable right-click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  // show the alert only once
  if (!document.getElementById("right-click-alert")) {
    alert("Right-click is disabled! Use a different approach.");
    const alertDiv = document.createElement("div");
    alertDiv.id = "right-click-alert";
    alertDiv.style.display = "none";
    document.body.appendChild(alertDiv);
  }
});
// Disable F12, Ctrl+Shift+I/J, Ctrl+U
document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J"].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toUpperCase() === "U")
  ) {
    e.preventDefault();
    if (!document.getElementById("devtools-alert")) {
      alert("Opening DevTools is disabled! Use a different approach.");
      const alertDiv = document.createElement("div");
      alertDiv.id = "devtools-alert";
      alertDiv.style.display = "none";
      document.body.appendChild(alertDiv);
    }
  }
});

console.log("Congratulations")


const headerNames = [
  "X-Auth-Token",
  "X-Api-Key",
  "X-Api",
  "X-Secret-Token",
  "X-Access-Code",
];

export default async function ({ user, weight = 1 }) {
  const id = "q-network-header-secret";
  const title = "Network Tab Investigation";
  const random = seedrandom(`${user.email}#${id}`);

  // Generate seeded values
  const secretCode = generateSecretCode(random, 20);
  const headerName = pick(headerNames, random);

  // Simple endpoint to make the request to
  const targetUrl = "https://httpspot.dev/headers";

  // Click handler for the button
  const handleClick = async (e) => {
    const button = e.target;
    const status = document.getElementById(`${id}-status`);

    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Loading...';
    status.innerHTML = `<div class="alert alert-secondary">Making request...</div>`;

    try {
      // Send the secret code in the REQUEST headers
      const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          [headerName]: secretCode,
        },
      });

      if (response.ok) {
        status.innerHTML = `
          <div class="alert alert-success">
            <strong>✓ Request completed!</strong><br>
            Now inspect the Network tab to find the hidden value.
          </div>
        `;
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      status.innerHTML = `<div class="alert alert-danger"><strong>✗ Error:</strong> ${error.message}</div>`;
    }

    button.disabled = false;
    button.innerHTML = "🔍 Trigger API Request";
  };

  const question = html`
    <div class="mb-3">
      <h4>Case Study: API Security Audit</h4>
      <p>
        <strong>Scenario:</strong> You're performing a security audit on a web application. A developer suspects that
        sensitive credentials are being leaked through HTTP requests. Your task is to intercept network traffic and
        find the hidden secret.
      </p>
      <ol>
        <li>Open your browser's Developer Tools (F12 or Ctrl+Shift+I)</li>
        <li>Navigate to the <strong>Network</strong> tab</li>
        <li>Click the button below to trigger an API request</li>
        <li>Find the request in the Network tab and inspect it carefully</li>
        <li>Look for any suspicious or unusual values being transmitted.</li>
        <li>The secret is a 20-character alphanumeric code</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${handleClick}>
          🔍 Trigger API Request
        </button>
      </p>
      <div id="${id}-status" class="mb-3"></div>
        <label for="${id}" class="form-label">What is the secret code hidden in the request?</label>
        <input class="form-control" id="${id}" name="${id}" placeholder="Enter the 20-character secret code" />
      </div>
  `;

  const answer = (input) => {
    if (!input || typeof input !== "string") {
      throw new Error("Answer is required");
    }

    const trimmed = input.trim();

    if (trimmed.length === 0) {
      throw new Error("Answer cannot be empty");
    }

    if (trimmed !== secretCode) {
      throw new Error("Incorrect. Inspect the network request more carefully.");
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Solution Guide:

1. Open Developer Tools (F12)
2. Go to Network tab
3. Click "Trigger API Request" button
4. Find the request to httpbin.org/headers
5. Click on the request
6. Look at "Request Headers" section
7. Find the custom header (X-Auth-Token, X-Api-Key, etc.)
8. Copy the 20-character value
9. Paste it in the answer field

The header name and secret are seeded per user, so each student gets a unique combination.
*/
