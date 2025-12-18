export function displayQuestions(questions, elementMap) {
  const container = elementMap.questions;
  container.innerHTML = "";

  questions.forEach((q, index) => {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "20px";

    wrapper.innerHTML = `
      <h2>${index + 1}. ${q.title}</h2>
      ${renderHelpCard(q.help)}
    `;

    container.appendChild(wrapper);
  });
}

function renderHelpCard(help) {
  const themes = {
    blue: ["#2563eb", "#f0f9ff", "#1e40af"],
    red: ["#dc2626", "#fef2f2", "#991b1b"],
    green: ["#16a34a", "#f0fdf4", "#15803d"],
    purple: ["#9333ea", "#faf5ff", "#6b21a8"],
    orange: ["#ea580c", "#fff7ed", "#9a3412"],
  };

  const [border, bg, title] = themes[help.theme];

  return `
    <div style="
      border-left: 4px solid ${border};
      padding: 16px;
      background: ${bg};
      border-radius: 8px;
    ">
      <h3 style="color:${title}; margin-top:0;">
        ${help.icon} ${help.title}
      </h3>

      <p><strong>Objective:</strong> ${help.objective}</p>
      <p><strong>Task:</strong> ${help.task}</p>

      <p style="
        margin-top: 10px;
        padding: 10px;
        background: #ffffffaa;
        border-radius: 6px;
      ">
        💡 ${help.tip}
      </p>
    </div>
  `;
}