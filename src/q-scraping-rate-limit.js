export default function ({ user, weight = 1 }) {
  return {
    id: "q-scraping-rate-limit",
    weight,
    question: `
      <h3>Advanced Web Scraping: Rate-Limited API</h3>
      <p>You need to scrape 10,000 product pages from an e-commerce API that:</p>
      <ul>
        <li>Rate limit: 100 requests per minute</li>
        <li>Returns 429 error if exceeded</li>
        <li>Requires exponential backoff on errors</li>
        <li>Some requests randomly timeout (5% failure rate)</li>
      </ul>
      <p><strong>Write Python code using asyncio and aiohttp that respects rate limits and handles errors.</strong></p>
    `,
    input: "textarea",
    answer: String.raw`import asyncio
import aiohttp
from datetime import datetime

class RateLimitedScraper:
    def __init__(self, rate_limit=100, window=60):
        self.rate_limit = rate_limit
        self.semaphore = asyncio.Semaphore(rate_limit)
        
    async def fetch_with_retry(self, session, url, max_retries=3):
        for attempt in range(max_retries):
            try:
                async with self.semaphore:
                    async with session.get(url, timeout=10) as response:
                        if response.status == 429:
                            wait_time = 2 ** attempt
                            await asyncio.sleep(wait_time)
                            continue
                        response.raise_for_status()
                        return await response.json()
            except asyncio.TimeoutError:
                await asyncio.sleep(2 ** attempt)
        return None

async def scrape_products(product_ids):
    scraper = RateLimitedScraper(rate_limit=100)
    async with aiohttp.ClientSession() as session:
        tasks = [scraper.fetch_with_retry(session, f"https://api.example.com/products/{pid}") for pid in product_ids]
        results = await asyncio.gather(*tasks, return_exceptions=True)
    return results`,
  };
}
