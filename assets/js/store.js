/* =============================================================
   Elite Butchery — SHARED STORE
   Currency (KES), persistence, cart, icons, export helpers.
   localStorage is the "live" store shared by the storefront and
   the admin panel on this browser/device.
   ============================================================= */
(function (w) {
  "use strict";

  var KEY = {
    products: "butchery_products_v1",
    business: "butchery_business_v1",
    cart:     "butchery_cart_v1",
    pin:      "butchery_pin_v1",
    theme:    "butchery_theme_v1",
    updated:  "butchery_updated_v1"
  };

  var DEF = w.BUTCHERY_DEFAULTS || { business: {}, products: [], adminPin: "1234" };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function read(key, fallback) {
    try { var v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); }
    catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  /* ---------- currency (Kenyan Shilling) ---------- */
  function format(n) {
    var v = Math.round(Number(n) || 0);
    return "KSh " + v.toLocaleString("en-KE");
  }
  function formatKg(kg) {
    var n = Number(kg) || 0;
    // show up to 2 decimals but trim trailing zeros: 1, 1.5, 0.75
    return (Math.round(n * 100) / 100).toString() + " kg";
  }

  /* ---------- business settings ---------- */
  function getBusiness() {
    var stored = read(KEY.business, null);
    return Object.assign({}, clone(DEF.business), stored || {});
  }
  function saveBusiness(obj) {
    write(KEY.business, obj);
    write(KEY.updated, Date.now());
  }

  /* ---------- products ---------- */
  function getProducts() {
    var stored = read(KEY.products, null);
    return stored ? stored : clone(DEF.products);
  }
  function saveProducts(arr) {
    write(KEY.products, arr);
    write(KEY.updated, Date.now());
  }
  function productById(id) {
    var all = getProducts();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }
  function lastUpdated() { return read(KEY.updated, null); }

  /* ---------- admin PIN (client-side only) ---------- */
  function getPin() { return read(KEY.pin, DEF.adminPin || "1234"); }
  function setPin(p) { write(KEY.pin, String(p)); }

  /* ---------- theme ---------- */
  function getTheme() { return read(KEY.theme, null); }
  function setTheme(t) { write(KEY.theme, t); }
  function applyTheme(t) {
    var el = document.documentElement;
    if (t === "light" || t === "dark") { el.setAttribute("data-theme", t); }
    else { el.removeAttribute("data-theme"); }
  }

  /* ---------- cart : { id: kilograms } ---------- */
  function getCart() { return read(KEY.cart, {}) || {}; }
  function saveCart(c) { write(KEY.cart, c); }
  function cartAdd(id, kg) {
    var c = getCart();
    c[id] = Math.round(((c[id] || 0) + Number(kg)) * 100) / 100;
    if (c[id] <= 0) delete c[id];
    saveCart(c); return c;
  }
  function cartSet(id, kg) {
    var c = getCart();
    kg = Math.round(Number(kg) * 100) / 100;
    if (kg <= 0) delete c[id]; else c[id] = kg;
    saveCart(c); return c;
  }
  function cartClear() { saveCart({}); }
  function cartCount() {
    var c = getCart(), n = 0;
    for (var k in c) if (c.hasOwnProperty(k)) n++;
    return n;
  }
  function cartSubtotal() {
    var c = getCart(), sum = 0;
    for (var id in c) if (c.hasOwnProperty(id)) {
      var p = productById(id);
      if (p) sum += p.price * c[id];
    }
    return sum;
  }
  function deliveryFor(subtotal) {
    var b = getBusiness();
    if (subtotal <= 0) return 0;
    if (subtotal >= Number(b.freeDeliveryThreshold || Infinity)) return 0;
    return Number(b.deliveryFee || 0);
  }

  /* ---------- product art (inline SVG, currentColor) ---------- */
  var ICONS = {
    beef:    '<svg viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6c14-4 34 0 38 12s-8 24-28 24S2 34 6 22 12 8 20 6Z"/><path d="M40 18c-3 3-3 8 0 11M30 16c-4 4-4 12 0 16" opacity=".55"/></svg>',
    goat:    '<svg viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c14-3 30 2 30 14s-14 16-26 14S8 34 12 22a13 13 0 0 1 10-12Z"/><path d="M22 10c-4-4-12-3-14 2s2 9 7 9"/></svg>',
    pork:    '<svg viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="12" width="48" height="24" rx="8"/><path d="M8 20h48M8 28h48" opacity=".5"/></svg>',
    chicken: '<svg viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M42 8a13 13 0 0 0-20 16l-9 9a5 5 0 0 0 7 7l9-9A13 13 0 0 0 42 8Z"/><path d="m14 34-5 2 2 5"/></svg>',
    mince:   '<svg viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 30h44v2a10 10 0 0 1-10 10H20a10 10 0 0 1-10-10Z"/><path d="M14 30c0-8 8-12 18-12s18 4 18 12"/><path d="M24 20l3-4M34 19l3-5M43 21l3-4" opacity=".7"/></svg>',
    offal:   '<svg viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M32 8c8 0 12 5 12 11 0 5-4 8-4 13a8 8 0 0 1-16 0c0-5-4-8-4-13C20 13 24 8 32 8Z"/><path d="M32 14c3 4 3 9 0 13" opacity=".55"/></svg>',
    steak:   '<svg viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6c14-4 34 0 38 12s-8 24-28 24S2 34 6 22 12 8 20 6Z"/></svg>'
  };
  function icon(name) { return ICONS[name] || ICONS.beef; }

  /* ---------- export current live data back into data.js ---------- */
  function exportDataJs() {
    var out = {
      business: getBusiness(),
      adminPin: getPin(),
      products: getProducts()
    };
    return "/* =============================================================\n" +
           "   Elite Butchery — DEFAULT DATA (source of truth)\n" +
           "   Exported from the Admin panel on " + new Date().toString() + "\n" +
           "   Prices are Kenyan Shillings (KES), per kilogram.\n" +
           "   ============================================================= */\n" +
           "window.BUTCHERY_DEFAULTS = " + JSON.stringify(out, null, 2) + ";\n";
  }

  /* ---------- reset everything to shipped defaults ---------- */
  function resetAll() {
    [KEY.products, KEY.business, KEY.pin, KEY.updated].forEach(function (k) {
      try { localStorage.removeItem(k); } catch (e) {}
    });
  }

  w.Store = {
    KEY: KEY,
    defaults: DEF,
    format: format, formatKg: formatKg,
    getBusiness: getBusiness, saveBusiness: saveBusiness,
    getProducts: getProducts, saveProducts: saveProducts, productById: productById, lastUpdated: lastUpdated,
    getPin: getPin, setPin: setPin,
    getTheme: getTheme, setTheme: setTheme, applyTheme: applyTheme,
    getCart: getCart, cartAdd: cartAdd, cartSet: cartSet, cartClear: cartClear,
    cartCount: cartCount, cartSubtotal: cartSubtotal, deliveryFor: deliveryFor,
    icon: icon, exportDataJs: exportDataJs, resetAll: resetAll
  };

  /* apply saved theme immediately to avoid flash */
  applyTheme(getTheme());
})(window);
