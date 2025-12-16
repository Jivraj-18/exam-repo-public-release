import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nuclear-telemetry-rollup";
  const title = "Nuclear Telemetry Roll-up Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  // -----------------------------
  // Scenario configuration
  // -----------------------------
  const plants = ["Plant-Alpha", "Plant-Beta", "Plant-Gamma"];
  const reactorFamilies = ["RX-100", "RX-200", "RX-300", "RX-400"];
  const statusValues = ["normal", "maintenance", "offline"];

  const scenario = {
    plant: pick(plants, random),
    reactorFamily: pick(reactorFamilies, random),
    start: new Date("2024-08-13T12:47:53.433Z"),
    end: new Date("2024-08-23T12:47:53.433Z"),
  };

  // -----------------------------
  // Helpers
  // -----------------------------
  const randomInt = (min, max) =>
    Math.floor(random() * (max - min + 1)) + min;

  const randomFloat = (min, max, decimals = 2) => {
    const factor = 10 ** decimals;
    return Math.round((min + random() * (max - min)) * factor) / factor;
  };

  const randomDate = (start, end) =>
    new Date(start.getTime() + random() * (end.getTime() - start.getTime()));

  // -----------------------------
  // Generate dataset
  // -----------------------------
  const records = [];
  const lines = [];
  const recordCount = 1200;

  for (let i = 0; i < recordCount; i++) {
    const plant = pick(plants, random);
    const reactorFamily = pick(reactorFamilies, random);
    const reactorId = `${reactorFamily}-${String(
      randomInt(1, 20),
    ).padStart(3, "0")}`;

    const capturedAt = randomDate(
      new Date("2024-08-01T00:00:00Z"),
      new Date("2024-09-01T00:00:00Z"),
    );

    const status = pick(statusValues, random);

    const temperatureC = randomFloat(240, 320, 2);
    const convertToF = random() < 0.3;
    const temperatureValue = convertToF
      ? Math.round(((temperatureC * 9) / 5 + 32) * 100) / 100
      : temperatureC;

    const temperatureUnit = convertToF ? "F" : "C";

    const payload = {
      plant,
      reactor_id: reactorId,
      captured_at: capturedAt.toISOString(),
      status,
      metrics: {
        temperature: {
          value: temperatureValue,
          unit: temperatureUnit,
        },
        neutron_flux: randomFloat(500, 1500, 2),
      },
    };

    lines.push(JSON.stringify(payload));

    const isValid =
      plant === scenario.plant &&
      reactorId.startsWith(scenario.reactorFamily) &&
      capturedAt >= scenario.start &&
      capturedAt <= scenario.end &&
      status === "normal";

    if (isValid) {
      const tempC =
        temperatureUnit === "C"
          ? temperatureValue
          : ((temperatureValue - 32) * 5) / 9;

      records.push(tempC);
    }
  }

  const expectedAverage =
    records.reduce((sum, v) => sum + v, 0) / records.length;

  const blob = new Blob([lines.join("\n")], {
    type: "application/jsonl",
  });

  // -----------------------------
  // Answer validation
  // -----------------------------
  const answer = async (value) => {
    if (typeof value === "string") {
      value = value.replace(/[^\d.-]/g, "");
    }

    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
      throw new Error(
        "Answer must be a numeric average temperature in °C.",
      );
    }

    if (Math.abs(numeric - expectedAverage) > 0.05) {
      throw new Error(
        "Average does not match the cleaned dataset. Check filtering, unit conversion, and time window.",
      );
    }

    return true;
  };

  // -----------------------------
  // UI
  // -----------------------------
  const question = html`
  <div class="mb-3">
    <h2>Nuclear Telemetry Roll-up for Reactor Monitoring</h2>

    <h3>Context</h3>

    <p>
      A national <strong>Nuclear Safety and Regulatory Authority (NSRA)</strong>
      is responsible for continuous oversight of nuclear power plants operating
      across the country. Each facility streams high-frequency telemetry data
      from individual reactors to a centralized monitoring platform used by
      safety engineers and regulatory analysts.
    </p>

    <p>
      This telemetry is used to detect <strong>early signs of thermal drift,
      cooling inefficiencies, and abnormal reactor behavior</strong> long before
      safety thresholds are breached. Even small deviations in average operating
      temperature can indicate emerging issues that require inspection or
      preventive maintenance.
    </p>

    <p>
      Unfortunately, the telemetry pipeline has evolved over time. Older reactor
      firmware reports temperature readings in <strong>Fahrenheit</strong>,
      while newer systems report in <strong>Celsius</strong>. In addition,
      reactors periodically enter <code>maintenance</code> or
      <code>offline</code> states, during which telemetry should not be included
      in operational analysis.
    </p>

    <p>
      As a data engineer working with the NSRA’s analytics team, you have been
      asked to prepare a <strong>clean, reproducible roll-up</strong> of reactor
      temperature data for a specific investigation window.
    </p>

    <h3>Your Task</h3>

    <p>
      You are provided with a newline-delimited JSON (<code>JSONL</code>) file
      containing raw reactor telemetry records. Each record includes nested
      metrics, reactor identifiers, timestamps, and operational status flags.
    </p>

    <ol>
      <li>
        <strong>Stream</strong> the JSONL file (do not load it fully into memory).
      </li>
      <li>
        Filter records to <strong>${scenario.plant}</strong> and reactors whose
        IDs start with <strong>${scenario.reactorFamily}</strong>.
      </li>
      <li>
        Restrict the analysis window to
        <strong>${scenario.start.toISOString()}</strong> through
        <strong>${scenario.end.toISOString()}</strong>.
      </li>
      <li>
        Exclude all records where <code>status</code> is not
        <code>normal</code>.
      </li>
      <li>
        Convert all temperature readings to <strong>Celsius</strong> before
        aggregation.
      </li>
      <li>
        Compute the <strong>average reactor temperature</strong> and round the
        result to two decimal places.
      </li>
    </ol>

    <h3>Dataset</h3>

    <p>
      Download the raw telemetry dataset used for this investigation:
    </p>

    <p>
      <button
        class="btn btn-sm btn-outline-primary"
        type="button"
        @click=${() => download(blob, "nuclear-telemetry.jsonl")}
      >
        Download dataset
      </button>
    </p>

    <label for="${id}" class="form-label">
      What is the average temperature (°C) for the selected reactors?
    </label>

    <input class="form-control" id="${id}" name="${id}" required />

    <p class="text-muted">
      Round to two decimal places. Only include valid operational telemetry.
    </p>
  </div>
`;


  return { id, title, weight, question, answer };
}
