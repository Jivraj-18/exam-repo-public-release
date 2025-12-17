export function displayQuestions(results, elementMap) {
  const root = document.getElementById("exam");

  if (!root) {
    console.error("No #exam element found");
    return;
  }

  results.forEach((q, index) => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.padding = "12px";
    div.style.marginBottom = "12px";
    div.style.borderRadius = "6px";
    div.style.background = "#fff";

    div.innerHTML = `
      <h3>Question ${index + 1}</h3>
      <pre style="white-space: pre-wrap">${q.question}</pre>
    `;

    root.appendChild(div);
  });
}
