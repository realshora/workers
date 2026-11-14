(() => {
'use strict';
const DUMMY = document.createElement('div');
const $ = s => document.querySelector(s) || DUMMY;
const VER = '12';
const APP_FILES = ['index.html','style.css','app.js','data.js','manifest.json','sw.js','art.svg','logo-emblem.png','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png','xlsx.mini.min.js','html-to-image.js','tajawal-arabic-500-normal.woff2','tajawal-arabic-700-normal.woff2','tajawal-arabic-800-normal.woff2','tajawal-latin-500-normal.woff2','tajawal-latin-700-normal.woff2','tajawal-latin-800-normal.woff2'];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LS = 'twh_workers_v1';
const CRIT = ['جودة الشغل','الإنتاجية','المعرفة الفنية','الالتزام والانضباط','السلامة والنظافة','الحفاظ على الخامات والمعدات','التعاون والسلوك','المبادرة والتطور'];
const HUES = ['#6366F1','#0EA5E9','#14B8A6','#F59E0B','#EC4899','#8B5CF6','#22C55E'];
const DAYS = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const MONTHS = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const TONE_LABEL = { ok:'مؤهل ويكمل', warn:'يكمل مع متابعة', bad:'تدريب وإعادة تقييم', none:'لم يُقيَّم بعد' };

const I = {
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.5 3.5 5.2"/></svg>',
  trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5"/><path d="M12 14v4M8.5 20h7"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 17v-3M12 17v-6M15 17v-2"/></svg>',
  db:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="3"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c0-.1-.2-.2-.5-.3z"/></svg>',
  user:'<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.7-4 3.7-6 7.5-6s6.8 2 7.5 6"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="15" rx="3.5"/><path d="M8 3v4M16 3v4M4 10h16M9 15l2 2 4-4"/></svg>',
  flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 5h12l-2.5 4L17 13H5"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  zoom:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M11 8.5v5M8.5 11h5"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>'
};

let D = null;           // البيانات بعد المعالجة
let RAW = null;         // البيانات الخام اللي بتتعدّل
let state = { tab:'list', q:'', sec:'', rsec:'' };

/* ---------------- قراءة ملف الإكسل ---------------- */
function parseWorkbook(wb) {
  const S = n => wb.Sheets[n];
  if (!S('التقييم') || !S('الغياب')) throw new Error('الملف ده مش شكل ملف التقييم المعتاد. لازم يكون فيه شيتات: التقييم والغياب.');
  const arr = ws => XLSX.utils.sheet_to_json(ws, { header:1, raw:true, defval:null });
  const cfg = S('الإعدادات');
  const cv = a => { const c = cfg && cfg[a]; return c && typeof c.v === 'number' ? c.v : null; };
  const T = { ok: cv('B3') ?? 4, follow: cv('B4') ?? 3, alert: cv('B5') ?? 2 };

  const ev = arr(S('التقييم'));
  const h = ev.findIndex(r => r && String(r[1] || '').trim() === 'اسم العامل');
  if (h < 0) throw new Error('مش لاقي عمود "اسم العامل" في شيت التقييم.');
  const workers = [], byName = {};
  for (let i = h + 1; i < ev.length; i++) {
    const r = ev[i]; const name = r && r[1] != null ? String(r[1]).trim() : '';
    if (!name) continue;
    const w = { name, section: String(r[2] || '').trim() || 'بدون قسم', scores: [3,4,5,6,7,8,9,10].map(k => typeof r[k] === 'number' ? r[k] : null), status: String(r[15] || '').trim(), abs: [], vio: [] };
    workers.push(w); byName[name] = w;
  }
  const ab = arr(S('الغياب'));
  const ah = ab.findIndex(r => r && String(r[1] || '').trim() === 'اسم العامل');
  if (ah >= 0) {
    const hdr = ab[ah];
    for (let i = ah + 1; i < ab.length; i++) {
      const r = ab[i]; const w = r && r[1] != null ? byName[String(r[1]).trim()] : null;
      if (!w) continue;
      for (let k = 7; k < r.length; k++) {
        const t = r[k] != null ? String(r[k]).trim() : '';
        if (['غياب','إذن','إجازة'].includes(t) && typeof hdr[k] === 'number') w.abs.push({ s: hdr[k], t });
      }
    }
  }
  const vs = S('المخالفات');
  if (vs) {
    const va = arr(vs); const vh = va.findIndex(r => r && String(r[2] || '').trim() === 'اسم العامل');
    if (vh >= 0) for (let i = vh + 1; i < va.length; i++) {
      const r = va[i]; if (!r) continue;
      const w = r[2] != null ? byName[String(r[2]).trim()] : null;
      if (w && typeof r[1] === 'number') w.vio.push({ s: r[1], type: String(r[4] || '').trim(), detail: String(r[5] || '').trim(), action: String(r[6] || '').trim() });
    }
  }
  let month = '';
  const dcell = S('الغياب') && S('الغياب')['D2'];
  if (dcell && typeof dcell.v === 'string' && dcell.v.trim()) month = dcell.v.trim();
  if (!month) {
    const firstDate = workers.flatMap(w => w.abs.concat(w.vio)).map(x => x.s)[0];
    if (firstDate) { const p = ymd(firstDate); month = MONTHS[p.m - 1] + ' ' + p.y; }
  }
  if (!workers.length) throw new Error('الملف مفيهوش عمال.');
  return { month, T, workers };
}

function enrich(raw) {
  const d = JSON.parse(JSON.stringify(raw));
  d.sections = [...new Set(d.workers.map(w => w.section))];
  d.workers.forEach((w, i) => {
    w.id = i; w.secIdx = d.sections.indexOf(w.section); w.hue = HUES[w.secIdx % HUES.length];
    w.complete = w.scores.every(x => x != null);
    w.avg = w.complete ? Math.round(w.scores.reduce((a, b) => a + b, 0) / 8 * 100 + 1e-7) / 100 : null;
    w.tone = toneOf(w.avg, d.T);
    w.cntAbs = w.abs.filter(a => a.t === 'غياب').length;
    w.cntPerm = w.abs.filter(a => a.t === 'إذن').length;
    w.cntLeave = w.abs.filter(a => a.t === 'إجازة').length;
    w.cntVio = w.vio.length;
    w.prevAvg = w.hist && w.hist.length ? w.hist[w.hist.length - 1].avg : null;
    w.alerts = [];
    if (w.complete) { if (w.scores[0] <= d.T.alert) w.alerts.push(CRIT[0]); if (w.scores[4] <= d.T.alert) w.alerts.push(CRIT[4]); }
  });
  const ev = d.workers.filter(w => w.avg != null);
  d.total = ev.length;
  d.workers.forEach(w => {
    if (w.avg == null) { w.rank = null; w.srank = null; w.stotal = 0; return; }
    w.rank = 1 + ev.filter(o => o.avg > w.avg).length;
    const sec = ev.filter(o => o.section === w.section);
    w.srank = 1 + sec.filter(o => o.avg > w.avg).length; w.stotal = sec.length;
  });
  return d;
}
function toneOf(avg, T) {
  T = T || (D && D.T) || { ok:4, follow:3 };
  if (avg == null) return 'none';
  return avg >= T.ok ? 'ok' : avg >= T.follow ? 'warn' : 'bad';
}
const scTone = v => v >= 4 ? 'ok' : v >= 3 ? 'warn' : 'bad';
const byRank = (a, b) => (a.avg == null) - (b.avg == null) || (b.avg - a.avg) || (a.cntAbs - b.cntAbs) || a.name.localeCompare(b.name, 'ar');
const fmt = v => v == null ? '—' : (Math.round(v * 100) / 100).toString();
const ymd = s => { const t = new Date(Math.round((s - 25569) * 86400000)); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; };
function fmtDate(s) { const p = ymd(s); const wd = new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay(); return `${DAYS[wd]} ${p.d} ${MONTHS[p.m - 1]}`; }
function shortDate(s) { const p = ymd(s); const wd = new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay(); return `${DAYS[wd]} ${p.d}`; }

function stats(list) {
  const ev = list.filter(w => w.avg != null);
  const sum = k => list.reduce((a, w) => a + w[k], 0);
  return {
    n: list.length, evn: ev.length,
    avg: ev.length ? Math.round(ev.reduce((a, w) => a + w.avg, 0) / ev.length * 100) / 100 : null,
    dec: { ok: list.filter(w => w.tone === 'ok').length, warn: list.filter(w => w.tone === 'warn').length, bad: list.filter(w => w.tone === 'bad').length, none: list.filter(w => w.tone === 'none').length },
    crit: CRIT.map((_, k) => ev.length ? ev.reduce((a, w) => a + w.scores[k], 0) / ev.length : null),
    abs: sum('cntAbs'), perm: sum('cntPerm'), leave: sum('cntLeave'), vio: sum('cntVio')
  };
}

/* ---------------- مكوّنات الرسم ---------------- */
function ring(avg, size = 128) {
  const tone = toneOf(avg), r = 52, c = 2 * Math.PI * r, p = avg == null ? 0 : Math.min(avg / 5, 1);
  return `<div class="ring tone-${tone}" style="width:${size}px;height:${size}px"><svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="${r}" fill="none" stroke="#ECEEF5" stroke-width="13"/>${p > 0 ? `<circle cx="64" cy="64" r="${r}" fill="none" stroke="var(--t)" stroke-width="13" stroke-linecap="round" stroke-dasharray="${(c * p).toFixed(1)} ${c.toFixed(1)}"/>` : ''}</svg><div class="c"><b>${fmt(avg)}</b><span>من 5</span></div></div>`;
}
const wave = '<svg class="wave" viewBox="0 0 400 34" preserveAspectRatio="none"><path d="M0 18C70 36 140 0 220 14S350 30 400 8V34H0Z" fill="#fff"/></svg>';
function critRows(vals, seg) {
  return CRIT.map((n, k) => { const v = vals[k]; const t = v == null ? 'none' : scTone(v);
    const bar = seg ? `<div class="seg">${[1,2,3,4,5].map(i => `<i class="${v != null && i <= v ? 'on' : ''}"></i>`).join('')}</div>` : `<div class="bar"><i style="width:${v == null ? 0 : v / 5 * 100}%"></i></div>`;
    return `<div class="crow tone-${t}"><span>${n}</span><b>${v == null ? '—' : fmt(Math.round(v * 10) / 10)}</b>${bar}</div>`; }).join('');
}
function insight(vals) {
  const ok = vals.map((v, i) => [v, i]).filter(x => x[0] != null);
  if (!ok.length) return '';
  const mx = ok.reduce((a, b) => b[0] > a[0] ? b : a), mn = ok.reduce((a, b) => b[0] < a[0] ? b : a);
  if (mx[0] === mn[0]) return `<div class="insight"><div class="up" style="flex:1">مستوى متوازن في كل الجوانب<b>${fmt(Math.round(mx[0] * 10) / 10)} من 5</b></div></div>`;
  return `<div class="insight"><div class="up">أقوى نقطة<b>${CRIT[mx[1]]}</b></div><div class="dn">محتاج تحسين<b>${CRIT[mn[1]]}</b></div></div>`;
}
const tiles = arr => `<div class="tiles">${arr.map(t => `<div class="tile ${t[2] || ''}"><b>${t[1]}</b><span>${t[0]}</span></div>`).join('')}</div>`;
const foot = () => `<div class="sfoot">AL-TAWHEED EGYPT</div>`;

/* ---------------- قالب التقارير الموحّد (ورقة A4) ---------------- */
const TC = { ok: '#2FBF8A', warn: '#F5A031', bad: '#F0506E', none: '#CBB9A0' };
const cTone = v => v == null ? 'none' : v >= 4 ? 'ok' : v >= 3 ? 'warn' : 'bad';
function sheetFrame(o) {
  const nm = String(o.name || '');
  return `<div class="fit"><div class="sheet tone-${o.tone}">
    <aside class="sd"><div class="sd-top"><div class="sd-logo"><img src="logo-emblem.png" alt=""></div><h3>التوحيد إيجيبت</h3><small>AL-TAWHEED EGYPT</small>
      <div class="sd-score"><b>${o.score}</b><span>${o.unit}</span></div><span class="sd-pill">${o.pill}</span>${o.sub || ''}</div>
      ${(o.ranks || []).map(r => `<div class="rk2"><b>${r.v}${r.s ? `<small>${r.s}</small>` : ''}</b><span>${r.l}</span></div>`).join('')}
      <div class="sd-tiles">${o.tiles.map(t => `<div><b>${t[0]}</b><span>${t[1]}</span></div>`).join('')}</div><i class="sd-line"></i></aside>
    <main class="rs-main"><i class="rs-bar"></i><div class="rs-top"><span>قسم التجهيز</span><b>${esc(D.month)}</b></div><div class="rs-title">${o.title}</div>
      <div class="rs-who"><div><h1 class="rs-name${nm.length > 17 ? ' sm' : ''}">${esc(nm)}</h1><div class="rs-tags">${(o.tags || []).filter(Boolean).map(t => `<span>${esc(t)}</span>`).join('')}</div></div>${o.photo ? `<img class="rs-ph" src="${o.photo}" alt="">` : ''}</div>
      ${o.alert ? `<div class="rs-al">${o.alert}</div>` : ''}
      ${o.body}
      <div class="rs-sign"><div>مسؤول القسم</div><div>مدير الإنتاج</div></div><div class="rs-foot">AL-TAWHEED EGYPT</div>
    </main></div></div>`;
}
const H = t => `<div class="rs-h">${t}</div>`;
const tr = cells => `<tr>${cells.map(c => typeof c === 'object' ? `<td class="${c.c || ''}">${c.h}</td>` : `<td>${c}</td>`).join('')}</tr>`;
const tbl = (cols, rows, empty) => `<table class="rs-t"><colgroup>${cols.map(c => `<col${c[1] ? ` style="width:${c[1]}"` : ''}>`).join('')}</colgroup><thead><tr>${cols.map(c => `<th${c[2] ? ` class="${c[2]}"` : ''}>${c[0]}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.join('') : `<tr><td colspan="${cols.length}" class="mut" style="text-align:center">${empty || '—'}</td></tr>`}</tbody></table>`;
const critGrid = (vals, cont) => `<div class="rs-cr">${CRIT.map((n, k) => { const v = vals[k], t = cTone(v);
  const bar = cont ? `<div class="bc"><i style="width:${v == null ? 0 : v / 5 * 100}%"></i></div>` : `<div class="seg3">${[1, 2, 3, 4, 5].map(x => `<i class="${v != null && x <= v ? 'on' : ''}"></i>`).join('')}</div>`;
  return `<div class="rs-c c-${t}"><div class="t"><span>${n}</span><b>${v == null ? '—' : fmt(Math.round(v * 10) / 10)}</b></div>${bar}</div>`; }).join('')}</div>`;
function rsIns(vals, l1, l2) {
  const ok = vals.map((v, i) => [v, i]).filter(x => x[0] != null); if (!ok.length) return '';
  const mx = ok.reduce((p, q) => q[0] > p[0] ? q : p), mn = ok.reduce((p, q) => q[0] < p[0] ? q : p);
  return mx[0] === mn[0] ? `<div class="rs-ins"><div class="up">مستوى متوازن في كل الجوانب<b>${fmt(Math.round(mx[0] * 10) / 10)} من 5</b></div></div>` : `<div class="rs-ins"><div class="up">${l1}<b>${CRIT[mx[1]]}</b></div><div class="dn">${l2}<b>${CRIT[mn[1]]}</b></div></div>`;
}
const distBar = st => { const ks = ['ok', 'warn', 'bad', 'none'].filter(k => st.dec[k]);
  return ks.length ? `<div class="rs-dist">${ks.map(k => `<i style="flex:${st.dec[k]};background:${TC[k]}"></i>`).join('')}</div><div class="rs-leg">${ks.map(k => `<span style="--lc:${TC[k]}">${TONE_LABEL[k]} (${st.dec[k]})</span>`).join('')}</div>` : ''; };

/* ---------------- تقرير العامل ---------------- */
function workerCard(w) {
  const abs = w.abs.slice().sort((x, y) => x.s - y.s), vio = w.vio.slice().sort((x, y) => x.s - y.s), ev = w.avg != null;
  let prev = '';
  if (w.prevAvg != null && ev) { const df = Math.round((w.avg - w.prevAvg) * 100) / 100; prev = `<div class="sd-prev">التقييم السابق ${fmt(w.prevAvg)}، ${df > 0 ? 'ارتفع ' + fmt(df) : df < 0 ? 'انخفض ' + fmt(-df) : 'ثابت'}</div>`; }
  return sheetFrame({ tone: w.tone, score: fmt(w.avg), unit: 'من 5', pill: TONE_LABEL[w.tone], sub: prev,
    ranks: [{ v: ev ? w.rank : '—', s: ev ? D.total + ' /' : '', l: 'الترتيب العام' }, { v: ev ? w.srank : '—', s: ev ? w.stotal + ' /' : '', l: 'الترتيب في القسم' }],
    tiles: [[w.cntAbs, 'غياب'], [w.cntPerm, 'إذن'], [w.cntLeave, 'إجازة'], [w.cntVio, 'مخالفات']],
    title: 'تقرير تقييم الأداء الشهري', name: w.name, tags: [w.section, w.status ? 'عامل ' + w.status : ''], photo: w.photo,
    alert: w.alerts.length ? 'تنبيه: درجة منخفضة في ' + w.alerts.join(' و ') : '',
    body: H('التقييم التفصيلي') + (w.complete ? critGrid(w.scores, false) + rsIns(w.scores, 'أقوى نقطة', 'محتاج تحسين') : '<div class="rs-none">لم يتم إدخال تقييم هذا الشهر</div>')
      + H('سجل الغياب والإذن والإجازات') + tbl([['التاريخ', '34%'], ['النوع', '20%'], ['السبب']], abs.map(x => tr([fmtDate(x.s), x.t, { h: esc(x.r || '—'), c: 'mut' }])), 'لا يوجد غياب أو إذن أو إجازة')
      + H('المخالفات') + tbl([['التاريخ', '30%'], ['سبب المخالفة'], ['الإجراء', '22%']], vio.map(x => tr([fmtDate(x.s), esc(x.type) + (x.detail ? ': ' + esc(x.detail) : ''), { h: esc(x.action || '—'), c: 'mut' }])), 'لا توجد مخالفات مسجلة') });
}

/* ---------------- تقرير القسم / القسم كله ---------------- */
function reportCard(sec) {
  const list = sec ? D.workers.filter(w => w.section === sec) : D.workers;
  const st = stats(list), tone = toneOf(st.avg), sorted = list.slice().sort(byRank), best = sorted.find(w => w.avg != null);
  const needs = list.filter(w => w.alerts.length || w.cntVio || w.cntAbs >= 3).sort(byRank);
  const needRows = needs.map(w => tr([esc(w.name), { h: [w.alerts.length ? 'درجة منخفضة: ' + w.alerts.join(' و ') : '', w.cntVio ? 'مخالفات: ' + w.cntVio : '', w.cntAbs >= 3 ? 'غياب: ' + w.cntAbs + ' أيام' : ''].filter(Boolean).join('، '), c: 'mut' }]));
  const rk = w => sec ? w.srank : w.rank;
  const wRow = (w, withSec) => tr([{ h: rk(w) ?? '—', c: 'n' }, esc(w.name)].concat(withSec ? [esc(w.section)] : []).concat([{ h: fmt(w.avg), c: 'n' }].concat(withSec ? [] : [{ h: w.cntAbs, c: 'n' }, { h: w.cntVio, c: 'n' }])));
  let body = H('متوسط الجوانب') + critGrid(st.crit, true) + rsIns(st.crit, 'أقوى جانب', 'أضعف جانب') + H('قرارات التقييم') + distBar(st);
  if (sec) body += H('ترتيب العمال') + tbl([['#', '10%', 'n'], ['العامل'], ['المتوسط', '16%', 'n'], ['غياب', '14%', 'n'], ['مخالفات', '16%', 'n']], sorted.map(w => wRow(w, false)));
  else {
    const secs = D.sections.map(s => { const l = D.workers.filter(w => w.section === s); return { s, st: stats(l) }; }).sort((x, y) => (y.st.avg ?? -1) - (x.st.avg ?? -1));
    const ev = sorted.filter(w => w.avg != null);
    body += H('مقارنة الأقسام') + tbl([['القسم'], ['العمال', '12%', 'n'], ['المتوسط', '15%', 'n'], ['مؤهل', '12%', 'n'], ['غياب', '12%', 'n'], ['مخالفات', '14%', 'n']], secs.map(x => tr([esc(x.s), { h: x.st.n, c: 'n' }, { h: fmt(x.st.avg), c: 'n' }, { h: x.st.dec.ok, c: 'n' }, { h: x.st.abs, c: 'n' }, { h: x.st.vio, c: 'n' }])))
      + H('الأعلى تقييمًا') + tbl([['#', '10%', 'n'], ['العامل'], ['القسم', '28%'], ['المتوسط', '16%', 'n']], ev.slice(0, 5).map(w => wRow(w, true)))
      + H('الأقل تقييمًا') + tbl([['#', '10%', 'n'], ['العامل'], ['القسم', '28%'], ['المتوسط', '16%', 'n']], ev.slice(-5).reverse().map(w => wRow(w, true)));
  }
  body += H('تنبيهات ومتابعة') + tbl([['العامل', '34%'], ['الملاحظة']], needRows, 'لا توجد تنبيهات أو مخالفات');
  return sheetFrame({ tone, score: fmt(st.avg), unit: 'من 5', pill: sec ? 'متوسط القسم' : 'متوسط التجهيز',
    sub: best ? `<div class="sd-prev">الأعلى: ${esc(best.name)} (${fmt(best.avg)})</div>` : '',
    ranks: [{ v: st.n, l: 'عدد العمال' }, { v: st.dec.ok, s: st.n + ' /', l: 'مؤهل ويكمل' }],
    tiles: [[st.abs, 'غياب'], [st.perm, 'إذن'], [st.leave, 'إجازة'], [st.vio, 'مخالفات']],
    title: sec ? 'تقرير أداء القسم الشهري' : 'تقرير الأداء الشهري لقسم التجهيز', name: sec ? 'قسم ' + sec : 'قسم التجهيز كامل',
    tags: [st.n + ' عامل', sec ? '' : D.sections.length + ' أقسام', st.dec.none ? st.dec.none + ' لم يُقيَّم' : ''], body });
}

/* ---------------- الشاشات الرئيسية ---------------- */
const emptyState = () => `<div class="card empty"><div class="big">${I.users}</div><h2>لسه مفيش عمال</h2><p>ابدأ بإضافة أول عامل، أو ارفع ملف الإكسل بتاعك لو عندك.</p><div class="row2" style="justify-content:center"><button class="btn" data-act="add">إضافة عامل</button><button class="btn ghost2" data-act="import">رفع ملف Excel</button></div></div>`;

function renderList() {
  const el = $('#v-list');
  if (!D) { el.innerHTML = emptyState(); return; }
  const st = stats(D.workers);
  const q = state.q.trim();
  let list = D.workers.filter(w => (!state.sec || w.section === state.sec) && (!q || w.name.includes(q)));
  el.innerHTML = `
    <div class="bento"><div class="bb avg"><i class="tape"></i><span>متوسط التقييم</span><b>${fmt(st.avg)}</b></div><div class="bb"><b>${D.workers.length}</b><span>عامل</span></div><div class="bb sun"><b>${st.dec.ok}</b><span>مؤهل ويكمل</span></div></div>
    <div class="stick"><label class="search">${I.search}<input id="q" placeholder="ابحث باسم العامل" aria-label="ابحث باسم العامل" value="${esc(state.q)}" autocomplete="off"></label>
    <div class="chips"><button class="fchip ${state.sec ? '' : 'on'}" data-sec="">الكل</button>${D.sections.map(s => `<button class="fchip ${state.sec === s ? 'on' : ''}" data-sec="${esc(s)}">${esc(s)}</button>`).join('')}</div></div>
    <div class="list" id="wl"></div>`;
  fillWL(list);
  $('#q').addEventListener('input', e => { state.q = e.target.value; fillWL(D.workers.filter(w => (!state.sec || w.section === state.sec) && (!state.q.trim() || w.name.includes(state.q.trim())))); });
}
function fillWL(list) {
  $('#wl').innerHTML = list.length ? list.map(w => `<button class="wrow tone-${w.tone}" data-w="${w.id}" >${w.photo ? `<div class="av ph"><img src="${w.photo}" alt=""></div>` : `<div class="av">${I.user}</div>`}<div class="wmain"><b>${esc(w.name)}</b><small>${esc(w.section)}${w.rank ? '، الترتيب ' + w.rank : ''}</small></div><div class="wscore ${w.avg == null ? 'na' : ''}">${w.avg == null ? 'لم يقيَّم' : fmt(w.avg)}</div></button>`).join('') : `<div class="card empty" style="padding:26px"><p style="margin:0">مفيش نتايج</p></div>`;
}
function renderRank() {
  const el = $('#v-rank');
  if (!D) { el.innerHTML = emptyState(); return; }
  const list = D.workers.filter(w => !state.rsec || w.section === state.rsec).sort(byRank);
  const rankIn = w => state.rsec ? w.srank : w.rank;
  el.innerHTML = `<div class="chips"><button class="fchip ${state.rsec ? '' : 'on'}" data-rsec="">كل العمال</button>${D.sections.map(s => `<button class="fchip ${state.rsec === s ? 'on' : ''}" data-rsec="${esc(s)}">${esc(s)}</button>`).join('')}</div>
  <div class="list">${list.map(w => { const r = rankIn(w); return `<button class="rrow tone-${w.tone}" data-w="${w.id}"><div class="rk ${r && r <= 3 ? 'g' + r : ''}">${r ?? '—'}</div><div class="rbody"><div class="l1"><b>${esc(w.name)}</b><em>${w.avg == null ? '—' : fmt(w.avg)}</em></div><small>${state.rsec ? TONE_LABEL[w.tone] : esc(w.section)}</small><div class="bar"><i style="width:${w.avg == null ? 0 : w.avg / 5 * 100}%"></i></div></div></button>`; }).join('')}</div>`;
}
function renderReports() {
  const el = $('#v-rep');
  if (!D) { el.innerHTML = emptyState(); return; }
  const all = stats(D.workers);
  const card = (title, sub, st, hue, icon, attr) => `<button class="rep tone-${toneOf(st.avg)}" ${attr} ><div class="ic">${icon}</div><div class="tx"><b>${esc(title)}</b><small>${sub}</small></div><div class="av2">${fmt(st.avg)}</div></button>`;
  el.innerHTML = `<div class="list">${card('تقرير قسم التجهيز كامل', `${all.n} عامل في كل الأقسام`, all, '#4F46E5', I.chart, 'data-r=""')}</div>
    <div class="h2">تقارير الأقسام (كل قسم لوحده)</div>
    <div class="list">${D.sections.map((s, i) => { const l = D.workers.filter(w => w.section === s), st = stats(l); return card(s, `${st.n} عمال، ${st.dec.ok} مؤهل، ${st.dec.warn} متابعة`, st, HUES[i % HUES.length], I.doc, `data-r="${esc(s)}"`); }).join('')}</div>`;
}
function renderData() {
  const el = $('#v-data');
  if (!D) { el.innerHTML = emptyState(); return; }
  const tm = localStorage.getItem('twh_theme') || 'dark';
  el.innerHTML = `<div class="card info"><h3>المظهر</h3><div class="seg2">${[['dark', 'داكن'], ['light', 'فاتح'], ['auto', 'تلقائي']].map(x => `<button data-th="${x[0]}" class="${tm === x[0] ? 'on' : ''}">${x[1]}</button>`).join('')}</div></div>
    <div class="card info"><h3>الشهر الحالي</h3><input class="fin" id="monthIn" aria-label="اسم الشهر" value="${esc(D.month)}" placeholder="مثال: ديسمبر 2026"><p style="margin-top:10px">${D.workers.length} عامل، ${D.sections.length} أقسام<br>آخر تعديل: ${esc(D.importedAt || '—')}</p><div class="row2"><button class="btn" data-act="newmonth">بدء شهر جديد</button></div></div>
    <div class="card info"><h3>نسخة احتياطية</h3><p>كل تعديلاتك بتتخزن على موبايلك. احفظ نسخة من وقت للتاني عشان لو اتمسحت بيانات المتصفح أو غيرت الموبايل.</p><div class="row2"><button class="btn" data-act="backup">حفظ نسخة احتياطية</button><button class="btn ghost2" data-act="restore">استرجاع نسخة</button></div></div>
    <div class="card info"><h3>تحديث التطبيق</h3><p>الإصدار ${VER}. لو التطبيق مش بيتحدث أو في حاجة مش شغالة، دوس الزرار وهيحمّل آخر نسخة. بياناتك مش بتتمسح.</p><div class="row2"><button class="btn ghost2" data-act="refreshapp">تحديث التطبيق لآخر نسخة</button><button class="btn ghost2" data-act="check">فحص ملفات التطبيق</button></div></div>
    <div class="card info"><h3>استيراد من Excel</h3><p>اختياري. الملف بيحل محل البيانات الحالية.</p><div class="row2"><button class="btn ghost2" data-act="import">اختيار ملف Excel</button>${D.builtin ? '' : '<button class="btn danger" data-act="clear">الرجوع للبيانات الأصلية</button>'}</div></div>`;
}
function applyTheme(m) { const light = m === 'light' || (m === 'auto' && matchMedia('(prefers-color-scheme: light)').matches); document.documentElement.dataset.theme = light ? 'light' : 'dark'; const mt = document.querySelector('meta[name=theme-color]'); if (mt) mt.content = light ? '#F6F0E6' : '#1B0C03'; }
function setTheme(m) { try { localStorage.setItem('twh_theme', m); } catch (e) {} applyTheme(m); renderData(); }
function reportErr(e) { console.error(e); const b = document.getElementById('fixbtn'); if (b) { b.classList.remove('hide'); b.innerHTML = 'التطبيق مش بيفتح؟ دوس هنا للتحديث<br><small>' + esc(String(e && e.message || e)).slice(0, 90) + '</small>'; } }
function renderAll() { [renderList, renderAtt, renderVio, renderRank, renderReports, renderData].forEach(f => { try { f(); } catch (e) { reportErr(e); } }); $('#month').textContent = D ? D.month : ''; }
function setTab(t) {
  state.tab = t;
  ['list','att','vio','rank','rep','data'].forEach(k => $('#v-' + k).classList.toggle('hide', k !== t));
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('on', b.dataset.tab === t));
  $('#title').textContent = { list:'عمال التجهيز', att:'الحضور والغياب', vio:'المخالفات', rank:'ترتيب العمال', rep:'التقارير', data:'البيانات' }[t];
  $('#fab').classList.toggle('hide', t !== 'list');
  try { if (D) ({ att: renderAtt, vio: renderVio, list: renderList, rank: renderRank, rep: renderReports, data: renderData })[t](); } catch (e) { reportErr(e); } syncVioBar();
  const vw = $('#v-' + t); vw.classList.remove('vin'); void vw.offsetWidth; vw.classList.add('vin');
  window.scrollTo(0, 0);
}

/* ---------------- صفحة التفاصيل + الصورة ---------------- */
let cur = null;
let zoomed = false;
function fitSheet() {
  const fit = document.querySelector('#shot .fit'); if (!fit) return;
  fit.classList.toggle('zoom', zoomed); $('#zoomBtn').classList.toggle('on', zoomed); const zs = $('#zoomBtn span'); if (zs) zs.textContent = zoomed ? 'تصغير' : 'تكبير';
  const sh = fit.firstElementChild, sc = zoomed ? 1 : Math.min(1, fit.clientWidth / 800);
  sh.style.transform = `scale(${sc})`; fit.style.height = Math.ceil(sh.offsetHeight * sc) + 'px';
}
function setShot(html) {
  const s = $('#shot'); zoomed = false; s.innerHTML = html; $('#zoomBtn').classList.toggle('hide', !s.querySelector('.sheet')); s.classList.toggle('wide', !!s.querySelector('.sheet'));
  fitSheet(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitSheet);
}
window.addEventListener('resize', fitSheet);
function openPage(title, html, file, wid) {
  $('#ptitle').textContent = title;
  setShot(html);
  cur = { title, file, blob: null, wid: wid == null ? null : wid };
  $('#editBtn').classList.toggle('hide', wid == null); $('#wbtns').classList.toggle('hide', wid == null);
  $('#page').classList.add('show'); $('#actions').classList.remove('hide'); $('#page').scrollTop = 0;
  history.pushState({ p: 1 }, '');
  setTimeout(() => getBlob().catch(() => {}), 450);
}
function closePage() { $('#page').classList.remove('show'); $('#actions').classList.add('hide'); cur = null; }
async function getBlob() {
  if (!cur) throw new Error('no page');
  if (!cur.blob) { const mine = cur; mine.blob = renderPng($('#shot')).catch(err => { mine.blob = null; throw err; }); }
  return cur.blob;
}
async function renderPng(node) {
  if (typeof htmlToImage === 'undefined') throw new Error('ملف html-to-image.js مش مرفوع على GitHub. دوس فحص ملفات التطبيق في تبويب البيانات.');
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  const sheet = node.querySelector('.sheet'), target = sheet || node;
  const opt = sheet ? { style: { transform: 'none' }, backgroundColor: '#FCF7F0' } : { backgroundColor: '#1B0C03' };
  const w = target.offsetWidth, h = target.offsetHeight;
  const r = Math.min(3, 4096 / w, 5200 / h, Math.sqrt(7e6 / (w * h)));
  let lastErr;
  for (const ratio of [r, Math.min(r, 1.6), 1]) {
    try { const b = await htmlToImage.toBlob(target, Object.assign({ pixelRatio: Math.max(ratio, .8), cacheBust: false }, opt)); if (b && b.size > 1000) return b; }
    catch (e) { lastErr = e; console.error(e); }
  }
  throw lastErr || new Error('empty image');
}
function busy(on) { document.querySelectorAll('.act').forEach(b => b.disabled = on); if (on) toast('جاري تجهيز الصورة…', { sticky: true }); else hideToast(); }
async function withBlob(fn) {
  busy(true); let b;
  try { b = await getBlob(); if (!b) throw new Error('empty'); }
  catch (e) { busy(false); console.error(e); toast(e && e.message && e.message.startsWith('ملف') ? e.message : 'حصلت مشكلة في عمل الصورة، جرب تاني'); return; }
  busy(false);
  try { await fn(b); } catch (e) { console.error(e); toast('تعذّر تنفيذ العملية، جرب تاني'); }
}
function download(b) { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = cur.file + '.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000); }
const doSave = () => withBlob(async b => { download(b); toast('الصورة اتحفظت (في التحميلات)'); });
const doShare = () => withBlob(async b => {
  const f = new File([b], cur.file + '.png', { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [f] })) {
    try { await navigator.share({ files: [f], title: cur.title }); } catch (e) { if (e && e.name !== 'AbortError') throw e; }
  } else { download(b); toast('الصورة اتحفظت، ابعتها من الواتساب'); window.open('https://wa.me/', '_blank'); }
});
const doCopy = () => withBlob(async b => {
  try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': b })]); toast('الصورة اتنسخت، الصقها في أي محادثة'); }
  catch (e) { toast('المتصفح مش سامح بنسخ الصورة، استخدم حفظ'); }
});
let tT;
function toast(m, o = {}) {
  const t = $('#toast'); t.innerHTML = ''; const s = document.createElement('span'); s.textContent = m; t.appendChild(s);
  if (o.label) { const b = document.createElement('button'); b.textContent = o.label; b.onclick = () => { hideToast(); o.fn(); }; t.appendChild(b); }
  t.classList.toggle('has-act', !!o.label); t.classList.add('show'); clearTimeout(tT);
  if (!o.sticky) tT = setTimeout(hideToast, o.label ? 6500 : 2600);
}
function hideToast() { $('#toast').classList.remove('show'); }
function ask(o) {
  return new Promise(res => {
    const d = document.createElement('div'); d.className = 'dlg';
    d.innerHTML = `<div class="box" role="dialog" aria-modal="true"><h3>${esc(o.title || '')}</h3>${o.text ? `<p>${esc(o.text)}</p>` : ''}${o.input ? `<input class="fin" id="dlgIn" placeholder="${esc(o.input)}" aria-label="${esc(o.input)}" autocomplete="off">` : ''}<div class="row2"><button class="btn ${o.danger ? 'danger' : ''}" data-d="ok">${esc(o.ok || 'تأكيد')}</button><button class="btn ghost2" data-d="no">إلغاء</button></div></div>`;
    document.body.appendChild(d);
    const done = v => { d.remove(); res(v); };
    d.addEventListener('click', e => { const k = e.target.dataset && e.target.dataset.d; if (k === 'ok') done(o.input ? (d.querySelector('#dlgIn').value.trim() || null) : true); else if (k === 'no' || e.target === d) done(null); });
    const inp = d.querySelector('input'); if (inp) setTimeout(() => inp.focus(), 60);
  });
}

/* ---------------- استيراد وتخزين ---------------- */
function save(raw) { try { localStorage.setItem(LS, JSON.stringify(raw)); } catch (e) { toast('مقدرتش أحفظ البيانات على الجهاز'); } }
const now = () => new Date().toLocaleString('en-GB', { hour12: false }).slice(0, 17);
function sanitize(r) {
  r.T = r.T || { ok: 4, follow: 3, alert: 2 }; r.month = String(r.month || ''); r.workers = (r.workers || []).filter(w => w && w.name);
  r.workers.forEach(w => { w.name = String(w.name); w.section = String(w.section || 'بدون قسم'); w.status = String(w.status || '');
    w.scores = Array.from({ length: 8 }, (_, k) => typeof (w.scores || [])[k] === 'number' ? w.scores[k] : null);
    w.abs = (w.abs || []).filter(x => x && typeof x.s === 'number'); w.vio = (w.vio || []).filter(x => x && typeof x.s === 'number'); });
  return r;
}
function rebuild() { if (!RAW) { D = null; return; } D = enrich(RAW); D.fileName = RAW.fileName; D.importedAt = RAW.importedAt; D.builtin = !!RAW.builtin; }
function load() {
  try { const r = localStorage.getItem(LS); if (r) RAW = sanitize(JSON.parse(r)); } catch (e) { RAW = null; }
  if (!RAW && window.BUILTIN) { RAW = sanitize(JSON.parse(JSON.stringify(window.BUILTIN))); RAW.builtin = true; }
  try { rebuild(); } catch (e) { reportErr(e); RAW = null; if (window.BUILTIN) { RAW = sanitize(JSON.parse(JSON.stringify(window.BUILTIN))); RAW.builtin = true; rebuild(); } }
}
let skipRefresh = false;
function commit(msg) {
  RAW.builtin = false; RAW.fileName = RAW.fileName || 'تعديل داخل التطبيق'; RAW.importedAt = now();
  save(RAW); rebuild(); renderAll(); if (!skipRefresh) refreshPage(); if (msg) toast(msg);
}
function refreshPage() {
  if (!cur || cur.wid == null) return;
  const w = D.workers[cur.wid]; if (!w) return;
  setShot(workerCard(w)); $('#ptitle').textContent = w.name; cur.file = `تقييم ${w.name} - ${D.month}`; cur.blob = null;
  setTimeout(() => getBlob().catch(() => {}), 450);
}
async function importFile(file) {
  try {
    let raw;
    if (/\.json$/i.test(file.name)) {
      raw = JSON.parse(await file.text());
      if (!raw || !Array.isArray(raw.workers)) throw new Error('الملف ده مش نسخة احتياطية صحيحة.');
      raw.T = raw.T || { ok: 4, follow: 3, alert: 2 };
    } else {
      if (typeof XLSX === 'undefined') throw new Error('ملف xlsx.mini.min.js مش مرفوع على GitHub.');
      raw = parseWorkbook(XLSX.read(await file.arrayBuffer(), { type: 'array' })); raw.fileName = file.name;
    }
    raw.importedAt = now(); raw.builtin = false; RAW = raw;
    state.q = ''; state.sec = ''; state.rsec = '';
    commit(`تم التحديث: ${RAW.workers.length} عامل`); setTab('list');
  } catch (e) { console.error(e); toast(e.message || 'مقدرتش أقرا الملف'); }
}

/* ---------------- تعديل البيانات من التطبيق ---------------- */
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const isoToSerial = iso => { const [y, m, d] = iso.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 86400000) + 25569; };
let ed = null;
function openEditor(i, mode) {
  const base = i >= 0 ? RAW.workers[i] : { name: '', section: '', scores: Array(8).fill(null), status: '', abs: [], vio: [] };
  ed = { i, mode: mode || '', w: JSON.parse(JSON.stringify(base)) };
  const w = ed.w, hd = ed.mode === 'reeval' ? ' hide' : '', uniq = f => [...new Set(RAW.workers.flatMap(x => f(x)).filter(Boolean))];
  const dl = (id, arr) => `<datalist id="${id}">${arr.map(v => `<option value="${esc(v)}">`).join('')}</datalist>`;
  $('#editor').innerHTML = `<div class="pbar"><button class="back" data-e="cancel" aria-label="رجوع">${I.back}</button><h2>${i < 0 ? 'عامل جديد' : (ed.mode === 'reeval' ? 'إعادة تقييم ' : 'تعديل ') + esc(w.name)}</h2></div>
  <div class="ebody">
    <div class="fs${hd}"><h3>بيانات العامل</h3><label>الاسم<input id="eName" value="${esc(w.name)}" autocomplete="off"></label>
      <label>القسم<input id="eSec" list="dlSecs" value="${esc(w.section)}" placeholder="اختار قسم أو اكتب قسم جديد" autocomplete="off"></label>
      <div class="seg2" id="eStatus"><button data-e="status" data-v="قديم">عامل قديم</button><button data-e="status" data-v="جديد">عامل جديد</button></div></div>
    <div class="fs" id="sScores"><h3>التقييم من 1 إلى 5</h3>${CRIT.map((n, k) => `<div class="srow"><span>${n}</span><div class="nums" data-k="${k}">${[1,2,3,4,5].map(v => `<button data-e="score" data-k="${k}" data-v="${v}">${v}</button>`).join('')}</div></div>`).join('')}</div>
    <div class="fs${hd}"><h3>صورة العامل</h3><div class="phrow"><div class="phbox" id="phBox">${w.photo ? `<img src="${w.photo}" alt="">` : 'بدون صورة'}</div><div><label class="btn ghost2 sm" for="phFile">اختيار صورة</label><input type="file" id="phFile" accept="image/*" hidden><button class="btn danger sm" data-e="rmphoto">حذف الصورة</button></div></div></div>
    <div class="fs${hd}"><h3>تسجيل غياب أو إذن أو إجازة</h3><label>التاريخ<input type="date" id="aDate" value="${todayISO()}"></label><label>السبب (اختياري)<input id="aReason" placeholder="مثال: ظرف عائلي" autocomplete="off"></label>
      <div class="seg2"><button data-e="abs" data-v="غياب">غياب</button><button data-e="abs" data-v="إذن">إذن</button><button data-e="abs" data-v="إجازة">إجازة</button></div><div id="absList"></div></div>
    <div class="fs${hd}"><h3>تسجيل مخالفة</h3><label>التاريخ<input type="date" id="vDate" value="${todayISO()}"></label><label>نوع المخالفة<input id="vType" list="dlTypes" placeholder="مثال: تأخير" autocomplete="off"></label><label>التفاصيل<textarea id="vDet" rows="2" placeholder="اختياري"></textarea></label><label>الإجراء<input id="vAct" list="dlActs" placeholder="مثال: إنذار شفهي" autocomplete="off"></label>
      <button class="btn" data-e="addvio" style="margin-top:10px">إضافة المخالفة</button><div id="vioList"></div></div>
    ${i >= 0 && !ed.mode ? '<button class="btn danger" data-e="del" style="width:100%">حذف العامل</button>' : ''}
  </div>
  ${dl('dlSecs', uniq(x => [x.section]))}${dl('dlTypes', uniq(x => x.vio.map(v => v.type)))}${dl('dlActs', uniq(x => x.vio.map(v => v.action)))}
  <div class="actions"><div class="inner"><button class="act main" data-e="save">حفظ</button><button class="act" data-e="cancel">إلغاء</button></div></div>`;
  paintEd(); absList(); vioList();
  $('#editor').classList.add('show'); $('#editor').scrollTop = 0; history.pushState({ e: 1 }, '');
  if (ed.mode === 'reeval') $('#editor').scrollTop = 0;
}
function closeEditor() { $('#editor').classList.remove('show'); ed = null; }
function paintEd() {
  document.querySelectorAll('#eStatus button').forEach(b => b.classList.toggle('on', b.dataset.v === ed.w.status));
  document.querySelectorAll('.nums button').forEach(b => b.classList.toggle('on', ed.w.scores[+b.dataset.k] === +b.dataset.v));
}
function absList() {
  $('#absList').innerHTML = ed.w.abs.slice().sort((a, b) => a.s - b.s).map(a => `<div class="chiprow"><span class="dchip tone-${a.t === 'غياب' ? 'bad' : a.t === 'إذن' ? 'warn' : 'none'}">${a.t}: ${fmtDate(a.s)}${a.r ? ' (' + esc(a.r) + ')' : ''}</span><button data-e="rmabs" data-n="${a.s}">×</button></div>`).join('');
}
function vioList() {
  $('#vioList').innerHTML = ed.w.vio.map((v, n) => `<div class="ve"><div><b>${esc(v.type)}</b><br><small>${fmtDate(v.s)}${v.action ? '، ' + esc(v.action) : ''}</small>${v.detail ? `<p>${esc(v.detail)}</p>` : ''}</div><button data-e="rmvio" data-n="${n}">×</button></div>`).join('');
}
function shrink(file, size = 260) {
  return new Promise((res, rej) => { const img = new Image(), u = URL.createObjectURL(file);
    img.onload = () => { const s = Math.min(img.width, img.height), c = document.createElement('canvas'); c.width = c.height = size; c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size); URL.revokeObjectURL(u); res(c.toDataURL('image/jpeg', .82)); };
    img.onerror = rej; img.src = u; });
}
$('#editor').addEventListener('change', async e => {
  if (e.target.id !== 'phFile' || !ed || !e.target.files[0]) return;
  try { ed.w.photo = await shrink(e.target.files[0]); $('#phBox').innerHTML = `<img src="${ed.w.photo}" alt="">`; } catch (err) { toast('مقدرتش أقرا الصورة'); }
});
$('#editor').addEventListener('click', e => {
  const t = e.target.closest('[data-e]'); if (!t || !ed) return;
  const k = t.dataset.e, v = t.dataset.v;
  if (k === 'cancel') return history.back();
  if (k === 'rmphoto') { delete ed.w.photo; $('#phBox').textContent = 'بدون صورة'; return; }
  if (k === 'status') { ed.w.status = ed.w.status === v ? '' : v; return paintEd(); }
  if (k === 'score') { const kk = +t.dataset.k; ed.w.scores[kk] = ed.w.scores[kk] === +v ? null : +v; return paintEd(); }
  if (k === 'abs') { const d = $('#aDate').value; if (!d) return toast('اختار التاريخ الأول'); const s = isoToSerial(d); ed.w.abs = ed.w.abs.filter(x => x.s !== s); ed.w.abs.push({ s, t: v, r: $('#aReason').value.trim() }); $('#aReason').value = ''; absList(); return toast(`اتسجل ${v}`); }
  if (k === 'rmabs') { ed.w.abs = ed.w.abs.filter(x => x.s !== +t.dataset.n); return absList(); }
  if (k === 'addvio') { const type = $('#vType').value.trim(), d = $('#vDate').value; if (!type || !d) return toast('اكتب نوع المخالفة والتاريخ'); ed.w.vio.push({ s: isoToSerial(d), type, detail: $('#vDet').value.trim(), action: $('#vAct').value.trim() }); ['vType','vDet','vAct'].forEach(id => $('#' + id).value = ''); vioList(); return toast('اتسجلت المخالفة'); }
  if (k === 'rmvio') { ed.w.vio.splice(+t.dataset.n, 1); return vioList(); }
  if (k === 'save') {
    const name = ed.mode === 'reeval' ? ed.w.name : $('#eName').value.trim(), sec = ed.mode === 'reeval' ? ed.w.section : $('#eSec').value.trim();
    if (!name) return toast('اكتب اسم العامل');
    if (!sec) return toast('اختار القسم');
    if (RAW.workers.some((x, j) => j !== ed.i && x.name.trim() === name)) return toast('فيه عامل بنفس الاسم ده');
    ed.w.name = name; ed.w.section = sec;
    const old = ed.i >= 0 ? RAW.workers[ed.i] : null;
    if (old && old.scores.every(x => x != null) && ed.w.scores.some((x, k) => x !== old.scores[k])) {
      const oa = Math.round(old.scores.reduce((p, q) => p + q, 0) / 8 * 100 + 1e-7) / 100;
      ed.w.hist = (old.hist || []).concat({ d: todayISO(), avg: oa }).slice(-12);
    }
    if (ed.i < 0) RAW.workers.push(ed.w); else RAW.workers[ed.i] = ed.w;
    const isNew = ed.i < 0; commit(isNew ? 'اتضاف العامل' : 'اتحفظت التعديلات'); return history.back();
  }
  if (k === 'del') return removeWorker(ed.i, true);
});
document.addEventListener('change', e => { if (e.target.id === 'monthIn') { const m = e.target.value.trim(); if (m) { RAW.month = m; commit('اتحدّث الشهر'); } } });

/* ---------------- الحضور والمخالفات اليومية ---------------- */
const att = { iso: todayISO(), type: 'غياب', sec: '', q: '' };
const vst = { iso: todayISO(), sel: new Set(), sec: '', q: '', type: '', detail: '', action: '' };
const shiftISO = (iso, n) => { const [y, m, d] = iso.split('-').map(Number); const t = new Date(Date.UTC(y, m - 1, d + n)); return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, '0')}-${String(t.getUTCDate()).padStart(2, '0')}`; };
const dsel = (key, iso) => `<div class="dsel"><button data-dd="${key}:-1" aria-label="اليوم السابق">${I.back}</button><label><input type="date" aria-label="اختيار التاريخ" data-dk="${key}" value="${iso}"><b>${fmtDate(isoToSerial(iso))}</b><small>${iso === todayISO() ? 'النهارده' : 'دوس هنا لتغيير التاريخ'}</small></label><button data-dd="${key}:1" class="flip" aria-label="اليوم التالي">${I.back}</button></div>`;
const dayStatus = (w, s) => { const a = w.abs.find(x => x.s === s); return a ? a.t : ''; };
const secChips = (attr, cur) => `<div class="chips"><button class="fchip ${cur ? '' : 'on'}" ${attr}="">الكل</button>${D.sections.map(s => `<button class="fchip ${cur === s ? 'on' : ''}" ${attr}="${esc(s)}">${esc(s)}</button>`).join('')}</div>`;

function renderAtt() {
  const el = $('#v-att'); if (!D) { el.innerHTML = emptyState(); return; }
  const s = isoToSerial(att.iso), cnt = { 'غياب': 0, 'إذن': 0, 'إجازة': 0 };
  D.workers.forEach(w => { const t = dayStatus(w, s); if (t) cnt[t]++; });
  const tn = { 'غياب': 'bad', 'إذن': 'warn', 'إجازة': 'none' }, day = att.iso === todayISO() ? 'النهارده' : fmtDate(s);
  el.innerHTML = `${dsel('att', att.iso)}
    <div class="tcards">${['غياب', 'إذن', 'إجازة'].map(t => `<button class="tcard tone-${tn[t]} ${att.type === t ? 'on' : ''}" data-at="${t}"><b>${cnt[t]}</b><span>${t} ${att.iso === todayISO() ? 'اليوم' : ''}</span></button>`).join('')}</div>
    <div class="hint">حاليًا بتسجّل <b>${att.type}</b> ${day}: دوس على اسم العامل من القايمة تحت. دوسة تانية بتشيله. باقي العمال بيتحسبوا حاضرين (${D.workers.length - cnt['غياب'] - cnt['إذن'] - cnt['إجازة']} حاضر).</div>
    <div class="h2" id="attRecTitle"></div><div class="dchips" id="attChips" style="margin-bottom:12px"></div>
    <div class="stick"><label class="search">${I.search}<input id="aq" placeholder="ابحث باسم العامل" aria-label="ابحث باسم العامل" value="${esc(att.q)}" autocomplete="off"></label>
    ${secChips('data-asec', att.sec)}</div><div class="list" id="attRows"></div>
    <button class="btn" data-act="attrep" style="width:100%;margin-top:14px">تقرير الحضور اليومي (صورة)</button>`;
  fillAtt(); $('#aq').addEventListener('input', e => { att.q = e.target.value; fillAtt(); });
}
function fillAtt() {
  const s = isoToSerial(att.iso), q = att.q.trim(), tn = { 'غياب': 'bad', 'إذن': 'warn', 'إجازة': 'none' };
  const rec = D.workers.filter(w => dayStatus(w, s) === att.type);
  $('#attRecTitle').textContent = rec.length ? `المسجلين ${att.type} (${rec.length})` : `لسه مفيش حد متسجل ${att.type}`;
  $('#attChips').innerHTML = rec.map(w => `<button class="dchip tone-${tn[att.type]}" data-aw="${w.id}">${esc(w.name)} ×</button>`).join('');
  const list = D.workers.filter(w => (!att.sec || w.section === att.sec) && (!q || w.name.includes(q)));
  $('#attRows').innerHTML = list.map(w => { const t = dayStatus(w, s), tone = t ? tn[t] : 'ok';
    return `<button class="arow tone-${tone} ${t ? 'is' : 'pres'}" data-aw="${w.id}"><div class="chk">${t ? I.check : ''}</div><div class="wmain"><b>${esc(w.name)}</b><small>${esc(w.section)}</small></div>${t ? `<div class="stp">${t}</div>` : ''}</button>`; }).join('') || '<div class="card empty" style="padding:26px"><p style="margin:0">مفيش نتايج</p></div>';
}
function tapAtt(id) {
  const w = RAW.workers[id], s = isoToSerial(att.iso), old = w.abs.find(x => x.s === s), prev = JSON.stringify(w.abs);
  w.abs = w.abs.filter(x => x.s !== s); if (!(old && old.t === att.type)) w.abs.push({ s, t: att.type });
  const y = window.scrollY, removed = old && old.t === att.type; commit(); window.scrollTo(0, y);
  toast(removed ? 'اتشال تسجيل ' + w.name : w.name + ': ' + att.type, { label: 'تراجع', fn: () => { RAW.workers[id].abs = JSON.parse(prev); const y2 = window.scrollY; commit(); window.scrollTo(0, y2); } });
}

function renderVio() {
  const el = $('#v-vio'); if (!D) { el.innerHTML = emptyState(); return; }
  const s = isoToSerial(vst.iso), log = [];
  D.workers.forEach(w => w.vio.forEach((v, n) => { if (v.s === s) log.push({ w, v, n }); }));
  const uniq = f => [...new Set(D.workers.flatMap(w => w.vio.map(f)).filter(Boolean))];
  const dl = (id, arr) => `<datalist id="${id}">${arr.map(v => `<option value="${esc(v)}">`).join('')}</datalist>`;
  el.innerHTML = `${dsel('vio', vst.iso)}
    <div class="h2">مخالفات اليوم (${log.length})</div>
    ${log.length ? log.map(x => `<div class="ve"><div><b>${esc(x.w.name)}</b><br><small>${esc(x.v.type)}${x.v.action ? '، ' + esc(x.v.action) : ''}</small>${x.v.detail ? `<p>${esc(x.v.detail)}</p>` : ''}</div><button data-vd="${x.w.id}:${x.n}">×</button></div>`).join('') : '<div class="card info"><p>مفيش مخالفات متسجلة في اليوم ده.</p></div>'}
    <div class="h2">١. اكتب المخالفة</div>
    <div class="card info vform"><label>نوع المخالفة<input id="vt" list="dlT" placeholder="مثال: تأخير" value="${esc(vst.type)}" autocomplete="off"></label><label>التفاصيل<textarea id="vd" rows="2" placeholder="اختياري">${esc(vst.detail)}</textarea></label><label>الإجراء<input id="va" list="dlA" placeholder="مثال: إنذار شفهي" value="${esc(vst.action)}" autocomplete="off"></label></div>${dl('dlT', uniq(v => v.type))}${dl('dlA', uniq(v => v.action))}
    <div class="h2">٢. اختار العمال اللي عملوا المخالفة</div>
    <div class="stick"><label class="search">${I.search}<input id="vq" placeholder="ابحث باسم العامل" aria-label="ابحث باسم العامل" value="${esc(vst.q)}" autocomplete="off"></label>
    ${secChips('data-vsec', vst.sec)}</div><div class="list" id="vioRows"></div>
    <button class="btn" data-act="viorep" style="width:100%;margin-top:14px">تقرير المخالفات اليومي</button>`;
  fillVio();
  $('#vt').addEventListener('input', e => vst.type = e.target.value); $('#vd').addEventListener('input', e => vst.detail = e.target.value); $('#va').addEventListener('input', e => vst.action = e.target.value);
  $('#vq').addEventListener('input', e => { vst.q = e.target.value; fillVio(); });
  syncVioBar();
}
function fillVio() {
  const q = vst.q.trim();
  const list = D.workers.filter(w => (!vst.sec || w.section === vst.sec) && (!q || w.name.includes(q)));
  $('#vioRows').innerHTML = list.map(w => { const on = vst.sel.has(w.id);
    return `<button class="arow tone-bad ${on ? 'is' : ''}" data-vs="${w.id}"><div class="chk">${on ? I.check : ''}</div><div class="wmain"><b>${esc(w.name)}</b><small>${esc(w.section)}${w.cntVio ? '، مخالفات: ' + w.cntVio : ''}</small></div></button>`; }).join('') || '<div class="card empty" style="padding:26px"><p style="margin:0">مفيش نتايج</p></div>';
}
function syncVioBar() {
  const n = vst.sel.size, show = state.tab === 'vio' && n > 0;
  $('#vioBar').classList.toggle('hide', !show); $('#vioGo').textContent = `سجّل المخالفة لـ ${n} عامل`;
}
function registerVio() {
  const type = vst.type.trim(), s = isoToSerial(vst.iso), n = vst.sel.size;
  if (!n) return toast('اختار عامل على الأقل');
  if (!type) return toast('اكتب نوع المخالفة');
  vst.sel.forEach(id => RAW.workers[id].vio.push({ s, type, detail: vst.detail.trim(), action: vst.action.trim() }));
  vst.sel.clear(); vst.type = vst.detail = vst.action = '';
  commit(`اتسجلت المخالفة لـ ${n} عامل`); syncVioBar();
}

function attReportCard(iso) {
  const s = isoToSerial(iso), total = D.workers.length, by = t => D.workers.filter(w => dayStatus(w, s) === t);
  const A = by('غياب'), P = by('إذن'), L = by('إجازة'), present = total - A.length - P.length - L.length, pct = total ? Math.round(present / total * 100) : 0;
  const secRows = D.sections.map(sec => { const l = D.workers.filter(w => w.section === sec), c = t => l.filter(w => dayStatus(w, s) === t).length, a1 = c('غياب'), p1 = c('إذن'), l1 = c('إجازة');
    return tr([esc(sec), { h: l.length - a1 - p1 - l1, c: 'n' }, { h: a1, c: 'n' }, { h: p1, c: 'n' }, { h: l1, c: 'n' }]); });
  const lst = (title, arr) => arr.length ? H(`${title} (${arr.length})`) + tbl([['العامل'], ['القسم', '30%'], ['السبب', '28%']], arr.map(w => tr([esc(w.name), esc(w.section), { h: esc((w.abs.find(x => x.s === s) || {}).r || '—'), c: 'mut' }]))) : '';
  const body = H('الحضور حسب القسم') + tbl([['القسم'], ['حاضر', '14%', 'n'], ['غياب', '14%', 'n'], ['إذن', '14%', 'n'], ['إجازة', '14%', 'n']], secRows)
    + lst('الغياب', A) + lst('الإذن', P) + lst('الإجازات', L) + (A.length + P.length + L.length ? '' : '<div class="rs-ok">كل العمال حاضرين</div>');
  return sheetFrame({ tone: A.length ? 'warn' : 'ok', score: present, unit: 'حاضر من ' + total, pill: A.length ? 'غياب ' + A.length : 'الكل حاضر',
    ranks: [{ v: pct + '%', l: 'نسبة الحضور' }, { v: total, l: 'إجمالي العمال' }], tiles: [[A.length, 'غياب'], [P.length, 'إذن'], [L.length, 'إجازة'], [present, 'حاضر']],
    title: 'تقرير الحضور اليومي', name: fmtDate(s), tags: [total + ' عامل'], body });
}
function vioReportCard(iso) {
  const s = isoToSerial(iso), list = [];
  D.workers.forEach(w => w.vio.forEach(v => { if (v.s === s) list.push({ w, v }); }));
  const people = new Set(list.map(x => x.w.id)).size, monthTotal = D.workers.reduce((p, w) => p + w.cntVio, 0), monthPeople = D.workers.filter(w => w.cntVio).length;
  const types = {}; list.forEach(x => { types[x.v.type] = (types[x.v.type] || 0) + 1; });
  const noAct = list.filter(x => !x.v.action).length;
  const body = H('مخالفات اليوم') + tbl([['العامل', '24%'], ['القسم', '20%'], ['المخالفة'], ['الإجراء', '20%']], list.map(x => tr([esc(x.w.name), esc(x.w.section), esc(x.v.type) + (x.v.detail ? ': ' + esc(x.v.detail) : ''), { h: esc(x.v.action || '—'), c: 'mut' }])), 'لا توجد مخالفات مسجلة في اليوم ده')
    + (list.length ? H('حسب النوع') + tbl([['نوع المخالفة'], ['العدد', '18%', 'n']], Object.keys(types).map(k => tr([esc(k), { h: types[k], c: 'n' }]))) : '');
  return sheetFrame({ tone: list.length ? 'bad' : 'ok', score: list.length, unit: 'مخالفة', pill: list.length ? people + ' عامل' : 'مفيش مخالفات',
    ranks: [{ v: monthTotal, l: 'مخالفات الشهر' }, { v: monthPeople, l: 'عمال لهم مخالفات' }], tiles: [[list.length, 'مخالفات اليوم'], [people, 'عمال'], [Object.keys(types).length, 'أنواع'], [noAct, 'بدون إجراء']],
    title: 'تقرير المخالفات اليومي', name: fmtDate(s), tags: [D.workers.length + ' عامل'], body });
}
async function checkFiles() {
  toast('بفحص الملفات...');
  const miss = [];
  await Promise.all(APP_FILES.map(async f => { try { const r = await fetch(f + '?chk=' + Date.now(), { cache: 'no-store' }); if (!r.ok) miss.push(f); } catch (e) { miss.push(f); } }));
  alert(miss.length ? 'الملفات دي مش مرفوعة على GitHub:\n' + miss.join('\n') + '\n\nارفعها في نفس مكان index.html.' : 'كل ملفات التطبيق موجودة وتمام (' + APP_FILES.length + ' ملف).');
}
async function removeWorker(i, fromEditor) {
  const w = RAW.workers[i]; if (!w) return;
  const ok = await ask({ title: 'حذف ' + w.name, text: 'هيتحذف العامل مع كل غيابه ومخالفاته وتقييمه.', ok: 'حذف', danger: true }); if (!ok) return;
  const snap = JSON.stringify(RAW); RAW.workers.splice(i, 1); skipRefresh = true; commit(); skipRefresh = false;
  if (fromEditor) { history.back(); setTimeout(() => { if ($('#page').classList.contains('show')) history.back(); }, 150); } else if (cur && cur.wid != null) history.back();
  toast('اتحذف ' + w.name, { label: 'تراجع', fn: () => { RAW = JSON.parse(snap); commit('رجع ' + w.name); } });
}
const deleteWorker = i => removeWorker(i, false);
document.addEventListener('click', e => {
  const w2 = e.target.closest('[data-w2]');
  if (w2 && cur && cur.wid != null) { const k = w2.dataset.w2; return k === 'reeval' ? openEditor(cur.wid, 'reeval') : k === 'edit' ? openEditor(cur.wid) : deleteWorker(cur.wid); }
  const t = e.target.closest('[data-aw],[data-vs],[data-dd],[data-vd],[data-at],[data-asec],[data-vsec],[data-act],[data-th],#vioGo');
  if (!t || !D) return;
  const d = t.dataset;
  if (d.th) return setTheme(d.th);
  if (d.aw != null) return tapAtt(+d.aw);
  if (d.vs != null) { const id = +d.vs; vst.sel.has(id) ? vst.sel.delete(id) : vst.sel.add(id); t.classList.toggle('is'); t.querySelector('.chk').innerHTML = vst.sel.has(id) ? I.check : ''; return syncVioBar(); }
  if (d.dd) { const [k, n] = d.dd.split(':'); const o = k === 'att' ? att : vst; o.iso = shiftISO(o.iso, +n); return k === 'att' ? renderAtt() : renderVio(); }
  if (d.at) { att.type = d.at; return renderAtt(); }
  if (d.asec != null) { att.sec = d.asec; return renderAtt(); }
  if (d.vsec != null) { vst.sec = d.vsec; return renderVio(); }
  if (d.vd) { const [id, n] = d.vd.split(':').map(Number); RAW.workers[id].vio.splice(n, 1); return commit('اتمسحت المخالفة'); }
  if (t.id === 'vioGo') return registerVio();
  if (d.act === 'attrep') return openPage('تقرير الحضور', attReportCard(att.iso), `حضور ${fmtDate(isoToSerial(att.iso))}`);
  if (d.act === 'viorep') return openPage('تقرير المخالفات', vioReportCard(vst.iso), `مخالفات ${fmtDate(isoToSerial(vst.iso))}`);
});
document.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.dk; if (!k || !e.target.value) return;
  (k === 'att' ? att : vst).iso = e.target.value; k === 'att' ? renderAtt() : renderVio();
});

/* ---------------- الأحداث ---------------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-tab],[data-w],[data-r],[data-sec],[data-rsec],[data-act]');
  if (!t) return;
  if (t.dataset.tab) return setTab(t.dataset.tab);
  if (t.dataset.w != null) { const w = D.workers[+t.dataset.w]; return openPage(w.name, workerCard(w), `تقييم ${w.name} - ${D.month}`, w.id); }
  if (t.dataset.r != null) { const s = t.dataset.r; return openPage(s ? 'تقرير ' + s : 'تقرير التجهيز', reportCard(s || null), `تقرير ${s || 'قسم التجهيز'} - ${D.month}`); }
  if (t.dataset.sec != null && t.closest('#v-list')) { state.sec = t.dataset.sec; return renderList(); }
  if (t.dataset.rsec != null) { state.rsec = t.dataset.rsec; return renderRank(); }
  if (t.dataset.act === 'import' || t.dataset.act === 'restore') return $('#file').click();
  if (t.dataset.act === 'add') return openEditor(-1);
  if (t.dataset.act === 'check') return checkFiles();
  if (t.dataset.act === 'refreshapp') return window.hardRefresh && window.hardRefresh();
  if (t.dataset.act === 'backup') { const b = new Blob([JSON.stringify(RAW)], { type: 'application/json' }); const l = document.createElement('a'); l.href = URL.createObjectURL(b); l.download = `نسخة ملفات العمال ${todayISO()}.json`; document.body.appendChild(l); l.click(); l.remove(); return toast('اتحفظت النسخة الاحتياطية'); }
  if (t.dataset.act === 'newmonth') { ask({ title: 'بدء شهر جديد', text: 'اكتب اسم الشهر الجديد.', input: 'مثال: ديسمبر 2026', ok: 'التالي' }).then(m => { if (!m) return; ask({ title: 'تأكيد', text: 'الغياب والمخالفات والتقييمات هتتصفّر لكل العمال. الأفضل تحفظ نسخة احتياطية الأول.', ok: 'ابدأ الشهر الجديد', danger: true }).then(ok => { if (!ok) return; RAW.month = m; RAW.workers.forEach(w => { w.abs = []; w.vio = []; w.scores = Array(8).fill(null); }); commit('بدأ الشهر الجديد'); }); }); return; }
  if (t.dataset.act === 'clear') { ask({ title: 'الرجوع للبيانات الأصلية', text: 'تعديلاتك على الموبايل هتتمسح وترجع البيانات المدمجة. احفظ نسخة احتياطية الأول لو محتاجها.', ok: 'رجوع للأصل', danger: true }).then(ok => { if (ok) { localStorage.removeItem(LS); RAW = null; load(); renderAll(); toast('رجعت للبيانات الأصلية'); } }); return; }
});
$('#file').addEventListener('change', e => { const f = e.target.files[0]; if (f) importFile(f); e.target.value = ''; });
$('#back').addEventListener('click', () => history.back());
window.addEventListener('popstate', () => { if ($('#editor').classList.contains('show')) closeEditor(); else closePage(); });
$('#fab').addEventListener('click', () => openEditor(-1));
$('#zoomBtn').addEventListener('click', () => { zoomed = !zoomed; fitSheet(); toast(zoomed ? 'تكبير: اسحب يمين وشمال' : 'رجوع للحجم الكامل'); });
$('#editBtn').addEventListener('click', () => { if (cur && cur.wid != null) openEditor(cur.wid); });
$('#editBtn').innerHTML = I.edit;
$('#bSave').addEventListener('click', doSave); $('#bWa').addEventListener('click', doShare); $('#bCopy').addEventListener('click', doCopy);
$('#back').innerHTML = I.back; $('.gear').insertAdjacentHTML('afterbegin', I.gear); $('#zoomBtn').innerHTML = I.zoom + '<span>تكبير</span>'; $('#vioGo').textContent = '';
$('#bSave').insertAdjacentHTML('afterbegin', I.dl); $('#bWa').insertAdjacentHTML('afterbegin', I.wa); $('#bCopy').insertAdjacentHTML('afterbegin', I.copy);
document.querySelectorAll('.nav button').forEach(b => b.insertAdjacentHTML('afterbegin', I[b.dataset.icon]));

try { applyTheme(localStorage.getItem('twh_theme') || 'dark'); } catch (e) {}
load(); renderAll(); setTab('list');
window.__booted = true;
window.__app = { get D() { return D; }, parseWorkbook, enrich };
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
