/* =============================================================
   Elite Butchery — STOREFRONT
   ============================================================= */
(function () {
  "use strict";
  var S = window.Store;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- bind business settings into the page ---- */
  function bindBusiness() {
    var b = S.getBusiness();
    $$("[data-biz]").forEach(function (el) {
      var key = el.getAttribute("data-biz");
      if (b[key] != null && b[key] !== "") el.textContent = b[key];
    });
    $$("[data-biz-link]").forEach(function (el) {
      var key = el.getAttribute("data-biz-link");
      if (key === "phone") { el.textContent = b.phone; el.href = "tel:" + (b.phone || "").replace(/[^\d+]/g, ""); }
      if (key === "email") { el.textContent = b.email; el.href = "mailto:" + b.email; }
    });
    document.title = b.name + " — Fresh Meat Delivery in " + b.location;
    var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
    // M-Pesa block only shows when a till is set
    var mp = $("#mpesaBlock");
    if (mp) { if (b.mpesaTill) { mp.hidden = false; } else { mp.hidden = true; } }
    // last updated
    var u = S.lastUpdated(), up = $("#updated");
    if (up) up.textContent = u ? "Prices updated " + new Date(u).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" }) : "";
  }

  /* ---- group products by category, preserving first-seen order ---- */
  function grouped() {
    var products = S.getProducts(), order = [], groups = {};
    products.forEach(function (p) {
      var c = p.category || "Other";
      if (!groups[c]) { groups[c] = []; order.push(c); }
      groups[c].push(p);
    });
    return { order: order, groups: groups };
  }

  function cardHtml(p) {
    var out = p.available === false;
    var step = p.step || 0.5, min = p.min || 0.5;
    return '<article class="card reveal' + (out ? ' out' : '') + '">'
      + '<div class="art">'
      +   (p.tag ? '<span class="tagchip">' + esc(p.tag) + '</span>' : '')
      +   (out ? '<span class="outchip">Out of stock</span>' : '')
      +   S.icon(p.art)
      +   (p.img ? '<img class="art-photo" src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy" onerror="this.remove()" />' : '')
      + '</div>'
      + '<div class="body">'
      +   '<div class="top"><div><h3>' + esc(p.name) + '</h3>' + (p.swahili ? '<span class="sw">' + esc(p.swahili) + '</span>' : '') + '</div>'
      +     '<span class="price num">' + S.format(p.price) + '<small>' + unitLabel(p) + (p.priceNote ? ' · ' + esc(p.priceNote) : '') + '</small></span></div>'
      +   '<p class="desc">' + esc(p.desc || "") + '</p>'
      +   (out ? '<button class="btn btn--ghost btn--block" disabled>Unavailable</button>'
            : '<div class="buy">'
              + '<div class="stepper" role="group" aria-label="Quantity for ' + esc(p.name) + '">'
              +   '<button type="button" data-step="' + p.id + '" data-d="-1" aria-label="Less">−</button>'
              +   '<span class="val num" data-val="' + p.id + '" data-step-kg="' + step + '" data-min-kg="' + min + '" data-unit="' + (p.unit || "kg") + '">' + qtyText(p, min) + '</span>'
              +   '<button type="button" data-step="' + p.id + '" data-d="1" aria-label="More">+</button>'
              + '</div>'
              + '<button class="btn" data-add="' + p.id + '">Add</button>'
            + '</div>')
      + '</div></article>';
  }

  /* ---- render shop (grouped by category) ---- */
  var grid = $("#shopGrid");
  function renderShop() {
    var g = grouped();
    grid.innerHTML = g.order.map(function (cat) {
      return '<div class="cat-group reveal">'
        + '<h3 class="cat-head">' + esc(cat) + '</h3>'
        + '<div class="cat-grid">' + g.groups[cat].map(cardHtml).join("") + '</div>'
        + '</div>';
    }).join("");
    observeReveal();
  }

  /* ---- render printable price list ---- */
  function renderPriceList() {
    var el = $("#priceList"); if (!el) return;
    var g = grouped();
    el.innerHTML = g.order.map(function (cat) {
      var rows = g.groups[cat].map(function (p) {
        var note = p.priceNote ? ' <span>· ' + esc(p.priceNote) + '</span>' : '';
        return '<tr' + (p.available === false ? ' class="pl-out"' : '') + '>'
          + '<td class="pl-name">' + esc(p.name) + (p.swahili ? ' <span>(' + esc(p.swahili) + ')</span>' : '') + note + '</td>'
          + '<td class="pl-price num">' + S.format(p.price) + (isEach(p) ? ' <em>each</em>' : ' <em>/kg</em>') + (p.available === false ? ' <em>· out</em>' : '') + '</td>'
          + '</tr>';
      }).join("");
      return '<div class="pl-group"><table class="pricelist"><caption>' + esc(cat) + '</caption>'
        + '<thead><tr><th>Cut</th><th>Price / kg</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
    }).join("");
  }

  function fmtKg(n) { return (Math.round(n * 100) / 100) + " kg"; }
  function isEach(p) { return p && p.unit === "each"; }
  function unitLabel(p) { return isEach(p) ? "each" : "per kg"; }
  function qtyText(p, n) { n = Math.round(n * 100) / 100; return isEach(p) ? (n + (n === 1 ? " pc" : " pcs")) : (n + " kg"); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* stepper + add (delegated) */
  grid.addEventListener("click", function (e) {
    var step = e.target.closest("[data-step]");
    if (step) {
      var val = grid.querySelector('[data-val="' + step.dataset.step + '"]');
      var stepKg = parseFloat(val.dataset.stepKg), minKg = parseFloat(val.dataset.minKg);
      var cur = parseFloat(val.textContent);
      var next = Math.max(minKg, Math.round((cur + stepKg * parseInt(step.dataset.d, 10)) * 100) / 100);
      val.textContent = (val.dataset.unit === "each") ? (next + (next === 1 ? " pc" : " pcs")) : fmtKg(next);
      return;
    }
    var add = e.target.closest("[data-add]");
    if (add) {
      var id = add.dataset.add;
      var kg = parseFloat(grid.querySelector('[data-val="' + id + '"]').textContent);
      var p = S.productById(id);
      S.cartAdd(id, kg);
      render();
      toast(p.name + " · " + qtyText(p, kg) + " added");
    }
  });

  /* ---- cart rendering ---- */
  var cartCount = $("#cartCount"), cartBtn = $("#cartOpen");
  function render() {
    var cart = S.getCart();
    var ids = Object.keys(cart);
    cartCount.textContent = ids.length;
    cartBtn.classList.toggle("has", ids.length > 0);

    var items = $("#ditems");
    if (!ids.length) {
      items.innerHTML = '<div class="dempty">'
        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.5 12.5A2 2 0 0 0 9.5 17H18a2 2 0 0 0 2-1.6L21.5 8H6"/></svg>'
        + 'Your order is empty.<br>Add a cut from the counter to begin.</div>';
    } else {
      items.innerHTML = ids.map(function (id) {
        var p = S.productById(id); if (!p) return "";
        var kg = cart[id], step = p.step || 0.5;
        return '<div class="ditem">'
          + '<div class="di-art">' + S.icon(p.art) + (p.img ? '<img class="art-photo" src="' + esc(p.img) + '" alt="" loading="lazy" onerror="this.remove()" />' : '') + '</div>'
          + '<div class="di-mid"><b>' + esc(p.name) + '</b>'
          +   '<span class="di-price num">' + S.format(p.price) + (isEach(p) ? ' each' : ' / kg') + '</span>'
          +   '<div class="di-controls">'
          +     '<button class="qbtn" data-cq="' + id + '" data-d="-' + step + '" aria-label="Less">−</button>'
          +     '<span class="qn num">' + qtyText(p, kg) + '</span>'
          +     '<button class="qbtn" data-cq="' + id + '" data-d="' + step + '" aria-label="More">+</button>'
          +   '</div>'
          + '</div>'
          + '<div style="text-align:right"><span class="di-line num">' + S.format(p.price * kg) + '</span>'
          +   '<br><button class="rm" data-rm="' + id + '">remove</button></div>'
          + '</div>';
      }).join("");
    }

    var sub = S.cartSubtotal();
    var b = S.getBusiness();
    var del = S.deliveryFor(sub);
    $("#subtotal").textContent = S.format(sub);
    $("#delivery").textContent = sub === 0 ? "—" : (del === 0 ? "FREE" : S.format(del));
    $("#delivery").style.color = (del === 0 && sub > 0) ? "var(--good)" : "";
    $("#total").textContent = S.format(sub + del);
    $("#checkout").disabled = sub === 0;

    var pay = b.mpesaTill ? "Pay on delivery or via M-Pesa Till " + b.mpesaTill + "." : "Pay on delivery.";
    var hint = $("#dhint");
    if (sub === 0) hint.textContent = "Add cuts to start your order.";
    else if (del === 0) hint.textContent = "Free delivery available. " + pay;
    else {
      var rem = Number(b.freeDeliveryThreshold) - sub;
      hint.textContent = rem > 0 ? "Add " + S.format(rem) + " more for free delivery." : pay;
    }
  }

  $("#ditems").addEventListener("click", function (e) {
    var q = e.target.closest("[data-cq]");
    if (q) { S.cartAdd(q.dataset.cq, parseFloat(q.dataset.d)); render(); return; }
    var rm = e.target.closest("[data-rm]");
    if (rm) { S.cartSet(rm.dataset.rm, 0); render(); }
  });

  /* ---- WhatsApp checkout ---- */
  $("#checkout").addEventListener("click", function () {
    var b = S.getBusiness(), cart = S.getCart(), ids = Object.keys(cart);
    if (!ids.length) return;
    var lines = ids.map(function (id) {
      var p = S.productById(id);
      return "• " + p.name + " — " + qtyText(p, cart[id]) + " @ " + S.format(p.price) + (isEach(p) ? "/ea" : "/kg") + " = " + S.format(p.price * cart[id]);
    });
    var sub = S.cartSubtotal(), del = S.deliveryFor(sub);
    var msg = "Hello " + b.name + ", I would like to order:\n\n"
      + lines.join("\n")
      + "\n\nSubtotal: " + S.format(sub)
      + "\nDelivery: " + (del === 0 ? "FREE" : S.format(del))
      + "\nTotal: " + S.format(sub + del)
      + "\nPayment: " + (b.mpesaTill ? "Pay on delivery or M-Pesa Till " + b.mpesaTill : "Pay on delivery")
      + "\n\nName:\nDelivery location:\nPreferred time:";
    var num = (b.whatsapp || "").replace(/[^\d]/g, "");
    var url = "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank", "noopener");
    toast("Opening WhatsApp with your order…");
  });

  /* ---- drawer ---- */
  var drawer = $("#drawer"), scrim = $("#scrim"), lastFocus = null;
  function openCart() { lastFocus = document.activeElement; drawer.classList.add("open"); scrim.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); $("#cartClose").focus(); }
  function closeCart() { drawer.classList.remove("open"); scrim.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); if (lastFocus) lastFocus.focus(); }
  cartBtn.addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  scrim.addEventListener("click", closeCart);

  /* ---- mobile nav ---- */
  var nav = $("#nav"), mt = $("#menuToggle");
  mt.addEventListener("click", function () { var o = nav.classList.toggle("open"); mt.setAttribute("aria-expanded", o); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) { nav.classList.remove("open"); mt.setAttribute("aria-expanded", "false"); } });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { if (drawer.classList.contains("open")) closeCart(); nav.classList.remove("open"); } });

  /* ---- theme toggle ---- */
  var tt = $("#themeToggle");
  tt.addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches;
    var next;
    if (!cur) next = prefersDark ? "light" : "dark";
    else next = cur === "dark" ? "light" : "dark";
    S.setTheme(next); S.applyTheme(next);
  });

  /* ---- contact form ---- */
  var form = $("#contactForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    var checks = [
      ["cf-name", function (v) { return v.trim().length > 0; }],
      ["cf-phone", function (v) { return v.replace(/[^\d]/g, "").length >= 9; }],
      ["cf-msg", function (v) { return v.trim().length > 0; }]
    ];
    checks.forEach(function (c) {
      var el = $("#" + c[0]), field = el.closest(".field"), valid = c[1](el.value);
      field.classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });
    if (ok) {
      form.querySelector("button[type=submit]").style.display = "none";
      form.querySelector(".formnote").style.display = "none";
      $("#formSuccess").classList.add("show");
      form.reset();
    }
  });
  form.addEventListener("input", function (e) { var f = e.target.closest(".field"); if (f) f.classList.remove("invalid"); });

  /* ---- toast ---- */
  var toastEl = $("#toast"), toastMsg = $("#toastMsg"), toastT;
  function toast(msg) { toastMsg.textContent = msg; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2600); }

  /* ---- reveal ---- */
  var io = null;
  function observeReveal() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); return; }
    if (!io) io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal:not(.in)").forEach(function (el) { io.observe(el); });
  }

  /* ---- print price list ---- */
  var printBtn = $("#printPrices");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  /* ---- init ---- */
  bindBusiness();
  renderShop();
  renderPriceList();
  render();
  observeReveal();

  // reflect admin edits made in another tab
  window.addEventListener("storage", function (e) {
    if (e.key && e.key.indexOf("butchery_") === 0) { bindBusiness(); renderShop(); renderPriceList(); render(); }
  });
})();
