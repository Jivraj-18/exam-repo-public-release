import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

/*
  This is the Base64 of lenna.jpeg (TRUNCATED HERE FOR DISPLAY).
  Replace with FULL Base64 of your JPEG.
*/
const LENNA_JPEG_BASE64 = `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`.replace(/\s+/g, "");

function base64ToBytes(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function bytesToBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// ---- Append secret after JPEG EOI ----
function createBase64WithSecret(secret) {
  console.log("DEBUG: Decoding embedded JPEG");

  const imageBytes = base64ToBytes(LENNA_JPEG_BASE64);
  console.log("DEBUG: Image size:", imageBytes.length);

  const len = imageBytes.length;
  if (!(imageBytes[len - 2] === 0xff && imageBytes[len - 1] === 0xd9)) {
    throw new Error("Embedded image is not a valid JPEG (missing EOI)");
  }

  const secretBytes = new TextEncoder().encode(
    `\n<<SECRET>>\n${secret}\n`
  );

  console.log("DEBUG: Secret bytes:", secretBytes.length);

  const combined = new Uint8Array(imageBytes.length + secretBytes.length);
  combined.set(imageBytes);
  combined.set(secretBytes, imageBytes.length);

  console.log("DEBUG: Combined bytes:", combined.length);

  return bytesToBase64(combined);
}

// ---- Question generator ----
export default async function ({ user, weight = 1 }) {
  const id = "jpeg-secret-extraction";
  const title = "Extracting a Hidden Secret from a JPEG File";

  const secret = "DEADBEEF";

  const base64ImageWithSecret = createBase64WithSecret(secret);

  const question = html`
    <div>
      <h3>Steganography: Extracting a Hidden Secret from a JPEG File</h3>

      <p>
        You are a digital forensics expert called to investigate a suspicious image file. The image appears to be a normal JPEG, but your client suspects it contains hidden information. Your task is to uncover the secret embedded within the image.
      </p>

      <p>
        The image below is the file in question. Analyze it carefully to extract the hidden secret.
      </p>

      <ol>
        <li>Save the image to your system.</li>
        <li>Inspect the binary data of the image file.</li>
        <li>Extract the hidden secret embedded after the JPEG End-of-Image (EOI) marker.</li>
        <li>Submit <strong>only</strong> the extracted secret text.</li>
      </ol>

      <p><strong>Hint:</strong> JPEG decoders stop earlier than files do, so inspect beyond the EOI marker.</p>

      <img
        src="data:image/jpeg;base64,${base64ImageWithSecret}"
        style="max-width:300px"
      />

      <hr />

      <label for="${id}">Enter the extracted secret:</label>
      <input id="${id}" name="${id}" class="form-control" required />
    </div>
  `;

  const answer = async (response) => {
    console.log("DEBUG response:", response);
    const submitted = (response || "").trim();

    if (submitted !== secret) {
      throw new Error("Incorrect secret extracted.");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
