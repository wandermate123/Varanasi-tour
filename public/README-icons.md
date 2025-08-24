# Icon Files Setup

## Current Issue
The browser is showing 404 errors for missing icon files:
- `/apple-touch-icon.png`
- `/icon-192.png` 
- `/icon-512.png`
- `/favicon.ico`

## Solution

### Option 1: Use Online Converters (Recommended for quick fix)
1. Go to https://convertio.co/svg-png/ or https://cloudconvert.com/svg-to-png
2. Upload the `icon.svg` file
3. Convert to PNG with these sizes:
   - `icon-192.png` (192x192 pixels)
   - `icon-512.png` (512x512 pixels)
   - `apple-touch-icon.png` (180x180 pixels)
4. Download and place the files in the `public/` directory

### Option 2: Use Command Line Tools
If you have ImageMagick installed:
```bash
# Convert SVG to PNG files
convert icon.svg -resize 192x192 icon-192.png
convert icon.svg -resize 512x512 icon-512.png
convert icon.svg -resize 180x180 apple-touch-icon.png
```

### Option 3: Use Design Software
- Open the `icon.svg` file in Figma, Adobe Illustrator, or similar
- Export as PNG with the required sizes
- Place files in the `public/` directory

## Current Fallback
The app currently uses SVG icons as fallbacks, which should work in modern browsers but may not work in all cases.

## Files to Create
- `public/icon-192.png` (192x192)
- `public/icon-512.png` (512x512) 
- `public/apple-touch-icon.png` (180x180)

## Testing
After creating the files, restart your development server and check the browser console - the 404 errors should be resolved. 