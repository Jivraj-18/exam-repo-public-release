import { displayQuestions } from "./utils/display.js";
import { default as seedrandom } from "seedrandom";

export async function questions(user, elementMap) {
  const { questionFactories } = await import("./q-regex-pattern-matching.js");
  const results = [];

  // Create all 5 question variations
  for (let i = 0; i < questionFactories.length; i++) {
    const id = `q-regex-pattern-matching-${i + 1}`;
    const random = seedrandom(`${user.email}#${id}`);
    const questionFactory = questionFactories[i];
    const questionData = questionFactory(random, id);

    results.push({
      id,
      title: questionData.title,
      weight: 1,
      question: questionData.question,
      answer: questionData.answer,
    });
  }

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}

