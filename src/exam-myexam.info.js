export default {
  title: "Practical Data Science & Development Assessment",
  start: "2025-01-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true, // Allow all logged-in users to submit
  read: () => true, // Allow all to read (non-logged-in users in reader mode)
  admin: (email) =>
    email == "anjali2325@example.com"
    || email == "22f3001919@ds.study.iitm.ac.in" // Carlton D'Silva
    || email == "prasanna@study.iitm.ac.in" // PRASANNA S
    || email == "22f3002542@ds.study.iitm.ac.in" // JIVRAJ SINGH SHEKHAWAT
    || email == "22f3002460@ds.study.iitm.ac.in" // Hritik Roshan Maurya
    || email == "jkm@study.iitm.ac.in" // Jayakrishnan Warriem
    || email == "narayanan@study.iitm.ac.in" // Narayanan R
    || email == "sivaadithya@study.iitm.ac.in" // Sivaadithya M
    || email == "anand@study.iitm.ac.in"
    || email == "22f3002992@ds.study.iitm.ac.in",
  hours: 3.0, // 3 hour time limit

  // Pre-exam display
  instructions: /* html */ `
    <h1>Tools in Data Science</h1>
    
  
    <p>This is a <strong>hands-on coding assessment</strong> that tests your practical skills in data science and software development. You have <strong>3 hours</strong> to complete 5 coding questions.</p>
    

    <h2>What You'll Be Tested On</h2>
 <ol>
  <li>
    <strong>Shell Scripting & Log Analysis</strong> – 
    Identifying failure patterns from server logs using Unix pipelines 
    (filtering, grouping, counting, and reasoning about conditions).
  </li>

  <li>
    <strong>SQL Data Aggregation</strong> – 
    Writing aggregation queries on structured tabular data with filters, 
    including summation and conditional selection.
  </li>

  <li>
    <strong>Data Transformation with Pandas</strong> – 
    Performing multi-step data analysis using filtering, grouping, 
    multiple aggregations, sorting, and result extraction.
  </li>

  <li>
    <strong>Web Data Extraction</strong> – 
    Scraping and structuring real-world data from public websites 
    (MyAnimeList) using DOM inspection and HTML parsing.
  </li>

  <li>
    <strong>Semantic Reasoning & Text Understanding</strong> – 
    Matching natural-language themes to the most relevant anime synopsis 
    based on meaning rather than keywords.
  </li>
</ol>

    

    
    <div style="background: #b9000fff; padding: 15px; border-left: 4px solid #721c24; margin: 20px 0;">
      <strong>🔴 Remember:</strong> Click "Save" regularly! Only your last saved submission will be evaluated.
    </div>
    
    <h2>Good Luck! 🚀</h2>
    <p>This exam tests real-world skills. Show us what you can build!</p>
  `,
};