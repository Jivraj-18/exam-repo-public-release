import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function question({ user, weight = 1 }) {
  const id = "data-sourcing-dom-img-in-anchor";

  return {
    id,

    title: "Scraping Internet Archive’s Wayback Machine",

    question: html`
      <div class="mb-3">
        <h3>Context</h3>
        <p>
          <strong>CivicMedia</strong> is a public-interest digital media organization
          that curates historical snapshots of government websites to study how
          public communication evolves over time. One of the datasets used by the
          research team consists of archived web pages from the early 2010s,
          preserved using the Internet Archive’s Wayback Machine.
        </p>

        <p>
          As part of an internal audit, the team wants to analyze how visual media
          was embedded within navigational elements on official government
          websites. Specifically, they are interested in understanding how often
          images were used as clickable links, which can indicate design trends
          and accessibility practices of the time.
        </p>

        <p>
          You are a data analyst at CivicMedia, tasked with extracting structural
          information from an archived government webpage to support this
          research.
        </p>

        <h3>Your Task</h3>
        <p>
          You are given an archived snapshot of the White House website:
        </p>

        <p>
          <a
            href="https://web.archive.org/web/20110101070603id_/https://www.whitehouse.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://web.archive.org/web/20110101070603id_/https://www.whitehouse.gov/
          </a>
        </p>

        <p>
          Using the <strong>browser’s JavaScript console</strong>, analyze the page
          structure and determine how many
          <code>&lt;img&gt;</code> (image) elements are
          <strong>nested inside <code>&lt;a&gt;</code> (anchor) tags</strong>
          on the page.
        </p>

        <h3>Steps to Consider</h3>
        <ol>
          <li>Open the webpage in your browser</li>
          <li>Open Developer Tools and access the JavaScript console</li>
          <li>
            Use DOM query methods such as
            <code>document.querySelectorAll()</code>
          </li>
          <li>Count the relevant elements</li>
          <li>Images used as CSS backgrounds should NOT be counted.</li>
        </ol>

        <h3>Submission Format</h3>
        <p>
          Submit <strong>only the final count</strong> as a number in the answer
          box below.
        </p>

        <h3>Impact</h3>
        <p>
          By completing this analysis, you simulate a real-world web auditing task
          commonly performed in data sourcing and digital humanities research.
          The results help CivicMedia quantify historical web design practices,
          contributing to long-term studies on accessibility, usability, and
          visual communication trends in public-sector websites.
        </p>

        <label for="${id}" class="form-label">
          What is the count?
        </label>
        <input
          type="number"
          class="form-control"
          id="${id}"
          name="${id}"
          required
        />
      </div>
    `,

    answer: 15,

    weight,
  };
}
