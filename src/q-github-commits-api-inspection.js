export default function ({ weight = 1 }) {
  return {
    id: "github-commits-api-inspection",

    question: `
      You are on the GitHub repository page:

      <br><br>
      <code>https://github.com/pallets/flask</code>

      <br><br>
      Using <strong>Browser DevTools → Network tab</strong>, identify
      the API request that GitHub makes to fetch the list of commits
      for this repository.

      <br><br>
      What is the <strong>HTTP method</strong> and the
      <strong>API URL path</strong> used to fetch the commit data?

      <br><br>
      <strong>Answer format:</strong><br>
      <code>METHOD /path</code>
    `,

    answer: "GET /repos/pallets/flask/commits",

    weight,
  };
}
