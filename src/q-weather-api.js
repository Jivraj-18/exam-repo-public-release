export default function ({ user, weight }) {
    return {
      id: "q-weather-api",
      prompt: `
  BBC Weather API
  
  Use the BBC Locator Service to search for the city "Oslo".  
  The API is:
  
  https://weather-broker-cdn.api.bbci.co.uk/en/locator/search?search=Oslo
  
  Extract the **locationId** for the FIRST result.
  
  What is the locationId? (Enter only the number.)
  `,
      weight,
      check: (answer) => answer.trim() === "3143244",
    };
  }
  