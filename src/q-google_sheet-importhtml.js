export default function ({ user, weight }) {
  return {
    id: "gs-importhtml",
    weight,
    question: `
Using Google Sheets, import the **first table** from the page below:

https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)

What is the **population of India** as shown in that table?
    `,
    answer: "1428627663",
  };
}
