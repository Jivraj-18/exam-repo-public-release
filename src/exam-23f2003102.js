import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-deployment-architecture.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
      help: [
        html`<p>Think about edge, API, and worker tiers.</p>`,
        html`<p>Use Markdown + Mermaid for architecture diagrams.</p>`,
      ],
    },

    {
      ...(await import("./q-image-compression.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
      help: [
        html`<p>Lossless compression means identical pixels.</p>`,
        html`<p>Formats like PNG and WebP (lossless) are useful.</p>`,
      ],
    },

    {
      ...(await import("./q-github-pages.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
      help: [
        html`<p>GitHub Pages URLs follow github.io conventions.</p>`,
        html`<p>Remember Cloudflare email obfuscation rules.</p>`,
      ],
    },

    {
      ...(await import("./q-fastapi-endpoint.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
      help: [
        html`<p>FastAPI endpoints should follow REST principles.</p>`,
        html`<p>Enable CORS properly for browser access.</p>`,
      ],
    },

    {
      ...(await import("./q-github-action.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
      help: [
        html`<p>Workflow YAML must be in .github/workflows/</p>`,
        html`<p>Use clear step names for grading visibility.</p>`,
      ],
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
