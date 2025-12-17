export default function ({ user, weight }) {
  return {
    id: "sequence-pattern-analysis-testing",
    title: "Sequence Pattern Analysis with Automated Testing",
    weight,

    prompt: `
Implement a deterministic Python function that analyzes numeric sequences.

Task:
Create a function:
longest_strictly_increasing_positive_streak(nums: list[int]) -> int

Rules:
• Empty list returns 0
• Values <= 0 break a streak
• Values must be strictly increasing
• Function must be pure and deterministic

Testing:
• Write pytest tests covering edge cases and normal cases
• Ensure the longest valid streak is returned

Automation:
• Add a GitHub Actions workflow that runs pytest
• Tests must run on every push and pull request
• Use Python 3.11

Submission:
Paste the public Pull Request URL.
    `,

    type: "url",
    answer: null,
  };
}
