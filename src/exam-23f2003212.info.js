export default {
  title: "TDS 2025 Dec Bonus Assignment – Objective Practice Set",
  start: "2025-12-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true, // Allow all logged-in users to submit
  read: () => true, // Allow all users to read (reader mode allowed)
  admin: (email) =>
    email == "anand@study.iitm.ac.in" // Anand S
    || email == "narayanan@study.iitm.ac.in" // Narayanan R
    || email == "jkm@study.iitm.ac.in" // Jayakrishnan Warriem
    || email == "prasanna@study.iitm.ac.in" // Prasanna S
    || email == "sivaadithya@study.iitm.ac.in" // Sivaadithya M
    || email == "23f2003212@ds.study.iitm.ac.in", // Anup

  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Dec Bonus Assignment
    </h1>

    <p>
      This bonus assignment contains a set of <strong>fully objective</strong>,
      <strong>self-contained</strong> practice questions drawn from across the
      Tools in Data Science syllabus.
    </p>

    <h2 class="display-6 my-5">Instructions</h2>
    <ol>
      <li>All questions are auto-gradable with exact answer matching.</li>
      <li>No external files or downloads are required.</li>
      <li>You may use any resources, including documentation and AI tools.</li>
      <li>You may check answers multiple times and save your progress.</li>
      <li>Only your final saved submission will be evaluated.</li>
    </ol>

    <p class="mt-5">
      This assignment is intended for additional practice and does not include
      any subjective or descriptive questions.
    </p>
  `,
};
