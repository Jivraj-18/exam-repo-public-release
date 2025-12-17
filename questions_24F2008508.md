# TDS Bonus Activity: 5 Practice Questions

### 1. FastAPI: Path Parameter Validation
**Question:** Create a FastAPI endpoint `/process-dataset/{dataset_id}` where the `dataset_id` must follow a specific pattern: it must start with "ds_" followed by exactly four digits (e.g., ds_1234). Use the `Path` class for validation.

**Solution:**
```python
from fastapi import FastAPI, Path

app = FastAPI()

@app.get("/process-dataset/{dataset_id}")
async def process_data(dataset_id: str = Path(..., pattern=r"^ds_\d{4}$")):
    return {"status": "processing", "id": dataset_id}
2. Bash: Log Filtering and Transformation
Question: You have a file named logs.txt where each line is comma-separated: timestamp,level,message. Write a Bash command to filter only the lines with the "ERROR" level and save only the "message" column to a file named critical_errors.txt.

Solution:

Bash

grep "ERROR" logs.txt | cut -d ',' -f 3 > critical_errors.txt
3. Git: Resolving Merge Conflicts
Question: You are on the main branch and tried to merge a branch called feature-alpha. A conflict occurred in model.py. What are the Git commands to add the resolved file and finalize the merge?

Solution:

Bash

git add model.py
git commit -m "Fix merge conflict in model.py"
4. Docker: Multi-Stage Build Concept
Question: Write a simple Dockerfile for a Python script analysis.py that:

Uses python:3.9-slim as the base image.

Sets the working directory to /app.

Installs the pandas library.

Runs the script using CMD.

Solution:

Dockerfile

FROM python:3.9-slim
WORKDIR /app
COPY analysis.py .
RUN pip install --no-cache-dir pandas
CMD ["python", "analysis.py"]
5. SQL: Conditional Aggregation
Question: Given a table experiments with columns name, duration_minutes, and result ('Success' or 'Failure'), write a SQL query to find the average duration of experiments that were a 'Success' and have the word "Neural" in their name.

Solution:

SQL

SELECT AVG(duration_minutes) 
FROM experiments 
WHERE result = 'Success' AND name LIKE '%Neural%';
