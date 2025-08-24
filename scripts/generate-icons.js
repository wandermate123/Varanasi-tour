#!/usr/bin/env node

/**
 * Icon Generation Script
 * 
 * This script helps generate the required icon files from the SVG source.
 * 
 * Prerequisites:
 * npm install sharp
 * 
 * Usage:
 * node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.log('❌ Sharp library not found. Please install it first:');
  console.log('npm install sharp');
  console.log('\nAlternatively, use the online converter method described in public/README-icons.md');
  process.exit(1);
}

const publicDir = path.join(__dirname, '../public');
const iconSvgPath = path.join(publicDir, 'icon.svg');

// Check if source SVG exists
if (!fs.existsSync(iconSvgPath)) {
  console.log('❌ Source icon.svg not found in public directory');
  process.exit(1);
}

// Icon configurations
const icons = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 }
];

async function generateIcons() {
  console.log('🎨 Generating icon files...\n');
  
  try {
    for (const icon of icons) {
      const outputPath = path.join(publicDir, icon.name);
      
      await sharp(iconSvgPath)
        .resize(icon.size, icon.size)
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated ${icon.name} (${icon.size}x${icon.size})`);
    }
    
    console.log('\n🎉 All icons generated successfully!');
    console.log('Restart your development server to see the changes.');
    
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    console.log('\n💡 Try the manual method described in public/README-icons.md');
  }
}

// Run the script
generateIcons(); 