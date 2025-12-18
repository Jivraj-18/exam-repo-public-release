export default function shellLogAnalysisQuestion({ user, weight }) {
  return {
    id: "q-shell-log-analysis",
    title: "Shell Log Analysis with Regex",
    weight,
    prompt: `
Analyze login logs with shell tools:
- Log format: 2025-03-01T12:34:56Z user=jdoe status=FAIL ip=192.168.1.5
- Extract all failed login attempts
- Count unique IPs
- Print verification code as FAIL-<count>-ga6token
    `,
  };
}