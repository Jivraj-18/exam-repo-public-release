export default function ({ user, weight }) {
  return {
    id: "python-devcontainer-reproducible-dev",
    title: "Python Devcontainer Setup for Reproducible Development",
    weight,

    prompt: `
Create or use a public GitHub repository and configure a Codespace devcontainer
by adding a .devcontainer/devcontainer.json file with the following requirements:

• Base image: mcr.microsoft.com/devcontainers/python:3.11
• Dev Container features:
  - Python
  - Git
• Required VS Code extensions:
  - ms-python.python
  - ms-toolsai.jupyter
  - astral-sh.uv
• postCreateCommand installs dependencies using uv:
  pandas, numpy, scikit-learn, fastapi
• Environment variable: PYTHONUNBUFFERED=1

Verification:
Run:
python --version && echo $CODESPACES && echo $GITHUB_REPOSITORY

Paste the output exactly below.
    `,

    type: "text",
    answer: null,
  };
}
