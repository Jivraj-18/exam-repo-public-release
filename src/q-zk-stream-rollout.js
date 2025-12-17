export default async function ({ user, weight = 1 }) {
  return {
    id: "zk-stream-rollout",
    title: "Project ZK-Stream Rollout",
    question: `
Draft an architecture note in Markdown titled **Project ZK-Stream Rollout** that documents how a streaming data product moves from canary to global rollout.

Your document must include:
- CDN edge, API gateway, multi-region processors
- Message queue throttling and CI/CD pipeline
- Mermaid flowchart with nodes cdn-q3p9x, gateway-mn2b4, processor-7kplw
- Mermaid sequence diagram: Client → cdn-q3p9x → gateway-mn2b4 → processor-7kplw → ack
- Inline code \`zk push-stream <tag>\`
- Task list, table, JSON, YAML snippets
- IMPORTANT callout with guardrail token r5s8t-guard-9
- Footnotes, formatting, hyperlink, and CI YAML

Follow all constraints strictly.
    `,
    answer: "",
    weight,
  };
}
