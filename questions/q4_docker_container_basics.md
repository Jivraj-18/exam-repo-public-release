\# Question 4: Development Tools - Docker Container Deployment (1 mark)



\*\*Scenario:\*\* You are a DevOps engineer at \*\*CloudScale Systems\*\*. You need to containerize a Python Flask application and run it on port 5000.



\## Task:



You have a Flask app in `app.py` and a `requirements.txt` file. Create a Dockerfile with these specifications:



1\. Use Python 3.9 slim base image

2\. Set working directory to `/app`

3\. Copy `requirements.txt` and install dependencies

4\. Copy all application files

5\. Expose port 5000

6\. Run the application using `python app.py`



\*\*Write the complete Dockerfile content:\*\*



Your answer should be the complete Dockerfile with each instruction on a new line.



\## Dockerfile Requirements:



\- Base image: `python:3.9-slim`

\- Working directory: `/app`

\- Install: `pip install -r requirements.txt`

\- Expose: Port 5000

\- Command: `python app.py`



\## Example Format:





