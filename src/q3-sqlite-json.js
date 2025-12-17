export default async function q3({ weight = 1 }) {
  return {
    id: 'q3-sqlite-json',
    title: 'SQLite JSON Import',
    type: 'text',
    description: `<p>Write a Python script <code>import_json_to_sqlite.py</code> that:</p>
<ol>
  <li>Reads a file <code>data.json</code> containing a JSON array of objects with keys <code>id</code>, <code>name</code>, and <code>score</code>.</li>
  <li>Connects to an SQLite database <code>results.db</code>.</li>
  <li>Creates a table <code>students(id INTEGER PRIMARY KEY, name TEXT, score REAL)</code>.</li>
  <li>Inserts all rows from the JSON array into the table.</li>
  <li>Commits and closes the connection.</li>
</ol>
<p><strong>Expected file:</strong> <code>import_json_to_sqlite.py</code></p>`,
    weight,
  };
}
