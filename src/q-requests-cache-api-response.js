export default {
  id: "requests-cache-api-response",
  title: "Cache API response in a JSON file",
  description: `
Write a function \`get_posts(session)\` that:

- Uses the given \`session\` (a \`requests.Session\`-like object) to GET "https://example.com/api/posts".
- If the file "posts-cache.json" exists in the current directory, do NOT call the API; instead, load and return the cached JSON from the file.
- If the file does not exist, call the API once, save the response JSON to "posts-cache.json", and return it.
- If the API returns a non-200 status code, raise \`RuntimeError("Bad status")\` and do NOT create/update the cache file.
`,
  starter: `import json
import os

def get_posts(session):
    """
    Returns list of posts from API or cache.

    session: an object with .get(url) similar to requests.Session
    """
    # TODO: implement caching logic described in the question
    pass
`,
  tests: [
    {
      id: "uses_api_when_no_cache",
      description: "Calls API and creates cache file when no cache exists",
      code: `
import json
import os
from pathlib import Path
from q_requests_cache_api_response import get_posts

class DummyResp:
    def __init__(self, status_code, json_data):
        self.status_code = status_code
        self._json = json_data
    def json(self):
        return self._json

class DummySession:
    def __init__(self):
        self.called = 0
    def get(self, url):
        self.called += 1
        return DummyResp(200, [{"id": 1}])

# ensure no cache
cache_path = Path("posts-cache.json")
if cache_path.exists():
    cache_path.unlink()

session = DummySession()
posts = get_posts(session)
assert posts == [{"id": 1}]
assert session.called == 1
assert cache_path.exists()
data = json.loads(cache_path.read_text())
assert data == [{"id": 1}]
`
    },
    {
      id: "uses_cache_when_present",
      description: "Does not call API when cache file exists",
      code: `
import json
from pathlib import Path
from q_requests_cache_api_response import get_posts

class DummyResp:
    def __init__(self, status_code, json_data):
        self.status_code = status_code
        self._json = json_data
    def json(self):
        return self._json

class DummySession:
    def __init__(self):
        self.called = 0
    def get(self, url):
        self.called += 1
        return DummyResp(200, [{"id": 2}])

cache_path = Path("posts-cache.json")
cache_path.write_text(json.dumps([{"id": 99}]))

session = DummySession()
posts = get_posts(session)
assert posts == [{"id": 99}]
assert session.called == 0
`
    },
    {
      id: "bad_status_raises_error",
      description: "Raises RuntimeError on non-200 and does not create cache",
      code: `
import os
from pathlib import Path
from q_requests_cache_api_response import get_posts

class DummyResp:
    def __init__(self, status_code, json_data):
        self.status_code = status_code
        self._json = json_data
    def json(self):
        return self._json

class DummySession:
    def get(self, url):
        return DummyResp(500, {"error": "fail"})

cache_path = Path("posts-cache.json")
if cache_path.exists():
    cache_path.unlink()

session = DummySession()
raised = False
try:
    get_posts(session)
except RuntimeError as e:
    raised = True
    assert str(e) == "Bad status"

assert raised
assert not cache_path.exists()
`
    }
  ]
};
