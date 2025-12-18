export default ({ user, weight }) => ({
  id: "env-audit",
  weight: weight || 0.5,
  question: /* html */ `
    <h3>2. Case Study: Security Credentials Audit</h3>
    <p>Set a temporary environment variable in your current terminal session:</p>
    <pre><code>export ESHOP_AUDIT_KEY="Audit-${user.email.split('@')[0]}"</code></pre>
    <p>Now, run a command to print all environment variables and filter for ours:</p>
    <pre><code>env | grep ESHOP_AUDIT_KEY</code></pre>
    <p>What is the <b>exact output</b> of that grep command?</p>
  `,
  type: "text-input",
  placeholder: "ESHOP_AUDIT_KEY=...",
});