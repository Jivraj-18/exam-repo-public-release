// Module 3 (AI Coding) + Module 4 (LLMs): Pydantic AI with retry logic, tool call validation, streaming
// Weight: 5.0 marks
// Tests: Retry decorators, tool validation, streaming responses, error recovery

import { html } from 'https://cdn.jsdelivr.net/npm/lit-html@3/+esm';
import seedrandom from 'https://cdn.jsdelivr.net/npm/seedrandom@3/+esm';

export default async function ({ user, weight }) {
  const rng = seedrandom(user.email);
  
  // Generate challenge with intermittent tool failures
  const failureRates = [0.3, 0.4, 0.5]; // 30%, 40%, 50% failure
  const failureRate = failureRates[Math.floor(rng() * failureRates.length)];
  const maxRetries = 3;
  
  // Generate math problem requiring tool validation
  const operations = [
    { op: 'factorial', input: 5, result: 120, validation: 'result > 0 and result == math.factorial(n)' },
    { op: 'fibonacci', input: 8, result: 21, validation: 'result > 0 and is_fibonacci_number(result)' },
    { op: 'prime_factors', input: 60, result: [2,2,3,5], validation: 'all(is_prime(p) for p in result)' }
  ];
  const operation = operations[Math.floor(rng() * operations.length)];

  return {
    id: 'pydantic-ai-retry-logic',
    title: 'Pydantic AI with Retry Logic and Tool Validation',
    weight,
    question: html`
      <p>Build a fault-tolerant Pydantic AI agent that retries failed tool calls and validates outputs.</p>
      
      <h3>Nightmare Scenario</h3>
      <p>Your tools randomly fail ${Math.round(failureRate * 100)}% of the time (network issues, rate limits).</p>
      <p>You must implement exponential backoff retry logic with validation.</p>
      
      <h3>Requirements</h3>
      
      <h4>Part A: Tool with Retry Decorator (2.0 marks)</h4>
      <p>Create a <code>${operation.op}</code> tool that:</p>
      <pre><code>import random
from pydantic_ai import Agent, RunContext
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(${maxRetries} + 1),
    wait=wait_exponential(multiplier=1, min=1, max=10),
    reraise=True
)
def ${operation.op}_with_retry(n: int) -> ${Array.isArray(operation.result) ? 'list' : 'int'}:
    # Simulate ${Math.round(failureRate * 100)}% failure rate
    if random.random() < ${failureRate}:
        raise Exception("Tool temporarily unavailable")
    
    # Actual implementation
    result = compute_${operation.op}(n)
    return result</code></pre>
      
      <h4>Part B: Result Validation (1.5 marks)</h4>
      <p>Add validation that ensures:</p>
      <pre><code>def validate_result(result, n):
    # For ${operation.op}:
    return ${operation.validation}</code></pre>
      <p>If validation fails, raise <code>ValueError</code> and trigger retry.</p>
      
      <h4>Part C: Streaming Agent Response (1.5 marks)</h4>
      <p>Configure agent to stream responses:</p>
      <pre><code>agent = Agent(
    'openai:gpt-4o-mini',
    retries=${maxRetries},
    result_validators=[validate_result]
)

# Stream the response
async with agent.run_stream('Calculate ${operation.op} of ${operation.input}') as stream:
    async for chunk in stream:
        print(chunk, end='', flush=True)</code></pre>
      
      <h3>Answer Format</h3>
      <p>Given:</p>
      <ul>
        <li>Failure rate: ${Math.round(failureRate * 100)}%</li>
        <li>Max retries: ${maxRetries}</li>
        <li>Exponential backoff: wait = 2^attempt seconds</li>
      </ul>
      <p>What is the <strong>maximum possible wait time</strong> (in seconds) before giving up?</p>
      <p>Formula: Sum of waits = 2^0 + 2^1 + 2^2 + ... + 2^(${maxRetries}-1)</p>
      <p>Answer the total seconds (integer).</p>
      
      <h3>Hidden Complexity</h3>
      <ul>
        <li><strong>Tenacity retry</strong>: Exponential backoff with jitter to avoid thundering herd</li>
        <li><strong>Validation during retry</strong>: Even successful calls might return invalid data</li>
        <li><strong>Streaming with retries</strong>: Must buffer until validation passes</li>
        <li><strong>Context preservation</strong>: Retries must maintain conversation context</li>
        <li><strong>Async compatibility</strong>: Tenacity works with both sync and async</li>
      </ul>
      
      <details>
        <summary>Full Example with Retry Logic</summary>
        <pre><code>from pydantic_ai import Agent, RunContext
from tenacity import retry, stop_after_attempt, wait_exponential
import random

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10)
)
def unreliable_tool(x: int) -> int:
    if random.random() < 0.5:
        raise Exception("Temporary failure")
    return x * 2

agent = Agent('openai:gpt-4o-mini')

@agent.tool
def calculate(ctx: RunContext, x: int) -> int:
    try:
        result = unreliable_tool(x)
        if result <= 0:  # Validation
            raise ValueError("Invalid result")
        return result
    except Exception as e:
        return {"error": str(e), "retry": True}

# With streaming
async with agent.run_stream('Calculate double of 5') as stream:
    async for chunk in stream:
        print(chunk)</code></pre>
      </details>
      
      <h3>Required Understanding</h3>
      <p>This tests your ability to combine:</p>
      <ul>
        <li>Pydantic AI tool registration and execution</li>
        <li>Tenacity retry patterns (exponential backoff)</li>
        <li>Result validation with custom validators</li>
        <li>Streaming response handling</li>
        <li>Error recovery strategies</li>
      </ul>
    `,
    answer: async (answer) => {
      // Calculate sum of exponential backoff: 2^0 + 2^1 + ... + 2^(n-1)
      // For maxRetries=3: 1 + 2 + 4 = 7 seconds
      const totalWait = (Math.pow(2, maxRetries) - 1);
      const numAnswer = parseInt(answer);
      return numAnswer === totalWait;
    }
  };
}
