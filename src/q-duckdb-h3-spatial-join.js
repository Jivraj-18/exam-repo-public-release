// Module 6 (Data Prep - DuckDB) + Module 7 (Analysis - Geospatial): Spatial joins with H3 indexing
// Weight: 5.0 marks
// Tests: H3 hexagonal indexing, spatial joins, DuckDB spatial extension, coordinate transformations

import { html } from 'https://cdn.jsdelivr.net/npm/lit-html@3/+esm';
import seedrandom from 'https://cdn.jsdelivr.net/npm/seedrandom@3/+esm';

export default async function ({ user, weight }) {
  const rng = seedrandom(user.email);
  
  // Generate personalized geospatial challenge
  const resolutions = [7, 8, 9]; // H3 resolution levels
  const resolution = resolutions[Math.floor(rng() * resolutions.length)];
  
  // Cities for spatial analysis
  const cities = [
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194, pop: 873965 },
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, pop: 3979576 },
    { name: 'San Diego', lat: 32.7157, lon: -117.1611, pop: 1423851 }
  ];
  
  // H3 hexagon counts at different resolutions
  const hexCounts = {
    7: 4672, // ~5km edge length
    8: 3273, // ~1km edge length  
    9: 2287  // ~500m edge length
  };

  return {
    id: 'duckdb-h3-spatial-join',
    title: 'DuckDB H3 Hexagonal Spatial Joins',
    weight,
    question: html`
      <p>Perform spatial analysis using H3 hexagonal indexing in DuckDB for efficient proximity queries.</p>
      
      <h3>Why H3 Instead of Haversine?</h3>
      <p>Traditional lat/lon queries are slow for large datasets. H3 provides:</p>
      <ul>
        <li><strong>Hierarchical indexing</strong>: 15 resolutions from 1000km to 1m</li>
        <li><strong>Uniform hexagons</strong>: Better approximation than rectangles</li>
        <li><strong>Fast spatial joins</strong>: Index-based instead of distance calculations</li>
        <li><strong>Covering algorithms</strong>: Find all hexagons within radius</li>
      </ul>
      
      <h3>Requirements</h3>
      
      <h4>Part A: Install H3 Extension (0.5 marks)</h4>
      <pre><code>import duckdb

conn = duckdb.connect()

# Install and load H3 extension
conn.execute("INSTALL h3 FROM community;")
conn.execute("LOAD h3;")

# Install spatial extension for coordinate systems
conn.execute("INSTALL spatial;")
conn.execute("LOAD spatial;")</code></pre>
      
      <h4>Part B: Convert Coordinates to H3 (1.5 marks)</h4>
      <p>Convert cities to H3 indexes at resolution ${resolution}:</p>
      <pre><code># Create cities table
conn.execute("""
    CREATE TABLE cities AS
    SELECT * FROM (VALUES
        ${cities.map((c, i) => `('${c.name}', ${c.lat}, ${c.lon}, ${c.pop})`).join(',\n        ')}
    ) AS t(name, lat, lon, population)
""")

# Add H3 index column
conn.execute("""
    ALTER TABLE cities 
    ADD COLUMN h3_index UBIGINT;
""")

conn.execute("""
    UPDATE cities
    SET h3_index = h3_latlng_to_cell(lat, lon, ${resolution});
""")</code></pre>
      
      <h4>Part C: K-Ring Spatial Query (3.0 marks)</h4>
      <p>Find all hexagons within 2-ring distance of each city:</p>
      <pre><code># H3 k-ring generates surrounding hexagons
# k=1 gives immediate neighbors (6 hexagons)
# k=2 gives 2-hop neighbors (18 total hexagons)

conn.execute("""
    CREATE TABLE city_coverage AS
    SELECT 
        c.name,
        c.population,
        h3_cell_to_latlng(hex) AS hex_center,
        hex
    FROM cities c
    CROSS JOIN LATERAL (
        SELECT unnest(h3_grid_disk(c.h3_index, 2)) AS hex
    );
""")</code></pre>
      
      <p>Now find overlapping coverage (hexagons claimed by multiple cities):</p>
      <pre><code># Hexagons with competition
overlap_query = """
    SELECT 
        hex,
        array_agg(name ORDER BY population DESC) AS competing_cities,
        count(*) AS city_count
    FROM city_coverage
    GROUP BY hex
    HAVING count(*) > 1
    ORDER BY city_count DESC;
"""

result = conn.execute(overlap_query).fetchall()</code></pre>
      
      <h3>Hidden Complexity</h3>
      <ul>
        <li><strong>H3 index precision</strong>: UBIGINT (64-bit) required, BIGINT causes overflow</li>
        <li><strong>Grid disk vs ring</strong>: <code>h3_grid_disk(k)</code> includes center, <code>h3_grid_ring(k)</code> doesn't</li>
        <li><strong>Coordinate order</strong>: H3 uses (lat, lon), PostGIS uses (lon, lat)</li>
        <li><strong>Pentagon distortion</strong>: 12 pentagons per resolution level (not hexagons)</li>
        <li><strong>Unnest for arrays</strong>: <code>h3_grid_disk</code> returns array, must unnest to get individual hexagons</li>
      </ul>
      
      <h3>Answer Format</h3>
      <p>Given:</p>
      <ul>
        <li>Resolution ${resolution} H3 hexagons</li>
        <li>3 cities: ${cities.map(c => c.name).join(', ')}</li>
        <li>K-ring distance of 2 (disk includes center + 2 rings)</li>
      </ul>
      <p>Formula for hexagons in k-ring disk: <code>1 + 6k(k+1)/2</code></p>
      <p>For k=2: <code>1 + 6×2×3/2 = 1 + 18 = 19</code> hexagons per city</p>
      <p>Maximum possible hexagons (no overlap): <code>3 × 19 = 57</code></p>
      <p>But cities are close, so there WILL be overlap.</p>
      <p>Answer: How many hexagons in a k=2 grid disk? (Just the formula result)</p>
      
      <details>
        <summary>Full H3 Spatial Join Example</summary>
        <pre><code>import duckdb

conn = duckdb.connect()

# Setup extensions
conn.execute("INSTALL h3 FROM community")
conn.execute("LOAD h3")

# Create data
conn.execute("""
    CREATE TABLE locations AS
    SELECT 
        name,
        h3_latlng_to_cell(lat, lon, 9) AS h3_idx
    FROM (VALUES 
        ('Store A', 37.7749, -122.4194),
        ('Store B', 37.7849, -122.4094)
    ) AS t(name, lat, lon)
""")

# Find neighbors within 2 hexagons
conn.execute("""
    SELECT 
        l.name,
        neighbor.h3_idx
    FROM locations l
    CROSS JOIN LATERAL (
        SELECT unnest(h3_grid_disk(l.h3_idx, 2)) AS h3_idx
    ) AS neighbor
""")

# Spatial join: find locations near each other
conn.execute("""
    WITH expanded AS (
        SELECT 
            name,
            unnest(h3_grid_disk(h3_idx, 5)) AS coverage
        FROM locations
    )
    SELECT 
        a.name AS store1,
        b.name AS store2,
        count(*) AS shared_hexagons
    FROM expanded a
    JOIN expanded b ON a.coverage = b.coverage
    WHERE a.name < b.name
    GROUP BY a.name, b.name
""")</code></pre>
      </details>
      
      <h3>Why This Is Hard</h3>
      <p>This tests deep understanding of:</p>
      <ul>
        <li>H3 hierarchical spatial indexing (Uber's geospatial library)</li>
        <li>DuckDB's LATERAL joins and unnest for array expansion</li>
        <li>Spatial join optimization (index-based vs distance calculation)</li>
        <li>Grid disk mathematics (hexagonal packing formulas)</li>
        <li>Coordinate system transformations</li>
      </ul>
    `,
    answer: async (answer) => {
      // Formula: 1 + 6*k*(k+1)/2
      // For k=2: 1 + 6*2*3/2 = 1 + 18 = 19
      const hexCount = 1 + (6 * 2 * 3 / 2);
      const numAnswer = parseInt(answer);
      return numAnswer === hexCount;
    }
  };
}
