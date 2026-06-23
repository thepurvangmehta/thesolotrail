(function () {
  'use strict';

  const CURRENCIES = {
    USD: { symbol: '$',   flag: '🇺🇸', name: 'US Dollar'         },
    INR: { symbol: '₹',   flag: '🇮🇳', name: 'Indian Rupee'       },
    GBP: { symbol: '£',   flag: '🇬🇧', name: 'British Pound'      },
    EUR: { symbol: '€',   flag: '🇪🇺', name: 'Euro'               },
    AUD: { symbol: 'A$',  flag: '🇦🇺', name: 'Australian Dollar'  },
    CAD: { symbol: 'C$',  flag: '🇨🇦', name: 'Canadian Dollar'    },
    NPR: { symbol: 'Rs ', flag: '🇳🇵', name: 'Nepali Rupee'       },
    NZD: { symbol: 'NZ$', flag: '🇳🇿', name: 'NZ Dollar'          },
    SGD: { symbol: 'S$',  flag: '🇸🇬', name: 'Singapore Dollar'   },
  };

  const COUNTRY_MAP = {
    US:'USD', GB:'GBP', IN:'INR', NP:'NPR',
    AU:'AUD', CA:'CAD', NZ:'NZD', SG:'SGD',
    DE:'EUR', FR:'EUR', IT:'EUR', ES:'EUR', NL:'EUR', BE:'EUR',
    AT:'EUR', PT:'EUR', IE:'EUR', FI:'EUR', GR:'EUR', LU:'EUR',
    CY:'EUR', EE:'EUR', LV:'EUR', LT:'EUR', MT:'EUR', SK:'EUR',
    SI:'EUR', HR:'EUR', CH:'CHF',
  };

  const FALLBACK = {
    USD:1, INR:83.5, GBP:0.79, EUR:0.92,
    AUD:1.52, CAD:1.37, NPR:133.5, NZD:1.64, SGD:1.35,
  };

  let curr   = 'USD';
  let rates  = { ...FALLBACK };
  let isAuto = true;

  function smartRound(n) {
    if (n >= 50000) return Math.round(n / 500) * 500;
    if (n >= 5000)  return Math.round(n / 50) * 50;
    if (n >= 500)   return Math.round(n / 5) * 5;
    return Math.round(n);
  }

  function fmt(usd, code) {
    const info   = CURRENCIES[code] || CURRENCIES.USD;
    const rate   = rates[code] || 1;
    const val    = smartRound(usd * rate);
    const locale = code === 'INR' ? 'en-IN' : 'en-US';
    return info.symbol + val.toLocaleString(locale);
  }

  function applyAll(code) {
    curr = code;
    document.querySelectorAll('[data-price]').forEach(el => {
      const raw    = el.dataset.price;
      const suffix = el.dataset.priceSuffix || '';
      const prefix = el.dataset.pricePrefix || '';
      if (raw.includes('-')) {
        const [lo, hi] = raw.split('-').map(Number);
        el.textContent = prefix + fmt(lo, code) + '–' + fmt(hi, code) + suffix;
      } else {
        el.textContent = prefix + fmt(Number(raw), code) + suffix;
      }
    });
    const label = document.getElementById('tst-curr-label');
    const flag  = document.getElementById('tst-curr-flag');
    if (label) label.textContent = code;
    if (flag)  flag.textContent  = CURRENCIES[code] ? CURRENCIES[code].flag : '🌐';
  }

  function buildSwitcher() {
    const nav = document.querySelector('.nav-links');
    if (!nav) return;

    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;display:flex;align-items:center;';

    const btn = document.createElement('button');
    btn.setAttribute('aria-label', 'Change currency');
    btn.innerHTML = `
      <span id="tst-curr-flag" style="font-size:14px;line-height:1">${CURRENCIES[curr] ? CURRENCIES[curr].flag : '🌐'}</span>
      <span id="tst-curr-label" style="font-size:12px;font-weight:600;letter-spacing:.04em">${curr}</span>
      <span style="font-size:9px;opacity:.55">▾</span>
    `;
    btn.style.cssText = 'display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.18);border-radius:6px;padding:5px 10px;cursor:pointer;color:rgba(255,255,255,0.88);font-family:Inter,sans-serif;transition:background .2s;white-space:nowrap;';
    btn.addEventListener('mouseenter', () => { btn.style.background='rgba(255,255,255,0.18)'; });
    btn.addEventListener('mouseleave', () => { btn.style.background='rgba(255,255,255,0.1)'; });

    const drop = document.createElement('div');
    drop.style.cssText = 'display:none;position:absolute;top:calc(100% + 8px);right:0;background:#fff;border:1px solid #DDD8CE;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.13);min-width:220px;padding:8px;z-index:500;';

    if (isAuto && CURRENCIES[curr]) {
      const hint = document.createElement('p');
      hint.style.cssText = 'font-size:11px;color:#7A7A7A;padding:3px 10px 8px;border-bottom:1px solid #F0EDE7;margin-bottom:4px;font-family:Inter,sans-serif;';
      hint.textContent = `Auto-detected: ${CURRENCIES[curr].name}`;
      drop.appendChild(hint);
    }

    Object.entries(CURRENCIES).forEach(([code, info]) => {
      const item = document.createElement('button');
      const isActive = code === curr;
      item.dataset.code = code;
      item.style.cssText = `display:flex;align-items:center;gap:10px;width:100%;padding:9px 10px;border:none;background:${isActive?'#E8F0EB':'transparent'};cursor:pointer;font-family:Inter,sans-serif;font-size:13px;color:#1C1C1C;border-radius:6px;text-align:left;transition:background .15s;`;
      item.innerHTML = `<span style="font-size:16px;line-height:1">${info.flag}</span><span style="font-weight:${isActive?600:400};flex:1">${info.name}</span><span style="color:#7A7A7A;font-size:11px">${code}</span>`;
      item.addEventListener('mouseenter', () => { if(item.dataset.code !== curr) item.style.background='#F7F4EE'; });
      item.addEventListener('mouseleave', () => { if(item.dataset.code !== curr) item.style.background='transparent'; });
      item.addEventListener('click', () => {
        localStorage.setItem('tst_currency', code);
        isAuto = false;
        applyAll(code);
        open = false;
        drop.style.display = 'none';
        drop.querySelectorAll('button').forEach(b => {
          b.style.background = b.dataset.code === code ? '#E8F0EB' : 'transparent';
          b.querySelector('span:nth-child(2)').style.fontWeight = b.dataset.code === code ? '600' : '400';
        });
      });
      drop.appendChild(item);
    });

    let open = false;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      open = !open;
      drop.style.display = open ? 'block' : 'none';
    });
    document.addEventListener('click', () => {
      if (open) { open = false; drop.style.display = 'none'; }
    });

    wrap.append(btn, drop);
    const cta = nav.querySelector('.nav-cta');
    if (cta) nav.insertBefore(wrap, cta);
    else nav.appendChild(wrap);
  }

  async function init() {
    // Saved preference?
    const saved = localStorage.getItem('tst_currency');
    if (saved && CURRENCIES[saved]) {
      curr   = saved;
      isAuto = false;
    } else {
      // Detect country via IP
      let country = sessionStorage.getItem('tst_country');
      if (!country) {
        try {
          const ctrl = new AbortController();
          const tid  = setTimeout(() => ctrl.abort(), 3000);
          const geo  = await fetch('https://ipapi.co/json/', { signal: ctrl.signal }).then(r => r.json());
          clearTimeout(tid);
          country = geo.country_code || 'US';
          sessionStorage.setItem('tst_country', country);
        } catch {
          country = 'US';
        }
      }
      curr   = COUNTRY_MAP[country] || 'USD';
      isAuto = true;
    }

    // Live exchange rates (cached per session)
    const cachedRates = sessionStorage.getItem('tst_rates');
    if (cachedRates) {
      try { rates = { USD: 1, ...JSON.parse(cachedRates) }; } catch {}
    } else {
      try {
        const ctrl = new AbortController();
        const tid  = setTimeout(() => ctrl.abort(), 4000);
        const data = await fetch('https://api.frankfurter.app/latest?from=USD', { signal: ctrl.signal }).then(r => r.json());
        clearTimeout(tid);
        rates = { USD: 1, ...data.rates };
        sessionStorage.setItem('tst_rates', JSON.stringify(data.rates));
      } catch {
        // use FALLBACK rates already set
      }
    }

    applyAll(curr);
    buildSwitcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
