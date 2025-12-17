// Extract user email + roll number from the DOM.
//
// The exam runner shows something like:
//   <strong><!--?lit$...-->2xxxxxx@ds.study.iitm.ac.in</strong>
//
// We treat that as the email, and the roll number is the part before "@".

export function getUserFromStrong(root = document) {
  const strongEls = [...root.querySelectorAll("strong")];

  const email = strongEls
    .map((el) => (el.textContent || "").trim())
    .find((t) => /^[a-z0-9]+@ds\.study\.iitm\.ac\.in$/i.test(t));

  if (!email) {
    throw new Error(
      "Could not find user email in a <strong> tag (expected something like 23f3000339@ds.study.iitm.ac.in).",
    );
  }

  const rollNumber = email.split("@")[0];
  if (!rollNumber) throw new Error("Could not derive roll number from email.");

  return { email, rollNumber };
}
