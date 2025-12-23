import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-llm-structured-product-extraction";
  const title = "LLM: Structured product data extraction";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate random product details
  const productNames = ["SmartWatch Pro", "Wireless Earbuds", "Portable Charger", "Bluetooth Speaker", "Fitness Tracker"];
  const colors = ["Black", "Silver", "Blue", "Red", "White"];
  const productName = productNames[Math.floor(random() * productNames.length)];
  const color = colors[Math.floor(random() * colors.length)];
  const price = (Math.floor(random() * 150) + 50).toFixed(2);
  const stock = Math.floor(random() * 100) + 10;

  const productDescription = `The ${productName} in ${color} is available for $${price}. We currently have ${stock} units in stock. This premium device features water resistance, long battery life, and comes with a 1-year warranty.`;

  const answer = async (response) => {
    try {
      const json = JSON.parse(response);
      
      // Check if response has the required structure
      if (!json.response_format || !json.response_format.type) {
        throw new Error("Missing response_format.type field");
      }
      
      if (json.response_format.type !== "json_schema") {
        throw new Error("response_format.type must be 'json_schema'");
      }

      if (!json.response_format.json_schema) {
        throw new Error("Missing response_format.json_schema field");
      }

      const schema = json.response_format.json_schema;
      
      if (!schema.name) {
        throw new Error("Missing json_schema.name field");
      }

      if (!schema.strict || schema.strict !== true) {
        throw new Error("json_schema.strict must be true");
      }

      if (!schema.schema || !schema.schema.type || schema.schema.type !== "object") {
        throw new Error("json_schema.schema.type must be 'object'");
      }

      const props = schema.schema.properties;
      if (!props) {
        throw new Error("Missing json_schema.schema.properties");
      }

      // Check for required fields
      const requiredFields = ["product_name", "color", "price", "stock"];
      for (const field of requiredFields) {
        if (!props[field]) {
          throw new Error(`Missing required field in properties: ${field}`);
        }
        if (!props[field].type) {
          throw new Error(`Field ${field} must have a type`);
        }
      }

      // Validate types
      if (props.product_name.type !== "string") {
        throw new Error("product_name must be type 'string'");
      }
      if (props.color.type !== "string") {
        throw new Error("color must be type 'string'");
      }
      if (props.price.type !== "number") {
        throw new Error("price must be type 'number'");
      }
      if (props.stock.type !== "integer") {
        throw new Error("stock must be type 'integer'");
      }

      // Check required array
      const required = schema.schema.required;
      if (!required || !Array.isArray(required)) {
        throw new Error("json_schema.schema.required must be an array");
      }

      for (const field of requiredFields) {
        if (!required.includes(field)) {
          throw new Error(`Field ${field} must be in required array`);
        }
      }

      // Check additionalProperties
      if (schema.schema.additionalProperties !== false) {
        throw new Error("json_schema.schema.additionalProperties must be false");
      }

      // Check messages
      if (!json.messages || !Array.isArray(json.messages)) {
        throw new Error("messages must be an array");
      }

      if (json.messages.length === 0) {
        throw new Error("messages array cannot be empty");
      }

      // Check if description is in messages
      const hasDescription = json.messages.some(msg => 
        msg.content && typeof msg.content === "string" && msg.content.includes(productDescription)
      );

      if (!hasDescription) {
        throw new Error("messages must include the product description");
      }

      // Check model
      if (!json.model) {
        throw new Error("Missing model field");
      }

      if (!json.model.includes("gpt-4o")) {
        throw new Error("Model must be a GPT-4o variant (gpt-4o-mini or gpt-4o)");
      }

      return true;
    } catch (error) {
      throw new Error(`JSON validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>Extract structured product data with LLM</h2>
      <p>
        ShopExtract is an e-commerce analytics platform that processes product descriptions from various retailers.
        They need to extract structured information from unstructured product descriptions to populate their database.
      </p>

      <h3>Background</h3>
      <p>
        OpenAI's Structured Outputs feature ensures models generate JSON that strictly follows your schema.
        This is perfect for extracting specific fields from text where you need guaranteed structure.
      </p>

      <h3>Your task</h3>
      <p>Create a JSON request body for OpenAI's chat completions API that extracts product information from this description:</p>
      
      <div class="alert alert-info">
        <strong>Product Description:</strong><br>
        ${productDescription}
      </div>

      <h3>What to submit</h3>
      <p>Write the complete JSON request body (not the URL or headers) that you would POST to <code>https://api.openai.com/v1/chat/completions</code>.</p>

      <h3>Requirements</h3>
      <ol>
        <li>Use model <code>gpt-4o-mini</code> or <code>gpt-4o</code></li>
        <li>Include the product description in the messages</li>
        <li>Use <code>response_format</code> with <code>type: "json_schema"</code></li>
        <li>Define a JSON schema that extracts these fields (with correct types):
          <ul>
            <li><code>product_name</code> (string)</li>
            <li><code>color</code> (string)</li>
            <li><code>price</code> (number)</li>
            <li><code>stock</code> (integer)</li>
          </ul>
        </li>
        <li>Set <code>strict: true</code> in the json_schema</li>
        <li>Mark all four fields as required</li>
        <li>Set <code>additionalProperties: false</code></li>
      </ol>

      <h3>Example structure</h3>
      <pre><code>{
  "model": "gpt-4o-mini",
  "messages": [...],
  "response_format": {
    "type": "json_schema",
    "json_schema": {
      "name": "product_extraction",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "product_name": {"type": "string"},
          ...
        },
        "required": ["product_name", ...],
        "additionalProperties": false
      }
    }
  }
}</code></pre>

      <label for="${id}" class="form-label">Paste your complete JSON request body:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="20"
        required
        placeholder='{"model": "gpt-4o-mini", "messages": [...], "response_format": {...}}'
      ></textarea>
      <p class="text-muted">
        We will validate that your JSON includes the correct schema structure, required fields with proper types,
        and the product description in messages.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
