// Created by 23f2001000 

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-openmeteo-temp";
  const title = "Open-Meteo API – Maximum Temperature";

  const answer = "35";

  const question = html`
    <div class="mb-3">
      <p>
        Using the <strong>Open-Meteo API</strong>, fetch today’s
        <strong>maximum temperature</strong> for
        <strong>Chennai, India</strong>.
      </p>
      <p>Return only the numeric value in Celsius.</p>
      <label for="${id}" class="form-label">Temperature (°C):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
