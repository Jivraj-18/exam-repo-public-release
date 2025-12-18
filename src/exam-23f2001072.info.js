export default {
    title: "TDS Bonus Activity - 23f2001072",
    start: "2025-12-18T00:00:00+05:30",
    end: () => "2025-12-31T23:59:59+05:30",
    allowed: () => true,
    read: () => true,
    admin: (email) =>
        email === "23f2001072@ds.study.iitm.ac.in",
    instructions: /* html */ `
      <h1 class="display-3 my-5">
        TDS Bonus Activity - 23f2001072
      </h1>
  
      <h2 class="display-6 my-5">Overview</h2>
      <p>This exam consists of 5 questions created as part of the TDS Bonus Activity.</p>
      <ul>
        <li><strong>Question 1</strong>: Python List Slicing</li>
        <li><strong>Question 2</strong>: Pandas DataFrame Filtering and Summation</li>
        <li><strong>Question 3</strong>: SQL Join Types</li>
        <li><strong>Question 4</strong>: Statistics (Median)</li>
        <li><strong>Question 5</strong>: Machine Learning Metrics (Precision/Recall)</li>
      </ul>
      
      <p>Good luck!</p>
    `,
};
