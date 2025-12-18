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
      <p>Create Rust library with manual memory management:</p>
      <pre><code>// Cargo.toml
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
    // Implement with SIMD operations
    // Use unsafe blocks for zero-copy
    // Manual memory layout optimization
}

#[wasm_bindgen]
pub fn allocate_buffer(size: usize) -> *mut f64 {
    // Custom allocator for ${dataSize} elements
}</code></pre>

      <h4>Part B: WASM Compilation & Optimization (2.5 marks)</h4>
      <p>Compile with maximum optimization:</p>
      <pre><code>wasm-pack build --target web --release
wasm-opt -O4 -o pkg/optimized.wasm pkg/wasm_compute_bg.wasm

# Verify size reduction (must be <50KB after gzip)
gzip -c pkg/optimized.wasm | wc -c</code></pre>

      <h4>Part C: JS Integration & Benchmarking (2.5 marks)</h4>
      <p>Compare performance with JS baseline:</p>
      <pre><code>import init, { ${operations}, allocate_buffer } from './pkg/wasm_compute.js';

async function benchmark() {
    await init();
    
    const data = new Float64Array(${dataSize});
    crypto.getRandomValues(data);
    
    // JS baseline
    const jsStart = performance.now();
    const jsResult = ${operations}JS(data);
    const jsTime = performance.now() - jsStart;
    
    // WASM with zero-copy
    const wasmStart = performance.now();
    const ptr = allocate_buffer(${dataSize});
    const wasmData = new Float64Array(
        memory.buffer, ptr, ${dataSize}
    );
    wasmData.set(data);
    const wasmResult = ${operations}(wasmData, ${dataSize});
    const wasmTime = performance.now() - wasmStart;
    
    console.log(\`Speedup: \${(jsTime/wasmTime).toFixed(1)}x\`);
    
    // Must achieve ${targetSpeedup}x or better
    if (jsTime/wasmTime < ${targetSpeedup}) {
        throw new Error('Insufficient optimization');
    }
}</code></pre>

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

      <p><strong>Hint:</strong> Use <code>wasm-bindgen</code> with <code>--no-typescript</code>, manual SIMD intrinsics, and custom allocators.</p>
    `,
    answer: null,
  };
}
