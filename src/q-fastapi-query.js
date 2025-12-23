export default async function question({ user, weight = 1 }) {
  return {
    id: "fastapi_query_params",
    weight,
    question: "What is the correct way to define an optional query parameter 'q' in FastAPI?",
    options: [
      "q: str = None",
      "q: Optional[str] = None",
      "q: str | None = None",
      "All of the above"
    ],
    answer: "All of the above"
  };
}
