import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-vector-db-vs-duckdb";
  const title = "Vector DB vs DuckDB VSS";

  const question = html`
    <div class="mb-3">
      <p>
        You are designing a semantic search system for a growing analytics product.
        Right now you have <strong>200,000</strong> short documents (~1KB each).
        You generate 768‑dimensional embeddings using
        <code>BAAI/bge-base-en-v1.5</code> and store them alongside the raw
        text in a single DuckDB table, with:
      </p>
      <ul>
        <li>a <code>vector FLOAT[768]</code> column</li>
        <li>a <code>CREATE INDEX ... USING HNSW(vector)</code> index via the
        DuckDB <code>vss</code> extension</li>
      </ul>

      <p>
        In production, typical queries:
      </p>
      <ul>
        <li>Run in &lt; 50ms using the HNSW index</li>
        <li>Use complex filters on <code>user_id</code>, <code>timestamp</code>,
        and <code>document_type</code> before doing vector search</li>
        <li>Run on a single machine with &lt; 32GB RAM</li>
      </ul>

      <p>
        A teammate proposes migrating all embeddings and documents into a
        dedicated <strong>standalone vector database</strong> (like Chroma or Qdrant)
        “because that’s how everyone does RAG now”. The migration would:
      </p>
      <ul>
        <li>Split metadata (users/timestamps) and embeddings into two systems</li>
        <li>Require application‑level joins between DuckDB and the vector DB</li>
        <li>Add network hops for every semantic query</li>
      </ul>

      <p>
        Based <em>strictly</em> on the course notes about vector databases and the
        examples with Chroma, LanceDB, and DuckDB, which of the following is the
        <strong>most appropriate design decision <u>right now</u></strong>?
        Pick a single option:
      </p>

      <ol type="A">
        <li>
          Migrate immediately to a standalone vector database, because any
          approximate nearest‑neighbor search <em>must</em> live in a specialized
          vector store.
        </li>
        <li>
          Keep DuckDB with the VSS extension as the primary store, and only
          consider a standalone vector DB if the data or query volume grows
          beyond what a single machine can handle comfortably.
        </li>
        <li>
          Remove all approximate search and do exact brute‑force cosine
          similarity in <code>numpy</code> only, because 200k vectors always
          fit in memory.
        </li>
        <li>
          Use both: write embeddings to DuckDB and a standalone vector DB on
          every insert, and always query both systems to cross‑check results.
        </li>
      </ol>

      <label for="${id}" class="form-label">Your choice (A, B, C, or D):</label>
      <input class="form-control" id="${id}" name="${id}" />
      <p class="text-muted">
        Hint: Re-read when the notes say you don’t need a vector DB, and how
        relational databases (DuckDB, SQLite, Postgres) now support vector
        search with extensions.
      </p>
    </div>
  `;

  const answer = (input) => {
    const normalized = String(input || "")
      .trim()
      .toUpperCase();

    if (!normalized) throw new Error("Answer cannot be empty.");

    if (!["A", "B", "C", "D"].includes(normalized)) {
      throw new Error("Please answer with a single letter: A, B, C, or D.");
    }

    // Correct: keep DuckDB + VSS now; add standalone vector DB only if scale requires it.
    const correct = "B";

    if (normalized !== correct) {
      throw new Error(
        "Think about scale: fits on one machine, fast queries, and vector search already supported inside DuckDB.",
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
