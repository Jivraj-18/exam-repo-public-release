export default function ({ user, elementMap }) {
  return {
    id: "excel-regional-performance",

    title: "Regional Revenue Calculation in Excel",

    difficulty: "moderate",

    tags: ["excel", "formulas", "analysis"],

    prompt: `
Given an Excel sheet with Region, Units_Sold, and Unit_Price:

1. Create a Revenue column
2. Calculate total Revenue per Region using formulas
    `,

    validate: ({ answer }) => {
      return answer && answer.toUpperCase().includes("SUMIF");
    }
  };
}
