/**
 * THE SOLO TRAIL — analytics event layer
 *
 * The GTM container was firing pageviews and nothing else, which meant there was
 * no way to answer the questions that actually matter: which trek pages send
 * people to Gumroad, whether anyone uses the search box, what they search for,
 * which affiliate links earn clicks.
 *
 * This pushes named events onto window.dataLayer. Nothing here works until the
 * matching GA4 tags are created in GTM — see /docs/analytics.md for that setup.
 * Events are intentionally coarse: no PII, no per-user identifiers, just the
 * interaction and enough context to segment it.
 */
(function () {
  'use strict';

  window.dataLayer = window.dataLayer || [];

  function push(event, params) {
    var payload = { event: event };
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k];
    window.dataLayer.push(payload);
  }

  // Page context, attached to every event so GA4 can segment by trek/region
  // without needing a separate dimension lookup.
  var ctx = (function () {
    var body = document.body || {};
    var d = body.dataset || {};
    var c = { page_type: d.pageType || 'other' };
    if (d.trekId) c.trek_id = d.trekId;
    if (d.trekRegion) c.trek_region = d.trekRegion;
    if (d.trekCountry) c.trek_country = d.trekCountry;
    return c;
  })();

  function withCtx(params) {
    var out = {};
    for (var k in ctx) out[k] = ctx[k];
    for (var j in params) out[j] = params[j];
    return out;
  }

  // ---- Outbound + download clicks -------------------------------------------
  // One delegated listener rather than per-element binding, so links added later
  // (search results, dynamically revealed tabs) are covered automatically.
  var MONETISED = /gumroad\.com|safetywing\.com|getyourguide\.|amazon\.|amzn\.to|beehiiv\.com/i;
  var DOWNLOADABLE = /\.(gpx|pdf|zip)$/i;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;

    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || /^(mailto|tel):/i.test(href)) {
      if (/^mailto:/i.test(href)) push('contact_click', withCtx({ link_url: href }));
      return;
    }

    var url;
    try { url = new URL(href, window.location.href); } catch (err) { return; }

    var isExternal = url.host !== window.location.host;
    var label = (a.textContent || '').trim().slice(0, 80);

    if (DOWNLOADABLE.test(url.pathname)) {
      push('file_download', withCtx({
        file_name: url.pathname.split('/').pop(),
        file_extension: (url.pathname.split('.').pop() || '').toLowerCase(),
        link_text: label
      }));
      return;
    }

    if (!isExternal) return;

    var monetised = MONETISED.test(url.host);
    push(monetised ? 'monetised_click' : 'outbound_click', withCtx({
      link_url: url.href,
      link_domain: url.host,
      link_text: label
    }));
  }, true);

  // ---- Site search ----------------------------------------------------------
  // Fires on submit and on a debounced pause in typing, so we capture both
  // "searched and hit enter" and "typed, saw results, clicked one".
  var searchInput = document.getElementById('search-input');
  var searchForm = document.getElementById('search-form');

  if (searchInput) {
    var lastLogged = '';
    var timer = null;

    function logSearch(method) {
      var q = searchInput.value.trim();
      if (!q || q === lastLogged) return;
      lastLogged = q;
      var results = document.querySelectorAll('#search-results .search-result-item').length;
      push('site_search', withCtx({
        search_term: q.toLowerCase().slice(0, 100),
        result_count: results,
        method: method
      }));
    }

    searchInput.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { logSearch('typed'); }, 1200);
    });

    if (searchForm) {
      searchForm.addEventListener('submit', function () {
        clearTimeout(timer);
        logSearch('submit');
      });
    }

    document.addEventListener('click', function (e) {
      var hit = e.target.closest && e.target.closest('.search-result-item');
      if (!hit) return;
      push('search_result_click', withCtx({
        search_term: searchInput.value.trim().toLowerCase().slice(0, 100),
        destination: hit.getAttribute('href') || ''
      }));
    }, true);
  }

  // ---- Guide engagement ----------------------------------------------------
  // Which tab people actually open tells us which sections earn their attention
  // — the difference between "read the safety notes" and "bounced off overview".
  document.addEventListener('click', function (e) {
    var tab = e.target.closest && e.target.closest('.tab[role="tab"]');
    if (!tab) return;
    push('guide_tab_view', withCtx({ tab_name: (tab.textContent || '').trim() }));
  }, true);

  // FAQ opens are a strong intent signal on a safety-led site.
  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (!d || !d.matches || !d.matches('.trek-faq-item, .hub-faq-item') || !d.open) return;
    var q = d.querySelector('summary');
    push('faq_open', withCtx({ question: q ? (q.textContent || '').trim().slice(0, 120) : '' }));
  }, true);

  // ---- Scroll depth on guides ---------------------------------------------
  // Only on trail pages, and only the milestones worth knowing about.
  if (ctx.page_type === 'trail') {
    var fired = {};
    var marks = [50, 90];
    var onScroll = function () {
      var h = document.documentElement;
      var pct = ((h.scrollTop || document.body.scrollTop) + window.innerHeight) / h.scrollHeight * 100;
      marks.forEach(function (m) {
        if (!fired[m] && pct >= m) {
          fired[m] = true;
          push('guide_scroll', withCtx({ percent_scrolled: m }));
        }
      });
      if (fired[90]) window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
