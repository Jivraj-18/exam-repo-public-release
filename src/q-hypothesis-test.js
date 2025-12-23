import { html } from "lit";

export default async function question({ weight = 1 } = {}) {
  return {
    id: "q-hypothesis-test",
    type: "code",
    weight,
    question: html`
      <h1>Property-Based Testing</h1>
      <p>
        Using the <code>hypothesis</code> library, write a test function <code>test_streak_bounds</code> 
        that verifies the <code>longest_positive_streak(nums)</code> function never returns a value 
        greater than the length of the input list.
      </p>
      <p>
        Assume <code>from hypothesis import given, strategies as st</code> is already imported.
      </p>
    `,
    answer: `@given(st.lists(st.integers()))
def test_streak_bounds(nums):
    assert longest_positive_streak(nums) <= len(nums)`,
  };
}