// ─────────────────────────────────────────────────────────────────
//  SHOP SETTINGS  (per-shop defaults)
//  These fire before any localStorage preference is set.
//  Override these values when duplicating the template for new shops.
// ─────────────────────────────────────────────────────────────────
const SHOP_SETTINGS = {
  defaultLanguage: 'ar',    // 'ar' | 'en'
  defaultTheme:    'dark',  // 'dark' | 'light'
};

// ─────────────────────────────────────────────────────────────────
//  SHOP CONFIGURATION
//  Edit this file to customize the template for a new shop.
//  V2 will replace this with a database record loaded via API.
// ─────────────────────────────────────────────────────────────────
const SHOP = {

  // ── Identity ──────────────────────────────────────────────────
  name:       "متجر العود",
  nameEn:     "Al Oud Trading",
  tagline:    "عطور وهدايا أصيلة منذ ٢٠٠٥",
  taglineEn:  "Authentic Fragrances & Gifts Since 2005",
  description:
    "نقدم أرقى منتجات العود والعطور والهدايا المختارة بعناية. في قلب مكة المكرمة، نخدمكم بأعلى معايير الجودة والأصالة.",
  descriptionEn:
    "We offer the finest oud, fragrances, and handpicked gifts — curated for those who appreciate quality and tradition. Proudly serving Makkah since 2005.",

  // ── Contact ───────────────────────────────────────────────────
  phone:      "+966 50 000 0000",
  whatsapp:   "966500000000",            // no + or spaces
  instagram:  "@aloud.makkah",
  email:      "",                        // leave empty to hide

  // ── Location ──────────────────────────────────────────────────
  address: {
    en: "Ajyad Street, Al Haram District, Makkah Al-Mukarramah",
    ar: "شارع أجياد، حي الحرام، مكة المكرمة"
  },
  // Simple embed that works without an API key
  mapEmbed: "https://maps.google.com/maps?q=21.4225,39.8262&z=16&output=embed",
  mapDirections: "https://maps.google.com/maps?q=21.4225,39.8262",

  // ── Hours ─────────────────────────────────────────────────────
  // Add *Ar keys for Arabic text; if omitted, the English value shows as fallback.
  hours: {
    weekdays:   "8:00 AM – 11:00 PM",
    weekdaysAr: "٨:٠٠ صباحاً – ١١:٠٠ مساءً",
    weekends:   "Open All Day",
    weekendsAr: "مفتوح طوال اليوم"
  },

  // ── Homepage highlights ───────────────────────────────────────
  highlights: [
    { value: "20+",  label: "Years in Business", labelAr: "سنة من الخبرة" },
    { value: "300+", label: "Products",           labelAr: "منتج متوفر"    },
    { value: "★4.9", label: "Customer Rating",   labelAr: "تقييم العملاء"  }
  ],

  // ── Hero image ────────────────────────────────────────────────
  // Replace with a real local path once you have the shop photo:
  // hero: { image: "assets/images/hero.jpg" }
  hero: {
    image: "https://picsum.photos/seed/ss-hero/1920/1080"
  },

  // ── WhatsApp pre-filled message ───────────────────────────────
  social: {
    whatsappMessage: "Hello! I'd like to know more about your products."
  }
};
