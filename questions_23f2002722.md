Question 1: Development Tools (Bash/Git)

Scenario: You are writing a Bash script to automate the backup of a data science project. You need to check if a directory named data_backup exists before running the cp command. Question: Write the single line of Bash code (using an if statement or a logical operator) that checks for the existence of the directory and prints "Directory exists" if it does.

Question 2: Deployment Tools (FastAPI)

Scenario: You have built a FastAPI model inference server. By default, FastAPI runs on http://127.0.0.1:8000. Question: When deploying this inside a Docker container, why is it often necessary to change the host to 0.0.0.0 instead of 127.0.0.1? Explain the difference in network accessibility.

Question 3: AI Coding & LLMs (Prompt Engineering)

Scenario: You want an LLM to generate a Python function that cleans a dataset, but it keeps providing conversational text. Question: Describe the "Few-Shot" prompting technique and provide an example of how you would use it to ensure the LLM strictly returns only a Python dictionary of cleaned data.

Question 4: Data Sourcing (APIs/Web)

Scenario: You are using the requests library in Python to fetch data from a restricted API that requires a Bearer Token. Question: Write the Python code snippet showing how to correctly pass an authorization token in the headers parameter of a requests.get() call.

Question 5: Data Preparation & Analysis (Pandas)

Scenario: You have a CSV file where the values are separated by semicolons (;) instead of commas, and the first two rows are metadata that should be ignored. Question: Write the pd.read_csv() command with the specific parameters needed to load this file correctly into a DataFrame named df.

Since the deadline is just over an hour away (Thursday, 18 December 2025, 11:59 PM), here are 5 additional questions to bring your total to 10. These focus on the later parts of your syllabus (Large Language Models, Data Sourcing, and Project workflows).

Part 1: Additional 5 Questions (Totaling 10)
Question 6: Large Language Models (LLMs)

Scenario: You are using an LLM to generate Python code. You notice the model often "hallucinates" libraries that do not exist. Question: Name two parameters in an OpenAI-style API call (e.g., temperature, top_p) that you would adjust to make the model's output more deterministic and less "creative," and explain which direction you would move them.

Question 7: Data Sourcing (Scraping/Ethics)

Scenario: You are building a data sourcing pipeline for a TDS project. Before scraping a website, you check its robots.txt file. Question: If the robots.txt file contains Disallow: /api/v1/, but your scraper is targeting https://example.com/api/v1/data, what is the ethical and technical implication of proceeding with the scrape?

Question 8: Deployment Tools (Environment Variables)

Scenario: You are deploying a FastAPI application that requires a database password and an API Key. Question: Why is it considered a security risk to hardcode these values in your main.py file, and what is the standard tool or file used in Python development to manage these values locally during the development phase?

Question 9: AI Coding (GitHub Copilot/Tabnine)

Scenario: When using an AI coding assistant, you provide a comment: # Function to calculate the rolling mean of a pandas column with a window of 5. Question: Explain the concept of "Context Window" in the background of the AI tool and why the code it generates might change if you have other files open in your editor versus just a single empty file.

Question 10: Data Preparation (Handling Missing Values)

Scenario: In a TDS project, you have a dataset where 40% of the "Age" column is missing. The data is "Missing at Random" (MAR). Question: Describe the difference between "Dropping" (Deletion) and "Imputation" (filling in) for this column. Provide one reason why simple Mean Imputation might be dangerous for the statistical distribution of your features.
