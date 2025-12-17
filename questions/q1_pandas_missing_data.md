\# Question 1: Data Preparation - Handle Missing Values in Customer Dataset (1 mark)



\*\*Scenario:\*\* You are a data analyst at \*\*RetailFlow Analytics\*\*. The customer database has missing values in critical columns that need to be handled before analysis.



\## Task:



1\. Download the customer data CSV file

2\. Load the CSV using pandas

3\. For the `age` column: fill missing values with the \*\*median\*\* age

4\. For the `city` column: fill missing values with the string \*\*"Unknown"\*\*

5\. Count total rows where `purchase\_amount` is \*\*NOT\*\* missing

6\. Submit the count as an integer



\## Data Format:



\- \*\*File:\*\* customer\_data.csv

\- \*\*Columns:\*\* customer\_id, name, age, city, purchase\_amount

\- \*\*Rows:\*\* ~150 customers

\- \*\*Missing values:\*\* Present in age (~10%), city (~15%), and purchase\_amount (~8%)



\*\*Enter the count of rows with non-missing purchase\_amount:\*\*





