export default async function ({ user, weight = 1 }) {
  const data = [
    { region: "North", spend: 120, revenue: 130 },
    { region: "North", spend: 150, revenue: 160 },
    { region: "South", spend: 100, revenue: 90 },
    { region: "South", spend: 130, revenue: 120 },
    { region: "East", spend: 80, revenue: 140 },
    { region: "East", spend: 110, revenue: 190 },
    { region: "West", spend: 200, revenue: 210 },
    { region: "West", spend: 240, revenue: 230 },
  ];

  const answer = "East";

  return {
    id: "excel_correlation_region",
    weight,
    question: `
You are given marketing campaign data across four regions.

**Task**
1. In Excel, compute the Pearson correlation between marketing spend and revenue **for each region**.
2. Identify the region with the **strongest positive correlation**.

**Data**
\`\`\`
${JSON.stringify(data, null, 2)}
\`\`\`

Enter **only the region name**.
    `,
    answer,
    validate: (input) =>
      input.trim().toLowerCase() === answer.toLowerCase(),
  };
}
