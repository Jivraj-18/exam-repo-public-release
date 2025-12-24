import { displayQuestions } from "./utils/display.js";
import { default as seedrandom } from "seedrandom";

export async function questions(user, elementMap) {
  const q1 = await import("./q-log-analysis.js");
  const q2 = await import("./q-api-aggregation.js");
  const q3 = await import("./q-text-cleansing.js");
  const q4 = await import("./q-data-joining.js");
  const q5 = await import("./q-statistics.js");

  const factories = [
    q1.questionFactory,
    q2.questionFactory,
    q3.questionFactory,
    q4.questionFactory,
    q5.questionFactory,
  ];

  const results = [];

  for (let i = 0; i < factories.length; i++) {
    const id = `q-${i + 1}`;
    const random = seedrandom(`${user.email}#${id}`);
    const q = factories[i](random, id);

    results.push({
      id,
      title: q.title,
      weight: 1,
      question: q.question,
      answer: q.answer,
    });
  }

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}