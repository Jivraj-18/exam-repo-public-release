export default function ({ user, weight = 1 }) {
  return {
    id: "image-compression",
    weight,
    prompt: `
Upload a **losslessly compressed image** that is **< 400 bytes**.

Rules:
- Pixels must be identical to original
- Any lossless format allowed
    `,
    answerType: "file",
    constraints: {
      maxSizeBytes: 400,
      mimeTypes: ["image/png", "image/webp"],
    },
  };
}
