export default function ({ user, weight }) {
  return {
    id: "pure-function-refactor",
    weight,

    question: `
Refactor the function below to be **pure** (no mutation) and handle empty arrays.

Original:
\`\`\`js
function average(arr) {
  arr.push(0);
  return arr.reduce((a,b)=>a+b,0)/arr.length;
}
\`\`\`

Write a corrected version of \`average\` that:
• Does NOT mutate input
• Returns 0 for empty array
`,

    validate: (answer) => {
      if (!answer) return "Function implementation required";

      if (/push\s*\(/i.test(answer)) {
        return "Do not mutate the input array.";
      }

      if (!/return/i.test(answer)) {
        return "Function must return a value.";
      }

      return true;
    },
  };
}
