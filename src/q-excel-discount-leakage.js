import { html } from "htm/preact";

export default function ({ weight }) {
  return {
    id: "excel_discount_leakage",
    weight,
    question: html`You are given a table with columns: region, price, quantity, applied_discount_pct, allowed_discount_pct. Identify rows where applied_discount_pct > allowed_discount_pct. For each such row compute excess_pct = applied_discount_pct - allowed_discount_pct and lost = price * quantity * (excess_pct / 100). Sum lost across all violating rows and return the numeric total rounded to 2 decimals.`,
    answer: { type: "number", decimals: 2 }
  };
}
