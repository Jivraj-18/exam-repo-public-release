import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

const randomInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;
const randomFloat = (random, min, max, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round((min + random() * (max - min)) * factor) / factor;
};

const questionFactories = [
  // Question 1: Log Searching and Pattern Matching
  (random, id) => {
    const logLevels = ["INFO", "WARN", "ERROR", "DEBUG"];
    const services = ["auth", "payment", "database", "api", "cache"];
    const errorTypes = ["timeout", "connection", "validation", "permission", "notfound"];
    
    const totalRecords = randomInt(random, 150, 220);
    const allRecords = [];
    const errorLogs = [];

    const targetErrorType = pick(errorTypes, random);
    const targetLevel = "ERROR";

    for (let i = 0; i < totalRecords; i++) {
      const timestamp = new Date(Date.now() - randomInt(random, 0, 7) * 24 * 60 * 60 * 1000).toISOString();
      const level = pick(logLevels, random);
      const service = pick(services, random);
      
      let message;
      if (level === "ERROR" && random() < 0.6) {
        const errorType = pick(errorTypes, random);
        message = `${service} service failed: ${errorType} error occurred at ${timestamp}`;
        if (errorType === targetErrorType) {
          errorLogs.push({ timestamp, service, errorType });
        }
      } else if (level === "ERROR") {
        message = `${service} service encountered an issue`;
        errorLogs.push({ timestamp, service, errorType: "other" });
      } else {
        message = `${service} service ${level.toLowerCase()}: operation completed successfully`;
      }

      allRecords.push({
        timestamp,
        level,
        service,
        message,
      });
    }

    // Count errors of target type that occurred in the last N hours
    const hoursBack = randomInt(random, 12, 48);
    const cutoffTime = new Date(Date.now() - hoursBack * 60 * 60 * 1000);
    const recentErrors = errorLogs.filter(
      (log) => log.errorType === targetErrorType && new Date(log.timestamp) >= cutoffTime
    );

    const expectedCount = recentErrors.length;

    const jsonlContent = allRecords.map((r) => JSON.stringify(r)).join("\n");
    const blob = new Blob([jsonlContent], { type: "application/jsonl" });

    return {
      title: "Regex Pattern Matching: Log Searching and Analysis",
      blob,
      expectedValue: expectedCount,
      tolerance: 0,
      question: html`
        <div class="mb-3">
          <h2>LogSurfer: Advanced Log Searching with Regex</h2>
          <p>
            <strong>LogSurfer</strong> is a log analysis tool used by DevOps teams to search through application logs and
            identify specific error patterns. Log files contain structured entries with timestamps, log levels, service names,
            and messages. You need to use regex to search for specific error types within a time window.
          </p>
          <p>
            <strong>Log entry format:</strong> Each log entry has <code>timestamp</code>, <code>level</code>, <code>service</code>,
            and <code>message</code> fields. Error messages follow the pattern: <code>"service_name service failed: error_type error occurred at timestamp"</code>
          </p>
          <p>
            <strong>Your task:</strong> Search for ERROR level logs where the message contains a specific error type. Filter
            these errors to only include those that occurred within the last <strong>${hoursBack} hours</strong>.
          </p>
          <p>
            <strong>Error type to search for:</strong> <code>${targetErrorType}</code>
          </p>
          <h3>Your Task</h3>
          <p>
            Create a Python script that:
          </p>
          <ol>
            <li>
              <strong>Load JSONL Data:</strong> Read the JSONL file containing log entries.
            </li>
            <li>
              <strong>Filter by Log Level:</strong> Extract only entries where <code>level</code> equals "ERROR".
            </li>
            <li>
              <strong>Search Error Messages:</strong> Use regex to search the <code>message</code> field for entries containing
              the error type "<code>${targetErrorType}</code>". The error type appears in the message as part of the pattern
              "<code>error_type error occurred</code>".
            </li>
            <li>
              <strong>Filter by Time:</strong> From the matching error logs, filter to only include those where the
              <code>timestamp</code> is within the last <strong>${hoursBack} hours</strong> from now.
            </li>
            <li>
              <strong>Count Results:</strong> Count how many error logs match both the error type pattern and the time window.
            </li>
          </ol>
          <h3>Data File</h3>
          <p>
            Download the log file:
            <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.jsonl`)}>
              ${id}.jsonl
            </button>
          </p>
          <p class="text-muted">
            <strong>Note:</strong> Use regex to search for the error type pattern in messages, filter by log level and
            timestamp, then count matching entries. This simulates real-world log searching scenarios.
          </p>
          <label for="${id}" class="form-label">
            How many ERROR logs contain "${targetErrorType}" errors that occurred in the last ${hoursBack} hours?
          </label>
          <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 12" required />
          <p class="text-muted">
            Filter ERROR level logs, use regex to find the error type in messages, check timestamps, then count matches.
          </p>
        </div>
      `,
      answer: async (value) => {
        const numeric = Number(value);
        if (!Number.isFinite(numeric) || numeric < 0) {
          throw new Error("Enter a valid non-negative integer.");
        }
        if (numeric !== expectedCount) {
          throw new Error("Incorrect count. Make sure you're filtering by ERROR level, using regex to match the error type pattern in messages, and checking the time window correctly.");
        }
        return true;
      },
    };
  },

  // Question 2: Extract and Calculate Statistics - Timestamp Patterns
  (random, id) => {
    const formats = [
      { pattern: /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/, gen: () => {
        const year = randomInt(random, 2020, 2024);
        const month = String(randomInt(random, 1, 12)).padStart(2, "0");
        const day = String(randomInt(random, 1, 28)).padStart(2, "0");
        const hour = String(randomInt(random, 0, 23)).padStart(2, "0");
        const min = String(randomInt(random, 0, 59)).padStart(2, "0");
        const sec = String(randomInt(random, 0, 59)).padStart(2, "0");
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
      }},
      { pattern: /\d{2}\/\d{2}\/\d{4}/, gen: () => {
        const month = String(randomInt(random, 1, 12)).padStart(2, "0");
        const day = String(randomInt(random, 1, 28)).padStart(2, "0");
        const year = randomInt(random, 2020, 2024);
        return `${month}/${day}/${year}`;
      }},
    ];

    const totalRecords = randomInt(random, 100, 150);
    const allRecords = [];
    const timestamps = [];

    const targetFormat = pick(formats, random);

    for (let i = 0; i < totalRecords; i++) {
      const recordId = `LOG-${String(i + 1).padStart(4, "0")}`;
      const entries = [];
      
      const entryCount = randomInt(random, 2, 5);
      for (let j = 0; j < entryCount; j++) {
        if (random() < 0.4) {
          const format = pick(formats, random);
          const ts = format.gen();
          entries.push(`Timestamp: ${ts}`);
          if (format.pattern.source === targetFormat.pattern.source) {
            timestamps.push(ts);
          }
        } else {
          entries.push(`Value: ${randomInt(random, 100, 999)}`);
        }
      }

      allRecords.push({
        log_id: recordId,
        content: entries.join(" | "),
      });
    }

    // Calculate median hour (for YYYY-MM-DD HH:MM:SS format) or median month (for MM/DD/YYYY format)
    let expectedMedian;
    if (targetFormat.pattern.source.includes(":")) {
      const hours = timestamps.map(ts => parseInt(ts.split(" ")[1].split(":")[0]));
      hours.sort((a, b) => a - b);
      const mid = Math.floor(hours.length / 2);
      expectedMedian = hours.length % 2 === 0 
        ? Math.round((hours[mid - 1] + hours[mid]) / 2)
        : hours[mid];
    } else {
      const months = timestamps.map(ts => parseInt(ts.split("/")[0]));
      months.sort((a, b) => a - b);
      const mid = Math.floor(months.length / 2);
      expectedMedian = months.length % 2 === 0 
        ? Math.round((months[mid - 1] + months[mid]) / 2)
        : months[mid];
    }

    const jsonlContent = allRecords.map((r) => JSON.stringify(r)).join("\n");
    const blob = new Blob([jsonlContent], { type: "application/jsonl" });

    const sampleTimestamps = [targetFormat.gen(), targetFormat.gen(), targetFormat.gen()].join(", ");
    const statType = targetFormat.pattern.source.includes(":") ? "hour (0-23)" : "month (1-12)";

    return {
      title: "Regex Pattern Matching: Timestamp Statistics",
      blob,
      expectedValue: expectedMedian,
      tolerance: 0,
      question: html`
        <div class="mb-3">
          <h2>LogAnalyzer: Timestamp Pattern Extraction and Statistics</h2>
          <p>
            <strong>LogAnalyzer</strong> processes log files with timestamps in various formats. The system needs to extract
            timestamps matching a specific pattern and calculate statistical measures. You need to identify the pattern from
            examples and extract the relevant component.
          </p>
          <p>
            <strong>Sample timestamps:</strong> <code>${sampleTimestamps}</code>
          </p>
          <p>
            <strong>Hint:</strong> Identify the timestamp format from the samples. Extract all timestamps matching this exact
            format, then extract the ${statType} component from each timestamp. Calculate the median value of these components.
          </p>
          <h3>Your Task</h3>
          <p>
            Create a Python script that:
          </p>
          <ol>
            <li>
              <strong>Load JSONL Data:</strong> Read the JSONL file containing log entries.
            </li>
            <li>
              <strong>Identify Pattern:</strong> Build a regex pattern that matches the timestamp format shown in the samples.
            </li>
            <li>
              <strong>Extract Timestamps:</strong> Extract all timestamps matching this pattern from the <code>content</code>
              field.
            </li>
            <li>
              <strong>Extract Components:</strong> Parse each timestamp to extract the ${statType} component.
            </li>
            <li>
              <strong>Calculate Median:</strong> Calculate the median value of the extracted ${statType} components. Round to
              nearest integer.
            </li>
          </ol>
          <h3>Data File</h3>
          <p>
            Download the log records file:
            <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.jsonl`)}>
              ${id}.jsonl
            </button>
          </p>
          <p class="text-muted">
            <strong>Note:</strong> You need to identify the timestamp pattern, extract matching timestamps, parse the ${statType}
            component, and calculate the median. Use Python's <code>re</code> module and statistical functions.
          </p>
          <label for="${id}" class="form-label">
            What is the median ${statType} value extracted from timestamps matching the sample pattern?
          </label>
          <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 12" required />
          <p class="text-muted">
            Extract timestamps matching the pattern, parse the ${statType} component, sort values, and find the median.
          </p>
        </div>
      `,
      answer: async (value) => {
        const numeric = Number(value);
        if (!Number.isFinite(numeric) || numeric < 0) {
          throw new Error("Enter a valid non-negative integer.");
        }
        if (Math.round(numeric) !== expectedMedian) {
          throw new Error("Incorrect median. Remember to extract the correct component from timestamps and sort values before finding the median.");
        }
        return true;
      },
    };
  },

  // Question 3: Pattern Validation and Outlier Detection
  (random, id) => {
    // Valid pattern: 2 uppercase letters + 4 digits + 1 uppercase letter
    // Examples: AB1234X, CD5678Y, EF9012Z
    const validPattern = /^[A-Z]{2}\d{4}[A-Z]$/;
    
    const totalRecords = randomInt(random, 140, 200);
    const allRecords = [];
    const validCodes = [];
    const invalidCodes = [];

    const generateValid = () => {
      const letters1 = pick(["AB", "CD", "EF", "GH", "IJ", "KL", "MN", "OP", "QR"], random);
      const digits = String(randomInt(random, 1000, 9999));
      const letter2 = pick(["X", "Y", "Z", "A", "B", "C"], random);
      return `${letters1}${digits}${letter2}`;
    };

    const generateInvalid = () => {
      const invalidType = random();
      if (invalidType < 0.33) {
        // Wrong order: digits first
        return `${String(randomInt(random, 1000, 9999))}${pick(["AB", "CD"], random)}`;
      } else if (invalidType < 0.66) {
        // Wrong letter count: 3 letters instead of 2
        return `${pick(["ABC", "DEF", "GHI"], random)}${String(randomInt(random, 1000, 9999))}`;
      } else {
        // Wrong digit count: 5 digits instead of 4
        return `${pick(["AB", "CD"], random)}${String(randomInt(random, 10000, 99999))}`;
      }
    };

    for (let i = 0; i < totalRecords; i++) {
      const recordId = `REC-${String(i + 1).padStart(4, "0")}`;
      const codes = [];
      
      const codeCount = randomInt(random, 2, 5);
      for (let j = 0; j < codeCount; j++) {
        if (random() < 0.65) {
          const code = generateValid();
          codes.push(code);
          validCodes.push(code);
        } else {
          const code = generateInvalid();
          codes.push(code);
          invalidCodes.push(code);
        }
      }

      allRecords.push({
        record_id: recordId,
        codes: codes.join(", "),
      });
    }

    // Calculate what percentage are valid
    const totalCodes = validCodes.length + invalidCodes.length;
    const expectedPercentage = totalCodes > 0 
      ? Math.round((validCodes.length / totalCodes) * 100) 
      : 0;

    const jsonlContent = allRecords.map((r) => JSON.stringify(r)).join("\n");
    const blob = new Blob([jsonlContent], { type: "application/jsonl" });

    const sampleValid = [generateValid(), generateValid(), generateValid()].join(", ");
    const sampleInvalid1 = `${String(randomInt(random, 1000, 9999))}${pick(["AB", "CD"], random)}`;
    const sampleInvalid2 = `${pick(["ABC", "DEF"], random)}${String(randomInt(random, 1000, 9999))}`;

    return {
      title: "Regex Pattern Matching: Pattern Validation and Statistics",
      blob,
      expectedValue: expectedPercentage,
      tolerance: 0,
      question: html`
        <div class="mb-3">
          <h2>CodeValidator: Pattern Validation and Quality Analysis</h2>
          <p>
            <strong>CodeValidator</strong> validates product codes in a database. All valid codes follow a consistent
            structure, but some entries in the database are malformed. Your task is to identify the pattern structure and
            calculate data quality metrics.
          </p>
          <p>
            <strong>Valid code examples:</strong> <code>${sampleValid}</code>
          </p>
          <p>
            <strong>Invalid code examples:</strong> <code>${sampleInvalid1}</code>, <code>${sampleInvalid2}</code>
          </p>
          <p>
            <strong>Pattern structure:</strong> Look at the valid examples carefully. Notice:
          </p>
          <ul>
            <li>How many letters are at the start?</li>
            <li>How many digits are in the middle?</li>
            <li>How many letters are at the end?</li>
            <li>What's the overall structure: letters-digits-letters or something else?</li>
          </ul>
          <p>
            <strong>Think about it:</strong> Compare the valid codes with the invalid ones. What makes a code valid? Build
            a regex pattern that matches only codes following the valid structure.
          </p>
          <h3>Your Task</h3>
          <p>
            Create a Python script that:
          </p>
          <ol>
            <li>
              <strong>Load JSONL Data:</strong> Read the JSONL file containing code records.
            </li>
            <li>
              <strong>Identify the Pattern:</strong> Study the valid examples to determine the exact structure. Count the
              letters and digits in each position. Build a regex pattern that matches this structure exactly.
            </li>
            <li>
              <strong>Extract All Codes:</strong> Extract all code-like sequences from the <code>codes</code> field (they're
              comma-separated). Each code is a sequence of letters and digits.
            </li>
            <li>
              <strong>Validate Each Code:</strong> Check each extracted code against your regex pattern to determine if it
              matches the valid structure.
            </li>
            <li>
              <strong>Calculate Quality Score:</strong> Calculate what percentage of all codes are valid. Round to the
              nearest integer.
            </li>
          </ol>
          <h3>Data File</h3>
          <p>
            Download the code records file:
            <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.jsonl`)}>
              ${id}.jsonl
            </button>
          </p>
          <p class="text-muted">
            <strong>Note:</strong> Analyze the examples to understand the pattern structure, build an appropriate regex,
            validate all codes, and calculate the percentage. Use Python's <code>re</code> module.
          </p>
          <label for="${id}" class="form-label">
            What percentage of all codes match the valid pattern structure? (Round to nearest integer)
          </label>
          <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 65" required />
          <p class="text-muted">
            Study the valid examples to identify the pattern, build regex, extract all codes, validate each, then calculate
            percentage.
          </p>
        </div>
      `,
      answer: async (value) => {
        const numeric = Number(value);
        if (!Number.isFinite(numeric) || numeric < 0 || numeric > 100) {
          throw new Error("Enter a valid integer between 0 and 100.");
        }
        if (Math.round(numeric) !== expectedPercentage) {
          throw new Error("Incorrect percentage. Count the letters and digits in the valid examples carefully - the pattern has a specific structure.");
        }
        return true;
      },
    };
  },

  // Question 4: Multi-Pattern Extraction and Correlation
  (random, id) => {
    const userPattern = /USER-\d{5}/;
    const sessionPattern = /SESSION-[A-Z0-9]{8}/;

    const totalRecords = randomInt(random, 110, 160);
    const allRecords = [];
    const userSessionPairs = new Map();

    for (let i = 0; i < totalRecords; i++) {
      const recordId = `LOG-${String(i + 1).padStart(4, "0")}`;
      const userId = `USER-${String(randomInt(random, 10000, 99999))}`;
      const sessionId = `SESSION-${pick(["A", "B", "C", "D", "E", "F", "G", "H"], random)}${String(randomInt(random, 1000000, 9999999))}`;
      
      const entries = [];
      entries.push(`User: ${userId}`);
      entries.push(`Session: ${sessionId}`);
      entries.push(`Action: ${pick(["login", "view", "download", "logout"], random)}`);

      allRecords.push({
        log_id: recordId,
        log_entry: entries.join(" | "),
      });

      if (!userSessionPairs.has(userId)) {
        userSessionPairs.set(userId, new Set());
      }
      userSessionPairs.get(userId).add(sessionId);
    }

    // Find users with most unique sessions
    let maxSessions = 0;
    let usersWithMaxSessions = 0;
    for (const [userId, sessions] of userSessionPairs.entries()) {
      if (sessions.size > maxSessions) {
        maxSessions = sessions.size;
        usersWithMaxSessions = 1;
      } else if (sessions.size === maxSessions) {
        usersWithMaxSessions++;
      }
    }

    const expectedCount = usersWithMaxSessions;

    const jsonlContent = allRecords.map((r) => JSON.stringify(r)).join("\n");
    const blob = new Blob([jsonlContent], { type: "application/jsonl" });

    return {
      title: "Regex Pattern Matching: Multi-Pattern Correlation Analysis",
      blob,
      expectedValue: expectedCount,
      tolerance: 0,
      question: html`
        <div class="mb-3">
          <h2>SessionAnalyzer: Multi-Pattern Extraction and Correlation</h2>
          <p>
            <strong>SessionAnalyzer</strong> analyzes user session logs to understand user behavior patterns. Each log entry
            contains both a user ID and a session ID that need to be extracted and correlated.
          </p>
          <p>
            <strong>Pattern hints:</strong>
          </p>
          <ul>
            <li>User IDs follow the pattern: <code>USER-</code> followed by 5 digits</li>
            <li>Session IDs follow the pattern: <code>SESSION-</code> followed by 8 alphanumeric characters</li>
          </ul>
          <p>
            <strong>Task:</strong> Extract user IDs and session IDs from each log entry. For each user, count how many unique
            sessions they have. Find how many users have the maximum number of unique sessions.
          </p>
          <h3>Your Task</h3>
          <p>
            Create a Python script that:
          </p>
          <ol>
            <li>
              <strong>Load JSONL Data:</strong> Read the JSONL file containing log entries.
            </li>
            <li>
              <strong>Extract User IDs:</strong> Use regex to extract all user IDs matching <code>USER-XXXXX</code> pattern
              from the <code>log_entry</code> field.
            </li>
            <li>
              <strong>Extract Session IDs:</strong> Use regex to extract all session IDs matching <code>SESSION-XXXXXXXX</code>
              pattern from the same field.
            </li>
            <li>
              <strong>Correlate Data:</strong> Match user IDs with their corresponding session IDs from the same log entry.
            </li>
            <li>
              <strong>Count Unique Sessions:</strong> For each user, count how many unique sessions they have.
            </li>
            <li>
              <strong>Find Maximum:</strong> Determine the maximum number of unique sessions any user has, then count how many
              users have this maximum number.
            </li>
          </ol>
          <h3>Data File</h3>
          <p>
            Download the log records file:
            <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.jsonl`)}>
              ${id}.jsonl
            </button>
          </p>
          <p class="text-muted">
            <strong>Note:</strong> You need to extract two different patterns from each record, correlate them, perform
            statistical analysis (counting unique sessions per user), and find users with maximum sessions. Use Python's
            <code>re</code> module and data structures like dictionaries.
          </p>
          <label for="${id}" class="form-label">
            How many users have the maximum number of unique sessions?
          </label>
          <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 3" required />
          <p class="text-muted">
            Extract both patterns, correlate user-session pairs, count unique sessions per user, find max, then count users
            with that max.
          </p>
        </div>
      `,
      answer: async (value) => {
        const numeric = Number(value);
        if (!Number.isFinite(numeric) || numeric < 0) {
          throw new Error("Enter a valid non-negative integer.");
        }
        if (numeric !== expectedCount) {
          throw new Error("Incorrect count. Make sure you're extracting both patterns from the same record and counting unique sessions per user correctly.");
        }
        return true;
      },
    };
  },

  // Question 5: Pattern-Based Data Quality Score
  (random, id) => {
    const requiredPatterns = [
      { name: "email", regex: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, weight: 0.3 },
      { name: "phone", regex: /\d{3}-\d{3}-\d{4}/, weight: 0.25 },
      { name: "date", regex: /\d{4}-\d{2}-\d{2}/, weight: 0.25 },
      { name: "id", regex: /ID-\d{6}/, weight: 0.2 },
    ];

    const totalRecords = randomInt(random, 100, 150);
    const allRecords = [];
    let totalScore = 0;

    for (let i = 0; i < totalRecords; i++) {
      const recordId = `REC-${String(i + 1).padStart(4, "0")}`;
      const fields = {};
      let recordScore = 0;

      // Generate fields with varying completeness
      for (const pattern of requiredPatterns) {
        if (random() < 0.7) {
          if (pattern.name === "email") {
            fields.email = `user${randomInt(random, 1, 999)}@${pick(["example", "test", "sample"], random)}.${pick(["com", "org", "net"], random)}`;
          } else if (pattern.name === "phone") {
            fields.phone = `${randomInt(random, 100, 999)}-${randomInt(random, 100, 999)}-${randomInt(random, 1000, 9999)}`;
          } else if (pattern.name === "date") {
            const year = randomInt(random, 2020, 2024);
            const month = String(randomInt(random, 1, 12)).padStart(2, "0");
            const day = String(randomInt(random, 1, 28)).padStart(2, "0");
            fields.date = `${year}-${month}-${day}`;
          } else {
            fields.id = `ID-${String(randomInt(random, 100000, 999999))}`;
          }
          recordScore += pattern.weight;
        }
      }

      const record = {
        record_id: recordId,
        data: Object.values(fields).join(" | "),
      };

      allRecords.push(record);
      totalScore += recordScore;
    }

    const expectedAverageScore = totalRecords > 0 
      ? Math.round((totalScore / totalRecords) * 100) / 100
      : 0;

    const jsonlContent = allRecords.map((r) => JSON.stringify(r)).join("\n");
    const blob = new Blob([jsonlContent], { type: "application/jsonl" });

    return {
      title: "Regex Pattern Matching: Data Quality Scoring",
      blob,
      expectedValue: expectedAverageScore,
      tolerance: 0.01,
      question: html`
        <div class="mb-3">
          <h2>QualityScorer: Multi-Pattern Data Quality Analysis</h2>
          <p>
            <strong>QualityScorer</strong> evaluates data quality by checking for the presence of required patterns in each
            record. Each record should contain multiple types of information, and the quality score depends on how many
            required patterns are present.
          </p>
          <p>
            <strong>Required patterns (with weights):</strong>
          </p>
          <ul>
            <li>Email address: <code>username@domain.tld</code> (weight: 0.3)</li>
            <li>Phone number: <code>XXX-XXX-XXXX</code> format (weight: 0.25)</li>
            <li>Date: <code>YYYY-MM-DD</code> format (weight: 0.25)</li>
            <li>ID: <code>ID-XXXXXX</code> format (weight: 0.2)</li>
          </ul>
          <p>
            <strong>Scoring:</strong> For each record, check which patterns are present. Sum the weights of present patterns
            to get the record's quality score (max 1.0). Calculate the average quality score across all records.
          </p>
          <h3>Your Task</h3>
          <p>
            Create a Python script that:
          </p>
          <ol>
            <li>
              <strong>Load JSONL Data:</strong> Read the JSONL file containing data records.
            </li>
            <li>
              <strong>Build Regex Patterns:</strong> Create regex patterns for each required field type (email, phone, date,
              ID).
            </li>
            <li>
              <strong>Score Each Record:</strong> For each record, check the <code>data</code> field against all patterns.
              Sum the weights of patterns that match.
            </li>
            <li>
              <strong>Calculate Average:</strong> Calculate the average quality score across all records. Round to 2 decimal
              places.
            </li>
          </ol>
          <h3>Data File</h3>
          <p>
            Download the data records file:
            <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.jsonl`)}>
              ${id}.jsonl
            </button>
          </p>
          <p class="text-muted">
            <strong>Note:</strong> You need to match multiple patterns per record, calculate weighted scores, and compute the
            average. Use Python's <code>re</code> module to check each pattern.
          </p>
          <label for="${id}" class="form-label">
            What is the average data quality score across all records? (Round to 2 decimal places, e.g., 0.75)
          </label>
          <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 0.75" required />
          <p class="text-muted">
            Check each record against all patterns, sum weights for matches, then calculate average score.
          </p>
        </div>
      `,
      answer: async (value) => {
        const numeric = Number(value);
        if (!Number.isFinite(numeric) || numeric < 0 || numeric > 1) {
          throw new Error("Enter a valid number between 0 and 1.");
        }
        if (Math.abs(numeric - expectedAverageScore) > 0.01) {
          throw new Error("Incorrect average score. Verify that you're checking all patterns, summing weights correctly, and calculating the average across all records.");
        }
        return true;
      },
    };
  },
];

export { questionFactories };

export default async function({ user, weight = 1 }) {
  const id = "q-regex-pattern-matching";
  const random = seedrandom(`${user.email}#${id}`);
  
  // Pick a random question factory
  const questionFactory = pick(questionFactories, random);
  const questionData = questionFactory(random, id);

  return {
    id,
    title: questionData.title,
    weight,
    question: questionData.question,
    answer: questionData.answer,
  };
}

