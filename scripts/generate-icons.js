/**
 * Generate placeholder PNG icons for development using sharp
 * Run with: npm run generate-icons
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [16, 48, 128];
const publicIconsDir = path.join(__dirname, '../public/assets/icons');

// Ensure directory exists
if (!fs.existsSync(publicIconsDir)) {
  fs.mkdirSync(publicIconsDir, { recursive: true });
}

// Generate PNG icons using sharp
async function generateIcons() {
  for (const size of sizes) {
    // Create SVG markup
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${size}" height="${size}" rx="${size / 8}" fill="url(#grad)"/>
        <text x="50%" y="${size * 0.58}" font-family="Arial, sans-serif" font-size="${size * 0.35}" fill="white" text-anchor="middle" font-weight="bold">R4M</text>
      </svg>
    `;

    const pngPath = path.join(publicIconsDir, `icon-${size}.png`);

    try {
      await sharp(Buffer.from(svg))
        .png()
        .toFile(pngPath);
      console.log(`✓ Created ${pngPath}`);
    } catch (error) {
      console.error(`✗ Error creating ${pngPath}:`, error.message);
    }
  }

  console.log('\n✓ All icons generated successfully!');
  console.log('Note: These are placeholder icons. For production, create custom icons with your design.');
}

generateIcons().catch(console.error);
