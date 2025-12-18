
export default async function({ user, weight = 1 }) {
    return {
        id: "browser_devtools_runtime",

        title: "Inspecting Runtime DOM with Browser DevTools",

        question: `
      <p>A webpage injects content dynamically using JavaScript after load.</p>

      <p>Which DevTools feature allows you to see the injected elements?</p>

      <ol>
        <li>View Page Source</li>
        <li>Elements panel</li>
        <li>Disable JavaScript</li>
        <li>Network tab only</li>
      </ol>
    `,

        answer: 2,

        validate: (v) => {
            const n = Number(v);
            if (!Number.isInteger(n)) return "Answer must be an integer";
            if (n !== 2)
                return "Incorrect. Dynamic DOM is visible in Elements panel.";
            return true;
        },

        weight,
    };
}
