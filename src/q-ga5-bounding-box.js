export default async function ({ user, weight = 1 }) {
  return {
    id: "ga5_bounding_box_min_lat",
    weight,
    question: `
UrbanScope needs geospatial boundaries.

Using Nominatim API:
https://nominatim.openstreetmap.org/search

Task:
1. Search for city: "Berlin", country: "Germany"
2. Extract the boundingbox field
3. Enter the MINIMUM latitude value

Round to 4 decimal places.
    `,
    input: "number",
    answer: 52.3383,
  };
}
