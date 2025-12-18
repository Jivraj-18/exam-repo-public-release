export default function ({ user, weight = 1.5 }) {
  return {
    id: "function_calling_routing",
    weight,
    question: `
User query:
"Calculate performance bonus for employee 24567 for 2025."

Which function call is correct?

A) get_expense_balance(employee_id=24567)  
B) calculate_performance_bonus(employee_id=24567, current_year=2025)  
C) calculate_performance_bonus(current_year=24567, employee_id=2025)  
D) get_ticket_status(ticket_id=24567)

Answer with A, B, C, or D.
    `,
    answer: "B",
  };
}
