import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-satellite-farm-npk-analysis";
  const title = "Geospatial Analysis: Satellite-Based NPK Assessment for Precision Farming";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  // Generate unique farm data
  const farmName = faker.location.city().replace(/[^a-zA-Z\s]/g, "");
  const farmArea = (50 + random() * 150).toFixed(1); // 50-200 hectares
  const latitude = (15 + random() * 25).toFixed(4); // 15-40°N (agriculture belt)
  const longitude = (70 + random() * 40).toFixed(4); // 70-110°E

  // Generate 4 farm zones with different NPK levels
  const zones = [
    { id: "A", name: "Northwest Quadrant" },
    { id: "B", name: "Northeast Quadrant" },
    { id: "C", name: "Southwest Quadrant" },
    { id: "D", name: "Southeast Quadrant" }
  ];

  // Generate NPK levels for each zone
  const npkData = zones.map((zone) => {
    // Different strategies for nutrient levels
    const strategy = Math.floor(random() * 3);
    
    let nitrogen, phosphorus, potassium, status;
    
    if (strategy === 0) {
      // Nitrogen deficient
      nitrogen = Math.floor(random() * 30) + 10; // 10-40 kg/ha (Low)
      phosphorus = Math.floor(random() * 20) + 40; // 40-60 kg/ha (Medium)
      potassium = Math.floor(random() * 30) + 50; // 50-80 kg/ha (Medium-High)
      status = "Nitrogen Deficient";
    } else if (strategy === 1) {
      // Phosphorus deficient
      nitrogen = Math.floor(random() * 30) + 60; // 60-90 kg/ha (Good)
      phosphorus = Math.floor(random() * 20) + 10; // 10-30 kg/ha (Low)
      potassium = Math.floor(random() * 30) + 50; // 50-80 kg/ha (Medium-High)
      status = "Phosphorus Deficient";
    } else {
      // Balanced or Potassium deficient
      nitrogen = Math.floor(random() * 30) + 60; // 60-90 kg/ha (Good)
      phosphorus = Math.floor(random() * 20) + 40; // 40-60 kg/ha (Medium)
      potassium = Math.floor(random() * 30) + 20; // 20-50 kg/ha (Low)
      status = "Potassium Deficient";
    }
    
    return {
      zone: zone.id,
      zoneName: zone.name,
      nitrogen,
      phosphorus,
      potassium,
      status
    };
  });

  // Generate composite satellite images for each zone
  const satelliteImages = zones.map((zone, index) => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    // Background - soil/earth tone
    ctx.fillStyle = "#8B7355";
    ctx.fillRect(0, 0, 400, 400);

    const zoneData = npkData[index];
    
    // Calculate vegetation health based on NPK
    // Lower NPK = less green, more brown/red
    const nitrogenHealth = zoneData.nitrogen / 100; // 0-1 scale
    const phosphorusHealth = zoneData.phosphorus / 80; // 0-1 scale
    const potassiumHealth = zoneData.potassium / 100; // 0-1 scale
    
    // Overall health (weighted: N=50%, P=30%, K=20%)
    const overallHealth = (nitrogenHealth * 0.5 + phosphorusHealth * 0.3 + potassiumHealth * 0.2);
    
    // Generate vegetation patches based on health
    const patchCount = 50 + Math.floor(random() * 50);
    
    for (let i = 0; i < patchCount; i++) {
      const x = random() * 400;
      const y = random() * 400;
      const size = 20 + random() * 40;
      
      // Color based on health: Green (healthy) to Yellow/Red (unhealthy)
      let r, g, b;
      if (overallHealth > 0.7) {
        // Healthy - deep green
        r = Math.floor(20 + random() * 50);
        g = Math.floor(100 + random() * 100);
        b = Math.floor(20 + random() * 50);
      } else if (overallHealth > 0.4) {
        // Moderate - yellow-green
        r = Math.floor(100 + random() * 80);
        g = Math.floor(100 + random() * 80);
        b = Math.floor(20 + random() * 40);
      } else {
        // Poor - brown/red
        r = Math.floor(120 + random() * 80);
        g = Math.floor(60 + random() * 60);
        b = Math.floor(20 + random() * 40);
      }
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.7)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x - size, y - size, size * 2, size * 2);
    }
    
    // Add some realistic noise/texture
    const imageData = ctx.getImageData(0, 0, 400, 400);
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const noise = (random() - 0.5) * 20;
      pixels[i] = Math.max(0, Math.min(255, pixels[i] + noise));
      pixels[i + 1] = Math.max(0, Math.min(255, pixels[i + 1] + noise));
      pixels[i + 2] = Math.max(0, Math.min(255, pixels[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    // Add zone label
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(`Zone ${zone.id}`, 200, 200);
    ctx.fillText(`Zone ${zone.id}`, 200, 200);

    return {
      zone: zone.id,
      dataUrl: canvas.toDataURL("image/png"),
      fileName: `${id}_zone_${zone.id}.png`
    };
  });

  // Find the zone with lowest NPK
  let criticalZone = npkData[0];
  let criticalScore = npkData[0].nitrogen + npkData[0].phosphorus + npkData[0].potassium;
  
  npkData.forEach(zone => {
    const score = zone.nitrogen + zone.phosphorus + zone.potassium;
    if (score < criticalScore) {
      criticalScore = score;
      criticalZone = zone;
    }
  });

  // Create CSV data for download
  const csvRows = [
    ["Zone_ID", "Zone_Name", "Nitrogen_kg_per_ha", "Phosphorus_kg_per_ha", "Potassium_kg_per_ha", "Health_Status"],
    ...npkData.map(z => [z.zone, z.zoneName, z.nitrogen, z.phosphorus, z.potassium, z.status])
  ];
  const csvContent = csvRows.map(row => row.join(",")).join("\n");
  const csvBlob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Please enter the zone ID that needs immediate nutrient intervention.");
    
    const input = response.trim().toUpperCase();
    
    if (input === criticalZone.zone) {
      return true;
    }
    
    // Provide helpful feedback
    throw new Error(
      `Incorrect. Review the NPK data carefully.` +
      `Calculate the sum of N+P+K for each zone and identify which has the minimum total.`
    );
  };

  const question = html`
    <div class="mb-3">
      <h2>🛰️ AgriSat Solutions: Precision Farming Intelligence</h2>
      
      <div class="alert alert-info">
        <strong><i class="bi bi-building"></i> Company Background:</strong><br>
        You work for <strong>AgriSat Solutions</strong>, a pioneering AgriTech startup that leverages satellite imagery and 
        multispectral analysis to provide farmers with actionable insights about soil health and nutrient distribution. 
        Your mission is to help farmers optimize fertilizer application, reduce costs, and increase crop yields through 
        data-driven precision agriculture.
      </div>

      <h3>Farm Details</h3>
      <table class="table table-sm table-bordered">
        <tr><td><strong>Farm Name:</strong></td><td>${farmName} Agricultural Estate</td></tr>
        <tr><td><strong>Location:</strong></td><td>${latitude}°N, ${longitude}°E</td></tr>
        <tr><td><strong>Total Area:</strong></td><td>${farmArea} hectares</td></tr>
        <tr><td><strong>Analysis Date:</strong></td><td>December 2025</td></tr>
        <tr><td><strong>Crop:</strong></td><td>Wheat (Winter Season)</td></tr>
      </table>

      <h3>Your Assignment</h3>
      <p>
        Analyze the satellite imagery and NPK (Nitrogen-Phosphorus-Potassium) spectral data from this farm's four zones. 
        Using multispectral analysis, we've calculated nutrient levels for each quadrant. Your task is to identify which 
        zone requires <strong>immediate nutrient intervention</strong> (has the lowest total NPK levels).
      </p>

      <h3>Understanding NPK Levels</h3>
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-header bg-primary text-white"><strong>Nitrogen (N)</strong></div>
            <div class="card-body">
              <small>
                <strong>Role:</strong> Leaf & stem growth<br>
                <strong>Optimal:</strong> 60-100 kg/ha<br>
                <strong>Deficiency:</strong> Yellowing leaves, stunted growth
              </small>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header bg-success text-white"><strong>Phosphorus (P)</strong></div>
            <div class="card-body">
              <small>
                <strong>Role:</strong> Root development, flowering<br>
                <strong>Optimal:</strong> 40-70 kg/ha<br>
                <strong>Deficiency:</strong> Purple leaves, poor root system
              </small>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header bg-warning text-dark"><strong>Potassium (K)</strong></div>
            <div class="card-body">
              <small>
                <strong>Role:</strong> Disease resistance, water regulation<br>
                <strong>Optimal:</strong> 60-100 kg/ha<br>
                <strong>Deficiency:</strong> Brown leaf edges, weak stalks
              </small>
            </div>
          </div>
        </div>
      </div>

      <h3 class="mt-4">🛰️ Satellite Imagery Analysis</h3>
      <p>
        The images below are derived from multispectral satellite data (Sentinel-2 like). Vegetation health indicators 
        such as NDVI (Normalized Difference Vegetation Index) help identify areas with nutrient stress:
      </p>
      <ul>
        <li><strong>Dark Green:</strong> Healthy vegetation, adequate nutrients</li>
        <li><strong>Yellow-Green:</strong> Moderate nutrient deficiency</li>
        <li><strong>Brown/Red:</strong> Severe nutrient deficiency or stress</li>
      </ul>

      <div class="row mb-4">
        ${satelliteImages.map(img => html`
          <div class="col-md-6 mb-3">
            <div class="card">
              <div class="card-header">
                <strong>Zone ${img.zone}</strong> - ${npkData.find(z => z.zone === img.zone).zoneName}
              </div>
              <img src="${img.dataUrl}" class="card-img-top" alt="Zone ${img.zone} Satellite Image" />
              <div class="card-footer">
                <button 
                  class="btn btn-sm btn-outline-primary" 
                  type="button" 
                  @click=${() => {
                    const link = document.createElement('a');
                    link.href = img.dataUrl;
                    link.download = img.fileName;
                    link.click();
                  }}
                >
                  <i class="bi bi-download"></i> Download Zone ${img.zone}
                </button>
              </div>
            </div>
          </div>
        `)}
      </div>

      <h3>Download NPK Spectral Analysis Data</h3>
      <p>
        Download the detailed NPK analysis results from our multispectral sensors:
      </p>
      <button class="btn btn-primary mb-3" type="button" @click=${() => download(csvBlob, `${id}_npk_data.csv`)}>
        <i class="bi bi-download"></i> Download NPK Analysis Data (CSV)
      </button>

      <div class="alert alert-warning">
        <strong><i class="bi bi-lightbulb"></i> Analysis Tips:</strong>
        <ul class="mb-0">
          <li>Open the CSV file in Excel or Google Sheets</li>
          <li>Calculate the <strong>total NPK</strong> for each zone: N + P + K</li>
          <li>Compare the visual satellite images with the numeric data</li>
          <li>The zone with the <strong>lowest total NPK</strong> needs immediate fertilizer application</li>
          <li>Consider both the color patterns in images and the spectral data</li>
        </ul>
      </div>

      <h3>Educational Resources</h3>
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">🎥 Introduction to Satellite-Based Precision Agriculture</h6>
              <p class="card-text small">Learn how satellites revolutionize modern farming</p>
              <a href="https://www.youtube.com/watch?v=R6-pRSKpEGc" target="_blank" class="btn btn-sm btn-danger">
                <i class="bi bi-youtube"></i> Watch on YouTube
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">🎥 Understanding NDVI and Multispectral Imaging</h6>
              <p class="card-text small">How vegetation indices reveal plant health</p>
              <a href="https://www.youtube.com/watch?v=7aLPvOWNFJ0" target="_blank" class="btn btn-sm btn-danger">
                <i class="bi bi-youtube"></i> Watch on YouTube
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">🎥 NPK Nutrients Explained for Farmers</h6>
              <p class="card-text small">Deep dive into nitrogen, phosphorus, and potassium</p>
              <a href="https://www.youtube.com/watch?v=mDtMp13jrXY" target="_blank" class="btn btn-sm btn-danger">
                <i class="bi bi-youtube"></i> Watch on YouTube
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">🎥 Sentinel-2 Satellite for Agriculture</h6>
              <p class="card-text small">Using free satellite data for crop monitoring</p>
              <a href="https://www.youtube.com/watch?v=hKxiOtK6JxA" target="_blank" class="btn btn-sm btn-danger">
                <i class="bi bi-youtube"></i> Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      <h3>Additional Tools & Platforms</h3>
      <ul>
        <li><a href="https://earthengine.google.com/" target="_blank">Google Earth Engine</a> - Planetary-scale geospatial analysis</li>
        <li><a href="https://sentinel.esa.int/" target="_blank">Copernicus Sentinel Hub</a> - Free satellite imagery</li>
        <li><a href="https://www.qgis.org/" target="_blank">QGIS</a> - Open-source GIS software</li>
        <li><a href="https://developers.planet.com/" target="_blank">Planet Labs</a> - Daily satellite imagery</li>
      </ul>

      <h3 class="mt-4">Your Task</h3>
      <ol>
        <li>Download all 4 satellite images and the NPK data CSV</li>
        <li>Visually analyze the satellite images for vegetation health patterns</li>
        <li>Open the CSV in a spreadsheet tool</li>
        <li>Calculate total NPK (N + P + K) for each zone</li>
        <li>Identify the zone with the <strong>lowest total NPK level</strong></li>
        <li>Submit the zone ID (A, B, C, or D)</li>
      </ol>

      <label for="${id}" class="form-label mt-4">
        <strong>Which zone needs immediate nutrient intervention?</strong>
      </label>
      <select class="form-control" id="${id}" name="${id}" required>
        <option value="">-- Select a Zone --</option>
        <option value="A">Zone A - Northwest Quadrant</option>
        <option value="B">Zone B - Northeast Quadrant</option>
        <option value="C">Zone C - Southwest Quadrant</option>
        <option value="D">Zone D - Southeast Quadrant</option>
      </select>
      <div class="form-text">
        Choose the zone with the lowest combined NPK levels that requires urgent fertilizer application.
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}