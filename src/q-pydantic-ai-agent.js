import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 2.5 }) {
  const id = "q-pydantic-ai-agent";
  const title = "Pydantic AI: Type-Safe Tool-Calling Agent";

  const random = seedrandom(`${user.email}#${id}`);

  const cities = ["New York", "London", "Tokyo", "Sydney", "Dubai", "Singapore"];
  const targetCity = pick(cities, random);
  const num1 = Math.floor(random() * 50) + 10;
  const num2 = Math.floor(random() * 50) + 10;

  const question = html`
    <div class="mb-3">
      <h2>AgentCore: Production-Grade AI Agent with Type Safety</h2>
      <p>
        <strong>AgentCore</strong> is an enterprise AI automation platform that builds reliable, production-ready AI
        agents for business workflows. Unlike ad-hoc LLM scripts, their agents feature strict type validation,
        comprehensive error handling, and tool composability.
      </p>

      <h3>The Problem with Basic LLM Agents</h3>
      <p>
        Most LLM function calling implementations suffer from:
        <ul>
          <li>Unvalidated tool outputs causing runtime errors</li>
          <li>Loose typing making bugs hard to catch</li>
          <li>No dependency injection for complex tools</li>
          <li>Difficult testing and debugging</li>
        </ul>
      </p>

      <h3>Pydantic AI Solution</h3>
      <p>
        <strong>Pydantic AI</strong> is a framework for building production-grade agents with:
        <ul>
          <li><strong>Type Safety:</strong> Pydantic models validate all inputs/outputs</li>
          <li><strong>Tool Calling:</strong> Decorated functions become AI-callable tools</li>
          <li><strong>Structured Outputs:</strong> Guaranteed JSON schema compliance</li>
          <li><strong>Dependencies:</strong> Context injection for database, API clients, etc.</li>
          <li><strong>Model Agnostic:</strong> Works with OpenAI, Anthropic, Gemini, local models</li>
        </ul>
      </p>

      <h3>Your Mission</h3>
      <p>
        Build a FastAPI endpoint using <strong>Pydantic AI</strong> that exposes an agent with multiple custom tools:
      </p>
      <ol>
        <li>
          Create a <code>GET /agent?task=...</code> endpoint
        </li>
        <li>
          Implement an agent with at least 3 custom tools:
          <ul>
            <li><code>calculate</code>: Performs arithmetic (add, subtract, multiply, divide)</li>
            <li><code>get_weather</code>: Returns mock/real weather for a city</li>
            <li><code>search_web</code>: Returns mock/real web search results</li>
          </ul>
        </li>
        <li>Use Pydantic models for tool parameters and return types</li>
        <li>Return structured JSON response with tool call history</li>
      </ol>

      <h3>Test Task</h3>
      <p>Your agent will be tested with this task:</p>
      <code class="d-block my-2">
        "What is ${num1} + ${num2}, and what is the current weather in ${targetCity}? Return both answers."
      </code>

      <h3>Implementation Example</h3>
      <pre><code># Install: pip install pydantic-ai fastapi uvicorn
from pydantic_ai import Agent, RunContext
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])

# Define tools with type-safe schemas
class CalculateInput(BaseModel):
    operation: str  # "add", "subtract", "multiply", "divide"
    a: float
    b: float

class WeatherInput(BaseModel):
    city: str

# Create agent with tools
agent = Agent('openai:gpt-4o-mini')  # or 'gemini-1.5-flash', etc.

@agent.tool
def calculate(ctx: RunContext[None], input: CalculateInput) -> float:
    ops = {"add": lambda a,b: a+b, "subtract": lambda a,b: a-b,
           "multiply": lambda a,b: a*b, "divide": lambda a,b: a/b}
    return ops[input.operation](input.a, input.b)

@agent.tool
def get_weather(ctx: RunContext[None], input: WeatherInput) -> str:
    # Mock or call real weather API
    return f"The weather in {input.city} is sunny, 22°C"

@app.get("/agent")
async def run_agent(task: str):
    result = await agent.run(task)
    return {
        "task": task,
        "response": result.data,
        "tool_calls": [{"tool": call.tool_name, "args": call.args}
                       for call in result.all_messages()
                       if hasattr(call, 'tool_name')],
        "email": "${user.email}"
    }</code></pre>

      <h3>Response Format</h3>
      <pre><code>{
  "task": "the task description",
  "response": "agent's final answer",
  "tool_calls": [{"tool": "calculate", "args": {...}}, ...],
  "email": "${user.email}"
}</code></pre>

      <label for="${id}" class="form-label">
        Enter the full URL of your <code>/agent</code> endpoint
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="url"
        placeholder="https://your-api.com/agent"
        required
      />
      <p class="text-muted">
        Test: <code>GET /agent?task=${encodeURIComponent(`What is ${num1} + ${num2}, and what is the weather in ${targetCity}?`)}</code>.
        Response must include email=${user.email}, correct calculation result (${num1 + num2}), weather for ${targetCity}, and tool_calls array.
      </p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const taskQuery =
      `What is ${num1} + ${num2}, and what is the current weather in ${targetCity}? Return both answers.`;
    const testUrl = new URL(url);
    testUrl.searchParams.set("task", taskQuery);

    const resp = await fetch(testUrl.toString());
    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}. Expected 200 OK.`);

    const contentType = resp.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) throw new Error("Response must be application/json");

    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("Response is not valid JSON");
    }

    if (!data || typeof data !== "object") throw new Error("Response must be a JSON object");
    if (data.email !== user.email) throw new Error(`Email must match ${user.email}`);
    if (!data.response || typeof data.response !== "string") {
      throw new Error("Response must contain 'response' field with agent's answer");
    }

    // Verify the response includes both answers
    const expectedSum = num1 + num2;
    const responseText = data.response.toLowerCase();

    if (!responseText.includes(String(expectedSum))) {
      throw new Error(`Response must include the calculation result: ${expectedSum}`);
    }

    if (!responseText.includes(targetCity.toLowerCase())) {
      throw new Error(`Response must include weather information for ${targetCity}`);
    }

    // Verify tool calls array exists
    if (!Array.isArray(data.tool_calls)) {
      throw new Error("Response must contain 'tool_calls' array");
    }

    // Check if calculate tool was called
    const hasCalculate = data.tool_calls.some((call) => call.tool && call.tool.includes("calculate"));
    if (!hasCalculate) {
      throw new Error("Agent must use 'calculate' tool for arithmetic");
    }

    // Check if weather tool was called
    const hasWeather = data.tool_calls.some((call) =>
      call.tool && (call.tool.includes("weather") || call.tool.includes("Weather"))
    );
    if (!hasWeather) {
      throw new Error("Agent must use 'get_weather' tool for weather information");
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
