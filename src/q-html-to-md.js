export default function ({ user, weight }) {
    return {
      id: "q-html-to-md",
      prompt: `
  HTML → Markdown
  
  Convert the table found at:
  
  https://sanand0.github.io/tdsdata/html_table/simple1.html
  
  into **Markdown format**.  
  Submit ONLY the Markdown table.
  
  We will test exact cell matches.
  `,
      weight,
      check: (answer) => {
        const expected = `
  | Name  | Age | City     |
  |-------|-----|----------|
  | Alice | 24  | Chennai  |
  | Bob   | 29  | Mumbai   |
  | Carol | 31  | Kolkata  |
  `.trim();
  
        return answer.trim() === expected;
      },
    };
  }
  