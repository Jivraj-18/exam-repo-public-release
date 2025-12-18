import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-data_prep_excel";
  const title = "Prepare operational revenue data in Excel";

  const question = html`
    <div class="mb-3">
      <h2><strong>Revenue Reconciliation for Atlas Mobility</strong></h2>

      <p>
        <strong>Atlas Mobility</strong> operates a multi-city electric scooter rental business across India and Southeast
        Asia. At the end of each month, the central finance team receives a consolidated Excel workbook compiled from
        city-level operations teams. Due to differences in local reporting practices, the workbook contains several
        inconsistencies that must be resolved before revenue can be reported to investors.
      </p>

      <p>
        You are part of the finance analytics team responsible for preparing the data for the monthly close.
      </p>

      <p>
        The workbook contains a single sheet titled <strong>Trip Revenue Log</strong> with the following columns:
      </p>

      <ul>
        <li><strong>Trip Ref</strong> – unique trip references, sometimes with leading or trailing spaces</li>
        <li><strong>City</strong> – values include canonical names such as <em>Bengaluru</em>, <em>Jakarta</em>, <em>Bangkok</em>,
            as well as aliases like <em>BLR</em>, <em>JKT</em>, and <em>BKK</em></li>
        <li><strong>Trip Date</strong> – stored inconsistently as <code>YYYY-MM-DD</code>, <code>DD Mon YYYY</code>,
            <code>MM/DD/YYYY</code>, or month–year strings such as <code>Aug 2024</code></li>
        <li><strong>Fare Collected</strong> – text values containing currency symbols (₹, Rp, ฿), commas, or spaces</li>
        <li><strong>Platform Fee</strong> – blank for some trips</li>
        <li><strong>Trip Metadata</strong> – semicolon-delimited text in the format
            <code>ServiceType;VehicleClass;PromoFlag</code></li>
        <li><strong>Ops Remarks</strong> – free-form comments from city teams</li>
      </ul>

      <h3>What you need to do in Excel</h3>
      <ol>
        <li>
          Trim whitespace from <strong>Trip Ref</strong> and standardise city names as follows:
          <ul>
            <li>BLR → Bengaluru</li>
            <li>JKT → Jakarta</li>
            <li>BKK → Bangkok</li>
          </ul>
        </li>
        <li>
          Convert all <strong>Trip Date</strong> values into valid Excel dates. For month–year entries (for example,
          <code>Aug 2024</code>), treat the date as the <strong>last calendar day of the month</strong>.
        </li>
        <li>
          Clean the <strong>Fare Collected</strong> column by removing currency symbols, commas, and spaces, and convert
          the result to numeric values.
        </li>
        <li>
          Where <strong>Platform Fee</strong> is missing, calculate it as <strong>18% of Fare Collected</strong>.
        </li>
        <li>
          Split the <strong>Trip Metadata</strong> column so that <strong>ServiceType</strong> can be filtered
          independently.
        </li>
        <li>
          Filter the data for:
          <ul>
            <li><strong>ServiceType</strong> = Ride</li>
            <li><strong>City</strong> = Jakarta</li>
            <li><strong>Trip Date</strong> on or before <strong>15 August 2024</strong></li>
          </ul>
        </li>
        <li>
          For the filtered records, compute <strong>Net Revenue</strong> as:
          <code>Fare Collected − Platform Fee</code>, and calculate the <strong>total Net Revenue</strong>.
        </li>
      </ol>

      <h3>Final Question</h3>
      <p>
        <strong>What is the total Net Revenue (in local currency units) for Ride trips in Jakarta up to 15 August 2024?</strong>
      </p>

      <label for="${id}" class="form-label">Your Answer</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="4" required></textarea>

      <p class="text-muted">
        This is a data preparation and analysis task. You are expected to perform the cleaning and calculations in Excel
        and submit only the final numeric result.
      </p>
    </div>
  `;

  return { id, title, weight, question };
}
