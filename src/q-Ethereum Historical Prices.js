import { http } from "../utils/http.js";
import cheerio from "cheerio";

export async function scrapeEthHistorical() {
  const url =
    "https://www.coingecko.com/en/coins/ethereum/historical_data/usd?start_date=2023-01-01&end_date=2023-12-31";

  const { data } = await http.get(url);
  const $ = cheerio.load(data);

  const records = [];

  $("table tbody tr").each((_, row) => {
    const cols = $(row).find("td");
    if (cols.length >= 2) {
      records.push({
        date: $(cols[0]).text().trim(),
        closePrice: $(cols[1]).text().trim()
      });
    }
  });

  return records;
}
