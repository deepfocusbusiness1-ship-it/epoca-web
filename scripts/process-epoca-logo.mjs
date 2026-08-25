import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const logoSrc = 'C:\\Users\\eze_s\\Documents\\Downloads\\screenshot-2026-08-25-11-08-37 (1).png';
const brandDir = path.resolve('public/images/epoca/brand');

if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
}

async function processLogo() {
  const { data, info } = await sharp(logoSrc).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Let's find exact circle center and radius
  // Let's search the outer edge of the ring gradient with high precision
  const getPixel = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return { r: 0, g: 0, b: 0, a: 0 };
    const idx = (y * width + x) * channels;
    return {
      r: data[idx],
      g: data[idx + 1],
      b: data[idx + 2],
      a: channels === 4 ? data[idx + 3] : 255
    };
  };

  const toHex = (c) => '#' + [c.r, c.g, c.b].map(x => x.toString(16).padStart(2, '0')).join('');

  // Sample gold wordmark color:
  // "ÉPOCA" wordmark is located below the center
  let maxGold = null;
  let goldCoords = { x: 0, y: 0 };
  for (let y = 140; y < 220; y++) {
    for (let x = 70; x < 210; x++) {
      const p = getPixel(x, y);
      // Gold has high R and G, lower B (e.g. #D4AF37, #C5A880, #D2A85C, #E5C378)
      if (p.r > 160 && p.g > 130 && p.b < 120) {
        if (!maxGold || (p.r + p.g - p.b) > (maxGold.r + maxGold.g - maxGold.b)) {
          maxGold = p;
          goldCoords = { x, y };
        }
      }
    }
  }

  console.log('Sampled Gold Wordmark Color at', goldCoords, ':', maxGold ? toHex(maxGold) : 'not found');

  // Let's sample colors in the gradient ring around 360 degrees
  const cx = 138.5;
  const cy = 146.5;
  const radius = 101.5;

  const ringColors = [];
  for (let deg = 0; deg < 360; deg += 30) {
    const rad = (deg * Math.PI) / 180;
    const px = Math.round(cx + radius * Math.cos(rad));
    const py = Math.round(cy + radius * Math.sin(rad));
    const col = getPixel(px, py);
    ringColors.push({ deg, hex: toHex(col), rgb: col });
  }

  console.log('Ring gradient samples around circle (every 30 deg):', ringColors);

  // Let's sample navy blue inside:
  const navyPixel = getPixel(Math.round(cx - 30), Math.round(cy + 30));
  console.log('Navy inside circle:', toHex(navyPixel));

  // Outer dark background:
  const darkBgPixel = getPixel(5, 5);
  console.log('Outer background:', toHex(darkBgPixel));

  // Now create the transparent circular cropped version:
  // We want to create an SVG circle mask or write RGBA buffer directly with antialiased edge
  const cropSize = 208; // diameter + a bit of margin
  const cropLeft = Math.round(cx - cropSize / 2);
  const cropTop = Math.round(cy - cropSize / 2);

  // Create SVG mask with antialiased circle
  const r = 101.5;
  const maskCx = cropSize / 2;
  const maskCy = cropSize / 2;

  const maskSvg = `<svg width="${cropSize}" height="${cropSize}">
    <circle cx="${maskCx}" cy="${maskCy}" r="${r}" fill="#ffffff" />
  </svg>`;

  // 1. Crop to circle area and apply alpha circle mask
  const croppedImage = await sharp(logoSrc)
    .extract({ left: cropLeft, top: cropTop, width: cropSize, height: cropSize })
    .composite([
      {
        input: Buffer.from(maskSvg),
        blend: 'dest-in'
      }
    ])
    .png()
    .toBuffer();

  const outPathPng = path.join(brandDir, 'logo-epoca-round.png');
  const outPathWebp = path.join(brandDir, 'logo-epoca-round.webp');
  const outHeaderPath = path.join(brandDir, 'logo-epoca-header.webp');
  const outFaviconPng = path.join(brandDir, 'favicon.png');
  const outPublicFavicon = path.resolve('public/favicon.ico');
  const outSocialPng = path.join(brandDir, 'logo-epoca-social.png');

  fs.writeFileSync(outPathPng, croppedImage);
  console.log('Saved:', outPathPng);

  await sharp(croppedImage)
    .webp({ quality: 95 })
    .toFile(outPathWebp);
  console.log('Saved:', outPathWebp);

  // Header version (resized with high sharpness)
  await sharp(croppedImage)
    .resize(136, 136, { fit: 'contain' })
    .webp({ quality: 95 })
    .toFile(outHeaderPath);
  console.log('Saved:', outHeaderPath);

  // Favicon (32x32 and 64x64)
  await sharp(croppedImage)
    .resize(64, 64, { fit: 'contain' })
    .png()
    .toFile(outFaviconPng);
  console.log('Saved:', outFaviconPng);

  // Also write public/favicon.ico (PNG inside ico format or 32x32 png)
  await sharp(croppedImage)
    .resize(32, 32, { fit: 'contain' })
    .png()
    .toFile(outPublicFavicon);
  console.log('Saved:', outPublicFavicon);

  // Social share image (keeping background square)
  fs.copyFileSync(logoSrc, outSocialPng);
  console.log('Saved:', outSocialPng);
}

processLogo();
