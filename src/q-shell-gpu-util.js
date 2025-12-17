export default function({ user, weight = 0.5 }) {
  return {
    id: "q-shell-gpu-util",
    type: "number",
    title: "Shell: Identify Idle Compute Bursts",
    description: `
      <p>You are auditing the <b>NPPE Deep Learning</b> cluster logs. Each line follows this format:</p>
      <code>[2024-11-10T10:00:01Z] user=23f2003015 gpu_util=8% status=RUNNING</code>
      <p><b>Your Task:</b></p>
      <ol>
        <li>Filter for status=RUNNING.</li>
        <li>Restrict to your roll number: <b>23f2003015</b>.</li>
        <li>Count the number of seconds where <code>gpu_util</code> was strictly below 10%.</li>
      </ol>
      <p>Enter the exact integer count. Use <code>grep</code> and <code>awk</code>.</p>
    `,
    weight
  };
}