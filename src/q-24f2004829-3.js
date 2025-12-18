export default function ({ user, weight }) {
  return {
    id: "q-24f2004829-3",
    title: "Word frequency counter",
    weight,
    statement: `
You are given a string of text. Words are separated by spaces and punctuation (, . ! ?) should be ignored.

Implement the function wordFrequency(text) that returns an object mapping each lowercase word to the number of times it appears.

Example:
Input:
"Hello, hello world!"

Output:
{ "hello": 2, "world": 1 }
`,
    starterCode: `
function wordFrequency(text) {
  // TODO: Write your code here
}

module.exports = wordFrequency;
`,
    tests: [
      {
        name: "basic punctuation and case",
        input: ["Hello, hello world!"],
        expected: { hello: 2, world: 1 },
      },
      {
        name: "multiple spaces",
        input: ["data   science  is  fun"],
        expected: { data: 1, science: 1, is: 1, fun: 1 },
      },
      {
        name: "empty string",
        input: [""],
        expected: {},
      },
    ],
  };
}
