import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1.5 }) {
  const id = "q-jq-slice-indices";
  const title = "JQ Array Slicing";
  const random = seedrandom(`${user.email}#${id}`);

  // Generate random array
  const length = 6;
  const arr = Array.from({ length }, () => Math.floor(random() * 100));
  
  const question = html`
    <p>You have a JSON array: <code>${JSON.stringify(arr)}</code></p>
    <p>You run the <strong>jq</strong> filter: <code>.[1:-1]</code></p>
    <p>Provide the resulting JSON array exactly (e.g., <code>[1,2,3]</code>).</p>
  `;

  return {
    id,
    title,
    question,
    // Syllabus mapping: Data Prep > JSON > jq
    check: (answer) => {
      // Logic: [1:-1] slices from index 1 (inclusive) to the last element (exclusive).
      // It removes the first and the last element.
      const expectedArr = arr.slice(1, -1);
      const expectedJson = JSON.stringify(expectedArr);
      const expectedSpaced = JSON.stringify(expectedArr, null, 1).replace(/\s+/g, ''); // normalize
      
      const userClean = String(answer).replace(/\s+/g, '');
      
      if (userClean === expectedJson.replace(/\s+/g, '')) return true;
      throw new Error(`Incorrect. .[1:-1] should remove the first and last elements.`);
    },
    weight,
  };
}
