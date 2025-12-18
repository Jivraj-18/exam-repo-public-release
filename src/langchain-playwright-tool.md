### Question Information: LangChain Playwright Tool

This question tests your understanding of LangChain tools and browser automation with Playwright.

#### What is LangChain?

LangChain is a framework for developing applications powered by language models. It provides:

- **Agents**: Systems that use LLMs to decide which actions to take
- **Tools**: Functions that agents can call to interact with external systems
- **Chains**: Sequences of calls to LLMs and other utilities

#### LangChain Tools

Tools in LangChain extend an agent's capabilities beyond text generation:

- Defined using the `Tool` class from `langchain.tools`
- Each tool has a `name`, `description`, and a `func` (the callable function)
- The agent decides when to use a tool based on its description
- Tools can perform web searches, API calls, database queries, or any Python function

**Example Tool Structure:**

```python
from langchain.tools import Tool

def my_function(input: str) -> str:
    # Do something with input
    return result

tool = Tool(
    name="tool_name",
    func=my_function,
    description="When to use this tool"
)
```

#### Playwright

Playwright is a browser automation library that:

- Controls real browsers (Chromium, Firefox, WebKit)
- Loads web pages and extracts content
- Supports both synchronous (`playwright.sync_api`) and async APIs
- Can handle dynamic JavaScript-rendered content

**Key Playwright Operations:**

- `sync_playwright()`: Context manager for browser automation
- `chromium.launch()`: Start a browser instance
- `browser.new_page()`: Create a new browser tab/page
- `page.goto(url)`: Navigate to a URL
- `page.content()`: Get the full HTML content
- `page.inner_text(selector)`: Extract visible text from elements

#### Combining LangChain + Playwright

When you create a tool that uses Playwright:

1. The tool function receives a URL as input
2. Playwright fetches and extracts page content
3. Content is cleaned (strip HTML tags, normalize whitespace)
4. Cleaned text is returned to the agent or passed to an LLM for processing
5. The agent can use this tool whenever it needs to access web content

This pattern enables agents to autonomously browse the web, extract information, and incorporate real-time data into their responses.
