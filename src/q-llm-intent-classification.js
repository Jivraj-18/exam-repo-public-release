export default function ({ user, weight = 1.5 }) {
  const validExamples = [
    { intent: "question", confidence: 0.95, entities: ["weather", "tomorrow"] },
    { intent: "request", confidence: 0.88, entities: ["help", "code"] },
    { intent: "complaint", confidence: 0.92, entities: ["slow", "performance"] },
    { intent: "greeting", confidence: 0.99, entities: ["hello"] },
    { intent: "feedback", confidence: 0.85, entities: ["good", "update"] },
  ];
  
  return {
    id: "llm_intent_classification_json",
    type: "textarea",
    weight,
    placeholder: `{"intent": "question", "confidence": 0.95, "entities": ["weather"]}`,
    label: "LLM Intent Classification: JSON Response",
    description: /* html */ `
      <h3>Classify User Intent Using LLM API</h3>
      
      <h4>Task:</h4>
      <ol>
        <li>Write a prompt that classifies user intents</li>
        <li>Call any LLM API (OpenAI, Anthropic, Cohere, free local LLM, etc.)</li>
        <li>Force JSON-only output (no markdown, no explanation)</li>
        <li>Test with sample input and capture raw API response</li>
        <li>Paste the JSON response here</li>
      </ol>
      
      <h4>Expected JSON Structure:</h4>
      <pre><code>{
  "intent": "one of: greeting, question, request, feedback, complaint",
  "confidence": 0.0 to 1.0,
  "entities": ["array", "of", "extracted", "keywords"]
}</code></pre>
      
      <h4>Sample Input to Test:</h4>
      <p><code>"What's the weather like tomorrow?"</code></p>
      
      <h4>Expected Output for Sample:</h4>
      <pre><code>{
  "intent": "question",
  "confidence": 0.95,
  "entities": ["weather", "tomorrow"]
}</code></pre>
      
      <h4>Valid Intent Values:</h4>
      <ul>
        <li><strong>greeting</strong>: "Hello", "Hi", "Hey"</li>
        <li><strong>question</strong>: "What is?", "How does?", "Why?"</li>
        <li><strong>request</strong>: "Can you?", "Please help", "Need assistance"</li>
        <li><strong>feedback</strong>: "Good job", "Thank you", "Nice update"</li>
        <li><strong>complaint</strong>: "This is broken", "Bad service", "Terrible UX"</li>
      </ul>
    `,
    help: [/* html */ `
      <p><strong>Example prompt to use with any LLM:</strong></p>
      <pre><code>System: "You are an intent classifier. Respond ONLY with valid JSON, no markdown, no explanation."

User: "What's the weather like tomorrow?"

Expected:
{"intent": "question", "confidence": 0.95, "entities": ["weather", "tomorrow"]}</code></pre>
      
      <p><strong>Using OpenAI API:</strong></p>
      <pre><code>curl https://api.openai.com/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "system", "content": "Respond ONLY with JSON."},
      {"role": "user", "content": "What is the weather?"}
    ]
  }'</code></pre>
      
      <p><strong>Using Free Local LLM (Ollama):</strong></p>
      <pre><code>curl http://localhost:11434/api/generate \\
  -d '{
    "model": "mistral",
    "prompt": "Classify: What is the weather? Respond JSON only.",
    "stream": false
  }'</code></pre>
      
      <p><strong>Valid response examples:</strong></p>
      <pre><code>${JSON.stringify(validExamples, null, 2)}</code></pre>
    `],
    check: ({ answer }) => {
      try {
        const response = JSON.parse(answer.trim());
        
        const hasIntent = typeof response.intent === 'string' && response.intent.length > 0;
        const hasConfidence = typeof response.confidence === 'number' && 
                             response.confidence >= 0 && response.confidence <= 1;
        const hasEntities = Array.isArray(response.entities) && response.entities.length > 0;
        
        const validIntents = ['greeting', 'question', 'request', 'feedback', 'complaint'];
        const intentValid = validIntents.includes(response.intent.toLowerCase());
        
        const allValid = hasIntent && hasConfidence && hasEntities && intentValid;
        
        if (!allValid) {
          const issues = [];
          if (!hasIntent) issues.push("Missing/invalid 'intent' field");
          if (!hasConfidence) issues.push("'confidence' must be 0-1");
          if (!hasEntities) issues.push("'entities' must be non-empty array");
          if (!intentValid) issues.push(`'intent' must be one of: ${validIntents.join(", ")}`);
          
          return {
            pass: false,
            message: `✗ Issues: ${issues.join("; ")}`,
          };
        }
        
        return {
          pass: true,
          message: `✓ Valid JSON! Intent: "${response.intent}" (${(response.confidence * 100).toFixed(0)}% confidence)`,
        };
      } catch (e) {
        return {
          pass: false,
          message: `✗ Invalid JSON: ${e.message}. Paste raw API response only (no markdown).`,
        };
      }
    },
  };
}