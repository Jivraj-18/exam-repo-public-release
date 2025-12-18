
export default async function({ user, weight = 1 }) {
    return {
        id: "jsonl_telemetry_normalization",

        title: "Normalize and Aggregate JSONL Telemetry Data",

        question: `
      <p>
        You are given newline-delimited JSON (<b>JSONL</b>) telemetry records
        from multiple devices.
      </p>

      <p>The data is available at:</p>

      <pre>
https://raw.githubusercontent.com/sanand0/tools-in-data-science-public/main/data/telemetry.jsonl
      </pre
      >

      <p>Each record contains:</p>
      <ul>
        <li><code>device_id</code></li>
        <li><code>temperature</code></li>
        <li><code>unit</code> — either <code>"C"</code> or <code>"F"</code></li>
        <li>
          <code>status</code> — either <code>"OK"</code> or <code>"FAIL"</code>
        </li>
      </ul>

      <p>Perform the following steps:</p>
      <ol>
        <li>Ignore records where <code>status !== "OK"</code></li>
        <li>Convert all temperatures to <b>Celsius</b></li>
        <li>Compute the mean temperature per <code>device_id</code></li>
        <li>Return the <b>maximum</b> of these device-wise means</li>
      </ol>

      <p>
        Round your final answer to <b>1 decimal place</b>. Submit only the
        numeric value.
      </p>
    `,

        answer: 32.4,

        validate: (value) => {
            const v = Number(value);

            if (Number.isNaN(v)) {
                return "Answer must be a numeric value";
            }

            if (Math.round(v * 10) / 10 !== v) {
                return "Answer must be rounded to exactly 1 decimal place";
            }

            if (v !== 32.4) {
                return "Incorrect result. Check filtering, unit conversion, and aggregation logic.";
            }

            return true;
        },

        weight,
    };
}
