import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 2 }) {
  const id = "q-docker-arg-vs-env";
  const title = "Docker ARG vs ENV Precedence";
  const random = seedrandom(`${user.email}#${id}`);

  const defaultArg = Math.floor(random() * 10) + 1;
  const envVal = defaultArg + 10;
  const buildArgVal = defaultArg + 20;

  const question = html`
    <p>Consider this <code>Dockerfile</code>:</p>
    <pre><code class="language-dockerfile">
FROM alpine
ARG VERSION=${defaultArg}
ENV VERSION=${envVal}
RUN echo "Build version is $VERSION"
    </code></pre>
    <p>You build the image with this command:</p>
    <pre><code>docker build --build-arg VERSION=${buildArgVal} -t test-img .</code></pre>
    <p>Then you run the container:</p>
    <pre><code>docker run test-img sh -c 'echo $VERSION'</code></pre>
    <p>What number is printed by the <strong>run</strong> command?</p>
  `;

  return {
    id,
    title,
    question,
    // Syllabus mapping: Deployment Tools > Docker
    check: (answer) => {
      const ans = parseInt(String(answer).trim(), 10);
      // Logic:
      // ARG is available during build. --build-arg overrides the ARG default.
      // However, ENV values persist into the container runtime.
      // If an ENV instruction is present, it sets the environment variable in the final image.
      // Docker rules: ENV values set in Dockerfile override ARG values of the same name for the environment.
      // So the container sees the ENV value hardcoded in the Dockerfile.
      // WAIT: Does ARG override ENV if passed? No, ARG sets the variable for RUN instructions. 
      // But ENV sets it for the image. 
      // "If an ARG instruction has a name that matches an existing ENV instruction, the ENV instruction "shadows" the ARG."
      // Therefore, the ENV value defined in Dockerfile wins in the final image, unless the ENV usage referenced the ARG.
      // Here: ENV VERSION=${envVal} sets it to the literal.
      // So output is envVal.
      if (ans === envVal) return true;
      throw new Error("Incorrect. Review Dockerfile reference: ENV instructions shadow ARG instructions of the same name, and ENV values persist to runtime.");
    },
    weight,
  };
}
