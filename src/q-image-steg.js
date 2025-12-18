export default async function ({ user, weight = 1 }) {
  return {
    id: "q-image-steg-variant",
    title: "Image Steganography: Extract Hidden Message",
    weight,

    prompt: `
A suspicious 12×12 RGB image hides a secret using LSB steganography.

You are given a JSON file containing pixel values as:
[ [R, G, B], [R, G, B], ... ] in row-major order.

Extraction rules:
• Use Least Significant Bit (LSB)
• Channel order per pixel: G → R → B
• Read pixels left-to-right, top-to-bottom
• Concatenate bits into a binary string
• Convert every 8 bits into ASCII
• Final output is a 12-character lowercase hex string

Submit the extracted hidden message.
    `,

    inputSpec: "pixels.json (144 RGB pixels)",
    outputSpec: "12-character hex string",

    help: [
      "Extract LSB using value & 1",
      "Group bits into bytes (8 bits)",
      "Convert binary to ASCII characters"
    ]
  };
}
