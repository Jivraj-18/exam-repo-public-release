export default function ({ user, weight = 1 }) {
  return {
    id: "docker_optimization",
    type: "mcq",
    weight,
    question: `
Which practice helps reduce the size of a Docker image?
    `,
    options: [
      "Using a larger base image",
      "Running each command in a separate RUN instruction",
      "Using an alpine-based base image",
      "Keeping unused files in the image"
    ],
    answer: 2
  };
}
