export const question = {
  title: "SQL Query Builder with Injection Prevention",
  description: `
    Implement a safe SQL query builder that prevents SQL injection attacks 
    by using parameterized queries. The builder should:
    
    - Build SELECT, INSERT, UPDATE queries
    - Accept parameters separately from query structure
    - Validate table/column names against whitelist
    - Return query with placeholders and parameters
    
    Input:
    - type: "SELECT" | "INSERT" | "UPDATE"
    - table: table name
    - options: query-specific options
    
    Output:
    - { query: string with ?, params: Array }
    
    Example for SELECT:
    - Input: { type: "SELECT", table: "users", where: { id: 5, name: "John" } }
    - Output: { 
        query: "SELECT * FROM users WHERE id = ? AND name = ?",
        params: [5, "John"]
      }
    
    IMPORTANT: Only allow tables and columns from whitelist to prevent injection
  `,
  testCases: [
    {
      input: {
        type: "SELECT",
        table: "users",
        where: { id: 5 }
      },
      expected: {
        query: "SELECT * FROM users WHERE id = ?",
        params: [5]
      }
    },
    {
      input: {
        type: "INSERT",
        table: "users",
        values: { name: "Alice", email: "alice@example.com", age: 28 }
      },
      expected: {
        query: "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
        params: ["Alice", "alice@example.com", 28]
      }
    },
    {
      input: {
        type: "UPDATE",
        table: "users",
        set: { email: "newemail@example.com", age: 30 },
        where: { id: 5 }
      },
      expected: {
        query: "UPDATE users SET email = ?, age = ? WHERE id = ?",
        params: ["newemail@example.com", 30, 5]
      }
    }
  ]
};
