export default function ({ user, weight = 1 }) {
  return {
    id: "github-pages",
    weight,
    prompt: `
Publish a GitHub Pages website that includes your email:

<!--email_off-->${user.email}<!--/email_off-->

Submit the **public GitHub Pages URL**.
    `,
    answerType: "url",
    validate: (url) =>
      url.startsWith("https://") && url.includes("github.io"),
  };
}
