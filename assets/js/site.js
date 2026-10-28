// AL MANKAL round 2: language, the entry, the grill hero, the basket, the branch sheet, plates, menu, reels, reveals.
// Reads TEXT, BUSINESS, PHOTOS, SIGNATURE and REELS from content.js and MENU/STORE from menu-data.js. No frameworks, no trackers.
(function () {
  'use strict';
  const html = document.documentElement, body = document.body;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const page = body.dataset.page || '';
  let lang = html.lang === 'ar' ? 'ar' : 'en';
  let T = TEXT[lang];
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const session = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };

  // ---------- words ----------
  function t(key, vars) {
    let s = T[key] != null ? T[key] : (TEXT.en[key] != null ? TEXT.en[key] : key);
    if (vars) Object.keys(vars).forEach((k) => { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => `<span class="price">${n.toFixed(2)}<small>${t('jd')}</small></span>`;
  function applyLang() {
    T = TEXT[lang];
    html.lang = lang; html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    store.set('mankal-lang', lang);
    $$('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t); });
    $$('[data-ph]').forEach((el) => { el.placeholder = t(el.dataset.ph); });
    $$('[data-t-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.tAria)); });
    $$('[data-map-title]').forEach((el) => { el.title = t('bp_map_title', { b: t(el.dataset.mapTitle === 'Gardens' ? 'br_gardens' : 'br_sweifieh') }); });
    const titles = { home: 'title_home', menu: 'title_menu', branches: 'title_branches', franchise: 'title_franchise' };
    if (titles[page]) document.title = t(titles[page]);
    const burger = $('#burger'); if (burger) burger.setAttribute('aria-label', t(body.classList.contains('nav-open') ? 'menu_close' : 'menu_open'));
    renderPlates(); renderSigRow(); renderMenu(); renderReels(); renderBasket();
  }
  const langBtn = $('#lang');
  if (langBtn) langBtn.addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; applyLang(); });

  // ---------- header ----------
  const burger = $('#burger'), nav = $('#nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = !body.classList.contains('nav-open');
      body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', t(open ? 'menu_close' : 'menu_open'));
    });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) { body.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); } });
  }
  function onScrollHeader() { body.classList.toggle('scrolled', scrollY > 24); }
  addEventListener('scroll', onScrollHeader, { passive: true }); onScrollHeader();

  // ---------- branch and the dish photos ----------
  let branch = store.get('mankal-branch') === 'sweifieh' ? 'sweifieh' : 'gardens';
  const byId = {}; MENU.forEach((c) => c.items.forEach((i) => { byId[i.id] = i; }));
  // Links marked data-branch-pick choose a branch on the way to the menu.
  document.addEventListener('click', (e) => { const a = e.target.closest('[data-branch-pick]'); if (a) setBranch(a.dataset.branchPick, false); });
  function setBranch(b, rerender) {
    branch = b === 'sweifieh' ? 'sweifieh' : 'gardens'; store.set('mankal-branch', branch);
    $$('.seg button[data-branch]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.branch === branch)));
    const note = $('#branch-note'); if (note) note.hidden = branch !== 'sweifieh';
    if (rerender !== false) renderBasket();
  }
  // The restaurant's own photo first (Instagram, local), then the store's photo (CDN, on white), then a coal plate with the name.
  function photo(item, size) {
    if (SAME_DISH[item.id] && byId[SAME_DISH[item.id]]) item = Object.assign({}, byId[SAME_DISH[item.id]], { id: item.id });
    const own = PHOTOS[item.id];
    if (own) return { src: `assets/img/ig/${own}${size === 'm' ? '-m' : ''}.jpg`, cls: 'own' };
    if (item.img) return { src: item.img, cls: 'store' };
    return null;
  }
  function mediaHtml(item, cls, size) {
    const p = photo(item, size);
    if (p) return `<div class="${cls}"><img class="${p.cls}" src="${esc(p.src)}" alt="" loading="lazy" decoding="async"></div>`;
    return `<div class="${cls} coal" aria-hidden="true"><span>${esc(item[lang])}</span></div>`;
  }
  function chipsHtml(item) {
    const out = [];
    if (item.label && item.label[lang]) out.push(`<span class="chip">${esc(item.label[lang])}</span>`);
    if (item.spicy) out.push(`<span class="chip hot">${t('mn_spicy')}</span>`);
    if (item.off) out.push(`<span class="chip off">${t('mn_off')}</span>`);
    return out.length ? `<div class="chips">${out.join('')}</div>` : '';
  }
  // If a store photo fails to load (offline, blocked), the card falls back to the coal plate.
  function guardImages(root) {
    $$('img', root).forEach((img) => {
      const fail = () => { const m = img.parentElement, card = img.closest('.plate, .dish, .bk-line'), name = card && $('h3, .name', card); m.classList.add('coal'); m.innerHTML = `<span>${name ? esc(name.textContent) : ''}</span>`; };
      if (img.complete && img.naturalWidth === 0) fail(); else img.addEventListener('error', fail, { once: true });
    });
  }

  // ---------- the basket ----------
  let basket = {};
  try { basket = JSON.parse(store.get('mankal-basket') || '{}') || {}; } catch (e) { basket = {}; }
  Object.keys(basket).forEach((id) => { if (!byId[id] || !(basket[id] > 0)) delete basket[id]; });
  const count = () => Object.values(basket).reduce((a, b) => a + b, 0);
  const total = () => Object.keys(basket).reduce((a, id) => a + byId[id].price * basket[id], 0);
  function saveBasket() { store.set('mankal-basket', JSON.stringify(basket)); }
  function setQty(id, q, from) {
    const was = basket[id] || 0;
    if (q > 0) basket[id] = Math.min(20, q); else delete basket[id];
    saveBasket(); syncControls(id); renderBasket();
    if (q > was) { bumpBadge(); if (from) fly(from); }
  }
  function controlHtml(id) {
    const q = basket[id] || 0;
    if (!q) return `<button class="add" type="button" data-add="${id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><span>${t('add_btn')}</span></button>`;
    return `<div class="stepper" role="group" aria-label="${esc(t('qty'))}"><button type="button" data-less="${id}" aria-label="${esc(t('less'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg></button><span class="q">${q}</span><button type="button" data-more="${id}" aria-label="${esc(t('more'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></div>`;
  }
  function syncControls(id) { $$(`[data-ctl="${id}"]`).forEach((el) => { el.innerHTML = controlHtml(id); }); }
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]'), more = e.target.closest('[data-more]'), less = e.target.closest('[data-less]');
    if (add) { add.classList.add('flash'); setQty(add.dataset.add, 1, add); }
    else if (more) setQty(more.dataset.more, (basket[more.dataset.more] || 0) + 1, more);
    else if (less) setQty(less.dataset.less, (basket[less.dataset.less] || 0) - 1);
  });
  function bumpBadge() { $$('#basket-count, #bar-count').forEach((b) => { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }); }
  // A dot flies from the button to the basket in the header.
  function fly(from) {
    if (reduce) return;
    const to = $('#basket-btn'); if (!to) return;
    const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    const dot = document.createElement('i'); dot.className = 'fly';
    dot.style.left = (a.left + a.width / 2 - 7) + 'px'; dot.style.top = (a.top + a.height / 2 - 7) + 'px';
    document.body.appendChild(dot);
    requestAnimationFrame(() => { dot.style.transform = `translate(${b.left + b.width / 2 - (a.left + a.width / 2)}px, ${b.top + b.height / 2 - (a.top + a.height / 2)}px) scale(.4)`; dot.style.opacity = '0'; });
    setTimeout(() => dot.remove(), 620);
  }
  // The store URL the checkout hands over to. Every Gardens dish has its own page; Sweifieh pages are CONFIRM, so that store opens at its front.
  function storeUrl(item) { return branch === 'gardens' ? `${STORE.gardens}/products/${item.slug}` : `${STORE.sweifieh}/#_branch119270`; }
  let handover = false, lastFocus = null;
  const drawer = $('#basket');
  function renderBasket() {
    const n = count();
    $$('#basket-count, #bar-count').forEach((b) => { b.textContent = String(n); b.hidden = n === 0; });
    if (!drawer) return;
    const ids = Object.keys(basket), bodyEl = $('#bk-body'), foot = $('#bk-foot');
    $('#bk-count').textContent = n ? (n === 1 ? t('bk_item') : t('bk_items', { n })) : '';
    if (!ids.length) {
      handover = false;
      bodyEl.innerHTML = `<div class="bk-empty"><div class="glyph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h18l-1.6 9.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8L3 10z"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div><b>${t('bk_empty')}</b><p>${t('bk_empty_p')}</p><a class="btn btn-ember" href="menu.html" data-close-basket>${t('bk_browse')}</a></div>`;
      foot.innerHTML = ''; return;
    }
    if (handover) {
      const first = byId[ids[0]];
      bodyEl.innerHTML = `<div class="ho"><h3 class="display">${t('ho_title')}</h3><p>${t('ho_p')}</p>
        <div class="ho-list"><b>${t('ho_list')}</b><ul>${ids.map((id) => `<li><span>${basket[id]} × ${esc(byId[id][lang])}</span><span>${(byId[id].price * basket[id]).toFixed(2)} ${t('jd')}</span></li>`).join('')}</ul></div>
        <p class="note">${t('ho_note')}</p>
        <div class="ho-actions"><a class="btn btn-ember" id="ho-go" href="${esc(storeUrl(first))}" target="_blank" rel="noopener">${t('ho_go')}</a><button class="btn btn-bone" type="button" id="ho-copy">${t('ho_copy')}</button><button class="btn btn-bone" type="button" id="ho-back">${t('ho_back')}</button></div></div>`;
      foot.innerHTML = '';
      $('#ho-back').addEventListener('click', () => { handover = false; renderBasket(); });
      $('#ho-copy').addEventListener('click', (e) => {
        const text = ids.map((id) => `${basket[id]} × ${byId[id][lang]}`).join('\n') + `\n${t('bk_total')}: ${total().toFixed(2)} ${t('jd')}`;
        const done = () => { e.target.textContent = t('ho_copied'); setTimeout(() => { e.target.textContent = t('ho_copy'); }, 1800); };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
      });
      return;
    }
    bodyEl.innerHTML = `<div class="bk-branch"><span>${t('bk_branch')}</span><div class="seg" role="group"><button type="button" data-branch="gardens" aria-pressed="${branch === 'gardens'}">${t('br_gardens')}</button><button type="button" data-branch="sweifieh" aria-pressed="${branch === 'sweifieh'}">${t('br_sweifieh')}</button></div></div>` +
      ids.map((id) => { const it = byId[id], p = photo(it, 'm'); return `<div class="bk-line">
        ${p ? `<div class="thumb"><img class="${p.cls}" src="${esc(p.src)}" alt="" loading="lazy"></div>` : `<div class="thumb coal"><span>${esc(it[lang])}</span></div>`}
        <div><p class="name">${esc(it[lang])}</p><span class="each">${it.price.toFixed(2)} ${t('jd')}</span></div>
        <div class="col"><span class="sum">${(it.price * basket[id]).toFixed(2)}</span><span data-ctl="${id}">${controlHtml(id)}</span></div></div>`; }).join('');
    foot.innerHTML = `<div class="bk-total"><span>${t('bk_total')}</span>${money(total())}</div><button class="btn btn-ember" type="button" id="bk-go">${t('bk_checkout')}</button><button class="bk-clear" type="button" id="bk-clear">${t('bk_clear')}</button><p class="note">${t('bk_note')}</p>`;
    $('#bk-go').addEventListener('click', () => { handover = true; renderBasket(); $('#ho-go').focus(); });
    $('#bk-clear').addEventListener('click', () => { Object.keys(basket).forEach((id) => { delete basket[id]; syncControls(id); }); saveBasket(); renderBasket(); });
    guardImages(bodyEl);
  }
  function openBasket() { if (!drawer) return; lastFocus = document.activeElement; handover = false; renderBasket(); drawer.hidden = false; body.classList.add('modal-open'); requestAnimationFrame(() => { drawer.classList.add('open'); const f = $('.drawer-panel .x', drawer); if (f) f.focus(); }); }
  function closeBasket() { if (!drawer || drawer.hidden) return; drawer.classList.remove('open'); body.classList.remove('modal-open'); setTimeout(() => { drawer.hidden = true; }, reduce ? 0 : 380); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  $$('#basket-btn, #bar-basket').forEach((b) => b.addEventListener('click', openBasket));
  document.addEventListener('click', (e) => { if (e.target.closest('[data-close-basket]')) closeBasket(); const seg = e.target.closest('.drawer .seg [data-branch]'); if (seg) setBranch(seg.dataset.branch); });

  // ---------- which branch? ----------
  const sheet = $('#sheet');
  let sheetFocus = null;
  function openSheet() { if (!sheet) return; sheetFocus = document.activeElement; sheet.hidden = false; body.classList.add('modal-open'); requestAnimationFrame(() => { sheet.classList.add('open'); const f = $('.sheet-panel .btn', sheet); if (f) f.focus(); }); }
  function closeSheet() { if (!sheet || sheet.hidden) return; sheet.classList.remove('open'); body.classList.remove('modal-open'); setTimeout(() => { sheet.hidden = true; }, reduce ? 0 : 360); if (sheetFocus && sheetFocus.focus) sheetFocus.focus(); }
  document.addEventListener('click', (e) => { if (e.target.closest('[data-call]')) openSheet(); else if (e.target.closest('[data-close-sheet]')) closeSheet(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeSheet(); closeBasket(); } });

  // ---------- home: the signature plates ----------
  function plateHtml(item, n, cls) {
    return `<article class="${cls} pop">
        ${mediaHtml(item, cls === 'plate' ? 'plate-media' : 'dish-media', n === 0 && cls === 'plate' ? '' : 'm')}
        <div class="${cls === 'plate' ? 'plate-body' : 'dish-body'}">
          <h3 class="display">${esc(item[lang])}</h3>
          ${item['d' + lang] ? `<p class="desc">${esc(item['d' + lang])}</p>` : ''}
          ${chipsHtml(item)}
          <div class="${cls === 'plate' ? 'plate-foot' : 'dish-foot'}">${money(item.price)}<span data-ctl="${item.id}">${controlHtml(item.id)}</span></div>
        </div>
      </article>`;
  }
  function renderPlates() {
    const grid = $('#plates'); if (!grid) return;
    grid.innerHTML = SIGNATURE.map((id) => byId[id]).filter(Boolean).map((item, n) => plateHtml(item, n, 'plate').replace('class="plate pop"', n === 0 ? 'class="plate feature pop"' : 'class="plate pop"')).join('');
    guardImages(grid); watchReveals(grid);
  }
  function renderSigRow() {
    const row = $('#sig-row'); if (!row) return;
    row.innerHTML = SIGNATURE.map((id) => byId[id]).filter(Boolean).map((item, n) => plateHtml(item, n, 'dish sig-card')).join('');
    guardImages(row); watchReveals(row);
  }

  // ---------- menu page ----------
  const norm = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[̀-ͯ]/g, '');
  let query = '';
  function renderMenu() {
    const cats = $('#cats'); if (!cats) return;
    const q = norm(query.trim());
    let shown = 0;
    cats.innerHTML = MENU.map((c) => {
      const items = c.items.filter((i) => !q || norm(i.en + ' ' + i.ar + ' ' + i.den + ' ' + i.dar).includes(q));
      if (!items.length) return '';
      shown += items.length;
      return `<section class="cat" id="cat-${esc(c.key)}" aria-labelledby="h-${esc(c.key)}">
        <div class="cat-head"><h2 class="display" id="h-${esc(c.key)}">${esc(c[lang])}</h2><span class="count">${t('mn_count', { n: items.length })}</span></div>
        <div class="dishes">${items.map((item) => plateHtml(item, 1, 'dish').replace('class="dish pop"', item.off ? 'class="dish off pop"' : 'class="dish pop"')).join('')}</div>
      </section>`;
    }).join('');
    $('#empty').hidden = shown > 0;
    const sig = $('.sig-row-head'); if (sig) sig.hidden = !!q; const row = $('#sig-row'); if (row) row.hidden = !!q;
    guardImages(cats); watchReveals(cats);
    const tabs = $('#tabs');
    tabs.innerHTML = MENU.filter((c) => !q || c.items.some((i) => norm(i.en + ' ' + i.ar + ' ' + i.den + ' ' + i.dar).includes(q)))
      .map((c, n) => `<button class="tab" type="button" role="tab" data-cat="${esc(c.key)}" aria-current="${n === 0 ? 'true' : 'false'}">${esc(c[lang])}</button>`).join('');
    setBranch(branch, false);
    spy();
  }
  const menuPage = $('#cats');
  if (menuPage) {
    $('#q').addEventListener('input', (e) => { query = e.target.value; renderMenu(); });
    $('.page-hero .seg').addEventListener('click', (e) => { const b = e.target.closest('[data-branch]'); if (b) setBranch(b.dataset.branch); });
    $('#tabs').addEventListener('click', (e) => {
      const b = e.target.closest('.tab'); if (!b) return;
      const sec = $('#cat-' + CSS.escape(b.dataset.cat)); if (sec) sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
    const totop = $('#totop');
    addEventListener('scroll', () => { totop.classList.toggle('show', scrollY > 900); spy(); }, { passive: true });
    totop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  }
  // Scroll spy: the tab of the category under the sticky bars is the current one, and it scrolls into view.
  let spyTick = false;
  function spy() {
    if (!menuPage || spyTick) return; spyTick = true;
    requestAnimationFrame(() => {
      spyTick = false;
      const line = 72 + 70;
      let cur = null;
      $$('.cat').forEach((s) => { if (s.getBoundingClientRect().top <= line + 8) cur = s; });
      if (!cur) cur = $('.cat');
      $$('.tab').forEach((b) => {
        const on = cur && b.dataset.cat === cur.id.slice(4);
        if (on !== (b.getAttribute('aria-current') === 'true')) b.setAttribute('aria-current', String(on));
        if (on) { const p = b.parentElement, r = b.getBoundingClientRect(), pr = p.getBoundingClientRect(); if (r.left < pr.left || r.right > pr.right) p.scrollTo({ left: b.offsetLeft - pr.width / 2 + r.width / 2, behavior: reduce ? 'auto' : 'smooth' }); }
      });
    });
  }

  // ---------- reels: the restaurant's own videos, muted until tapped, playing while in view ----------
  const reelIO = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const v = $('video', en.target); if (!v) return;
      if (en.isIntersecting && en.intersectionRatio >= .55) { if (!v.src) v.src = v.dataset.src; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      else { v.pause(); }
    });
  }, { threshold: [0, .55] }) : null;
  function renderReels() {
    const row = $('#reels'); if (!row) return;
    row.innerHTML = REELS.map((r) => `<figure class="reel">
        <video playsinline muted loop preload="none" poster="assets/img/${r.file}.jpg" data-src="assets/video/${r.file}.mp4" aria-label="${esc(r[lang])}"></video>
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
      if (reelIO) reelIO.observe(fig);
    });
    const follow = $('#follow'); if (follow && BUSINESS.instagram) follow.href = BUSINESS.instagram;
  }

  // ---------- reveals: chapters rise once; plates and dishes pop in, in order ----------
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    const batch = entries.filter((en) => en.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
    batch.forEach((en, i) => { if (en.target.classList.contains('pop')) en.target.style.transitionDelay = Math.min(i, 6) * 70 + 'ms'; en.target.classList.add('in'); io.unobserve(en.target); });
  }, { rootMargin: '0px 0px -6% 0px', threshold: .06 }) : null;
  function watchReveals(root) {
    $$('.ap, .skewer, .pop', root).forEach((el) => { if (el.classList.contains('in')) return; if (io) io.observe(el); else el.classList.add('in'); });
  }

  // ---------- the entry and the hero ----------
  const intro = $('#intro'), hero = $('.hero');
  function light() { body.classList.add('lit'); body.classList.remove('intro-wait'); }
  // While the entry plays, the hero keeps still: the grill film starts loading just before the curtain lifts
  // and plays (with the embers) only once it has, so the burn-in has the phone to itself.
  const heroHooks = { load() {}, wake() {} };
  let introPlaying = false;
  if (intro) {
    const seen = session.get('mankal-intro');
    if (seen) { intro.classList.add('gone'); requestAnimationFrame(light); }
    else {
      introPlaying = true;
      body.classList.add('intro-wait');
      // The burn starts only once the page beneath has had its first layout and paint (two frames in), so the
      // slide runs on an idle main thread; everything after is timed from that moment.
      const hold = reduce ? 880 : 1780, gone = reduce ? 500 : 800;
      const go = () => {
        intro.classList.add('burn');
        setTimeout(heroHooks.load, Math.max(0, hold - 700));
        setTimeout(() => { intro.classList.add('lift'); light(); session.set('mankal-intro', '1'); heroHooks.wake(); }, hold);
        setTimeout(() => intro.classList.add('gone'), hold + gone);
      };
      requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(go, 80)));
    }
  } else if (!body.classList.contains('lit')) {
    requestAnimationFrame(light);
  }

  if (hero) {
    const video = $('#hero-video'), heroIn = $('#hero-in'), logoImg = $('#hero-logo img'), embersC = $('#embers');
    // The grill loop: the tall cut on phones, the wide one elsewhere. The poster (CSS) stays under it until it can play.
    const tall = innerWidth / innerHeight < .9;
    const file = tall ? 'grill-tall' : 'grill-wide';
    video.poster = `assets/img/${file}.jpg`;
    const canH264 = video.canPlayType('video/mp4; codecs="avc1.4d401e"');
    const src = canH264 ? `assets/video/${file}.mp4` : `assets/video/${file}.webm`;
    let awake = false;
    video.addEventListener('playing', () => video.classList.add('on'), { once: true });
    let heroVisible = true;
    function playVideo() { if (!awake || reduce || !heroVisible || document.hidden) return; const p = video.play(); if (p && p.catch) p.catch(() => {}); }
    heroHooks.load = () => { if (!reduce && !video.src) video.src = src; };
    document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); else playVideo(); });

    // Embers rise from the coals in the film, through the words.
    const ex = embersC.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    let W = 0, H = 0, embers = [], running = false, last = 0, bellow = 0;
    const phone = matchMedia('(max-width: 899px)').matches;
    const rnd = (a, b) => a + Math.random() * (b - a);
    function size() { const r = hero.getBoundingClientRect(); W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height)); embersC.width = W * dpr; embersC.height = H * dpr; ex.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function spawn(dt) {
      const rate = (phone ? 9 : 16) + bellow * 40;
      let n = rate * dt / 1000 + (Math.random() < (rate * dt / 1000) % 1 ? 1 : 0);
      const cap = phone ? 50 : 110;
      while (n-- >= 1 && embers.length < cap) {
        embers.push({ x: rnd(W * .05, W * .95), y: H + 6, vx: rnd(-.12, .12), vy: -rnd(.4, 1.1), life: 0, max: rnd(2200, 4800), s: rnd(1, 2.4), ph: rnd(0, 6.28), sw: rnd(.6, 1.4) });
      }
    }
    function frame(time) {
      if (!running) return;
      const dt = Math.min(48, time - (last || time)); last = time;
      bellow *= Math.pow(.2, dt / 1000);
      spawn(dt);
      ex.clearRect(0, 0, W, H);
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i]; e.life += dt;
        if (e.life > e.max || e.y < -10) { embers.splice(i, 1); continue; }
        const u = e.life / e.max;
        e.x += (e.vx + Math.sin(time * .0013 * e.sw + e.ph) * .22) * dt / 16; e.y += e.vy * dt / 16 * (1 - u * .35);
        const a = u < .12 ? u / .12 : 1 - (u - .12) / .88;
        const sz = e.s * (1 - u * .4);
        ex.fillStyle = `rgba(255,${Math.round(190 - u * 120)},${Math.round(70 - u * 50)},${a * .95})`;
        ex.beginPath(); ex.arc(e.x, e.y, sz, 0, 6.2832); ex.fill();
        if (sz > 1.5) { ex.fillStyle = `rgba(255,140,40,${a * .18})`; ex.beginPath(); ex.arc(e.x, e.y, sz * 3, 0, 6.2832); ex.fill(); }
      }
      requestAnimationFrame(frame);
    }
    function start() { if (!awake || running || reduce || !heroVisible || document.hidden) return; running = true; last = 0; requestAnimationFrame(frame); }
    function stop() { running = false; }
    // The hero stays put while the next chapter slides over it; its words sink and fade as they go,
    // and a pull of air (bellow) sends more embers up when the scroll starts.
    let lastY = scrollY, ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const p = Math.min(1, Math.max(0, scrollY / (H || 1)));
        heroIn.style.opacity = String(1 - p * 1.15);
        heroIn.style.transform = `translateY(${p * 60}px) scale(${1 - p * .06})`;
        const dy = Math.abs(scrollY - lastY); lastY = scrollY;
        if (!reduce && p < .9) bellow = Math.min(.6, bellow + dy / 900);
        const vis = p < 1.02;
        if (vis !== heroVisible) { heroVisible = vis; if (vis) { start(); playVideo(); } else { stop(); video.pause(); } }
      });
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', size);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
    size();
    heroHooks.wake = () => { awake = true; playVideo(); start(); };
    if (!introPlaying) { heroHooks.load(); heroHooks.wake(); }
    // The logo answers the pointer with a slow tilt (a lerp, never 1:1). Fine pointers only.
    if (fine && !reduce && logoImg) {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
      const ease = () => { cx += (tx - cx) * .08; cy += (ty - cy) * .08; logoImg.style.transform = `rotateY(${cx}deg) rotateX(${cy}deg)`; if (Math.abs(tx - cx) > .05 || Math.abs(ty - cy) > .05) raf = requestAnimationFrame(ease); else raf = 0; };
      hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - .5) * 14; ty = -((e.clientY - r.top) / r.height - .5) * 10; if (!raf) raf = requestAnimationFrame(ease); });
      hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(ease); });
    }
  }

  applyLang();
  watchReveals(document);
})();
