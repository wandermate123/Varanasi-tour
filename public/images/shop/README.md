# Product Images Structure

## Image Requirements

### Category Banners
- Location: `/images/shop/categories/`
- Size: 1920x480px
- Format: JPG/JPEG
- Quality: 80-90%
- File naming: `{category-name}-banner.jpg`

### Product Images
- Location: `/images/shop/{category}/`
- Size: 800x800px (1:1 ratio)
- Format: JPG/JPEG
- Quality: 80-90%
- File naming: `{product-id}.jpg`

### Premium Product Images
- Location: `/images/shop/{category}/premium/`
- Main Image: 1200x1200px (1:1 ratio)
- Additional Images: Up to 4 per product
- Format: JPG/JPEG
- Quality: 90-100%
- File naming: 
  - Main: `{product-id}-premium.jpg`
  - Additional: `{product-id}-premium-{1-4}.jpg`

## Directory Structure
```
/images/shop/
├── categories/          # Category banner images
├── textiles/           # Textile product images
├── art/                # Art product images
├── toys/               # Traditional toys images
├── books/              # Books & manuscripts images
├── pottery/            # Pottery & ceramics images
├── musical/            # Musical instruments images
├── jewelry/            # Jewelry images
└── decor/              # Home decor images
```

## Image Guidelines
1. Use high-quality, well-lit photographs
2. Maintain consistent background (preferably white or light neutral)
3. Show product details clearly
4. Include multiple angles for premium images
5. Ensure accurate color representation
6. Add subtle shadows for depth
7. Remove any watermarks or text overlays 