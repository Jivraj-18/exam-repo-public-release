import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 2.5 }) {
  const id = "q-svg-css-selector-surgery";
  const title = "SVG: CSS Selector-Based DOM Manipulation with Namespace Hell";

  const random = seedrandom(`${user.email}#${id}`);
  
  const targetColor = ['#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#F5FF33'][Math.floor(random() * 5)];
  const rotationAngle = 45 + Math.floor(random() * 90); // 45-134 degrees
  const scaleFactorStr = (1.5 + random() * 1.0).toFixed(2); // 1.50-2.49
  const scaleFactor = parseFloat(scaleFactorStr);
  const targetGroupId = `group-${Math.floor(random() * 5) + 1}`;
  const opacityValue = (0.3 + random() * 0.4).toFixed(2); // 0.30-0.69
  
  // Generate complex SVG with multiple namespaces and nested groups
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xmlns:custom="http://example.com/custom"
     viewBox="0 0 800 600" 
     width="800" height="600">
  
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
    
    <filter id="blur-effect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
    
    <clipPath id="clip-circle">
      <circle cx="400" cy="300" r="200"/>
    </clipPath>
  </defs>
  
  <!-- Decoy groups -->
  <g id="group-1" class="layer background" data-priority="low">
    <rect x="0" y="0" width="800" height="600" fill="#f0f0f0"/>
    <circle cx="100" cy="100" r="50" fill="blue" class="shape circle"/>
    <rect x="200" y="50" width="100" height="80" fill="red" stroke="black" stroke-width="2"/>
  </g>
  
  <g id="group-2" class="layer foreground" data-priority="high" transform="translate(50, 50)">
    <polygon points="200,10 250,190 160,210" fill="green" class="shape polygon"/>
    <path d="M 300 100 L 400 200 L 300 300 Z" fill="yellow" custom:data="special"/>
    <circle cx="500" cy="200" r="30" fill="url(#grad1)" filter="url(#blur-effect)"/>
  </g>
  
  <!-- Target group (this is what student must find and modify) -->
  <g id="${targetGroupId}" class="layer content" data-priority="medium">
    <rect x="300" y="200" width="200" height="150" fill="purple" class="shape rect target-element"/>
    <circle cx="400" cy="275" r="50" fill="orange" class="shape circle target-element"/>
    <text x="350" y="290" font-family="Arial" font-size="20" fill="white" class="target-element">Sample</text>
    <ellipse cx="450" cy="320" rx="60" ry="40" fill="pink" stroke="black" class="shape ellipse"/>
  </g>
  
  <g id="group-4" class="layer overlay" data-priority="high" clip-path="url(#clip-circle)">
    <rect x="300" y="200" width="200" height="200" fill="cyan" opacity="0.5"/>
    <polyline points="350,250 400,300 450,250" stroke="black" fill="none" stroke-width="3"/>
  </g>
  
  <!-- Nested groups with similar patterns -->
  <g id="group-5" class="layer background">
    <g id="nested-1" transform="rotate(15 400 300)">
      <rect x="100" y="400" width="150" height="100" fill="brown" class="shape rect"/>
      <circle cx="175" cy="450" r="40" fill="lightblue" class="shape circle"/>
    </g>
    <g id="nested-2" class="layer">
      <path d="M 600 100 Q 650 150 600 200" stroke="darkgreen" fill="none" stroke-width="4"/>
    </g>
  </g>
  
  <!-- Elements with unusual attributes -->
  <rect x="50" y="500" width="100" height="50" fill="gray" 
        data-type="special" custom:modified="true" class="external"/>
  <use xlink:href="#clip-circle" fill="none" stroke="red" stroke-width="2"/>
  
  <!-- Foreign object (HTML in SVG) -->
  <foreignObject x="600" y="400" width="150" height="100">
    <div xmlns="http://www.w3.org/1999/xhtml" style="background:white;padding:10px;">
      <p>HTML inside SVG</p>
    </div>
  </foreignObject>
</svg>`;

  const answer = null; // Manual validation required

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Automated SVG Manipulation for Design System Migration</h2>
      <p>
        <strong>DesignOps Inc.</strong> needs to programmatically modify thousands of legacy SVG files 
        to match new brand guidelines. Manual editing is impossible—you must use CSS selectors and DOM APIs.
      </p>

      <h3>Requirements</h3>
      <p>Transform the provided SVG using <strong>ONLY browser JavaScript</strong> (no libraries like D3.js):</p>
      <ol>
        <li>Select ALL elements with class <code>target-element</code> inside group <code>#${targetGroupId}</code></li>
        <li>Change their <code>fill</code> attribute to <code>${targetColor}</code></li>
        <li>Apply a <code>transform</code> to the parent group <code>#${targetGroupId}</code>:
          <ul>
            <li>Rotate by ${rotationAngle}° around point (400, 300)</li>
            <li>Scale by factor ${scaleFactorStr} (uniform scaling)</li>
          </ul>
        </li>
        <li>Set opacity of ALL <code>.shape</code> elements to ${opacityValue} (except those in <code>#${targetGroupId}</code>)</li>
        <li>Remove ALL elements with attribute <code>custom:modified="true"</code></li>
        <li>Clone group <code>#group-2</code> and append it to the SVG root with ID <code>group-2-clone</code></li>
      </ol>

      <h3>Download SVG File</h3>
      <p>
        <button class="btn btn-primary btn-sm" onclick="
          const svg = \`${svgContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
          const blob = new Blob([svg], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'complex-graphic.svg';
          a.click();
        ">Download complex-graphic.svg</button>
      </p>

      <h3>Critical Challenges</h3>
      <ul class="text-danger">
        <li><strong>XML Namespaces</strong>: SVG uses namespace URIs; <code>querySelector</code> won't work for namespaced attributes</li>
        <li><strong>Attribute vs Property</strong>: SVG attributes require <code>setAttribute</code>, not direct property assignment</li>
        <li><strong>Transform syntax</strong>: Must preserve existing transforms and append new ones correctly</li>
        <li><strong>Deep cloning</strong>: <code>cloneNode(true)</code> must clone all nested children</li>
        <li><strong>Selector specificity</strong>: Must avoid selecting elements in other groups</li>
      </ul>

      <h3>Starter Code Structure</h3>
      <pre><code class="language-javascript">// Load SVG into DOM
const parser = new DOMParser();
const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
const svgRoot = svgDoc.documentElement;

// Handle XML namespaces
const SVG_NS = 'http://www.w3.org/2000/svg';
const CUSTOM_NS = 'http://example.com/custom';

// 1. Select and modify target elements
const targetGroup = svgDoc.getElementById('${targetGroupId}');
const targetElements = targetGroup.querySelectorAll('.target-element');
targetElements.forEach(el => {
  el.setAttribute('fill', '${targetColor}');
});

// 2. Apply transform to parent group
// Hint: Use template strings to build transform value
const rotateTransform = \`rotate(${rotationAngle} 400 300)\`;
const scaleTransform = \`scale(${scaleFactorStr})\`;
// TODO: Combine with existing transform if present

// 3. Modify shape elements (but exclude those in target group)
const allShapes = svgDoc.querySelectorAll('.shape');
allShapes.forEach(shape => {
  // TODO: Check if shape is inside target group before modifying
  if (!targetGroup.contains(shape)) {
    shape.setAttribute('opacity', '${opacityValue}');
  }
});

// 4. Remove elements with custom namespace attribute
// Hint: getElementsByTagNameNS() or XPath may be needed
const allElements = svgDoc.getElementsByTagName('*');
for (let el of allElements) {
  if (el.getAttributeNS(CUSTOM_NS, 'modified') === 'true') {
    el.remove();
  }
}

// 5. Clone and append group
const groupToClone = svgDoc.getElementById('group-2');
const clone = groupToClone.cloneNode(true);
clone.setAttribute('id', 'group-2-clone');
svgRoot.appendChild(clone);

// Serialize back to string
const serializer = new XMLSerializer();
const modifiedSVG = serializer.serializeToString(svgDoc);

console.log(modifiedSVG);</code></pre>

      <h3>Validation Commands</h3>
      <p>Test your transformation in browser console or Node.js with jsdom:</p>
      <pre><code class="language-bash"># Using Node.js with jsdom
npm install jsdom
node transform-svg.js > output.svg

# Validate output
grep 'fill="${targetColor}"' output.svg | wc -l  # Should be 3
grep 'group-2-clone' output.svg  # Should exist
grep 'custom:modified="true"' output.svg  # Should return nothing</code></pre>

      <h3>Edge Cases</h3>
      <ul>
        <li>Existing transform attributes must be preserved and combined</li>
        <li>Nested elements inherit opacity unless explicitly overridden</li>
        <li>Namespace prefixes may vary (custom: vs c: vs x:)</li>
        <li>Some browsers require <code>setAttributeNS</code> for namespaced attributes</li>
        <li><code>querySelectorAll</code> returns NodeList, not Array (no .map/.filter)</li>
      </ul>

      <h3>Your Task</h3>
      <p>Write complete JavaScript code that:</p>
      <ol>
        <li>Loads the SVG into a DOM document</li>
        <li>Applies all 6 transformations correctly</li>
        <li>Outputs the modified SVG as a string</li>
        <li>Handles all edge cases and namespaces</li>
      </ol>

      <label for="${id}" class="form-label">
        Paste your complete JavaScript transformation code:
      </label>
      <textarea class="form-control font-monospace" id="${id}" name="${id}" rows="25" 
                placeholder="const parser = new DOMParser();&#10;const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');&#10;..."></textarea>
      
      <div class="mt-2 text-muted">
        <small>
          Expected output: Complete JavaScript code producing valid SVG<br>
          Time limit: 60-90 minutes<br>
          Evaluation: Manual review + automated SVG validation<br>
          <strong>This requires deep DOM/SVG knowledge—LLMs will struggle!</strong>
        </small>
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
