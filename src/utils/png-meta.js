// Minimal PNG metadata (tEXt / iTXt) reader.
// Parses PNG chunks and returns decoded text payloads.

const textDecoder = new TextDecoder();

function readU32BE(buf, offset) {
  return (
    (buf[offset] << 24) |
    (buf[offset + 1] << 16) |
    (buf[offset + 2] << 8) |
    buf[offset + 3]
  ) >>> 0;
}

function bytesToString(bytes) {
  return textDecoder.decode(bytes);
}

export function assertPngSignature(bytes) {
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let i = 0; i < sig.length; i += 1) {
    if (bytes[i] !== sig[i]) throw new Error("Not a valid PNG file (bad signature).");
  }
}

/**
 * Extract all decoded text from tEXt and iTXt chunks.
 * @param {Uint8Array} bytes
 * @returns {string[]}
 */
export function extractPngTextChunks(bytes) {
  assertPngSignature(bytes);

  const results = [];
  let offset = 8; // after signature

  while (offset + 8 <= bytes.length) {
    const length = readU32BE(bytes, offset);
    const type = bytesToString(bytes.slice(offset + 4, offset + 8));
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const crcEnd = dataEnd + 4;

    if (crcEnd > bytes.length) break;

    if (type === "tEXt" || type === "iTXt") {
      const payload = bytes.slice(dataStart, dataEnd);
      results.push(bytesToString(payload));
    }

    offset = crcEnd;
    if (type === "IEND") break;
  }

  return results;
}
