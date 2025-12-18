import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-sql-invoice-sum";
    const title = "SQL: Calculate Total Revenue per Client";

    const random = seedrandom(`${user.email}#${id}`);

    const clients = [101, 102, 103, 104, 105];
    const invoices = Array.from({ length: 20 }, (v, i) => ({
        id: i + 1,
        client_id: clients[Math.floor(random() * clients.length)],
        amount: Math.floor(random() * 500) + 50,
        date: `2024-${Math.floor(random() * 12) + 1}-${Math.floor(random() * 28) + 1}`
    }));

    const targetClient = clients[Math.floor(random() * clients.length)];
    const answer = invoices
        .filter(inv => inv.client_id === targetClient)
        .reduce((sum, inv) => sum + inv.amount, 0);

    const question = html`
    <div class="mb-3">
      <p>
        You have a table named <code>invoices</code> with the following data:
      </p>
      <table class="table table-sm table-striped table-bordered" style="width: auto;">
        <thead>
          <tr><th>id</th><th>client_id</th><th>amount</th><th>date</th></tr>
        </thead>
        <tbody>
          ${invoices.map(inv => html`
            <tr>
              <td>${inv.id}</td>
              <td>${inv.client_id}</td>
              <td>${inv.amount}</td>
              <td>${inv.date}</td>
            </tr>
          `)}
        </tbody>
      </table>
      <p>
        <strong>Question:</strong> What is the result of the following SQL query?
      </p>
      <pre><code class="language-sql">SELECT SUM(amount) FROM invoices WHERE client_id = ${targetClient};</code></pre>

      <label for="${id}" class="form-label">Total Amount:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
