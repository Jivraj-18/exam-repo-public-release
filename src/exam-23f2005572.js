// exam-23f2005572.js
export async function questions(user, elementMap) {
  const [$questions, $sidebarQuestions] = [...elementMap.values()];

  const results = {};

  // Question 1: API Rate Limiting Validator
  results['q1-rate-limit'] = {
    answer: validateRateLimit,
    weight: 1,
  };

  // Question 2: JSON Schema Validator
  results['q2-json-schema'] = {
    answer: validateSchema,
    weight: 1,
  };

  // Question 3: CSV Data Converter
  results['q3-csv-converter'] = {
    answer: detectAndConvert,
    weight: 1,
  };

  // Question 4: SQL Query Builder
  results['q4-sql-builder'] = {
    answer: buildSqlQuery,
    weight: 1,
  };

  // Question 5: Cache Manager
  results['q5-cache-manager'] = {
    answer: manageCacheOperations,
    weight: 1,
  };

  // Render the questions in the HTML
  if ($questions) {
    $questions.innerHTML = /* html */ `
      <form id="exam-form" class="needs-validation" novalidate>
        ${renderQuestion1()}
        ${renderQuestion2()}
        ${renderQuestion3()}
        ${renderQuestion4()}
        ${renderQuestion5()}
      </form>
    `;
  }

  // Render the sidebar index
  if ($sidebarQuestions) {
    $sidebarQuestions.innerHTML = /* html */ `
      <ol>
        <li><a href="#q1-rate-limit">API Rate Limiting Validator</a></li>
        <li><a href="#q2-json-schema">JSON Schema Validator</a></li>
        <li><a href="#q3-csv-converter">CSV Data Converter</a></li>
        <li><a href="#q4-sql-builder">SQL Query Builder</a></li>
        <li><a href="#q5-cache-manager">Cache Manager</a></li>
      </ol>
    `;
  }

  return results;
}

// ============ QUESTION 1: API Rate Limiting ============
function renderQuestion1() {
  return /* html */ `
    <div class="card mb-3" data-question="q1-rate-limit" id="q1-rate-limit">
      <div class="card-header">
        <h3 class="card-title">Question 1: API Rate Limiting Validator</h3>
      </div>
      <div class="card-body">
        <p>Implement a rate limiting validator for API middleware. Given request timestamps and a rate limit configuration, determine which requests violate the limit.</p>
        
        <p><strong>Rate Limit Definition:</strong> Maximum N requests allowed per M milliseconds (sliding window).</p>

        <p><strong>Input Format:</strong></p>
        <ul>
          <li>timestamps: [0, 100, 200, 300, 500, 1500] (milliseconds)</li>
          <li>rateLimit: { maxRequests: 3, windowMs: 1000 }</li>
        </ul>

        <p><strong>Output:</strong> Array of booleans indicating if each request is allowed.</p>

        <p><strong>Example:</strong></p>
        <pre><code class="language-javascript">
// With maxRequests=3, windowMs=1000
// Requests at: [0, 100, 200, 300, 500, 1500]
// Allowed:     [T,  T,  T,  F,  F,  T]
// 
// Explanation:
// - Requests at 0, 100, 200 are within 1000ms window → 3 requests OK
// - Request at 300 is 4th request within window → DENIED
// - Request at 500 is 5th request within window → DENIED
// - Request at 1500 is outside first window → ALLOWED (new window)
        </code></pre>

        <div class="form-group">
          <label for="q1-rate-limit" class="form-label">Enter allowed/denied status (JSON array of true/false):</label>
          <textarea 
            class="form-control" 
            id="q1-rate-limit" 
            name="q1-rate-limit" 
            rows="3"
            placeholder='[true, true, true, false, false, true]'
          ></textarea>
        </div>
        <button type="button" class="btn btn-sm btn-primary check-answer" data-question="q1-rate-limit">Check</button>
      </div>
    </div>
  `;
}

async function validateRateLimit(answer) {
  try {
    const userResult = JSON.parse(answer);
    const expected = [true, true, true, false, false, true];
    
    if (!Array.isArray(userResult) || userResult.length !== expected.length) {
      throw "Expected an array of 6 booleans";
    }
    
    return JSON.stringify(userResult) === JSON.stringify(expected);
  } catch (e) {
    if (typeof e === 'string') throw e;
    throw "Invalid JSON. Expected: [true, true, true, false, false, true]";
  }
}

// ============ QUESTION 2: JSON Schema Validator ============
function renderQuestion2() {
  return /* html */ `
    <div class="card mb-3" data-question="q2-json-schema" id="q2-json-schema">
      <div class="card-header">
        <h3 class="card-title">Question 2: JSON Schema Validator</h3>
      </div>
      <div class="card-body">
        <p>Validate a JSON object against a schema with type checking and constraints.</p>
        
        <p><strong>Test Case:</strong></p>
        <pre><code class="language-javascript">
const data = {
  name: "John",
  age: 15
};

const schema = {
  type: "object",
  required: ["name", "age"],
  properties: {
    name: { type: "string" },
    age: { type: "number", minimum: 18 }
  }
};

// Question: Is this data VALID against the schema?
        </code></pre>

        <p><strong>Validation Rules:</strong></p>
        <ul>
          <li>All required fields must be present</li>
          <li>All fields must match their specified types</li>
          <li>All constraints (minimum, maximum) must be satisfied</li>
        </ul>

        <div class="form-group">
          <label for="q2-json-schema" class="form-label">Enter true if valid, false if invalid:</label>
          <input 
            type="text" 
            class="form-control" 
            id="q2-json-schema" 
            name="q2-json-schema"
            placeholder="true or false"
          />
        </div>
        <button type="button" class="btn btn-sm btn-primary check-answer" data-question="q2-json-schema">Check</button>
      </div>
    </div>
  `;
}

async function validateSchema(answer) {
  // age is 15 but minimum is 18, so data is INVALID
  const userAnswer = answer.toLowerCase().trim();
  return userAnswer === "false";
}

// ============ QUESTION 3: CSV Data Converter ============
function renderQuestion3() {
  return /* html */ `
    <div class="card mb-3" data-question="q3-csv-converter" id="q3-csv-converter">
      <div class="card-header">
        <h3 class="card-title">Question 3: CSV Data Type Detector</h3>
      </div>
      <div class="card-body">
        <p>Analyze CSV data and automatically detect column data types.</p>
        
        <p><strong>Sample CSV Data (parsed as objects):</strong></p>
        <pre><code class="language-javascript">
[
  { name: "Alice", age: "25", active: "true", joinDate: "2023-01-15" },
  { name: "Bob", age: "30", active: "false", joinDate: "2022-06-20" },
  { name: "Charlie", age: "35", active: "true", joinDate: "2024-02-10" }
]
        </code></pre>

        <p><strong>Detection Logic:</strong></p>
        <ul>
          <li>If all values parse to numbers → <code>number</code></li>
          <li>If all values are "true"/"false" → <code>boolean</code></li>
          <li>If all values match ISO date format → <code>date</code></li>
          <li>Otherwise → <code>string</code></li>
        </ul>

        <p><strong>Question:</strong> What data type should be detected for the "age" column?</p>

        <div class="form-group">
          <label for="q3-csv-converter" class="form-label">Enter detected type:</label>
          <input 
            type="text" 
            class="form-control" 
            id="q3-csv-converter" 
            name="q3-csv-converter"
            placeholder="number, string, boolean, or date"
          />
        </div>
        <button type="button" class="btn btn-sm btn-primary check-answer" data-question="q3-csv-converter">Check</button>
      </div>
    </div>
  `;
}

async function detectAndConvert(answer) {
  const userAnswer = answer.toLowerCase().trim();
  return userAnswer === "number";
}

// ============ QUESTION 4: SQL Query Builder ============
function renderQuestion4() {
  return /* html */ `
    <div class="card mb-3" data-question="q4-sql-builder" id="q4-sql-builder">
      <div class="card-header">
        <h3 class="card-title">Question 4: SQL Query Builder (Injection Prevention)</h3>
      </div>
      <div class="card-body">
        <p>Build a parameterized SQL query to prevent SQL injection attacks.</p>
        
        <p><strong>Input:</strong></p>
        <pre><code class="language-javascript">
{
  type: "SELECT",
  table: "users",
  where: { id: 5, name: "John" }
}
        </code></pre>

        <p><strong>Requirements:</strong></p>
        <ul>
          <li>Use parameterized queries with ? placeholders</li>
          <li>Never concatenate user input directly into SQL</li>
          <li>Return { query: string, params: Array }</li>
        </ul>

        <p><strong>Expected Output:</strong></p>
        <pre><code class="language-javascript">
{
  query: "SELECT * FROM users WHERE id = ? AND name = ?",
  params: [5, "John"]
}
        </code></pre>

        <p><strong>Question:</strong> How many ? placeholders should the query contain?</p>

        <div class="form-group">
          <label for="q4-sql-builder" class="form-label">Enter the number of placeholders:</label>
          <input 
            type="number" 
            class="form-control" 
            id="q4-sql-builder" 
            name="q4-sql-builder"
            placeholder="2"
            min="0"
            max="10"
          />
        </div>
        <button type="button" class="btn btn-sm btn-primary check-answer" data-question="q4-sql-builder">Check</button>
      </div>
    </div>
  `;
}

async function buildSqlQuery(answer) {
  try {
    const num = parseInt(answer);
    return num === 2; // Two where conditions: id and name
  } catch (e) {
    throw "Please enter a number";
  }
}

// ============ QUESTION 5: Cache Manager ============
function renderQuestion5() {
  return /* html */ `
    <div class="card mb-3" data-question="q5-cache-manager" id="q5-cache-manager">
      <div class="card-header">
        <h3 class="card-title">Question 5: API Response Cache with TTL</h3>
      </div>
      <div class="card-body">
        <p>Implement cache operations with Time-To-Live (TTL) expiration.</p>
        
        <p><strong>Cache Operations Sequence:</strong></p>
        <pre><code class="language-javascript">
Operations:
1. set("user:1", {id: 1, name: "John"}, 1000)  // Store with 1000ms TTL
   Time: 0ms

2. get("user:1")  // Retrieve from cache
   Time: 500ms
   Result: {id: 1, name: "John"} ✓ (not expired, cache HIT)

3. get("user:1")  // Try to retrieve after expiration
   Time: 1500ms
   Result: null ✓ (expired, cache MISS)
        </code></pre>

        <p><strong>Question:</strong> In this scenario, how many cache HITS occurred?</p>

        <p><strong>Explanation:</strong></p>
        <ul>
          <li>Hit = Successfully retrieved cached value before TTL expiration</li>
          <li>Miss = No cached value or value expired</li>
        </ul>

        <div class="form-group">
          <label for="q5-cache-manager" class="form-label">Enter number of cache hits:</label>
          <input 
            type="number" 
            class="form-control" 
            id="q5-cache-manager" 
            name="q5-cache-manager"
            placeholder="1"
            min="0"
            max="10"
          />
        </div>
        <button type="button" class="btn btn-sm btn-primary check-answer" data-question="q5-cache-manager">Check</button>
      </div>
    </div>
  `;
}

async function manageCacheOperations(answer) {
  try {
    const num = parseInt(answer);
    return num === 1; // Only the get at 500ms is a hit
  } catch (e) {
    throw "Please enter a number";
  }
}
