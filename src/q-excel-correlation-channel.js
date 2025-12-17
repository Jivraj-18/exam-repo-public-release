export default function ({ user, weight = 1 }) {
  return {
    id: "excel_channel_correlation",
    weight,

    prompt: `
**Excel: Channel Spend Efficiency Analysis**

A SaaS company ran campaigns across five acquisition channels.
Each campaign tracked **Channel_Spend_USD** and **New_Signups**.

**Task**
1. Open the dataset in Excel.
2. Filter campaigns by **channel**.
3. Compute the Pearson correlation using:
   \`=CORREL(Channel_Spend_USD, New_Signups)\`
4. Identify the channel with the **strongest positive correlation**.

**Deliverable**
Return only the channel name.
    `,

    answer: "Search",

    tolerance: 0,
  };
}
