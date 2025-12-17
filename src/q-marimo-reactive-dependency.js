export default async function ({ user, weight = 1 }) {
  return {
    id: "marimo_reactive_dependency",
    weight,

    question: `
### Interactive Data Analysis with Marimo — Reactive Dependencies

Marimo is a reactive Python notebook system where **cells automatically re-run**
when their dependencies change. Unlike Jupyter, cells cannot be executed out of order,
which ensures reproducibility and eliminates hidden state bugs.

You are building a small exploratory analysis using Marimo to demonstrate
reactive behavior between cells.

#### Task

Create a Marimo notebook with the following requirements:

1. Include your email address as a Python comment:
   \`${user.email}\`

2. Create **Cell A** that defines a numeric variable \`x\` with value **10**.

3. Create **Cell B** that computes \`y = x * 3\`.

4. Create **Cell C** that displays dynamic Markdown showing:
   \`The current value of y is <value>\`

5. Change the value of \`x\` in Cell A from **10** to **20**.

Because Marimo is reactive, dependent cells update automatically.

📌 **Question**  
After changing \`x\` to **20**, what is the **updated value displayed for \`y\`**?

(Enter only the numeric value.)
    `,

    type: "number",

    answer: 60,
  };
}
