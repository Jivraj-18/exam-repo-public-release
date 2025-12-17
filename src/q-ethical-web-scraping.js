/**
 * TDS Exam Question: Ethical Web Scraping with Rate Limiting
 * 
 * Topic: Web Scraping Best Practices
 * Difficulty: Medium
 * Student: 24f2007461
 * Date: December 17, 2025
 */

export const info = {
  name: "q-ethical-web-scraping",
  points: 10,
  desc: `
## Question 3: Ethical Web Scraping with Rate Limiting

**Topic:** Web Scraping Best Practices
**Difficulty:** Medium

**Description:**
You need to scrape job postings from a careers page. The page has multiple job listings with the following HTML structure:

\`\`\`html
<div class="job-card">
    <h3 class="job-title">Software Engineer</h3>
    <span class="company">Tech Corp</span>
    <span class="location">Bangalore</span>
    <span class="salary">₹10-15 LPA</span>
</div>
\`\`\`

Write a Python script that:
1. Checks and respects \`robots.txt\`
2. Implements exponential backoff for rate limiting
3. Uses custom User-Agent header
4. Handles HTTP errors (404, 503, timeout)
5. Extracts job title, company, location, and salary
6. Saves data to a CSV file
7. Logs all activities (successful scrapes and errors)

**Expected Skills Tested:**
- BeautifulSoup HTML parsing
- HTTP request handling
- Rate limiting and backoff strategies
- Error handling and logging
- Ethical scraping practices
- Data extraction and cleaning

**Learning Outcomes:**
- Implement responsible web scraping
- Handle HTTP errors gracefully
- Apply rate limiting strategies
- Extract structured data from HTML
  `,
  tags: ["web-scraping", "beautifulsoup", "requests", "rate-limiting", "ethics", "python"]
};

export default function question(ctx) {
  const solution = `
# Complete Ethical Web Scraping Solution with Rate Limiting

import requests
from bs4 import BeautifulSoup
import time
import logging
from urllib.robotparser import RobotFileParser
import pandas as pd
import csv
from typing import List, Dict, Optional
import random
from datetime import datetime
import os
from urllib.parse import urljoin, urlparse
import json

# Configure comprehensive logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('scraping.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class JobScraper:
    def __init__(self, base_url: str, delay_range: tuple = (1, 3)):
        """
        Initialize the ethical job scraper
        
        Args:
            base_url: Base URL of the website to scrape
            delay_range: Tuple of (min_delay, max_delay) in seconds
        """
        self.base_url = base_url
        self.delay_range = delay_range
        self.session = self._create_session()
        self.scraped_data = []
        self.robots_parser = None
        self.request_count = 0
        
        # Initialize robots.txt checker
        self._setup_robots_checker()
        
        logger.info(f"JobScraper initialized for {base_url}")
    
    def _create_session(self) -> requests.Session:
        """Create a session with appropriate headers"""
        session = requests.Session()
        session.headers.update({
            'User-Agent': 'Mozilla/5.0 (compatible; JobScraper/1.0; Educational Project; +https://example.com/contact)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        })
        return session
    
    def _setup_robots_checker(self):
        """Setup robots.txt parser"""
        try:
            robots_url = urljoin(self.base_url, '/robots.txt')
            self.robots_parser = RobotFileParser()
            self.robots_parser.set_url(robots_url)
            self.robots_parser.read()
            logger.info(f"Successfully loaded robots.txt from {robots_url}")
        except Exception as e:
            logger.warning(f"Could not load robots.txt: {e}")
            self.robots_parser = None
    
    def check_robots_txt(self, url: str) -> bool:
        """
        Check if URL is allowed by robots.txt
        
        Args:
            url: URL to check
            
        Returns:
            bool: True if allowed, False if disallowed
        """
        if self.robots_parser is None:
            logger.warning("No robots.txt available, proceeding with caution")
            return True
        
        user_agent = self.session.headers.get('User-Agent', '*')
        allowed = self.robots_parser.can_fetch(user_agent, url)
        
        if not allowed:
            logger.warning(f"URL {url} is disallowed by robots.txt")
        else:
            logger.debug(f"URL {url} is allowed by robots.txt")
        
        return allowed
    
    def _exponential_backoff(self, attempt: int) -> float:
        """
        Calculate exponential backoff delay
        
        Args:
            attempt: Current attempt number (0-based)
            
        Returns:
            float: Delay in seconds
        """
        base_delay = random.uniform(*self.delay_range)
        exponential_delay = min(base_delay * (2 ** attempt), 60)  # Max 60 seconds
        jitter = random.uniform(0.1, 0.5)  # Add jitter to avoid thundering herd
        
        total_delay = exponential_delay + jitter
        logger.debug(f"Backoff delay for attempt {attempt}: {total_delay:.2f}s")
        return total_delay
    
    def scrape_with_backoff(self, url: str, max_retries: int = 3) -> Optional[requests.Response]:
        """
        Scrape URL with exponential backoff retry logic
        
        Args:
            url: URL to scrape
            max_retries: Maximum number of retry attempts
            
        Returns:
            requests.Response or None if all attempts fail
        """
        if not self.check_robots_txt(url):
            logger.error(f"Robots.txt disallows scraping {url}")
            return None
        
        for attempt in range(max_retries + 1):
            try:
                # Apply delay before request (except first attempt)
                if attempt > 0:
                    delay = self._exponential_backoff(attempt - 1)
                    logger.info(f"Waiting {delay:.2f}s before retry {attempt}")
                    time.sleep(delay)
                elif self.request_count > 0:
                    # Normal delay between requests
                    delay = random.uniform(*self.delay_range)
                    logger.debug(f"Normal delay: {delay:.2f}s")
                    time.sleep(delay)
                
                logger.info(f"Attempting to fetch {url} (attempt {attempt + 1}/{max_retries + 1})")
                
                response = self.session.get(
                    url,
                    timeout=30,
                    allow_redirects=True
                )
                
                self.request_count += 1
                
                # Check response status
                if response.status_code == 200:
                    logger.info(f"Successfully fetched {url}")
                    return response
                elif response.status_code == 429:  # Too Many Requests
                    retry_after = response.headers.get('Retry-After')
                    if retry_after:
                        wait_time = int(retry_after)
                        logger.warning(f"Rate limited. Waiting {wait_time}s as per Retry-After header")
                        time.sleep(wait_time)
                    continue
                elif response.status_code == 503:  # Service Unavailable
                    logger.warning(f"Service unavailable (503) for {url}")
                    continue
                elif response.status_code == 404:
                    logger.error(f"Page not found (404): {url}")
                    return None
                else:
                    logger.warning(f"Unexpected status code {response.status_code} for {url}")
                    continue
                
            except requests.exceptions.Timeout:
                logger.warning(f"Timeout for {url} on attempt {attempt + 1}")
            except requests.exceptions.ConnectionError:
                logger.warning(f"Connection error for {url} on attempt {attempt + 1}")
            except requests.exceptions.RequestException as e:
                logger.error(f"Request exception for {url} on attempt {attempt + 1}: {e}")
            except Exception as e:
                logger.error(f"Unexpected error for {url} on attempt {attempt + 1}: {e}")
        
        logger.error(f"All attempts failed for {url}")
        return None
    
    def extract_job_data(self, soup: BeautifulSoup, source_url: str) -> List[Dict]:
        """
        Extract job data from BeautifulSoup object
        
        Args:
            soup: BeautifulSoup parsed HTML
            source_url: Source URL for reference
            
        Returns:
            List of job dictionaries
        """
        jobs = []
        
        try:
            job_cards = soup.find_all('div', class_='job-card')
            logger.info(f"Found {len(job_cards)} job cards on {source_url}")
            
            for i, card in enumerate(job_cards):
                try:
                    job_data = {
                        'job_title': self._extract_text(card, 'h3.job-title'),
                        'company': self._extract_text(card, 'span.company'),
                        'location': self._extract_text(card, 'span.location'),
                        'salary': self._extract_text(card, 'span.salary'),
                        'source_url': source_url,
                        'scraped_at': datetime.now().isoformat(),
                        'job_id': f"{urlparse(source_url).netloc}_{i+1}"
                    }
                    
                    # Data cleaning and validation
                    job_data = self._clean_job_data(job_data)
                    
                    if self._validate_job_data(job_data):
                        jobs.append(job_data)
                        logger.debug(f"Extracted job: {job_data['job_title']} at {job_data['company']}")
                    else:
                        logger.warning(f"Invalid job data for card {i+1} on {source_url}")
                        
                except Exception as e:
                    logger.error(f"Error extracting job card {i+1} from {source_url}: {e}")
                    continue
            
            logger.info(f"Successfully extracted {len(jobs)} valid jobs from {source_url}")
            
        except Exception as e:
            logger.error(f"Error parsing job data from {source_url}: {e}")
        
        return jobs
    
    def _extract_text(self, container, selector: str) -> str:
        """Extract and clean text from CSS selector"""
        try:
            element = container.select_one(selector)
            if element:
                text = element.get_text(strip=True)
                return text if text else "Not specified"
            return "Not specified"
        except Exception:
            return "Not specified"
    
    def _clean_job_data(self, job_data: Dict) -> Dict:
        """Clean and normalize job data"""
        # Clean salary information
        if job_data['salary'] != "Not specified":
            job_data['salary'] = self._normalize_salary(job_data['salary'])
        
        # Clean location
        if job_data['location'] != "Not specified":
            job_data['location'] = job_data['location'].strip().title()
        
        # Clean company name
        if job_data['company'] != "Not specified":
            job_data['company'] = job_data['company'].strip()
        
        # Clean job title
        if job_data['job_title'] != "Not specified":
            job_data['job_title'] = job_data['job_title'].strip()
        
        return job_data
    
    def _normalize_salary(self, salary_text: str) -> str:
        """Normalize salary format"""
        # Remove extra whitespace
        salary_text = ' '.join(salary_text.split())
        
        # Convert common patterns
        salary_text = salary_text.replace('Rs.', '₹')
        salary_text = salary_text.replace('INR', '₹')
        
        return salary_text
    
    def _validate_job_data(self, job_data: Dict) -> bool:
        """Validate job data completeness"""
        required_fields = ['job_title', 'company']
        
        for field in required_fields:
            if job_data.get(field) == "Not specified" or not job_data.get(field):
                return False
        
        return True
    
    def scrape_jobs(self, urls: List[str]) -> List[Dict]:
        """
        Scrape jobs from multiple URLs
        
        Args:
            urls: List of URLs to scrape
            
        Returns:
            List of all scraped job data
        """
        all_jobs = []
        
        logger.info(f"Starting to scrape {len(urls)} URLs")
        
        for i, url in enumerate(urls, 1):
            logger.info(f"Scraping URL {i}/{len(urls)}: {url}")
            
            response = self.scrape_with_backoff(url)
            if response:
                soup = BeautifulSoup(response.content, 'html.parser')
                jobs = self.extract_job_data(soup, url)
                all_jobs.extend(jobs)
                self.scraped_data.extend(jobs)
            else:
                logger.error(f"Failed to scrape {url}")
        
        logger.info(f"Scraping complete. Total jobs found: {len(all_jobs)}")
        return all_jobs
    
    def save_to_csv(self, data: List[Dict], filename: str = 'scraped_jobs.csv'):
        """
        Save scraped data to CSV file
        
        Args:
            data: List of job dictionaries
            filename: Output filename
        """
        if not data:
            logger.warning("No data to save")
            return
        
        try:
            df = pd.DataFrame(data)
            df.to_csv(filename, index=False, encoding='utf-8')
            logger.info(f"Successfully saved {len(data)} jobs to {filename}")
            
            # Also save as JSON for backup
            json_filename = filename.replace('.csv', '.json')
            with open(json_filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            logger.info(f"Backup saved as {json_filename}")
            
            # Print summary statistics
            self._print_summary(df)
            
        except Exception as e:
            logger.error(f"Error saving data to {filename}: {e}")
    
    def _print_summary(self, df: pd.DataFrame):
        """Print summary statistics"""
        print("\\n" + "="*50)
        print("SCRAPING SUMMARY")
        print("="*50)
        print(f"Total jobs scraped: {len(df)}")
        print(f"Unique companies: {df['company'].nunique()}")
        print(f"Unique locations: {df['location'].nunique()}")
        print("\\nTop 5 companies by job count:")
        print(df['company'].value_counts().head())
        print("\\nTop 5 locations by job count:")
        print(df['location'].value_counts().head())

# Example usage and demonstration
def create_sample_html():
    """Create a sample HTML file for testing"""
    sample_html = """
<!DOCTYPE html>
<html>
<head>
    <title>Sample Job Board</title>
</head>
<body>
    <h1>Job Listings</h1>
    
    <div class="job-card">
        <h3 class="job-title">Senior Software Engineer</h3>
        <span class="company">Tech Solutions Inc</span>
        <span class="location">Bangalore</span>
        <span class="salary">₹15-25 LPA</span>
    </div>
    
    <div class="job-card">
        <h3 class="job-title">Data Scientist</h3>
        <span class="company">AI Innovations</span>
        <span class="location">Mumbai</span>
        <span class="salary">₹20-30 LPA</span>
    </div>
    
    <div class="job-card">
        <h3 class="job-title">Frontend Developer</h3>
        <span class="company">Web Dynamics</span>
        <span class="location">Pune</span>
        <span class="salary">₹8-15 LPA</span>
    </div>
    
    <div class="job-card">
        <h3 class="job-title">DevOps Engineer</h3>
        <span class="company">Cloud Systems</span>
        <span class="location">Hyderabad</span>
        <span class="salary">₹12-20 LPA</span>
    </div>
</body>
</html>
    """
    
    with open('sample_jobs.html', 'w', encoding='utf-8') as f:
        f.write(sample_html)
    
    logger.info("Created sample_jobs.html for testing")

def main():
    """Main function demonstrating the scraper"""
    
    # Create sample HTML file for testing
    create_sample_html()
    
    # For demonstration, we'll use a file:// URL
    # In practice, you would use actual websites
    sample_url = f"file://{os.path.abspath('sample_jobs.html')}"
    
    # Initialize scraper
    scraper = JobScraper(
        base_url="https://example-jobs.com",
        delay_range=(2, 4)  # 2-4 seconds between requests
    )
    
    # Scrape jobs
    urls_to_scrape = [sample_url]  # Add more URLs in practice
    
    jobs = scraper.scrape_jobs(urls_to_scrape)
    
    # Save results
    if jobs:
        scraper.save_to_csv(jobs, 'scraped_jobs_results.csv')
    else:
        logger.warning("No jobs were scraped")
    
    logger.info("Scraping session completed")

if __name__ == "__main__":
    main()
  `;

  const requirements = `
# Requirements for Ethical Web Scraping Project

requests==2.31.0
beautifulsoup4==4.12.2
pandas==2.0.3
lxml==4.9.3
html5lib==1.1
  `;

  const robotsTxtExample = `
# Example robots.txt file
User-agent: *
Allow: /jobs/
Allow: /careers/
Disallow: /admin/
Disallow: /private/
Crawl-delay: 1

User-agent: JobScraper
Allow: /jobs/
Crawl-delay: 2
  `;

  return {
    type: "python",
    solution: solution,
    requirements: requirements,
    additionalFiles: {
      "robots.txt": robotsTxtExample
    },
    testInstructions: `
1. Install dependencies: pip install requests beautifulsoup4 pandas lxml
2. Run the script: python job_scraper.py
3. Check generated files: scraped_jobs_results.csv and scraping.log
4. Verify ethical practices in the logs
    `,
    keyFeatures: [
      "Robots.txt compliance checking",
      "Exponential backoff with jitter",
      "Comprehensive error handling",
      "Rate limiting between requests",
      "Detailed logging of all activities",
      "Data validation and cleaning",
      "Multiple output formats (CSV, JSON)"
    ]
  };
}
