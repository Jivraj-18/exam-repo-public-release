export default {
  title: "TDS Bonus Activity – Student Questions (23f3000370)",

  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",

  allowed: () => true,
  read: () => true,

  instructions: /* html */ `
    <h1 class="display-4 my-4">
      Tools in Data Science – Bonus Activity
    </h1>

    <p>
      This exam contains original student-created questions
      covering multiple tools and techniques taught in the
      <strong>Tools in Data Science</strong> course.
    </p>

    <ul>
      <li>Browser DevTools & API inspection</li>
      <li>Bash-based data analysis</li>
      <li>JSON parsing & structure navigation</li>
      <li>CSS selectors for web scraping</li>
      <li>LLM prompt design with structured outputs</li>
    </ul>

    <p>
      Use any resources you like. The goal is to test
      practical tool usage, not memorization.
    </p>
  `,
};
