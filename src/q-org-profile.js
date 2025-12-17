import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

async function fetchText(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Failed to fetch: ${url}`);
  return await r.text();
}

function countMatches(text, re) {
  const m = text.match(re);
  return m ? m.length : 0;
}

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-org-profile";
  const title = "Org-mode Profile (email, links, images, code)";

  const question = html`
    <div class="mb-3">
      <h4>Org-mode Profile File</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>Create an <code>.org</code> (org-mode) file in a GitHub repository and submit the <strong>raw</strong> URL.</p>
      <p>Your <code>.org</code> file must contain:</p>
      <ol>
        <li>Your email exactly: <code>${email}</code></li>
        <li>At least one org link: <code>[[https://...][...]]</code> or a bare URL</li>
        <li>At least two image links (URLs ending with png/jpg/jpeg/webp/gif)</li>
        <li>At least one code block: <code>#+begin_src ...</code> ... <code>#+end_src</code></li>
        <li>The exact line: <code>Roll Number: ${rollNumber}</code></li>
      </ol>
      <label class="form-label" for="${id}">Raw URL to your .org file</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (orgUrl) => {
    const url = String(orgUrl || "").trim();
    expect(url, "Raw URL is required");
    expect(url.includes(".org"), "URL must point to an .org file");

    const text = await fetchText(url);

    expect(text.includes(email), "Org file must contain your email exactly");
    expect(text.includes(`Roll Number: ${rollNumber}`), "Org file must contain the required Roll Number line");

    const linkCount =
      countMatches(text, /\[\[https?:\/\/[^\]]+\]\[[^\]]*\]\]/g) + countMatches(text, /https?:\/\/\S+/g);
    expect(linkCount >= 1, "Org file must contain at least one link");

    const imgCount = countMatches(text, /https?:\/\/\S+\.(png|jpe?g|webp|gif)\b/gi);
    expect(imgCount >= 2, "Org file must contain at least two image links");

    expect(
      /#\+begin_src\b[\s\S]*?#\+end_src\b/i.test(text),
      "Org file must contain at least one #+begin_src ... #+end_src code block",
    );

    return true;
  };

  return { id, title, weight, question, answer };
}
