export default async function ({ user, weight = 1 }) {
  return {
    id: "advanced-cicd",
    title: "Advanced CI/CD Pipeline",
    question: `
Design a GitHub Actions workflow with:

- Triggers: push to main + workflow_dispatch
- Two jobs: build and release

Build job must:
- Use cache key cache-adv-742x
- Print cache hit/miss
- Include your institute email in a step name
- Upload an artifact

Release job must:
- Run only if build succeeds
- Run only on main
- Download artifact
- Use outputs or env variables from build

Ensure correct orchestration.
    `,
    answer: "",
    weight,
  };
}
