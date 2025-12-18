import { html } from "htm/preact";

export default function ({ weight }) {
  return {
    id: "json_role_coverage",
    weight,
    question: html`You are given a JSON array of user objects. Each user has a property "roles" which is an array of role strings (for example ["editor", "admin"]). Count how many users have at least one role that equals or contains the substring "admin" (case-insensitive). Compute the coverage ratio as (number_with_admin / total_users) * 100 and return it as a number rounded to 2 decimals.`,
    answer: { type: "number", decimals: 2 }
  };
}
