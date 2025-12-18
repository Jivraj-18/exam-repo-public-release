export default {
  id: "llm_json_schema_basic",
  title: "LLM Structured Output with JSON Schema",

  question: `
You are calling the OpenAI Chat Completions API using <code>gpt-4o-mini</code>.

You want the model to respond ONLY in JSON following this schema:

<pre>{
  "type": "object",
  "properties": {
    "answer": { "type": "string" }
  },
  "required": ["answer"],
  "additionalProperties": false
}</pre>

Write the JSON body for the request.  
Only include the request body (no headers, no URL).
`,

  answer: ({ input }) => {
    try {
      const obj = JSON.parse(input)
      return (
        obj.model === "gpt-4o-mini" &&
        obj.response_format?.type === "json_schema" &&
        obj.response_format?.json_schema?.schema?.additionalProperties === false
      )
    } catch {
      return false
    }
  }
}
