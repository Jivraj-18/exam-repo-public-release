export default async function ({ user, weight = 1 }) {
  return {
    id: "basic-ci-cache",
    title: "Basic CI/CD with Caching",
    question: `
Create a GitHub Actions workflow that:

- Triggers on push to main
- Runs on ubuntu-latest
- Includes a step whose name contains your institute email (23f2xxxxxxxx@ds.study.iitm.ac.in)
- Uses actions/cache@v4 with cache key cache-basic-ci
- Prints cache hit/miss in a step named check-cache-basic-ci

After successful execution, submit the repository URL.
    `,
    answer: "",
    weight,
  };
}
