const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

async function generateFavicons() {
  const inputPath = 'public/images/my_icon.jpg'
  const outputDir = 'public'

  console.log('Generating favicon files...')

  try {
    const faviconConfigs = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 32, name: 'favicon.ico' },
      { size: 180, name: 'apple-touch-icon.png' }
    ]

    for (const { size, name } of faviconConfigs) {
      await sharp(inputPath).resize(size, size).png().toFile(path.join(outputDir, name))
      console.log(`✓ ${name} generated`)
    }

    console.log('All favicon files generated successfully!')
  } catch (error) {
    console.error('Error generating favicon files:', error)
    process.exit(1)
  }
}

generateFavicons()
