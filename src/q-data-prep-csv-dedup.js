export default function ({ user, weight }) {
  const rows = [
    ["E1", "HR", "2023-01-01", 50000],
    ["E1", "HR", "2023-06-01", 52000],
    ["E2", "IT", "2022-03-01", ""],
    ["E2", "IT", "2022-05-01", 60000],
    ["E3", "Sales", "2021-09-01", 45000],
  ];

  const correctCount = 3;
  const correctSum = 157000;

  return {
    id: "csv-dedup-cleaning",
    weight,

    question: `
You are given this CSV data:

employee_id,dept,join_date,salary
${rows.map((r) => r.join(",")).join("\n")}

Rules:
1. Keep **latest join_date** per employee_id
2. Drop rows with missing or invalid salary

Answer format:
count,sum

Example: 3,120000
`,

    validate: (answer) => {
      if (!answer) return "Answer required in count,sum format";

      const [count, sum] = answer.split(",").map(Number);
      return count === correctCount && sum === correctSum
        ? true
        : "Incorrect. Recheck deduplication and salary filtering.";
    },
  };
}
