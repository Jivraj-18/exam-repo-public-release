import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-venv-requirements";
    const title = "Python Virtual Environment Dependencies";

    const random = seedrandom(`${user.email}#${id}`);
    const packages = [
        ["pandas", "numpy", "matplotlib"],
        ["flask", "requests", "beautifulsoup4"],
        ["django", "pillow", "pytest"]
    ];

    const selectedPackages = packages[Math.floor(random() * packages.length)];
    const answer = "B"; // pip freeze > requirements.txt

    const question = html`
    <div class="mb-3">
      <p>
        You're working on a data science project and created a virtual environment. 
        You installed ${selectedPackages.join(", ")}, and other packages. 
        Now you want to share the project with a classmate so they can replicate your exact environment.
      </p>
      <p>What should you do to ensure they get the same package versions?</p>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-a" value="A">
        <label class="form-check-label" for="${id}-a">
          A) Send a text file listing package names you remember
        </label>
      </div>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-b" value="B">
        <label class="form-check-label" for="${id}-b">
          B) Run <code>pip freeze > requirements.txt</code> and share the file
        </label>
      </div>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-c" value="C">
        <label class="form-check-label" for="${id}-c">
          C) Share your entire venv folder via cloud storage
        </label>
      </div>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-d" value="D">
        <label class="form-check-label" for="${id}-d">
          D) Tell them to install latest versions using pip
        </label>
      </div>
    </div>
  `;

    return { id, title, weight, question, answer };
}
