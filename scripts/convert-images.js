const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images');

// Dimensioni target per ogni immagine (larghezza massima visualizzata)
// suffix: aggiunge un suffisso al nome output (es. '-mobile' → illum_arch-mobile.webp)
const imageSizes = {
  'illum_arch.jpeg':       { width: 800, quality: 82 },
  // Variante mobile per srcset — genera illum_arch-mobile.webp da illum_arch.webp
  'illum_arch.webp':       { width: 400, quality: 82, suffix: '-mobile' },
  'produzione_eventi.jpeg':{ width: 700, quality: 82 },
  'stand_fiera.jpeg':      { width: 700, quality: 82 },
  'convention.jpeg':       { width: 700, quality: 82 },
  'vetrina.jpeg':          { width: 700, quality: 82 },
  'fixed.jpeg':            { width: 700, quality: 82 },
  'concert.jpeg':          { width: 700, quality: 82 },
  'gde.png':               { width: 200, quality: 90 },
  'thumbnail.PNG':         { width: 1280, quality: 85 },
};

async function convertImages() {
  for (const [filename, opts] of Object.entries(imageSizes)) {
    const inputPath = path.join(inputDir, filename);
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${filename} — not found`);
      continue;
    }
    const ext = path.extname(filename);
    const base = path.basename(filename, ext);
    const suffix = opts.suffix || '';
    const outputPath = path.join(outputDir, `${base}${suffix}.webp`);
    await sharp(inputPath)
      .resize({ width: opts.width, withoutEnlargement: true })
      .webp({ quality: opts.quality })
      .toFile(outputPath);
    const before = fs.statSync(inputPath).size;
    const after = fs.statSync(outputPath).size;
    console.log(`${filename} → ${base}${suffix}.webp | ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB`);
  }
}

convertImages().catch(console.error);
