import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  return {
    id: "q-scraping-header",
    type: "input",
    weight,
    question: html`
      <p>
        <strong>Data Sourcing:</strong> You are writing a Python script to scrape a website, 
        but the server returns a <code>403 Forbidden</code> error because it detects a bot. 
        <br><br>
        Which specific <strong>HTTP request header</strong> should you modify to make your 
        script look like a real web browser (e.g., Chrome/Firefox)?
      </p>
    `,
    answer: "User-Agent",
    check: (response) => {
      const clean = response.trim().toLowerCase().replace(/-/g, "");
      return clean === "useragent";
    },
  };
}