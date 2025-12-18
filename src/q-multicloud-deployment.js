export default function ({ user, weight = 1 }) {
  return {
    id: "q-multicloud-deployment",
    weight,
    question: `
      <h3>Multi-Cloud Auto-Scaling Architecture</h3>
      <p>Design and implement deployment code for a Flask API that:</p>
      <ul>
        <li>Deploys to both AWS (primary) and Cloudflare Workers (backup)</li>
        <li>Auto-scales based on request rate (target: &lt;200ms response time)</li>
        <li>Routes 90% traffic to AWS, 10% to Cloudflare for testing</li>
        <li>Automatically fails over if AWS response time &gt; 500ms</li>
      </ul>
      <p><strong>Write Dockerfile and Cloudflare Workers script with routing logic.</strong></p>
    `,
    input: "textarea",
    answer: String.raw`# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
EXPOSE 8080
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8080", "app:app"]

# Cloudflare Workers - worker.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const AWS_ENDPOINT = 'https://your-aws-lb.elb.amazonaws.com'
const TRAFFIC_SPLIT = 0.9
let awsHealthy = true

async function checkAWSHealth() {
  try {
    const start = Date.now()
    const response = await fetch(AWS_ENDPOINT + '/health')
    const latency = Date.now() - start
    awsHealthy = response.ok && latency < 500
    return awsHealthy
  } catch (error) {
    awsHealthy = false
    return false
  }
}

async function handleRequest(request) {
  const isAwsHealthy = await checkAWSHealth()
  const useAWS = isAwsHealthy && Math.random() < TRAFFIC_SPLIT
  
  if (useAWS) {
    const url = new URL(request.url)
    const awsUrl = AWS_ENDPOINT + url.pathname + url.search
    return fetch(awsUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })
  }
  
  return new Response(JSON.stringify({
    message: 'Served from Cloudflare Workers',
    timestamp: new Date().toISOString()
  }), {
    headers: {'Content-Type': 'application/json'}
  })
}`,
  };
}
