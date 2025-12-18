export default {
    title: "Bonus Activity - 23f2004299",
    start: "2025-01-01T00:00:00+05:30", // Any valid time
    end: () => "2026-12-31T23:59:59+05:30",
    allowed: () => true, // Allow all logged-in users to submit
    read: () => true, // Allow all to read (non-logged-in users in reader mode)
    admin: (email) => email === "23f2004299@ds.study.iitm.ac.in", // Self
    instructions: /* html */ `
    <h1 class="display-3 my-5">
      Bonus Activity Submission - 23f2004299
    </h1>
    <p>
      This exam contains 5 new questions created as part of the bonus activity.
    </p>
    <ul>
      <li>Python List Comprehension</li>
      <li>SQL Group By</li>
      <li>Regex Matching</li>
      <li>JavaScript Array Reduce</li>
      <li>Bash Line Count</li>
    </ul>
  `,
};
