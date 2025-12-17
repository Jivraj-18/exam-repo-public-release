export default function({ user, weight }) {
  return {
    id: "q-24F1001023-5",
    type: "mcq",
    text: "You want to schedule a scraping script to run every day at 8:00 AM UTC using GitHub Actions. Which cron schedule expression is correct?",
    options: [
      "cron: '0 8 * * *'",
      "cron: '8 0 * * *'",
      "cron: '* 8 * * *'",
      "cron: '0 8 daily'"
    ],
    answer: "cron: '0 8 * * *'",
    weight: weight
  }
}