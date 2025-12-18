export default function githubActionsNotebookValidationQuestion({ user, weight }) {
  return {
    id: "q-github-actions-notebook-validation",
    title: "GitHub Action for Notebook Validation",
    weight,
    prompt: `
Create a GitHub Action workflow that:
- Runs on every push
- Uses nbconvert to validate Jupyter notebooks
- If validation fails, echo NB_FAIL-ga6-24f2004508
- Must include step named validate-notebooks-24f2004508@ds.study.iitm.ac.in
    `,
  };
}