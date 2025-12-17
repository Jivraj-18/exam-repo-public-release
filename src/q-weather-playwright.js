import { html } from "lit-html";

export default function ({ user, weight }) {
  return {
    id: "q-weather-playwright",
    title: "Conditional Playwright Scraping",
    weight: weight || 1,
    description: html`
      <p>Use <b>Playwright</b> to scrape the live dashboard at <code>https://sanand0.github.io/tdsdata/weather-live/</code>.</p>
      <p>The page updates every 5 seconds. Wait for the 'Condition' element to show <b>'Rainy'</b>, then immediately extract and sum all values in the 'Precipitation' column of the data table.</p>
    `,
    help: [
      html`Use <code>page.wait_for_selector()</code> with a text-based locator to detect the condition change.`,
      html`Ensure your script handles JavaScript execution, as the table data is populated dynamically.`
    ]
  };
}