export default async function question({ user, weight = 1 }) {
  const id = "q-langchain-rag";

  return {
    id,
    title: "LangChain RAG Setup",
    weight,
    description: `
      <p><strong>Build a LangChain Retrieval-Augmented Generation (RAG) pipeline:</strong></p>
      <p>Create a Python script that:</p>
      <ol>
        <li>Loads documents from a folder using <code>DirectoryLoader</code></li>
        <li>Splits documents using <code>RecursiveCharacterTextSplitter(chunk_size=500)</code></li>
        <li>Creates embeddings using <code>OpenAIEmbeddings()</code></li>
        <li>Stores embeddings in a <code>FAISS</code> vector store</li>
        <li>Creates a <code>RetrievalQA</code> chain with the retriever</li>
        <li>Queries: "What are the key points?" and returns the answer</li>
      </ol>
      <p><em>Write the Python code to set up this pipeline.</em></p>
    `,
    inputType: "textarea",
    placeholder: `from langchain.document_loaders import DirectoryLoader\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter\nfrom langchain.embeddings import OpenAIEmbeddings\nfrom langchain.vectorstores import FAISS\nfrom langchain.chains import RetrievalQA\n# Your code here`,
    answer: async (code) => {
      if (!code || code.trim().length < 50) return false;
      const required = ["DirectoryLoader", "TextSplitter", "FAISS", "RetrievalQA"];
      return required.every((word) => code.includes(word));
    },
  };
}