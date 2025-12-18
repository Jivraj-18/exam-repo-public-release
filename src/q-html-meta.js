export default function ({ weight = 0.5 }) {
  return {
    id: "html_meta_description",
    title: "HTML Meta Description",
    description: `
Visit the webpage.
Extract <meta name="description"> content.
`,
    answer: "string value",
    weight,
  };
}