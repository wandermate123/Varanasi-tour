export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  image: string;
  premiumImages?: {
    main: string;
    additional: string[];
  };
  artisan?: string;
  materials?: string[];
  dimensions?: string;
  weight?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  reviewCount?: number;
}

export const categories = {
  TEXTILES: 'Textiles',
  DECOR: 'Home Decor',
  JEWELRY: 'Jewelry',
  TOYS: 'Traditional Toys',
  ART: 'Art & Paintings',
  BOOKS: 'Books & Manuscripts',
  POTTERY: 'Pottery & Ceramics',
  SCULPTURES: 'Sculptures',
  MUSICAL: 'Musical Instruments'
} as const;

export const categoryBanners = {
  [categories.TEXTILES]: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=600&fit=crop&crop=center',
  [categories.DECOR]: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&h=600&fit=crop&crop=center',
  [categories.JEWELRY]: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop&crop=center',
  [categories.TOYS]: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=600&fit=crop&crop=center',
  [categories.ART]: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=600&fit=crop&crop=center',
  [categories.BOOKS]: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=600&fit=crop&crop=center',
  [categories.POTTERY]: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop&crop=center',
  [categories.SCULPTURES]: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop&crop=center',
  [categories.MUSICAL]: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop&crop=center'
};

export const products: Product[] = [
  // Textiles
  {
    id: 'banarasi-silk-1',
    title: 'Classic Banarasi Silk Saree',
    description: 'Handwoven pure silk saree with intricate zari work',
    price: 15999,
    category: categories.TEXTILES,
    subCategory: 'Sarees',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Master Weaver Mohammad Ismail',
    materials: ['Pure Silk', 'Zari'],
    isFeatured: true
  },
  {
    id: 'pashmina-shawl-1',
    title: 'Hand Embroidered Pashmina Shawl',
    description: 'Pure pashmina shawl with traditional kashida embroidery',
    price: 8999,
    category: categories.TEXTILES,
    subCategory: 'Shawls',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'cotton-dupatta-1',
    title: 'Handloom Cotton Dupatta',
    description: 'Traditional handloom cotton dupatta with block prints',
    price: 1299,
    category: categories.TEXTILES,
    subCategory: 'Dupatta',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Weaver Kamala Devi'
  },
  {
    id: 'kanjivaram-saree-1',
    title: 'Pure Kanjivaram Silk Saree',
    description: 'Traditional Kanjivaram saree with temple border design',
    price: 22999,
    category: categories.TEXTILES,
    subCategory: 'Sarees',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=1000&fit=crop&crop=center',
    materials: ['Pure Silk', 'Gold Zari'],
    isFeatured: true
  },
  {
    id: 'chikan-kurta-1',
    title: 'Lucknowi Chikan Kurta',
    description: 'Hand-embroidered chikan work kurta in pure cotton',
    price: 3499,
    category: categories.TEXTILES,
    subCategory: 'Kurtas',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Master Embroiderer Fatima'
  },
  {
    id: 'jamdani-saree-1',
    title: 'Handwoven Jamdani Saree',
    description: 'Pure cotton jamdani saree with intricate motifs',
    price: 12999,
    category: categories.TEXTILES,
    subCategory: 'Sarees',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=1000&fit=crop&crop=center',
    materials: ['Pure Cotton']
  },
  {
    id: 'silk-scarf-1',
    title: 'Hand Painted Silk Scarf',
    description: 'Artisan painted silk scarf with floral motifs',
    price: 2999,
    category: categories.TEXTILES,
    subCategory: 'Scarves',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'handloom-stole-1',
    title: 'Handloom Wool Stole',
    description: 'Traditional handloom wool stole with geometric patterns',
    price: 4999,
    category: categories.TEXTILES,
    subCategory: 'Stoles',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'block-print-fabric-1',
    title: 'Hand Block Print Fabric',
    description: 'Traditional block printed cotton fabric per meter',
    price: 899,
    category: categories.TEXTILES,
    subCategory: 'Fabrics',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'ikat-saree-1',
    title: 'Pochampally Ikat Saree',
    description: 'Traditional ikat weave saree with geometric patterns',
    price: 8999,
    category: categories.TEXTILES,
    subCategory: 'Sarees',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'khadi-shirt-1',
    title: 'Handspun Khadi Shirt',
    description: 'Pure handspun khadi cotton shirt',
    price: 2499,
    category: categories.TEXTILES,
    subCategory: 'Shirts',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'chanderi-saree-1',
    title: 'Chanderi Silk Saree',
    description: 'Traditional Chanderi saree with gold zari work',
    price: 9999,
    category: categories.TEXTILES,
    subCategory: 'Sarees',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'wool-shawl-1',
    title: 'Pure Wool Himalayan Shawl',
    description: 'Hand-woven pure wool shawl from Himalayas',
    price: 6999,
    category: categories.TEXTILES,
    subCategory: 'Shawls',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=1000&fit=crop&crop=center'
  },

  // Jewelry
  {
    id: 'kundan-necklace-1',
    title: 'Traditional Kundan Necklace',
    description: 'Handcrafted kundan necklace with precious stones',
    price: 15999,
    category: categories.JEWELRY,
    subCategory: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Master Goldsmith Rajesh Kumar',
    materials: ['Kundan', 'Gold Plated', 'Precious Stones'],
    isFeatured: true
  },
  {
    id: 'silver-earrings-1',
    title: 'Filigree Silver Earrings',
    description: 'Handcrafted silver filigree earrings with traditional motifs',
    price: 4999,
    category: categories.JEWELRY,
    subCategory: 'Earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Silver Smith Priya Sharma'
  },
  {
    id: 'pearl-bracelet-1',
    title: 'Freshwater Pearl Bracelet',
    description: 'Hand-strung freshwater pearl bracelet with silver clasp',
    price: 7999,
    category: categories.JEWELRY,
    subCategory: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'jade-ring-1',
    title: 'Jade and Silver Ring',
    description: 'Handcrafted jade ring with sterling silver setting',
    price: 12999,
    category: categories.JEWELRY,
    subCategory: 'Rings',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'silver-bracelet-1',
    title: 'Tribal Silver Bracelet',
    description: 'Heavy silver bracelet with tribal patterns',
    price: 2999,
    category: categories.JEWELRY,
    subCategory: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'beaded-necklace-1',
    title: 'Traditional Beaded Necklace',
    description: 'Colorful beaded necklace with semi-precious stones',
    price: 1999,
    category: categories.JEWELRY,
    subCategory: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'nose-ring-1',
    title: 'Traditional Nose Ring',
    description: 'Delicate gold nose ring with pearl drop',
    price: 3999,
    category: categories.JEWELRY,
    subCategory: 'Nose Jewelry',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'bangles-set-1',
    title: 'Lac Bangles Set',
    description: 'Set of 6 traditional lac bangles',
    price: 899,
    category: categories.JEWELRY,
    subCategory: 'Bangles',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'pendant-1',
    title: 'Silver Temple Pendant',
    description: 'Intricate silver pendant with temple motifs',
    price: 2499,
    category: categories.JEWELRY,
    subCategory: 'Pendants',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'anklets-1',
    title: 'Silver Anklets Pair',
    description: 'Traditional silver anklets with bells',
    price: 1799,
    category: categories.JEWELRY,
    subCategory: 'Anklets',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'hair-ornament-1',
    title: 'Traditional Hair Ornament',
    description: 'Gold-plated hair ornament for special occasions',
    price: 5999,
    category: categories.JEWELRY,
    subCategory: 'Hair Jewelry',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'ring-set-1',
    title: 'Vintage Ring Set',
    description: 'Set of 3 vintage-style rings with gemstones',
    price: 3499,
    category: categories.JEWELRY,
    subCategory: 'Rings',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },

  // Home Decor
  {
    id: 'brass-lamp-1',
    title: 'Traditional Brass Diya Lamp',
    description: 'Handcrafted brass diya lamp with intricate carvings',
    price: 2999,
    category: categories.DECOR,
    subCategory: 'Lamps',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Brass Craftsman Harish Kumar',
    materials: ['Pure Brass'],
    isNew: true
  },
  {
    id: 'wooden-bowl-1',
    title: 'Hand-carved Wooden Bowl',
    description: 'Traditional wooden bowl with tribal carvings',
    price: 1999,
    category: categories.DECOR,
    subCategory: 'Bowls',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'copper-vase-1',
    title: 'Handcrafted Copper Vase',
    description: 'Traditional copper vase with hammered finish',
    price: 5999,
    category: categories.DECOR,
    subCategory: 'Vases',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'wall-hanging-1',
    title: 'Macrame Wall Hanging',
    description: 'Handwoven macrame wall hanging with beads',
    price: 1299,
    category: categories.DECOR,
    subCategory: 'Wall Art',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'mirror-frame-1',
    title: 'Carved Wooden Mirror',
    description: 'Hand-carved wooden mirror frame with traditional motifs',
    price: 3999,
    category: categories.DECOR,
    subCategory: 'Mirrors',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'cushion-cover-1',
    title: 'Embroidered Cushion Covers',
    description: 'Set of 4 hand-embroidered cushion covers',
    price: 1599,
    category: categories.DECOR,
    subCategory: 'Textiles',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'wind-chime-1',
    title: 'Bamboo Wind Chime',
    description: 'Traditional bamboo wind chime with melodious sound',
    price: 799,
    category: categories.DECOR,
    subCategory: 'Wind Chimes',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'statue-ganesha-1',
    title: 'Brass Ganesha Statue',
    description: 'Handcrafted brass Ganesha statue for home temple',
    price: 2999,
    category: categories.DECOR,
    subCategory: 'Religious',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'table-runner-1',
    title: 'Handwoven Table Runner',
    description: 'Traditional handwoven table runner with fringes',
    price: 899,
    category: categories.DECOR,
    subCategory: 'Textiles',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'incense-stand-1',
    title: 'Wooden Incense Stand',
    description: 'Carved wooden incense stand with storage',
    price: 599,
    category: categories.DECOR,
    subCategory: 'Incense',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'decorative-bowl-1',
    title: 'Brass Decorative Bowl',
    description: 'Ornate brass bowl with engraved patterns',
    price: 1499,
    category: categories.DECOR,
    subCategory: 'Bowls',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'tapestry-1',
    title: 'Hand-woven Tapestry',
    description: 'Large decorative tapestry with traditional patterns',
    price: 4999,
    category: categories.DECOR,
    subCategory: 'Wall Art',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    dimensions: '72" x 48"'
  },
  {
    id: 'incense-holder-1',
    title: 'Clay Incense Holder',
    description: 'Traditional clay incense holder with ash catcher',
    price: 299,
    category: categories.POTTERY,
    subCategory: 'Incense',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },

  // Art & Paintings
  {
    id: 'miniature-painting-1',
    title: 'Mughal Miniature Painting',
    description: 'Hand-painted miniature on wasli paper with natural pigments',
    price: 25999,
    category: categories.ART,
    subCategory: 'Miniatures',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Master Artist Abdul Rahman',
    materials: ['Natural Pigments', 'Wasli Paper', 'Gold Leaf'],
    isFeatured: true
  },
  {
    id: 'madhubani-painting-1',
    title: 'Traditional Madhubani Painting',
    description: 'Hand-painted Madhubani art on handmade paper',
    price: 8999,
    category: categories.ART,
    subCategory: 'Folk Art',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Folk Artist Meera Devi'
  },
  {
    id: 'warli-painting-1',
    title: 'Warli Tribal Painting',
    description: 'Traditional Warli painting on canvas with natural colors',
    price: 6999,
    category: categories.ART,
    subCategory: 'Tribal Art',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'pattachitra-1',
    title: 'Pattachitra Scroll Painting',
    description: 'Traditional Pattachitra painting on cloth scroll',
    price: 15999,
    category: categories.ART,
    subCategory: 'Scroll Paintings',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'tanjore-painting-1',
    title: 'Tanjore Gold Painting',
    description: 'Traditional Tanjore painting with gold foil work',
    price: 8999,
    category: categories.ART,
    subCategory: 'Religious Art',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    materials: ['Gold Foil', 'Natural Colors'],
    isFeatured: true
  },
  {
    id: 'gond-art-1',
    title: 'Gond Tribal Painting',
    description: 'Colorful Gond art depicting nature and animals',
    price: 1999,
    category: categories.ART,
    subCategory: 'Tribal Art',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'pichwai-painting-1',
    title: 'Pichwai Temple Painting',
    description: 'Traditional Pichwai painting of Lord Krishna',
    price: 12999,
    category: categories.ART,
    subCategory: 'Religious Art',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    dimensions: '36" x 48"'
  },
  {
    id: 'mandala-art-1',
    title: 'Hand Drawn Mandala Art',
    description: 'Intricate mandala design on handmade paper',
    price: 1799,
    category: categories.ART,
    subCategory: 'Spiritual Art',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'phad-painting-1',
    title: 'Rajasthani Phad Painting',
    description: 'Traditional Phad scroll painting with folk tales',
    price: 6999,
    category: categories.ART,
    subCategory: 'Folk Art',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    dimensions: '30" x 20"'
  },
  {
    id: 'mysore-painting-1',
    title: 'Mysore Traditional Painting',
    description: 'Classical Mysore painting with gold work',
    price: 9999,
    category: categories.ART,
    subCategory: 'Classical Art',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'canvas-art-1',
    title: 'Contemporary Canvas Art',
    description: 'Modern interpretation of traditional motifs',
    price: 5999,
    category: categories.ART,
    subCategory: 'Contemporary',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    isNew: true
  },
  {
    id: 'folk-collage-1',
    title: 'Mixed Media Folk Collage',
    description: 'Collage art using traditional materials and techniques',
    price: 3299,
    category: categories.ART,
    subCategory: 'Mixed Media',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },

  // Traditional Toys
  {
    id: 'wooden-puppet-1',
    title: 'Hand-carved Wooden Puppet',
    description: 'Traditional wooden puppet for storytelling',
    price: 1499,
    category: categories.TOYS,
    subCategory: 'Puppets',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Toy Maker Ramesh Patel'
  },
  {
    id: 'clay-toy-1',
    title: 'Terracotta Clay Toys Set',
    description: 'Traditional terracotta toys handcrafted by artisans',
    price: 899,
    category: categories.TOYS,
    subCategory: 'Clay Toys',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'wooden-puzzle-1',
    title: 'Traditional Wooden Puzzle Set',
    description: 'Hand-carved wooden puzzle games',
    price: 1499,
    category: categories.TOYS,
    subCategory: 'Wooden Toys',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    materials: ['Teak Wood'],
    isNew: true
  },
  {
    id: 'cloth-doll-1',
    title: 'Handmade Cloth Doll',
    description: 'Traditional cloth doll with embroidered details',
    price: 999,
    category: categories.TOYS,
    subCategory: 'Dolls',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'spinning-top-1',
    title: 'Wooden Spinning Top',
    description: 'Traditional wooden spinning top (lattoo)',
    price: 299,
    category: categories.TOYS,
    subCategory: 'Wooden Toys',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    materials: ['Mango Wood']
  },
  {
    id: 'marbles-set-1',
    title: 'Clay Marble Set',
    description: 'Traditional clay marbles (kanche) set of 20',
    price: 199,
    category: categories.TOYS,
    subCategory: 'Traditional Games',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'wooden-horse-1',
    title: 'Carved Wooden Horse',
    description: 'Hand-carved wooden rocking horse',
    price: 2999,
    category: categories.TOYS,
    subCategory: 'Wooden Toys',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'kaleidoscope-1',
    title: 'Traditional Kaleidoscope',
    description: 'Handmade kaleidoscope with glass beads',
    price: 799,
    category: categories.TOYS,
    subCategory: 'Optical Toys',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'puppet-set-1',
    title: 'Rajasthani Puppet Set',
    description: 'Traditional kathputli puppet set of 4',
    price: 1999,
    category: categories.TOYS,
    subCategory: 'Puppets',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'wooden-blocks-1',
    title: 'Educational Wooden Blocks',
    description: 'Hand-painted alphabet and number blocks',
    price: 1299,
    category: categories.TOYS,
    subCategory: 'Educational',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'kite-set-1',
    title: 'Traditional Paper Kites',
    description: 'Handmade paper kites with string - set of 5',
    price: 399,
    category: categories.TOYS,
    subCategory: 'Flying Toys',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'yo-yo-1',
    title: 'Wooden Yo-Yo',
    description: 'Traditional wooden yo-yo with decorative paint',
    price: 249,
    category: categories.TOYS,
    subCategory: 'Skill Toys',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'animal-set-1',
    title: 'Wooden Animal Set',
    description: 'Hand-carved farm animal set of 6 pieces',
    price: 1799,
    category: categories.TOYS,
    subCategory: 'Wooden Toys',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'musical-toy-1',
    title: 'Wooden Rattle',
    description: 'Traditional wooden baby rattle with bells',
    price: 399,
    category: categories.TOYS,
    subCategory: 'Musical Toys',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'snake-ladder-1',
    title: 'Wooden Snake & Ladder',
    description: 'Traditional wooden snake and ladder board game',
    price: 899,
    category: categories.TOYS,
    subCategory: 'Board Games',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },

  // Books & Manuscripts
  {
    id: 'illuminated-manuscript-1',
    title: 'Illuminated Manuscript Page',
    description: 'Hand-illuminated manuscript page with gold leaf',
    price: 35999,
    category: categories.BOOKS,
    subCategory: 'Manuscripts',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Manuscript Artist Dr. Ahmed Khan',
    materials: ['Handmade Paper', 'Gold Leaf', 'Natural Pigments'],
    isFeatured: true
  },
  {
    id: 'calligraphy-book-1',
    title: 'Hand-bound Calligraphy Book',
    description: 'Traditional calligraphy book with leather binding',
    price: 12999,
    category: categories.BOOKS,
    subCategory: 'Calligraphy',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'art-book-1',
    title: 'Illustrated Art Book',
    description: 'Hand-illustrated book of traditional art forms',
    price: 2499,
    category: categories.BOOKS,
    subCategory: 'Art Books',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'poetry-collection-1',
    title: 'Classical Poetry Collection',
    description: 'Collection of classical Indian poetry with translations',
    price: 1899,
    category: categories.BOOKS,
    subCategory: 'Poetry',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'cookbook-1',
    title: 'Traditional Recipe Book',
    description: 'Authentic regional recipes passed down generations',
    price: 1299,
    category: categories.BOOKS,
    subCategory: 'Cookbooks',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'folk-tales-1',
    title: 'Folk Tales Collection',
    description: 'Illustrated collection of regional folk tales',
    price: 999,
    category: categories.BOOKS,
    subCategory: 'Folk Literature',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'history-book-1',
    title: 'Ancient Indian History',
    description: 'Comprehensive guide to ancient Indian civilizations',
    price: 2299,
    category: categories.BOOKS,
    subCategory: 'History',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'mythology-book-1',
    title: 'Indian Mythology Stories',
    description: 'Beautifully illustrated mythological stories',
    price: 1599,
    category: categories.BOOKS,
    subCategory: 'Mythology',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'music-theory-1',
    title: 'Classical Music Theory',
    description: 'Introduction to Indian classical music theory',
    price: 1999,
    category: categories.BOOKS,
    subCategory: 'Music',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'philosophy-book-1',
    title: 'Ancient Philosophy Texts',
    description: 'Translated texts of ancient Indian philosophy',
    price: 2799,
    category: categories.BOOKS,
    subCategory: 'Philosophy',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'craft-book-1',
    title: 'Traditional Crafts Guide',
    description: 'Step-by-step guide to traditional Indian crafts',
    price: 1399,
    category: categories.BOOKS,
    subCategory: 'Crafts',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'travel-book-1',
    title: 'Heritage Travel Guide',
    description: 'Complete guide to Indian heritage sites',
    price: 1699,
    category: categories.BOOKS,
    subCategory: 'Travel',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'language-book-1',
    title: 'Sanskrit Learning Guide',
    description: 'Beginner-friendly Sanskrit language learning book',
    price: 1199,
    category: categories.BOOKS,
    subCategory: 'Language',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },

  // Pottery & Ceramics
  {
    id: 'blue-pottery-1',
    title: 'Jaipur Blue Pottery Vase',
    description: 'Handcrafted blue pottery vase with traditional motifs',
    price: 3999,
    category: categories.POTTERY,
    subCategory: 'Vases',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Master Potter Ram Singh',
    materials: ['Terracotta', 'Quartz', 'Glass'],
    isNew: true
  },
  {
    id: 'black-pottery-1',
    title: 'Manipur Black Pottery Bowl',
    description: 'Traditional black pottery bowl with unique finish',
    price: 2499,
    category: categories.POTTERY,
    subCategory: 'Bowls',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'terracotta-plate-1',
    title: 'Handcrafted Terracotta Plate',
    description: 'Traditional terracotta plate with hand-carved designs',
    price: 1299,
    category: categories.POTTERY,
    subCategory: 'Plates',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'ceramic-bowls-1',
    title: 'Handmade Ceramic Bowls',
    description: 'Set of 6 handmade ceramic bowls with traditional glaze',
    price: 1899,
    category: categories.POTTERY,
    subCategory: 'Bowls',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'decorative-pot-1',
    title: 'Decorative Clay Pot',
    description: 'Large decorative clay pot with intricate carvings',
    price: 2499,
    category: categories.POTTERY,
    subCategory: 'Decorative',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    dimensions: '18" x 14"'
  },
  {
    id: 'pottery-plates-1',
    title: 'Handcrafted Pottery Plates',
    description: 'Set of 4 dinner plates with traditional patterns',
    price: 1299,
    category: categories.POTTERY,
    subCategory: 'Dining',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'ceramic-cups-1',
    title: 'Traditional Ceramic Cups',
    description: 'Set of 6 handmade ceramic tea cups',
    price: 899,
    category: categories.POTTERY,
    subCategory: 'Cups',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'clay-lamp-1',
    title: 'Traditional Clay Diya',
    description: 'Hand-molded clay oil lamps - set of 10',
    price: 399,
    category: categories.POTTERY,
    subCategory: 'Lamps',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'ceramic-vase-1',
    title: 'Glazed Ceramic Vase',
    description: 'Beautiful glazed ceramic vase with floral motifs',
    price: 1799,
    category: categories.POTTERY,
    subCategory: 'Vases',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'pottery-pitcher-1',
    title: 'Clay Water Pitcher',
    description: 'Traditional clay water pitcher (matka)',
    price: 699,
    category: categories.POTTERY,
    subCategory: 'Water Storage',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'decorative-tiles-1',
    title: 'Hand-painted Ceramic Tiles',
    description: 'Set of 6 decorative ceramic tiles with traditional patterns',
    price: 1499,
    category: categories.POTTERY,
    subCategory: 'Tiles',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'pottery-planter-1',
    title: 'Ceramic Garden Planter',
    description: 'Large ceramic planter with drainage holes',
    price: 1999,
    category: categories.POTTERY,
    subCategory: 'Planters',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },

  // Musical Instruments
  {
    id: 'sitar-1',
    title: 'Handcrafted Sitar',
    description: 'Traditional sitar made by master craftsmen',
    price: 45999,
    category: categories.MUSICAL,
    subCategory: 'String Instruments',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Master Instrument Maker Ustad Ali Khan',
    materials: ['Tun Wood', 'Gourd', 'Metal Strings'],
    isFeatured: true
  },
  {
    id: 'tabla-set-1',
    title: 'Professional Tabla Set',
    description: 'Handcrafted tabla set with traditional tuning',
    price: 18999,
    category: categories.MUSICAL,
    subCategory: 'Percussion',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'bansuri-1',
    title: 'Bamboo Bansuri Flute',
    description: 'Handcrafted bamboo bansuri with perfect tuning',
    price: 3999,
    category: categories.MUSICAL,
    subCategory: 'Wind Instruments',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'harmonium-1',
    title: 'Traditional Harmonium',
    description: 'Portable harmonium with 32 keys',
    price: 8999,
    category: categories.MUSICAL,
    subCategory: 'Keyboard',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'veena-1',
    title: 'Saraswati Veena',
    description: 'Classical South Indian veena with traditional carvings',
    price: 35999,
    category: categories.MUSICAL,
    subCategory: 'String Instruments',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'dhol-1',
    title: 'Punjabi Dhol',
    description: 'Traditional Punjabi dhol with leather straps',
    price: 5999,
    category: categories.MUSICAL,
    subCategory: 'Percussion',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'santoor-1',
    title: 'Kashmir Santoor',
    description: 'Traditional Kashmiri santoor with 100 strings',
    price: 25999,
    category: categories.MUSICAL,
    subCategory: 'String Instruments',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'manjira-1',
    title: 'Traditional Manjira',
    description: 'Small hand cymbals used in folk music',
    price: 399,
    category: categories.MUSICAL,
    subCategory: 'Percussion',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'esraj-1',
    title: 'Bengal Esraj',
    description: 'Traditional Bengali bowed string instrument',
    price: 18999,
    category: categories.MUSICAL,
    subCategory: 'String Instruments',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'mridangam-1',
    title: 'South Indian Mridangam',
    description: 'Classical Carnatic percussion instrument',
    price: 12999,
    category: categories.MUSICAL,
    subCategory: 'Percussion',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'shehnai-1',
    title: 'Traditional Shehnai',
    description: 'Classical Indian oboe-like wind instrument',
    price: 2999,
    category: categories.MUSICAL,
    subCategory: 'Wind Instruments',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },
  {
    id: 'tambura-1',
    title: 'Classical Tambura',
    description: 'Four-stringed drone instrument for classical music',
    price: 22999,
    category: categories.MUSICAL,
    subCategory: 'String Instruments',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  },

  // Sculptures
  {
    id: 'stone-sculpture-1',
    title: 'Hand-carved Stone Sculpture',
    description: 'Traditional stone sculpture with religious motifs',
    price: 45999,
    category: categories.SCULPTURES,
    subCategory: 'Stone',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center',
    artisan: 'Master Sculptor Venkatesh Iyer',
    materials: ['Sandstone'],
    isNew: true
  },
  {
    id: 'wooden-sculpture-1',
    title: 'Sacred Wooden Sculpture',
    description: 'Hand-carved wooden sculpture with traditional designs',
    price: 25999,
    category: categories.SCULPTURES,
    subCategory: 'Wood',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center'
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

// Helper function to search products
export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.subCategory.toLowerCase().includes(searchTerm)
  );
};

// Helper function to get product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
}; 