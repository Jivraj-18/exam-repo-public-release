// Question 1: API Data Fetching and Processing
import { html } from "htm/preact";
import { codingQuestion } from "./utils/question.js";

export default function ({ user, weight = 1 }) {
  const email = user?.email || "student@example.com";
  const rollNumber = email.split("@")[0];
  
  // Generate unique API response based on roll number
  const seed = rollNumber.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  
  const sampleApiResponse = {
    "status": "success",
    "data": {
      "users": [
        {
          "id": (seed % 1000) + 1,
          "name": "Alice Johnson",
          "email": "alice@example.com",
          "age": 25 + (seed % 20),
          "orders": [
            {"order_id": "ORD001", "amount": 150.50 + (seed % 50), "status": "completed"},
            {"order_id": "ORD002", "amount": 200.00 + (seed % 100), "status": "pending"}
          ]
        },
        {
          "id": (seed % 1000) + 2,
          "name": "Bob Smith",
          "email": "bob@example.com",
          "age": 30 + (seed % 15),
          "orders": [
            {"order_id": "ORD003", "amount": 300.75 + (seed % 75), "status": "completed"}
          ]
        },
        {
          "id": (seed % 1000) + 3,
          "name": "Carol White",
          "email": "carol@example.com",
          "age": 28 + (seed % 10),
          "orders": []
        }
      ],
      "timestamp": "2024-12-17T10:30:00Z"
    }
  };

  return codingQuestion({
    id: "api-data-fetching",
    weight,
    question: html`
      <h3>API Data Fetching and Transformation</h3>
      <p>
        You're building a data pipeline that fetches user data from an API and processes it
        for analysis. The API returns nested JSON data that needs to be flattened and cleaned.
      </p>
      <p>
        Sample API Response for ${email}:
        <code style="display: block; white-space: pre-wrap; background: #f5f5f5; padding: 10px; margin: 10px 0; max-height: 300px; overflow-y: auto;">
${JSON.stringify(sampleApiResponse, null, 2)}
        </code>
      </p>
      <p>
        Write a Python function <code>process_api_response(api_response)</code> that:
      </p>
      <ol>
        <li>Validates the API response (checks for 'status' and 'data' keys)</li>
        <li>Extracts user information and flattens the data</li>
        <li>Returns a dictionary with:
          <ul>
            <li><code>'users_summary'</code>: List of dicts with user_id, name, email, age, total_orders, total_spent</li>
            <li><code>'completed_orders'</code>: List of all completed orders with user info</li>
            <li><code>'pending_orders'</code>: List of all pending orders with user info</li>
            <li><code>'statistics'</code>: Dict with total_users, avg_age, total_revenue, users_without_orders</li>
            <li><code>'validation_errors'</code>: List of any validation errors found</li>
          </ul>
        </li>
      </ol>
      <p>
        <strong>Note:</strong> Handle cases where users have no orders gracefully.
        Revenue should only count completed orders.
      </p>
    `,
    solution: `
def process_api_response(api_response):
    """
    Process and transform API response data.
    
    Args:
        api_response: Dictionary containing API response
    
    Returns:
        Dictionary with processed data and statistics
    """
    validation_errors = []
    
    # Validate response structure
    if not isinstance(api_response, dict):
        return {
            'users_summary': [],
            'completed_orders': [],
            'pending_orders': [],
            'statistics': {},
            'validation_errors': ['Invalid response: not a dictionary']
        }
    
    if 'status' not in api_response:
        validation_errors.append('Missing status field')
    
    if 'data' not in api_response:
        validation_errors.append('Missing data field')
        return {
            'users_summary': [],
            'completed_orders': [],
            'pending_orders': [],
            'statistics': {},
            'validation_errors': validation_errors
        }
    
    data = api_response.get('data', {})
    users = data.get('users', [])
    
    if not isinstance(users, list):
        validation_errors.append('Users field is not a list')
        users = []
    
    # Process users
    users_summary = []
    completed_orders = []
    pending_orders = []
    total_revenue = 0
    total_age = 0
    users_without_orders = 0
    
    for user in users:
        user_id = user.get('id')
        name = user.get('name')
        email = user.get('email')
        age = user.get('age')
        orders = user.get('orders', [])
        
        # Calculate user statistics
        total_orders = len(orders)
        total_spent = 0
        
        for order in orders:
            amount = order.get('amount', 0)
            status = order.get('status', '')
            order_id = order.get('order_id', '')
            
            order_info = {
                'order_id': order_id,
                'user_id': user_id,
                'user_name': name,
                'amount': amount,
                'status': status
            }
            
            if status == 'completed':
                completed_orders.append(order_info)
                total_spent += amount
                total_revenue += amount
            elif status == 'pending':
                pending_orders.append(order_info)
        
        if total_orders == 0:
            users_without_orders += 1
        
        users_summary.append({
            'user_id': user_id,
            'name': name,
            'email': email,
            'age': age,
            'total_orders': total_orders,
            'total_spent': round(total_spent, 2)
        })
        
        if age:
            total_age += age
    
    # Calculate statistics
    total_users = len(users)
    avg_age = round(total_age / total_users, 2) if total_users > 0 else 0
    
    statistics = {
        'total_users': total_users,
        'avg_age': avg_age,
        'total_revenue': round(total_revenue, 2),
        'users_without_orders': users_without_orders
    }
    
    return {
        'users_summary': users_summary,
        'completed_orders': completed_orders,
        'pending_orders': pending_orders,
        'statistics': statistics,
        'validation_errors': validation_errors
    }

# Test with the provided API response
api_response = ${JSON.stringify(sampleApiResponse)}
result = process_api_response(api_response)
print(result)
`,
    test: (code) => {
      return `
${code}

# Test cases
api_response = ${JSON.stringify(sampleApiResponse)}
result = process_api_response(api_response)

# Check structure
assert 'users_summary' in result, "Missing 'users_summary'"
assert 'completed_orders' in result, "Missing 'completed_orders'"
assert 'pending_orders' in result, "Missing 'pending_orders'"
assert 'statistics' in result, "Missing 'statistics'"
assert 'validation_errors' in result, "Missing 'validation_errors'"

# Verify users_summary
assert len(result['users_summary']) == 3, f"Expected 3 users, got {len(result['users_summary'])}"
for user in result['users_summary']:
    assert 'user_id' in user, "User missing 'user_id'"
    assert 'name' in user, "User missing 'name'"
    assert 'email' in user, "User missing 'email'"
    assert 'age' in user, "User missing 'age'"
    assert 'total_orders' in user, "User missing 'total_orders'"
    assert 'total_spent' in user, "User missing 'total_spent'"

# Verify statistics
stats = result['statistics']
assert 'total_users' in stats, "Statistics missing 'total_users'"
assert 'avg_age' in stats, "Statistics missing 'avg_age'"
assert 'total_revenue' in stats, "Statistics missing 'total_revenue'"
assert 'users_without_orders' in stats, "Statistics missing 'users_without_orders'"

assert stats['total_users'] == 3, "Total users should be 3"
assert stats['users_without_orders'] == 1, "Should have 1 user without orders"

# Verify orders separation
for order in result['completed_orders']:
    assert order['status'] == 'completed', "Completed orders should have status 'completed'"
    assert 'user_name' in order, "Order missing user_name"

for order in result['pending_orders']:
    assert order['status'] == 'pending', "Pending orders should have status 'pending'"

# Test with invalid response
invalid_result = process_api_response({})
assert len(invalid_result['validation_errors']) > 0, "Should have validation errors for empty response"

print("All tests passed!")
`;
    },
  });
}