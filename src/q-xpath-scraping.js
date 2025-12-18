import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-xpath-scraping";
  const title = "XPath-based Product Price Extraction";

  let expected;

  const answer = async (value) => {
    const price = value.trim();

    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      throw new Error("Invalid price format");
    }

    if (expected === undefined) {
      const response = await fetch(
        "/proxy/https://books.toscrape.com/catalogue/category/books/travel_2/index.html"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch page");
      }

      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const articles = Array.from(doc.querySelectorAll("article.product_pod"));
      const target = articles.find((a) =>
        a.querySelector("h3 a")?.getAttribute("title") === "It's Only the Himalayas"
      );

      if (!target) {
        throw new Error("Book not found");
      }

      const priceText = target
        .querySelector(".product_price .price_color")
        ?.textContent.replace(/[^0-9.]/g, "");

      expected = priceText;
    }

    if (price !== expected) {
      throw new Error("Incorrect price");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h3>PriceTracker - E-commerce Price Monitoring</h3>
      <p>
        PriceTracker monitors book prices using XPath-based extraction to ensure
        stability across layout changes.
      </p>
      <p>
        Visit
        <code>https://books.toscrape.com/catalogue/category/books/travel_2/index.html</code>
        and extract the price of the book
        <strong>"It's Only the Himalayas"</strong> using XPath.
      </p>
      <p>
        Return only the numeric price value without the currency symbol.
      </p>
      <label for="${id}" class="form-label">
        Price (numeric only):
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="text"
        placeholder="e.g., 45.17"
        required
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
