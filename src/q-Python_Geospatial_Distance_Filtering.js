export async function question5({ user, weight = 1 }) {
  const id = "q-python-haversine-stores";
  const title = "Haversine Distance Proximity Analysis";
  const answer = "4 stores, 620 customers";
  const question = html`
    <div class="mb-3">
      <p>
        Atlas Fitness wants to open a boutique studio at coordinates
        <strong>40.772491, -73.944097</strong>. Using Python and the haversine
        distance formula (via geopy or manual calculation), determine how many
        <strong>existing stores fall within 1.2 km</strong> of the proposed site
        and their <strong>combined daily customer load</strong>.
      </p>
      <label for="${id}" class="form-label">Answer (stores, customers):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 4 stores, 620 customers" />
      <small class="form-text text-muted">
        Format: "X stores, Y customers" (use rounded whole numbers)
      </small>
    </div>
  `;
  return { id, title, weight, question, answer };
}