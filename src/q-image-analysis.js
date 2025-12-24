import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 2 }) {
  const id = "q-image-analysis";
  const title = "Computer Vision: FastAPI Service";

  // Deterministic seed
  const random = seedrandom(`${user.email}#${id}`);
  
  // Use Canvas to generate the image data
  const size = 400;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  
  // Fill with random grayscale noise (0-200)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const val = Math.floor(random() * 200);
      ctx.fillStyle = `rgb(${val},${val},${val})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Inject "Brightest Pixel" (255) at random location
  const targetX = Math.floor(random() * size);
  const targetY = Math.floor(random() * size);
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(targetX, targetY, 1, 1);
  
  // Get generated image URL
  const imageUrl = canvas.toDataURL("image/png");
  // Convert to Blob for upload
  const imageBlob = await fetch(imageUrl).then(r => r.blob());

  const expected = [targetX, targetY];

  const answer = async (url) => {
    // Sanitization
    let target = String(url).trim();
    if (!target) throw new Error("URL is required");

    // Prepare Upload
    const formData = new FormData();
    formData.append("file", imageBlob, "scan.png");

    try {
      const resp = await fetch(target, {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) throw new Error(`Endpoint returned status ${resp.status}`);
      
      const json = await resp.json();
      
      // Flexible validation: accept [x, y] or {"pixel": [x, y]} or {"x": x, "y": y}
      let userAns = json;
      if (!Array.isArray(userAns) && typeof userAns === 'object' && userAns !== null) {
        if(userAns.pixel && Array.isArray(userAns.pixel)) userAns = userAns.pixel;
        else if('x' in userAns && 'y' in userAns) userAns = [userAns.x, userAns.y];
      }

      if(!Array.isArray(userAns) || userAns.length !== 2) {
        throw new Error("Response must be a coordinate array [x, y]");
      }
      
      if (userAns[0] !== expected[0] || userAns[1] !== expected[1]) {
        throw new Error(`Incorrect coordinates. Got [${userAns}]`);
      }
      
      return true;

    } catch (e) {
      // Improve error message for common CORS issues
      if (e.name === 'TypeError' && e.message === 'Failed to fetch') {
         throw new Error("Failed to connect to endpoint. Check CORS settings and ensure server is running.");
      }
      throw e;
    }
  };

  const question = html`
    <div class="mb-3">
      <h4>Case Study: LIDAR Sensor Calibration</h4>
      <p>
        You are a <strong>Computer Vision Engineer</strong> at a startup deploying automated quality control drones.
        You need to build a microservice that accepts a LIDAR scan (image) and identifies the "Brightest Pixel" (target marking).
      </p>
      
      <h3>Task</h3>
      <ol>
        <li>Create a <strong>FastAPI Endpoint</strong> (e.g., <code>POST /scan</code>).</li>
        <li>It must accept an image file upload (<code>multipart/form-data</code>).</li>
        <li>It must process the image and return the coordinates <code>[x, y]</code> of the brightest pixel (val=255).</li>
        <li>Host it locally (e.g., Port 8000) and enable <strong>CORS</strong> (<code>allow_origins=["*"]</code>).</li>
      </ol>
      
      <p><strong>Dev Tooling:</strong></p>
      <p>
        <img src="${imageUrl}" width="400" height="400" style="border: 1px solid #333; margin-right: 10px; vertical-align: middle;" />
      </p>

      <label for="${id}" class="form-label">Your Endpoint URL (POST):</label>
      <input type="url" class="form-control" name="${id}" id="${id}" placeholder="http://localhost:8000/scan">
      <div class="form-text">We will POST the generated image to this URL to test your code.</div>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
  Solution (Python FastAPI):
  # /// script
  # requires-python = ">=3.12"
  # dependencies = [
  #     "pillow",
  #     "fastapi",
  #     "pillow",
  #     "python-multipart",
  #     "uvicorn",
  # ]
  # ///
  
  from fastapi import FastAPI, UploadFile
  from fastapi.middleware.cors import CORSMiddleware
  from PIL import Image
  import io

  app = FastAPI()
  
  # Enable CORS for browser access
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],
      allow_methods=["*"],
      allow_headers=["*"],
  )

  @app.post("/scan")
  async def scan_image(file: UploadFile):
      # Read image from upload
      contents = await file.read()
      img = Image.open(io.BytesIO(contents))
      pixels = img.load()
      width, height = img.size
      
      max_val = -1
      max_coord = [-1, -1]
      
      for x in range(width):
          for y in range(height):
              # Handle grayscale (int) or RGB (tuple)
              val = pixels[x, y]
              if isinstance(val, tuple): val = val[0]
              
              if val > max_val:
                  max_val = val
                  max_coord = [x, y]
                  
      return max_coord

  if __name__ == "__main__":
      import uvicorn
      uvicorn.run(app, host="0.0.0.0", port=8000)
  # Run: uvicorn main:app --reload --port 8000
*/
