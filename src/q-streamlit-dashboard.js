import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-streamlit";
  const title = "Interactive Streamlit Dashboard";

  const answer = async (value) => {
    const url = value.trim();
    if (!url.includes("raw.githubusercontent.com")) {
      throw new Error("Please provide the Raw GitHub URL (starts with raw.githubusercontent.com)");
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Could not fetch file contents.");
    const code = await res.text();

    // Verify Streamlit widgets and specific logic
    if (!code.includes('st.title("Data Tools Demo")')) throw new Error("Title must be 'Data Tools Demo'");
    if (!code.includes('st.slider')) throw new Error("Code must use st.slider");
    if (!/\*\s*10/.test(code)) throw new Error("Logic must multiply the input by 10");

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Interactive Streamlit Dashboard</h2>
      <p>
        Create a <strong>Streamlit</strong> app (<code>app.py</code>) and push it to GitHub.
        <br>1. Set the title to <code>"Data Tools Demo"</code>.
        <br>2. Add a slider widget (0-100).
        <br>3. Display a text output that multiplies the slider value by <strong>10</strong>.
      </p>
      <label for="${id}" class="form-label">Raw GitHub URL of app.py:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="https://raw.githubusercontent.com/..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}