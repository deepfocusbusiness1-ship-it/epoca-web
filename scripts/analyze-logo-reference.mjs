import sharp from 'sharp';

const logoSrc = 'C:\\Users\\eze_s\\Documents\\Downloads\\screenshot-2026-08-25-11-08-37 (1).png';

async function analyze() {
  const metaLogo = await sharp(logoSrc).metadata();
  console.log('Logo metadata:', metaLogo);
}

analyze();
