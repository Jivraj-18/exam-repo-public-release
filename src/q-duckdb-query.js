export default async function question({ user, weight = 1 }) {
  return {
    id: "q-duckdb-query",
    title: "DuckDB Window Function",
    weight,
    answer: "",
  };
}
