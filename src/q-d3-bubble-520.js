import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const DATA = [
  { name: "A", value: 80 },
  { name: "B", value: 120 },
  { name: "C", value: 60 },
  { name: "D", value: 140 },
  { name: "E", value: 200 },
];

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

async function fetchText(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Failed to fetch: ${url}`);
  return await r.text();
}

async function fetchBytes(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Failed to fetch: ${url}`);
  return new Uint8Array(await r.arrayBuffer());
}

function isPng(bytes) {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  return sig.every((v, i) => bytes[i] === v);
}

async function pngSize(url) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.decoding = "async";
  await new Promise((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load PNG: ${url}`));
    img.src = url;
  });
  return { width: img.naturalWidth, height: img.naturalHeight };
}

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-d3-bubble-520";
  const title = "D3 Bubble Chart Export (520×520 PNG)";

  const question = html`
    <div class="mb-3">
      <h4>D3 Bubble Chart (Exported PNG)</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>Create a D3.js bubble chart using this exact dataset:</p>
      <pre>${JSON.stringify(DATA, null, 2)}</pre>
      <ol>
        <li>Host an <code>index.html</code> (raw URL) that uses D3 (v7 is OK) to render the bubble chart.</li>
        <li>The chart must display visible text: <code>ROLL: ${rollNumber}</code></li>
        <li>Export the chart to a PNG of exactly <code>520×520</code> and host it (raw URL).</li>
      </ol>
      <p class="text-muted">
        Submit two URLs separated by whitespace/newline: <code>&lt;html_url&gt; &lt;png_url&gt;</code>
      </p>
      <label class="form-label" for="${id}">Your answer</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="3"></textarea>
    </div>
  `;

  const answer = async (output) => {
    const text = String(output || "").trim();
    expect(text, "Answer is required: provide '<html_url> <png_url>'");
    const [htmlUrl, pngUrl] = text.split(/\s+/);
    expect(htmlUrl && pngUrl, "Provide two URLs: '<html_url> <png_url>'");

    const htmlText = await fetchText(htmlUrl);

    expect(/d3/i.test(htmlText), "index.html must reference D3.js");

    expect(
      htmlText.includes(`ROLL: ${rollNumber}`) || htmlText.includes(`ROLL:${rollNumber}`),
      `index.html must contain visible label 'ROLL: ${rollNumber}'`,
    );

    for (const row of DATA) {
      expect(
        htmlText.includes(`"${row.name}"`) && htmlText.includes(String(row.value)),
        "index.html must contain the provided dataset values",
      );
    }

    const bytes = await fetchBytes(pngUrl);
    expect(isPng(bytes), "png_url must point to a PNG file");

    const { width, height } = await pngSize(pngUrl);
    expect(width === 520 && height === 520, "PNG must be exactly 520×520");

    return true;
  };

  return { id, title, weight, question, answer };
}
