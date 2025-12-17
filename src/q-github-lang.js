import { html } from "lit-html";

export default function ({ user, weight }) {
  return {
    id: "q-github-lang",
    title: "Regional Developer Insights",
    weight: weight || 1,
    description: html`
      <p>Find all GitHub users in <b>'Hyderabad'</b> who have more than <b>250 followers</b>.</p>
      <p>Of these users, identify the one with the <b>highest number of public gists</b>. What is the <code>ISO 8601</code> creation date (<code>created_at</code>) of that user's account?</p>
    `,
    help: [
      html`Use the GitHub Search API: <code>/search/users?q=location:Hyderabad+followers:>250</code>`,
      html`Iterate through the results to compare the <code>public_gists</code> count for each user profile.`
    ]
  };
}