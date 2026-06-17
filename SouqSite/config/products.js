// ─────────────────────────────────────────────────────────────────
//  PRODUCTS DATA
//  Edit this file to add, remove, or update products.
//  V2 will load this from a live database via API fetch().
//
//  Fields:
//    id          — unique number, do not repeat
//    name        — Arabic product name
//    nameEn      — English product name
//    price       — display string, e.g. "45 SAR"  (omit to hide)
//    category    — used by the filter bar on the products page
//    image       — URL or local path: "assets/images/products/item1.jpg"
//    description — Arabic short description
//    descriptionEn — English short description
//    featured    — true = appears in homepage grid (max 3 shown)
// ─────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "عود كمبودي فاخر",
    nameEn: "Premium Cambodian Oud",
    price: "350 SAR",
    category: "oud",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    description: "عود كمبودي طبيعي ١٠٠٪ بعمر ٣٠ سنة، ذو رائحة دافئة وعميقة.",
    descriptionEn: "100% natural Cambodian agarwood aged 30 years. Deep, warm, and long-lasting.",
    featured: true
  },
  {
    id: 2,
    name: "عطر العود الملكي",
    nameEn: "Royal Oud Perfume",
    price: "180 SAR",
    category: "perfume",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
    description: "عطر فاخر مستوحى من روائح الشرق، يدوم ١٢ ساعة.",
    descriptionEn: "A luxurious oriental fragrance that lasts up to 12 hours.",
    featured: true
  },
  {
    id: 3,
    name: "بخور العود المميز",
    nameEn: "Signature Oud Incense",
    price: "95 SAR",
    category: "bakhoor",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80",
    description: "بخور يعطي عبقاً راقياً يملأ المجالس بأريج العود الأصيل.",
    descriptionEn: "Premium bakhoor that fills your space with authentic oud fragrance.",
    featured: true
  },
  {
    id: 4,
    name: "ماء الورد الطبيعي",
    nameEn: "Pure Rose Water",
    price: "35 SAR",
    category: "oils",
    image: "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=600&q=80",
    description: "ماء ورد طبيعي معطّر، مناسب للبشرة والطبخ.",
    descriptionEn: "Natural rose water, ideal for skin care and cooking.",
    featured: false
  },
  {
    id: 5,
    name: "زيت العود النقي",
    nameEn: "Pure Oud Oil",
    price: "220 SAR",
    category: "oils",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80",
    description: "زيت عود صافٍ بنسبة ١٠٠٪ بدون إضافات.",
    descriptionEn: "100% pure oud oil, undiluted — applied directly to skin.",
    featured: false
  },
  {
    id: 6,
    name: "مسبحة كهرمان",
    nameEn: "Amber Prayer Beads",
    price: "120 SAR",
    category: "gifts",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    description: "مسبحة كهرمان طبيعية صناعة يدوية بخيط حرير.",
    descriptionEn: "Handcrafted natural amber prayer beads on a silk cord.",
    featured: false
  },
  {
    id: 7,
    name: "صندوق هدايا العود",
    nameEn: "Oud Gift Box",
    price: "280 SAR",
    category: "gifts",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&q=80",
    description: "صندوق هدايا فاخر يحتوي على عود وعطر وبخور.",
    descriptionEn: "Luxury gift box containing oud chips, perfume, and bakhoor.",
    featured: false
  },
  {
    id: 8,
    name: "البخور الهندي الأصيل",
    nameEn: "Authentic Indian Bakhoor",
    price: "75 SAR",
    category: "bakhoor",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    description: "بخور هندي طبيعي ذو رائحة شرقية دافئة وطويلة الأمد.",
    descriptionEn: "Natural Indian bakhoor with a warm, lasting oriental scent.",
    featured: false
  }
];
