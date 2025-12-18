
export default async function({ user, weight = 1 }) {
    return {
        id: "llm_tool_call_validity",

        title: "LLM Tool Call Argument Validation",

        question: `
      <p>An LLM tool is defined as:</p>

      <pre>
search(query: string, limit: number)
      </pre
      >

      <p>The system rejects calls with missing or ambiguous arguments.</p>

      <p>How many of the following can be converted into a valid tool call?</p>

      <pre>
1) "Search"
2) "Search for pandas"
3) "Search for pandas, return five results"
4) "Find data science articles"
      </pre
      >
    `,

        answer: 1,

        validate: (v) => {
            const n = Number(v);
            if (!Number.isInteger(n)) return "Answer must be an integer";
            if (n !== 1) return "Incorrect. Tool calls require explicit arguments.";
            return true;
        },

        weight,
    };
}
