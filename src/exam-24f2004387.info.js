export default {
  title: "TDS 2025 Sep Bonus Activity",

  // Exam availability
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",

  // Access control
  allowed: () => true, // Allow all logged-in users
  read: () => true,    // Allow read-only access to non-logged-in users

  // Admins who can edit / manage this exam
  admin: (email) =>
    email === "22f3001919@ds.study.iitm.ac.in" || // Carlton D'Silva
    email === "prasanna@study.iitm.ac.in" ||      // Prasanna S
    email === "22f3002542@ds.study.iitm.ac.in" || // Jivraj Singh Shekhawat
    email === "22f3002460@ds.study.iitm.ac.in" || // Hritik Roshan Maurya
    email === "jkm@study.iitm.ac.in" ||           // Jayakrishnan Warriem
    email === "narayanan@study.iitm.ac.in" ||     // Narayanan R
    email === "sivaadithya@study.iitm.ac.in" ||   // Sivaadithya M
    email === "anand@study.iitm.ac.in",           // Anand S

  // Instructions shown to students
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Sep Bonus Activity
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>
      This bonus activity contains advanced, computation-heavy questions that
      extend core Tools in Data Science concepts. The focus is on analytical
      reasoning, mathematical computation, and evaluation of model behavior,
      rather than rote implementation.
    </p>

    <h2 class="display-6 my-5">Instructions</h2>
    <ol>
      <li>Each question presents a dataset or structured input along with a clearly defined analytical task.</li>
      <li>You may use any programming language, libraries, or external resources.</li>
      <li>Enter only the final required output in the answer box.</li>
      <li>You may check your answers multiple times using the <kbd>Check</kbd> button.</li>
    </ol>
 
  `,
};
