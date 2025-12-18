import { html } from "htm/preact";

export default function ({ user, weight = 1 }) {
  const id = "q-docker-fastapi";
  
  return {
    id,
    weight,
    question: html`
      <div>
        <h3>Question 1: Docker Deployment with FastAPI</h3>
        <p><strong>Module:</strong> Deployment Tools (Docker, FastAPI, Vercel)</p>
        
        <p><strong>Problem Statement:</strong></p>
        <p>Create a Dockerized FastAPI application that serves a machine learning model prediction endpoint. 
        The application should accept CSV data, process it, and return predictions.</p>
        
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>Create a FastAPI app with a <code>/predict</code> POST endpoint</li>
          <li>Accept CSV data in the request body (use Pydantic for validation)</li>
          <li>Validate input: features should be a list of lists (numerical values)</li>
          <li>Use a simple pre-trained model (e.g., sklearn's LogisticRegression on iris dataset)</li>
          <li>Return predictions as JSON with confidence scores</li>
          <li>Dockerfile should use Python 3.11 slim image</li>
          <li>Include health check endpoint at <code>/health</code></li>
          <li>Expose port 8000</li>
        </ul>
        
        <p><strong>Expected Response Format:</strong></p>
        <pre><code>{
  "predictions": [0, 1, 2],
  "confidence": [0.95, 0.87, 0.92],
  "model_version": "1.0"
}</code></pre>
        
        <p><strong>Deliverables:</strong></p>
        <ol>
          <li>main.py - FastAPI application with endpoints</li>
          <li>Dockerfile - Container configuration</li>
          <li>requirements.txt - All dependencies</li>
        </ol>
        
        <p><strong>Your Answer:</strong></p>
        <textarea 
          id="${id}-answer" 
          rows="25" 
          style="width: 100%; font-family: monospace; font-size: 12px;"
          placeholder="Paste your complete solution including main.py, Dockerfile, and requirements.txt..."
        ></textarea>
      </div>
    `,
    answer: () => document.getElementById(`${id}-answer`).value,
  };
}