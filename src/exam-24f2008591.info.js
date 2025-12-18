export default {
  title: "Data Skills Evaluation",

  start: "2024-11-07T18:30:00+05:30",

  hours: 1.0,

  admin: (email) => email === "teacher@xyz.edu",

  allowed: (email) => email.endsWith(".edu"),

  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>Save your answers frequently.</li>
      <li>Use local tools like Excel, SQL, and Python.</li>
      <li>No collaboration is permitted.</li>
    </ol>
  `,
};
