\# Question 5: Data Preparation - Extract API Response Data (1 mark)



\*\*Scenario:\*\* You are a backend developer at \*\*WeatherInsight Corp\*\*. You received a JSON response from a weather API and need to extract specific temperature data for analysis.



\## Task:



Given this JSON response from the weather API:



{

"location": "Mumbai",

"forecast": {

"daily": \[

{"date": "2025-12-18", "temperature": {"max": 32, "min": 24}},

{"date": "2025-12-19", "temperature": {"max": 31, "min": 23}},

{"date": "2025-12-20", "temperature": {"max": 33, "min": 25}}

]

},

"units": "celsius"

}



text



Write Python code to:

1\. Parse this JSON (stored in variable `json\_response`)

2\. Extract all \*\*maximum temperatures\*\* from the daily forecast

3\. Calculate the \*\*average\*\* of these maximum temperatures

4\. Round to \*\*1 decimal place\*\*

5\. Submit the result as a float



\*\*Enter the average maximum temperature:\*\*

\## Implementation Hints:



\- Use `json.loads()` if parsing from string

\- Access nested dictionaries using bracket notation

\- Use list comprehension to extract all max temperatures: `\[day\["temperature"]\["max"] for day in ...]`

\- Use `sum()` and `len()` for average calculation

\- Use `round(value, 1)` for rounding



\## Code Template:



import json



json\_response = '''{"location": "Mumbai", ...}'''

data = json.loads(json\_response)



Extract max temperatures

Calculate average

Round and submit

text



\## Learning Resources:



\- Python JSON Module Documentation

\- Working with Nested JSON Data

