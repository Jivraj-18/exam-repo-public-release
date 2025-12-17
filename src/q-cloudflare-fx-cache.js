import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.75 }) {
  const id = "q-cloudflare-fx-cache";
  const title = "FX Conversion from Cached Rates";

  const rng = seedrandom(`${user.email}#${id}`);
  const currencies = ["USD", "EUR", "INR", "JPY", "GBP", "AUD", "CAD"];
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const from = pick(currencies);
  let to = pick(currencies.filter((c) => c !== from));
  if (to === from) to = "EUR";
  const amount = Number((10 + rng() * 990).toFixed(2));

  // Synthetic daily rates table normalized to USD base
  const rates = {
    USD: 1.0,
    EUR: 0.92 + rng() * 0.1,
    INR: 83 + rng() * 5,
    JPY: 150 + rng() * 10,
    GBP: 0.78 + rng() * 0.08,
    AUD: 1.45 + rng() * 0.1,
    CAD: 1.34 + rng() * 0.1,
  };

  // Convert via USD base: amount_in_to = amount * (USD/from) * (to/USD)
  const usdFrom = 1 / rates[from];
  const result = Number((amount * usdFrom * rates[to]).toFixed(2));

  const answer = (input) => {
    const x = Number(String(input).trim());
    if (Number.isNaN(x)) throw new Error("Enter a numeric amount");
    if (Math.abs(x - result) > 0.01) throw new Error("Incorrect conversion");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Assume a Cloudflare Worker caches daily FX rates in KV using <strong>USD</strong> as the base.
        Using the cached rates below, convert <strong>${amount} ${from}</strong> to <strong>${to}</strong>.
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(rates, null, 2)}</code></pre>
      <label for="${id}" class="form-label">Converted amount in ${to} (2 decimals):</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
