// Module 5 (Data Sourcing - Playwright) + Module 6 (Data Prep): Dynamic rendering + shadow DOM extraction
// Weight: 4.5 marks
// Tests: Playwright wait strategies, shadow DOM piercing, iframe navigation, dynamic content

import { html } from 'https://cdn.jsdelivr.net/npm/lit-html@3/+esm';
import seedrandom from 'https://cdn.jsdelivr.net/npm/seedrandom@3/+esm';

export default async function ({ user, weight }) {
  const rng = seedrandom(user.email);
  
  // Generate personalized challenge with nested structures
  const selectors = [
    { component: 'custom-dropdown', shadow: true, iframe: false, levels: 2 },
    { component: 'video-player', shadow: true, iframe: true, levels: 3 },
    { component: 'chat-widget', shadow: true, iframe: true, levels: 2 }
  ];
  const selector = selectors[Math.floor(rng() * selectors.length)];
  
  // Wait strategy challenge
  const waitMs = 3000 + Math.floor(rng() * 5000); // 3-8 seconds
  const networkIdle = rng() > 0.5;

  return {
    id: 'playwright-shadow-dom',
    title: 'Playwright Shadow DOM and Dynamic Content',
    weight,
    question: html`
      <p>Extract data from a web component with Shadow DOM inside an iframe that loads dynamically.</p>
      
      <h3>Nightmare Scenario</h3>\n      <p>You need to scrape a <code>${selector.component}</code> element that:</p>
      <ul>
        <li>Renders after ${Math.round(waitMs/1000)}+ seconds of JavaScript execution</li>
        <li>Is inside an iframe with dynamically generated src</li>
        <li>Uses Shadow DOM (closed mode) preventing direct querySelector access</li>
        <li>Has ${selector.levels} levels of nested shadow roots</li>
        <li>${networkIdle ? 'Loads data via WebSocket after network idle' : 'Makes XHR requests after initial render'}</li>
      </ul>
      
      <h3>Requirements</h3>
      
      <h4>Part A: Advanced Wait Strategies (2.0 marks)</h4>
      <p>You cannot use simple <code>time.sleep()</code>. Must use Playwright's intelligent waiting:</p>
      <pre><code>from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    
    page.goto('https://example.com')
    
    # Wait for network to be idle (${networkIdle ? 'required' : 'optional'})
    page.wait_for_load_state('networkidle')
    
    # Wait for specific element (but it's in shadow DOM!)
    # This WON'T work: page.wait_for_selector('${selector.component}')
    
    # Must wait for custom condition
    page.wait_for_function("""
        () => {
            const root = document.querySelector('app-root');
            return root && root.shadowRoot !== null;
        }
    """, timeout=${waitMs + 2000})</code></pre>
      
      <h4>Part B: Shadow DOM Piercing (2.5 marks)</h4>
      <p>Playwright's auto-piercing doesn't work with <code>closed</code> shadow roots:</p>
      <pre><code># This fails for closed shadow DOM:
# element = page.locator('${selector.component} >>> .target')

# Must use CDP (Chrome DevTools Protocol) to pierce closed shadow DOM:
from playwright.sync_api import CDPSession

client: CDPSession = page.context.new_cdp_session(page)

# Get document root
doc = client.send('DOM.getDocument')
root_node_id = doc['root']['nodeId']

# Query through shadow DOM manually
def pierce_shadow_dom(node_id, depth=0):
    if depth >= ${selector.levels}:
        return node_id
    
    # Get shadow root
    shadow = client.send('DOM.querySelectorAll', {
        'nodeId': node_id,
        'selector': '*'
    })
    
    for child_id in shadow.get('nodeIds', []):
        # Describe node to check if it has shadow root
        node = client.send('DOM.describeNode', {'nodeId': child_id})
        if 'shadowRoots' in node.get('node', {}):
            shadow_root_id = node['node']['shadowRoots'][0]['nodeId']
            return pierce_shadow_dom(shadow_root_id, depth + 1)
    
    return None

# Extract data
target_node = pierce_shadow_dom(root_node_id)
result = client.send('DOM.getOuterHTML', {'nodeId': target_node})</code></pre>
      
      <h3>Critical Edge Cases</h3>
      <ul>
        <li><strong>Closed shadow root</strong>: <code>element.shadowRoot</code> returns <code>null</code></li>
        <li><strong>Dynamic iframe src</strong>: Must wait for src attribute to be set before accessing</li>
        <li><strong>Detached elements</strong>: Element may detach/reattach during hydration</li>
        <li><strong>CORS in iframe</strong>: Cannot access cross-origin iframe content directly</li>
        <li><strong>Race conditions</strong>: Wait for both DOM ready AND data loaded</li>
      </ul>
      
      <h3>Answer Format</h3>
      <p>Given the complexity:</p>
      <ul>
        <li>Wait for network idle: ${networkIdle ? `~${Math.round(waitMs/1000)}` : '0'} seconds</li>
        <li>Pierce ${selector.levels} shadow DOM levels</li>
        <li>${selector.iframe ? 'Navigate into iframe' : 'No iframe'}</li>
        <li>Extract final content</li>
      </ul>
      <p>What is the <strong>minimum total wait time</strong> (in seconds) considering:</p>
      <p><code>${networkIdle ? 'network_idle_wait' : '0'} + shadow_dom_query_time(${selector.levels} × 100ms) + iframe_load(${selector.iframe ? '500ms' : '0'})</code></p>
      <p>Answer: Total milliseconds divided by 1000, rounded to 1 decimal place</p>
      
      <details>
        <summary>Full Playwright Shadow DOM Example</summary>
        <pre><code>from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    
    # Navigate
    page.goto('https://example.com')
    
    # Wait strategies
    page.wait_for_load_state('domcontentloaded')
    page.wait_for_load_state('networkidle', timeout=10000)
    
    # Handle iframe
    iframe = page.frame_locator('iframe[name="content"]')
    
    # Pierce shadow DOM using CDP
    client = page.context.new_cdp_session(page)
    
    # Enable DOM domain
    client.send('DOM.enable')
    client.send('CSS.enable')
    
    # Get document
    doc = client.send('DOM.getDocument', {'depth': -1, 'pierce': True})
    
    # Query through shadow roots
    result = client.send('DOM.querySelector', {
        'nodeId': doc['root']['nodeId'],
        'selector': 'app-root'
    })
    
    # Get shadow root
    shadow_root = client.send('DOM.describeNode', {
        'nodeId': result['nodeId']
    })
    
    shadow_root_id = shadow_root['node']['shadowRoots'][0]['nodeId']
    
    # Query inside shadow root
    inner = client.send('DOM.querySelector', {
        'nodeId': shadow_root_id,
        'selector': '.target-element'
    })
    
    # Get text content
    html = client.send('DOM.getOuterHTML', {
        'nodeId': inner['nodeId']
    })
    
    print(html['outerHTML'])
    
    browser.close()</code></pre>
      </details>
    `,
    answer: async (answer) => {
      // Calculate: network idle + shadow DOM queries + iframe
      const networkWait = networkIdle ? waitMs : 0;
      const shadowWait = selector.levels * 100; // 100ms per level
      const iframeWait = selector.iframe ? 500 : 0;
      const totalMs = networkWait + shadowWait + iframeWait;
      const totalSec = (totalMs / 1000).toFixed(1);
      
      const numAnswer = parseFloat(parseFloat(answer).toFixed(1));
      const expected = parseFloat(totalSec);
      
      // Allow ±1 second margin
      return Math.abs(numAnswer - expected) <= 1.0;
    }
  };
}
