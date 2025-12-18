export default async function question({ user, weight = 1 }) {
  return {
    id: "q-point-in-polygon",
    title: "Point-in-Polygon Test",
    weight,
    answer: "",
  };
}