export const question = {
  title: "CSV Data Type Detector and Converter",
  description: `
    Implement a tool that analyzes CSV data and automatically detects 
    column data types, then converts the data to the appropriate types.
    
    Supported types: string, number, boolean, date (ISO format)
    
    Requirements:
    - Detect data types for each column
    - Handle missing values (null/undefined)
    - Convert data to detected types
    - Return type mapping and converted data
    
    Input:
    - rows: Array of objects (parsed CSV rows)
    
    Output:
    - { 
        types: { columnName: detectedType },
        data: Array of converted rows
      }
    
    Detection rules:
    - If all non-null values can be parsed as numbers → number
    - If all non-null values are "true"/"false" → boolean
    - If all non-null values match ISO date format → date
    - Otherwise → string
  `,
  testCases: [
    {
      input: {
        rows: [
          { name: "Alice", age: "25", active: "true", joinDate: "2023-01-15" },
          { name: "Bob", age: "30", active: "false", joinDate: "2022-06-20" },
          { name: "Charlie", age: "35", active: "true", joinDate: "2024-02-10" }
        ]
      },
      expected: {
        types: {
          name: "string",
          age: "number",
          active: "boolean",
          joinDate: "date"
        },
        data: [
          { name: "Alice", age: 25, active: true, joinDate: "2023-01-15" },
          { name: "Bob", age: 30, active: false, joinDate: "2022-06-20" },
          { name: "Charlie", age: 35, active: true, joinDate: "2024-02-10" }
        ]
      }
    },
    {
      input: {
        rows: [
          { product: "Widget", price: "19.99", stock: "100", inStock: "true" },
          { product: "Gadget", price: "29.99", stock: "50", inStock: "true" }
        ]
      },
      expected: {
        types: {
          product: "string",
          price: "number",
          stock: "number",
          inStock: "boolean"
        },
        data: [
          { product: "Widget", price: 19.99, stock: 100, inStock: true },
          { product: "Gadget", price: 29.99, stock: 50, inStock: true }
        ]
      }
    }
  ]
};
