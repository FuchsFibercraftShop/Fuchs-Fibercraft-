Fuchs Fibercraft — Donation Shop

This repo contains a simple static shop (HTML/CSS/JS) styled in a black / purple / pink neon theme.

What I created:
- index.html: shop layout and product placeholders
- styles.css: neon theme, animations
- script.js: frontend cart stored in localStorage and basic checkout behavior

Quick notes / next steps for you:
1) PayPal is already set to: https://www.paypal.me/FuchsFibercraft12 — the checkout button opens PayPal.Me with the total amount.
2) Replace the logo placeholder in index.html with your own image (add file to /assets/logo.png or change the HTML).
3) For real persistent stock/orders you need a backend (I can add Firebase/Firestore, Netlify Functions, or a small Node API later).

Hosting with GitHub Pages (custom domain configured)
- I added a CNAME file pointing to your domain: fuchsfibercraft.com
- To complete DNS so your domain resolves to GitHub Pages, set the following at your domain registrar / DNS provider:
  - For apex domain (fuchsfibercraft.com): add these A records (each as a separate A record):
    - 185.199.108.153
    - 185.199.109.153
    - 185.199.110.153
    - 185.199.111.153
  - For the www subdomain (optional): add a CNAME record for www pointing to: FuchsFibercraftShop.github.io
- After DNS changes propagate (can take minutes to hours), GitHub Pages will serve the site at https://fuchsfibercraft.com.

How I configured the repo for Pages
- I committed a CNAME file with the domain fuchsfibercraft.com in the repository root.
- To finish activation, enable Pages in the repository settings (Settings → Pages → Branch: main, Folder: / (root)).

Security & Limitations
- The current shop is static: cart and stock are stored in the user's browser (localStorage). This is suitable as a demo but not for reliable single-item sales or concurrent purchases.
- For secure payments and order tracking, integrate a backend (I can set this up if you want).

License: none added. If you want MIT, tell me and I'll add LICENSE file.
