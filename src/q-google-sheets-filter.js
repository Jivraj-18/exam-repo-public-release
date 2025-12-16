export default function ({ user, weight = 1 }) {
  return {
    id: "google_sheets_filter_sum",

    weight,

    question: `
      In <b>Google Sheets</b> (this will not work in Excel), enter the following formula:
      <pre>
      =SUM(FILTER(SEQUENCE(30,1,2,2), MOD(SEQUENCE(30,1,2,2), 3) = 0))
      </pre>

      What is the resulting value?
    `,

    type: "number",
  };
}
