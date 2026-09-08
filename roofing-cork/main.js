/* =========================================================
   Cork Roofing — landing page behaviour
   Vanilla JS, no dependencies.
   ========================================================= */
(function () {
  'use strict';

  /* =======================================================
     1. BACKEND INTEGRATION POINT
     -------------------------------------------------------
     This is the ONLY place that talks to a server. Swap the
     endpoint (or the whole function body) to connect the form
     to a real CRM, email service or database.

     Contract
       POST  /api/leads
       Body  multipart/form-data
       Keys  name, phone, email, area, service, propertyType,
             contactPreference, message, photo, pageUrl, timestamp
       200/201  -> success state
       anything else / network failure -> error state
     ======================================================= */
  var LEADS_ENDPOINT = '/api/leads';
  var SUBMIT_TIMEOUT_MS = 15000;

  function submitLead(formData) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, SUBMIT_TIMEOUT_MS);

    return fetch(LEADS_ENDPOINT, {
      method: 'POST',
      body: formData,             // multipart — carries the optional photo
      headers: { Accept: 'application/json' },
      signal: controller.signal
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) throw new Error('Lead endpoint responded ' + res.status);
      return res.json().catch(function () { return {}; });
    }).catch(function (err) {
      clearTimeout(timer);
      throw err;
    });
  }

  /* =======================================================
     2. Analytics — dataLayer first, gtag/fbq if present
     ======================================================= */
  function track(event, params) {
    var payload = Object.assign({ event: event }, params || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') window.gtag('event', event, params || {});
    if (typeof window.fbq === 'function') {
      var fbMap = { lead_form_submit: 'Lead', phone_click: 'Contact', quote_cta_click: 'InitiateCheckout' };
      if (fbMap[event]) window.fbq('track', fbMap[event]);
    }
  }

  document.addEventListener('click', function (e) {
    var tel = e.target.closest('a[href^="tel:"]');
    if (tel) track('phone_click', { link_url: tel.getAttribute('href') });

    var mail = e.target.closest('a[href^="mailto:"]');
    if (mail) track('email_click', { link_url: mail.getAttribute('href') });

    var cta = e.target.closest('[data-cta]');
    if (cta) track('quote_cta_click', { cta_location: cta.getAttribute('data-cta') });
  });

  /* =======================================================
     3. Header nav (mobile)
     ======================================================= */
  (function nav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var panel = document.getElementById('primary-nav');
    if (!toggle || !panel) return;

    function setOpen(open) {
      panel.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  })();

  /* =======================================================
     4. Scroll reveal
     ======================================================= */
  (function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* =======================================================
     5. Lead form
     ======================================================= */
  (function leadForm() {
    var form = document.getElementById('quote-form');
    if (!form) return;

    var card = form.closest('.quote-card');
    var successPanel = document.getElementById('form-success');
    var errorAlert = document.getElementById('form-error');
    var errorText = document.getElementById('form-error-text');
    var submitBtn = form.querySelector('[data-submit]');
    var fileInput = form.querySelector('#photo');
    var fileMeta = document.getElementById('photo-meta');

    var isSubmitting = false;
    var lastSignature = null;   // blocks an identical re-post
    var startedTracked = false;

    var MAX_PHOTO_BYTES = 8 * 1024 * 1024;
    var ALLOWED_PHOTO = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

    /* ---- validation rules ---- */
    // Irish numbers: 08x mobiles, 0xx landlines, with or without +353.
    var IE_PHONE = /^(?:\+?353[\s.-]?|0)\s?(?:8[35679]\d{7}|[124-9]\d{6,8})$/;
    var EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    // Eircode routing key + unique identifier, e.g. T12 X2R6
    var EIRCODE = /^[AC-FHKNPRTV-Y]\d{2}\s?[0-9AC-FHKNPRTV-Y]{4}$/i;

    var rules = {
      name: function (v) {
        if (!v.trim()) return 'Please enter your full name.';
        if (v.trim().length < 2) return 'Please enter your full name.';
        return '';
      },
      phone: function (v) {
        if (!v.trim()) return 'Please enter a phone number so we can call you back.';
        if (!IE_PHONE.test(v.replace(/[\s().-]/g, ''))) {
          return 'Enter a valid Irish number, e.g. 087 123 4567 or 021 123 4567.';
        }
        return '';
      },
      email: function (v) {
        if (!v.trim()) return 'Please enter your email address.';
        if (!EMAIL.test(v.trim())) return 'Please enter a valid email address.';
        return '';
      },
      area: function (v) {
        if (!v.trim()) return 'Please enter your Eircode or area.';
        var t = v.trim();
        // an eircode-looking value must actually be a valid eircode
        if (/^[A-Za-z]\d{2}/.test(t) && !EIRCODE.test(t)) {
          return 'That Eircode does not look right — or just type your area, e.g. Douglas.';
        }
        if (t.length < 3) return 'Please enter your Eircode or area.';
        return '';
      },
      service: function (v) { return v ? '' : 'Please choose the service you need.'; },
      propertyType: function (v) { return v ? '' : 'Please choose your property type.'; },
      contactPreference: function (v) { return v ? '' : 'Please choose how you would like to be contacted.'; },
      consent: function (v, el) { return el.checked ? '' : 'Please tick the box so we can contact you.'; }
    };

    function fieldWrap(el) { return el.closest('.field') || el.closest('.consent'); }

    function showError(el, message) {
      var wrap = fieldWrap(el);
      if (!wrap) return;
      wrap.classList.add('field--invalid');
      var slot = wrap.querySelector('.field__error');
      if (slot) slot.textContent = message;
      el.setAttribute('aria-invalid', 'true');
    }

    function clearError(el) {
      var wrap = fieldWrap(el);
      if (!wrap) return;
      wrap.classList.remove('field--invalid');
      el.removeAttribute('aria-invalid');
    }

    function valueOf(name) {
      var el = form.elements[name];
      if (!el) return '';
      if (el instanceof RadioNodeList || (el.length && !el.tagName)) {
        var checked = form.querySelector('input[name="' + name + '"]:checked');
        return checked ? checked.value : '';
      }
      if (el.type === 'checkbox') return el.checked ? 'yes' : '';
      return el.value;
    }

    function controlFor(name) {
      var el = form.elements[name];
      if (el && el.tagName) return el;
      return form.querySelector('[name="' + name + '"]');
    }

    function validateField(name) {
      var rule = rules[name];
      if (!rule) return '';
      var el = controlFor(name);
      var msg = rule(valueOf(name), el);
      if (msg) showError(el, msg); else clearError(el);
      return msg;
    }

    function validatePhoto() {
      var file = fileInput && fileInput.files && fileInput.files[0];
      if (!file) return '';
      if (ALLOWED_PHOTO.indexOf(file.type) === -1) {
        showError(fileInput, 'Please upload a JPG, PNG, WEBP or HEIC image.');
        return 'photo';
      }
      if (file.size > MAX_PHOTO_BYTES) {
        showError(fileInput, 'That image is over 8 MB. Please upload a smaller photo.');
        return 'photo';
      }
      clearError(fileInput);
      return '';
    }

    /* ---- live feedback: validate on blur, clear while typing ---- */
    Object.keys(rules).forEach(function (name) {
      var control = controlFor(name);
      if (!control) return;
      var all = form.querySelectorAll('[name="' + name + '"]');
      all.forEach(function (el) {
        el.addEventListener('blur', function () { validateField(name); });
        el.addEventListener('change', function () { validateField(name); });
        el.addEventListener('input', function () {
          var wrap = fieldWrap(el);
          if (wrap && wrap.classList.contains('field--invalid')) validateField(name);
        });
      });
    });

    form.addEventListener('input', function () {
      if (startedTracked) return;
      startedTracked = true;
      track('lead_form_start', { form_id: 'quote-form' });
    }, { once: false });

    if (fileInput) {
      fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];
        if (fileMeta) {
          fileMeta.textContent = file
            ? file.name + ' · ' + (file.size / 1048576).toFixed(1) + ' MB'
            : 'JPG, PNG or HEIC · up to 8 MB';
        }
        validatePhoto();
      });
    }

    function setLoading(on) {
      submitBtn.setAttribute('data-loading', on ? 'true' : 'false');
      submitBtn.disabled = on;
      submitBtn.setAttribute('aria-busy', on ? 'true' : 'false');
    }

    function showFormError(message) {
      if (!errorAlert) return;
      if (errorText) errorText.textContent = message;
      errorAlert.classList.add('is-shown');
    }
    function hideFormError() {
      if (errorAlert) errorAlert.classList.remove('is-shown');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (isSubmitting) return;
      hideFormError();

      /* validate everything */
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        if (validateField(name) && !firstBad) firstBad = controlFor(name);
      });
      if (validatePhoto() && !firstBad) firstBad = fileInput;

      if (firstBad) {
        showFormError('Please check the highlighted fields and try again.');
        firstBad.focus({ preventScroll: true });
        firstBad.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }

      /* build the payload */
      var fd = new FormData();
      fd.append('name', valueOf('name').trim());
      fd.append('phone', valueOf('phone').trim());
      fd.append('email', valueOf('email').trim());
      fd.append('area', valueOf('area').trim());
      fd.append('service', valueOf('service'));
      fd.append('propertyType', valueOf('propertyType'));
      fd.append('contactPreference', valueOf('contactPreference'));
      fd.append('message', valueOf('message').trim());
      fd.append('pageUrl', window.location.href);
      fd.append('timestamp', new Date().toISOString());
      var photo = fileInput && fileInput.files && fileInput.files[0];
      if (photo) fd.append('photo', photo, photo.name);

      /* block an identical duplicate post */
      var signature = [
        fd.get('name'), fd.get('phone'), fd.get('email'),
        fd.get('service'), fd.get('message')
      ].join('|');
      if (signature === lastSignature) {
        showFormError('That enquiry has already been sent. We will be in touch shortly.');
        return;
      }

      isSubmitting = true;
      setLoading(true);

      submitLead(fd).then(function () {
        lastSignature = signature;
        track('lead_form_submit', {
          form_id: 'quote-form',
          service: fd.get('service'),
          property_type: fd.get('propertyType')
        });
        form.hidden = true;
        if (successPanel) {
          successPanel.classList.add('is-shown');
          successPanel.setAttribute('tabindex', '-1');
          successPanel.focus({ preventScroll: true });
          successPanel.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
        if (card) card.setAttribute('data-state', 'success');
      }).catch(function (err) {
        showFormError(
          'Sorry — we could not send your enquiry just now. Please try again, or call us directly.'
        );
        track('lead_form_error', { form_id: 'quote-form', reason: String(err && err.message || err) });
      }).finally(function () {
        isSubmitting = false;
        setLoading(false);
      });
    });

    /* lead_form_view — fires once when the form scrolls into view */
    if ('IntersectionObserver' in window) {
      var seen = false;
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || seen) return;
          seen = true;
          track('lead_form_view', { form_id: 'quote-form' });
          vio.disconnect();
        });
      }, { threshold: 0.35 });
      vio.observe(form);
    } else {
      track('lead_form_view', { form_id: 'quote-form' });
    }
  })();

  /* =======================================================
     6. Deep links: prefill the service when a card is clicked
     ======================================================= */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-prefill-service]');
    if (!link) return;
    var value = link.getAttribute('data-prefill-service');
    var select = document.getElementById('service');
    if (select && value) {
      var match = Array.prototype.some.call(select.options, function (o) { return o.value === value; });
      if (match) select.value = value;
    }
  });
})();
