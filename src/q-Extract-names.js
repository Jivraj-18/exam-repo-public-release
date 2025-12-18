import { http } from "../utils/http.js";
import cheerio from "cheerio";

export async function scrapeTopCoins() {
  const url = "https://www.coingecko.com/en/coins?page=2";
  const { data } = await http.get(url);
  const $ = cheerio.load(data);

  const coins = [];

  $("table tbody tr").each((_, row) => {
    const name = $(row)
      .find("a.tw-hidden.font-bold")
      .first()
      .text()
      .trim();

    if (name) coins.push(name);
  });

  return coins.slice(0, 50);
}
