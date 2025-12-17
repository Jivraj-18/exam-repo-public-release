export default function ({ user, weight = 1 }) {
  return {
    id: "cohort_decay_comparison",
    title: "Python: Multi-Cohort Survival Decay Comparison",
    question: `
A B2B SaaS platform tracks weekly engagement across segments.

### Dataset
- user_id
- signup_week
- segment (SMB or Enterprise)
- week_offset
- active_flag

### Task (Python + Pandas)

1. Build cohort matrices for SMB and Enterprise
2. Compute weekly retention curves
3. Fit a **log-linear decay model** for weeks 1–6
4. Compare decay slope magnitudes
5. Identify which segment decays faster

### Deliverable
Return:

\`\`\`
SegmentName, slope_value
\`\`\`

Slope rounded to **3 decimals**.
    `,
    answer: "SMB, -0.214",
    weight,
  };
}
