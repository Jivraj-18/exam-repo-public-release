import { html } from "htm/preact";

export default function ({ user, weight = 1 }) {
  const id = "q-rag-system";
  
  return {
    id,
    weight,
    question: html`
      <div>
        <h3>Question 4: RAG System with LLM and Embeddings</h3>
        <p><strong>Module:</strong> LLMs (RAG, embeddings, prompt engineering)</p>
        
        <p><strong>Problem Statement:</strong></p>
        <p>Build a Retrieval-Augmented Generation (RAG) system that indexes PDF documents, 
        creates embeddings, and answers questions based on the document content using an LLM.</p>
        
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>Use <code>langchain</code> or <code>llama-index</code> for RAG pipeline</li>
          <li>Extract text from PDF using <code>pypdf</code> or <code>pdfplumber</code></li>
          <li>Split text into chunks (max 500 tokens per chunk with 50 token overlap)</li>
          <li>Create embeddings using sentence-transformers (all-MiniLM-L6-v2)</li>
          <li>Store embeddings in a vector database (ChromaDB or FAISS)</li>
          <li>Implement semantic search to retrieve top-k relevant chunks (k=3)</li>
          <li>Use OpenAI API, Anthropic API, or Ollama for generation</li>
          <li>Return answer with source citations (page numbers and chunk IDs)</li>
          <li>Handle queries with context limit of 4000 tokens</li>
          <li>Include confidence score for each retrieved chunk</li>
        </ul>
        
        <p><strong>Function Signatures:</strong></p>
        <pre><code>def create_rag_system(pdf_path: str, llm_provider: str = "openai") -> dict:
    """
    Creates a RAG system from a PDF document
    
    Args:
        pdf_path: Path to PDF file
        llm_provider: 'openai', 'anthropic', or 'ollama'
    
    Returns:
        dict with vector_store and llm objects
    """
    pass

def query_rag(question: str, rag_system: dict, top_k: int = 3) -> dict:
    """
    Query the RAG system
    
    Args:
        question: User's question
        rag_system: System created by create_rag_system()
        top_k: Number of chunks to retrieve
    
    Returns:
        dict with keys: 'answer', 'sources', 'confidence_scores'
    """
    pass</code></pre>
        
        <p><strong>Expected Output Format:</strong></p>
        <pre><code>{
    "answer": "The document states that...",
    "sources": [
        {"page": 3, "chunk_id": "chunk_12", "text_preview": "..."},
        {"page": 5, "chunk_id": "chunk_23", "text_preview": "..."}
    ],
    "confidence_scores": [0.89, 0.76, 0.65]
}</code></pre>
        
        <p><strong>Your Answer:</strong></p>
        <textarea 
          id="${id}-answer" 
          rows="25" 
          style="width: 100%; font-family: monospace; font-size: 12px;"
          placeholder="Paste your complete Python solution here..."
        ></textarea>
      </div>
    `,
    answer: () => document.getElementById(`${id}-answer`).value,
  };
}