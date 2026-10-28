// AL MANKAL, prototype B "Sufra": language, the entry, Delivery/Pickup and branch, the menu rail and cards,
// order again, the basket and MakanE handover, the branch sheet, hours, the fire band.
// Reads TEXT, BUSINESS, SIGNATURE and SAME_DISH from content.js and MENU/STORE from menu-data.js.
// The basket and branch use the same storage keys as the live preview, so a basket follows the visitor across pages.
(function () {
  'use strict';
  const html = document.documentElement, body = document.body;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const session = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };

  // Words this page adds; everything else comes from TEXT in content.js.
  const S_TEXT = {
    en: {
      s_title: 'Al Mankal Chicken Tikka | Order charcoal chicken in Amman',
      s_skip: 'Skip to the menu', s_brand: 'Al Mankal', s_brand_sub: 'Chicken tikka · Amman',
      s_hero_alt: 'A table of Al Mankal chicken tikka, kebab skewers, puri bread, hummus and garlic dip, seen from above',
      s_stamp_a: 'Real', s_stamp_b: 'Coals',
      s_lead: 'Chicken tikka, kebab and tawook over real charcoal, with puri bread and garlic.',
      s_how: 'How do you want it?', s_mode_aria: 'Delivery or pickup',
      s_delivery: 'Delivery', s_pickup: 'Pickup', s_from: 'From',
      s_start: 'Start my order', s_call: 'Call',
      s_mode_note: "Address, phone and payment are confirmed on Al Mankal's own order page.",
      s_menu_eyebrow: 'The menu', s_menu_title: "What's on the coals today?",
      s_menu_for: '{m} from {b}', s_rail_aria: 'Menu categories',
      s_sig: 'Signature', s_full_menu: 'Full menu with search',
      s_photo_note: "Photos are Al Mankal's own. Dishes without one yet show the logo.",
      s_nophoto: 'Photo coming soon',
      s_again_title: 'Order again', s_again_p: 'Your last basket on this phone: {n} · {t} JD',
      s_again_btn: 'Add it all to my basket', s_again_hide: 'Not now', s_again_done: 'Added to your basket',
      s_hours_tbc: 'Opening hours: to confirm', s_open: 'Open now · until {t}', s_closed: 'Closed now · opens {t}',
      s_bar_basket: 'Basket', s_bar_aria: 'Quick actions',
      s_ho_mode: 'On the order page, choose {m} from {b}.',
      s_proto: 'Prototype B · Sufra · not public', s_back_live: 'See the current preview'
    },
    ar: {
      s_title: 'المنقل تشكن تكا | اطلب دجاج على الفحم في عمّان',
      s_skip: 'روح للقائمة', s_brand: 'المنقل', s_brand_sub: 'تشكن تكا · عمّان',
      s_hero_alt: 'سفرة من المنقل: تشكن تكا، أسياخ كباب، خبز بوري، حمص ومثومة، من فوق',
      s_stamp_a: 'فحم', s_stamp_b: 'حقيقي',
      s_lead: 'تكا وكباب وطاووق على فحم حقيقي، مع خبز البوري والمثومة.',
      s_how: 'كيف بدك طلبك؟', s_mode_aria: 'توصيل أو استلام',
      s_delivery: 'توصيل', s_pickup: 'استلام', s_from: 'من فرع',
      s_start: 'ابدأ طلبي', s_call: 'اتصل',
      s_mode_note: 'العنوان والرقم والدفع بتأكدهم على صفحة الطلب الخاصة بالمنقل.',
      s_menu_eyebrow: 'القائمة', s_menu_title: 'شو على المنقل اليوم؟',
      s_menu_for: '{m} من {b}', s_rail_aria: 'أقسام القائمة',
      s_sig: 'المميّزة', s_full_menu: 'القائمة كاملة مع البحث',
      s_photo_note: 'الصور من المنقل نفسه. الأطباق اللي لسا ما إلها صورة بيظهر مكانها الشعار.',
      s_nophoto: 'الصورة قريباً',
      s_again_title: 'اطلب مرة ثانية', s_again_p: 'آخر سلة على هاد الجهاز: {n} · {t} د.أ',
      s_again_btn: 'ضيفها كلها على سلتي', s_again_hide: 'مش هلأ', s_again_done: 'انضافت على سلتك',
      s_hours_tbc: 'مواعيد الدوام: قيد التأكيد', s_open: 'مفتوح هلأ · لحد {t}', s_closed: 'مسكّر هلأ · بيفتح {t}',
      s_bar_basket: 'السلة', s_bar_aria: 'اختصارات',
      s_ho_mode: 'على صفحة الطلب، اختار {m} من فرع {b}.',
      s_proto: 'نموذج ب · سفرة · غير منشور', s_back_live: 'شوف المعاينة الحالية'
    }
  };

  // The restaurant's own photos (assets/img/s, AVIF + WebP), by MakanE id. Food only: the promo posters are left out,
  // so a dish shows its store photo or the logo tile instead of another dish's poster.
  const S_PHOTOS = {
    23503084: 'spread-marble', 23359335: 'chicken-tomato', 23359350: 'kebab-teal', 34818924: 'chicken-lemon',
    23359364: 'puri', 34818926: 'sandwich', 34818919: 'tawook-teal', 23506487: 'spread-teal', 23513825: 'rice-legs',
    23506593: 'tray-hands', 23359368: 'kibbeh', 23359337: 'dip-hand', 34818917: 'chicken-board', 23598066: 'chicken-board-teal',
    34818918: 'tikka-pieces', 23506618: 'plate-rice', 34818920: 'kebab-hand'
  };

  // CONFIRM with Al Mankal before launch. Per branch, per weekday (0 = Sunday): [open, close] in minutes after midnight;
  // close may pass midnight (e.g. [660, 1500] is 11:00 to 01:00). While null, the cards say the hours are to be confirmed.
  const HOURS = { gardens: null, sweifieh: null };

  let lang = html.lang === 'ar' ? 'ar' : 'en';
  let T = Object.assign({}, TEXT.en, S_TEXT.en, TEXT[lang], S_TEXT[lang]);
  function t(key, vars) {
    let s = T[key] != null ? T[key] : key;
    if (vars) Object.keys(vars).forEach((k) => { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (n) => n.toFixed(2);

  // The store's descriptions, tidied for reading only: spaces after numbers and full stops, no doubled commas.
  // The words stay the restaurant's own.
  function clean(s) {
    if (!s) return '';
    return String(s)
      .replace(/(\d)([A-Za-z؀-ۿ]{3,})/g, '$1 $2')
      .replace(/\s*,\s*(,\s*)+/g, ', ')
      .replace(/\s+([.,)])/g, '$1').replace(/\(\s+/g, '(').replace(/([A-Za-z])\(/g, '$1 (')
      .replace(/([.,])(?=[A-Za-z؀-ۿ])/g, '$1 ')
      .replace(/\s{2,}/g, ' ').trim()
      .replace(/^[a-z]/, (c) => c.toUpperCase());
  }

  // ---------- menu data ----------
  const byId = {}; MENU.forEach((c) => c.items.forEach((i) => { byId[i.id] = i; }));
  const TABS = [{ key: 'sig', items: SIGNATURE.map((id) => byId[id]).filter(Boolean) }].concat(MENU.map((c) => ({ key: c.key, cat: c, items: c.items })));
  let tab = 'sig';

  function photoOf(item) {
    const id = SAME_DISH[item.id] && byId[SAME_DISH[item.id]] ? SAME_DISH[item.id] : item.id;
    if (S_PHOTOS[id]) return { own: S_PHOTOS[id] };
    const src = byId[id].img || item.img;
    return src ? { store: src } : null;
  }
  function picture(p, sizes, eager) {
    const b = `assets/img/s/${p.own}`;
    return `<picture><source type="image/avif" srcset="${b}-480.avif 480w, ${b}-960.avif 960w" sizes="${sizes}"><source type="image/webp" srcset="${b}-480.webp 480w, ${b}-960.webp 960w" sizes="${sizes}"><img src="${b}-480.webp" alt="" width="480" height="444" ${eager ? '' : 'loading="lazy" '}decoding="async"></picture>`;
  }
  const noPhoto = () => `<div class="card-ph none"><img src="assets/img/s/logo-124.webp" alt="" width="124" height="144" loading="lazy"><span>${t('s_nophoto')}</span></div>`;
  function media(item, eager) {
    const p = photoOf(item);
    if (!p) return noPhoto();
    if (p.own) return `<div class="card-ph">${picture(p, '(min-width: 1100px) 280px, (min-width: 700px) 31vw, 46vw', eager)}${item.spicy ? `<span class="chip">${t('mn_spicy')}</span>` : ''}</div>`;
    return `<div class="card-ph"><img class="store" src="${esc(p.store)}" alt="" width="640" height="640" loading="lazy" decoding="async">${item.spicy ? `<span class="chip">${t('mn_spicy')}</span>` : ''}</div>`;
  }

  // ---------- basket ----------
  let basket = {};
  try { basket = JSON.parse(store.get('mankal-basket') || '{}') || {}; } catch (e) { basket = {}; }
  Object.keys(basket).forEach((id) => { if (!byId[id] || !(basket[id] > 0)) delete basket[id]; });
  const count = () => Object.values(basket).reduce((a, b) => a + b, 0);
  const total = () => Object.keys(basket).reduce((a, id) => a + byId[id].price * basket[id], 0);
  const saveBasket = () => store.set('mankal-basket', JSON.stringify(basket));
  let branch = store.get('mankal-branch') === 'sweifieh' ? 'sweifieh' : 'gardens';
  let mode = store.get('mankal-mode') === 'pickup' ? 'pickup' : 'delivery';

  function controlHtml(id) {
    const q = basket[id] || 0;
    if (!q) return `<button class="add" type="button" data-add="${id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><span>${t('add_btn')}</span></button>`;
    const name = esc(byId[id][lang]);
    return `<div class="stepper" role="group" aria-label="${esc(t('qty'))}: ${name}"><button type="button" data-less="${id}" aria-label="${esc(t('less'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg></button><span class="q" aria-live="polite">${q}</span><button type="button" data-more="${id}" aria-label="${esc(t('more'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></div>`;
  }
  function syncControls(id) {
    $$(`[data-ctl="${id}"]`).forEach((el) => {
      const had = el.contains(document.activeElement), wasMore = had && document.activeElement.hasAttribute('data-more');
      el.innerHTML = controlHtml(id);
      // Keep keyboard focus on the same control after it redraws.
      if (had) { const f = $(wasMore || !basket[id] ? '[data-more], [data-add]' : '[data-less], [data-add]', el); if (f) f.focus(); }
    });
  }
  function setQty(id, q, from) {
    const was = basket[id] || 0;
    if (q > 0) basket[id] = Math.min(20, q); else delete basket[id];
    saveBasket(); syncControls(id); renderBasket();
    if (q > was) { bump(); if (from) fly(from); }
  }
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]'), more = e.target.closest('[data-more]'), less = e.target.closest('[data-less]');
    if (add) setQty(add.dataset.add, 1, add);
    else if (more) setQty(more.dataset.more, (basket[more.dataset.more] || 0) + 1, more);
    else if (less) setQty(less.dataset.less, (basket[less.dataset.less] || 0) - 1);
  });
  function bump() { const b = $('#basket-count'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  function fly(from) {
    if (reduce) return;
    const to = innerWidth < 900 ? $('#bar-basket') : $('#basket-btn');
    const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    const dot = document.createElement('i'); dot.className = 'fly';
    dot.style.left = (a.left + a.width / 2 - 7) + 'px'; dot.style.top = (a.top + a.height / 2 - 7) + 'px';
    body.appendChild(dot);
    requestAnimationFrame(() => { dot.style.transform = `translate(${b.left + b.width / 2 - (a.left + a.width / 2)}px, ${b.top + b.height / 2 - (a.top + a.height / 2)}px) scale(.4)`; dot.style.opacity = '0'; });
    setTimeout(() => dot.remove(), 620);
  }

  // ---------- Delivery / Pickup and branch ----------
  function setMode(m) { mode = m === 'pickup' ? 'pickup' : 'delivery'; store.set('mankal-mode', mode); syncChoices(); }
  function setBranch(b) { branch = b === 'sweifieh' ? 'sweifieh' : 'gardens'; store.set('mankal-branch', branch); syncChoices(); }
  function syncChoices() {
    $$('[data-mode]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.mode === mode)));
    $$('button[data-branch]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.branch === branch)));
    $('#menu-for').textContent = t('s_menu_for', { m: t(mode === 'pickup' ? 's_pickup' : 's_delivery'), b: t(branch === 'sweifieh' ? 'br_sweifieh' : 'br_gardens') });
  }
  document.addEventListener('click', (e) => {
    const m = e.target.closest('[data-mode]'), b = e.target.closest('button[data-branch]'), pick = e.target.closest('[data-pick]');
    if (m) setMode(m.dataset.mode);
    if (b) { setBranch(b.dataset.branch); if (b.closest('.drawer')) renderBasket(); }
    if (pick) setBranch(pick.dataset.pick);
  });
  const goMenu = () => { $('#menu').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); const first = $('.tab[aria-selected="true"]'); if (first) setTimeout(() => first.focus({ preventScroll: true }), reduce ? 0 : 500); };
  $('#order-card').addEventListener('submit', (e) => { e.preventDefault(); goMenu(); });
  $('#bar-menu').addEventListener('click', goMenu);

  // ---------- the rail and the grid ----------
  function renderRail() {
    $('#rail').innerHTML = TABS.map((x) => `<button class="tab" type="button" role="tab" id="tab-${esc(x.key)}" aria-controls="grid" aria-selected="${x.key === tab}" tabindex="${x.key === tab ? 0 : -1}" data-tab="${esc(x.key)}">${esc(x.cat ? x.cat[lang] : t('s_sig'))}<small>${x.items.length}</small></button>`).join('');
    $('#grid').setAttribute('aria-labelledby', 'tab-' + tab);
  }
  function cardHtml(item, n) {
    const d = clean(item['d' + lang]);
    return `<article class="card">
      ${media(item, n < 2)}
      <div class="card-b">
        <h3>${esc(item[lang])}</h3>
        ${item.label && item.label[lang] ? `<span class="lbl">${esc(item.label[lang])}</span>` : ''}
        ${d ? `<p class="d">${esc(d)}</p>` : ''}
        <div class="card-f"><span class="price">${num(item.price)}<small>${t('jd')}</small></span><span data-ctl="${item.id}">${controlHtml(item.id)}</span></div>
      </div>
    </article>`;
  }
  function renderGrid(animate) {
    const g = $('#grid'), cur = TABS.find((x) => x.key === tab) || TABS[0];
    g.innerHTML = cur.items.map(cardHtml).join('');
    g.classList.remove('swap'); if (animate && !reduce) { void g.offsetWidth; g.classList.add('swap'); }
    // A store photo that fails to load (offline, blocked) becomes the logo tile.
    $$('img', g).forEach((img) => { const fail = () => { const ph = img.closest('.card-ph'); if (ph) ph.outerHTML = noPhoto(); }; if (img.complete && img.naturalWidth === 0 && img.currentSrc) fail(); else img.addEventListener('error', fail, { once: true }); });
  }
  function selectTab(key, focus) {
    if (key === tab) return;
    tab = key; renderRail(); renderGrid(true);
    const b = $(`.tab[data-tab="${CSS.escape(key)}"]`);
    if (b) { if (focus) b.focus(); b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' }); }
    // Keep the top of the grid in view when the rail is stuck to the top.
    const top = $('#grid').getBoundingClientRect().top, rail = $('.rail-wrap').getBoundingClientRect().bottom;
    if (top < rail) scrollBy({ top: top - rail - 8, behavior: reduce ? 'auto' : 'smooth' });
  }
  $('#rail').addEventListener('click', (e) => { const b = e.target.closest('.tab'); if (b) selectTab(b.dataset.tab, false); });
  // Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation).
  $('#rail').addEventListener('keydown', (e) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']; if (!keys.includes(e.key)) return;
    e.preventDefault();
    const i = TABS.findIndex((x) => x.key === tab), rtl = html.dir === 'rtl';
    let j = i;
    if (e.key === 'Home') j = 0; else if (e.key === 'End') j = TABS.length - 1;
    else j = i + ((e.key === 'ArrowRight') !== rtl ? 1 : -1);
    j = (j + TABS.length) % TABS.length;
    selectTab(TABS[j].key, true);
  });

  // ---------- order again: the last basket sent to checkout from this phone ----------
  function renderAgain() {
    const box = $('#again'); let last = null;
    try { last = JSON.parse(store.get('mankal-last') || 'null'); } catch (e) { last = null; }
    const ids = last && last.items ? Object.keys(last.items).filter((id) => byId[id]) : [];
    if (!ids.length || store.get('mankal-again-off') === '1') { box.hidden = true; return; }
    const n = ids.reduce((a, id) => a + last.items[id], 0), sum = ids.reduce((a, id) => a + byId[id].price * last.items[id], 0);
    const names = ids.slice(0, 3).map((id) => `${last.items[id]} × ${byId[id][lang]}`).join(' · ') + (ids.length > 3 ? ' …' : '');
    box.innerHTML = `<div class="again-card"><span class="glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></span>
      <h2>${t('s_again_title')}</h2><p>${esc(t('s_again_p', { n: n === 1 ? t('bk_item') : t('bk_items', { n }), t: num(sum) }))}<br>${esc(names)}</p>
      <div class="acts"><button class="btn btn-red btn-small" type="button" id="again-add">${t('s_again_btn')}</button><button class="btn btn-line btn-small" type="button" id="again-off">${t('s_again_hide')}</button></div></div>`;
    box.hidden = false;
    $('#again-add').addEventListener('click', (e) => {
      ids.forEach((id) => { basket[id] = Math.min(20, (basket[id] || 0) + last.items[id]); syncControls(id); });
      saveBasket(); renderBasket(); bump(); fly(e.currentTarget); e.currentTarget.textContent = t('s_again_done');
    });
    $('#again-off').addEventListener('click', () => { store.set('mankal-again-off', '1'); box.hidden = true; });
  }

  // ---------- the basket drawer and the handover to MakanE ----------
  // Gardens dishes each have their own MakanE page; Sweifieh pages are CONFIRM, so that store opens at its front.
  const storeUrl = (item) => branch === 'gardens' ? `${STORE.gardens}/products/${item.slug}` : `${STORE.sweifieh}/#_branch119270`;
  let handover = false, lastFocus = null;
  const drawer = $('#basket');
  function renderBasket() {
    const n = count();
    const badge = $('#basket-count'); badge.textContent = String(n); badge.hidden = n === 0;
    // The bar shows the running total once there is something in the basket.
    const bt = $('#bar-total'); bt.innerHTML = n ? `${num(total())}<small>${t('jd')}</small>` : ''; bt.hidden = !n; $('#bar-label').hidden = !!n;
    $('#bar-basket').setAttribute('aria-label', n ? `${t('s_bar_basket')}: ${n === 1 ? t('bk_item') : t('bk_items', { n })}, ${num(total())} ${t('jd')}` : t('s_bar_basket'));
    const ids = Object.keys(basket), bodyEl = $('#bk-body'), foot = $('#bk-foot');
    $('#bk-count').textContent = n ? (n === 1 ? t('bk_item') : t('bk_items', { n })) : '';
    const modeName = t(mode === 'pickup' ? 's_pickup' : 's_delivery'), brName = t(branch === 'sweifieh' ? 'br_sweifieh' : 'br_gardens');
    if (!ids.length) {
      handover = false;
      bodyEl.innerHTML = `<div class="bk-empty"><b>${t('bk_empty')}</b><p class="note">${t('bk_empty_p')}</p><a class="btn btn-red" href="#menu" data-close-basket>${t('bk_browse')}</a></div>`;
      foot.innerHTML = ''; return;
    }
    if (handover) {
      const first = byId[ids[0]];
      bodyEl.innerHTML = `<div class="ho"><h3 class="display">${t('ho_title')}</h3><p>${t('ho_p')}</p>
        <p class="ho-mode">${esc(t('s_ho_mode', { m: modeName, b: brName }))}</p>
        <div class="ho-list"><b>${t('ho_list')}</b><ul>${ids.map((id) => `<li><span>${basket[id]} × ${esc(byId[id][lang])}</span><span>${num(byId[id].price * basket[id])} ${t('jd')}</span></li>`).join('')}</ul></div>
        <p class="note">${t('ho_note')}</p>
        <div class="ho-actions"><a class="btn btn-red" id="ho-go" href="${esc(storeUrl(first))}" target="_blank" rel="noopener">${t('ho_go')}</a><button class="btn btn-line" type="button" id="ho-copy">${t('ho_copy')}</button><button class="btn btn-line" type="button" id="ho-back">${t('ho_back')}</button></div></div>`;
      foot.innerHTML = '';
      $('#ho-go').addEventListener('click', () => { store.set('mankal-last', JSON.stringify({ items: basket, at: Date.now() })); store.set('mankal-again-off', ''); });
      $('#ho-back').addEventListener('click', () => { handover = false; renderBasket(); const go = $('#bk-go'); if (go) go.focus(); });
      $('#ho-copy').addEventListener('click', (e) => {
        const text = ids.map((id) => `${basket[id]} × ${byId[id][lang]}`).join('\n') + `\n${t('bk_total')}: ${num(total())} ${t('jd')}\n${modeName} · ${brName}`;
        const btn = e.currentTarget, done = () => { btn.textContent = t('ho_copied'); setTimeout(() => { btn.textContent = t('ho_copy'); }, 1800); };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
      });
      return;
    }
    bodyEl.innerHTML = `<div class="bk-mode"><div class="seg" role="group" aria-label="${esc(t('s_mode_aria'))}"><button type="button" data-mode="delivery" aria-pressed="${mode === 'delivery'}">${t('s_delivery')}</button><button type="button" data-mode="pickup" aria-pressed="${mode === 'pickup'}">${t('s_pickup')}</button></div>
      <div class="seg" role="group" aria-label="${esc(t('bk_branch'))}"><button type="button" data-branch="gardens" aria-pressed="${branch === 'gardens'}">${t('br_gardens')}</button><button type="button" data-branch="sweifieh" aria-pressed="${branch === 'sweifieh'}">${t('br_sweifieh')}</button></div></div>` +
      ids.map((id) => { const it = byId[id], p = photoOf(it); return `<div class="bk-line">
        <div class="thumb">${p && p.own ? `<img src="assets/img/s/${p.own}-480.webp" alt="" loading="lazy">` : p && p.store ? `<img src="${esc(p.store)}" alt="" loading="lazy">` : ''}</div>
        <div><p class="name">${esc(it[lang])}</p><span class="each">${num(it.price)} ${t('jd')}</span></div>
        <span data-ctl="${id}">${controlHtml(id)}</span></div>`; }).join('');
    foot.innerHTML = `<div class="bk-total"><span>${t('bk_total')}</span><span class="price">${num(total())}<small>${t('jd')}</small></span></div><button class="btn btn-red" type="button" id="bk-go">${t('bk_checkout')}</button><button class="bk-clear" type="button" id="bk-clear">${t('bk_clear')}</button><p class="note">${t('bk_note')}</p>`;
    $('#bk-go').addEventListener('click', () => { handover = true; renderBasket(); $('#ho-go').focus(); });
    $('#bk-clear').addEventListener('click', () => { Object.keys(basket).forEach((id) => { delete basket[id]; syncControls(id); }); saveBasket(); renderBasket(); });
  }
  // Focus stays inside an open dialog.
  function trap(e, root) {
    if (e.key !== 'Tab') return;
    const f = $$('a[href], button:not([disabled])', root).filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
  function openBasket() { lastFocus = document.activeElement; handover = false; renderBasket(); drawer.hidden = false; body.classList.add('modal-open'); requestAnimationFrame(() => { drawer.classList.add('open'); $('.x', drawer).focus(); }); }
  function closeBasket() { if (drawer.hidden) return; drawer.classList.remove('open'); body.classList.remove('modal-open'); setTimeout(() => { drawer.hidden = true; }, reduce ? 0 : 280); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  $$('#basket-btn, #bar-basket').forEach((b) => b.addEventListener('click', openBasket));
  drawer.addEventListener('keydown', (e) => trap(e, drawer));
  document.addEventListener('click', (e) => { if (e.target.closest('[data-close-basket]')) closeBasket(); });

  // ---------- which branch? ----------
  const sheet = $('#sheet'); let sheetFocus = null;
  function openSheet() { sheetFocus = document.activeElement; sheet.hidden = false; body.classList.add('modal-open'); requestAnimationFrame(() => { sheet.classList.add('open'); $('.sb .btn', sheet).focus(); }); }
  function closeSheet() { if (sheet.hidden) return; sheet.classList.remove('open'); body.classList.remove('modal-open'); setTimeout(() => { sheet.hidden = true; }, reduce ? 0 : 280); if (sheetFocus && sheetFocus.focus) sheetFocus.focus(); }
  document.addEventListener('click', (e) => { if (e.target.closest('[data-call]')) openSheet(); else if (e.target.closest('[data-close-sheet]')) closeSheet(); });
  sheet.addEventListener('keydown', (e) => trap(e, sheet));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeSheet(); closeBasket(); } });

  // ---------- hours: an open-now line once Al Mankal confirms them (Amman time) ----------
  function ammanNow() {
    try {
      const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Amman', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      const get = (k) => (p.find((x) => x.type === k) || {}).value;
      return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')), min: (+get('hour') % 24) * 60 + +get('minute') };
    } catch (e) { const d = new Date(); return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() }; }
  }
  const hhmm = (m) => { m %= 1440; return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };
  function renderHours() {
    $$('[data-hours]').forEach((el) => {
      const week = HOURS[el.dataset.hours], span = $('span', el);
      if (!week) { el.className = 'hours tbc'; span.textContent = t('s_hours_tbc'); return; }
      const now = ammanNow(), today = week[now.day], yest = week[(now.day + 6) % 7];
      let open = false, until = 0;
      if (today && now.min >= today[0] && now.min < today[1]) { open = true; until = today[1]; }
      else if (yest && yest[1] > 1440 && now.min < yest[1] - 1440) { open = true; until = yest[1]; }
      el.className = 'hours ' + (open ? 'open' : 'closed');
      span.textContent = open ? t('s_open', { t: hhmm(until) }) : t('s_closed', { t: today ? hhmm(today[0]) : '—' });
    });
  }

  // ---------- language ----------
  function applyLang() {
    T = Object.assign({}, TEXT.en, S_TEXT.en, TEXT[lang], S_TEXT[lang]);
    html.lang = lang; html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    store.set('mankal-lang', lang);
    $$('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t); });
    $$('[data-t-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.tAria)); });
    $$('[data-t-alt]').forEach((el) => { el.alt = t(el.dataset.tAlt); });
    document.title = t('s_title');
    renderRail(); renderGrid(false); renderAgain(); renderBasket(); renderHours(); syncChoices();
  }
  $('#lang').addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; applyLang(); });

  // ---------- header line ----------
  const onScroll = () => body.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // ---------- the fire band: the grill loop plays only while it is on screen, never with reduced motion ----------
  const fv = $('#fire-video');
  if (fv) {
    const tall = innerWidth / innerHeight < .9, file = tall ? 'grill-tall' : 'grill-wide';
    fv.poster = `assets/img/s/${file}.webp`;
    if (!reduce && 'IntersectionObserver' in window) {
      const src = fv.canPlayType('video/mp4; codecs="avc1.4d401e"') ? `assets/video/${file}.mp4` : `assets/video/${file}.webm`;
      new IntersectionObserver((en) => {
        en.forEach((x) => {
          if (x.isIntersecting) { if (!fv.src) fv.src = src; const p = fv.play(); if (p && p.catch) p.catch(() => {}); } else fv.pause();
        });
      }, { rootMargin: '120px 0px' }).observe(fv.parentElement);
    }
  }

  // ---------- the entry: the same burn-in as the live preview, once per tab ----------
  const intro = $('#intro');
  if (session.get('mankal-intro')) intro.classList.add('gone');
  else {
    body.classList.add('intro-wait');
    const hold = reduce ? 880 : 1780, gone = reduce ? 500 : 800;
    const go = () => {
      intro.classList.add('burn');
      setTimeout(() => { intro.classList.add('lift'); body.classList.remove('intro-wait'); session.set('mankal-intro', '1'); }, hold);
      setTimeout(() => intro.classList.add('gone'), hold + gone);
    };
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(go, 80)));
  }

  applyLang();
})();
