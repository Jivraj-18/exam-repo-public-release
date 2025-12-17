export default function ({ user, weight }) {
  return {
    id: "imdb-scrape",
    weight,
    question: `
Using IMDb Advanced Search, filter movies with ratings between **3.0 and 3.5**.

From the first 10 results:
What is the **IMDb ID** of the first movie listed?
    `,
    answer: "tt10954984",
  };
}
