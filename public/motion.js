/* ------------------------------------------------------------------
   2.5D motion layer — progressive enhancement for the whole site.
   Pairs with src/styles/motion.css. Loaded deferred after GSAP +
   ScrollTrigger (CDN); if either is missing, or the visitor prefers
   reduced motion, this file does nothing and the site's legacy reveal
   path (Base.astro + global.css) remains in charge.

   Voice rules (this site's own): no shadows-for-depth, no lerp, no
   pinning. Depth = parallax differential + overlap + scale.

   Astro ClientRouter lifecycle: every navigation swaps <body>, so all
   ScrollTriggers are killed on astro:before-swap and the engine
   re-inits on astro:page-load. Processed elements are stamped with
   data-m25 so a re-init can never double-bind.

   GUARD (hard-won): an entrance tween hides its target the moment it is
   created — if the page opens already scrolled past the trigger (deep
   link, refresh restoring scroll, back-nav), the reveal never fires and
   the content stays blank. Anything at or above its trigger line at
   init is left untouched.
------------------------------------------------------------------- */
(function () {
  'use strict';

  var REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COARSE = matchMedia('(pointer: coarse)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function ready() {
    return typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  }
  function alreadyIn(el, ratio) {
    return el.getBoundingClientRect().top < innerHeight * (ratio || 0.85);
  }
  function once(el) {
    if (el.dataset.m25) return false;
    el.dataset.m25 = '1';
    return true;
  }

  /* ── ghost brand triangle + wash behind the first section ── */
  function injectGhost() {
    var hero = $('main > section:first-of-type');
    if (!hero || $('.m-ghost', hero)) return;
    var g = document.createElement('div');
    g.className = 'm-ghost';
    g.setAttribute('aria-hidden', 'true');
    g.innerHTML =
      '<span class="m-wash"></span>' +
      '<svg viewBox="0 0 100 88" fill="none">' +
      '<path d="M50 4 96 84 H4 Z" stroke="currentColor" stroke-width="0.6"/></svg>';
    hero.insertBefore(g, hero.firstChild);

    if (COARSE) return; // depth without drift on touch
    var svg = $('svg', g);
    gsap.to(g, {
      yPercent: -7, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to(svg, {
      rotation: 4, ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'max', scrub: 1.2 }
    });
  }

  /* ── mask line rises for the page's opening type ── */
  function maskRise() {
    var hero = $('main > section:first-of-type');
    if (!hero) return;
    var targets = $$('h1, .label--accent, .intro, .hero-row p, .page-hero p', hero)
      .filter(function (el) { return !el.closest('.facts, .facets'); })
      .slice(0, 5);
    var lines = [];
    targets.forEach(function (el) {
      if (!once(el)) return;
      el.classList.add('m-mask');
      var line = document.createElement('span');
      line.className = 'm-line';
      while (el.firstChild) line.appendChild(el.firstChild);
      el.appendChild(line);
      lines.push(line);
    });
    if (!lines.length) return;
    gsap.set(lines, { yPercent: 112 });
    gsap.to(lines, { yPercent: 0, duration: 1.0, ease: 'power4.out', stagger: 0.09, delay: 0.1 });
  }

  /* ── hairline rules redraw left-to-right as they arrive ── */
  var RULED = ['.section-head', '.pull-quote', '.about-strip', '.project-nav', '.hub-nav',
    '.reference > div', '.facts > div', '.facets li', '.skill-row'].join(', ');

  function ruleDraws() {
    $$(RULED).forEach(function (el) {
      if (!once(el)) return;
      if (alreadyIn(el, 0.88)) return;
      var color = getComputedStyle(el).borderTopColor;
      var rule = document.createElement('span');
      rule.className = 'm-rule';
      rule.setAttribute('aria-hidden', 'true');
      rule.style.background = color;
      el.classList.add('m-ruled');
      el.appendChild(rule);
      gsap.set(rule, { scaleX: 0 });
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: function () { gsap.to(rule, { scaleX: 1, duration: 0.9, ease: 'power3.out' }); }
      });
    });
  }

  /* ── intra-frame drift: images move slower than the page ──
     gsap owns the img's inline transform (scale 1.12 covers the drift
     overrun); the CSS `scale` property still composes for hover zoom.
     Only images inside a CLIPPING container may drift — a scaled image in
     an overflow:visible figure spills into the page (it produced a 22px
     horizontal overflow on work-page galleries). Tile frames and card
     media already clip; gallery images get wrapped in one first. */
  function drift() {
    if (COARSE) return;

    // work-page galleries: no clipping wrapper in the markup — add one
    $$('.gallery:not(.gallery--sheets) > figure > img').forEach(function (img) {
      if (img.dataset.m25f) return;
      img.dataset.m25f = '1';
      var frame = document.createElement('div');
      frame.className = 'm-frame';
      img.parentNode.insertBefore(frame, img);
      frame.appendChild(img);
    });

    var sel = ['.tile:not(.tile--sheet) .frame img', '.card .media img',
      '.m-frame img'].join(', ');
    $$(sel).forEach(function (img) {
      if (!once(img)) return;
      var frame = img.parentElement;
      gsap.fromTo(img, { scale: 1.12, yPercent: -5 }, {
        scale: 1.12, yPercent: 5, ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  /* ── clip wipes + rises for plates and cards ── */
  function wipe(el, from) {
    if (alreadyIn(el, 0.87)) return;
    gsap.set(el, { clipPath: from });
    ScrollTrigger.create({
      trigger: el, start: 'top 87%', once: true,
      onEnter: function () {
        gsap.to(el, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'power3.out',
          onComplete: function () { gsap.set(el, { clearProps: 'clipPath' }); }
        });
      }
    });
  }

  function rise(el) {
    if (alreadyIn(el, 0.9)) return;
    gsap.set(el, { y: 44, opacity: 0 });
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: function () {
        gsap.to(el, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });
      }
    });
  }

  function reveals() {
    // paired tiles sweep toward their seam; single figures rise from below
    $$('.pair, .process-pair, .reference-cards').forEach(function (group) {
      if (!once(group)) return;
      var figs = $$(':scope > figure, :scope > .tile', group);
      figs.forEach(function (f, i) {
        wipe(f, i % 2 === 0 ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)');
      });
    });
    $$('.gallery figure, .videos figure, .sheet, .portrait, .header-media').forEach(function (f) {
      if (f.closest('.process-pair')) return;
      if (!once(f)) return;
      wipe(f, 'inset(0% 0% 100% 0%)');
    });
    $$('.card').forEach(function (c) { if (once(c)) rise(c); });
    var reel = $('.hero-media .reel');
    if (reel && once(reel) && !alreadyIn(reel, 0.92)) {
      gsap.set(reel, { y: 70, opacity: 0 });
      ScrollTrigger.create({
        trigger: reel, start: 'top 92%', once: true,
        onEnter: function () {
          gsap.to(reel, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' });
        }
      });
    }
  }

  /* ── the home "one model, two deliverables" seams draw with the scroll ── */
  function seams() {
    $$('.pair-seam').forEach(function (seam) {
      if (!once(seam)) return;
      var pair = seam.closest('.pair') || seam.parentElement;
      if (alreadyIn(pair, 0.9)) return;
      var linesEls = $$('.pair-seam-line', seam);
      var tag = $('.pair-seam-tag', seam);
      gsap.set(linesEls[0], { scaleY: 0, transformOrigin: 'top' });
      if (linesEls[1]) gsap.set(linesEls[1], { scaleY: 0, transformOrigin: 'bottom' });
      if (tag) gsap.set(tag, { opacity: 0 });
      var tl = gsap.timeline({
        scrollTrigger: { trigger: pair, start: 'top 88%', end: 'top 35%', scrub: 0.6 }
      });
      tl.to(linesEls, { scaleY: 1, ease: 'none' }, 0);
      if (tag) tl.to(tag, { opacity: 1, ease: 'none' }, 0.4);
    });
  }

  /* ── home lede inks up word by word ── */
  function lede() {
    var el = $('.showcase-lede');
    if (!el || !once(el)) return;
    var text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    var words = text.split(/\s+/).map(function (wd) {
      var s = document.createElement('span');
      s.className = 'm-w';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = wd;
      el.appendChild(s);
      el.appendChild(document.createTextNode(' '));
      return s;
    });
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', end: 'top 45%', scrub: 0.4,
      onUpdate: function (self) {
        var n = Math.round(self.progress * words.length);
        for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i < n);
      },
      onLeave: function () {
        words.forEach(function (wd) { wd.classList.add('on'); });
      }
    });
  }

  /* ── lifecycle ── */
  function init() {
    if (REDUCED || !ready()) return;            // legacy reveal path stays in charge
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('m25');
    injectGhost();
    maskRise();
    ruleDraws();
    drift();
    reveals();
    seams();
    lede();
    ScrollTrigger.refresh();
  }

  document.addEventListener('astro:page-load', init);
  document.addEventListener('astro:before-swap', function () {
    if (ready()) ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
  });
})();
