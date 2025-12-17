import { html } from "lit-html";

export default function ({ user, weight }) {
  return {
    id: "q-movie-geo",
    title: "Geographical Origin of Cinema",
    weight: weight || 1,
    description: html`
      <p>Identify the director of the movie with IMDb ID <b>tt0068646</b>.</p>
      <p>Using the Nominatim API, find the <b>minimum latitude</b> of the bounding box for the <b>city</b> where that director was born (as listed on their Wikipedia page).</p>
    `,
    help: [
      html`Use <code>httpx</code> to fetch IMDb data and <code>geopy.geocoders.Nominatim</code> for coordinates.`,
      html`Ensure you verify the birthplace from the 'Infobox' or the first paragraph of the Wikipedia entry.`
    ]
  };
}