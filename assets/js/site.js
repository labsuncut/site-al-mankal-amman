// AL MANKAL "Sufra": language, the entry, the hero assembly, Delivery/Pickup and branch, the menu rail and cards,
// the menu page (search, scroll spy), order again, the basket and the MakanE handover, the branch sheet, opening hours,
// the fire band (grill film, embers), reels, the year count-up and the scroll reveals. No frameworks, no trackers.
// Reads TEXT, BUSINESS, HOURS, PHOTOS, SAME_DISH, SIGNATURE and REELS from content.js and MENU/STORE from menu-data.js.
(function () {
  'use strict';
  const html = document.documentElement, body = document.body;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const page = body.dataset.page || '';
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const session = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  const hasIO = 'IntersectionObserver' in window;
  if (!hasIO) body.classList.add('no-io');

  // ---------- words ----------
  let lang = html.lang === 'ar' ? 'ar' : 'en';
  let T = TEXT[lang];
  function t(key, vars) {
    let s = T[key] != null ? T[key] : (TEXT.en[key] != null ? TEXT.en[key] : key);
    if (vars) Object.keys(vars).forEach((k) => { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (n) => n.toFixed(2);
  const brName = () => t(branch === 'sweifieh' ? 'br_sweifieh' : 'br_gardens');
  const modeName = () => t(mode === 'pickup' ? 'pickup' : 'delivery');

  // The store's descriptions, tidied for reading only (spaces after numbers and full stops, no doubled commas). The words stay the restaurant's own.
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

  // ---------- menu data and photos ----------
  const byId = {}; MENU.forEach((c) => c.items.forEach((i) => { byId[i.id] = i; }));
  const SIG = SIGNATURE.map((id) => byId[id]).filter(Boolean);
  const TABS = [{ key: 'sig', items: SIG }].concat(MENU.map((c) => ({ key: c.key, cat: c, items: c.items })));
  function photoOf(item) {
    const id = SAME_DISH[item.id] && byId[SAME_DISH[item.id]] ? SAME_DISH[item.id] : item.id;
    if (PHOTOS[id]) return { own: PHOTOS[id] };
    const src = byId[id].img || item.img;
    return src ? { store: src } : null;
  }
  function picture(name, sizes, eager, w, h) {
    const b = `assets/img/s/${name}`;
    return `<picture><source type="image/avif" srcset="${b}-480.avif 480w, ${b}-960.avif 960w" sizes="${sizes}"><source type="image/webp" srcset="${b}-480.webp 480w, ${b}-960.webp 960w" sizes="${sizes}"><img src="${b}-480.webp" alt="" width="${w || 480}" height="${h || 444}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
  }
  const noPhoto = () => `<div class="card-ph none"><img src="assets/img/s/logo-124.webp" alt="" width="124" height="124" loading="lazy"><span>${t('nophoto')}</span></div>`;
  function media(item, eager) {
    const p = photoOf(item);
    if (!p) return noPhoto();
    const chip = item.spicy ? `<span class="chip">${t('mn_spicy')}</span>` : '';
    if (p.own) return `<div class="card-ph">${picture(p.own, '(min-width: 1100px) 280px, (min-width: 700px) 31vw, 46vw', eager)}${chip}</div>`;
    return `<div class="card-ph"><img class="store" src="${esc(p.store)}" alt="" width="640" height="640" loading="lazy" decoding="async">${chip}</div>`;
  }
  function guard(root) {
    $$('img', root).forEach((img) => { const fail = () => { const ph = img.closest('.card-ph'); if (ph) ph.outerHTML = noPhoto(); }; if (img.complete && img.naturalWidth === 0 && img.currentSrc) fail(); else img.addEventListener('error', fail, { once: true }); });
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

  const plus = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  const minus = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
  function controlHtml(id) {
    const q = basket[id] || 0;
    if (!q) return `<button class="add" type="button" data-add="${id}">${plus}<span>${t('add_btn')}</span></button>`;
    return `<div class="stepper" role="group" aria-label="${esc(t('qty'))}: ${esc(byId[id][lang])}"><button type="button" data-less="${id}" aria-label="${esc(t('less'))}">${minus}</button><span class="q" aria-live="polite">${q}</span><button type="button" data-more="${id}" aria-label="${esc(t('more'))}">${plus}</button></div>`;
  }
  function syncControls(id) {
    $$(`[data-ctl="${id}"]`).forEach((el) => {
      const had = el.contains(document.activeElement), wasMore = had && document.activeElement.hasAttribute('data-more');
      el.innerHTML = controlHtml(id);
      if (had) { const f = $(wasMore || !basket[id] ? '[data-more], [data-add]' : '[data-less], [data-add]', el); if (f) f.focus(); }
    });
  }
  function setQty(id, q, from) {
    const was = basket[id] || 0;
    if (q > 0) basket[id] = Math.min(20, q); else delete basket[id];
    saveBasket(); syncControls(id); renderBasket();
    if (q > was) { bump(); if (from) fly(from, id); }
  }
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]'), more = e.target.closest('[data-more]'), less = e.target.closest('[data-less]');
    if (add) setQty(add.dataset.add, 1, add);
    else if (more) setQty(more.dataset.more, (basket[more.dataset.more] || 0) + 1, more);
    else if (less) setQty(less.dataset.less, (basket[less.dataset.less] || 0) - 1);
  });
  function bump() { $$('#basket-btn, #bar-basket').forEach((b) => { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }); }
  // The dish's own photo flies to the basket: across on one curve, down-then-up on another, so the path arcs.
  function fly(from, id) {
    if (reduce) return;
    const to = innerWidth < 900 ? $('#bar-basket') : $('#basket-btn'); if (!to) return;
    const card = from.closest('.card, .bk-line'), img = card && $('.card-ph img:not(.none img), .thumb img', card);
    const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    const x = document.createElement('i'); x.className = 'fly fly-x';
    const y = document.createElement('i'); y.className = 'fly-y'; y.style.display = 'block'; y.style.width = '100%'; y.style.height = '100%';
    if (img && img.currentSrc) { const c = document.createElement('img'); c.src = img.currentSrc; c.alt = ''; y.appendChild(c); }
    x.appendChild(y);
    x.style.left = (a.left + a.width / 2 - 27) + 'px'; x.style.top = (a.top + a.height / 2 - 27) + 'px';
    body.appendChild(x);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      x.style.transform = `translateX(${b.left + b.width / 2 - (a.left + a.width / 2)}px)`;
      y.style.transform = `translateY(${b.top + b.height / 2 - (a.top + a.height / 2)}px) scale(.3)`; y.style.opacity = '0';
    }));
    setTimeout(() => x.remove(), 700);
  }

  // ---------- Delivery / Pickup and branch ----------
  function setMode(m) { mode = m === 'pickup' ? 'pickup' : 'delivery'; store.set('mankal-mode', mode); syncChoices(); }
  function setBranch(b) { branch = b === 'sweifieh' ? 'sweifieh' : 'gardens'; store.set('mankal-branch', branch); syncChoices(); }
  function syncChoices() {
    $$('[data-mode]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.mode === mode)));
    $$('button[data-branch]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.branch === branch)));
    const f = $('#menu-for');
    if (f) {
      const was = f.dataset.v, now = mode + '|' + branch;
      f.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg><span class="txt">${t('menu_for', { m: modeName(), b: `<b>${brName()}</b>` })}<small>${t('for_hint')}</small></span><button type="button" data-for-change>${t('for_change')}</button>`;
      f.dataset.v = now;
      if (was && was !== now && !reduce) { f.classList.remove('flash'); void f.offsetWidth; f.classList.add('flash'); }
    }
  }
  document.addEventListener('click', (e) => {
    const ch = e.target.closest('[data-for-change]');
    if (ch) { const tgt = $(ch.closest('#menu-for').dataset.change || '#order-card'); if (tgt) { tgt.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); const b = $('button[data-branch]', tgt); if (b) setTimeout(() => b.focus({ preventScroll: true }), reduce ? 0 : 450); } return; }
    const m = e.target.closest('[data-mode]'), b = e.target.closest('button[data-branch]'), pick = e.target.closest('[data-pick]');
    if (m) setMode(m.dataset.mode);
    if (b) { setBranch(b.dataset.branch); if (b.closest('.drawer')) renderBasket(); }
    if (pick) setBranch(pick.dataset.pick);
  });
  const goMenu = () => { const m = $('#menu'); if (!m) { location.href = 'menu.html'; return; } m.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); const first = $('.tab[aria-selected="true"], .tab[aria-current="true"]'); if (first) setTimeout(() => first.focus({ preventScroll: true }), reduce ? 0 : 500); };
  const oc = $('#order-card'); if (oc) oc.addEventListener('submit', (e) => { e.preventDefault(); goMenu(); });
  const bm = $('#bar-menu'); if (bm) bm.addEventListener('click', goMenu);

  // ---------- home: the rail and the grid ----------
  let tab = 'sig';
  function cardHtml(item, n) {
    const d = clean(item['d' + lang]);
    return `<article class="card" style="--i:${Math.min(n, 11)}">
      ${media(item, n < 2)}
      <div class="card-b">
        <h3>${esc(item[lang])}</h3>
        ${item.label && item.label[lang] ? `<span class="lbl">${esc(item.label[lang])}</span>` : ''}
        ${d ? `<p class="d">${esc(d)}</p>` : ''}
        <div class="card-f"><span class="price">${num(item.price)}<small>${t('jd')}</small></span><span data-ctl="${item.id}">${controlHtml(item.id)}</span></div>
      </div>
    </article>`;
  }
  function renderRail() {
    const rail = $('#rail'); if (!rail || page !== 'home') return;
    rail.innerHTML = TABS.map((x) => `<button class="tab" type="button" role="tab" id="tab-${esc(x.key)}" aria-controls="grid" aria-selected="${x.key === tab}" tabindex="${x.key === tab ? 0 : -1}" data-tab="${esc(x.key)}">${esc(x.cat ? x.cat[lang] : t('sig'))}<small>${x.items.length}</small></button>`).join('');
    $('#grid').setAttribute('aria-labelledby', 'tab-' + tab);
  }
  function renderGrid(animate) {
    if (page !== 'home') return;
    const g = $('#grid'); if (!g) return;
    const cur = TABS.find((x) => x.key === tab) || TABS[0];
    g.innerHTML = cur.items.map(cardHtml).join('');
    g.classList.remove('swap'); if (animate && !reduce) { void g.offsetWidth; g.classList.add('swap'); }
    guard(g);
  }
  function selectTab(key, focus) {
    if (key === tab) return;
    tab = key; renderRail(); renderGrid(true);
    const b = $(`.tab[data-tab="${CSS.escape(key)}"]`);
    if (b) { if (focus) b.focus(); b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' }); }
    const top = $('#grid').getBoundingClientRect().top, rb = $('.rail-wrap').getBoundingClientRect().bottom;
    if (top < rb) scrollBy({ top: top - rb - 8, behavior: reduce ? 'auto' : 'smooth' });
  }
  const rail = $('#rail');
  if (rail && page === 'home') {
    rail.addEventListener('click', (e) => { const b = e.target.closest('.tab'); if (b) selectTab(b.dataset.tab, false); });
    rail.addEventListener('keydown', (e) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const i = TABS.findIndex((x) => x.key === tab), rtl = html.dir === 'rtl';
      let j = e.key === 'Home' ? 0 : e.key === 'End' ? TABS.length - 1 : i + ((e.key === 'ArrowRight') !== rtl ? 1 : -1);
      selectTab(TABS[(j + TABS.length) % TABS.length].key, true);
    });
  }

  // ---------- menu page: every category, a search box and a scroll spy on the rail ----------
  const norm = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[̀-ͯ]/g, '');
  let query = '';
  const hit = (i, q) => !q || norm(i.en + ' ' + i.ar + ' ' + i.den + ' ' + i.dar).includes(q);
  function renderMenuPage(animate) {
    if (page !== 'menu') return;
    const cats = $('#cats'); if (!cats) return;
    const q = norm(query.trim());
    let shown = 0, n = 0;
    cats.innerHTML = TABS.map((x) => {
      const items = x.items.filter((i) => hit(i, q));
      if (!items.length) return '';
      shown += items.length;
      return `<section class="cat" id="cat-${esc(x.key)}" aria-labelledby="h-${esc(x.key)}">
        <div class="cat-head"><h2 class="display" id="h-${esc(x.key)}">${esc(x.cat ? x.cat[lang] : t('sig'))}</h2><span class="count">${t('mn_count', { n: items.length })}</span></div>
        <div class="grid${animate && !reduce ? ' swap' : ''}">${items.map((item) => cardHtml(item, n++)).join('')}</div>
      </section>`;
    }).join('');
    $('#empty').hidden = shown > 0;
    const r = $('#rail');
    r.innerHTML = TABS.filter((x) => x.items.some((i) => hit(i, q))).map((x, k) => `<button class="tab" type="button" data-cat="${esc(x.key)}" aria-current="${k === 0 ? 'true' : 'false'}">${esc(x.cat ? x.cat[lang] : t('sig'))}<small>${x.items.filter((i) => hit(i, q)).length}</small></button>`).join('');
    guard(cats); spy();
  }
  if (page === 'menu') {
    $('#q').addEventListener('input', (e) => { query = e.target.value; renderMenuPage(true); });
    $('#rail').addEventListener('click', (e) => {
      const b = e.target.closest('.tab'); if (!b) return;
      const sec = $('#cat-' + CSS.escape(b.dataset.cat)); if (sec) sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
    const totop = $('#totop');
    addEventListener('scroll', () => { totop.classList.toggle('show', scrollY > 900); spy(); }, { passive: true });
    totop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  }
  let spyTick = false;
  function spy() {
    if (page !== 'menu' || spyTick) return; spyTick = true;
    requestAnimationFrame(() => {
      spyTick = false;
      const line = parseInt(getComputedStyle(html).getPropertyValue('--head')) + 64;
      let cur = null;
      $$('.cat').forEach((s) => { if (s.getBoundingClientRect().top <= line + 8) cur = s; });
      if (!cur) cur = $('.cat');
      $$('#rail .tab').forEach((b) => {
        const on = !!cur && b.dataset.cat === cur.id.slice(4);
        if (on !== (b.getAttribute('aria-current') === 'true')) b.setAttribute('aria-current', String(on));
        if (on) { const p = b.parentElement, r = b.getBoundingClientRect(), pr = p.getBoundingClientRect(); if (r.left < pr.left || r.right > pr.right) p.scrollTo({ left: b.offsetLeft - pr.width / 2 + r.width / 2, behavior: reduce ? 'auto' : 'smooth' }); }
      });
    });
  }

  // ---------- order again: the last basket sent to checkout from this phone ----------
  function renderAgain() {
    const box = $('#again'); if (!box) return;
    let last = null;
    try { last = JSON.parse(store.get('mankal-last') || 'null'); } catch (e) { last = null; }
    const ids = last && last.items ? Object.keys(last.items).filter((id) => byId[id]) : [];
    if (!ids.length || store.get('mankal-again-off') === '1') { box.hidden = true; return; }
    const n = ids.reduce((a, id) => a + last.items[id], 0), sum = ids.reduce((a, id) => a + byId[id].price * last.items[id], 0);
    const names = ids.slice(0, 3).map((id) => `${last.items[id]} × ${byId[id][lang]}`).join(' · ') + (ids.length > 3 ? ' …' : '');
    box.innerHTML = `<div class="again-card"><span class="glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></span>
      <h2>${t('again_title')}</h2><p>${esc(t('again_p', { n: n === 1 ? t('bk_item') : t('bk_items', { n }), t: num(sum) }))}<br>${esc(names)}</p>
      <div class="acts"><button class="btn btn-red btn-small" type="button" id="again-add">${t('again_btn')}</button><button class="btn btn-line btn-small" type="button" id="again-off">${t('again_hide')}</button></div></div>`;
    box.hidden = false;
    $('#again-add').addEventListener('click', (e) => {
      ids.forEach((id) => { basket[id] = Math.min(20, (basket[id] || 0) + last.items[id]); syncControls(id); });
      saveBasket(); renderBasket(); bump(); fly(e.currentTarget); e.currentTarget.textContent = t('again_done');
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
    const bt = $('#bar-total'), bl = $('#bar-label');
    if (bt) { bt.innerHTML = n ? `${num(total())}<small>${t('jd')}</small>` : ''; bt.hidden = !n; bl.hidden = !!n; $('#bar-basket').setAttribute('aria-label', n ? `${t('bar_basket')}: ${n === 1 ? t('bk_item') : t('bk_items', { n })}, ${num(total())} ${t('jd')}` : t('bar_basket')); }
    const ids = Object.keys(basket), bodyEl = $('#bk-body'), foot = $('#bk-foot');
    $('#bk-count').textContent = n ? (n === 1 ? t('bk_item') : t('bk_items', { n })) : '';
    if (!ids.length) {
      handover = false;
      bodyEl.innerHTML = `<div class="bk-empty"><b>${t('bk_empty')}</b><p class="note">${t('bk_empty_p')}</p><a class="btn btn-red" href="${page === 'home' ? '#menu' : 'menu.html'}" data-close-basket>${t('bk_browse')}</a></div>`;
      foot.innerHTML = ''; return;
    }
    if (handover) {
      const first = byId[ids[0]];
      bodyEl.innerHTML = `<div class="ho"><h3 class="display">${t('ho_title')}</h3><p>${t('ho_p')}</p>
        <p class="ho-mode">${esc(t('ho_mode', { m: modeName(), b: brName() }))}</p>
        <div class="ho-list"><b>${t('ho_list')}</b><ul>${ids.map((id) => `<li><span>${basket[id]} × ${esc(byId[id][lang])}</span><span>${num(byId[id].price * basket[id])} ${t('jd')}</span></li>`).join('')}</ul></div>
        <p class="note">${t('ho_note')}</p>
        <div class="ho-actions"><a class="btn btn-red" id="ho-go" href="${esc(storeUrl(first))}" target="_blank" rel="noopener">${t('ho_go')}</a><button class="btn btn-line" type="button" id="ho-copy">${t('ho_copy')}</button><button class="btn btn-line" type="button" id="ho-back">${t('ho_back')}</button></div></div>`;
      foot.innerHTML = '';
      $('#ho-go').addEventListener('click', () => { store.set('mankal-last', JSON.stringify({ items: basket, at: Date.now() })); store.set('mankal-again-off', ''); });
      $('#ho-back').addEventListener('click', () => { handover = false; renderBasket(); const go = $('#bk-go'); if (go) go.focus(); });
      $('#ho-copy').addEventListener('click', (e) => {
        const text = ids.map((id) => `${basket[id]} × ${byId[id][lang]}`).join('\n') + `\n${t('bk_total')}: ${num(total())} ${t('jd')}\n${modeName()} · ${brName()}`;
        const btn = e.currentTarget, done = () => { btn.textContent = t('ho_copied'); setTimeout(() => { btn.textContent = t('ho_copy'); }, 1800); };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
      });
      return;
    }
    bodyEl.innerHTML = `<div class="bk-mode"><div class="seg" role="group" aria-label="${esc(t('mode_aria'))}"><button type="button" data-mode="delivery" aria-pressed="${mode === 'delivery'}">${t('delivery')}</button><button type="button" data-mode="pickup" aria-pressed="${mode === 'pickup'}">${t('pickup')}</button></div>
      <div class="seg" role="group" aria-label="${esc(t('bk_branch'))}"><button type="button" data-branch="gardens" aria-pressed="${branch === 'gardens'}">${t('br_gardens')}</button><button type="button" data-branch="sweifieh" aria-pressed="${branch === 'sweifieh'}">${t('br_sweifieh')}</button></div></div>` +
      ids.map((id) => { const it = byId[id], p = photoOf(it); return `<div class="bk-line">
        <div class="thumb">${p && p.own ? `<img src="assets/img/s/${p.own}-480.webp" alt="" loading="lazy">` : p && p.store ? `<img src="${esc(p.store)}" alt="" loading="lazy">` : ''}</div>
        <div><p class="name">${esc(it[lang])}</p><span class="each">${num(it.price)} ${t('jd')}</span></div>
        <span data-ctl="${id}">${controlHtml(id)}</span></div>`; }).join('');
    foot.innerHTML = `<div class="bk-total"><span>${t('bk_total')}</span><span class="price">${num(total())}<small>${t('jd')}</small></span></div><button class="btn btn-red" type="button" id="bk-go">${t('bk_checkout')}</button><button class="bk-clear" type="button" id="bk-clear">${t('bk_clear')}</button><p class="note">${t('bk_note')}</p>`;
    $('#bk-go').addEventListener('click', () => { handover = true; renderBasket(); $('#ho-go').focus(); });
    $('#bk-clear').addEventListener('click', () => { Object.keys(basket).forEach((id) => { delete basket[id]; syncControls(id); }); saveBasket(); renderBasket(); });
  }
  function trap(e, root) {
    if (e.key !== 'Tab') return;
    const f = $$('a[href], button:not([disabled]), input', root).filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
  function openBasket() { lastFocus = document.activeElement; handover = false; renderBasket(); drawer.hidden = false; body.classList.add('modal-open'); requestAnimationFrame(() => { drawer.classList.add('open'); $('.x', drawer).focus(); }); }
  function closeBasket() { if (drawer.hidden) return; drawer.classList.remove('open'); body.classList.remove('modal-open'); setTimeout(() => { drawer.hidden = true; }, reduce ? 0 : 300); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  $$('#basket-btn, #bar-basket').forEach((b) => b.addEventListener('click', openBasket));
  drawer.addEventListener('keydown', (e) => trap(e, drawer));
  document.addEventListener('click', (e) => { if (e.target.closest('[data-close-basket]')) closeBasket(); });

  // ---------- which branch? ----------
  const sheet = $('#sheet'); let sheetFocus = null;
  function openSheet() { sheetFocus = document.activeElement; sheet.hidden = false; body.classList.add('modal-open'); requestAnimationFrame(() => { sheet.classList.add('open'); $('.sb .btn', sheet).focus(); }); }
  function closeSheet() { if (sheet.hidden) return; sheet.classList.remove('open'); body.classList.remove('modal-open'); setTimeout(() => { sheet.hidden = true; }, reduce ? 0 : 300); if (sheetFocus && sheetFocus.focus) sheetFocus.focus(); }
  document.addEventListener('click', (e) => { if (e.target.closest('[data-call]')) openSheet(); else if (e.target.closest('[data-close-sheet]')) closeSheet(); });
  sheet.addEventListener('keydown', (e) => trap(e, sheet));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeSheet(); closeBasket(); } });

  // ---------- opening hours: an open-now line once Al Mankal confirms them (Amman time) ----------
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
      if (!week) { el.className = 'hours tbc'; span.textContent = t('hours_tbc'); return; }
      const now = ammanNow(), today = week[now.day], yest = week[(now.day + 6) % 7];
      let open = false, until = 0;
      if (today && now.min >= today[0] && now.min < today[1]) { open = true; until = today[1]; }
      else if (yest && yest[1] > 1440 && now.min < yest[1] - 1440) { open = true; until = yest[1]; }
      el.className = 'hours ' + (open ? 'open' : 'closed');
      span.textContent = open ? t('open_now', { t: hhmm(until) }) : t('closed_now', { t: today ? hhmm(today[0]) : '—' });
    });
  }

  // ---------- reels ----------
  const reelIO = hasIO ? new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const v = $('video', en.target); if (!v) return;
      if (en.isIntersecting && en.intersectionRatio >= .55) { if (!v.src) v.src = v.dataset.src; const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause();
    });
  }, { threshold: [0, .55] }) : null;
  function renderReels() {
    const row = $('#reels'); if (!row) return;
    row.innerHTML = REELS.map((r) => `<figure class="reel">
        <video playsinline muted loop preload="none" poster="assets/img/s/${r.file}.webp" data-src="assets/video/${r.file}.mp4" aria-label="${esc(r[lang])}"></video>
        <button class="reel-play" type="button" aria-label="${esc(t('reels_play'))}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>
        <figcaption>${esc(r[lang])}</figcaption>
        <button class="reel-sound" type="button" aria-label="${esc(t('reels_sound_off'))}" aria-pressed="false"><svg class="off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m23 9-6 6M17 9l6 6"/></svg><svg class="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg></button>
      </figure>`).join('');
    $$('.reel', row).forEach((fig) => {
      const v = $('video', fig);
      v.addEventListener('playing', () => fig.classList.add('playing'));
      v.addEventListener('pause', () => fig.classList.remove('playing'));
      $('.reel-play', fig).addEventListener('click', () => { if (!v.src) v.src = v.dataset.src; if (v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause(); });
      $('.reel-sound', fig).addEventListener('click', (e) => {
        const on = !fig.classList.contains('sound');
        $$('.reel', row).forEach((o) => { if (o !== fig) { o.classList.remove('sound'); $('video', o).muted = true; $('.reel-sound', o).setAttribute('aria-pressed', 'false'); } });
        fig.classList.toggle('sound', on); v.muted = !on; e.currentTarget.setAttribute('aria-pressed', String(on)); e.currentTarget.setAttribute('aria-label', t(on ? 'reels_sound_on' : 'reels_sound_off'));
        if (on && v.paused) { if (!v.src) v.src = v.dataset.src; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      });
      if (reelIO && !reduce) reelIO.observe(fig);
    });
    const follow = $('#follow'); if (follow && BUSINESS.instagram) follow.href = BUSINESS.instagram;
  }

  // ---------- reveals: .ap rises once; the year counts up; words in a split heading rise in turn ----------
  const io = hasIO ? new IntersectionObserver((entries) => {
    const batch = entries.filter((en) => en.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
    batch.forEach((en, i) => {
      const el = en.target;
      if (el.classList.contains('ap') && !el.classList.contains('d1') && !el.classList.contains('d2') && !el.classList.contains('d3') && !el.classList.contains('d4')) el.style.transitionDelay = Math.min(i, 5) * 70 + 'ms';
      el.classList.add('in');
      if (el.dataset.count) countUp(el);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 }) : null;
  function watch(root) { $$('.ap, [data-count]', root).forEach((el) => { if (el.classList.contains('in')) return; if (io) io.observe(el); else { el.classList.add('in'); if (el.dataset.count) el.textContent = el.dataset.count; } }); }
  function countUp(el) {
    const end = +el.dataset.count, from = end - 60;
    if (reduce) { el.textContent = String(end); return; }
    const t0 = performance.now(), dur = 1500;
    const step = (now) => { const u = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - u, 3); el.textContent = String(Math.round(from + (end - from) * e)); if (u < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  // A heading marked data-split gets each word in its own span, so they can rise one after another.
  function split(el) { el.innerHTML = el.textContent.split(' ').map((w, i) => `<span class="w ap" style="transition-delay:${i * 90}ms">${esc(w)}</span>`).join(' '); }

  // ---------- language ----------
  function applyLang() {
    T = TEXT[lang];
    html.lang = lang; html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    store.set('mankal-lang', lang);
    $$('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t); });
    $$('[data-t-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.tAria)); });
    $$('[data-t-alt]').forEach((el) => { el.alt = t(el.dataset.tAlt); });
    $$('[data-t-ph]').forEach((el) => { el.placeholder = t(el.dataset.tPh); });
    $$('[data-map-title]').forEach((el) => { el.title = t('bp_map_title', { b: t(el.dataset.mapTitle === 'sweifieh' ? 'br_sweifieh' : 'br_gardens') }); });
    $$('[data-split]').forEach((el) => { split(el); watch(el); });
    const titles = { home: 'title_home', menu: 'title_menu', branches: 'title_branches', franchise: 'title_franchise' };
    if (titles[page]) document.title = t(titles[page]);
    renderRail(); renderGrid(false); renderMenuPage(false); renderAgain(); renderBasket(); renderHours(); renderReels(); syncChoices();
  }
  $('#lang').addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; applyLang(); });

  // ---------- header line ----------
  const onScroll = () => body.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // ---------- the hero photo answers the pointer with a slow tilt (a lerp, never 1:1); on phones it drifts with the scroll ----------
  const heroImg = $('.hero .ph img'), heroPh = $('.hero-photo');
  if (heroImg && fine && !reduce) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const ease = () => { cx += (tx - cx) * .08; cy += (ty - cy) * .08; heroImg.style.transform = `scale(1.06) translate(${cx}px, ${cy}px)`; if (Math.abs(tx - cx) > .05 || Math.abs(ty - cy) > .05) raf = requestAnimationFrame(ease); else raf = 0; };
    heroImg.addEventListener('animationend', () => {
      heroPh.addEventListener('pointermove', (e) => { const r = heroPh.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - .5) * -18; ty = ((e.clientY - r.top) / r.height - .5) * -18; if (!raf) raf = requestAnimationFrame(ease); });
      heroPh.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(ease); });
    }, { once: true });
  }

  // ---------- the fire band: the grill loop and the embers, only while on screen ----------
  const fire = $('.fire');
  if (fire) {
    const fv = $('#fire-video', fire), canvas = $('canvas', fire);
    const tall = innerWidth / innerHeight < .9, file = tall ? 'grill-tall' : 'grill-wide';
    fv.poster = `assets/img/s/${file}.webp`;
    const src = fv.canPlayType('video/mp4; codecs="avc1.4d401e"') ? `assets/video/${file}.mp4` : `assets/video/${file}.webm`;
    const play = () => { if (!fv.src) fv.src = src; const p = fv.play(); if (p && p.catch) p.catch(() => {}); };
    // Embers: they are born in the glow at the foot of the band, rise on a slow wind, flicker, and cool from white-gold to red as they fade.
    // A few heavier sparks tumble up more slowly. Everything is drawn on one canvas with additive light, so overlapping embers brighten.
    const ex = canvas.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 1.5), phone = innerWidth < 900;
    let W = 0, H = 0, embers = [], running = false, last = 0, bellow = 0, wind = 0, windTarget = 0;
    const rnd = (a, b) => a + Math.random() * (b - a);
    function size() { const r = fire.getBoundingClientRect(); W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height)); canvas.width = W * dpr; canvas.height = H * dpr; ex.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function born() {
      const heavy = Math.random() < .12, cx = W * .5 + (Math.random() - .5) * (Math.random() - .5) * W * 1.6;
      return { x: Math.min(W - 4, Math.max(4, cx)), y: H + rnd(0, 14), vx: rnd(-.1, .1), vy: heavy ? -rnd(.22, .45) : -rnd(.45, 1.15), life: 0, max: heavy ? rnd(4500, 7500) : rnd(2400, 5200), s: heavy ? rnd(2.2, 3.4) : rnd(.9, 2.2), ph: rnd(0, 6.28), fl: rnd(.004, .012), sw: rnd(.5, 1.6), heavy };
    }
    function frame(time) {
      if (!running) return;
      const dt = Math.min(48, time - (last || time)); last = time;
      bellow *= Math.pow(.3, dt / 1000);
      if (Math.random() < dt / 2600) windTarget = rnd(-.35, .35);
      wind += (windTarget - wind) * dt / 1800;
      const rate = (phone ? 11 : 20) + bellow * 50, cap = phone ? 60 : 130;
      let n = rate * dt / 1000; while (n > 0 && embers.length < cap) { if (n >= 1 || Math.random() < n) embers.push(born()); n -= 1; }
      ex.clearRect(0, 0, W, H);
      ex.globalCompositeOperation = 'lighter';
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i]; e.life += dt;
        if (e.life > e.max || e.y < -12) { embers.splice(i, 1); continue; }
        const u = e.life / e.max, k = dt / 16;
        e.x += (e.vx + wind * (e.heavy ? .5 : 1) + Math.sin(time * .0011 * e.sw + e.ph) * (e.heavy ? .12 : .26)) * k;
        e.y += e.vy * (1 - u * .4) * k;
        const flick = .72 + .28 * Math.sin(time * e.fl * 6.28 + e.ph);
        const a = (u < .1 ? u / .1 : 1 - (u - .1) / .9) * flick, sz = e.s * (1 - u * .45);
        const r = 255, g = Math.round(225 - u * 150), b = Math.round(120 - u * 110);
        ex.fillStyle = `rgba(${r},${g},${b},${a})`;
        ex.beginPath(); ex.arc(e.x, e.y, sz, 0, 6.2832); ex.fill();
        if (sz > 1.3) {
          const halo = ex.createRadialGradient(e.x, e.y, 0, e.x, e.y, sz * (e.heavy ? 5 : 3.6));
          halo.addColorStop(0, `rgba(255,${Math.round(170 - u * 60)},40,${a * .32})`); halo.addColorStop(1, 'rgba(255,120,30,0)');
          ex.fillStyle = halo; ex.beginPath(); ex.arc(e.x, e.y, sz * (e.heavy ? 5 : 3.6), 0, 6.2832); ex.fill();
        }
      }
      ex.globalCompositeOperation = 'source-over';
      requestAnimationFrame(frame);
    }
    function start() { if (running || reduce || document.hidden) return; running = true; last = 0; bellow = .6; requestAnimationFrame(frame); }
    function stop() { running = false; }
    if (hasIO && !reduce) {
      let near = false;
      new IntersectionObserver((en) => { en.forEach((x) => { near = x.isIntersecting; if (near) { size(); start(); play(); } else { stop(); fv.pause(); } }); }, { rootMargin: '80px 0px' }).observe(fire);
      addEventListener('resize', () => { if (near) size(); });
      document.addEventListener('visibilitychange', () => { if (document.hidden) { stop(); fv.pause(); } else if (near) { start(); play(); } });
    }
  }

  // ---------- the entry: the logo burns in once per tab, then the curtain lifts and the page assembles (body.lit) ----------
  const intro = $('#intro');
  const light = () => body.classList.add('lit');
  if (intro && !session.get('mankal-intro')) {
    body.classList.add('intro-wait');
    const hold = reduce ? 880 : 1780, gone = reduce ? 500 : 800;
    const go = () => {
      intro.classList.add('burn');
      setTimeout(() => { intro.classList.add('lift'); body.classList.remove('intro-wait'); light(); session.set('mankal-intro', '1'); }, hold);
      setTimeout(() => intro.classList.add('gone'), hold + gone);
    };
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(go, 80)));
  } else {
    if (intro) intro.classList.add('gone');
    requestAnimationFrame(light);
  }

  applyLang();
  watch(document);
})();
