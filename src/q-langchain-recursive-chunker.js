import { html } from "./utils/html.js";

export default function ({ user, weight = 1 }) {
  return {
    id: "langchain_recursive_chunking",
    title: "GA3: AI Coding – LangChain Recursive Text Chunking",
    weight,

    question: html`
      <p>
        In AI-powered applications such as Retrieval-Augmented Generation (RAG),
        large documents must be split into smaller chunks before embeddings
        are created.
      </p>

      <p>
        LangChain provides a
        <strong>RecursiveCharacterTextSplitter</strong>
        that splits text while preserving natural boundaries like sentences
        and paragraphs.
      </p>

      <p>
        Using LangChain in Python, split the following text with:
      </p>

      <ul>
        <li><code>chunk_size = 50</code></li>
        <li><code>chunk_overlap = 10</code></li>
      </ul>

      <pre>
LangChain makes it easy to build applications powered by language models.
It provides tools for prompt management, chaining, memory, and retrieval.
Recursive chunking helps preserve context while splitting long documents.
      </pre>

      <p>
        <strong>Task:</strong><br />
        Write Python code using LangChain to perform recursive chunking
        and submit <strong>only the total number of chunks produced</strong>.
      </p>

      <p class="text-muted">
        Submit a single integer as your answer.
      </p>
    `,

    answer: {
      type: "number",
      validate: (value) => Number(value) >= 2 && Number(value) <= 6,
    },
  };
}
