import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Bonus Questions
import qCsvSum from "./q-csv-sum.js";
import qLogParsing from "./q-log-parsing.js";
import qUnitConversion from "./q-unit-conversion.js";
import qTextFrequency from "./q-text-frequency.js";
import qJsonSchemaValidator from "./q-json-schema-validator.js";

export async function questions(user, elementMap) {
  const results = [
    // Bonus Question 1: CSV Sum
    {
      ...(await qCsvSum({ user, weight: 1 })),
    },
    // Bonus Question 2: Log Parsing
    {
      ...(await qLogParsing({ user, weight: 1 })),
    },
    // Bonus Question 3: Unit Conversion
    {
      ...(await qUnitConversion({ user, weight: 1 })),
    },
    // Bonus Question 4: Text Frequency
    {
      ...(await qTextFrequency({ user, weight: 1 })),
    },
    // Bonus Question 5: JSON Schema Validator
    {
      ...(await qJsonSchemaValidator({ user, weight: 1 })),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
