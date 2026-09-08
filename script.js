/* =========================================================
   Umar Rajput — Portfolio
   Vanilla JS. Shared by index.html and work.html.
   Every module bails out safely if its markup isn't on the page.
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------
     1. Sticky navbar: transparent -> solid on scroll
     --------------------------------------------------- */
  (function navScroll() {
    var nav = document.querySelector('[data-nav]');
    if (!nav) return;

    var ticking = false;
    function update() {
      nav.classList.toggle('is-solid', window.scrollY > 24);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  })();

  /* ---------------------------------------------------
     2. Mobile nav toggle
     --------------------------------------------------- */
  (function mobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-nav-menu]');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  })();

  /* ---------------------------------------------------
     3. Smooth scroll for in-page anchors
        (CSS handles it; this is the fallback + offset fix)
     --------------------------------------------------- */
  (function smoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var id = link.getAttribute('href');
      if (!id || id === '#') return;

      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 76;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;

      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  })();

  /* ---------------------------------------------------
     4. Scroll reveal (IntersectionObserver)
     --------------------------------------------------- */
  (function scrollReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------------------------------------------
     5. Stat count-up on scroll
     --------------------------------------------------- */
  (function countUp() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var duration = 1600;
      var start = null;

      if (reduceMotion) {
        el.textContent = prefix + target + suffix;
        return;
      }

      function frame(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        // easeOutExpo
        var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (!('IntersectionObserver' in window)) {
      nums.forEach(run);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------------------------------------------
     6. Testimonial carousel: auto-rotate + arrows + dots
     --------------------------------------------------- */
  (function carousel() {
    var root = document.querySelector('[data-carousel]');
    if (!root) return;

    var track = root.querySelector('[data-carousel-track]');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel__slide'));
    var prev = root.querySelector('[data-carousel-prev]');
    var next = root.querySelector('[data-carousel-next]');
    var dotsWrap = root.querySelector('[data-carousel-dots]');
    if (!track || slides.length < 2) return;

    var index = 0;
    var perView = 1;
    var timer = null;
    var DELAY = 7000;

    function computePerView() {
      // One quote at a time. A multi-card view advanced by a single card,
      // which made the track shift by a fraction of a slide and read as jitter.
      return 1;
    }

    function pageCount() {
      return Math.max(1, slides.length - perView + 1);
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      for (var i = 0; i < pageCount(); i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'carousel__dot';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        b.setAttribute('aria-selected', i === index ? 'true' : 'false');
        (function (i) {
          b.addEventListener('click', function () { goTo(i, true); });
        })(i);
        dotsWrap.appendChild(b);
      }
    }

    function syncDots() {
      if (!dotsWrap) return;
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }

    function render() {
      slides.forEach(function (s) { s.style.flexBasis = (100 / perView) + '%'; });
      track.style.transform = 'translateX(-' + (index * (100 / perView)) + '%)';
      slides.forEach(function (s, i) {
        var visible = i >= index && i < index + perView;
        s.setAttribute('aria-hidden', visible ? 'false' : 'true');
      });
      syncDots();
    }

    function goTo(i, userAction) {
      var count = pageCount();
      index = (i + count) % count;
      render();
      if (userAction) restart();
    }

    function restart() {
      stop();
      if (!reduceMotion) timer = setInterval(function () { goTo(index + 1); }, DELAY);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    if (prev) prev.addEventListener('click', function () { goTo(index - 1, true); });
    if (next) next.addEventListener('click', function () { goTo(index + 1, true); });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', restart);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', restart);

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { goTo(index - 1, true); }
      if (e.key === 'ArrowRight') { goTo(index + 1, true); }
    });

    // Basic touch swipe
    var startX = 0, dragging = false;
    root.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX; dragging = true; stop();
    }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 46) goTo(index + (dx < 0 ? 1 : -1), true);
      else restart();
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var pv = computePerView();
        if (pv !== perView) {
          perView = pv;
          index = Math.min(index, pageCount() - 1);
          buildDots();
        }
        render();
      }, 150);
    });

    perView = computePerView();
    buildDots();
    render();
    restart();
  })();

  /* ---------------------------------------------------
     7. Contact form -> mailto: (no backend)
     --------------------------------------------------- */
  (function contactForm() {
    var form = document.querySelector('[data-mailto-form]');
    if (!form) return;

    var status = form.querySelector('[data-form-status]');
    var to = form.getAttribute('data-mailto') || 'hello@example.com';

    function say(msg, state) {
      if (!status) return;
      status.textContent = msg;
      status.setAttribute('data-state', state || 'ok');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (form.elements.name.value || '').trim();
      var email = (form.elements.email.value || '').trim();
      var message = (form.elements.message.value || '').trim();

      if (!name || !email || !message) {
        say('Please fill in your name, email and message.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        say('That email address looks incomplete.', 'error');
        return;
      }

      var subject = 'New project enquiry from ' + name;
      var body =
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        message + '\n';

      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      say('Opening your email client — hit send there to reach me.', 'ok');
    });
  })();

  /* ---------------------------------------------------
     8. Portfolio filters (work.html)
     --------------------------------------------------- */
  (function workFilters() {
    var root = document.querySelector('[data-filters]');
    var grid = document.querySelector('[data-work-grid]');
    if (!root || !grid) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.work-card, .site-card'));
    var empty = document.querySelector('[data-empty]');
    var meta = document.querySelector('[data-count-label]');
    var active = { cat: 'all', region: 'all' };

    function apply() {
      var shown = 0;

      cards.forEach(function (card) {
        var cat = card.getAttribute('data-cat') || '';
        var region = card.getAttribute('data-region') || '';
        var okCat = active.cat === 'all' || cat.split(' ').indexOf(active.cat) > -1;
        var okRegion = active.region === 'all' || region.split(' ').indexOf(active.region) > -1;
        var show = okCat && okRegion;

        card.classList.toggle('is-hidden', !show);
        if (show) shown++;
      });

      if (empty) empty.hidden = shown !== 0;
      if (meta) meta.textContent = shown;
    }

    root.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;

      var group = btn.getAttribute('data-group');
      var value = btn.getAttribute('data-value');
      if (!group) return;

      active[group] = value;

      root.querySelectorAll('.filter[data-group="' + group + '"]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });

      apply();
    });

    apply();
  })();

  /* ---------------------------------------------------
     8b. Markets — region switcher (tabs)
     --------------------------------------------------- */
  (function regionSwitcher() {
    var root = document.querySelector('[data-reach]');
    if (!root) return;

    var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-rtab]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[data-rpanel]'));
    if (!tabs.length || !panels.length) return;

    function select(key, focusTab) {
      tabs.forEach(function (tab) {
        var on = tab.getAttribute('data-rtab') === key;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        if (on && focusTab) tab.focus();
      });

      panels.forEach(function (panel) {
        var on = panel.getAttribute('data-rpanel') === key;
        panel.hidden = !on;
        panel.classList.toggle('is-active', on);
        panel.classList.remove('is-entering');
        if (on && !reduceMotion) {
          // restart the entry animation
          void panel.offsetWidth;
          panel.classList.add('is-entering');
        }
      });
    }

    root.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-rtab]');
      if (tab) select(tab.getAttribute('data-rtab'), false);
    });

    root.addEventListener('keydown', function (e) {
      var tab = e.target.closest('[data-rtab]');
      if (!tab) return;
      var i = tabs.indexOf(tab);
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      select(tabs[next].getAttribute('data-rtab'), true);
    });
  })();

  /* ---------------------------------------------------
     9. Screenshot lightbox gallery
     --------------------------------------------------- */
  (function lightbox() {
    var box = document.querySelector('[data-lightbox]');
    var triggers = document.querySelectorAll('[data-gallery]');
    if (!box || !triggers.length) return;

    var imgEl = box.querySelector('[data-lb-img]');
    var titleEl = box.querySelector('[data-lb-title]');
    var subEl = box.querySelector('[data-lb-sub]');
    var thumbsEl = box.querySelector('[data-lb-thumbs]');
    var closeBtn = box.querySelector('[data-lb-close]');
    var prevBtn = box.querySelector('[data-lb-prev]');
    var nextBtn = box.querySelector('[data-lb-next]');

    var shots = [];
    var index = 0;
    var lastFocus = null;

    function show(i) {
      index = (i + shots.length) % shots.length;
      imgEl.src = shots[index].full;
      imgEl.alt = shots[index].alt;
      Array.prototype.forEach.call(thumbsEl.children, function (b, n) {
        b.setAttribute('aria-current', n === index ? 'true' : 'false');
      });
      var single = shots.length < 2;
      prevBtn.hidden = single;
      nextBtn.hidden = single;
    }

    function buildThumbs() {
      thumbsEl.innerHTML = '';
      if (shots.length < 2) return;
      shots.forEach(function (shot, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'View screenshot ' + (i + 1) + ' of ' + shots.length);
        var t = document.createElement('img');
        t.src = shot.thumb;
        t.alt = '';
        t.loading = 'lazy';
        b.appendChild(t);
        b.addEventListener('click', function () { show(i); });
        thumbsEl.appendChild(b);
      });
    }

    function open(trigger) {
      var slug = trigger.getAttribute('data-slug');
      var count = parseInt(trigger.getAttribute('data-shots'), 10) || 1;
      var name = trigger.getAttribute('data-title') || 'Project';

      shots = [];
      for (var i = 1; i <= count; i++) {
        shots.push({
          full: 'assets/work/' + slug + '/' + i + '.jpg',
          thumb: 'assets/work/' + slug + '/' + i + '-thumb.jpg',
          alt: name + ' — screenshot ' + i + ' of ' + count
        });
      }

      titleEl.childNodes[0].nodeValue = name;
      subEl.textContent = trigger.getAttribute('data-sub') || '';

      buildThumbs();
      show(0);

      lastFocus = trigger;
      box.hidden = false;
      box.classList.add('is-open');
      document.body.classList.add('is-locked');
      closeBtn.focus();
    }

    function close() {
      box.classList.remove('is-open');
      box.hidden = true;
      document.body.classList.remove('is-locked');
      imgEl.src = '';
      if (lastFocus) lastFocus.focus();
    }

    Array.prototype.forEach.call(triggers, function (t) {
      t.addEventListener('click', function () { open(t); });
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { show(index - 1); });
    nextBtn.addEventListener('click', function () { show(index + 1); });

    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lightbox__stage')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'Tab') {
        // simple focus trap
        var focusables = box.querySelectorAll('button:not([hidden])');
        if (!focusables.length) return;
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Swipe on touch
    var sx = 0;
    box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    });
  })();

  /* ---------------------------------------------------
     10. Footer year
     --------------------------------------------------- */
  (function year() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  })();

})();
