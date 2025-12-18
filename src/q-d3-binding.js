export default async function question({ user, weight = 1 }) {
  const id = "q-d3-binding";

  return {
    id,
    title: "D3 Data Binding",
    weight,
    description: `
      <p><strong>Bind data to SVG circles using D3.js:</strong></p>
      <p>Given this data array:</p>
      <pre>const data = [
  { x: 10, y: 20, sales: 100 },
  { x: 50, y: 80, sales: 200 },
  { x: 30, y: 60, sales: 150 }
];</pre>
      <p>Write D3 code that:</p>
      <ol>
        <li>Selects an SVG element with id <code>#chart</code></li>
        <li>Binds the data array using <code>.data(data)</code></li>
        <li>Enters circles using <code>.enter().append("circle")</code></li>
        <li>Sets circle attributes: <code>cx</code>, <code>cy</code> from x/y, and <code>r</code> = sales/50</li>
      </ol>
    `,
    inputType: "textarea",
    placeholder: `d3.select("#chart")\n  .selectAll("circle")\n  .data(data)\n  .enter()\n  .append("circle")\n  // Set attributes...`,
    answer: async (code) => {
      if (!code || code.trim().length < 40) return false;
      const required = ["d3.select", ".data", ".enter()", ".append(", "circle"];
      return required.every((word) => code.includes(word));
    },
  };
}