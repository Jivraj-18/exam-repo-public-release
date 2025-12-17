export default {
  title: "TDS Quiz - Roll 23f2005381",
  start: "2025-01-01T00:00:00+05:30",
  end: () => "2026-01-01T00:00:00+05:30",
  allowed: () => true,
  read: () => true,
  admin: (email) => true,
  instructions: /* html */ `
    <p>This quiz tests advanced understanding of tool internals.</p>
    <ul>
      <li>FastAPI Event Loop behavior</li>
      <li>Docker Build/Run variables</li>
      <li>Regex Greediness</li>
      <li>JQ Slicing</li>
      <li>Git State Management</li>
      <li>CURL & APIs</li>
      <li>JQ JSON Processing</li>
      <li>Git Workflows</li>
      <li>UV & Python Tooling</li>
      <li>FastAPI Validation</li>
    </ul>
  `,
};
