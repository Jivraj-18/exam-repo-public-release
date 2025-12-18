export default async function ({ user, weight = 0.75 }) {
  return {
    id: "excel-geospatial-coverage-gap",
    title: "Excel Geospatial Coverage Gap Analysis",
    weight,

    help: [
      `
MetroBeans is planning the next phase of café expansion and wants to identify
neighborhoods with the largest service gaps using **Excel-based geospatial analysis**.

You are provided with a CSV containing the following columns:
• Neighborhood — target trade area
• Latitude — centroid latitude for mapping
• Longitude — centroid longitude for mapping
• Population — estimated residents within walking radius
• Competitor_Stores — active competitor outlets
• Our_Stores — current MetroBeans outlets

Steps to perform in Excel:

1. Import the CSV into Excel.
2. Add a calculated column:
   Population_per_OurStore = Population / Our_Stores
3. (Optional) Add Coverage_Ratio = Our_Stores / (Our_Stores + Competitor_Stores)
   to help with context during visualization.
4. Sort neighborhoods in descending order of Population_per_OurStore.
5. Use Excel Map Charts or 3D Maps to visually confirm the coverage gap hotspot.

Return ONLY the name of the neighborhood with the highest
Population_per_OurStore value.
      `,
    ],

    question: `
Which neighborhood has the highest Population_per_OurStore value?
    `,

    type: "text",

    expectedOutput: {
      type: "string",
      description: "Neighborhood with the highest population-per-store gap",
    },

    grading: {
      type: "exact",
      caseSensitive: false,
      trim: true,
    },
  };
}
