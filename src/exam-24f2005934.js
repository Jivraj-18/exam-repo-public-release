import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      id: "q-cli-grep-count",
      title: "CLI: grep count",
      weight: 1,
      question: html`
        <div class="mb-3">
          <p>
            You have a file <code>server.log</code>.  
            Write a Linux command to count how many lines contain the word
            <code>ERROR</code>, ignoring case.
          </p>
          <label class="form-label">Command:</label>
          <input class="form-control" name="q-cli-grep-count" />
        </div>
      `,
      answer: "grep -i ERROR server.log | wc -l",
    },

    {
      id: "q-git-undo-commit-keep-stage",
      title: "Git: undo commit keep staged",
      weight: 1,
      question: html`
        <div class="mb-3">
          <p>
            You made a commit by mistake but want to undo it while keeping
            all changes staged.  
            Write the exact Git command.
          </p>
          <label class="form-label">Command:</label>
          <input class="form-control" name="q-git-undo-commit-keep-stage" />
        </div>
      `,
      answer: "git reset --soft HEAD~1",
    },

    {
      id: "q-sql-groupby-fix",
      title: "SQL: GROUP BY fix",
      weight: 1,
      question: html`
        <div class="mb-3">
          <p>
            A SQL query fails or returns incorrect results because a column
            appears in <code>SELECT</code> but not in <code>GROUP BY</code>.
          </p>
          <p>
            What is the correct fix?
          </p>
          <label class="form-label">Answer (short):</label>
          <input class="form-control" name="q-sql-groupby-fix" />
        </div>
      `,
      answer: "Add the column to GROUP BY or apply an aggregate function",
    },

    {
      id: "q-pandas-vectorized-op",
      title: "Pandas: vectorized operation",
      weight: 1,
      question: html`
        <div class="mb-3">
          <p>
            Given a pandas DataFrame <code>df</code> with column <code>x</code>,
            write a vectorized expression to create a new column
            <code>y</code> where <code>y = x * 2</code>.
          </p>
          <label class="form-label">Code:</label>
          <input class="form-control" name="q-pandas-vectorized-op" />
        </div>
      `,
      answer: "df['y'] = df['x'] * 2",
    },

    {
      id: "q-json-safe-access",
      title: "JSON: safe key access",
      weight: 1,
      question: html`
        <div class="mb-3">
          <p>
            In Python, you are reading JSON objects where some keys may be missing.
          </p>
          <p>
            Write the safest one-line expression to access key
            <code>price</code> with default value <code>0</code>.
          </p>
          <label class="form-label">Code:</label>
          <input class="form-control" name="q-json-safe-access" />
        </div>
      `,
      answer: "obj.get('price', 0)",
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
