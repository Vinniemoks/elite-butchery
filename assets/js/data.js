/* =============================================================
   Elite Butchery — DEFAULT DATA (seed / source of truth)
   -------------------------------------------------------------
   Edited live from the Admin panel (localStorage). Use the admin
   "Export for deploy" button to regenerate this file and publish.

   All prices are Kenyan Shillings (KES) and quoted PER KILOGRAM.
   ============================================================= */
window.BUTCHERY_DEFAULTS = {
  business: {
    name: "Elite Butchery",
    tagline: "Premium cuts, quality assured — fresh meat cut to order and delivered across Nairobi.",
    location: "Uthiru, Nairobi",
    address: "Uthiru, Nairobi, Kenya",
    phone: "+254 718 509 658",
    whatsapp: "254718509658",          // digits only, country code first, no +
    mpesaTill: "",                     // add your M-Pesa Buy Goods till to show it; blank = hidden
    email: "orders@elitebutchery.co.ke",
    hours: "Open daily: 9:00am – 10:00pm",
    deliveryNote: "Free delivery available across the neighbourhood · Pay on delivery",
    deliveryFee: 0,                    // KES flat delivery fee (0 = free)
    freeDeliveryThreshold: 0,          // KES subtotal for free delivery (0 = always free)
    estYear: "2023"
  },

  /* Admin PIN (client-side gate — change it; see README security note). */
  adminPin: "1234",

  /* Catalog. price = KES per kg. step/min in kg. category groups the shop. */
  products: [
    /* ---------------- BEEF ---------------- */
    { id: "beef",          name: "Beef",                 swahili: "Nyama ya ng'ombe", category: "Beef",         art: "beef",  img: "assets/img/beef-bone-in.jpg",  price: 800,  step: 0.5, min: 0.5, available: true, tag: "Popular",
      desc: "Freshly cut quality beef, bone-in — ideal for stews, wet fry and hearty family meals." },
    { id: "beef-mince",    name: "Minced Meat",          swahili: "Kima",             category: "Beef",         art: "mince", img: "assets/img/beef-mince.jpg",    price: 870,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Freshly ground lean beef for keema, burgers, samosas, bolognese and more." },
    { id: "beef-chuck",    name: "Beef Chuck",           swahili: "",                 category: "Beef",         art: "beef",  img: "assets/img/beef-shank.jpg",    price: 800,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Well-marbled shoulder cut — rich and tender, perfect for slow braises and stews." },
    { id: "beef-fillet",   name: "Beef Fillet",          swahili: "",                 category: "Beef",         art: "steak", img: "",                             price: 1500, step: 0.5, min: 0.5, available: true, tag: "Premium",
      desc: "The most tender cut of all — lean, boneless and buttery. Ideal for fillet steaks and roasts." },
    { id: "t-bone",        name: "T-Bone Steak",         swahili: "",                 category: "Beef",         art: "steak", img: "",                             price: 980,  step: 0.5, min: 0.5, available: true, tag: "Steakhouse",
      desc: "Classic bone-in steak with tenderloin on one side and strip on the other. Built for the grill." },
    { id: "ribeye",        name: "Ribeye Steak",         swahili: "",                 category: "Beef",         art: "steak", img: "assets/img/beef-boneless.jpg", price: 980,  step: 0.5, min: 0.5, available: true, tag: "Steakhouse",
      desc: "Beautifully marbled and full-flavoured — the classic steak for grilling or pan-searing." },
    { id: "aged-steak",    name: "Dry-Aged T-Bone / Ribeye", swahili: "",             category: "Beef",         art: "steak", img: "",                             price: 1400, step: 0.5, min: 0.5, available: true, tag: "Dry-aged",
      desc: "Dry-aged for deeper flavour and tenderness — our premium steakhouse selection, cut to order." },

    /* ---------------- GOAT & LAMB ---------------- */
    { id: "goat",          name: "Goat Meat",            swahili: "Mbuzi",            category: "Goat & Lamb",  art: "goat",  img: "assets/img/goat.jpg",          price: 900,  step: 0.5, min: 0.5, available: true, tag: "Choma favourite",
      desc: "Tender goat meat, expertly portioned — the star of any nyama choma." },
    { id: "mutton",        name: "Mutton",               swahili: "Kondoo",           category: "Goat & Lamb",  art: "goat",  img: "assets/img/mutton.jpg",        price: 820,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Rich, flavourful mutton on the bone — excellent for slow-cooked stews and curries." },

    /* ---------------- PORK ---------------- */
    { id: "pork",          name: "Pork",                 swahili: "Nguruwe",          category: "Pork",         art: "pork",  img: "assets/img/pork.jpg",          price: 560,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Fresh pork cuts, great for roasting, choma and pan-frying to crackling perfection." },

    /* ---------------- CHICKEN ---------------- */
    { id: "chicken-kienyeji", name: "Kienyeji Chicken",  swahili: "Kuku wa kienyeji", category: "Chicken",      art: "chicken", img: "assets/img/chicken-kienyeji.jpg", price: 980, step: 0.5, min: 1, available: true, tag: "Free-range",
      desc: "Free-range indigenous chicken — leaner, richer flavour, traditionally raised." },
    { id: "chicken-broiler", name: "Broiler Chicken — Whole", swahili: "Kuku wa broiler", category: "Chicken",  art: "chicken", img: "assets/img/chicken-broiler.jpg", price: 550, step: 0.5, min: 1, available: true, tag: "",
      desc: "Whole cleaned broiler chicken, fresh daily — ready for roasting, frying or stew." },
    { id: "chicken-boneless", name: "Boneless Chicken",  swahili: "",                 category: "Chicken",      art: "chicken", img: "",                            price: 880,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Skinless, boneless chicken fillets — quick to cook and perfect for any recipe." },
    { id: "drumsticks",    name: "Chicken Drumsticks",   swahili: "",                 category: "Chicken",      art: "chicken", img: "",                            price: 780,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Juicy bone-in drumsticks — a family favourite for frying, roasting and stews." },
    { id: "chicken-wings", name: "Chicken Wings",        swahili: "",                 category: "Chicken",      art: "chicken", img: "",                            price: 750,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Fresh chicken wings — perfect for grilling, frying and party platters." },
    { id: "capons",        name: "Capons",               swahili: "",                 category: "Chicken",      art: "chicken", img: "",                            price: 550,  step: 0.5, min: 1,   available: true, tag: "",
      desc: "Plump, tender capon — a richer, meatier bird for a special roast." },

    /* ---------------- OFFAL ---------------- */
    { id: "liver",         name: "Liver",                swahili: "Maini",            category: "Offal",        art: "offal", img: "assets/img/liver.jpg",         price: 800,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Fresh, iron-rich liver — pan-fry with onions or add to a hearty stew." },
    { id: "matumbo",       name: "Matumbo (Tripe)",      swahili: "Matumbo",          category: "Offal",        art: "offal", img: "assets/img/matumbo.jpg",       price: 400,  step: 0.5, min: 0.5, available: true, tag: "Budget",
      desc: "Cleaned tripe, a Kenyan classic — slow-cook into a soft, savoury delicacy." }
  ]
};
