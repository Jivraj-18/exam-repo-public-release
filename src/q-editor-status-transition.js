import { html } from "htm/preact";

export default function ({ weight }) {
  return {
    id: "editor_status_transition",
    weight,
    question: html`Given a plain text incident log where each incident block starts with a line like "incident: <id>" and subsequent lines can contain occurrences of "status=<state>", extract the sequence of status values for each incident in document order. Count how many incidents exhibit strictly more than two status transitions (i.e., more than two distinct status changes in their sequence). Return the integer count of such incidents.`,
    answer: { type: "integer" }
  };
}
