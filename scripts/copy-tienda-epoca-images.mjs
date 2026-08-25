import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = 'C:\\Users\\eze_s\\Documents\\Downloads\\Tienda Epoca';
const destDir = path.resolve('public/images/epoca/tienda-epoca');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function copyAndInspect() {
  const files = fs.readdirSync(srcDir);
  console.log(`Found ${files.length} files in source directory.`);
  
  for (const f of files) {
    const srcFile = path.join(srcDir, f);
    const destFile = path.join(destDir, f);
    fs.copyFileSync(srcFile, destFile);
    
    const meta = await sharp(srcFile).metadata();
    console.log(`${f} -> ${meta.width}x${meta.height} (${(fs.statSync(srcFile).size / 1024).toFixed(1)} KB)`);
  }
  console.log('All files copied successfully.');
}

copyAndInspect();
