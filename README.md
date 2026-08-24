# Elite Butchery 🥩

A fast, no-build website + admin system for a Kenyan butchery based in **Uthiru, Nairobi**.
Customers browse cuts priced **per kilogram in KES**, build an order with weight steppers, and
check out over **WhatsApp** (pay on delivery or via **M-Pesa Buy Goods**). An **admin dashboard**
lets you edit prices and settings and publish them to the live site.

- **Storefront:** [`index.html`](index.html)
- **Admin dashboard:** [`admin.html`](admin.html) — default PIN **`1234`** (change it immediately)

## Features

- 🇰🇪 Prices in Kenyan Shillings, quoted **per kg**, with 0.5 kg weight steppers
- 🛒 Order cart with subtotal, delivery fee + free-delivery threshold
- 💬 One-tap **WhatsApp checkout** with an itemised order message
- 📱 M-Pesa Till shown at checkout and on the contact card
- 🔐 **Admin panel** to edit prices, toggle stock, add/remove products, and change business settings
- ⬇️ **Export for deploy** — bakes your live edits back into `assets/js/data.js` to publish for everyone
- 🌗 Light/dark theme, fully responsive, accessible, no build step, no dependencies

## Project structure

```
Butchery/
├── index.html            # customer storefront
├── admin.html            # admin dashboard (price & settings editor)
├── assets/
│   ├── css/styles.css    # all styles (theme-aware)
│   └── js/
│       ├── data.js       # DEFAULT catalog + settings (source of truth in the repo)
│       ├── store.js      # currency, cart, persistence, export helpers
│       ├── app.js        # storefront logic
│       └── admin.js      # admin logic
└── README.md
```

## Run locally

It is a static site — just open `index.html` in a browser. For the admin **Import** feature
and cross-page storage to behave exactly like production, serve it over HTTP:

```bash
cd Butchery
python3 -m http.server 8000
# then open http://localhost:8000
```

## How pricing & publishing works

`localStorage` in the browser is the **live** store shared by the storefront and admin on that device.

1. Open **`admin.html`**, sign in, edit prices/stock/settings, and click **Save**.
   Changes are visible immediately on your device.
2. To publish to **all** customers, click **Export for deploy** in the admin *Publish & Backup*
   panel. This downloads an updated **`data.js`**.
3. Replace `assets/js/data.js` in the repo with the downloaded file, commit, and redeploy.
   New visitors now get the updated prices.

> Prefer real-time, multi-device pricing without redeploying? See **Going further** below.

## Product photos

Each product shows a photo from `assets/img/<product-id>.jpg`. The site ships with royalty-free
**stock placeholders** from Wikimedia Commons — see [`PHOTO_CREDITS.md`](PHOTO_CREDITS.md) for the
license of each one.

**To use your own photo for a cut**, just drop a JPG with the *same filename* into `assets/img/`
(e.g. replace `assets/img/goat.jpg` with your own), commit, and redeploy — no code changes needed.
Roughly landscape (16:11), ~800px wide is ideal. If an image is missing, the card automatically
falls back to a clean line-art icon, so nothing ever breaks.

## Deploy (pick one — all free)

### GitHub Pages
```bash
cd Butchery
git init
git add .
git commit -m "Elite Butchery site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / root**.
Your site goes live at `https://<you>.github.io/<repo>/`.

### Netlify
Drag-and-drop the `Butchery` folder onto <https://app.netlify.com/drop>, or connect the repo.

### Vercel
`vercel` in the folder, or import the repo at <https://vercel.com/new> (framework preset: **Other**).

## Before you go live — checklist

- [ ] Change the admin **PIN** (Admin → *Admin PIN*)
- [ ] Set the real **WhatsApp number** (digits only, e.g. `2547XXXXXXXX`), **phone**, **email**
- [ ] Set the **M-Pesa Till** number
- [ ] Confirm the **address**, **opening hours**, **delivery fee** and **free-delivery threshold**
- [ ] Review the **prices per kg** and product list
- [ ] Swap the stock **product photos** in `assets/img/` for your own (optional — see *Product photos*)
- [ ] Click **Export for deploy**, commit the new `assets/js/data.js`, and redeploy

## Security note

The admin PIN is a **client-side convenience lock**, not real authentication — anyone technical can
bypass it, and admin edits only persist in the editor's own browser until exported and committed.
That is intentional to keep the site zero-backend and deployable immediately. When you want proper,
multi-user secure admin with live pricing, see below.

## Going further (optional upgrade)

To get real logins and live pricing shared across all devices without redeploying, back the catalog
with a database. A good fit is **Supabase** (Postgres + Auth):

1. Create a `products` table (`id, name, swahili, category, art, price, step, min, available, tag, desc`)
   and a `settings` row.
2. Enable Row Level Security: public **read**, authenticated **write**.
3. Swap the `localStorage` reads/writes in `store.js` for Supabase client calls, and replace the PIN
   gate in `admin.js` with Supabase Auth.

The rest of the UI stays the same.

---

© Elite Butchery — Uthiru, Nairobi, Kenya.
