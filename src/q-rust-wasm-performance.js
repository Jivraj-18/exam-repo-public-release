// Advanced: Rust WebAssembly Performance Optimization with Memory Management
// Weight: 8.5 marks
// Tests: Rust compilation, WASM optimization, JS interop, memory profiling

import { html } from 'https://cdn.jsdelivr.net/npm/lit-html@3/+esm';
import seedrandom from 'https://cdn.jsdelivr.net/npm/seedrandom@3/+esm';

export default async function ({ user, weight }) {
  const rng = seedrandom(user.email);
  
  const dataSize = 100000 + Math.floor(rng() * 900000); // 100k-1M data points
  const operations = ['matrix_multiply', 'fft_transform', 'mandelbrot_set', 'prime_sieve'][Math.floor(rng() * 4)];
  const targetSpeedup = 10 + Math.floor(rng() * 15); // 10-24x faster

  return {
    id: 'rust-wasm-performance',
    title: 'Rust WebAssembly: High-Performance Computing in Browser',
    weight,
    question: html`
      <p><strong>Challenge:</strong> Implement computationally intensive ${operations} in Rust, compile to WebAssembly, and achieve ${targetSpeedup}x speedup over pure JavaScript.</p>
      
      <h3>Requirements</h3>
      
      <h4>Part A: Rust Implementation (3.5 marks)</h4>
      <p>Create Rust library with manual memory management (use <a href="https://rustwasm.github.io/wasm-pack/" target="_blank">wasm-pack</a>):</p>
      <pre><code>// Setup: cargo install wasm-pack
// Create project: cargo new --lib wasm-compute

// Cargo.toml
[package]
name = "wasm-compute"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"

[profile.release]
opt-level = 3
lto = true
codegen-units = 1

// src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn ${operations}(data: &[f64], size: usize) -> Vec<f64> {
    // Generate test data if data is empty
    let input: Vec<f64> = if data.is_empty() {
        (0..size).map(|i| (i as f64).sin()).collect()
    } else {
        data.to_vec()
    };
    
    // Implement ${operations} with SIMD-like operations
    // Use unsafe blocks for zero-copy transfers
    // Manual memory layout optimization
    input.iter().map(|x| x * 2.0 + 1.0).collect()
}

#[wasm_bindgen]
pub fn allocate_buffer(size: usize) -> *mut f64 {
    // Custom allocator for ${dataSize} elements
    let layout = std::alloc::Layout::array::<f64>(size).unwrap();
    unsafe { std::alloc::alloc(layout) as *mut f64 }
}</code></pre>

      <h4>Part B: WASM Compilation & Optimization (2.5 marks)</h4>
      <p>Compile with maximum optimization:</p>
      <pre><code>wasm-pack build --target web --release
wasm-opt -O4 -o pkg/optimized.wasm pkg/wasm_compute_bg.wasm

# Verify size reduction (must be <50KB after gzip)
gzip -c pkg/optimized.wasm | wc -c</code></pre>

      <h4>Part C: JS Integration & Benchmarking (2.5 marks)</h4>
      <p>Compare performance with JS baseline (deploy to CodePen/JSFiddle/Stackblitz):</p>
      <pre><code>// Create index.html and include compiled WASM
import init, { ${operations}, allocate_buffer } from './pkg/wasm_compute.js';

// Pure JS baseline implementation
function ${operations}JS(data) {
    return data.map(x => x * 2.0 + 1.0);
}

async function benchmark() {
    await init();
    
    // Generate test data (use crypto for randomness)
    const data = new Float64Array(${dataSize});
    for (let i = 0; i < ${dataSize}; i++) {
        data[i] = Math.sin(i);
    }
    
    // JS baseline benchmark
    const jsStart = performance.now();
    const jsResult = ${operations}JS(Array.from(data));
    const jsTime = performance.now() - jsStart;
    
    // WASM benchmark with zero-copy
    const wasmStart = performance.now();
    const wasmResult = ${operations}(data, ${dataSize});
    const wasmTime = performance.now() - wasmStart;
    
    const speedup = (jsTime/wasmTime).toFixed(1);
    console.log(\`JS Time: \${jsTime.toFixed(2)}ms\`);
    console.log(\`WASM Time: \${wasmTime.toFixed(2)}ms\`);
    console.log(\`Speedup: \${speedup}x\`);
    
    // Validation
    if (jsTime/wasmTime < ${targetSpeedup}) {
        console.error('Target speedup not achieved!');
    } else {
        console.log('✓ Performance target achieved!');
    }
    
    return { jsTime, wasmTime, speedup };
}

benchmark();</code></pre>

      <h3>Deliverables</h3>
      <ol>
        <li>Rust source with unsafe memory optimizations</li>
        <li>Compiled WASM under 50KB (gzipped)</li>
        <li>Benchmark showing ${targetSpeedup}x+ speedup</li>
        <li>Memory profiler screenshot showing zero-copy transfer</li>
        <li>Deployed live demo URL (Cloudflare Workers/Pages)</li>
      </ol>

      <h3>Constraints</h3>
      <ul>
        <li>No external compute libraries (must be pure Rust)</li>
        <li>Must handle ${dataSize.toLocaleString()} data points</li>
        <li>Browser memory usage <100MB total</li>
        <li>First render <16ms (60fps)</li>
      </ul>
    `,
    answer: null,
  };
}
