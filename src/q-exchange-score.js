import { http } from "../utils/http.js";
import cheerio from "cheerio";

export async function countHighTrustExchanges() {
  const url = "https://www.coingecko.com/en/exchanges?page=5";
  const { data } = await http.get(url);
  const $ = cheerio.load(data);

  let count = 0;

  $("table tbody tr").each((_, row) => {
    const score = parseInt(
      $(row).find("td").eq(2).text().trim(),
      10
    );
    if (!isNaN(score) && score >= 7) count++;
  });

  return count;
}
