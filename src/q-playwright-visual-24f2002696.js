import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-playwright-visual-24f2002696";
  const title = "Playwright Visual Testing and Screenshots";
  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate random constraints
  const waitTimeout = 8 + Math.floor(random() * 5); // 8-12 seconds
  const screenshotWidth = 1200 + Math.floor(random() * 400); // 1200-1599
  
  const question = html`
    <div class="mb-3">
      <h4>E2E Visual Testing with Playwright</h4>
      <p>
        <strong>Scenario:</strong> VisualQA needs automated visual regression testing for product pages. 
        Screenshot consistency is critical for detecting layout issues.
      </p>
      <p>Create a Playwright Python script with the following requirements:</p>
      <ol>
        <li>Navigate to: <code>https://example.com</code> (use this for testing)</li>
        <li>Wait for element with selector <code>h1</code> to be visible (timeout: <strong>${waitTimeout} seconds</strong>)</li>
        <li>Take a full-page screenshot</li>
        <li>Save screenshot as: <code>page-test-{timestamp}.png</code> where timestamp is Unix epoch</li>
        <li>
          Script requirements:
          <ul>
            <li>Run in <strong>headless mode</strong></li>
            <li>Set viewport: <strong>${screenshotWidth}x800</strong> pixels</li>
            <li>Include your email <code>24f2002696@ds.study.iitm.ac.in</code> as a comment at the top</li>
            <li>Print "Screenshot saved: {filename}" after completion</li>
          </ul>
        </li>
        <li>Handle timeouts gracefully with try-except</li>
      </ol>
      <label for="${id}" class="form-label">Paste your Playwright Python script</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="12"
        placeholder="# 24f2002696@ds.study.iitm.ac.in
from playwright.sync_api import sync_playwright
..."></textarea>
      <p class="text-muted">
        We'll verify your script includes all required elements and proper error handling.
      </p>
    </div>
  `;

  const answer = async (script) => {
    if (!script) throw new Error("Python script is required");
    const code = script.trim();
    
    // Check for email in comment
    if (!code.includes("24f2002696@ds.study.iitm.ac.in")) {
      throw new Error("Script must include your email as a comment: # 24f2002696@ds.study.iitm.ac.in");
    }

    // Check for required imports
    const requiredImports = [
      { pattern: /from playwright.*import|import playwright/i, name: "playwright import" },
      { pattern: /import time|from time import/i, name: "time import for timestamp" },
    ];

    for (const { pattern, name } of requiredImports) {
      if (!pattern.test(code)) {
        throw new Error(`Script must include ${name}`);
      }
    }

    // Check for required Playwright methods
    const requiredMethods = [
      { pattern: /\.goto\s*\(/i, name: "page.goto() method" },
      { pattern: /\.wait_for_selector\s*\(|\.locator\s*\(.*\)\.wait_for\s*\(/i, name: "wait_for_selector or locator.wait_for method" },
      { pattern: /\.screenshot\s*\(/i, name: "screenshot() method" },
      { pattern: /headless\s*=\s*True/i, name: "headless=True configuration" },
    ];

    for (const { pattern, name } of requiredMethods) {
      if (!pattern.test(code)) {
        throw new Error(`Script must include ${name}`);
      }
    }

    // Check for viewport size
    const viewportPattern = new RegExp(`${screenshotWidth}.*800|width.*${screenshotWidth}.*height.*800`, 'i');
    if (!viewportPattern.test(code)) {
      throw new Error(`Script must set viewport to ${screenshotWidth}x800 pixels`);
    }

    // Check for timeout value
    if (!code.includes(waitTimeout.toString() + "000") && !code.includes(`timeout=${waitTimeout * 1000}`)) {
      throw new Error(`Script must use ${waitTimeout} second timeout (${waitTimeout * 1000}ms)`);
    }

    // Check for error handling
    if (!code.includes("try:") || !code.includes("except")) {
      throw new Error("Script must include try-except error handling");
    }

    // Check for h1 selector
    if (!/["']h1["']/.test(code)) {
      throw new Error("Script must wait for 'h1' selector");
    }

    // Check for filename with timestamp
    if (!code.includes("page-test-") || !code.includes(".png")) {
      throw new Error("Screenshot filename must follow pattern: page-test-{timestamp}.png");
    }

    // Check for print statement
    if (!code.includes('print') || !code.includes('Screenshot saved')) {
      throw new Error("Script must print 'Screenshot saved: {filename}' after completion");
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: visual_test.py

# 24f2002696@ds.study.iitm.ac.in
from playwright.sync_api import sync_playwright
import time

def run_visual_test():
    timestamp = int(time.time())
    filename = f"page-test-{timestamp}.png"
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                viewport={"width": 1200, "height": 800}
            )
            page = context.new_page()
            
            # Navigate to page
            page.goto("https://example.com")
            
            # Wait for element with timeout
            page.wait_for_selector("h1", timeout=10000)  # Adjust timeout as needed
            
            # Take full-page screenshot
            page.screenshot(path=filename, full_page=True)
            
            print(f"Screenshot saved: {filename}")
            
            browser.close()
    
    except Exception as e:
        print(f"Error during visual test: {e}")

if __name__ == "__main__":
    run_visual_test()
*/