import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-markdown-architecture";
  const title = "Markdown: System Architecture Documentation";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  const companyName = faker.company.name().replace(/[^a-zA-Z\s]/g, "").trim();
  const systemName = faker.word.noun().charAt(0).toUpperCase() + faker.word.noun().slice(1);
  const verificationToken = Math.random().toString(36).substring(2, 15);

  const answer = async (response) => {
    try {
      const url = new URL(response);
      if (!url.hostname.includes("raw.githubusercontent.com")) {
        throw new Error("URL must be from raw.githubusercontent.com");
      }

      const mdResponse = await fetch(response);
      if (!mdResponse.ok) throw new Error("Could not fetch ARCHITECTURE.md");
      
      const mdText = await mdResponse.text();
      
      // Check required elements
      const checks = [
        { test: mdText.includes(user.email), error: "Must contain your email" },
        { test: mdText.includes("# ") || mdText.includes("## "), error: "Must have H1 or H2 heading" },
        { test: mdText.includes("```") },
        { test: mdText.includes("- [ ]") || mdText.includes("- [x]"), error: "Must include GFM task list" },
        { test: mdText.includes("|") && mdText.includes("---"), error: "Must include Markdown table" },
        { test: mdText.includes("> [!NOTE]") || mdText.includes("> [!IMPORTANT]"), error: "Must include callout (> [!NOTE] or > [!IMPORTANT])" },
        { test: mdText.includes("[^"), error: "Must include footnote reference [^...]" },
        { test: mdText.includes(verificationToken), error: `Must include verification token: ${verificationToken}` },
      ];

      for (const check of checks) {
        if (!check.test) throw new Error(check.error);
      }

      return true;
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>Technical Documentation: System Architecture</h2>
      <p>
        <strong>${companyName}</strong> is building a new ${systemName} system. The engineering team needs comprehensive 
        architecture documentation for onboarding, compliance audits, and stakeholder communication. Poor documentation 
        has caused 3 major incidents in the past quarter due to misunderstanding system boundaries.
      </p>

      <h3>Business Impact</h3>
      <p>
        Clear architecture docs reduce onboarding time by 60%, prevent deployment mistakes, and satisfy SOC2 compliance 
        requirements. This documentation will be reviewed by engineers, auditors, and executive leadership.
      </p>

      <h3>Your Task</h3>
      <p>Create <code>ARCHITECTURE.md</code> documenting the ${systemName} system with verification token <code>${verificationToken}</code>.</p>

      <h3>Requirements</h3>
      <ol>
        <li><strong>H1 heading:</strong> "# ${systemName} System Architecture"</li>
        <li><strong>Mermaid diagram:</strong> Show system components (use \`\`\`mermaid)</li>
        <li><strong>GFM task list:</strong> At least one checked [x] and one unchecked [ ] deployment task</li>
        <li><strong>Table:</strong> Component comparison (name, responsibility, scaling strategy)</li>
        <li><strong>Callout:</strong> > [!NOTE] or > [!IMPORTANT] with security/compliance note</li>
        <li><strong>Footnote:</strong> Reference like [^compliance] with definition at bottom</li>
        <li><strong>Verification token:</strong> Include <code>${verificationToken}</code> in text</li>
        <li><strong>Email:</strong> Include ${user.email}</li>
        <li><strong>Styling:</strong> Use bold, italic, inline code throughout</li>
      </ol>

      <h3>Example Mermaid diagram:</h3>
      <pre>\`\`\`mermaid
graph LR
    A[Client] --> B[API Gateway]
    B --> C[Service]
    C --> D[Database]
\`\`\`</pre>

      <label for="${id}" class="form-label">Raw GitHub URL to ARCHITECTURE.md</label>
      <input class="form-control" id="${id}" name="${id}" required 
        placeholder="https://raw.githubusercontent.com/[user]/[repo]/main/ARCHITECTURE.md" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
