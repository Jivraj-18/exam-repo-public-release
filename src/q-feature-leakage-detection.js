export default async function({ user, weight = 1 }) {
  const id = "q-feature-leakage-detection";
  const title = "Detect feature leakage in dataset";

  const questionHTML = `
    <div class="mb-3">
      <p><strong>Case Study: Prevent Feature Leakage</strong></p>
      <p>
        You have a dataset where some features may leak information about the target.
        Write a Python function to identify features that are highly correlated with the target
        and may cause leakage.
      </p>
      <label for="${id}" class="form-label">Your Python code:</label>
      <textarea class="form-control" id="${id}" rows="6"></textarea>
    </div>
  `;

  const answer = async () => {
    const $input = document.getElementById(id);
    if (!$input || !$input.value) throw new Error("No code submitted");

    const userCode = $input.value;

    // Minimal validation: check if pandas is imported
    if (!userCode.includes("import pandas") && !userCode.includes("pandas")) {
      throw new Error("Code does not appear to use pandas");
    }

    return true;
  };

  return { id, title, weight, question: questionHTML, answer };
}
