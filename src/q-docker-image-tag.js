export default function ({ user, weight = 1 }) {
  return {
    id: "docker_image_tagging",
    weight,

    prompt: `
You are required to push a Docker image for an assignment with the tag:

\`your-username/your-app:24f2004876\`

What does \`24f2004876\` represent in this Docker image tag?
    `.trim(),

    answer: "tag",
  };
}
