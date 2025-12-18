import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-regex-email";
    const title = "Regex Matching";
    const random = seedrandom(`${user.email}#${id}`);

    const localParts = ["user", "user.name", "user-name", "user+name", ".user"];
    const domains = ["example.com", "test.co.in", "site.org", "bad-domain"];

    // Create candidate emails
    const candidates = [];
    for (let i = 0; i < 8; i++) {
        candidates.push(`${localParts[Math.floor(random() * localParts.length)]}@${domains[Math.floor(random() * domains.length)]}`);
    }

    // Regex: ^[a-z]+\+[a-z]+@example\.com$ (Specific pattern)
    // Let's make it dynamic
    const patterns = [
        { re: /^[a-z]+\.[a-z]+@example\.com$/, descendant: "letters.letters@example.com" },
        { re: /^[a-z]+-[a-z]+@.*\.org$/, descendant: "letters-letters@any.org" },
        { re: /^user\+.*@test\.co\.in$/, descendant: "user+anything@test.co.in" }
    ];

    const chosen = patterns[Math.floor(random() * patterns.length)];
    const regex = chosen.re;

    // Ensure at least one match and one non-match
    // We'll just generate based on regex
    // Actually simpler: Input a list of strings, ask to return the list of matches
    const testStrings = [
        "alice.bob@example.com",
        "alice-bob@site.org",
        "user+123@test.co.in",
        "simple@example.com",
        "bad@domain.com",
        "alice.bob@site.org",
        "john-doe@site.org",
        "user+name@test.co.in"
    ];

    const matches = testStrings.filter(s => regex.test(s));

    const question = html`
    <div class="mb-3">
      <p>
        Given the regex: <code>${regex.toString()}</code>
      </p>
      <p>
        Which of the following strings match?
      </p>
      <ul>
        ${testStrings.map(s => html`<li>${s}</li>`)}
      </ul>
      <p>
        Provide the matching strings as a JSON array (e.g. <code>["string1", "string3"]</code>).
      </p>
      <label for="${id}" class="form-label">Matches:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        try {
            const arr = JSON.parse(input);
            if (!Array.isArray(arr)) return false;
            const sortedInput = arr.sort();
            const sortedExpected = matches.sort();
            if (sortedInput.length !== sortedExpected.length) return false;
            return sortedInput.every((val, i) => val === sortedExpected[i]);
        } catch (e) {
            return false;
        }
    };

    return { id, title, weight, question, answer };
}
