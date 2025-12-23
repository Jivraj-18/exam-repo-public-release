export async function question1({ user, weight = 0.75 }) {
  const id = "q-excel-correlation-region";
  const title = "Regional Marketing Correlation Analysis";
  const answer = "East";
  const question = html`
    <div class="mb-3">
      <p>
        Aurora Home Electronics analyzed marketing spend and net revenue across
        five regions. Using Excel's CORREL function, which region demonstrates
        the <strong>strongest positive correlation</strong> between marketing
        spend (USD) and net revenue (USD)?
      </p>
      <label for="${id}" class="form-label">Region Name:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. East" />
    </div>
  `;
  return { id, title, weight, question, answer };
}