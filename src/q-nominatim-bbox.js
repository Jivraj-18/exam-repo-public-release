export default function ({ user, weight }) {
  return {
    id: "nominatim-bbox",
    weight,
    question: `
Using the Nominatim OpenStreetMap API, find the bounding box for the city
**Chennai, India**.

What is the **minimum latitude** value?
    `,
    answer: "12.823",
  };
}
