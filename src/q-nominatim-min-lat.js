export default function ({ user, weight = 1 }) {
  return {
    id: "nominatim_min_lat",
    title: "Nominatim Bounding Box",
    weight,
    description: `
Using the Nominatim OpenStreetMap API, find the **minimum latitude**
of the bounding box for the city **Berlin, Germany**.

Return only the numeric value.
    `,
    inputType: "text",
    expectedAnswerType: "number",
    checker: async (answer) => !isNaN(parseFloat(answer)),
  };
}
