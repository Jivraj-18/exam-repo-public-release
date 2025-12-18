import { html } from "htm/preact";

export default function ({ weight }) {
  return {
    id: "shell_slow_request_rate",
    weight,
    question: html`You are given an HTTP access log table with columns: path, status, rt (response time in ms). Filter rows where path equals "/api/search" and status equals 200. Compute the percentage of those rows whose rt value is greater than 800 (milliseconds). Return the percentage as a number rounded to 2 decimals.`,
    answer: { type: "number", decimals: 2 }
  };
}
