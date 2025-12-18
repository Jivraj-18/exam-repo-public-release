export default async function ({ user, weight = 1 }) {
  return {
    id: "ga5_api_json_sum",
    weight,
    question: `
CityPulse Analytics tracks city population data via public APIs.

Use the REST Countries API:
https://restcountries.com/v3.1/region/asia

Count how many countries have population greater than 100 million.
Enter ONLY the number.
    `,
    input: "number",
    answer: 7,
  };
}
