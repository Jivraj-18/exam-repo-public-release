import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-farm-moisture-analysis";
  const title = "Excel: Smart Irrigation System - Farm Moisture Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  // Generate personalized farm names
  const farmCount = 15 + Math.floor(random() * 10); // 15-24 farms
  const farms = [];
  
  // Crop types with their ideal moisture thresholds
  const cropTypes = [
    { name: "Wheat", minMoisture: 35, maxMoisture: 65, optimalMin: 45, optimalMax: 55 },
    { name: "Rice", minMoisture: 70, maxMoisture: 90, optimalMin: 75, optimalMax: 85 },
    { name: "Corn", minMoisture: 40, maxMoisture: 70, optimalMin: 50, optimalMax: 60 },
    { name: "Cotton", minMoisture: 30, maxMoisture: 60, optimalMin: 40, optimalMax: 50 },
    { name: "Soybean", minMoisture: 45, maxMoisture: 75, optimalMin: 55, optimalMax: 65 },
    { name: "Tomato", minMoisture: 60, maxMoisture: 85, optimalMin: 70, optimalMax: 80 },
    { name: "Potato", minMoisture: 50, maxMoisture: 80, optimalMin: 60, optimalMax: 70 },
    { name: "Carrot", minMoisture: 45, maxMoisture: 75, optimalMin: 55, optimalMax: 65 }
  ];

  // Sensor locations per farm
  const sensorLocations = ["North", "South", "East", "West", "Center"];

  const rows = [["Farm_ID", "Farm_Name", "Crop_Type", "Area_Hectares", "Sensor_Location", "Moisture_Percentage", "Temperature_C", "Last_Watered_Days_Ago", "Soil_Type"]];

  const soilTypes = ["Sandy", "Clay", "Loam", "Silt"];
  let criticalFarmsCount = 0;
  const criticalFarms = new Set();

  for (let i = 1; i <= farmCount; i++) {
    const farmId = `F${String(i).padStart(3, "0")}`;
    const farmName = `${faker.location.city().replace(/[^a-zA-Z\s]/g, "")} Farm`;
    const crop = cropTypes[Math.floor(random() * cropTypes.length)];
    const area = (5 + random() * 45).toFixed(1); // 5-50 hectares
    const soilType = soilTypes[Math.floor(random() * soilTypes.length)];
    const lastWatered = Math.floor(random() * 14) + 1; // 1-14 days

    // Decide if this farm should be critical (needs water)
    const shouldBeCritical = random() < 0.25; // 25% of farms are critical
    
    let farmIsCritical = false;
    const sensorReadings = [];

    for (const location of sensorLocations) {
      let moisture;
      
      if (shouldBeCritical && location === "Center") {
        // Make the center reading critically low
        moisture = crop.minMoisture - (5 + random() * 15); // Below minimum threshold
        farmIsCritical = true;
      } else if (shouldBeCritical) {
        // Other sensors show concerning but not critical levels
        moisture = crop.minMoisture + random() * 10;
      } else {
        // Normal farm - moisture within or above acceptable range
        const range = crop.maxMoisture - crop.minMoisture;
        moisture = crop.minMoisture + random() * range * 1.2;
      }

      moisture = Math.max(5, Math.min(100, moisture)); // Keep between 5-100%
      const temperature = (18 + random() * 20).toFixed(1); // 18-38°C

      rows.push([
        farmId,
        farmName,
        crop.name,
        area,
        location,
        moisture.toFixed(1),
        temperature,
        lastWatered,
        soilType
      ]);

      sensorReadings.push(parseFloat(moisture.toFixed(1)));
    }

    // A farm is critical if average moisture is below crop minimum
    const avgMoisture = sensorReadings.reduce((a, b) => a + b, 0) / sensorReadings.length;
    if (avgMoisture < crop.minMoisture) {
      farmIsCritical = true;
    }

    if (farmIsCritical) {
      criticalFarms.add(farmId);
      criticalFarmsCount++;
    }

    farms.push({
      id: farmId,
      name: farmName,
      crop: crop.name,
      avgMoisture: avgMoisture.toFixed(1),
      critical: farmIsCritical
    });
  }

  // Create CSV blob
  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  // Create Excel-compatible format (TSV for easy paste)
  const tsvContent = rows.map((row) => row.join("\t")).join("\n");
  const tsvBlob = new Blob([tsvContent], { type: "text/tab-separated-values" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the number of farms that need immediate watering.");
    
    const value = parseInt(response.trim());
    if (Number.isNaN(value)) {
      throw new Error("Please enter a valid number.");
    }

    if (value === criticalFarmsCount) {
      return true;
    }

    // Provide helpful feedback
    const diff = Math.abs(value - criticalFarmsCount);
    if (diff === 1) {
      throw new Error(
        `Close! You're off by 1. Check that you're calculating the AVERAGE moisture across all 5 sensors for each farm, then comparing with the crop's minimum moisture requirement.`
      );
    } else if (diff <= 3) {
      throw new Error(
        `Almost there! You're off by ${diff}. Make sure to: (1) Calculate average moisture per farm across all sensor locations, (2) Compare with each crop's minimum threshold, (3) Count farms where avg moisture < minimum.`
      );
    } else {
      throw new Error(
        `Recalculate carefully. Remember: A farm needs water if its AVERAGE moisture (across all 5 sensor locations) is BELOW the crop's minimum moisture requirement. Use AVERAGEIF or pivot tables to group by Farm_ID.`
      );
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>SmartFarm IoT: Precision Irrigation Analysis</h2>
      <p>
        <strong>AgriTech Solutions</strong> has deployed soil moisture sensors across multiple farms in your region.
        Each farm has 5 sensors placed at different locations (North, South, East, West, Center) to monitor soil
        moisture levels. Your job is to identify which farms need immediate irrigation.
      </p>

      <div class="alert alert-info">
        <strong><i class="bi bi-info-circle"></i> Business Context:</strong><br>
        Water is expensive and over-watering wastes resources and can damage crops. Each crop type has a minimum
        moisture threshold. Farms where the <strong>average moisture</strong> falls below their crop's minimum
        threshold need immediate watering.
      </div>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>Farm_ID</code>: Unique farm identifier (F001, F002, etc.)</li>
        <li><code>Farm_Name</code>: Human-readable farm name</li>
        <li><code>Crop_Type</code>: Type of crop being grown</li>
        <li><code>Area_Hectares</code>: Farm size in hectares</li>
        <li><code>Sensor_Location</code>: Position of the sensor (North/South/East/West/Center)</li>
        <li><code>Moisture_Percentage</code>: Current soil moisture level (0-100%)</li>
        <li><code>Temperature_C</code>: Soil temperature in Celsius</li>
        <li><code>Last_Watered_Days_Ago</code>: Days since last irrigation</li>
        <li><code>Soil_Type</code>: Type of soil (Sandy/Clay/Loam/Silt)</li>
      </ul>

      <h3>Crop Moisture Requirements</h3>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Crop Type</th>
            <th>Minimum Moisture %</th>
            <th>Optimal Range %</th>
            <th>Maximum Moisture %</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Wheat</td><td>35</td><td>45-55</td><td>65</td></tr>
          <tr><td>Rice</td><td>70</td><td>75-85</td><td>90</td></tr>
          <tr><td>Corn</td><td>40</td><td>50-60</td><td>70</td></tr>
          <tr><td>Cotton</td><td>30</td><td>40-50</td><td>60</td></tr>
          <tr><td>Soybean</td><td>45</td><td>55-65</td><td>75</td></tr>
          <tr><td>Tomato</td><td>60</td><td>70-80</td><td>85</td></tr>
          <tr><td>Potato</td><td>50</td><td>60-70</td><td>80</td></tr>
          <tr><td>Carrot</td><td>45</td><td>55-65</td><td>75</td></tr>
        </tbody>
      </table>

      <h3>Your Task</h3>
      <ol>
        <li>Download the sensor data file (available in CSV or TSV format)</li>
        <li>Open it in Excel or Google Sheets</li>
        <li>
          Calculate the <strong>average moisture percentage</strong> for each farm across all 5 sensor locations
          <ul>
            <li>Hint: Use <code>AVERAGEIF</code> or a Pivot Table grouping by <code>Farm_ID</code></li>
          </ul>
        </li>
        <li>
          Compare each farm's average moisture with its crop's <strong>minimum moisture requirement</strong>
        </li>
        <li>
          Count how many farms have average moisture <strong>below</strong> their crop's minimum threshold
        </li>
        <li>These farms need <strong>immediate watering</strong></li>
      </ol>

      <h3>Download Sensor Data</h3>
      <div class="btn-group mb-3" role="group">
        <button class="btn btn-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          <i class="bi bi-download"></i> Download CSV
        </button>
        <button class="btn btn-outline-primary" type="button" @click=${() => download(tsvBlob, `${id}.tsv`)}>
          <i class="bi bi-download"></i> Download TSV (Excel Paste-Ready)
        </button>
      </div>

      <div class="alert alert-warning">
        <strong><i class="bi bi-exclamation-triangle"></i> Important:</strong>
        <ul class="mb-0">
          <li>Each farm has <strong>5 sensors</strong> - you must average them to get the farm-level moisture</li>
          <li>Different crops have different moisture requirements - check the table above</li>
          <li>A farm needs water if: <code>Average Moisture &lt; Crop Minimum Moisture</code></li>
        </ul>
      </div>

      <h3>Recommended Excel Approach</h3>
      <pre><code class="language-excel">1. Create a Pivot Table:
   - Rows: Farm_ID, Farm_Name, Crop_Type
   - Values: Average of Moisture_Percentage

2. Add a helper column with crop minimum thresholds using VLOOKUP or IF statements

3. Add another column: =IF(Average_Moisture < Minimum_Threshold, 1, 0)

4. Sum this column to get the count of farms needing water

Alternative: Use COUNTIFS or SUMPRODUCT with multiple criteria</code></pre>

      <h3>Sample Calculation</h3>
      <pre><code class="language-text">Example:
Farm F001 grows Wheat (min moisture: 35%)
Sensor readings: [30, 32, 28, 35, 31]
Average: (30+32+28+35+31)/5 = 31.2%
31.2% < 35% → This farm NEEDS water ✓

Farm F002 grows Rice (min moisture: 70%)  
Sensor readings: [72, 75, 71, 74, 73]
Average: (72+75+71+74+73)/5 = 73%
73% >= 70% → This farm is OK ✗</code></pre>

      <label for="${id}" class="form-label mt-4">
        <strong>How many farms need immediate watering?</strong>
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="number"
        min="0"
        placeholder="Enter the count of farms needing water"
        required
      />
      <div class="form-text">
        Enter only the number of farms where average moisture is below the crop's minimum threshold.
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
