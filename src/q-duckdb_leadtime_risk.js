import { html } from "htm/preact";

export default function ({ weight }) {
  return {
    id: "duckdb_leadtime_risk",
    weight,
    question: html`You have two tables: suppliers (supplier_id, name) and purchase_orders (order_id, supplier_id, promised_days, actual_days). Join orders to suppliers, compute delay = actual_days - promised_days for each order, then compute the average delay per supplier. Return the supplier name with the highest average delay. If there is a tie, return any one of the top suppliers as text.`,
    answer: { type: "text" }
  };
}
