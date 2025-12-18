export const question = {
  title: "JSON Schema Validator for Nested Data",
  description: `
    Implement a schema validator that checks if a given JSON object matches 
    a defined schema. The schema should support:
    - type checking (string, number, boolean, object, array)
    - required fields
    - nested object validation
    - array item type validation
    
    Input:
    - data: Object to validate
    - schema: Schema definition
    
    Output:
    - { valid: boolean, errors: Array<string> }
    
    Schema format:
    {
      type: "object",
      required: ["field1", "field2"],
      properties: {
        field1: { type: "string" },
        field2: { type: "number", minimum: 0 },
        nested: {
          type: "object",
          properties: { ... }
        },
        items: {
          type: "array",
          items: { type: "string" }
        }
      }
    }
  `,
  testCases: [
    {
      input: {
        data: {
          name: "John",
          age: 30,
          email: "john@example.com"
        },
        schema: {
          type: "object",
          required: ["name", "age"],
          properties: {
            name: { type: "string" },
            age: { type: "number", minimum: 18 },
            email: { type: "string" }
          }
        }
      },
      expected: { valid: true, errors: [] }
    },
    {
      input: {
        data: {
          name: "John",
          age: 15
        },
        schema: {
          type: "object",
          required: ["name", "age"],
          properties: {
            name: { type: "string" },
            age: { type: "number", minimum: 18 }
          }
        }
      },
      expected: { 
        valid: false, 
        errors: ["age must be minimum 18"]
      }
    }
  ],
  solution: `
    function validateSchema(data, schema) {
      const errors = [];
      
      // Check required fields
      if (schema.required) {
        for (const field of schema.required) {
          if (!(field in data)) {
            errors.push(\`Missing required field: \${field}\`);
          }
        }
      }
      
      // Validate properties
      if (schema.properties) {
        for (const [key, value] of Object.entries(data)) {
          if (key in schema.properties) {
            const prop = schema.properties[key];
            
            // Type checking
            if (typeof value !== prop.type && prop.type !== "array" && prop.type !== "object") {
              errors.push(\`Field \${key} has wrong type\`);
            }
            
            // Minimum value check
            if (prop.minimum !== undefined && value < prop.minimum) {
              errors.push(\`\${key} must be minimum \${prop.minimum}\`);
            }
          }
        }
      }
      
      return { valid: errors.length === 0, errors };
    }
  `
};
