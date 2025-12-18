export default async function question({ user, weight = 1 }) {
  return {
    id: "q-langchain-rag",
    title: "LangChain RAG Pipeline",
    weight,
    answer: "",
  };
}