export default function ({ user, weight = 2 }) {
  const crawlData = [
    { file: "index.html", hasProduct: true, hasSemanticHTML: true, isValid: true },
    { file: "product-001.html", hasProduct: true, hasSemanticHTML: true, isValid: true },
    { file: "product-002.html", hasProduct: true, hasSemanticHTML: false, isValid: true },
    { file: "product-003.html", hasProduct: true, hasSemanticHTML: true, isValid: true },
    { file: "product-004.html", hasProduct: true, hasSemanticHTML: true, isValid: true },
    { file: "product-005.html", hasProduct: true, hasSemanticHTML: false, isValid: true },
    { file: "about.html", hasProduct: false, hasSemanticHTML: true, isValid: true },
    { file: "contact.html", hasProduct: false, hasSemanticHTML: true, isValid: true },
    { file: "blog-001.html", hasProduct: false, hasSemanticHTML: true, isValid: true },
    { file: "blog-002.html", hasProduct: false, hasSemanticHTML: true, isValid: true },
    { file: "cart.html", hasProduct: true, hasSemanticHTML: true, isValid: true },
    { file: "search.html", hasProduct: true, hasSemanticHTML: false, isValid: true },
    { file: "faq.html", hasProduct: false, hasSemanticHTML: true, isValid: true },
    { file: "terms.html", hasProduct: false, hasSemanticHTML: false, isValid: true },
    { file: "broken.html", hasProduct: false, hasSemanticHTML: false, isValid: false },
  ];
  
  const matchingFiles = crawlData.filter(
    f => f.hasProduct && f.hasSemanticHTML && f.isValid
  ).length;
  
  return {
    id: "advanced_html_crawl_analysis",
    type: "input",
    weight,
    placeholder: "8",
    label: "HTML Crawl Analysis: Count Matching Files",
    description: /* html */ `
      <h3>Crawl and Analyze HTML Files</h3>
      
      <h4>Scenario:</h4>
      <p>You've crawled an e-commerce website. Here's what you found:</p>
      
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>File</th>
            <th>Has Product Info</th>
            <th>Semantic HTML</th>
            <th>Valid Structure</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>index.html</td><td>✓</td><td>✓</td><td>✓</td></tr>
          <tr><td>product-001.html</td><td>✓</td><td>✓</td><td>✓</td></tr>
          <tr><td>product-002.html</td><td>✓</td><td>✗</td><td>✓</td></tr>
          <tr><td>product-003.html</td><td>✓</td><td>✓</td><td>✓</td></tr>
          <tr><td>product-004.html</td><td>✓</td><td>✓</td><td>✓</td></tr>
          <tr><td>product-005.html</td><td>✓</td><td>✗</td><td>✓</td></tr>
          <tr><td>about.html</td><td>✗</td><td>✓</td><td>✓</td></tr>
          <tr><td>contact.html</td><td>✗</td><td>✓</td><td>✓</td></tr>
          <tr><td>blog-001.html</td><td>✗</td><td>✓</td><td>✓</td></tr>
          <tr><td>blog-002.html</td><td>✗</td><td>✓</td><td>✓</td></tr>
          <tr><td>cart.html</td><td>✓</td><td>✓</td><td>✓</td></tr>
          <tr><td>search.html</td><td>✓</td><td>✗</td><td>✓</td></tr>
          <tr><td>faq.html</td><td>✗</td><td>✓</td><td>✓</td></tr>
          <tr><td>terms.html</td><td>✗</td><td>✗</td><td>✓</td></tr>
          <tr><td>broken.html</td><td>✗</td><td>✗</td><td>✗</td></tr>
        </tbody>
      </table>
      
      <h4>Task:</h4>
      <p>Count files that match ALL criteria:</p>
      <ul>
        <li>✓ Has product information</li>
        <li>✓ Uses semantic HTML tags</li>
        <li>✓ Valid structure</li>
      </ul>
      
      <p><strong>Your answer:</strong> A single integer = count of files matching all criteria</p>
    `,
    help: [/* html */ `
      <p><strong>Analysis approach:</strong></p>
      <ol>
        <li>Go through each file row</li>
        <li>Check if it has ✓ for ALL three criteria</li>
        <li>Count matching files</li>
      </ol>
      <p><strong>Example:</strong> index.html has ✓✓✓ → counts as 1</p>
      <p><strong>Example:</strong> product-002.html has ✓✗✓ → does NOT count</p>
    `],
    check: ({ answer }) => {
      const count = parseInt(answer.trim());
      
      if (isNaN(count) || count < 0) {
        return {
          pass: false,
          message: "✗ Please enter a valid positive integer",
        };
      }
      
      return {
        pass: count === matchingFiles,
        message: count === matchingFiles
          ? `✓ Correct! Found ${count} matching files.`
          : `✗ Expected ${matchingFiles}, but got ${count}. Recount files with all ✓ marks.`,
      };
    },
  };
}