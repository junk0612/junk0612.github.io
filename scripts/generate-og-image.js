const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')

function generateOGImage() {
  const width = 1200
  const height = 630
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Background
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#3B82F6')
  gradient.addColorStop(1, '#1E40AF')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Title
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 80px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('junk0612', width / 2, height / 2 - 50)

  // Subtitle
  ctx.font = '40px sans-serif'
  ctx.fillText('Programming Blog', width / 2, height / 2 + 50)

  // Save image
  const buffer = canvas.toBuffer('image/png')
  const outputPath = path.join(__dirname, '..', 'public', 'og-image.png')
  fs.writeFileSync(outputPath, buffer)
  console.log('OG image generated at:', outputPath)
}

generateOGImage()