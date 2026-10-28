# Al Mankal Chicken Tikka, Amman — preview site

Showcase site for Al Mankal Chicken Tikka (Gardens and Sweifieh, Amman; owner Saif Khuffash), built by FellowFlow. **Preview only**: `noindex` (meta tags, `_headers`, `robots.txt`) until Saif approves the site.

- Plain HTML, CSS and JS, no build step. Pages: `index.html` (home), `menu.html` (ordering), `branches.html`, `franchise.html`, `404.html`.
- Every word and fact lives in `assets/js/content.js` (English and Arabic). Facts marked `CONFIRM` wait for Saif. The story chapter is a draft and carries a visible "draft" tag until the family tells it.
- The menu is `assets/js/menu-data.js`: the restaurant's own MakanE catalogue (73 dishes, names, descriptions, prices, photos), read from almankal.com on 28 October 2026. Regenerate it when the menu changes (see `tools/`).
- **Ordering stays on MakanE.** Checkout opens the restaurant's store (`https://almankal.com/products/<slug>`), where the basket, phone check, delivery and cash payment live. The Sweifieh switch opens the Sweifieh store (`jordan.almankal.com`); its dish addresses are still to confirm.
- **Round 2 (28 October 2026, Mahmoud's feedback).** The logo is the restaurant's own (`assets/img/logo.png`, cut out with a cream keyline; `logo-small.png` header, `logo-red.png` on cream). The hero plays the restaurant's own grill footage (`assets/video/grill-wide` and `grill-tall`, mp4 with webm fallback, chosen by screen shape) under an ember canvas; the entry animation burns the logo in over the coals once per tab session (`sessionStorage` `mankal-intro`; shorter with Reduce Motion). The burn is a soot cover sliding off the logo (transform only, so phones animate it on the GPU); it starts after the page's first paint, and the grill film, embers and hero reveals start only once the curtain lifts. Chapters far below the fold use `content-visibility: auto`, so they cost nothing until scrolled near. Food photos and the "film" chapter frames come from the restaurant's Instagram (`assets/img/ig/`, with `-m` phone sizes); the reels row (`assets/video/reel-1..5.mp4`) plays muted when in view, tap for sound. Dish photos still hot-link from the store's CDN where we have no Instagram shot; a dish with neither gets a "coal plate" with its name.
- **Basket and Checkout.** "Add to basket" keeps a basket in `localStorage` (`mankal-basket`, dish id to quantity); the drawer shows the list and total; Checkout shows a handover screen that opens the first dish's page on the restaurant's MakanE store and offers to copy the list, because MakanE has no API to pre-fill a basket. The Call button opens a branch sheet (Gardens, Sweifieh; same number).
- Fonts are self-hosted in `assets/fonts/`: Alfa Slab One and Lalezar (display), Fraunces italic and Aref Ruqaa (lead lines), Rubik (body, Latin and Arabic).
- The hero's embers are a canvas drawn in `assets/js/site.js`; it pauses off screen and settles to one still frame with Reduce Motion on.
- Language: `assets/js/lang.js` picks Arabic for Arabic browsers on the first visit, otherwise English; the header button switches and remembers the choice.
- Every release that changes the CSS or JS bumps the `?v=` number on their links in the HTML pages, so visitors never get new HTML with cached old styles.

Preview: https://al-mankal-amman.pages.dev (Cloudflare Pages from `main`).

## Quality pass

`NODE_PATH=$(npm root -g) node tools/shoot.cjs ../shots` serves the site locally, blocks outside requests, captures every page at 375 px and 1280 px in English and Arabic, and reports console errors, sideways scroll and stray "undefined" text. It must print `no problems`.

## At launch

Remove the `noindex` meta tags, the `X-Robots-Tag` line in `_headers` and the `Disallow` in `robots.txt`; point `sitemap.xml` and `robots.txt` at `almankal.com`; add `og:image`; replace hot-linked photos with the restaurant's own.
