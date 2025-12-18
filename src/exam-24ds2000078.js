import qJsonSchemaValidation from "./q-json-schema-validation.js";
import qTimezoneNormalization from "./q-timezone-normalization.js";
import qFeatureLeakageDetection from "./q-feature-leakage-detection.js";
import qHttpCachingBehavior from "./q-http-caching-behavior.js";
import qLlmPromptEvaluation from "./q-llm-prompt-evaluation.js";

const examQuestions = [
  qJsonSchemaValidation,      // 1st question
  qTimezoneNormalization,     // 2nd question
  qFeatureLeakageDetection,   // 3rd question
  qHttpCachingBehavior,       // 4th question
  qLlmPromptEvaluation,       // 5th question
];

export default examQuestions;


