export default ({ user, weight }) => ({
  id: "inventory-sync-check",
  weight: weight || 1.0,
  question: /* html */ `
    <h3>Case Study: eShopCo Inventory Synchronization</h3>
    <p>Download the inventory snapshot: <a href="/files/inventory.json" target="_blank">inventory.json</a>.</p>
    <p>The file contains an array of products. Use a Python one-liner in your terminal to count how many products have <code>"stock": 0</code>.</p>
    <p>Run the following command:</p>
    <pre><code>python3 -c "import json; data=json.load(open('inventory.json')); print(len([p for p in data if p['stock'] == 0]))"</code></pre>
    <p>What is the <b>numeric output</b> of this command?</p>
  `,
  type: "number-input",
  placeholder: "0",
});