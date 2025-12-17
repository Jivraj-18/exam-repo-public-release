import { html } from "lit-html";

export default function ({ user, weight }) {
  return {
    id: "q-hn-markdown",
    title: "Hacker News to Markdown",
    weight: weight || 0.75,
    description: html`
      <p>Search the Hacker News RSS API for the latest 5 posts mentioning <b>'Data Engineering'</b> with at least <b>20 points</b>.</p>
      <p>Convert the results into a Markdown table with columns: <code>Title</code>, <code>Points</code>, and <code>URL</code>. The output must be formatted using <b>Prettier 3.4.2</b>.</p>
    `,
    help: [
      html`API endpoint: <code>https://hnrss.org/search?q=Data+Engineering&points=20</code>`,
      html`Use <code>xml.etree.ElementTree</code> or <code>feedparser</code> to parse the RSS items.`
    ]
  };
}