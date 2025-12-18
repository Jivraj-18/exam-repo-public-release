export default function ({ user, weight = 1.5 }) {
  return {
    id: "docker_compose_networking",
    weight,

    prompt: `
In a Docker Compose file with two services:

- web
- db

Both services are on the same default network.

From the \`web\` container, what hostname should be used to connect to the database service?
    `.trim(),

    answer: "db",
  };
}
