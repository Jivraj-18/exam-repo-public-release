import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  const query = user.email.split("@")[0];

  return {
    id: "q-22f3003115-embeddings-search",
    weight,
    answer: async (link) => {
      link = link.trim();
      if (!link.startsWith("https://gist.github.com/")) {
        throw new Error("Please provide a valid GitHub Gist URL");
      }
      return true;
    },
    question: html`
      <h2>Semantic Search with Embeddings</h2>
      <p>
        Build a semantic search system over TDS course content using embedding
        models.
      </p>

      <h3>Task</h3>
      <p>
        Create a search tool that finds relevant TDS topics using embeddings:
      </p>

      <ol>
        <li>
          Scrape or download content from
          <a href="https://tds.s-anand.net" target="_blank">TDS README</a>
        </li>
        <li>Split the content into chunks (each section/topic)</li>
        <li>
          Generate embeddings using:
          <ul>
            <li>
              <strong>Sentence Transformers</strong> (Python:
              <code>all-MiniLM-L6-v2</code>), OR
            </li>
            <li><strong>OpenAI/Groq Embeddings API</strong></li>
          </ul>
        </li>
        <li>Store embeddings with metadata (section title, content snippet)</li>
        <li>
          Implement cosine similarity search for query: <code>"${query}"</code>
        </li>
        <li>Return top 3 most relevant sections with similarity scores</li>
      </ol>

      <h3>Deliverable</h3>
      <p>Create a <strong>GitHub Gist</strong> with:</p>
      <ul>
        <li>Code for embedding generation and search</li>
        <li>Sample output showing top 3 results for the query above</li>
        <li>Instructions on how to run (dependencies, API keys if needed)</li>
      </ul>

      <input
        type="url"
        id="answer-q-22f3003115-embeddings-search"
        placeholder="https://gist.github.com/..."
        style="width: 100%; padding: 8px;"
      />
    `,
  };
}
