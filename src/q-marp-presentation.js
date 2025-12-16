import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1.5 }) {
  const id = "q-marp-presentation";
  const title = "Marp: Advanced Layouts and Custom Styling";

  const random = seedrandom(`${user.email}#${id}`);
  
  const answer = (input) => {
    const markdown = input.trim();
    
    const required = [
      { term: "<style>", error: "Must include a <style> block for custom CSS" },
      { term: "class:", error: "Must use 'class:' directive to apply styles to slides" },
      { term: "scoped:", error: "Should demonstrate 'scoped:' style capability" },
      { term: "columns", error: "Must implement a multi-column layout (e.g., using CSS grid or flex)" },
      { term: "background-image:", error: "Must use a custom background image" },
    ];
    
    for (const { term, error } of required) {
      if (!markdown.includes(term)) {
        throw new Error(error);
      }
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Branded Corporate Presentation</h2>
      <p>
        <strong>DesignCo</strong> requires a presentation deck that strictly adheres to their brand guidelines. 
        Standard Marp themes are insufficient. You need to use <strong>advanced Marp features</strong> and <strong>CSS</strong> 
        to customize the look and feel.
      </p>
      
      <h3>Requirements</h3>
      <ol>
        <li><strong>Custom CSS:</strong> Define a global <code>&lt;style&gt;</code> block to set the font family to 'Helvetica' and primary color to <code>#0055AA</code>.</li>
        <li><strong>Scoped Styling:</strong> Create a specific style class for "Title Slides" that centers text and uses a dark background.</li>
        <li><strong>Multi-column Layout:</strong> Create a slide with a <strong>2-column layout</strong> (Text on left, Image on right) using CSS Grid or Flexbox within the Markdown.</li>
        <li><strong>Backgrounds:</strong> Use a custom background image for the final slide.</li>
      </ol>
      
      <h3>Task</h3>
      <p>
        Write the Marp Markdown file that implements these custom design requirements.
      </p>
      
      <label for="${id}" class="form-label">
        Enter your customized Marp Markdown:
      </label>
      <textarea 
        class="form-control font-monospace" 
        id="${id}" 
        name="${id}" 
        rows="18"
        placeholder="---&#x0a;marp: true&#x0a;theme: default&#x0a;---&#x0a;&#x0a;<style>&#x0a;..."
        required
        style="font-size: 0.9em;"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
