import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 3.0 }) {
  const id = "q-regex-polyglot-parser";
  const title = "Regex: Multi-Language Code Extraction with Context-Aware Parsing";

  const random = seedrandom(`${user.email}#${id}`);
  
  const targetFunction = ['processData', 'calculateMetrics', 'transformInput', 'validateSchema'][Math.floor(random() * 4)];
  const minLines = 15 + Math.floor(random() * 10); // 15-24 lines
  const languageCount = 4; // Python, JavaScript, Java, C++
  const nestingDepth = 3 + Math.floor(random() * 2); // 3-4 levels deep
  
  // Generate polyglot codebase with intentional parser traps
  const codeFiles = [];
  
  // Python file with nested functions and decorators
  const pythonCode = `# analytics/processor.py
import asyncio
from typing import List, Dict
from functools import lru_cache

class DataProcessor:
    def __init__(self, config: Dict):
        self.config = config
    
    @staticmethod
    @lru_cache(maxsize=128)
    def ${targetFunction}(data: List[int]) -> Dict[str, float]:
        """
        Process input data with statistical transforms.
        Note: This is a multi-line docstring
        """
        result = {"mean": sum(data) / len(data)}
        # Another ${targetFunction} reference in comment
        if len(data) > 10:
            result["median"] = sorted(data)[len(data) // 2]
        return result
    
    async def stream_${targetFunction}(self, stream):
        async for item in stream:
            yield self.${targetFunction}([item])

def helper_${targetFunction}():
    pass  # Decoy function

${targetFunction}_CONSTANT = 42  # Not a function`;

  // JavaScript with arrow functions and template literals
  const jsCode = `// src/analytics.js
const _ = require('lodash');

class Analytics {
  constructor(options) {
    this.options = options;
  }
  
  ${targetFunction}(data) {
    // Process with ${targetFunction} algorithm
    const processed = data.map((item, idx) => {
      if (item.type === '${targetFunction}') {
        return {
          ...item,
          transformed: this._internal${targetFunction}(item.value)
        };
      }
      return item;
    });
    
    return processed.filter(x => x.valid);
  }
  
  _internal${targetFunction}(value) {
    return value * 2;
  }
  
  async *generate${targetFunction}() {
    const data = await this.fetchData();
    for (const item of data) {
      yield this.${targetFunction}([item]);
    }
  }
}

const ${targetFunction} = (x) => x + 1;  // Decoy arrow function
export const ${targetFunction}Config = { enabled: true };`;

  // Java with nested classes and generics
  const javaCode = `// com/analytics/Processor.java
package com.analytics;

import java.util.List;
import java.util.stream.Collectors;

public class DataProcessor<T> {
    private final Config config;
    
    public DataProcessor(Config config) {
        this.config = config;
    }
    
    public <R> List<R> ${targetFunction}(List<T> data, 
                                         Function<T, R> transformer) {
        return data.stream()
            .filter(item -> item != null)
            .map(item -> {
                // Nested ${targetFunction} call
                if (shouldProcess(item)) {
                    return transformer.apply(item);
                }
                return null;
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }
    
    private boolean shouldProcess(T item) {
        return true; // ${targetFunction} logic here
    }
    
    public static class ${targetFunction}Config {
        private int threshold;
        public ${targetFunction}Config(int threshold) {
            this.threshold = threshold;
        }
    }
}

interface ${targetFunction}Strategy<T> {
    T process(T input);
}`;

  // C++ with templates and namespace
  const cppCode = `// include/analytics/processor.hpp
#ifndef ANALYTICS_PROCESSOR_H
#define ANALYTICS_PROCESSOR_H

#include <vector>
#include <functional>
#include <algorithm>

namespace analytics {

template<typename T>
class DataProcessor {
private:
    std::vector<T> data_;
    
    T internal${targetFunction}(const T& item) const {
        return item * 2;  // ${targetFunction} transform
    }

public:
    explicit DataProcessor(const std::vector<T>& data) : data_(data) {}
    
    template<typename Predicate>
    std::vector<T> ${targetFunction}(Predicate pred) const {
        std::vector<T> result;
        std::copy_if(data_.begin(), data_.end(),
                    std::back_inserter(result),
                    [this, &pred](const T& item) {
                        // Nested ${targetFunction} logic
                        if (pred(item)) {
                            return this->internal${targetFunction}(item) > 0;
                        }
                        return false;
                    });
        return result;
    }
    
    auto get${targetFunction}Iterator() const {
        return data_.begin();
    }
};

constexpr int ${targetFunction}_THRESHOLD = 100;

}  // namespace analytics

#endif  // ANALYTICS_PROCESSOR_H`;

  codeFiles.push(
    { filename: 'analytics/processor.py', content: pythonCode, language: 'Python' },
    { filename: 'src/analytics.js', content: jsCode, language: 'JavaScript' },
    { filename: 'com/analytics/Processor.java', content: javaCode, language: 'Java' },
    { filename: 'include/analytics/processor.hpp', content: cppCode, language: 'C++' }
  );
  
  const allCode = codeFiles.map(f => `=== ${f.filename} (${f.language}) ===\n${f.content}`).join('\n\n');
  
  // Calculate expected answer
  let functionDefinitions = 0;
  
  // Python: count 'def targetFunction('
  functionDefinitions += (pythonCode.match(new RegExp(`\\bdef\\s+${targetFunction}\\s*\\(`, 'g')) || []).length;
  
  // JavaScript: count 'targetFunction(...)' and 'targetFunction = '
  const jsFuncDef = jsCode.match(new RegExp(`\\b${targetFunction}\\s*\\([^)]*\\)\\s*{`, 'g')) || [];
  const jsArrowDef = jsCode.match(new RegExp(`\\b(const|let|var)\\s+${targetFunction}\\s*=\\s*\\([^)]*\\)\\s*=>`, 'g')) || [];
  functionDefinitions += jsFuncDef.length + jsArrowDef.length;
  
  // Java: count 'public/private/protected ... targetFunction(...) {'
  functionDefinitions += (javaCode.match(new RegExp(`(public|private|protected)?\\s+[\\w<>\\[\\],\\s]+\\s+${targetFunction}\\s*\\([^)]*\\)\\s*({|throws)`, 'g')) || []).length;
  
  // C++: count 'targetFunction(...) const {' or 'targetFunction(...) {'
  functionDefinitions += (cppCode.match(new RegExp(`\\b${targetFunction}\\s*\\([^)]*\\)\\s*(const)?\\s*{`, 'g')) || []).length;
  
  const answer = functionDefinitions.toString();

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Multi-Language Codebase Analysis for API Documentation</h2>
      <p>
        <strong>DevTools Inc.</strong> needs to generate API documentation across a polyglot microservices architecture.
        You must extract function definitions from Python, JavaScript, Java, and C++ codebases using regex.
      </p>

      <h3>Requirements</h3>
      <p>Count ONLY actual function <strong>definitions</strong> named <code>${targetFunction}</code>, excluding:</p>
      <ul>
        <li>Function calls: <code>${targetFunction}(data)</code></li>
        <li>Comments: <code>// Process with ${targetFunction}</code></li>
        <li>Strings: <code>"${targetFunction}_algorithm"</code></li>
        <li>Constants/variables: <code>${targetFunction}_CONSTANT = 42</code></li>
        <li>Class names: <code>class ${targetFunction}Config</code></li>
        <li>Interface names: <code>interface ${targetFunction}Strategy</code></li>
        <li>Type definitions: <code>const ${targetFunction}Config = {}</code></li>
      </ul>

      <h3>What Counts as a Function Definition?</h3>
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Language</th>
            <th>Pattern</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Python</td>
            <td><code>def ${targetFunction}(...)</code></td>
            <td><code>def ${targetFunction}(data: List[int]) -> Dict:</code></td>
          </tr>
          <tr>
            <td>JavaScript</td>
            <td><code>${targetFunction}(...) { }</code> OR <code>= (...) =></code></td>
            <td><code>${targetFunction}(data) { }</code> OR <code>const ${targetFunction} = (x) => x + 1</code></td>
          </tr>
          <tr>
            <td>Java</td>
            <td><code>[modifier] Type ${targetFunction}(...)</code></td>
            <td><code>public List&lt;R&gt; ${targetFunction}(List&lt;T&gt; data, Function f)</code></td>
          </tr>
          <tr>
            <td>C++</td>
            <td><code>Type ${targetFunction}(...) { }</code></td>
            <td><code>std::vector&lt;T&gt; ${targetFunction}(Predicate pred) const {</code></td>
          </tr>
        </tbody>
      </table>

      <h3>Download Codebase</h3>
      <p>
        <button class="btn btn-primary btn-sm" type="button" @click=${() => download(new Blob([allCode], { type: 'text/plain' }), 'codebase.txt')}>
          Download codebase.txt
        </button>
      </p>

      <h3>Your Task</h3>
      <p>Write a <strong>single regex pattern</strong> (or combination) using grep/awk/sed that:</p>
      <ol>
        <li>Handles all 4 programming languages</li>
        <li>Distinguishes function definitions from calls/comments/constants</li>
        <li>Accounts for:
          <ul>
            <li>Multi-line function signatures</li>
            <li>Decorators (@staticmethod, @lru_cache)</li>
            <li>Access modifiers (public/private/protected)</li>
            <li>Generic types (&lt;T, R&gt;)</li>
            <li>const/async/generator modifiers</li>
            <li>Template specializations</li>
          </ul>
        </li>
        <li>Returns the total count across all files</li>
      </ol>

      <h3>Edge Cases</h3>
      <ul class="text-warning">
        <li><strong>Nested functions</strong>: Lambda/arrow functions inside ${targetFunction}</li>
        <li><strong>Method chaining</strong>: <code>.${targetFunction}()</code> is a call, not definition</li>
        <li><strong>Decorator stacking</strong>: @decorator before def ${targetFunction}</li>
        <li><strong>Template syntax</strong>: <code>&lt;T&gt;</code> vs <code>&lt;R&gt;</code> in generics</li>
        <li><strong>Multi-line signatures</strong>: Parameters spanning multiple lines</li>
        <li><strong>Comment blocks</strong>: Docstrings mentioning ${targetFunction}</li>
      </ul>

      <h3>Example Bash Command</h3>
      <pre><code class="language-bash"># This is a STARTING POINT (incomplete, will miss cases)
grep -oP '(?&lt;=def )${targetFunction}(?=\\s*\\()' codebase.txt | wc -l

# You need to extend this to handle all languages and edge cases
# Hint: Use multiple grep passes or awk with complex patterns</code></pre>

      <h3>Validation</h3>
      <p>Your regex should correctly identify:</p>
      <ul>
        <li>Python: Static methods with decorators</li>
        <li>JavaScript: Both traditional and arrow functions</li>
        <li>Java: Generic method signatures</li>
        <li>C++: Template member functions</li>
      </ul>

      <label for="${id}" class="form-label">
        Total count of <code>${targetFunction}</code> function definitions:
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
      
      <div class="mt-2 text-muted">
        <small>
          Expected format: Single integer<br>
          Hint: The answer is between 5 and 15
        </small>
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
