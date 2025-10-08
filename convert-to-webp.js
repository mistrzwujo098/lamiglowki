const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
const files = fs.readdirSync(imagesDir);

console.log('🖼️  Konwersja obrazów na WebP...\n');

let converted = 0;
let skipped = 0;

files.forEach(async (file) => {
  const ext = path.extname(file).toLowerCase();

  // Konwertuj tylko JPG, PNG, JPEG
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace(ext, '.webp'));

    try {
      const info = await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize = info.size;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✅ ${file} → ${path.basename(outputPath)}`);
      console.log(`   ${(originalSize / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB (oszczędność: ${savings}%)\n`);

      // Usuń oryginalny plik
      fs.unlinkSync(inputPath);
      converted++;
    } catch (error) {
      console.error(`❌ Błąd przy konwersji ${file}:`, error.message);
    }
  } else {
    skipped++;
  }
});

setTimeout(() => {
  console.log(`\n📊 Podsumowanie:`);
  console.log(`   Przekonwertowano: ${converted} plików`);
  console.log(`   Pominięto: ${skipped} plików`);
}, 3000);
