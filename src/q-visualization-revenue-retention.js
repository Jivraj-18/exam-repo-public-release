import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-visualization-revenue-retention";
  const title = "Choosing the Right Story-First Chart";

  const question = html`
    <div class="mb-3">
      <p>
        You are the lead analyst at <strong>StreamHub</strong>, a subscription SaaS
        company that sells three plans:
        <strong>Basic</strong>, <strong>Pro</strong>, and <strong>Enterprise</strong>.
        Management wants a single, story-first slide for the next board meeting.
      </p>

      <p>
        You prepare the following monthly data for the last 12 months:
      </p>

      <ul>
        <li><code>month</code>: January–December</li>
        <li><code>plan</code>: Basic / Pro / Enterprise</li>
        <li><code>mrr</code>: Monthly recurring revenue for that plan and month</li>
        <li><code>churn_rate</code>: % of customers who cancelled that month</li>
      </ul>

      <p>
        After a quick analysis, you discover a key pattern:
        <strong>Enterprise MRR is growing slowly but steadily, Basic MRR is flat,
        and Pro MRR is growing fast but with spikes in churn in the same months
        where marketing runs aggressive discounts.</strong>
      </p>

      <p>
        You must choose <em>one primary visualization</em> for a story-driven
        slide that makes this pattern obvious to non-technical executives and
        leads naturally into a discussion about “sustainable Pro growth vs
        discount-driven churn”.
      </p>

      <p>
        Which of the following chart designs is the <strong>most appropriate
        single main visual</strong> for this board slide, and why?
        Answer with the <strong>option letter</strong> followed by a short
        justification in one sentence.
      </p>

      <ol type="A">
        <li>
          A stacked area chart of <code>mrr</code> by <code>plan</code> over
          time, with a second y-axis showing total company churn rate.
        </li>
        <li>
          A clustered bar chart showing average monthly <code>mrr</code> by
          <code>plan</code> for the entire year, sorted descending by value.
        </li>
        <li>
          A line chart with three lines (one per <code>plan</code>) for monthly
          <code>mrr</code>, and a separate aligned panel (small multiples) with
          three lines for monthly <code>churn_rate</code> per plan.
        </li>
        <li>
          A pie chart showing the share of total annual <code>mrr</code> by
          <code>plan</code>, with a text box listing the three highest churn
          months.
        </li>
      </ol>

      <label for="${id}" class="form-label">
        Your answer (e.g., "C – because ..."):
      </label>
      <input class="form-control" id="${id}" name="${id}" />

      <p class="text-muted mt-2">
        Hint: Think in terms of story-first design: the audience, the decision
        (pricing & discounts), and how clearly the chart couples plan-level
        growth to plan-level churn over time.
      </p>
    </div>
  `;

  const answer = (input) => {
    const text = String(input || "").trim();
    if (!text) throw new Error("Answer cannot be empty.");

    const upper = text.toUpperCase();

    // Correct choice: C
    // Reason: it aligns plan-level MRR trends with plan-level churn in time,
    // matching the narrative about "Pro growth vs churn in discount months".
    const picked =
      upper.startsWith("A") ? "A" :
      upper.startsWith("B") ? "B" :
      upper.startsWith("C") ? "C" :
      upper.startsWith("D") ? "D" :
      null;

    if (!picked) {
      throw new Error("Start your answer with A, B, C, or D, then a short reason.");
    }

    const correct = "C";
    if (picked !== correct) {
      throw new Error(
        "Focus on showing both growth AND churn over time, per plan, in a way that supports a pricing/discount discussion.",
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
