export default function ({ user, weight }) {
  return {
    id: "api_idempotency_retries",
    weight,

    question: `
A global e-commerce platform processes orders through an API deployed across
multiple stateless servers behind a load balancer.

The order creation flow is:
1. Client sends POST /orders
2. Server writes order to database
3. Server triggers payment capture asynchronously
4. Server returns 201 Created

Due to network failures:
- Clients may retry requests
- Servers may crash after step (2) but before step (4)
- Load balancer may route retries to different servers

The system must guarantee:
- No duplicate orders
- No lost orders
- Ability to safely retry client requests

Which design MOST robustly guarantees EXACTLY-ONCE order creation
under all failure scenarios?

A. Use request timestamps and reject duplicates within a time window  
B. Generate an idempotency key per order and store it with a UNIQUE constraint,
   returning the previously created order on retry  
C. Cache successful responses in each server’s memory  
D. Delay database writes until payment capture completes  
    `,

    answer: "B",
  };
}
