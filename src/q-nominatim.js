export default function ({ user, weight }) {
    return {
      id: "q-nominatim",
      prompt: `
  Nominatim API
  
  Use the Nominatim API to fetch data for:
  
  City: "Valencia"  
  Country: "Spain"
  
  Find the **minimum latitude** from the boundingbox field.
  
  API Example:
  https://nominatim.openstreetmap.org/search?city=Valencia&country=Spain&format=json
  
  Enter the minimum latitude ONLY.
  `,
      weight,
      check: (answer) => answer.trim() === "39.4079931",
    };
  }
  