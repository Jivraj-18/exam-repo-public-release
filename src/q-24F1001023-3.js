export default function({ user, weight }) {
  return {
    id: "q-24F1001023-3",
    type: "mcq",
    text: "In a Playwright Python script, which method would you use to wait for a specific element (e.g., `#submit-btn`) to be visible before clicking it?",
    options: [
      "page.wait_for_selector('#submit-btn')",
      "page.sleep(5)",
      "page.find_element('#submit-btn').wait()",
      "page.expect('#submit-btn').to_be_visible()"
    ],
    answer: "page.wait_for_selector('#submit-btn')",
    weight: weight
  }
}