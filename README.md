# Al Mankal Chicken Tikka, Amman — preview site

Showcase site for Al Mankal Chicken Tikka (Gardens and Sweifieh, Amman; owner Saif Khuffash), built by FellowFlow. **Preview only**: `noindex` (meta tags, `_headers`, `robots.txt`) until Saif approves the site.

- Plain HTML, CSS and JS, no build step. Pages: `index.html` (home: order card, menu rail, grill film, reels, branches, story), `menu.html` (every category with search), `branches.html`, `franchise.html`, `404.html`. The five pages share one header, footer, call sheet, basket drawer and bottom bar.
- **Direction "Sufra" (29 October 2026).** Chosen by the founders from the market research (three directions, B recommended): a daylight, menu-first homepage. Cream page, the logo's own red and yellow, the teal of the restaurant's table photos, char for the film band and footer. Type: Barlow Condensed 800 (Latin display), Lalezar (Arabic display), Rubik (Latin text), IBM Plex Sans Arabic (Arabic text), all SIL OFL and self-hosted in `assets/fonts/`.
- Every word and fact lives in `assets/js/content.js` (English and Arabic). Facts marked `CONFIRM` wait for Saif. `HOURS` there is empty until Saif gives opening hours; the branch cards say "to confirm" and turn into "Open now / Closed now" (Amman time) once it is filled. The story chapter is a draft.
- The menu is `assets/js/menu-data.js`: the restaurant's own MakanE catalogue (73 dishes, names, descriptions, prices), read from almankal.com on 28 October 2026. Regenerate it when the menu changes (see `tools/`). `PHOTOS` in `content.js` maps a dish to one of the restaurant's Instagram photos in `assets/img/s/` (AVIF and WebP, 480 and 960 px); promo posters are never used as dish photos, and a dish without a photo shows the logo tile.
- **Ordering stays on MakanE.** "Add to basket" keeps a basket in `localStorage` (`mankal-basket`); Checkout shows a hand-over screen that opens the first dish's page on the restaurant's store (`https://almankal.com/products/<slug>`) and offers to copy the list, because MakanE has no API to pre-fill a basket. Delivery or Pickup and Gardens or Sweifieh are saved as `mankal-mode` and `mankal-branch`; the Sweifieh switch opens the Sweifieh store (`jordan.almankal.com`), whose dish addresses are still to confirm. "Order again" shows the last basket sent to checkout from this phone (`mankal-last`).
- **Logo.** `assets/img/s/logo-{124,380,760}.webp` is the restaurant's own mark on its yellow disc (made from `brand/logo-on-yellow.png`, white fills kept): intro, header, footer, 404 and the no-photo tile.
- **Motion.** The entry burns the logo in from the bottom up and lifts the curtain once per tab session (`sessionStorage` `mankal-intro`). Then the hero assembles: the photo settles, the words rise in turn, the order card lands; the hero photo tilts a little under the pointer on desktop. Category switches deal the cards in; "Add" flies the dish photo into the basket button; the grill band plays the restaurant's own footage (`assets/video/grill-wide` or `grill-tall`, chosen by screen shape) under an ember canvas that only runs while in view; "1985" counts up; the "Open now" dot pulses; reels play muted when in view, tap for sound; the bottom bar slides up after the intro. Everything animates transform and opacity only; heavy media starts after the curtain. With Reduce Motion on, the intro is short, sparks and embers are still, and reveals are instant.
- Language: `assets/js/lang.js` picks Arabic for Arabic browsers on the first visit, otherwise English; the header button switches and remembers the choice (`mankal-lang`).
- Every release that changes the CSS or JS bumps the `?v=` number on their links in the HTML pages, so visitors never get new HTML with cached old styles.

Preview: https://al-mankal-amman.pages.dev (Cloudflare Pages from `main`).

## Quality pass

`NODE_PATH=$(npm root -g) node tools/shoot.cjs ../shots` serves the site locally, blocks outside requests, captures every page at 375 px and 1280 px in English and Arabic, exercises the rail, basket, hand-over, call sheet and menu search, and reports console errors, sideways scroll and stray "undefined" text. It must print `no problems`.

## At launch

Remove the `noindex` meta tags, the `X-Robots-Tag` line in `_headers` and the `Disallow` in `robots.txt`; point `sitemap.xml` and `robots.txt` at `almankal.com`; add `og:image`; fill `HOURS`; replace the hero and dish photos with the restaurant's own where they are still missing.
