export default function ({ user, weight = 1 }) {
  return {
    id: "q_ai_testing_ci",
    weight,

    question: `
An AI coding agent generates the following Python function:

def longest_positive_streak(nums: list[int]) -> int:
    ...

The function should return the length of the longest
sequence of consecutive values strictly greater than 0.

Your task:
- Write pytest test cases that strictly enforce this contract
- Tests must cover:
  - Empty input
  - Multiple positive streaks
  - Zeros and negative numbers
- Add a GitHub Actions workflow that:
  - Runs pytest on push and pull_request
  - Fails if any test fails
  - Runs on Ubuntu

Constraints:
- Tests must be deterministic
- No randomness
- CI must block merging on failure
`,

    answer: null,
  };
}
