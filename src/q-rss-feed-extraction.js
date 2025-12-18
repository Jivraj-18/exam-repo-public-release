export default function ({ user, weight = 0.75 }) {
  return {
    id: "q2-rss-feed-extraction",
    weight,
    question: html`
      <h2>Question 2: Extract News from RSS Feeds (0.75 marks)</h2>
      
      <h3>Scenario: News Aggregation for MediaPulse</h3>
      
      <p>
        <strong>MediaPulse</strong> is a news aggregation platform that curates content from hundreds of news sources 
        worldwide. The platform uses machine learning to categorize articles, detect trending topics, and provide 
        personalized news feeds to users based on their interests.
      </p>
      
      <h4>Business Challenge</h4>
      <p>
        MediaPulse needs to continuously monitor RSS feeds from various news outlets to capture breaking news in real-time. 
        The content team has identified that articles published within specific time windows and containing certain keywords 
        are particularly valuable for their trending topics feature.
      </p>
      
      <p>
        The challenge is to:
      </p>
      <ul>
        <li>Parse RSS feeds from multiple news sources</li>
        <li>Extract article metadata (title, date, link, summary)</li>
        <li>Filter articles based on publication date and content</li>
        <li>Identify articles matching specific criteria</li>
      </ul>
      
      <h4>RSS Feed Structure</h4>
      <p>A typical RSS feed entry looks like:</p>
      <pre><code>&lt;item&gt;
  &lt;title&gt;AI Breakthrough in Medical Diagnosis&lt;/title&gt;
  &lt;link&gt;https://technews.example.com/article/123&lt;/link&gt;
  &lt;pubDate&gt;Mon, 15 Jan 2025 10:30:00 GMT&lt;/pubDate&gt;
  &lt;description&gt;Researchers develop AI system for early disease detection...&lt;/description&gt;
  &lt;category&gt;Technology&lt;/category&gt;
&lt;/item&gt;</code></pre>
      
      <h4>Your Task</h4>
      <p>
        You are a data engineer at MediaPulse. Your task is to:
      </p>
      <ol>
        <li>Fetch the RSS feed from: <code>https://sanand0.github.io/tdsdata/rss/technews.xml</code></li>
        <li>Parse all articles from the feed</li>
        <li>Find articles that contain the keyword <strong>"AI"</strong> or <strong>"artificial intelligence"</strong> (case-insensitive) in either the title OR description</li>
        <li>Among these filtered articles, count how many were published in <strong>January 2025</strong></li>
        <li>Return the count as an integer</li>
      </ol>
      
      <h4>Implementation Hints</h4>
      <ul>
        <li>Use <code>feedparser</code> library to parse RSS feeds: <code>pip install feedparser</code></li>
        <li>Access feed entries with <code>feed.entries</code></li>
        <li>Check both <code>entry.title</code> and <code>entry.summary</code> for keywords</li>
        <li>Parse <code>entry.published</code> to extract the month and year</li>
        <li>Use <code>datetime</code> module for date parsing</li>
      </ul>
      
      <h4>Example Code Structure</h4>
      <pre><code>import feedparser
from datetime import datetime

feed = feedparser.parse('URL_HERE')
count = 0

for entry in feed.entries:
    # Check if title or summary contains keywords
    # Parse date and check if January 2025
    # Increment count if matches
    pass

print(count)
</code></pre>
      
      <h4>Impact</h4>
      <p>
        By automating RSS feed monitoring and filtering, MediaPulse can:
      </p>
      <ul>
        <li><strong>Real-Time Curation:</strong> Capture trending topics as they emerge</li>
        <li><strong>Content Discovery:</strong> Identify relevant articles from thousands of sources</li>
        <li><strong>User Engagement:</strong> Deliver timely, personalized content to users</li>
        <li><strong>Editorial Efficiency:</strong> Reduce manual content sourcing effort</li>
      </ul>
      
      <div class="question-input">
        <label for="q2-answer">
          How many articles about AI were published in January 2025?
        </label>
        <input
          type="number"
          id="q2-answer"
          name="q2-answer"
          placeholder="e.g., 15"
          required
        />
      </div>
    `,
    answer: async (formData) => {
      const userAnswer = parseInt(formData.get("q2-answer"));
      const correctAnswer = 12; // Example answer
      return {
        score: userAnswer === correctAnswer ? 0.75 : 0,
        feedback:
          userAnswer === correctAnswer
            ? "Correct! You successfully parsed the RSS feed and filtered articles by keywords and date."
            : `Incorrect. The correct answer is ${correctAnswer}. Make sure you: 1) Checked both title and description for keywords, 2) Performed case-insensitive search, 3) Correctly filtered by January 2025.`,
      };
    },
  };
}
