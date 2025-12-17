export default {
    id: "excel-vlookup",
    title: "Excel VLOOKUP",
    description: "Use VLOOKUP to find a value in a table.",
    question: \`
You have a product table in range A2:C100 (ID, Name, Price).
In cell E2, you have a Product ID.

Write the formula for cell F2 to lookup the Price of the product in E2.
\`,
  answer: \`
=VLOOKUP(E2, A2:C100, 3, FALSE)
\`
};
