export default function ({ user, weight = 0.5 }) {
  return {
    id: "q5-bulk-geocoding",
    weight,
    question: html`
      <h2>Question 5: Geocode Multiple Addresses in Bulk (0.5 marks)</h2>
      
      <h3>Scenario: Logistics Optimization for QuickDeliver</h3>
      
      <p>
        <strong>QuickDeliver</strong> is a last-mile delivery service operating in major metropolitan areas. The company 
        prides itself on optimizing delivery routes to ensure packages reach customers quickly while minimizing fuel 
        costs and carbon emissions.
      </p>
      
      <h4>Business Challenge</h4>
      <p>
        QuickDeliver receives delivery addresses from various e-commerce partners in different formats. To optimize 
        routes, they need to convert these addresses to geographic coordinates (latitude/longitude). This process, 
        called geocoding, enables:
      </p>
      <ul>
        <li>Route optimization algorithms to calculate shortest paths</li>
        <li>Geographic clustering of deliveries</li>
        <li>Estimation of delivery times based on distance</li>
        <li>Visualization of delivery zones on maps</li>
      </ul>
      
      <p>
        The operations team needs to process batches of delivery addresses daily, but manual geocoding is too slow 
        and error-prone.
      </p>
      
      <h4>Your Task</h4>
      <p>
        You are a software engineer at QuickDeliver. Your task is to:
      </p>
      <ol>
        <li>Fetch a list of delivery addresses from: <code>https://sanand0.github.io/tdsdata/geocode/addresses.json</code></li>
        <li>The JSON file contains an array of addresses:
          <pre><code>[
  {"id": 1, "address": "1600 Amphitheatre Parkway, Mountain View, CA"},
  {"id": 2, "address": "1 Apple Park Way, Cupertino, CA"},
  ...
]</code></pre>
        </li>
        <li>Use the Nominatim API to geocode each address</li>
        <li>Calculate the <strong>centroid</strong> (average latitude and longitude) of all successfully geocoded addresses</li>
        <li>Find the address whose coordinates are <strong>closest</strong> to this centroid (using Euclidean distance)</li>
        <li>Submit the <strong>ID</strong> of this address</li>
      </ol>
      
      <h4>Implementation Hints</h4>
      <pre><code>import requests
import time
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

# Fetch addresses
url = "https://sanand0.github.io/tdsdata/geocode/addresses.json"
addresses = requests.get(url).json()

# Initialize geocoder
geolocator = Nominatim(user_agent="${user.email || 'my_app'}")

coordinates = []
for addr in addresses:
    try:
        location = geolocator.geocode(addr['address'])
        if location:
            coordinates.append({
                'id': addr['id'],
                'lat': location.latitude,
                'lon': location.longitude
            })
        time.sleep(1)  # Respect rate limits
    except Exception as e:
        print(f"Error: {e}")

# Calculate centroid
avg_lat = sum(c['lat'] for c in coordinates) / len(coordinates)
avg_lon = sum(c['lon'] for c in coordinates) / len(coordinates)

# Find closest to centroid
min_dist = float('inf')
closest_id = None

for coord in coordinates:
    # Simple Euclidean distance
    dist = ((coord['lat'] - avg_lat)**2 + (coord['lon'] - avg_lon)**2)**0.5
    if dist < min_dist:
        min_dist = dist
        closest_id = coord['id']

print(closest_id)
</code></pre>
      
      <h4>Important Considerations</h4>
      <ul>
        <li><strong>Rate Limiting:</strong> Nominatim allows 1 request per second. Add <code>time.sleep(1)</code> between requests</li>
        <li><strong>User Agent:</strong> Always set a descriptive user_agent (use your email)</li>
        <li><strong>Error Handling:</strong> Some addresses might not geocode successfully - skip them</li>
        <li><strong>Distance Calculation:</strong> For simplicity, use Euclidean distance on lat/lon coordinates</li>
      </ul>
      
      <h4>Alternative: Using geopy's distance function</h4>
      <pre><code>from geopy.distance import geodesic

# More accurate distance calculation
for coord in coordinates:
    dist = geodesic(
        (avg_lat, avg_lon),
        (coord['lat'], coord['lon'])
    ).kilometers
    # ... find minimum
</code></pre>
      
      <h4>Centroid Calculation</h4>
      <p>The centroid is simply the average of all latitudes and longitudes:</p>
      <pre><code>centroid_lat = sum(all_latitudes) / count
centroid_lon = sum(all_longitudes) / count
</code></pre>
      
      <h4>Impact</h4>
      <p>
        By implementing bulk geocoding, QuickDeliver can:
      </p>
      <ul>
        <li><strong>Route Optimization:</strong> Use coordinates to calculate optimal delivery routes</li>
        <li><strong>Cost Reduction:</strong> Minimize travel distance and fuel costs</li>
        <li><strong>Delivery Clustering:</strong> Group nearby deliveries for efficiency</li>
        <li><strong>Time Estimation:</strong> Provide accurate delivery time estimates</li>
        <li><strong>Zone Analysis:</strong> Identify high-density delivery areas</li>
      </ul>
      
      <div class="question-input">
        <label for="q5-answer">
          Enter the ID of the address closest to the centroid:
        </label>
        <input
          type="number"
          id="q5-answer"
          name="q5-answer"
          placeholder="e.g., 5"
          required
        />
      </div>
      
      <p style="font-size: 0.9em; color: #666;">
        <strong>Note:</strong> Nominatim usage policy requires respectful use of their free service. 
        For production applications with high volume, consider paid geocoding services.
      </p>
    `,
    answer: async (formData) => {
      const userAnswer = parseInt(formData.get("q5-answer"));
      const correctAnswer = 7; // Example answer
      return {
        score: userAnswer === correctAnswer ? 0.5 : 0,
        feedback:
          userAnswer === correctAnswer
            ? "Correct! You successfully geocoded addresses and found the one closest to the centroid."
            : `Incorrect. The correct answer is ${correctAnswer}. Make sure you: 1) Geocoded all addresses successfully, 2) Calculated the centroid (average lat/lon) correctly, 3) Found the address with minimum distance to centroid.`,
      };
    },
  };
}
