import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-langchain-playwright-tool";
  const title = "LangChain Tool: Playwright Page Summarizer";

  const question = html`
    <div class="mb-3">
      <h2>Build a LangChain Tool Using Playwright</h2>
      <p>
        Write a LangChain tool that lets an AI agent use
        <strong>Playwright</strong> to load a web page, extract and clean its
        text content, and then send that content to the agent for summarisation.
      </p>

      <h3>Requirements</h3>
      <ul>
        <li>
          Use <code>playwright</code> (<code>chromium</code>,
          <code>page.goto()</code>, <code>page.content()</code> or
          <code>innerText</code>)
        </li>
        <li>
          Define a LangChain <code>Tool</code> (e.g., <code>DynamicTool</code>)
          that accepts a URL
        </li>
        <li>
          Clean extracted content (strip scripts/markup, normalise whitespace)
        </li>
        <li>Pass the cleaned text to the agent/LLM for summarisation</li>
        <li>Provide the tool to the agent so it can be invoked</li>
      </ul>

      <h3>Paste Your Script</h3>
      <p>
        Paste the Python script that registers the Playwright tool with
        LangChain:
      </p>
      <textarea
        class="form-control font-monospace"
        id="${id}"
        name="${id}"
        rows="15"
        placeholder="e.g.:
from playwright.sync_api import sync_playwright
from langchain.tools import Tool..."
        required
      ></textarea>
    </div>
  `;

  const answer = (input) => {
    const code = input.trim();

    // Basic checks for Python imports
    if (!/from\s+playwright/.test(code) && !/import\s+playwright/.test(code)) {
      throw new Error(
        "Must import Playwright (e.g., from playwright.sync_api import sync_playwright)"
      );
    }
    if (!/chromium/.test(code)) {
      throw new Error("Must use Playwright's chromium browser");
    }
    if (!/from\s+langchain/.test(code) && !/import\s+langchain/.test(code)) {
      throw new Error(
        "Must import LangChain modules (e.g., from langchain.tools import Tool)"
      );
    }

    // Check tool definition
    const hasTool =
      /Tool\s*\(/.test(code) ||
      /initialize_agent|create_.*_agent|AgentExecutor/.test(code);
    if (!hasTool) {
      throw new Error(
        "Define a LangChain Tool (e.g., Tool(...)) and provide it to an agent"
      );
    }

    // Check Playwright usage
    const usesPlaywright = /chromium\.launch\(|new_page\(|page\.goto\(/.test(
      code
    );
    if (!usesPlaywright) {
      throw new Error(
        "Use Playwright to launch a browser, create a page, and goto the URL"
      );
    }

    // Check content extraction and cleaning
    const extractsContent = /page\.content\(|inner_text\(|text_content\(/.test(
      code
    );
    const cleansContent =
      /\.replace\(/.test(code) ||
      /\bstrip\b|sanitize|clean|BeautifulSoup|re\.sub/i.test(code);
    if (!extractsContent) {
      throw new Error(
        "Extract page content (page.content() or page.inner_text())"
      );
    }
    if (!cleansContent) {
      throw new Error(
        "Clean the extracted content (strip tags/extra whitespace using replace, strip, or BeautifulSoup)"
      );
    }

    // Check summarisation call
    const callsLLM =
      /ChatOpenAI|OpenAI|llm\.invoke|agent\.run|\.predict/.test(code) &&
      /summar/i.test(code);
    if (!callsLLM) {
      throw new Error(
        "Send cleaned content to the LLM/agent for summarisation (llm.invoke, agent.run, or .predict)"
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
