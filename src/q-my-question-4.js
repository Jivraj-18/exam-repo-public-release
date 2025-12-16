export default function ({ weight = 1 }) {
  return {
    id: "q4-pandas-warning",
    weight,
    question: `
What warning occurs when modifying a view instead of a copy in pandas?
    `,
    answer: "SettingWithCopyWarning",
  };
}
