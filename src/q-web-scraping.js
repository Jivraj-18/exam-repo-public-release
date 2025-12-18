import { html } from "htm/preact";

export default function ({ user, weight = 1 }) {
  const id = "q-web-scraping";
  
  return {
    id,
    weight,
    question: html`
      <div>
        <h3>Question 2: Web Scraping with Beautiful Soup and Data Transformation</h3>
        <p><strong>Module:</strong> Data Sourcing (Scraping websites with Python) & Data Preparation</p>
        
        <p><strong>Problem Statement:</strong></p>
        <p>Write a Python script that scrapes quote data from <code>https://quotes.toscrape.com</code>, 
        cleans the data, and exports it to both CSV and JSON formats with proper formatting.</p>
        
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>Use <code>requests</code> and <code>BeautifulSoup4</code> for scraping</li>
          <li>Handle pagination (scrape at least 3 pages)</li>
          <li>Extract: quote text, author name, and tags for each quote</li>
          <li>Clean data: remove extra whitespace, handle special characters</li>
          <li>Handle missing values (use "Unknown" for missing authors)</li>
          <li>Export to CSV with proper headers: quote, author, tags</li>
          <li>Export to JSON as an array of objects</li>
          <li>Add error handling for network issues and missing elements</li>
          <li>Include a timestamp in output filenames</li>
        </ul>
        
        <p><strong>Function Signature:</strong></p>
        <pre><code>def scrape_and_transform(base_url: str, pages: int = 3) -> tuple[str, str]:
    """
    Args:
        base_url: Base URL of the website
        pages: Number of pages to scrape
    
    Returns:
        tuple: (csv_filepath, json_filepath)
    """
    pass</code></pre>
        
        <p><strong>Expected CSV Format:</strong></p>
        <pre><code>quote,author,tags
"The world as we have created it...",Albert Einstein,"change,deep-thoughts,thinking"
"It is our choices...",J.K. Rowling,"abilities,choices"</code></pre>
        
        <p><strong>Your Answer:</strong></p>
        <textarea 
          id="${id}-answer" 
          rows="25" 
          style="width: 100%; font-family: monospace; font-size: 12px;"
          placeholder="Paste your complete Python script here..."
        ></textarea>
      </div>
    `,
    answer: () => document.getElementById(`${id}-answer`).value,
  };
}