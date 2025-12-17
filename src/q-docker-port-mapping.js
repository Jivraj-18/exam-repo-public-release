/**
 * Question: Docker Port Mapping
 * Topic: Docker container networking
 */

export default async function question() {
  return {
    id: "docker-port-mapping",
    title: "Docker Port Mapping",
    type: "short-answer",
    prompt: `You have a Flask application that runs on port 5000 inside a Docker container.

You want to access this application from your host machine's browser at http://localhost:8080

Complete this Docker run command by filling in the port mapping flag:

\`\`\`
docker run ___ myflaskapp
\`\`\`

Enter only the flag and port mapping (e.g., -f format):`,
    answer: "-p 8080:5000",
    evaluate: async (userAnswer) => {
      const normalized = userAnswer.trim().toLowerCase().replace(/\s+/g, "");
      
      // Accept various valid formats
      const validAnswers = [
        "-p8080:5000",
        "-p 8080:5000",
        "--publish8080:5000",
        "--publish 8080:5000"
      ];
      
      const normalizedValid = validAnswers.map(a => a.replace(/\s+/g, "").toLowerCase());
      
      if (normalizedValid.some(valid => normalized === valid)) {
        return { 
          correct: true, 
          feedback: "Correct! The format is -p HOST_PORT:CONTAINER_PORT, so -p 8080:5000 maps host port 8080 to container port 5000." 
        };
      }
      
      if (normalized.includes("5000:8080")) {
        return { 
          correct: false, 
          feedback: "Incorrect port order. The format is -p HOST_PORT:CONTAINER_PORT. You need -p 8080:5000 (host:container)." 
        };
      }
      
      return { 
        correct: false, 
        feedback: "Incorrect. Use -p 8080:5000 to map host port 8080 to container port 5000." 
      };
    },
    weight: 1
  };
}