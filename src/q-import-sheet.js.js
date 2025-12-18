export default function ({ user, weight }) {
    return {
      id: "q-import-sheet",
      prompt: `
  Google Sheets IMPORTHTML()
  
  A sports analyst wants to track live IPL standings.  
  Use Google Sheets' =IMPORTHTML() to fetch the first table from:
  
  https://sanand0.github.io/tdsdata/ipl_table/
  
  What is the correct formula to import the first table?
  (Answer must be EXACT.)
  
  `,    
      weight,
      check: (answer) =>
        answer.trim() === '=IMPORTHTML("https://sanand0.github.io/tdsdata/ipl_table/", "table", 1")',
    };
  }
  