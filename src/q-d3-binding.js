export default async function question({ user, weight = 1 }) {
  return {
    id: "q-d3-binding",
    title: "D3 Data Binding",
    weight,
    answer: null,
  };
}