import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 0.5 }) {
  const id = "q-binary-sensor-decode";
  const title = "Data Sourcing: Binary Protocol Decoding";
  const random = seedrandom(`${user.email}#${id}`);

  // Generate binary data
  // Format: [Header: 4 bytes Magic Number][Payload: 4 bytes Int][Checksum: 1 byte]
  const magic = 0xDEADBEEF;
  const payload = Math.floor(random() * 10000);
  const checksum = (payload % 255);

  const buffer = new ArrayBuffer(9);
  const view = new DataView(buffer);
  view.setUint32(0, magic, false); // Big Endian
  view.setUint32(4, payload, false);
  view.setUint8(8, checksum);

  // Convert to Base64 for the user to "download" or copy
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64Data = btoa(binary);

  const answer = async (response) => {
    if (parseInt(response) !== payload) throw new Error("Incorrect payload value.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Legacy Sensor Integration</h2>
      <p>
        A manufacturing plant uses sensors from the 1990s. They output data in a custom binary format over serial ports.
      </p>
      <p><strong>Protocol Spec:</strong> Big Endian.</p>
      <ul>
        <li>Bytes 0-3: Magic Number (0xDEADBEEF)</li>
        <li>Bytes 4-7: Sensor Value (Unsigned 32-bit Integer)</li>
        <li>Byte 8: Checksum</li>
      </ul>
      <h3>Data Packet (Base64 Encoded)</h3>
      <code class="d-block p-2 bg-dark text-white border">${base64Data}</code>
      <h3>Task</h3>
      <p>
        Decode the Base64 string into bytes, ignore the magic number, and extract the <strong>Sensor Value</strong> (integer).
      </p>
      <label for="${id}" class="form-label">Sensor Value (Int)</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}


/* Solution 

# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "base64",
#     "struct"
# ]
# ///

import base64
import struct

# Paste the string from the website here
b64_data = "PASTE_YOUR_STRING_HERE"

# Decode Base64
raw_bytes = base64.b64decode(b64_data)

# Unpack: 
# Offset 4 (skip first 4 bytes/Magic Number)
# Read 4 bytes as Big Endian Unsigned Int ('>I')
sensor_value = struct.unpack('>I', raw_bytes[4:8])[0]

print(f"Answer: {sensor_value}")

*/
