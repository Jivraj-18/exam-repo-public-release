// Question 5: Automated web crawling
export async function question5({ user, weight = 1 }) {
  const id = "q-web-crawl-count";
  const title = "Website Crawling and Analysis (1 mark)";

  const answer = "147";

  const question = html`
    <div class="mb-3">
      <h4>Documentation Site Indexing</h4>
      <p>
        <strong>Scenario:</strong> DocSearch Pro builds search indexes for documentation sites. 
        You need to crawl a documentation website and count specific file types.
      </p>
      <p>
        <strong>Your Task:</strong><br/>
        1. Crawl <code>https://docs.example-api.com/v2/</code> using wget or wget2<br/>
        2. Set recursion depth to 4 levels<br/>
        3. Download only HTML and Markdown files (.html, .htm, .md)<br/>
        4. Exclude files in the <code>/archive/</code> directory<br/>
        5. Count total number of .md files that contain the word "authentication" (case-insensitive)
      </p>
      <p>
        <strong>Command example:</strong>
      </p>
      <pre><code>wget --recursive --level=4 --accept html,htm,md \\
  --reject-regex "/archive/" \\
  --directory-prefix=./docs \\
  https://docs.example-api.com/v2/

grep -ril "authentication" ./docs/*.md | wc -l</code></pre>
      <label for="${id}" class="form-label">Number of matching files:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}