import qJsonSchemaValidation from "./q-json-schema-validation.js";
import qTimezoneNormalization from "./q-timezone-normalization.js";
import qFeatureLeakageDetection from "./q-feature-leakage-detection.js";

const examQuestions = [
  qJsonSchemaValidation,      // 1st question
  qTimezoneNormalization,     // 2nd question
  qFeatureLeakageDetection,   // 3rd question
];

export default examQuestions;

