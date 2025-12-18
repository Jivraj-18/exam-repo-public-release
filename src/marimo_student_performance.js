export default {
  id: "marimo-student-performance",
  title: "Interactive Student Performance Analysis with Marimo",
  marks: 1,
  difficulty: "medium",

  description: `
You are a data analyst at an educational institution analyzing student performance data.
Your goal is to create a reactive Marimo notebook that allows instructors to explore
how study hours impact exam scores using interactive widgets and dynamic markdown.
  `,

  requirements: [
    "Include your email (21f1003153@ds.study.iitm.ac.in) as a comment in the notebook",
    "Use marimo as the notebook framework",
    "Create at least three reactive cells with variable dependencies",
    "Generate a synthetic student performance dataset",
    "Include an interactive widget (slider or dropdown)",
    "Display dynamic markdown that updates based on widget state",
    "Add comments explaining data flow between cells",
    "Publish the notebook to a public GitHub repository"
  ],

  submission: {
    type: "url",
    format: "raw-github",
    example:
      "https://raw.githubusercontent.com/username/repo/main/analysis.py"
  },

  validation: {
    mustContain: [
      "import marimo as mo",
      "21f1003153@ds.study.iitm.ac.in",
      "mo.ui",
      "mo.md"
    ],
    fileExtension: ".py"
  }
};
