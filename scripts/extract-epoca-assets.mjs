import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userImages = [
  'C:/Users/eze_s/.gemini/antigravity/brain/bb7d8399-e75d-40cc-b159-aa0c56a2080b/.user_uploaded/media_1787502613378.png', // 0: Época indumentaria suits, Perramus 40% off, Father's Day, Bulevar se traslada
  'C:/Users/eze_s/.gemini/antigravity/brain/bb7d8399-e75d-40cc-b159-aa0c56a2080b/.user_uploaded/media_1787502613422.png', // 1: 3 y 6 pagos, camisas, Invierno 2026 blazer, blusa blanca, mujer traje verde
  'C:/Users/eze_s/.gemini/antigravity/brain/bb7d8399-e75d-40cc-b159-aa0c56a2080b/.user_uploaded/media_1787502613633.png', // 2: Looks mujer beige, blanco, shorts, hombre saco lino, vestido estampado, gorra
  'C:/Users/eze_s/.gemini/antigravity/brain/bb7d8399-e75d-40cc-b159-aa0c56a2080b/.user_uploaded/media_1787502613669.png', // 3: Bicicleta deco, blusa verde, mujer sentada, chaleco sastrero, 20% OFF, paraguas Perramus
  'C:/Users/eze_s/.gemini/antigravity/brain/bb7d8399-e75d-40cc-b159-aa0c56a2080b/.user_uploaded/media_1787502613712.png'  // 4: Top lencero blanco, Época logo, calzado cuero, top lencero verde, cinturón, trench, edificio histórico
];

const outputDir = path.resolve('public/images/epoca');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// In a 1024x468 image:
// Top tabs: y ~ 0 to 48
// Left sidebar: x ~ 0 to 132
// Right edge: x ~ 880
// Let's calculate the grid:
// 4 columns:
// col width ~ 180-190px each
// row height ~ 180-210px each

async function extractAll() {
  // Let's define grid coordinates for 1024x468
  // Grid bounds approximately:
  // left: 132, top: 48, colWidth: 187, rowHeight: 210, colGap: 2, rowGap: 2
  const left = 132;
  const top = 48;
  const colW = 186;
  const rowH = 208;
  const gap = 2;

  let count = 0;
  for (let imgIdx = 0; imgIdx < userImages.length; imgIdx++) {
    const inputPath = userImages[imgIdx];
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        const x = left + col * (colW + gap);
        const y = top + row * (rowH + gap);
        
        // Ensure within bounds
        const cropX = Math.min(x, 1024 - colW);
        const cropY = Math.min(y, 468 - rowH);
        
        const fileName = `epoca_asset_${imgIdx}_r${row}_c${col}.webp`;
        const dest = path.join(outputDir, fileName);
        
        await sharp(inputPath)
          .extract({ left: Math.round(cropX), top: Math.round(cropY), width: Math.round(colW), height: Math.round(rowH) })
          .webp({ quality: 90 })
          .toFile(dest);
        
        count++;
      }
    }
  }
  console.log(`Successfully extracted ${count} assets to ${outputDir}`);
}

extractAll();
