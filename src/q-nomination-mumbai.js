export default function ({ weight = 0.75 }) {
  return {
    id: "nominatim_mumbai_bbox",
    title: "Mumbai Bounding Box",
    description: `
Use Nominatim OpenStreetMap API.
Find the maximum longitude of Mumbai's bounding box.
`,
    answer:  // decimal longitude
    weight,
  };
}
