export default function ({ user, weight }) {
  const jsonResponse = [
    {
      statusCode: 200,
      message: "Success: Item created",
      timestamp: "2024-11-01T08:00:00Z",
      user: "john.doe@example.com",
      operation: "create",
      item: "Item A",
      category: "electronics",
      duration: 120, // duration in seconds
      location: "US",
      priority: "high",
    },
    {
      statusCode: 200,
      message: "Success: Item updated",
      timestamp: "2024-11-01T09:30:00Z",
      user: "alice.smith@example.com",
      operation: "update",
      item: "Item B",
      category: "home-appliances",
      duration: 90,
      location: "UK",
      priority: "medium",
    },
    {
      statusCode: 200,
      message: "Success: Item deleted",
      timestamp: "2024-11-01T10:15:00Z",
      user: "bob.jones@example.com",
      operation: "delete",
      item: "Item C",
      category: "furniture",
      duration: 60,
      location: "Canada",
      priority: "low",
    },
    {
      statusCode: 404,
      message: "Error: Not Found",
      timestamp: "2024-11-01T11:00:00Z",
      user: "mary.jones@example.com",
      operation: "retrieve",
      item: "Item D",
      category: "fashion",
      duration: 150,
      location: "Australia",
      priority: "high",
    },
    {
      statusCode: 200,
      message: "Success: Item retrieved",
      timestamp: "2024-11-01T12:30:00Z",
      user: "charlie.brown@example.com",
      operation: "retrieve",
      item: "Item E",
      category: "electronics",
      duration: 100,
      location: "US",
      priority: "medium",
    },
    {
      statusCode: 500,
      message: "Error: Internal Server Error",
      timestamp: "2024-11-01T13:00:00Z",
      user: "emma.white@example.com",
      operation: "create",
      item: "Item F",
      category: "kitchen",
      duration: 200,
      location: "Germany",
      priority: "high",
    },
    {
      statusCode: 200,
      message: "Success: Action completed",
      timestamp: "2024-11-01T14:15:00Z",
      user: "olivia.green@example.com",
      operation: "complete",
      item: "Item G",
      category: "fashion",
      duration: 110,
      location: "Canada",
      priority: "low",
    },
    {
      statusCode: 400,
      message: "Error: Bad Request",
      timestamp: "2024-11-01T15:45:00Z",
      user: "lucas.white@example.com",
      operation: "update",
      item: "Item H",
      category: "sports",
      duration: 130,
      location: "Brazil",
      priority: "high",
    },
    {
      statusCode: 200,
      message: "Success: Item processed",
      timestamp: "2024-11-01T16:30:00Z",
      user: "michael.king@example.com",
      operation: "process",
      item: "Item I",
      category: "electronics",
      duration: 80,
      location: "US",
      priority: "medium",
    },
    {
      statusCode: 200,
      message: "Success: Action updated",
      timestamp: "2024-11-01T17:10:00Z",
      user: "noah.miller@example.com",
      operation: "update",
      item: "Item J",
      category: "home-appliances",
      duration: 70,
      location: "UK",
      priority: "low",
    },
    {
      statusCode: 503,
      message: "Error: Service Unavailable",
      timestamp: "2024-11-01T18:30:00Z",
      user: "sophia.white@example.com",
      operation: "create",
      item: "Item K",
      category: "outdoor",
      duration: 160,
      location: "France",
      priority: "high",
    },
    {
      statusCode: 200,
      message: "Success: Item validated",
      timestamp: "2024-11-01T19:00:00Z",
      user: "jack.smith@example.com",
      operation: "validate",
      item: "Item L",
      category: "electronics",
      duration: 140,
      location: "Germany",
      priority: "medium",
    },
  ];

  return {
    id: "json-success-count-enhanced",
    weight,
    question: `
      <h2>Success Response Counter</h2>
      <ol>
        <li>Use the provided JSON response to count the number of objects that meet the following criteria:</li>
        <ul>
          <li>Status code is <code>200</code></li>
          <li>Message starts with <code>Success</code> and contains the word <code>Item</code> or <code>Action</code></li>
          <li>Additional condition: <code>category</code> must be either <code>"electronics"</code> or <code>"fashion"</code></li>
        </ul>
        <li>Calculate offset: <code>(length of your email) mod 10</code></li>
        <li>Final answer = success_count + offset</li>
        <li>Submit the integer only</li>
      </ol>
      <p><strong>Your Email:</strong> ${user.email}</p>
      <p><strong>Email Length:</strong> ${user.email.length}</p>
      <p><strong>Note:</strong> For this test, assume the JSON response above and the number of successful responses based on the criteria.</p>
    `,
    validate: (answer) => {
      // Filter the JSON response to count successful responses
      const successCount = jsonResponse.filter(
        (response) =>
          response.statusCode === 200 &&
          response.message.startsWith("Success") &&
          (response.message.includes("Item") || response.message.includes("Action")) &&
          (response.category === "electronics" || response.category === "fashion")
      ).length;

      // Calculate the offset based on the user's email length
      const offset = user.email.length % 10;

      // The expected answer
      const expected = successCount + offset;
      const submitted = parseInt(answer, 10);

      if (submitted === expected) {
        return { correct: true };
      }

      return {
        correct: false,
        feedback: `Expected ${expected}. Success count: ${successCount}, Offset: ${offset}, Email length: ${user.email.length}`,
      };
    },
  };
}
