export default {
  id: "image-reconstruction-grid-mapping",

  title: "Image Reconstruction Using Grid Mapping",

  marks: 1,

  difficulty: "medium",

  description: `
PixelGuard Solutions is a digital forensics firm that reconstructs
scrambled images used to conceal sensitive information.

In one investigation, an image was divided into a 5×5 grid of equal-sized
tiles and rearranged. Investigators recovered the scrambled image along
with a mapping file that describes where each tile originally belonged.

Your task is to reconstruct the original image by placing each tile back
into its original position using the provided mapping.
  `,

  dataset: {
    description: "Scrambled image tiles with a grid position mapping",
    format: "image + mapping table",
    deterministic: true,
    details: {
      imageSize: "500×500 pixels",
      gridSize: "5×5",
      tileSize: "100×100 pixels",
      mappingColumns: [
        "original_row",
        "original_col",
        "scrambled_row",
        "scrambled_col"
      ]
    }
  },

  requirements: [
    "Split the scrambled image into a 5×5 grid of equal tiles",
    "Use the mapping table to move each tile from its scrambled position to its original position",
    "Reassemble the tiles into a single image preserving the correct orientation",
    "Do not resize, rotate, or alter the tiles beyond repositioning",
    "Save the reconstructed image in a lossless format (PNG or WEBP)"
  ],

  submission: {
    type: "file",
    format: "image",
    acceptedFormats: ["png", "webp"],
    description: "Upload the reconstructed image file"
  },

  evaluation: {
    criteria: [
      "Correct placement of all image tiles",
      "Accurate interpretation of the mapping table",
      "Preservation of original image resolution",
      "No visual artifacts or incorrect tile ordering"
    ]
  },

  allowedTools: [
    "Python (Pillow)",
    "ImageMagick",
    "Any image-processing library capable of grid manipulation"
  ]
};
