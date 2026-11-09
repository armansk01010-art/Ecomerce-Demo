import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'mn-001',
    name: 'Atelier Double-Breasted Linen Blazer',
    subtitle: 'French Flax Linen · Structured Silhouette',
    category: 'Outerwear & Jackets',
    gender: 'Women',
    price: 5499,
    originalPrice: 6200,
    colors: [
      { name: 'Oatmeal Ivory', hex: '#E6DFD3' },
      { name: 'Charcoal Noir', hex: '#262626' },
      { name: 'Warm Terracotta', hex: '#A36B56' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    primaryImage: '/src/assets/images/tailored_linen_jacket_1794217084028.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      '/src/assets/images/tailored_linen_jacket_1794217084028.jpg',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548624149-f1e1f570081e?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Masterfully structured double-breasted jacket spun from pure European flax linen. Features sharp peak lapels, horn buttons, and an unstructured shoulder designed for effortless timeless layering.',
    composition: ['100% Normandy Flax Linen', 'Inner Viscose Lining', 'Natural Horn Buttons'],
    careInstructions: ['Dry clean only', 'Iron on low heat with press cloth', 'Do not bleach'],
    isNewArrival: true,
    isBestseller: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'mn-002',
    name: 'Draped Mulberry Silk Midi Dress',
    subtitle: '22-Momme Pure Silk · Asymmetric Cut',
    category: 'Dresses & Sets',
    gender: 'Women',
    price: 4899,
    originalPrice: 5500,
    colors: [
      { name: 'Raw Champagne', hex: '#D6C5B3' },
      { name: 'Noir Charcoal', hex: '#1C1C1C' },
      { name: 'Sage Olive', hex: '#7A8471' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    primaryImage: '/src/assets/images/women_silk_dress_1794217084262.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      '/src/assets/images/women_silk_dress_1794217084262.jpg',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Fluid bias-cut midi dress cut from 100% 22-momme Mulberry silk. Designed with a gentle cowl neckline, low scoop back, and asymmetric drape that glides effortlessly.',
    composition: ['100% Grade 6A Mulberry Silk', 'Self-Lined Bust Layer'],
    careInstructions: ['Hand wash cold with silk detergent', 'Line dry in shade', 'Cool iron on reverse'],
    isNewArrival: true,
    isBestseller: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 42
  },
  {
    id: 'mn-003',
    name: 'Luxe French Oxford Linen Shirt',
    subtitle: 'Enzyme Washed · Mother of Pearl Buttons',
    category: 'Tops & Shirts',
    gender: 'Men',
    price: 2999,
    colors: [
      { name: 'Raw Linen', hex: '#D6CBBC' },
      { name: 'Optic White', hex: '#F9F8F6' },
      { name: 'Sky Blue', hex: '#B8C6D9' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    primaryImage: '/src/assets/images/lookbook_men_collection_1794217069603.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      '/src/assets/images/lookbook_men_collection_1794217069603.jpg',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A perennial wardrobe anchor woven in Normandy. Enzyme-washed for an authentic lived-in texture, detailed with Australian mother-of-pearl buttons and relaxed drop shoulders.',
    composition: ['100% Organic French Linen', 'Australian Shell Buttons'],
    careInstructions: ['Machine wash gentle 30°C', 'Hang dry', 'Iron while damp for crisp finish'],
    isNewArrival: true,
    isBestseller: false,
    inStock: true,
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 'mn-004',
    name: 'Structured Forward-Pleat Wool Trousers',
    subtitle: 'High Rise · Side Tab Waistband',
    category: 'Trousers & Tailoring',
    gender: 'Men',
    price: 3999,
    originalPrice: 4500,
    colors: [
      { name: 'Charcoal Slate', hex: '#333333' },
      { name: 'Warm Camel', hex: '#A89279' },
      { name: 'Midnight Navy', hex: '#1E2430' }
    ],
    sizes: ['30', '32', '34', '36'],
    primaryImage: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: '/src/assets/images/lookbook_men_collection_1794217069603.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop',
      '/src/assets/images/lookbook_men_collection_1794217069603.jpg',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Tailored with double forward pleats and a relaxed tapered leg. Features an adjustable side tab waistband, horn buttons, and high-rise design for architectural drape.',
    composition: ['70% Tropical Wool', '30% Tencel Fine Twill'],
    careInstructions: ['Dry clean recommended', 'Steam to refresh crease'],
    isNewArrival: false,
    isBestseller: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 54
  },
  {
    id: 'mn-005',
    name: 'Heavyweight 280GSM Organic Cotton Tee',
    subtitle: 'Combed Cotton · Blind Hem Stitch',
    category: 'Tops & Shirts',
    gender: 'Unisex',
    price: 1699,
    colors: [
      { name: 'Chalk White', hex: '#F5F3ED' },
      { name: 'Raw Beige', hex: '#DED6C7' },
      { name: 'Washed Charcoal', hex: '#3B3B3B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Crafted from 280 GSM combed organic cotton. Built with a structured ribbed collar, blind-stitched hems, and a relaxed boxy cut that retains shape wash after wash.',
    composition: ['100% GOTS Certified Organic Cotton', 'Pre-shrunk fabric'],
    careInstructions: ['Machine wash cold inside out', 'Tumble dry low'],
    isNewArrival: true,
    isBestseller: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 88
  },
  {
    id: 'mn-006',
    name: 'The Studio Linen Wrap Co-ord Set',
    subtitle: 'Asymmetric Top & Wide Trousers',
    category: 'Dresses & Sets',
    gender: 'Women',
    price: 5299,
    originalPrice: 5999,
    colors: [
      { name: 'Natural Linen', hex: '#D1C6B4' },
      { name: 'Dusty Rose', hex: '#CBB4AE' },
      { name: 'Mocha', hex: '#7D695D' }
    ],
    sizes: ['S', 'M', 'L'],
    primaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A two-piece ensemble featuring an asymmetrical wrap top and wide-leg trousers. Designed for effortless transitional elegance from daylight meetings to evening soirees.',
    composition: ['85% Flax Linen', '15% Fine Silk Weave'],
    careInstructions: ['Dry clean or delicate hand wash', 'Cool iron'],
    isNewArrival: true,
    isBestseller: false,
    inStock: true,
    rating: 4.9,
    reviewCount: 19
  },
  {
    id: 'mn-007',
    name: 'Minimalist Wool-Tencel Trench Coat',
    subtitle: 'Unlined Fluid Drape · Raglan Sleeves',
    category: 'Outerwear & Jackets',
    gender: 'Unisex',
    price: 5499,
    colors: [
      { name: 'Warm Ivory', hex: '#EDE8DE' },
      { name: 'Charcoal Noir', hex: '#242424' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    primaryImage: '/src/assets/images/hero_editorial_campaign_1794217069077.jpg',
    secondaryImage: '/src/assets/images/tailored_linen_jacket_1794217084028.jpg',
    gallery: [
      '/src/assets/images/hero_editorial_campaign_1794217069077.jpg',
      '/src/assets/images/tailored_linen_jacket_1794217084028.jpg'
    ],
    description: 'An architectural minimalist trench engineered from a lightweight wool-tencel drape. Unlined for fluid movement, with raglan sleeves, welt pockets, and a back storm flap.',
    composition: ['60% Merino Wool', '40% Tencel Lyocell'],
    careInstructions: ['Professional dry clean only'],
    isNewArrival: false,
    isBestseller: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 31
  },
  {
    id: 'mn-008',
    name: 'Ribbed Cashmere-Blend V-Neck Cardigan',
    subtitle: 'Mongolian Cashmere · Exaggerated Cuffs',
    category: 'Outerwear & Jackets',
    gender: 'Women',
    price: 3499,
    colors: [
      { name: 'Camel Sand', hex: '#BCA892' },
      { name: 'Chalk White', hex: '#FAF7F0' },
      { name: 'Deep Charcoal', hex: '#333333' }
    ],
    sizes: ['S', 'M', 'L'],
    primaryImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Spun from fine Mongolian cashmere and extra-fine merino wool. Features a deep V-neck, horn button closure, and exaggerated ribbed cuffs for cozy luxury.',
    composition: ['30% Mongolian Cashmere', '70% Extra Fine Merino Wool'],
    careInstructions: ['Hand wash cold in cashmere wash', 'Dry flat on towel'],
    isNewArrival: true,
    isBestseller: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 22
  },
  {
    id: 'mn-009',
    name: 'High-Waisted Wide-Leg Linen Trousers',
    subtitle: 'Front Darts · Sweeping Hem',
    category: 'Trousers & Tailoring',
    gender: 'Women',
    price: 3299,
    colors: [
      { name: 'Soft Ivory', hex: '#ECE7DD' },
      { name: 'Mocha Tan', hex: '#8C7769' },
      { name: 'Onyx Black', hex: '#1F1F1F' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    primaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: '/src/assets/images/women_silk_dress_1794217084262.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      '/src/assets/images/women_silk_dress_1794217084262.jpg'
    ],
    description: 'High-waisted fluid trousers featuring clean front darts, concealed hook-and-eye closure, and sweeping wide legs tailored for fluid movement.',
    composition: ['100% Belgian Flax Linen'],
    careInstructions: ['Machine wash cold gentle cycle', 'Hang to dry'],
    isNewArrival: false,
    isBestseller: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 63
  },
  {
    id: 'mn-010',
    name: 'Oversized Band-Collar Cotton Poplin Shirt',
    subtitle: '80s Two-Ply Poplin · Grandfather Collar',
    category: 'Tops & Shirts',
    gender: 'Women',
    price: 2499,
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Soft Beige', hex: '#EAE2D5' },
      { name: 'Steel Blue', hex: '#6B7A8D' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    primaryImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Crisp 80s two-ply cotton poplin tailored with an architectural grandfather collar, step hem, and extended French cuffs.',
    composition: ['100% Egyptian Giza Cotton Poplin'],
    careInstructions: ['Machine wash 40°C', 'Warm iron'],
    isNewArrival: true,
    isBestseller: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 17
  },
  {
    id: 'mn-011',
    name: '14oz Selvedge Raw Denim Trousers',
    subtitle: 'Shuttle Loom Woven · Unwashed Raw',
    category: 'Trousers & Tailoring',
    gender: 'Men',
    price: 3799,
    colors: [
      { name: 'Indigo Raw', hex: '#1E2A38' },
      { name: 'Vintage Wash', hex: '#586A7A' },
      { name: 'Charcoal Black', hex: '#2B2B2B' }
    ],
    sizes: ['30', '32', '34', '36'],
    primaryImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop'
    ],
    description: '14oz selvedge denim woven on vintage shuttle looms. Unwashed raw finish designed to break in custom to your body over time.',
    composition: ['100% Okayama Selvedge Cotton'],
    careInstructions: ['Wash sparingly inside out cold', 'Hang dry'],
    isNewArrival: false,
    isBestseller: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 47
  },
  {
    id: 'mn-012',
    name: 'Asymmetric Cowl Satin Slip Top',
    subtitle: 'Silk Satin Blend · Adjustable Straps',
    category: 'Tops & Shirts',
    gender: 'Women',
    price: 1899,
    colors: [
      { name: 'Warm Ivory', hex: '#F5F0E6' },
      { name: 'Midnight Charcoal', hex: '#212121' },
      { name: 'Champagne', hex: '#E5D6C4' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    primaryImage: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: '/src/assets/images/women_silk_dress_1794217084262.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000&auto=format&fit=crop',
      '/src/assets/images/women_silk_dress_1794217084262.jpg'
    ],
    description: 'Lightweight silk satin slip top featuring an angled cowl neckline and delicate adjustable shoulder straps. Perfect for versatile layering.',
    composition: ['70% Mulberry Silk', '30% Rayon Satin'],
    careInstructions: ['Hand wash cold', 'Iron low reverse'],
    isNewArrival: true,
    isBestseller: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 25
  }
];
