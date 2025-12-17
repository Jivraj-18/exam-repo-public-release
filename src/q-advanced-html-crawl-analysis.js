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

  // Expected files after crawl filtering
  const expectedFiles = crawlData
    .filter(f => f.hasProduct && f.hasSemanticHTML && f.isValid)
    .map(f => f.file);

  return {
    id: "advanced_html_crawl_analysis",
    type: "textarea",
    weight,
    placeholder: "index.html, product-001.html, product-003.html, ...",
    label: "HTML Crawl Analysis: Select Valid Product Pages",
    description: /* html */ `
      <h3>Crawl and Analyze HTML Files</h3>

      <h4>Scenario</h4>
      <p>
        You have crawled an e-commerce website and collected metadata about each
        HTML file. A production crawler should only keep files that:
      </p>

      <ul>
        <li>Contain product information</li>
        <li>Use semantic HTML</li>
        <li>Have a valid structure</li>
      </ul>

      <p>The crawl summary is shown below:</p>

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

      <h4>Task</h4>
      <p>
        List the filenames that your crawler should <strong>keep</strong>.
        Enter filenames separated by commas or new lines.
      </p>
    `,
    help: [/* html */ `
      <p><strong>Tip:</strong></p>
      <ul>
        <li>All three conditions must be satisfied</li>
        <li>Order does not matter</li>
        <li>No extra files should be included</li>
      </ul>
    `],
    check: ({ answer }) => {
      const submitted = answer
        .split(/[, \n]+/)
        .map(s => s.trim())
        .filter(Boolean);

      const expected = expectedFiles;

      const missing = expected.filter(f => !submitted.includes(f));
      const extra = submitted.filter(f => !expected.includes(f));

      if (missing.length === 0 && extra.length === 0) {
        return {
          pass: true,
          message: `✓ Correct! Your crawler correctly selected ${expected.length} files.`,
        };
      }

      return {
        pass: false,
        message: `
✗ Incorrect crawl selection.

Missing files:
${missing.length ? missing.join(", ") : "None"}

Extra files included:
${extra.length ? extra.join(", ") : "None"}
        `.trim(),
      };
    },
  };
}
