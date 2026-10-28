// AL MANKAL v1: language, header, the coals (hero canvases), the plates and the menu, reveals.
// Reads TEXT and BUSINESS from content.js and MENU/STORE from menu-data.js. No frameworks, no trackers.
(function () {
  'use strict';
  const html = document.documentElement, body = document.body;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const page = body.dataset.page || '';
  let lang = html.lang === 'ar' ? 'ar' : 'en';
  let T = TEXT[lang];

  // ---------- language ----------
  function t(key, vars) {
    let s = T[key] != null ? T[key] : (TEXT.en[key] != null ? TEXT.en[key] : key);
    if (vars) Object.keys(vars).forEach((k) => { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }
  function applyLang() {
    T = TEXT[lang];
    html.lang = lang; html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('mankal-lang', lang); } catch (e) {}
    $$('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t); });
    $$('[data-ph]').forEach((el) => { el.placeholder = t(el.dataset.ph); });
    $$('[data-map-title]').forEach((el) => { el.title = t('bp_map_title', { b: t(el.dataset.mapTitle === 'Gardens' ? 'br_gardens' : 'br_sweifieh') }); });
    const titles = { home: 'title_home', menu: 'title_menu', branches: 'title_branches', franchise: 'title_franchise' };
    if (titles[page]) document.title = t(titles[page]);
    const burger = $('#burger'); if (burger) burger.setAttribute('aria-label', t(body.classList.contains('nav-open') ? 'menu_close' : 'menu_open'));
    renderPlates(); renderMenu();
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

  // The logo comes from the store's CDN; if it does not load, the disc shows the name instead.
  $$('.disc img').forEach((img) => {
    const fail = () => img.parentElement.classList.add('no-img');
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener('error', fail);
  });

  // ---------- money and words ----------
  const money = (n) => `<span class="price">${n.toFixed(2)}<small>${t('jd')}</small></span>`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let branch = 'gardens';
  try { branch = localStorage.getItem('mankal-branch') === 'sweifieh' ? 'sweifieh' : 'gardens'; } catch (e) {}
  // Every dish has its own page on the Gardens store. CONFIRM: the Sweifieh store's product addresses; until then
  // Sweifieh buttons open that store's front page.
  const orderUrl = (item) => branch === 'gardens' ? `${STORE.gardens}/products/${item.slug}` : `${STORE.sweifieh}/#_branch119270`;
  const byId = {}; MENU.forEach((c) => c.items.forEach((i) => { byId[i.id] = i; }));
  function mediaHtml(item, cls) {
    if (item.img) return `<div class="${cls}"><img src="${esc(item.img)}" alt="" loading="lazy" decoding="async"></div>`;
    return `<div class="${cls} coal" aria-hidden="true"><span>${esc(item[lang])}</span></div>`;
  }
  function chipsHtml(item) {
    const out = [];
    if (item.label && item.label[lang]) out.push(`<span class="chip">${esc(item.label[lang])}</span>`);
    if (item.spicy) out.push(`<span class="chip hot">${t('mn_spicy')}</span>`);
    if (item.off) out.push(`<span class="chip off">${t('mn_off')}</span>`);
    return out.length ? `<div class="chips">${out.join('')}</div>` : '';
  }
  // The store's photos sit on white; if one fails to load, the card falls back to the coal plate.
  function guardImages(root) {
    $$('img', root).forEach((img) => {
      const fail = () => { const m = img.parentElement, name = img.closest('.plate, .dish') && $('h3', img.closest('.plate, .dish')); m.classList.add('coal'); m.innerHTML = `<span>${name ? esc(name.textContent) : ''}</span>`; };
      if (img.complete && img.naturalWidth === 0) fail(); else img.addEventListener('error', fail, { once: true });
    });
  }

  // ---------- home: the signature plates ----------
  function renderPlates() {
    const grid = $('#plates'); if (!grid) return;
    grid.innerHTML = SIGNATURE.map((id, n) => byId[id]).filter(Boolean).map((item, n) => `
      <article class="plate${n === 0 ? ' feature' : ''} ap d${Math.min(n, 5)}">
        ${mediaHtml(item, 'plate-media')}
        <div class="plate-body">
          <h3 class="display">${esc(item[lang])}</h3>
          ${item['d' + lang] ? `<p class="desc">${esc(item['d' + lang])}</p>` : ''}
          ${chipsHtml(item)}
          <div class="plate-foot">${money(item.price)}<a class="btn btn-ember btn-small" href="${esc(orderUrl(item))}" target="_blank" rel="noopener">${t('order_btn')}</a></div>
        </div>
      </article>`).join('');
    guardImages(grid); watchReveals(grid);
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
        <div class="dishes">${items.map((item) => `
          <article class="dish${item.off ? ' off' : ''}">
            ${mediaHtml(item, 'dish-media')}
            <div class="dish-body">
              <h3 class="display">${esc(item[lang])}</h3>
              ${item['d' + lang] ? `<p class="desc">${esc(item['d' + lang])}</p>` : ''}
              ${chipsHtml(item)}
              <div class="dish-foot">${money(item.price)}<a class="btn btn-ember btn-small" href="${esc(orderUrl(item))}" target="_blank" rel="noopener">${t('order_btn')}</a></div>
            </div>
          </article>`).join('')}</div>
      </section>`;
    }).join('');
    $('#empty').hidden = shown > 0;
    guardImages(cats);
    const tabs = $('#tabs');
    tabs.innerHTML = MENU.filter((c) => !q || c.items.some((i) => norm(i.en + ' ' + i.ar + ' ' + i.den + ' ' + i.dar).includes(q)))
      .map((c, n) => `<button class="tab" type="button" role="tab" data-cat="${esc(c.key)}" aria-current="${n === 0 ? 'true' : 'false'}">${esc(c[lang])}</button>`).join('');
    $$('.seg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.branch === branch)));
    $('#branch-note').hidden = branch !== 'sweifieh';
    spy();
  }
  const menuPage = $('#cats');
  if (menuPage) {
    $('#q').addEventListener('input', (e) => { query = e.target.value; renderMenu(); });
    $('.seg').addEventListener('click', (e) => {
      const b = e.target.closest('[data-branch]'); if (!b) return;
      branch = b.dataset.branch; try { localStorage.setItem('mankal-branch', branch); } catch (err) {}
      renderMenu();
    });
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
      const line = 68 + 70;
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

  // ---------- reveals: a few elements rise once when their chapter arrives ----------
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 }) : null;
  function watchReveals(root) {
    $$('.ap, .skewer', root).forEach((el) => { if (el.classList.contains('in')) return; if (io) io.observe(el); else el.classList.add('in'); });
  }

  // ---------- the hero: a bed of live coals and the embers that rise from it ----------
  const hero = $('.hero');
  if (hero) {
    const coalsC = $('#coals'), embersC = $('#embers'), heroIn = $('#hero-in');
    const cx = coalsC.getContext('2d'), ex = embersC.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    let W = 0, H = 0, CH = 0, coals = [], embers = [], heat = 0.08, target = 0.08, running = false, visible = true, last = 0, bellow = 0;
    const phone = matchMedia('(max-width: 680px)').matches;
    const rnd = (a, b) => a + Math.random() * (b - a);

    function size() {
      const r = hero.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height)); CH = Math.round(H * .52);
      coalsC.width = W * dpr; coalsC.height = CH * dpr; embersC.width = W * dpr; embersC.height = H * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0); ex.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The bed: rows of coals, bigger toward the viewer, denser in the middle.
      coals = [];
      const n = phone ? 46 : 90;
      for (let i = 0; i < n; i++) {
        const depth = Math.pow(Math.random(), .6);           // 0 = far (top of the bed), 1 = near (bottom edge)
        const spread = .5 + depth * .6;                        // the far rows gather toward the middle
        const x = W * (.5 + (Math.random() - .5) * spread * 1.1);
        const y = CH * (.42 + depth * .62);
        coals.push({ x, y, rx: rnd(16, 34) * (0.55 + depth * .9), ry: rnd(9, 18) * (0.55 + depth * .9), tone: rnd(.35, 1), ph: rnd(0, 6.28), sp: rnd(.4, 1.1), depth });
      }
      coals.sort((a, b) => a.depth - b.depth);
      drawCoals(0);
    }
    function drawCoals(time) {
      cx.clearRect(0, 0, W, CH);
      // The warm floor under the bed.
      const g = cx.createLinearGradient(0, 0, 0, CH);
      g.addColorStop(0, 'rgba(12,10,9,0)'); g.addColorStop(.45, `rgba(60,22,10,${.25 * heat})`); g.addColorStop(1, `rgba(120,38,10,${.55 * heat})`);
      cx.fillStyle = g; cx.fillRect(0, 0, W, CH);
      coals.forEach((c) => {
        const flick = reduce ? .85 : (.72 + .28 * Math.sin(time * .0011 * c.sp + c.ph) * Math.sin(time * .0027 * c.sp + c.ph * 2));
        const glow = Math.max(0, Math.min(1, heat * c.tone * flick + bellow * .5 * c.tone));
        // The coal itself: a dark lump with a soft rim.
        cx.beginPath(); cx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, 6.2832);
        cx.fillStyle = `rgb(${22 + glow * 30},${14 + glow * 10},${11})`; cx.fill();
        // The fire inside it.
        const r = cx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.rx * 1.35);
        r.addColorStop(0, `rgba(255,${200 - glow * 40},${90},${glow})`); r.addColorStop(.38, `rgba(255,${120},${26},${glow * .72})`); r.addColorStop(.7, `rgba(200,${30},${10},${glow * .25})`); r.addColorStop(1, 'rgba(120,20,10,0)');
        cx.globalCompositeOperation = 'lighter'; cx.fillStyle = r;
        cx.beginPath(); cx.ellipse(c.x, c.y, c.rx * 1.35, c.ry * 1.6, 0, 0, 6.2832); cx.fill();
        cx.globalCompositeOperation = 'source-over';
        // Cracks: a thin dark seam so the lump reads as charcoal, not a blob.
        cx.strokeStyle = `rgba(10,6,4,${.55 - glow * .25})`; cx.lineWidth = 1.2;
        cx.beginPath(); cx.moveTo(c.x - c.rx * .55, c.y + c.ry * .1); cx.quadraticCurveTo(c.x - c.rx * .1, c.y - c.ry * .5, c.x + c.rx * .5, c.y - c.ry * .05); cx.stroke();
      });
    }
    function spawn(dt) {
      if (reduce) return;
      const rate = (phone ? 14 : 26) * heat + bellow * 40;
      let n = rate * dt / 1000 + (Math.random() < (rate * dt / 1000) % 1 ? 1 : 0);
      const cap = phone ? 70 : 140;
      while (n-- >= 1 && embers.length < cap) {
        const c = coals[Math.floor(Math.random() * coals.length)];
        embers.push({ x: c.x + rnd(-c.rx, c.rx), y: H - CH + c.y + rnd(-4, 4), vx: rnd(-.12, .12), vy: -rnd(.35, 1.05) * (phone ? .8 : 1), life: 0, max: rnd(1800, 4200), s: rnd(1, 2.6), ph: rnd(0, 6.28), sw: rnd(.6, 1.4) });
      }
    }
    function drawEmbers(dt, time) {
      ex.clearRect(0, 0, W, H);
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i]; e.life += dt;
        if (e.life > e.max || e.y < -10) { embers.splice(i, 1); continue; }
        const u = e.life / e.max;
        e.x += (e.vx + Math.sin(time * .0013 * e.sw + e.ph) * .22) * dt / 16; e.y += e.vy * dt / 16 * (1 - u * .35);
        const a = u < .15 ? u / .15 : 1 - (u - .15) / .85;
        const sz = e.s * (1 - u * .4);
        ex.fillStyle = `rgba(${255},${Math.round(190 - u * 120)},${Math.round(70 - u * 50)},${a * .95})`;
        ex.beginPath(); ex.arc(e.x, e.y, sz, 0, 6.2832); ex.fill();
        if (sz > 1.6) { ex.fillStyle = `rgba(255,140,40,${a * .18})`; ex.beginPath(); ex.arc(e.x, e.y, sz * 3, 0, 6.2832); ex.fill(); }
      }
    }
    function frame(time) {
      if (!running) return;
      const dt = Math.min(48, time - (last || time)); last = time;
      heat += (target - heat) * (1 - Math.pow(.001, dt / 1000));   // eases toward the target: the coals catch, then settle
      bellow *= Math.pow(.2, dt / 1000);
      drawCoals(time); spawn(dt); drawEmbers(dt, time);
      if (reduce && Math.abs(target - heat) < .01) { running = false; return; }
      requestAnimationFrame(frame);
    }
    function start() { if (running || !visible || document.hidden) return; running = true; last = 0; requestAnimationFrame(frame); }
    function stop() { running = false; }
    // The hero stays put while the next chapter slides over it; its words sink and fade a little as they go,
    // and a pull of air (bellow) brightens the coals when the scroll starts.
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
        visible = p < 1.02; if (visible) start(); else stop();
      });
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', () => { size(); if (!running) drawCoals(performance.now()); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
    size();
    // The moment: the page opens dark, then the coals catch and everything rises in order (CSS delays).
    requestAnimationFrame(() => {
      body.classList.add('lit');
      setTimeout(() => { target = .9; start(); }, reduce ? 0 : 220);
    });
  } else {
    body.classList.add('lit');
  }

  applyLang();
  watchReveals(document);
})();
