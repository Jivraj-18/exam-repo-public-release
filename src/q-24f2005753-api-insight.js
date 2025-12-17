export default async function () {
  return {
    id: "24f2005753-api-insight",
    title: "Analyze API Data for Insights",
    difficulty: 2,
    tags: ["api", "json", "analysis"],

    description: `
A REST API provides daily weather data for multiple cities.

Tasks:
1. Identify the city with the highest average temperature
2. Count days with rainfall greater than a threshold
    `,

    input: { type: "json" },

    questions: [
      {
        id: "hot-city",
        text: "Which city has the highest average temperature?",
        type: "text",
      },
      {
        id: "rainy-days",
        text: "How many days had rainfall above the threshold?",
        type: "number",
      },
    ],
  };
}
