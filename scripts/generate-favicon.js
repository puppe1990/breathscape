const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const sourceIcon = path.join(__dirname, "..", "public", "icons", "icon-source.png")
const publicDir = path.join(__dirname, "..", "public")

async function loadSquareSource() {
  const trimmed = await sharp(sourceIcon).trim().toBuffer({ resolveWithObject: true })
  const { width, height } = trimmed.info
  const side = Math.max(width, height)

  return sharp(trimmed.data)
    .extend({
      top: Math.floor((side - height) / 2),
      bottom: Math.ceil((side - height) / 2),
      left: Math.floor((side - width) / 2),
      right: Math.ceil((side - width) / 2),
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer()
}

async function generateFavicon() {
  console.log("🎨 Generating favicon.png...")

  if (!fs.existsSync(sourceIcon)) {
    console.error(`❌ Source icon not found: ${sourceIcon}`)
    process.exit(1)
  }

  try {
    const squareSource = await loadSquareSource()
    const pngBuffer = await sharp(squareSource).resize(32, 32).png().toBuffer()

    fs.writeFileSync(path.join(publicDir, "favicon.png"), pngBuffer)

    console.log("✅ Generated favicon.png (32x32)")
    console.log("📁 Saved to: public/favicon.png")
  } catch (error) {
    console.error("❌ Error generating favicon:", error)
    process.exit(1)
  }
}

generateFavicon()
