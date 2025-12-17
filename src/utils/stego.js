// Deterministic LSB steganography decoder for Q4.
// Encoding spec:
// - red channel LSB bits
// - first 16 bits = length in bytes (unsigned)
// - then payload bytes (UTF-8) for `ROLL:<roll_number>`

const td = new TextDecoder();

export function decodeRollFromImageData(imageData) {
  const { data } = imageData; // RGBA
  const bits = [];

  // Extract LSB of red channel for each pixel
  for (let i = 0; i < data.length; i += 4) {
    bits.push(data[i] & 1);
  }

  const readBitsAsNumber = (start, count) => {
    let n = 0;
    for (let i = 0; i < count; i += 1) n = (n << 1) | bits[start + i];
    return n >>> 0;
  };

  const length = readBitsAsNumber(0, 16);
  const bytes = new Uint8Array(length);

  let bitOffset = 16;
  for (let bi = 0; bi < length; bi += 1) {
    bytes[bi] = readBitsAsNumber(bitOffset, 8);
    bitOffset += 8;
  }

  return td.decode(bytes);
}
