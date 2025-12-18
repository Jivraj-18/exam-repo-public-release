export default async function ({ user, weight = 1 }) {
  return {
    id: "streamlit-data-dashboard",
    title: "Build a Streamlit Data Dashboard",
    description: `
You are given a CSV file named **sales.csv** with the following columns:

- region (string)
- revenue (number)
- orders (number)

### Task
Create a **Streamlit application** that:

1. Loads **sales.csv**
2. Adds a **sidebar multiselect** to filter by region
3. Displays:
   - Total revenue (sum)
   - Total orders (sum)
4. Shows the filtered data in a table
5. Runs successfully using:
   \`\`\`
   streamlit run app.py
   \`\`\`

### Deployment
Deploy the app (Streamlit Cloud or equivalent) so it is publicly accessible.

### Submission
Paste **only the public Streamlit app URL** below.

> Example format:
> https://username-app-name.streamlit.app
    `,
    type: "url",
    weight,
    solution: null,
  };
}
