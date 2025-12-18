import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      id: "q-data_analysis_python",
      weight: 1,

      question: html`
        <h3>NovaRide: Loyalty Tier Performance Analysis</h3>

        <p>
          <strong>NovaRide</strong> operates a ride-hailing platform across major Indian cities.
          The growth team wants to understand whether <em>Loyalty</em> riders behave meaningfully
          better than <em>Regular</em> riders across acquisition channels.
          This insight will guide incentive design and channel-level spend.
        </p>

        <p>
          You are provided with a CSV file that logs rider activity aggregated at a
          monthly-channel-tier level.
        </p>

        <h4>Dataset Columns</h4>
        <ul>
          <li><code>month</code>: Month of activity (YYYY-MM)</li>
          <li><code>channel</code>: Acquisition channel (Search, Social, Referral, Display, Offline)</li>
          <li><code>tier</code>: Rider tier (<code>Regular</code> or <code>Loyalty</code>)</li>
          <li><code>rides</code>: Total completed rides</li>
          <li><code>active_users</code>: Distinct riders active in that month</li>
        </ul>

        <h4>Your Python Task</h4>
        <ol>
          <li>Load the CSV file into a Pandas DataFrame.</li>
          <li>
            Aggregate the data by <code>channel</code> and <code>tier</code>, computing:
            <ul>
              <li>Total <code>rides</code></li>
              <li>Total <code>active_users</code></li>
            </ul>
          </li>
          <li>
            Compute the <strong>rides per user</strong> metric:
            <code>rides ÷ active_users</code>.
          </li>
          <li>
            Pivot the table so each channel has both tiers side-by-side.
          </li>
          <li>
            Calculate the <strong>engagement lift</strong> for each channel:
            <br />
            <code>Loyalty rides per user − Regular rides per user</code>.
          </li>
          <li>
            Identify the channel with the highest positive engagement lift.
          </li>
        </ol>

        <h4>Output Requirement</h4>
        <p>
          Return the <strong>channel name only</strong> that shows the greatest uplift.
          If multiple channels tie, return the one that comes first alphabetically.
        </p>

        <p>
          Download the NovaRide activity log:
        </p>

        <p>
          <strong>Question:</strong><br />
          Which acquisition channel delivers the strongest Loyalty-tier engagement uplift?
        </p>
      `,
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
