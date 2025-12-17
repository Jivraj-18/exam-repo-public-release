export default function ({ user, weight }) {
  return {
    id: "git_exam_workflow",
    weight,

    question: `
An online exam platform uses Git for submissions.
Each student must submit via a Pull Request from a branch named exam-<roll_no>.
After the deadline, graders run automated scripts that:

- Checkout each PR at a specific commit hash
- Re-run tests weeks later for re-evaluation or disputes
- Compare results against archived grading logs

Why is allowing ONLY PR-based submissions (and disallowing direct pushes to main)
CRITICAL for the correctness of this grading system?

A. It prevents students from rebasing their local branches
B. It guarantees the immutability and reproducibility of the graded code state
C. It avoids merge conflicts during development
D. It reduces CI execution time
    `,

    answer: "B",
  };
}
