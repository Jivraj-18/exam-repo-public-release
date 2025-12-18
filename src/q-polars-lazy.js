export default async function question({ user, weight = 1 }) {
  return {
    id: "q-polars-lazy",
    title: "Polars LazyFrame Pipeline",
    weight,
    answer: null,
  };
}