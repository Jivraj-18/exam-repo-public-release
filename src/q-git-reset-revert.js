/**
 * Question: Git Reset vs Revert
 * Topic: Git version control commands
 */

export default async function question() {
  return {
    id: "git-reset-vs-revert",
    title: "Git Reset vs Revert",
    type: "short-answer",
    prompt: `You accidentally committed sensitive API keys to your local Git repository. The commit has NOT been pushed to the remote repository yet.

Which Git command should you use to completely remove this commit from your local history?

Choose one: reset or revert

Enter your answer:`,
    answer: "reset",
    evaluate: async (userAnswer) => {
      const normalized = userAnswer.trim().toLowerCase();
      
      if (normalized === "reset" || normalized === "git reset") {
        return { 
          correct: true, 
          feedback: "Correct! 'git reset' removes commits from local history. Since it hasn't been pushed, reset is safe and removes the sensitive data completely." 
        };
      }
      
      if (normalized === "revert" || normalized === "git revert") {
        return { 
          correct: false, 
          feedback: "Incorrect. 'git revert' creates a new commit that undoes changes, but the original commit (with API keys) remains in history. Use 'reset' to remove unpushed commits." 
        };
      }
      
      return { 
        correct: false, 
        feedback: `'${userAnswer}' is not the correct command. Use 'reset' to remove local commits or 'revert' to undo pushed commits safely.` 
      };
    },
    weight: 1
  };
}