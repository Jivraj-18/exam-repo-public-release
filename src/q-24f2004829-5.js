export default function ({ user, weight }) {
  return {
    id: "q-24f2004829-5",
    title: "Group students by grade",
    weight,
    statement: `
You are given an array of student objects. Each student has a name and a grade (for example "A", "B", "C").

Implement the function groupStudentsByGrade(students) that returns an object whose keys are grades and whose values are arrays of student names having that grade.

Example:
Input:
[
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
  { name: "Charlie", grade: "A" }
]

Output:
{
  A: ["Alice", "Charlie"],
  B: ["Bob"]
}
`,
    starterCode: `
function groupStudentsByGrade(students) {
  // TODO: Write your code here
}

module.exports = groupStudentsByGrade;
`,
    tests: [
      {
        name: "basic grouping",
        input: [
          [
            { name: "Alice", grade: "A" },
            { name: "Bob", grade: "B" },
            { name: "Charlie", grade: "A" },
          ],
        ],
        expected: { A: ["Alice", "Charlie"], B: ["Bob"] },
      },
      {
        name: "single grade",
        input: [
          [
            { name: "Dave", grade: "C" },
            { name: "Eve", grade: "C" },
          ],
        ],
        expected: { C: ["Dave", "Eve"] },
      },
      {
        name: "empty list",
        input: [[]],
        expected: {},
      },
    ],
  };
}
