export default function ({ user, weight }) {
  const emailLength = user.email.length;
  const modValue = emailLength % 4;
  
  // Dynamic command based on personalization
  const commands = [
    'git log --oneline --graph --all',
    'git log --oneline --author="user" --since="2024-01-01"',
    'git diff HEAD~1 HEAD --stat',
    'git log --pretty=format:"%h - %an, %ar : %s"'
  ];
  
  const correctCommand = commands[modValue];

  return {
    id: "git-command-construct",
    weight,
    question: `
      <h2>Git Command Construction</h2>
      <p><strong>Difficulty:</strong> 2 (next URL revealed even if wrong)</p>
      <p><strong>Personalized:</strong> Yes (based on email length).</p>
      
      <p>You need to construct a Git command for the following scenarios. Choose the correct command based on your email length.</p>
      
      <p><strong>Your Email:</strong> ${user.email}</p>
      <p><strong>Email Length:</strong> ${emailLength}</p>
      <p><strong>Calculate:</strong> ${emailLength} mod 4 = ${modValue}</p>
      
      <h3>Scenarios (based on your calculation):</h3>
      <ul>
        <li><strong>If result = 0:</strong> Show commit history as a graph for all branches in one line format</li>
        <li><strong>If result = 1:</strong> Show commits by a specific author since a particular date</li>
        <li><strong>If result = 2:</strong> Show statistics of changes between the last commit and the one before it</li>
        <li><strong>If result = 3:</strong> Show custom formatted commit log with hash, author, date, and subject</li>
      </ul>
      
      <p><strong>Submit the exact Git command string</strong> (without 'git' prefix if your scenario says so, otherwise include it).</p>
      <p><strong>Example format:</strong> <code>log --oneline</code> or full command with options.</p>
      
      <p><em>Hint: This tests your knowledge of Git commands covered in TDS for version control.</em></p>
    `,
    validate: (answer) => {
      const submitted = answer.trim();
      
      // Accept with or without 'git ' prefix, and be flexible with spacing
      const normalizeCommand = (cmd) => {
        return cmd.replace(/^git\s+/, '').replace(/\s+/g, ' ').trim();
      };
      
      const normalizedSubmitted = normalizeCommand(submitted);
      const normalizedCorrect = normalizeCommand(correctCommand);
      
      if (normalizedSubmitted === normalizedCorrect) {
        return { correct: true };
      }
      
      return {
        correct: false,
        feedback: `Expected command for scenario ${modValue}: ${correctCommand}. Your email length (${emailLength}) mod 4 = ${modValue}.`,
      };
    },
  };
}
