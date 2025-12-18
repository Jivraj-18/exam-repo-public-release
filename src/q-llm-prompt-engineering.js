// Question 4: LLM Prompt Engineering and Response Parsing
import { html } from "htm/preact";
import { codingQuestion } from "./utils/question.js";

export default function ({ user, weight = 1 }) {
  const email = user?.email || "student@example.com";
  const rollNumber = email.split("@")[0];
  
  // Generate unique customer reviews based on roll number
  const seed = rollNumber.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  
  const reviews = [
    {
      "review_id": `REV${seed % 1000}01`,
      "text": "The product quality is excellent! Fast shipping and great customer service. Highly recommend!",
      "rating": 5
    },
    {
      "review_id": `REV${seed % 1000}02`,
      "text": "Disappointed with the purchase. Product arrived damaged and return process was complicated.",
      "rating": 2
    },
    {
      "review_id": `REV${seed % 1000}03`,
      "text": "Average product. Does the job but nothing special. Price is reasonable.",
      "rating": 3
    }
  ];

  return codingQuestion({
    id: "llm-prompt-engineering",
    weight,
    question: html`
      <h3>LLM Prompt Engineering for Sentiment Analysis</h3>
      <p>
        You're building a sentiment analysis system using LLM prompts. You need to create
        effective prompts and parse structured responses from an LLM API.
      </p>
      <p>
        Customer Reviews for ${email}:
        <code style="display: block; white-space: pre-wrap; background: #f5f5f5; padding: 10px; margin: 10px 0;">
${JSON.stringify(reviews, null, 2)}
        </code>
      </p>
      <p>
        Write a Python function <code>analyze_reviews_with_llm(reviews)</code> that:
      </p>
      <ol>
        <li>Constructs an effective prompt for sentiment analysis that:
          <ul>
            <li>Asks for sentiment classification (positive/negative/neutral)</li>
            <li>Requests key topics/aspects mentioned</li>
            <li>Asks for specific emotions detected</li>
            <li>Requests actionable insights</li>
          </ul>
        </li>
        <li>Simulates LLM response parsing (you'll create mock responses)</li>
        <li>Returns a dictionary with:
          <ul>
            <li><code>'prompts'</code>: List of prompts created for each review</li>
            <li><code>'analyses'</code>: List of dicts with review_id, sentiment, topics, emotions, insights</li>
            <li><code>'summary'</code>: Dict with sentiment_distribution, common_topics, overall_recommendation</li>
            <li><code>'prompt_template'</code>: The template used for creating prompts</li>
          </ul>
        </li>
      </ol>
      <p>
        <strong>Note:</strong> For simulation, derive sentiment from rating (5-4: positive, 3: neutral, 2-1: negative).
        Extract topics using keyword matching (quality, shipping, price, service, etc.).
      </p>
    `,
    solution: `
def analyze_reviews_with_llm(reviews):
    """
    Analyze customer reviews using LLM-style prompting and parsing.
    
    Args:
        reviews: List of review dictionaries with review_id, text, rating
    
    Returns:
        Dictionary with prompts, analyses, and summary
    """
    # Define prompt template
    prompt_template = """Analyze the following customer review and provide:
1. Sentiment: positive, negative, or neutral
2. Key Topics: List the main aspects mentioned (e.g., quality, shipping, price)
3. Emotions: Identify emotions expressed (e.g., satisfaction, frustration, disappointment)
4. Actionable Insights: Suggest what the business should focus on

Review: {review_text}
Rating: {rating}/5

Provide your analysis in a structured format."""

    # Keywords for topic extraction
    topic_keywords = {
        'quality': ['quality', 'excellent', 'poor', 'great', 'bad'],
        'shipping': ['shipping', 'delivery', 'arrived', 'fast', 'slow'],
        'price': ['price', 'expensive', 'cheap', 'reasonable', 'value'],
        'service': ['service', 'customer', 'support', 'help'],
        'product': ['product', 'item', 'purchase']
    }
    
    # Emotion mapping
    emotion_map = {
        5: ['satisfaction', 'happiness', 'excitement'],
        4: ['satisfaction', 'contentment'],
        3: ['indifference', 'neutrality'],
        2: ['disappointment', 'frustration'],
        1: ['anger', 'frustration', 'disappointment']
    }
    
    prompts = []
    analyses = []
    sentiment_counts = {'positive': 0, 'negative': 0, 'neutral': 0}
    all_topics = []
    
    for review in reviews:
        review_id = review.get('review_id', 'UNKNOWN')
        text = review.get('text', '')
        rating = review.get('rating', 3)
        
        # Create prompt
        prompt = prompt_template.format(
            review_text=text,
            rating=rating
        )
        prompts.append({
            'review_id': review_id,
            'prompt': prompt
        })
        
        # Simulate LLM analysis
        # Determine sentiment from rating
        if rating >= 4:
            sentiment = 'positive'
        elif rating >= 3:
            sentiment = 'neutral'
        else:
            sentiment = 'negative'
        
        sentiment_counts[sentiment] += 1
        
        # Extract topics
        text_lower = text.lower()
        topics = []
        for topic, keywords in topic_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                topics.append(topic)
                all_topics.append(topic)
        
        # Get emotions
        emotions = emotion_map.get(rating, ['neutral'])
        
        # Generate insights
        insights = []
        if sentiment == 'positive':
            insights.append("Maintain current quality standards")
            if 'shipping' in topics:
                insights.append("Highlight fast shipping in marketing")
        elif sentiment == 'negative':
            insights.append("Address quality control issues")
            if 'service' in topics:
                insights.append("Improve customer service training")
        else:
            insights.append("Look for opportunities to exceed expectations")
        
        analyses.append({
            'review_id': review_id,
            'sentiment': sentiment,
            'topics': topics,
            'emotions': emotions,
            'insights': insights,
            'confidence': 0.85  # Simulated confidence score
        })
    
    # Create summary
    total_reviews = len(reviews)
    sentiment_distribution = {
        k: round(v / total_reviews * 100, 1) if total_reviews > 0 else 0
        for k, v in sentiment_counts.items()
    }
    
    # Find most common topics
    from collections import Counter
    topic_counter = Counter(all_topics)
    common_topics = [topic for topic, count in topic_counter.most_common(3)]
    
    # Overall recommendation
    positive_pct = sentiment_distribution['positive']
    if positive_pct >= 60:
        overall_recommendation = "Strong positive sentiment - focus on maintaining quality"
    elif positive_pct >= 40:
        overall_recommendation = "Mixed sentiment - identify and address specific pain points"
    else:
        overall_recommendation = "Negative sentiment dominant - urgent action needed on product/service quality"
    
    summary = {
        'sentiment_distribution': sentiment_distribution,
        'common_topics': common_topics,
        'overall_recommendation': overall_recommendation,
        'total_reviews_analyzed': total_reviews
    }
    
    return {
        'prompts': prompts,
        'analyses': analyses,
        'summary': summary,
        'prompt_template': prompt_template
    }

# Test with the provided reviews
reviews = ${JSON.stringify(reviews)}
result = analyze_reviews_with_llm(reviews)
print(result)
`,
    test: (code) => {
      return `
${code}

# Test cases
reviews = ${JSON.stringify(reviews)}
result = analyze_reviews_with_llm(reviews)

# Check structure
assert 'prompts' in result, "Missing 'prompts'"
assert 'analyses' in result, "Missing 'analyses'"
assert 'summary' in result, "Missing 'summary'"
assert 'prompt_template' in result, "Missing 'prompt_template'"

# Verify prompts
assert len(result['prompts']) == 3, f"Expected 3 prompts, got {len(result['prompts'])}"
for prompt_item in result['prompts']:
    assert 'review_id' in prompt_item, "Prompt missing 'review_id'"
    assert 'prompt' in prompt_item, "Prompt missing 'prompt'"
    assert len(prompt_item['prompt']) > 50, "Prompt too short"

# Verify analyses
assert len(result['analyses']) == 3, f"Expected 3 analyses, got {len(result['analyses'])}"
for analysis in result['analyses']:
    assert 'review_id' in analysis, "Analysis missing 'review_id'"
    assert 'sentiment' in analysis, "Analysis missing 'sentiment'"
    assert 'topics' in analysis, "Analysis missing 'topics'"
    assert 'emotions' in analysis, "Analysis missing 'emotions'"
    assert 'insights' in analysis, "Analysis missing 'insights'"
    
    # Verify sentiment values
    assert analysis['sentiment'] in ['positive', 'negative', 'neutral'], f"Invalid sentiment: {analysis['sentiment']}"
    
    # Verify topics is a list
    assert isinstance(analysis['topics'], list), "Topics should be a list"
    
    # Verify emotions is a list
    assert isinstance(analysis['emotions'], list), "Emotions should be a list"
    
    # Verify insights is a list
    assert isinstance(analysis['insights'], list), "Insights should be a list"
    assert len(analysis['insights']) > 0, "Should have at least one insight"

# Verify summary
summary = result['summary']
assert 'sentiment_distribution' in summary, "Summary missing 'sentiment_distribution'"
assert 'common_topics' in summary, "Summary missing 'common_topics'"
assert 'overall_recommendation' in summary, "Summary missing 'overall_recommendation'"
assert 'total_reviews_analyzed' in summary, "Summary missing 'total_reviews_analyzed'"

# Check sentiment distribution sums to 100
dist = summary['sentiment_distribution']
total_pct = dist['positive'] + dist['negative'] + dist['neutral']
assert 99 <= total_pct <= 101, f"Sentiment distribution should sum to ~100%, got {total_pct}%"

# Verify prompt template is a string
assert isinstance(result['prompt_template'], str), "Prompt template should be a string"
assert len(result['prompt_template']) > 100, "Prompt template too short"

print("All tests passed!")
`;
    },
  });
}