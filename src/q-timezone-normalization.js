export default async function({ user, weight = 1 }) {
  const id = "q-timezone-normalization";
  const title = "Normalize timezone in data";

  const questionHTML = `
    <div class="mb-3">
      <p><strong>Case Study: Timezone Normalization</strong></p>
      <p>
        You have a dataset containing timestamps from multiple timezones. Write a Python function
        that converts all timestamps to UTC.
      </p>
      <label for="${id}" class="form-label">Your Python code:</label>
      <textarea class="form-control" id="${id}" rows="6"></textarea>
    </div>
  `;

  const answer = async () => {
    const $input = document.getElementById(id);
    if (!$input || !$input.value) throw new Error("No code submitted");

    const userCode = $input.value;

    // Simple validation: must include timezone conversion keywords
    if (!userCode.includes("pytz") && !userCode.includes("timezone")) {
      throw new Error("Code does not appear to handle timezones");
    }

    return true;
  };

  return { id, title, weight, question: questionHTML, answer };
}
