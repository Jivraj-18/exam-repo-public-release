export async function question2({ user, weight = 1.25 }) {
  const id = "q-python-retention-cohort";
  const title = "Subscription Cohort Retention Rate";
  const answer = "0.62";
  const question = html`
    <div class="mb-3">
      <p>
        StreamLuxe is a subscription platform tracking retention by cohort.
        Using Pandas pivot tables on signup_month and month_offset columns,
        calculate the <strong>Month 3 retention rate</strong> for the 2024-01
        signup cohort (active customers ÷ cohort size).
      </p>
      <label for="${id}" class="form-label">Retention Rate (decimal or %):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 0.62 or 62%" />
    </div>
  `;
  return { id, title, weight, question, answer };
}