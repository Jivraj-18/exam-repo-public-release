export default {
  // This title appears at the top of the webpage
  title: "Bonus Activity: 23f2000775", 
  
  // Start time in the past ensures the exam is "open" immediately
  start: "2024-12-15T10:00:00+05:30", 
  hours: 1.0, 
  admin: (email) => true,
  allowed: (email) => true 
  instructions: /* html */ `
    <h1>Bonus Submission</h1>
    <p>5 Scenario-based questions covering Git, LLMs, Scraping, Pandas, and Seaborn.</p>
  `,
};
