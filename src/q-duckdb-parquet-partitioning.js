import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./utils/download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-duckdb-parquet-partitioning";
  const title = "DuckDB: Optimizing Parquet Queries";

  const random = seedrandom(`${user.email}#${id}`);
  
  const fileCount = Math.floor(random() * 500) + 200; // 200-700 files
  const totalGB = Math.floor(random() * 100) + 50; // 50-150 GB
  const year = 2024;
  const month = Math.floor(random() * 12) + 1;
  const eventType = ["purchase", "view", "click", "add_to_cart"][Math.floor(random() * 4)];
  
  const slowQuery = Math.floor(random() * 120) + 60; // 60-180 seconds
  const targetTime = Math.floor(slowQuery * 0.1); // ~10x faster

  const answer = async (response) => {
    response = response.trim().toLowerCase();
    
    const hasHivePartitioning = response.includes("hive_partitioning") && 
                                response.includes("true");
    const usesPartitionColumns = response.includes("year") && response.includes("month");
    const hasReadParquet = response.includes("read_parquet") || 
                          response.includes("parquet_scan");
    
    if (!hasHivePartitioning) {
      throw new Error("Must enable hive_partitioning=true to leverage partition structure");
    }
    
    if (!usesPartitionColumns) {
      throw new Error("Must filter using partition columns (year, month) for partition pruning");
    }
    
    if (!hasReadParquet) {
      throw new Error("Use read_parquet() with proper partitioning options");
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>DuckDB: Parquet Partition Pruning</h2>
      <p>
        You have ${fileCount} Parquet files (${totalGB}GB total) in S3, partitioned by 
        <code>year/month</code> structure. You need to query events from 
        <strong>${year}-${String(month).padStart(2, '0')}</strong> where 
        <code>event_type = '${eventType}'</code>.
      </p>
      
      <p><strong>Directory structure:</strong></p>
      <pre><code>s3://bucket/events/
  year=2023/month=01/*.parquet
  year=2023/month=02/*.parquet
  ...
  year=2024/month=01/*.parquet
  year=2024/month=${String(month).padStart(2, '0')}/*.parquet
  ...</code></pre>
      
      <p><strong>Current slow query (${slowQuery}s - reads ALL files):</strong></p>
      <pre><code>SELECT COUNT(*) 
FROM 's3://bucket/events/**/*.parquet'
WHERE event_type = '${eventType}'
  AND year = ${year} AND month = ${month};</code></pre>
      
      <p>
        Target: <strong>${targetTime}s</strong> by reading only the relevant partition.
      </p>
      
      <label for="${id}" class="form-label">
        What DuckDB feature/option enables automatic partition pruning?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="text" required 
             placeholder="read_parquet with..." />
      <p class="text-muted">
        Hint: DuckDB can automatically detect and use Hive-style partitions
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution
Enable hive_partitioning to leverage partition structure:

SELECT COUNT(*) 
FROM read_parquet('s3://bucket/events/**/*.parquet', 
                   hive_partitioning=true)
WHERE event_type = 'purchase' 
  AND year = 2024 AND month = 3;

DuckDB automatically prunes partitions, reading only year=2024/month=03/*.parquet
*/
