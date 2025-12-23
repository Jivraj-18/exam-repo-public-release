export default async function question({ user, weight = 1 }) {
  return {
    id: "docker_layer_caching",
    weight,
    question: "In a Dockerfile, why should 'COPY requirements.txt' come before 'COPY . .'?",
    options: [
      "To ensure dependencies are installed before code is copied",
      "To leverage layer caching and avoid reinstalling packages if only source code changes",
      "To reduce the final image size",
      "Because Docker ignores requirements.txt if copied last"
    ],
    answer: "To leverage layer caching and avoid reinstalling packages if only source code changes"
  };
}
