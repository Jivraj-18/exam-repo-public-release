export default ({ user, weight }) => ({
  id: "docker-nginx-check",
  weight: weight || 1.0,
  question: /* html */ `
    <h3>1. Case Study: Cloud-Native Containerization</h3>
    <p>Run a detached Nginx container mapping port 8080 on your host to port 80 in the container:</p>
    <pre><code>docker run -d -p 8080:80 --name web-check nginx:alpine</code></pre>
    <p>Now, use <code>curl</code> to fetch the Server header from your local port:</p>
    <pre><code>curl -I http://localhost:8080</code></pre>
    <p>Paste the <b>entire output</b> of the curl command below:</p>
  `,
  type: "textarea",
  validate: (input) => input.includes("Server: nginx") && input.includes("200 OK"),
});