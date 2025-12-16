import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-dedup-hashing";
  const title = "Deterministic Hashing for Data Deduplication";

  const question = html`
    <div class="mb-3">
      <h4>Data Preprocessing for Machine Learning</h4>

      <p>
        Before training machine learning models, it is common to deduplicate text data such as
        customer reviews, feedback messages, or log entries. However, textual data may contain
        minor variations like differences in casing, extra whitespace, or formatting.
      </p>

      <p>
        <strong>Business Context:</strong> A data science team is cleaning customer reviews collected
        from multiple platforms. Reviews such as <em>"Great Service"</em>, <em>" great service "</em>,
        and <em>"GREAT SERVICE"</em> should be treated as duplicates.
      </p>

      <p>
        <strong>Question:</strong> Name a hashing strategy that ensures logically equivalent strings
        produce the same hash value after normalization.
      </p>

      <input class="form-control" id="${id}" name="${id}" type="text" />
    </div>
  `;

  const answer = async (response) => {
    const text = String(response || "").toLowerCase();
    if (!text.includes("hash")) {
      throw new Error("Answer should mention a hashing-based approach");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
