\# Question 3: Data Analysis - Regional Sales Aggregation (1 mark)



\*\*Scenario:\*\* You are a business analyst at \*\*GlobalTech Enterprises\*\*. The sales team needs to identify which product category generated the \*\*highest total revenue\*\* in the \*\*West\*\* region during \*\*Q3 2025\*\* (July-September).



\## Task:



1\. Download the sales transactions CSV file

2\. Load the CSV using pandas

3\. Filter rows where:

&nbsp;  - `region` equals "West"

&nbsp;  - `month` is in \["July", "August", "September"]

4\. Group by `product\_category`

5\. Calculate sum of `revenue` for each category

6\. Identify the category with maximum total revenue

7\. Submit the category name (case-sensitive)



\## Data Format:



\- \*\*File:\*\* sales\_transactions.csv

\- \*\*Columns:\*\* transaction\_id, date, region, product\_category, revenue, month

\- \*\*Rows:\*\* ~500 transactions

\- \*\*Regions:\*\* North, South, East, West

\- \*\*Categories:\*\* Electronics, Furniture, Clothing, Books, Toys



\*\*Enter the product category with highest Q3 West region revenue:\*\*





