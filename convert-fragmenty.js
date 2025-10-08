const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertToWebP() {
  const fragmentyDir = path.join(__dirname, 'fragmenty');
  const files = fs.readdirSync(fragmentyDir).filter(file => file.endsWith('.png'));

  for (const file of files) {
    const inputPath = path.join(fragmentyDir, file);
    const outputPath = path.join(fragmentyDir, file.replace('.png', '.webp'));

    try {
      await sharp(inputPath)
        .webp({ quality: 90 })
        .toFile(outputPath);

      console.log(`✓ Converted: ${file} → ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`✗ Error converting ${file}:`, error.message);
    }
  }

  console.log('\n✅ Conversion complete!');
}

convertToWebP();
