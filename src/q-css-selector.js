import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-css-selector-construction";
  const title = "CSS Selector Construction";

  /**
   * IMPORTANT:
   * The answer is a CSS selector STRING.
   * It must match ALL and ONLY the required elements.
   */

  const answer =
    'ul.menu[data-role="primary"] > li.item.active:not([data-disabled]) > a[href^="/"]';

  const question = html`
    <div class="mb-3">
      <p>
        You are given the following HTML snippet from a production web page.
        Your task is to <strong>construct a CSS selector</strong> that selects
        <em>exactly</em> the required elements.
      </p>

      <h6>HTML</h6>
      <pre><code class="language-html">
<div id="app">
  <ul class="menu" data-role="primary">
    <li class="item active">
      <a href="/home">Home</a>
    </li>
    <li class="item active" data-disabled>
      <a href="/products">Products</a>
    </li>
    <li class="item">
      <a href="/services">Services</a>
    </li>
  </ul>

  <ul class="menu" data-role="secondary">
    <li class="item active">
      <a href="/login">Login</a>
    </li>
    <li class="item active">
      <a href="https://external.example.com/help">Help</a>
    </li>
  </ul>

  <div class="menu">
    <a href="/privacy" class="item active">Privacy</a>
  </div>
</div>
      </code></pre>

      <h6>Target Elements</h6>
      <p>
        Write a CSS selector that selects <strong>only</strong> the
        <code>&lt;a&gt;</code> elements that satisfy <em>all</em> of the following:
      </p>

      <ul>
        <li>They are inside a <code>ul</code> with class <code>menu</code></li>
        <li>The <code>ul</code> has <code>data-role="primary"</code></li>
        <li>The <code>&lt;li&gt;</code> parent has both <code>item</code> and <code>active</code> classes</li>
        <li>The <code>&lt;li&gt;</code> is <strong>not</strong> marked as disabled</li>
        <li>The <code>&lt;a&gt;</code> link points to a <strong>relative URL</strong> (starts with <code>/</code>)</li>
        <li>No elements outside this menu should be matched</li>
      </ul>

      <p class="text-muted">
        Your selector must be:
        <ul>
          <li>A <strong>single valid CSS selector</strong></li>
          <li>Precise (no extra matches)</li>
          <li>Robust (no reliance on element order or text content)</li>
        </ul>
      </p>

      <label for="${id}" class="form-label">
        Enter the CSS selector
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder='e.g. ul.menu > li.active > a'
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
