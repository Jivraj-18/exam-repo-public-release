import { html } from "lit-html";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-js-drift";
  const title = "Pre/Post Distribution Drift (JS Distance)";

  const random = seedrandom(`${user.email}#${id}`);
  const pre = Array.from({ length: 120 }, () => random());
  const post = Array.from({ length: 180 }, () => Math.min(1, random() + 0.2));

  const bins = 10;
  const hist = arr =>
    Array.from({ length: bins }, (_, i) =>
      arr.filter(x => x >= i / bins && x < (i + 1) / bins).length / arr.length
    );

  const p = hist(pre);
  const q = hist(post);
  const m = p.map((x, i) => (x + q[i]) / 2);

  const kl = (a, b) =>
    a.reduce((s, x, i) => (x === 0 ? s : s + x * Math.log2(x / b[i])), 0);

  const js = Math.sqrt(0.5 * kl(p, m) + 0.5 * kl(q, m));

  const answer = async v => {
    const n = Number(v);
    if (!Number.isFinite(n)) throw new Error("Enter numeric JS distance.");
    if (Math.abs(n - js) > 0.01) throw new Error("Incorrect JS distance.");
    return true;
  };

  const question = html`
    <h2>Distribution Drift via Jensen–Shannon Distance</h2>
    <p>Compute the JS distance between pre and post distributions.</p>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
