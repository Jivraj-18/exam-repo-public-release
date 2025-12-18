import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-token-count-mini";
  const title = "GPT-4o-mini Token Count";

  const answer = "148";

  const question = html`
    <div class="mb-3">
      <p>
        PromptCost Labs is auditing prompt sizes for a chatbot that only uses
        <code>gpt-4o-mini</code>. For one experiment, they send a single
        <strong>user</strong> message with the following content:
      </p>
      <pre><code>Classify only the valid English words from this list:
darJmbPk5F, yBu9B, lmgvEOd, 0fY5cQQ, M4ieqZ4,
vAFs7VcZ, hAQW3, QjXTlb, dIotU2AL7, D6kW62k9L, UBFzb,
ZNxzNpxI, 6B, l, eLjBwms, MwxsGNo84w, MgHFp4c3,
0LTgauYj, pX, 7gz, UFIQ, 4fbhkbZgG, kh, D42FZAggP2,
Y7Tkzo, kfGk, VGWOcc, YAT, fOT, tCclwrtKF4, Dkf99,
9Zf, a0ImO, cgH2wQoGn, 3gC3tBR, 7VFzQ, b, yR, Dk,
jrCT, iChlv, D, 12DBDZEv, x0GO1Vf, Ji8DoE, rjtu,
NEWY1fBMM, TGF, JS8ZcCRmsP, mzX, jM, 0m, sDKVFQ,
m9JE0L7c, 6Q0y, 8lvzie3yT, Pv, cihTEQHs, F7NUqGGfpO,
ImH, Z5U, 6Rams, PBH, gS, 3pWjyxg, CC, o7EY, v9S6oFz,
nNhtXDNk</code></pre>
      <p>
        Using the official OpenAI API, they send this as a single user message in
        <code>messages</code> and query <code>gpt-4o-mini</code>. You must actually
        call the API (or tokenizer) to determine the exact number of input tokens,
        including the overhead for the chat message format.
      </p>
      <p>
        What is the exact number of input tokens consumed by this request?
        Enter only the number below.
      </p>
      <label for="${id}" class="form-label">Number of tokens:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
