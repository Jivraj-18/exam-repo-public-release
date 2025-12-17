import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-copilot-build-calculator";
  const title = "Build a Data Science Calculator with GitHub Copilot";

  const random = seedrandom(`${user.email}#${id}`);
  
  const calculatorTypes = [
    {
      name: "Confusion Matrix Calculator",
      feature: "Calculate precision, recall, F1-score from TP, FP, TN, FN inputs",
      example: "Input: TP=85, FP=10, TN=120, FN=5 → Output: Precision=0.895, Recall=0.944, F1=0.919"
    },
    {
      name: "Train-Test Split Calculator",
      feature: "Calculate train/test sizes given dataset rows and split ratio",
      example: "Input: 10000 rows, 70% train → Output: Train=7000, Test=3000, Validation=0"
    },
    {
      name: "Learning Rate Scheduler",
      feature: "Calculate learning rate decay over epochs using exponential decay",
      example: "Input: Initial LR=0.01, decay=0.95, epoch=10 → Output: Current LR=0.0060"
    },
    {
      name: "Cross-Validation Fold Calculator",
      feature: "Calculate sample indices for k-fold cross-validation",
      example: "Input: 1000 samples, k=5 → Output: Fold sizes=[200,200,200,200,200]"
    }
  ];

  const selectedCalc = calculatorTypes[Math.floor(random() * calculatorTypes.length)];
  const verificationToken = Math.random().toString(36).substring(2, 10).toUpperCase();

  const answer = (response) => {
    const normalized = response.trim().toLowerCase();
    
    // Check minimum length
    if (normalized.length < 500) {
      throw new Error("Copilot chat log too short. You must paste the complete conversation showing app creation.");
    }

    // Check for key indicators
    const checks = [
      { test: normalized.includes("copilot") || normalized.includes("github"), error: "This doesn't appear to be a GitHub Copilot chat log" },
      { test: normalized.includes("html") || normalized.includes("javascript") || normalized.includes("function"), error: "Log must show code generation (HTML/JavaScript)" },
      { test: normalized.includes(selectedCalc.name.toLowerCase().split(' ')[0]), error: `Log must show creation of ${selectedCalc.name}` },
      { test: normalized.includes(verificationToken.toLowerCase()), error: `Your app must include verification token: ${verificationToken}` },
    ];

    for (const check of checks) {
      if (!check.test) throw new Error(check.error);
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>AI-Assisted Development: Build with GitHub Copilot Chat</h2>
      <p>
        Modern data scientists use AI coding assistants to rapidly prototype tools and utilities. 
        GitHub Copilot Chat can generate complete applications through conversational prompts, 
        dramatically reducing development time for common tasks.
      </p>

      <h3>Your Task</h3>
      <p>
        Use <strong>GitHub Copilot Chat in VS Code</strong> to create a <strong>${selectedCalc.name}</strong> 
        web application. This demonstrates your ability to leverage AI for practical data science tool development.
      </p>

      <h3>Calculator Requirements</h3>
      <ul>
        <li><strong>Feature:</strong> ${selectedCalc.feature}</li>
        <li><strong>Example:</strong> ${selectedCalc.example}</li>
        <li><strong>Interface:</strong> HTML form with input fields and calculate button</li>
        <li><strong>Technology:</strong> Single HTML file with embedded CSS and JavaScript</li>
        <li><strong>Verification:</strong> Include the text <code>${verificationToken}</code> visible in the app (e.g., in a footer)</li>
      </ul>

      <h3>Step-by-Step Instructions</h3>
      <ol>
        <li><strong>Open VS Code</strong> with GitHub Copilot Chat extension installed</li>
        <li><strong>Open Copilot Chat:</strong> Press <code>Ctrl+Shift+I</code> (Windows/Linux) or <code>Cmd+Shift+I</code> (Mac)</li>
        <li><strong>Start conversation:</strong> Ask Copilot to create the calculator:
          <pre>"Create a ${selectedCalc.name} as a single HTML file with CSS and JavaScript.
${selectedCalc.feature}.
Include verification code ${verificationToken} in the footer."</pre>
        </li>
        <li><strong>Iterate:</strong> Ask Copilot to:
          <ul>
            <li>Add input validation</li>
            <li>Improve styling with modern CSS</li>
            <li>Add example values</li>
            <li>Fix any bugs</li>
          </ul>
        </li>
        <li><strong>Test:</strong> Open the HTML file in a browser, test the calculations</li>
        <li><strong>Extract log:</strong> 
          <ul>
            <li>Press <code>Ctrl+Shift+P</code></li>
            <li>Search: "Output: Show Output Channels..."</li>
            <li>Select: "GitHub Copilot Chat"</li>
            <li>Copy the entire log showing your conversation</li>
          </ul>
        </li>
      </ol>

      <h3>Example Copilot Prompts</h3>
      <pre>Initial: "Create a ${selectedCalc.name} web app"
Refinement: "Add better styling with gradients"
Validation: "Add input validation to prevent negative numbers"
Testing: "Add example values that users can click to populate fields"</pre>

      <h3>What the Log Should Show</h3>
      <p>Your Copilot chat log must demonstrate:</p>
      <ul>
        <li>Initial request for the ${selectedCalc.name}</li>
        <li>Copilot generating HTML/CSS/JavaScript code</li>
        <li>Your follow-up requests for improvements</li>
        <li>Verification token ${verificationToken} included in code</li>
        <li>At least 3-4 conversational turns</li>
      </ul>

      <h3>Example Log Format</h3>
      <pre>[User]: Create a confusion matrix calculator
[Copilot]: Here's a complete HTML file...
&lt;html&gt;...&lt;/html&gt;
[User]: Add better styling
[Copilot]: Updated with CSS gradients...
...</pre>

      <label for="${id}" class="form-label">
        Paste your complete GitHub Copilot Chat log (from Output Channels)
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="15" required 
        placeholder="[User]: Create a ${selectedCalc.name}...
[Copilot]: Here's the code...
..."></textarea>
      <p class="text-muted">
        Validation checks: (1) Contains Copilot conversation, (2) Shows code generation for ${selectedCalc.name}, 
        (3) Includes verification token ${verificationToken}, (4) Minimum 500 characters showing iterative development
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
SOLUTION APPROACH:

1. INSTALL COPILOT:
   - VS Code → Extensions → Search "GitHub Copilot Chat"
   - Sign in with GitHub account (free tier available)

2. OPEN COPILOT CHAT:
   - Press Ctrl+Shift+I
   - Chat panel opens on right side

3. INITIAL PROMPT:
   "Create a ${selectedCalc.name} as a single HTML file.
   ${selectedCalc.feature}.
   Add verification code ${verificationToken} in footer."

4. COPILOT GENERATES:
   - Complete HTML with form inputs
   - JavaScript calculation logic
   - Basic CSS styling

5. ITERATE WITH FOLLOW-UP PROMPTS:
   "Add input validation"
   "Make it look more professional with CSS"
   "Add example values users can click"
   "Fix the precision to 3 decimal places"

6. EXTRACT LOG:
   - Ctrl+Shift+P → "Output: Show Output Channels"
   - Select "GitHub Copilot Chat"
   - Copy entire conversation
   - Paste in answer field

7. VALIDATION:
   System checks log contains:
   - Evidence of Copilot conversation
   - Code generation for calculator
   - Verification token
   - Multiple conversational turns

Key Learning: AI assistants like Copilot enable rapid prototyping
through natural language, dramatically accelerating development workflows.
*/
