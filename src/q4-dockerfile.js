export default async function q4({ weight = 1 }) {
  return {
    id: 'q4-dockerfile',
    title: 'Dockerfile for Python CLI Tool',
    type: 'text',
    description: `<p>You have this Python script <code>greet.py</code>:</p>
<pre><code>import sys

if len(sys.argv) != 2:
    print("Usage: python greet.py &lt;name&gt;")
    sys.exit(1)

name = sys.argv[1]
print(f"Hello, {name}!")
</code></pre>
<p>Create a <code>Dockerfile</code> that:</p>
<ol>
  <li>Uses <code>python:3.11-slim</code> as the base image.</li>
  <li>Copies <code>greet.py</code> into the image.</li>
  <li>Sets the default command so that <code>docker run my-greet Alice</code> prints <code>Hello, Alice!</code>.</li>
</ol>
<p><strong>Expected file:</strong> <code>Dockerfile</code></p>`,
    weight,
  };
}
