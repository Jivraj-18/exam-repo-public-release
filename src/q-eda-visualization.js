export default function ({ user, weight = 1 } = {}) {
  return {
    id: "q-eda-visualization",
    title: "Exploratory Data Analysis and Insights",
    weight,
    prompt: /* html */ `
      <p>
        You are provided a sales dataset containing:
        <code>date, region, product_category, units_sold, revenue</code>.
      </p>

      <p>
        <b>Tasks:</b>
        <ol>
          <li>List three meaningful insights you would extract from this dataset.</li>
          <li>For each insight, specify the visualization you would use.</li>
          <li>Briefly explain how each insight could support a business decision.</li>
        </ol>
      </p>
    `
  };
}
