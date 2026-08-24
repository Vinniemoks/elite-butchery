/* =============================================================
   Elite Butchery — ADMIN
   Client-side price/settings manager. PIN gate is a convenience
   lock only (see README for a real backend). All data persists to
   localStorage and can be exported back into assets/js/data.js.
   ============================================================= */
(function () {
  "use strict";
  var S = window.Store;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---- toast ---- */
  var toastEl = $("#toast"), toastMsg = $("#toastMsg"), toastT;
  function toast(msg) { toastMsg.textContent = msg; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2400); }
  function pill(id) { var p = $(id); if (!p) return; p.classList.add("show"); setTimeout(function () { p.classList.remove("show"); }, 1800); }

  /* ---- theme ---- */
  $("#themeToggle").addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches;
    var next = !cur ? (prefersDark ? "light" : "dark") : (cur === "dark" ? "light" : "dark");
    S.setTheme(next); S.applyTheme(next);
  });

  /* ---- login ---- */
  var LOCK = "butchery_admin_unlocked";
  function unlocked() { try { return sessionStorage.getItem(LOCK) === "1"; } catch (e) { return false; } }
  function showDash() {
    $("#login").hidden = true; $("#dash").hidden = false;
    $$("[data-biz]").forEach(function (el) { var b = S.getBusiness(); if (b[el.getAttribute("data-biz")]) el.textContent = b[el.getAttribute("data-biz")]; });
    renderTable(); fillSettings();
  }
  $("#pinForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var val = $("#pin").value.trim();
    if (val === String(S.getPin())) {
      try { sessionStorage.setItem(LOCK, "1"); } catch (er) {}
      $("#loginErr").textContent = ""; showDash();
    } else {
      $("#loginErr").textContent = "Incorrect PIN. Try again.";
      $("#pin").value = ""; $("#pin").focus();
    }
  });
  $("#logout").addEventListener("click", function () { try { sessionStorage.removeItem(LOCK); } catch (e) {} location.reload(); });

  /* ---- working copy of products (edited in memory, saved on demand) ---- */
  var draft = S.getProducts();

  function renderTable() {
    draft = S.getProducts();
    var body = $("#priceBody");
    body.innerHTML = draft.map(function (p, i) {
      return '<tr data-i="' + i + '">'
        + '<td class="pname"><b>' + esc(p.name) + '</b>' + (p.swahili ? '<span>' + esc(p.swahili) + '</span>' : '') + '</td>'
        + '<td>' + esc(p.category || "") + '</td>'
        + '<td><span class="priceinput"><span class="pre">KSh</span><input type="number" min="0" step="10" value="' + Number(p.price) + '" data-price="' + i + '" aria-label="Price for ' + esc(p.name) + '" /><span class="suf">/kg</span></span></td>'
        + '<td><label class="switch"><input type="checkbox" data-avail="' + i + '"' + (p.available === false ? "" : " checked") + ' /><span class="slider"></span></label></td>'
        + '<td><button class="rowdel" data-del="' + i + '">Remove</button></td>'
        + '</tr>';
    }).join("");
  }

  $("#priceBody").addEventListener("input", function (e) {
    var pr = e.target.closest("[data-price]");
    if (pr) { draft[+pr.dataset.price].price = Math.max(0, Number(pr.value) || 0); }
    var av = e.target.closest("[data-avail]");
    if (av) { draft[+av.dataset.avail].available = av.checked; }
  });
  $("#priceBody").addEventListener("click", function (e) {
    var del = e.target.closest("[data-del]");
    if (del) {
      var i = +del.dataset.del;
      if (confirm('Remove "' + draft[i].name + '" from the shop?')) { draft.splice(i, 1); renderDraftKeepEdits(); }
    }
  });
  // re-render from the in-memory draft (not from storage) after add/remove
  function renderDraftKeepEdits() {
    var body = $("#priceBody");
    body.innerHTML = draft.map(function (p, i) {
      return '<tr data-i="' + i + '">'
        + '<td class="pname"><b>' + esc(p.name) + '</b>' + (p.swahili ? '<span>' + esc(p.swahili) + '</span>' : '') + '</td>'
        + '<td>' + esc(p.category || "") + '</td>'
        + '<td><span class="priceinput"><span class="pre">KSh</span><input type="number" min="0" step="10" value="' + Number(p.price) + '" data-price="' + i + '" /><span class="suf">/kg</span></span></td>'
        + '<td><label class="switch"><input type="checkbox" data-avail="' + i + '"' + (p.available === false ? "" : " checked") + ' /><span class="slider"></span></label></td>'
        + '<td><button class="rowdel" data-del="' + i + '">Remove</button></td>'
        + '</tr>';
    }).join("");
  }

  $("#saveProducts").addEventListener("click", function () {
    S.saveProducts(draft);
    pill("#savePill"); toast("Prices saved");
  });

  $("#addProduct").addEventListener("click", function () {
    var name = prompt("Product name (e.g. Beef Sausages):");
    if (!name) return;
    var price = Number(prompt("Price per kg in KES (e.g. 700):")) || 0;
    var id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 5);
    draft.push({ id: id, name: name, swahili: "", category: "Other", art: "beef", price: price, step: 0.5, min: 0.5, available: true, tag: "", desc: "" });
    renderDraftKeepEdits();
    toast('Added "' + name + '" — remember to Save changes');
  });

  /* ---- settings ---- */
  function fillSettings() {
    var b = S.getBusiness();
    var map = { "s-name": "name", "s-location": "location", "s-tagline": "tagline", "s-address": "address",
      "s-phone": "phone", "s-whatsapp": "whatsapp", "s-email": "email", "s-mpesa": "mpesaTill",
      "s-hours": "hours", "s-fee": "deliveryFee", "s-free": "freeDeliveryThreshold", "s-give": "givebackPercent" };
    Object.keys(map).forEach(function (id) { var el = $("#" + id); if (el) el.value = b[map[id]] != null ? b[map[id]] : ""; });
  }
  $("#settingsForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var b = S.getBusiness();
    b.name = $("#s-name").value.trim(); b.location = $("#s-location").value.trim();
    b.tagline = $("#s-tagline").value.trim(); b.address = $("#s-address").value.trim();
    b.phone = $("#s-phone").value.trim(); b.whatsapp = $("#s-whatsapp").value.replace(/[^\d]/g, "");
    b.email = $("#s-email").value.trim(); b.mpesaTill = $("#s-mpesa").value.trim();
    b.hours = $("#s-hours").value.trim();
    b.deliveryFee = Number($("#s-fee").value) || 0;
    b.freeDeliveryThreshold = Number($("#s-free").value) || 0;
    b.givebackPercent = Number($("#s-give").value) || 0;
    S.saveBusiness(b);
    $$("[data-biz]").forEach(function (el) { if (b[el.getAttribute("data-biz")]) el.textContent = b[el.getAttribute("data-biz")]; });
    pill("#savePill2"); toast("Settings saved");
  });

  /* ---- PIN change ---- */
  $("#pinChangeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var a = $("#s-pin").value.trim(), b = $("#s-pin2").value.trim(), err = $("#pinChangeErr");
    if (a.length < 4) { err.textContent = "Use at least 4 digits."; return; }
    if (a !== b) { err.textContent = "PINs do not match."; return; }
    err.textContent = ""; S.setPin(a); $("#s-pin").value = ""; $("#s-pin2").value = "";
    pill("#savePill3"); toast("PIN updated");
  });

  /* ---- export / import / reset ---- */
  function download(filename, text) {
    var a = document.createElement("a");
    a.href = "data:text/javascript;charset=utf-8," + encodeURIComponent(text);
    a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  }
  $("#exportData").addEventListener("click", function () {
    // make sure current table edits are captured
    S.saveProducts(draft);
    download("data.js", S.exportDataJs());
    toast("data.js downloaded — commit it to assets/js/");
  });
  $("#copyData").addEventListener("click", function () {
    S.saveProducts(draft);
    var txt = S.exportDataJs();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { toast("Copied data.js to clipboard"); }, function () { toast("Copy failed — use Export instead"); });
    } else { toast("Clipboard unavailable — use Export instead"); }
  });
  $("#importFile").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var txt = String(reader.result);
        var m = txt.match(/window\.BUTCHERY_DEFAULTS\s*=\s*([\s\S]*?);\s*$/);
        var obj = JSON.parse(m ? m[1] : txt);
        if (obj.products) S.saveProducts(obj.products);
        if (obj.business) S.saveBusiness(obj.business);
        if (obj.adminPin) S.setPin(obj.adminPin);
        renderTable(); fillSettings();
        toast("Backup imported");
      } catch (err) { toast("Could not read that file"); }
    };
    reader.readAsText(file);
    e.target.value = "";
  });
  $("#resetData").addEventListener("click", function () {
    if (confirm("Reset all prices and settings to the shipped defaults? This clears your local edits.")) {
      S.resetAll(); renderTable(); fillSettings();
      $$("[data-biz]").forEach(function (el) { var b = S.getBusiness(); if (b[el.getAttribute("data-biz")]) el.textContent = b[el.getAttribute("data-biz")]; });
      toast("Reset to defaults");
    }
  });

  /* ---- init ---- */
  if (unlocked()) showDash(); else $("#pin").focus();
})();
