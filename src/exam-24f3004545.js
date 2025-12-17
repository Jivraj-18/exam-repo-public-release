import qLinuxLogAnalysis from "./q-linux-log-analysis.js";
import qGitRecovery from "./q-git-recovery.js";
import qSqlWindowFuncs from "./q-sql-window-funcs.js";
import qJsonCleaning from "./q-json-cleaning.js";
import qLlmFunction from "./q-llm-function.js";

export default {
  questions: [
    qLinuxLogAnalysis(),
    qGitRecovery(),
    qSqlWindowFuncs(),
    qJsonCleaning(),
    qLlmFunction(),
  ],
};
