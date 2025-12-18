import { http } from "../utils/http.js";
import cheerio from "cheerio";

export async function countExchangeTypes() {
  const url = "https://www.coingecko.com/en/exchanges?page=1";
  const { data } = await http.get(url);
  const $ = cheerio.load(data);

  let cex = 0;
  let dex = 0;

  $("table tbody tr").each((_, row) => {
    const label = $(row)
      .find("span.badge")
      .text()
      .toLowerCase();

    if (label.includes("centralized")) cex++;
    if (label.includes("decentralized")) dex++;
  });

  return { cex, dex };
}
