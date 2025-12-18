# Tools in Data Science – Bonus Questions
**Roll Number:** 24f2000871

---

### Question 1 (MCQ) – Git Version Control

A student is working on a feature branch named `feature-update` and wants to bring the latest changes from the `main` branch into their current branch without losing their local commit history. Which sequence of commands is most appropriate to achieve this and then update the remote repository?

Options:
a) git checkout main, git pull, git checkout feature-update, git merge main, git push  
b) git checkout feature-update, git pull origin main, git push  
c) git fetch origin, git reset --hard origin/main, git push --force  
d) git checkout main, git push origin feature-update

---

### Question 2 (Numeric) – Python (Pandas)

Consider a Pandas DataFrame df with 100 rows and 3 columns (A, B, C).  
Column A contains integers from 0 to 99.

You execute the following code:

df = df.iloc[10:60]  
print(df.shape[0])

What number will be printed to the console?

---

### Question 3 (MSQ) – Linux Shell Commands

Which of the following commands can be used in a Linux terminal to view the contents of a file named data_log.txt?  
(Select all that apply)

Options:
a) cat data_log.txt  
b) ls data_log.txt  
c) more data_log.txt  
d) touch data_log.txt  
e) less data_log.txt  
f) tail data_log.txt

---

### Question 4 (MCQ) – SQL

You have a table Orders with a column CustomerID.  
You want to find the number of unique customers who have placed at least one order.

Which SQL query should you use?

Options:
a) SELECT COUNT(CustomerID) FROM Orders;  
b) SELECT DISTINCT COUNT(CustomerID) FROM Orders;  
c) SELECT COUNT(DISTINCT CustomerID) FROM Orders;  
d) SELECT UNIQUE(CustomerID) FROM Orders;

---

### Question 5 (Short Answer) – Regular Expressions

In the regular expression pattern ERR[0-9]{3}, what does the quantifier {3} represent?  
Give one example of a string that would match this pattern and one example that would not.
