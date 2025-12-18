export default {
  title: "Python: Pandas Aggregation",
  question: "What is the output of the following Pandas operation? <br><br> <pre>import pandas as pd\ndf = pd.DataFrame({'A': [1, 2, 2], 'B': [10, 20, 30]})\nprint(df.groupby('A')['B'].sum()[2])</pre>",
  options: ["20", "30", "50", "10"],
  answer: "50",
  marks: 1
};
