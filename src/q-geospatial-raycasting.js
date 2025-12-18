import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 0.5 }) {
  const id = "q-geospatial-raycasting";
  const title = "Geospatial: Point in Polygon (Ray Casting)";
  const random = seedrandom(`${user.email}#${id}`);

  // Helper: Generate random integer between min and max
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // 1. Generate a Random Convex Polygon
  // Strategy: Generate random angles, sort them, and project to a radius to ensure convexity.
  const numVertices = randInt(3, 5); // Triangle, Quad, or Pentagon
  const centerX = 50;
  const centerY = 50;
  const radius = 30;
  
  const angles = [];
  for (let i = 0; i < numVertices; i++) {
    angles.push(random() * 2 * Math.PI);
  }
  angles.sort((a, b) => a - b); // Sort angles to ensure non-intersecting convex shape

  const polygon = angles.map(angle => {
    // Add some noise to radius for irregularity
    const r = radius + (random() * 10 - 5); 
    return [
      Math.floor(centerX + r * Math.cos(angle)), 
      Math.floor(centerY + r * Math.sin(angle))
    ];
  });

  // 2. Generate Random Points to Check (spanning the bounding box area)
  const points = [];
  const minX = Math.min(...polygon.map(p => p[0])) - 10;
  const maxX = Math.max(...polygon.map(p => p[0])) + 10;
  const minY = Math.min(...polygon.map(p => p[1])) - 10;
  const maxY = Math.max(...polygon.map(p => p[1])) + 10;

  for (let i = 0; i < 12; i++) {
    points.push({
      x: randInt(minX, maxX),
      y: randInt(minY, maxY)
    });
  }

  // 3. Algorithm: Ray Casting (Point in Polygon)
  // We compute the true answer here to validate the user's input
  const isPointInPolygon = (point, vs) => {
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      let xi = vs[i][0], yi = vs[i][1];
      let xj = vs[j][0], yj = vs[j][1];

      let intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  let insideCount = 0;
  points.forEach(p => {
    if (isPointInPolygon(p, polygon)) {
      insideCount++;
    }
  });

  const answer = async (response) => {
    if (parseInt(response) !== insideCount) {
      throw new Error(`Incorrect count. Make sure you implement the Ray Casting algorithm correctly.`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Custom Geofencing Engine</h2>
      <p>
        LogiTrek has moved to dynamic delivery zones defined by arbitrary polygons. Your previous bounding-box logic is no longer sufficient. You must implement the <strong>Ray Casting algorithm</strong> to determine if a coordinate is inside the service zone.
      </p>
      
      

      <h3>1. Zone Definition (Vertices)</h3>
      <p>The polygon is defined by this ordered list of vertices <code>[x, y]</code>:</p>
      <div class="p-2 bg-black border rounded mb-3">
        <code>${JSON.stringify(polygon)}</code>
      </div>

      <h3>2. Delivery Coordinates</h3>
      <p>Check the following points:</p>
      <div class="p-2 bg-black border rounded mb-3" style="max-height: 200px; overflow-y: auto;">
        <pre class="mb-0">${JSON.stringify(points, null, 2)}</pre>
      </div>

      <h3>Task</h3>
      <p>
        Calculate how many of these points lie strictly <strong>inside</strong> the polygon.
      </p>
      
      <label for="${id}" class="form-label">Count of Points Inside</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
      <p class="text-muted">
        Tip: You can paste the data into the console and write a JS function implementing the "Ray Casting" or "Even-Odd" rule.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}


/* Solution 

def is_point_in_polygon(point, vs):
    """
    Ray Casting Algorithm to check if point is inside polygon.
    :param point: dict with 'x' and 'y' keys
    :param vs: list of [x, y] vertices
    """
    x, y = point['x'], point['y']
    inside = False
    
    j = len(vs) - 1
    for i in range(len(vs)):
        xi, yi = vs[i]
        xj, yj = vs[j]
        
        # Check if the ray crosses the edge connecting vertex i and j
        intersect = ((yi > y) != (yj > y)) and \
                    (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        
        if intersect:
            inside = not inside
        j = i
        
    return inside

# Replace this list with the "Zone Definition" from your screen
polygon = [
    [45, 50], 
    [60, 20], 
    [50, 80]
] 

# Replace this list with the "Delivery Coordinates" from your screen
points = [
    {"x": 48, "y": 50}, 
    {"x": 10, "y": 10},
    {"x": 55, "y": 40}
]

count = 0
for p in points:
    if is_point_in_polygon(p, polygon):
        count += 1

print(f"Answer: {count}")

*/