import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-sqlite-select-limit";
  const title = "SQL: Previewing Data";

  const random = seedrandom(`${user.email}#${id}`);
  const tables = ["customers", "orders", "transactions", "logs"];
  const limits = [5, 10, 15, 20];
  
  const table = pick(tables, random);
  const limit = pick(limits, random);

  const answer = async (value) => {
    const q = value.trim().toLowerCase().replace(/;$/, '');
    const expected = `select * from ${table} limit ${limit}`;
    
    if (q !== expected) {
      throw new Error(`Query should select all columns from '${table}' and limit the results to ${limit}.`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Database Inspection</h2>
      <p>
        You are exploring a SQLite database using the command line. You want to quickly check the schema and content 
        of the <code>${table}</code> table, but it contains millions of rows.
      </p>
      <p>
        Write a query to select all columns from <code>${table}</code> but return only the first <b>${limit}</b> rows to keep the output readable.
      </p>
      
      <label for="${id}" class="form-label">
        Enter the SQL query.
      </label>
      <input class="form-control font-monospace" id="${id}" name="${id}" type="text" placeholder="SELECT ..." required />
    </div>
  `;

  return { id, title, weight, question, answer };
}