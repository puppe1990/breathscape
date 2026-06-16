const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const sourceIcon = path.join(__dirname, "..", "public", "icons", "icon-source.png")
const iconsDir = path.join(__dirname, "..", "public", "icons")

const iconSizes = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 72, name: "badge-72x72.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "icon-192x192.png" },
  { size: 512, name: "icon-512x512.png" },
]

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

async function generateIcons() {
  console.log("🎨 Generating PWA icons from PNG source...")

  if (!fs.existsSync(sourceIcon)) {
    console.error(`❌ Source icon not found: ${sourceIcon}`)
    process.exit(1)
  }

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true })
  }

  try {
    const squareSource = await loadSquareSource()

    for (const { size, name } of iconSizes) {
      console.log(`📱 Generating ${name} (${size}x${size})...`)

      await sharp(squareSource).resize(size, size).png().toFile(path.join(iconsDir, name))

      console.log(`✅ Generated ${name}`)
    }

    console.log("\n🎉 All icons generated successfully!")
    console.log(`📁 Icons saved to: ${iconsDir}`)
  } catch (error) {
    console.error("❌ Error generating icons:", error)
    process.exit(1)
  }
}

generateIcons()
