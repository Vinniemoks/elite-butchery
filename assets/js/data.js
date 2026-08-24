/* =============================================================
   Elite Butchery — DEFAULT DATA (seed / source of truth)
   -------------------------------------------------------------
   This file is the catalog that ships with the repo. The Admin
   panel edits a live copy in the browser (localStorage). When the
   admin clicks "Export for deploy", it produces an updated version
   of THIS file — commit it and every customer sees the new prices.

   All prices are Kenyan Shillings (KES) and quoted PER KILOGRAM.
   ============================================================= */
window.BUTCHERY_DEFAULTS = {
  /* Business settings — all editable from the Admin panel */
  business: {
    name: "Elite Butchery",
    tagline: "Premium cuts, quality assured — fresh nyama delivered across Nairobi.",
    location: "Uthiru, Nairobi",
    address: "Uthiru Shopping Centre, Waiyaki Way, Nairobi, Kenya",
    phone: "+254 700 000 000",
    whatsapp: "254700000000",          // digits only, country code first, no +
    mpesaTill: "000000",               // M-Pesa Buy Goods till number
    email: "orders@elitebutchery.co.ke",
    hours: "Mon–Sat: 7:00am – 8:00pm  ·  Sun: 8:00am – 6:00pm",
    deliveryFee: 200,                  // KES flat delivery fee
    freeDeliveryThreshold: 5000,       // KES subtotal for free delivery
    givebackPercent: 10                // % of profit to the community foundation
  },

  /* Admin PIN (client-side gate — change it, and read the security
     note in README.md before going live). */
  adminPin: "1234",

  /* Product catalog. price = KES per kg. step/min are in kg. */
  products: [
    { id: "beef-bone-in",   name: "Beef — Bone-in",        swahili: "Nyama ya ng'ombe",  category: "Beef",    art: "beef",    img: "assets/img/beef-bone-in.jpg",     price: 620, step: 0.5, min: 0.5, available: true,  tag: "Popular",
      desc: "Freshly cut bone-in beef, ideal for stews, wet fry and hearty family meals." },
    { id: "beef-boneless",  name: "Beef — Boneless",       swahili: "Nyama bila mfupa",  category: "Beef",    art: "beef",    img: "assets/img/beef-boneless.jpg",    price: 720, step: 0.5, min: 0.5, available: true,  tag: "Premium",
      desc: "Lean, boneless beef trimmed by hand — perfect for steaks, stir-fry and roasts." },
    { id: "beef-mince",     name: "Beef Mince",            swahili: "Kima",              category: "Beef",    art: "mince",   img: "assets/img/beef-mince.jpg",       price: 700, step: 0.5, min: 0.5, available: true,  tag: "Versatile",
      desc: "Freshly ground lean beef for keema, burgers, samosas, bolognese and more." },
    { id: "goat",           name: "Goat Meat",             swahili: "Mbuzi",             category: "Goat",    art: "goat",    img: "assets/img/goat.jpg",             price: 850, step: 0.5, min: 0.5, available: true,  tag: "Choma favourite",
      desc: "Tender goat meat, expertly portioned — the star of any nyama choma." },
    { id: "mutton",         name: "Mutton",                swahili: "Kondoo",            category: "Lamb",    art: "goat",    img: "assets/img/mutton.jpg",           price: 820, step: 0.5, min: 0.5, available: true,  tag: "",
      desc: "Rich, flavourful mutton on the bone — excellent for slow-cooked stews and curries." },
    { id: "pork",           name: "Pork",                  swahili: "Nguruwe",           category: "Pork",    art: "pork",    img: "assets/img/pork.jpg",             price: 560, step: 0.5, min: 0.5, available: true,  tag: "",
      desc: "Fresh pork cuts, great for roasting, choma and pan-frying to crackling perfection." },
    { id: "chicken-broiler",name: "Broiler Chicken — Whole",swahili: "Kuku wa broiler",  category: "Chicken", art: "chicken", img: "assets/img/chicken-broiler.jpg",  price: 550, step: 0.5, min: 1,   available: true,  tag: "",
      desc: "Whole cleaned broiler chicken, fresh daily — ready for roasting, frying or stew." },
    { id: "chicken-kienyeji",name: "Kienyeji Chicken",     swahili: "Kuku wa kienyeji",  category: "Chicken", art: "chicken", img: "assets/img/chicken-kienyeji.jpg", price: 900, step: 0.5, min: 1,   available: true,  tag: "Free-range",
      desc: "Free-range indigenous chicken — leaner, richer flavour, traditionally raised." },
    { id: "matumbo",        name: "Matumbo (Tripe)",       swahili: "Matumbo",           category: "Offal",   art: "offal",   img: "assets/img/matumbo.jpg",          price: 400, step: 0.5, min: 0.5, available: true,  tag: "Budget",
      desc: "Cleaned tripe, a Kenyan classic — slow-cook into a soft, savoury delicacy." }
  ]
};
