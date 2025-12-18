import { http } from "../utils/http.js";
import cheerio from "cheerio";

export async function scrapeTopDefiTokens() {
  const url =
    "https://www.coingecko.com/en/categories/decentralized-finance-defi";

  const { data } = await http.get(url);
  const $ = cheerio.load(data);

  const tokens = [];

  $("table tbody tr")
    .slice(0, 10)
    .each((_, row) => {
      const name = $(row)
        .find("a.tw-hidden.font-bold")
        .first()
        .text()
        .trim();

      const marketCap = $(row)
        .find("td")
        .eq(3)
        .text()
        .trim();

      if (name && marketCap) {
        tokens.push({ token: name, marketCap });
      }
    });

  return tokens;
}
