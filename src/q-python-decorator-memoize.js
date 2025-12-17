import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-python-decorator-memoize";
    const title = "Python Decorator Bug";

    const random = seedrandom(`${user.email}#${id}`);

    // A buggy decorator that forgets to return the wrapper
    const code = `
def memoize(func):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    # MISSING RETURN STATEMENT HERE
    
@memoize
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)
  `;

    const expected = "NoneType";

    const answer = (input) => {
        return input.toLowerCase().includes("none") || input.includes("not callable");
    };

    const question = html`
    <div class="mb-3">
      <p>
        You wrote a Python decorator to cache results, but your code is buggy. 
        When you run it, you get an error saying objects are not callable or NoneType is not callable.
      </p>
      <pre class="bg-light p-3 border"><code>${code}</code></pre>
      <p>
        What is the <strong>type</strong> of the <code>fib</code> symbol after the decoration occurs, given that the <code>memoize</code> function doesn't explicitely return anything?
      </p>
      <label for="${id}" class="form-label">Type of 'fib':</label>
      <input type="text" class="form-control" id="${id}" name="${id}" placeholder="e.g. Function, int, ..." required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
