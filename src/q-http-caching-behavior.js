export default async function({ user, weight = 1 }) {
  const id = "q-http-caching-behavior";
  const title = "Analyze HTTP caching behavior";

  const questionHTML = `
    <div class="mb-3">
      <p><strong>Case Study: Optimize Web Performance</strong></p>
      <p>
        You are analyzing HTTP responses for caching behavior. Write a JavaScript function that
        checks response headers and determines if caching is properly configured
        (e.g., Cache-Control, ETag, Last-Modified).
      </p>
      <label for="${id}" class="form-label">Your JavaScript code:</label>
      <textarea class="form-control" id="${id}" rows="6"></textarea>
    </div>
  `;

  const answer = async () => {
    const $input = document.getElementById(id);
    if (!$input || !$input.value) throw new Error("No code submitted");

    const userCode = $input.value;

    // Minimal validation: check for fetch or axios usage
    if (!userCode.includes("fetch") && !userCode.includes("axios")) {
      throw new Error("Code does not appear to make HTTP requests");
    }

    return true;
  };

  return { id, title, weight, question: questionHTML, answer };
}

