/* =============================================================
   Elite Butchery — DEFAULT DATA (seed / source of truth)
   -------------------------------------------------------------
   Edited live from the Admin panel (localStorage). Use the admin
   "Export for deploy" button to regenerate this file and publish.

   Prices are Kenyan Shillings (KES). unit "kg" = per kilogram (weight
   steppers in 0.5 kg); unit "each" = per piece/bird.
   ============================================================= */
window.BUTCHERY_DEFAULTS = {
  business: {
    name: "Elite Butchery",
    tagline: "Premium cuts, cut to order — fresh meat delivered across Nairobi.",
    location: "Uthiru, Nairobi",
    address: "Uthiru, Nairobi, Kenya",
    phone: "+254 718 509 658",
    whatsapp: "254718509658",          // digits only, country code first, no +
    mpesaTill: "",                     // add your M-Pesa Buy Goods till to show it; blank = hidden
    email: "orders@elitebutchery.co.ke",
    hours: "Open daily: 9:00am – 11:00pm",
    wholesale: "Hotels, butcheries & events — carcass and bulk rates on request.",
    deliveryNote: "Free delivery available · Pay on delivery",
    deliveryFee: 0,                    // KES flat delivery fee (0 = free)
    freeDeliveryThreshold: 0,          // KES subtotal for free delivery (0 = always free)
    estYear: "2023"
  },

  /* Admin PIN (client-side gate — change it; see README security note). */
  adminPin: "1234",

  /* Catalog. price = KES. unit "kg" or "each". step/min in that unit. */
  products: [
    /* ---------------- BEEF ---------------- */
    { id: "beef",           name: "Beef",              swahili: "Nyama ya ng'ombe", category: "Beef",    art: "beef",  img: "assets/img/beef-bone-in.jpg",  unit: "kg", price: 800,  step: 0.5, min: 0.5, available: true, tag: "Popular",
      desc: "Freshly cut quality beef — ideal for stews, wet fry and hearty family meals." },
    { id: "beef-mince",     name: "Minced Meat",       swahili: "Kima",             category: "Beef",    art: "mince", img: "assets/img/beef-mince.jpg",    unit: "kg", price: 880,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Freshly ground lean beef for keema, burgers, samosas, bolognese and more." },
    { id: "soup-bones",     name: "Soup Bones",        swahili: "Mifupa",           category: "Beef",    art: "beef",  img: "",                             unit: "kg", price: 250,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Meaty beef bones for rich, nourishing soups and broths." },
    { id: "t-bone",         name: "T-Bone Steak",      swahili: "",                 category: "Beef",    art: "steak", img: "",                             unit: "kg", price: 980,  step: 0.5, min: 0.5, available: true, tag: "Steakhouse",
      desc: "Classic bone-in steak — tenderloin one side, strip the other. Built for the grill." },
    { id: "ribeye",         name: "Ribeye Steak",      swahili: "",                 category: "Beef",    art: "steak", img: "assets/img/ribeye.jpg",        unit: "kg", price: 980,  step: 0.5, min: 0.5, available: true, tag: "Steakhouse",
      desc: "Beautifully marbled and full-flavoured — the classic steak for grilling or pan-searing." },
    { id: "beef-fillet",    name: "Beef Fillet",       swahili: "",                 category: "Beef",    art: "steak", img: "",                             unit: "kg", price: 1500, step: 0.5, min: 0.5, available: true, tag: "Premium",
      desc: "The most tender cut of all — lean, boneless and buttery. Ideal for fillet steaks and roasts." },

    /* ---------------- GOAT ---------------- */
    { id: "goat-leg",       name: "Goat Leg",          swahili: "Mbuzi — mguu",     category: "Goat",    art: "goat",  img: "assets/img/goat-leg.jpg",      unit: "kg", price: 950,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Whole goat leg — lean and tender, perfect for roasting or slow-cooked stews." },
    { id: "goat-shoulder",  name: "Goat Shoulder",     swahili: "Mbuzi — bega",     category: "Goat",    art: "goat",  img: "assets/img/goat-shoulder.jpg", unit: "kg", price: 950,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Rich, well-marbled shoulder — ideal for braising, curries and wet fry." },
    { id: "goat-ribs",      name: "Goat Ribs",         swahili: "Mbuzi — mbavu",    category: "Goat",    art: "goat",  img: "assets/img/goat-ribs.jpg",     unit: "kg", price: 800,  step: 0.5, min: 0.5, available: true, tag: "Choma favourite",
      desc: "Meaty goat ribs — the choma classic, best over an open flame." },

    /* ---------------- CHICKEN ---------------- */
    { id: "chicken-kienyeji", name: "Kuku Kienyeji",   swahili: "Indigenous chicken", category: "Chicken", art: "chicken", img: "assets/img/chicken-kienyeji.jpg", unit: "kg",  price: 980, step: 0.5, min: 1, available: true, tag: "Free-range",
      desc: "Free-range indigenous chicken — leaner, richer flavour, traditionally raised." },
    { id: "capon",          name: "Capon",             swahili: "",                 category: "Chicken", art: "chicken", img: "assets/img/chicken-broiler.jpg", unit: "each", price: 600, step: 1, min: 1, available: true, tag: "", priceNote: "KSh 300 per half",
      desc: "Plump, tender whole capon — a richer, meatier bird. Sold whole (KSh 600) or half (KSh 300)." },
    { id: "chicken-boneless", name: "Boneless Chicken", swahili: "",                category: "Chicken", art: "chicken", img: "assets/img/chicken-boneless.jpg", unit: "kg", price: 880,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Skinless, boneless chicken fillets — quick to cook and perfect for any recipe." },
    { id: "chicken-thighs", name: "Chicken Thighs",    swahili: "",                 category: "Chicken", art: "chicken", img: "",                            unit: "kg", price: 830,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Juicy bone-in thighs — full of flavour for frying, roasting and stews." },
    { id: "drumsticks",     name: "Chicken Drumsticks", swahili: "",                category: "Chicken", art: "chicken", img: "assets/img/drumsticks.jpg",   unit: "kg", price: 780,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "A family favourite — bone-in drumsticks for frying, roasting and stews." },
    { id: "chicken-wings",  name: "Chicken Wings",     swahili: "",                 category: "Chicken", art: "chicken", img: "",                            unit: "kg", price: 750,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Fresh chicken wings — perfect for grilling, frying and party platters." },

    /* ---------------- OFFAL ---------------- */
    { id: "liver",          name: "Liver",             swahili: "Maini",            category: "Offal",   art: "offal", img: "assets/img/liver.jpg",         unit: "kg", price: 850,  step: 0.5, min: 0.5, available: true, tag: "",
      desc: "Fresh, iron-rich liver — pan-fry with onions or add to a hearty stew." }
  ]
};
