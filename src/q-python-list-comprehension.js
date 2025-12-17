export default {
  id: "python-list-comprehension",
  title: "Python List Comprehension",
  description: "Create a list of squares using list comprehension.",
  question: \`
Given a list of numbers:
\`\`\`python
numbers = [1, 2, 3, 4, 5]
\`\`\`
Write a list comprehension to create a new list containing the squares of these numbers.
\`,
  answer: \`
squares = [x**2 for x in numbers]
\`
};
