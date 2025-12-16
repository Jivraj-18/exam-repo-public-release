export async function questions(user, elementMap) {
  const results = [

    {
      id: "q1-pandas-cleaning",
      title: "Handle Missing Values in CSV using Pandas",
      description: `
You are given a CSV file with missing numeric values.
Write Python code using pandas to replace missing values
in each numeric column with the column mean.
      `,
      async validate(answer) {
        // simple validation
        if (!answer.includes("fillna")) {
          throw new Error("Expected use of fillna()");
        }
        return true;
      },
      weight: 1,
    },

    {
      id: "q2-regex-validation",
      title: "Validate Email using Regex",
      description: `
Write a regular expression that validates a standard email address.
The regex should reject emails without @ or domain.
      `,
      async validate(answer) {
        if (!answer.includes("@")) {
          throw new Error("Regex must validate @ symbol");
        }
        return true;
      },
      weight: 1,
    },

    {
      id: "q3-json-transform",
      title: "Transform JSON API Response",
      description: `
Given a JSON list of users, extract only name and email
and return a new JSON array.
      `,
      async validate(answer) {
        if (!answer.includes("map")) {
          throw new Error("Expected JSON mapping logic");
        }
        return true;
      },
      weight: 1,
    },

    {
      id: "q4-sql-query",
      title: "Construct SQL SELECT Query",
      description: `
Write an SQL query to select all users who joined after 2022.
      `,
      async validate(answer) {
        if (!answer.toLowerCase().includes("select")) {
          throw new Error("Not a SELECT query");
        }
        return true;
      },
      weight: 1,
    },

    {
      id: "q5-git-log",
      title: "Analyze Git Commit Log",
      description: `
Given a git log output, count number of commits per author.
      `,
      async validate(answer) {
        if (!answer.includes("dict") && !answer.includes("{")) {
          throw new Error("Expected mapping of author to count");
        }
        return true;
      },
      weight: 1,
    },

  ];

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
