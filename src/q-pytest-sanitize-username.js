export default {
  id: "pytest-sanitize-username",
  title: "Write pytest tests for sanitize_username",
  description: `
You are given a function \`sanitize_username(name: str) -> str\` that should:

- Strip leading/trailing whitespace.
- Convert to lowercase.
- Replace any spaces inside the string with a single underscore (\`_\`).
- For an empty or all-whitespace string, return an empty string.

Write pytest tests in \`test_sanitize_username.py\` that verify this behavior with at least 4 different inputs:
- Normal name with spaces.
- Name already lowercase and trimmed.
- Name with leading/trailing spaces.
- Empty or whitespace-only name.
`,
  starter: `def sanitize_username(name: str) -> str:
    stripped = name.strip()
    if not stripped:
        return ""
    return "_".join(stripped.lower().split())

# Write tests in test_sanitize_username.py
`,
  tests: [
    {
      id: "tests_exist_and_cover_cases",
      description: "Student has written tests that cover key cases",
      code: `
import inspect
import test_sanitize_username as ts

source = inspect.getsource(ts)
# crude check: ensure at least 4 'assert' statements exist
assert source.count("assert") >= 4
`
    },
    {
      id: "tests_fail_for_buggy_impl",
      description: "Tests would fail if implementation did not strip whitespace",
      code: `
# monkeypatch sanitize_username to a buggy version and ensure at least one test fails
import types
import test_sanitize_username as ts

def buggy(name: str) -> str:
    # does not strip
    return name.lower().replace(" ", "_")

ts.sanitize_username = buggy

failed = False
for name, obj in ts.__dict__.items():
    if name.startswith("test_") and callable(obj):
        try:
            obj()
        except AssertionError:
            failed = True
            break

assert failed, "At least one test should fail for buggy implementation"
`
    }
  ]
};
