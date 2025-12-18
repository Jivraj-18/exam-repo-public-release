export default ({ user, weight }) => ({
  id: "sqlite-version",
  weight: weight || 1.0,
  question: /* html */ `
    <h3>3. Case Study: Database Integrity Verification</h3>
    <p>Download the database file: <a href="/files/app.db" target="_blank">app.db</a>.</p>
    <p>Run the following command using the SQLite3 CLI to find the system's current migration version:</p>
    <pre><code>sqlite3 app.db "SELECT version_code FROM schema_migrations WHERE status='success' ORDER BY id DESC LIMIT 1;"</code></pre>
    <p>What is the <b>numeric value</b> returned?</p>
  `,
  type: "number-input",
});