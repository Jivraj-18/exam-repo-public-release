export default async function question({ user, weight = 1 }) {
  return {
    id: "bash_pipe_execution",
    weight,
    question: "Which command correctly counts the number of lines containing the word 'error' in a file named log.txt?",
    options: [
      "grep 'error' log.txt | wc -l",
      "cat log.txt > grep 'error' | count",
      "grep -c 'error' log.txt",
      "Both A and C"
    ],
    answer: "Both A and C"
  };
}
