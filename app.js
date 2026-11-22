(() => {
'use strict';
const DUMMY = document.createElement('div');
const $ = s => document.querySelector(s) || DUMMY;
const VER = '20';
const APP_FILES = ['index.html','style.css','app.js','data.js','manifest.json','sw.js','art.svg','art-navy.svg','logo-emblem.png','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png','xlsx.mini.min.js','html-to-image.js','tajawal-arabic-500-normal.woff2','tajawal-arabic-700-normal.woff2','tajawal-arabic-800-normal.woff2','tajawal-latin-500-normal.woff2','tajawal-latin-700-normal.woff2','tajawal-latin-800-normal.woff2'];
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
  del:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 5H9l-6 7 6 7h11a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z"/><path d="M16 9.5l-5 5M11 9.5l5 5"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>'
};

let D = null;           // البيانات بعد المعالجة
let RAW = null;         // البيانات الخام اللي بتتعدّل
let state = { tab:'list', q:'', sec:'', sort:'orig', dec:'' };

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
  d.workers.forEach(w => {
    w.absFlags = absFlagsOf(w);
    w.trend = (d.archive || []).map(m => { const x = (m.workers || []).find(y => y.name === w.name); return { m: m.month, avg: x ? avgOfScores(x.scores) : null }; }).filter(t => t.avg != null);
    if (w.prevAvg == null && w.trend.length) w.prevAvg = w.trend[w.trend.length - 1].avg;
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
function fitPage(html) {
  const host = document.createElement('div'); host.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;visibility:hidden'; host.innerHTML = html; document.body.appendChild(host);
  const sheet = host.querySelector('.sheet'), main = sheet.querySelector('.rs-main'); sheet.classList.add('a4');
  const sign = main.querySelector('.rs-sign');
  const over = () => { if (sign) sign.style.marginTop = '0'; const kids = [...main.children], last = kids[kids.length - 1], bottom = last.getBoundingClientRect().bottom + parseFloat(getComputedStyle(last).marginBottom), nat = bottom - main.getBoundingClientRect().top + parseFloat(getComputedStyle(main).paddingBottom); if (sign) sign.style.marginTop = ''; return nat > 1131 - 8; };
  for (const lv of ['c1', 'c2']) { if (!over()) break; sheet.classList.add(lv); }
  let guard = 80;
  while (over() && guard--) {
    const pri = t => +(t.dataset.p ?? 1), cnt = t => [...t.tBodies[0].rows].filter(r => !r.classList.contains('more')).length;
    const tbls = [...main.querySelectorAll('table.rs-t')].filter(t => pri(t) !== 0 && cnt(t) > (pri(t) === 2 ? 2 : 3));
    if (!tbls.length) break;
    const t = tbls.reduce((p, q) => (pri(q) > pri(p) || (pri(q) === pri(p) && cnt(q) > cnt(p))) ? q : p), tb = t.tBodies[0];
    let more = tb.querySelector('tr.more');
    if (!more) { more = document.createElement('tr'); more.className = 'more'; const td = document.createElement('td'); td.colSpan = t.tHead.rows[0].cells.length; td.className = 'mut'; td.style.textAlign = 'center'; more.appendChild(td); tb.appendChild(more); t.dataset.hid = '0'; }
    const data = [...tb.rows].filter(r => r !== more);
    data[data.length - 1].remove(); t.dataset.hid = String(+t.dataset.hid + 1);
    more.firstChild.textContent = 'و ' + t.dataset.hid + ' آخرين (الكل في تصدير Excel)';
  }
  const out = sheet.outerHTML; host.remove(); return `<div class="fit">${out}</div>`;
}
const sheetFrame = o => fitPage(sheetFrameRaw(o));
function sheetFrameRaw(o) {
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
const tbl = (cols, rows, empty, pr) => `<table class="rs-t"${pr != null ? ` data-p="${pr}"` : ''}><colgroup>${cols.map(c => `<col${c[1] ? ` style="width:${c[1]}"` : ''}>`).join('')}</colgroup><thead><tr>${cols.map(c => `<th${c[2] ? ` class="${c[2]}"` : ''}>${c[0]}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.join('') : `<tr><td colspan="${cols.length}" class="mut" style="text-align:center">${empty || '—'}</td></tr>`}</tbody></table>`;
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

function trendHtml(w) {
  const pts = w.trend.map(t => ({ m: t.m, v: t.avg })).concat(w.avg != null ? [{ m: D.month, v: w.avg }] : []).slice(-6);
  if (pts.length < 2) return '';
  return H('تطور التقييم') + `<div class="rs-cr">${pts.map(p => `<div class="rs-c c-${cTone(p.v)}"><div class="t"><span>${esc(p.m)}</span><b>${fmt(p.v)}</b></div><div class="bc"><i style="width:${p.v / 5 * 100}%"></i></div></div>`).join('')}</div>`;
}
/* ---------------- تقرير العامل ---------------- */
function workerCard(w) {
  const abs = w.abs.slice().sort((x, y) => x.s - y.s), vio = w.vio.slice().sort((x, y) => x.s - y.s), ev = w.avg != null;
  let prev = '';
  if (w.prevAvg != null && ev) { const df = Math.round((w.avg - w.prevAvg) * 100) / 100; prev = `<div class="sd-prev">التقييم السابق ${fmt(w.prevAvg)}، ${df > 0 ? 'ارتفع ' + fmt(df) : df < 0 ? 'انخفض ' + fmt(-df) : 'ثابت'}</div>`; }
  return sheetFrame({ tone: w.tone, score: fmt(w.avg), unit: 'من 5', pill: TONE_LABEL[w.tone], sub: prev,
    ranks: [{ v: ev ? w.rank : '—', s: ev ? D.total + ' /' : '', l: 'الترتيب العام' }, { v: ev ? w.srank : '—', s: ev ? w.stotal + ' /' : '', l: 'الترتيب في القسم' }],
    tiles: [[w.cntAbs, 'غياب'], [w.cntPerm, 'إذن'], [w.cntLeave, 'إجازة'], [w.cntVio, 'مخالفات']],
    title: 'تقرير تقييم الأداء الشهري', name: w.name, tags: [w.section, w.status ? 'عامل ' + w.status : ''], photo: w.photo,
    alert: [w.alerts.length ? 'درجة منخفضة في ' + w.alerts.join(' و ') : '', ...w.absFlags].filter(Boolean).length ? 'تنبيه: ' + [w.alerts.length ? 'درجة منخفضة في ' + w.alerts.join(' و ') : '', ...w.absFlags].filter(Boolean).join('، ') : '',
    body: H('التقييم التفصيلي') + (w.complete ? critGrid(w.scores, false) + rsIns(w.scores, 'أقوى نقطة', 'محتاج تحسين') : '<div class="rs-none">لم يتم إدخال تقييم هذا الشهر</div>')
      + trendHtml(w) + H('سجل الغياب والإذن والإجازات') + tbl([['التاريخ', '34%'], ['النوع', '20%'], ['السبب']], abs.map(x => tr([fmtDate(x.s), x.t, { h: esc(x.r || '—'), c: 'mut' }])), 'لا يوجد غياب أو إذن أو إجازة', 1)
      + H('المخالفات') + tbl([['التاريخ', '30%'], ['سبب المخالفة'], ['الإجراء', '22%']], vio.map(x => tr([fmtDate(x.s), esc(x.type) + (x.detail ? ': ' + esc(x.detail) : ''), { h: esc(x.action || '—'), c: 'mut' }])), 'لا توجد مخالفات مسجلة', 1) + (w.note ? H('ملاحظات') + `<div class="rs-note">${esc(w.note)}</div>` : '') });
}

/* ---------------- تقرير القسم / القسم كله ---------------- */
function reportCard(sec) {
  const list = sec ? D.workers.filter(w => w.section === sec) : D.workers;
  const st = stats(list), tone = toneOf(st.avg), sorted = list.slice().sort(byRank), best = sorted.find(w => w.avg != null);
  const needs = list.filter(w => w.alerts.length || w.cntVio || w.cntAbs >= 3 || w.absFlags.length).sort(byRank);
  const needRows = needs.map(w => tr([{ h: esc(w.name), c: 'nm' }, { h: [w.alerts.length ? 'درجة منخفضة: ' + w.alerts.join(' و ') : '', w.cntVio ? 'مخالفات: ' + w.cntVio : '', w.cntAbs >= 3 ? 'غياب: ' + w.cntAbs + ' أيام' : ''].filter(Boolean).join('، '), c: 'mut' }]));
  const rk = w => sec ? w.srank : w.rank;
  const wRow = (w, mode) => tr([{ h: rk(w) ?? '—', c: 'n' }, { h: esc(w.name), c: 'nm' }].concat(mode === 'sec' ? [esc(w.section)] : []).concat([{ h: fmt(w.avg), c: 'n' }]).concat(mode ? [] : [{ h: w.cntAbs, c: 'n' }, { h: w.cntVio, c: 'n' }]));
  let body;
  if (sec) body = H('متوسط الجوانب') + critGrid(st.crit, true) + rsIns(st.crit, 'أقوى جانب', 'أضعف جانب')
    + H('ترتيب العمال') + tbl([['#', '10%', 'n'], ['العامل'], ['المتوسط', '16%', 'n'], ['غياب', '14%', 'n'], ['مخالفات', '16%', 'n']], sorted.map(w => wRow(w, false)), '', 1);
  else {
    const secs = D.sections.map(s => { const l = D.workers.filter(w => w.section === s); return { s, st: stats(l) }; }).sort((x, y) => (y.st.avg ?? -1) - (x.st.avg ?? -1));
    const ev = sorted.filter(w => w.avg != null), cols = [['#', '14%', 'n'], ['العامل'], ['المتوسط', '24%', 'n']];
    body = rsIns(st.crit, 'أقوى جانب', 'أضعف جانب')
      + H('مقارنة الأقسام') + tbl([['القسم'], ['العمال', '12%', 'n'], ['المتوسط', '15%', 'n'], ['مؤهل', '12%', 'n'], ['غياب', '12%', 'n'], ['مخالفات', '14%', 'n']], secs.map(x => tr([esc(x.s), { h: x.st.n, c: 'n' }, { h: fmt(x.st.avg), c: 'n' }, { h: x.st.dec.ok, c: 'n' }, { h: x.st.abs, c: 'n' }, { h: x.st.vio, c: 'n' }])), '', 0)
      + H('الأعلى والأقل تقييمًا') + `<div class="rs-two"><div><div class="rs-sub">الأعلى تقييمًا</div>${tbl(cols, ev.slice(0, 5).map(w => wRow(w, 'two')), '', 1)}</div><div><div class="rs-sub">الأقل تقييمًا</div>${tbl(cols, ev.slice(-5).reverse().map(w => wRow(w, 'two')), '', 1)}</div></div>`;
  }
  if (sec) body += H('تنبيهات ومتابعة') + tbl([['العامل', '34%'], ['الملاحظة']], needRows, 'لا توجد تنبيهات أو مخالفات', 2);
  return sheetFrame({ tone, score: fmt(st.avg), unit: 'من 5', pill: sec ? 'متوسط القسم' : 'متوسط التجهيز',
    sub: best ? `<div class="sd-prev">الأعلى: ${esc(best.name)} (${fmt(best.avg)})</div>` : '',
    ranks: [{ v: st.n, l: 'عدد العمال' }, { v: st.dec.ok, s: st.n + ' /', l: 'مؤهل ويكمل' }],
    tiles: [[st.abs, 'غياب'], [st.perm, 'إذن'], [st.leave, 'إجازة'], [st.vio, 'مخالفات']],
    title: sec ? 'تقرير أداء القسم الشهري' : 'تقرير الأداء الشهري لقسم التجهيز', name: sec ? 'قسم ' + sec : 'قسم التجهيز كامل',
    tags: [st.n + ' عامل', sec ? '' : D.sections.length + ' أقسام', st.dec.ok ? st.dec.ok + ' مؤهل' : '', st.dec.warn ? st.dec.warn + ' متابعة' : '', st.dec.bad ? st.dec.bad + ' تدريب' : '', st.dec.none ? st.dec.none + ' لم يُقيَّم' : ''], body });
}

/* Approved portrait carousel, v18. Data remains in the existing store. */
let homeSelected = null;
let homeCarousel = null;
function initialsOf(w) { return w.name.trim().split(/\s+/).slice(0, 2).map(x => x[0]).join(' '); }
function homeShell(st) {
  return `<div class="hc-summary"><span>${D.workers.length} عامل</span><span>${st.dec.ok} مؤهل ويكمل</span><span>متوسط التقييم <bdi>${fmt(st.avg)}</bdi></span></div>
  <div class="hc-stage" role="group" aria-label="اختيار العامل بالسحب أو الأسهم" tabindex="0"></div>
  <div class="hc-hint"><span>‹</span> اسحب الصور أو اضغط لاختيار عامل <span>›</span></div>
  <div id="hc-details" aria-live="polite" aria-atomic="true"></div>`;
}
function homeDetails(w) {
  const month = preDefaultMonth(RAW), from = isoToSerial(month + '-01');
  const [yy, mm] = month.split('-').map(Number);
  const monthEnd = Math.round(Date.UTC(yy, mm, 0) / 864e5) + 25569;
  const today = isoToSerial(todayISO());
  const end = today >= from && today <= monthEnd ? today : monthEnd;
  const days = Array.from({ length: 7 }, (_, i) => end - 6 + i).filter(s => s >= from);
  const events = days.map(s => ({ s, t: dayStatus(w, s) }));
  const flags = w.absFlags.length ? w.absFlags.join('، ') : 'لا توجد تنبيهات غياب متكرر';
  return `<div class="hc-profile"><small>ملف العامل</small><h2>${esc(w.name)}</h2><p>${esc(w.section)}</p><span class="hc-status tone-${w.tone}">${esc(TONE_LABEL[w.tone])}</span></div>
  <div class="hc-metrics"><div><b>${fmt(w.avg)}<small> / 5</small></b><span>متوسط التقييم</span></div><div><b>${w.cntAbs}</b><span>أيام الغياب</span></div><div><b>${w.cntVio}</b><span>المخالفات</span></div></div>
  <div class="hc-days-title"><h3>سجل الحضور</h3><small>${esc(shortDate(days[0]))} إلى ${esc(shortDate(end))}</small></div>
  <div class="hc-days">${events.map(a => `<div class="hc-day ${a.t === 'غياب' ? 'abs' : a.t ? 'leave' : ''}" title="${esc(fmtDate(a.s))}: ${esc(a.t || 'لا توجد واقعة مسجلة')}"><b>${a.t === 'غياب' ? '−' : a.t === 'إذن' ? 'إ' : a.t === 'إجازة' ? 'ج' : '·'}</b><small>${ymd(a.s).d}</small></div>`).join('')}</div>
  <p class="hc-legend">اليوم الملوّن: غياب · إ: إذن · ج: إجازة · النقطة: لا توجد واقعة مسجلة</p>
  <div class="hc-note ${w.absFlags.length ? 'alert' : ''}">${esc(flags)}</div>
  <button class="hc-open" data-w="${w.id}">فتح ملف العامل ${I.back}</button>`;
}
function mountHomeCarousel(list) {
  const stage = document.querySelector('.hc-stage'); if (!stage) return;
  homeCarousel = null;
  if (!list.length) { stage.innerHTML = '<p class="hc-no-results">مفيش عمال مطابقين للبحث</p>'; $('#hc-details').innerHTML = ''; $('.hc-hint').classList.add('hide'); return; }
  $('.hc-hint').classList.remove('hide');
  let selected = Math.max(0, list.findIndex(w => w.id === homeSelected));
  let start = null, offset = 0, dragged = false;
  stage.innerHTML = list.map(w => `<button class="hc-person" aria-label="اختيار ${esc(w.name)}"><span class="hc-initials" ${w.photo ? 'hidden' : ''}>${esc(initialsOf(w))}</span>${w.photo ? `<img class="hc-portrait" src="${esc(w.photo)}" alt="${esc(w.name)}" draggable="false">` : ''}<small>${esc(w.name.split(/\s+/)[0])}</small></button>`).join('');
  const buttons = [...stage.querySelectorAll('.hc-person')];
  function layout(dx = 0, immediate = false) {
    const step = Math.min(96, stage.clientWidth / 4.05);
    buttons.forEach((b, i) => {
      let d = i - selected; if (d > list.length / 2) d -= list.length; if (d < -list.length / 2) d += list.length;
      const distance = Math.abs(d - dx / step), visible = distance < 3;
      b.style.transition = immediate ? 'none' : '';
      b.style.transform = `translate3d(${-d * step + dx}px,${Math.min(distance, 3) * 12}px,0) scale(${1.09 - Math.min(distance, 3) * .18}) rotateY(${d * 5}deg)`;
      b.style.opacity = visible ? Math.max(.12, 1 - distance * .38) : 0;
      b.style.visibility = visible ? 'visible' : 'hidden'; b.style.zIndex = 10 - Math.min(9, Math.abs(d));
      b.style.pointerEvents = visible ? '' : 'none'; b.classList.toggle('selected', i === selected);
      b.setAttribute('aria-pressed', String(i === selected)); b.tabIndex = i === selected ? 0 : -1;
    });
  }
  function choose(index, immediate = false) {
    selected = (index + list.length) % list.length; homeSelected = list[selected].id;
    layout(0, immediate); $('#hc-details').innerHTML = homeDetails(list[selected]);
    if (!immediate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.hc-profile,.hc-metrics,.hc-days,.hc-note').forEach((node, i) => node.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 500 + i * 35, easing: 'cubic-bezier(.22,.7,.2,1)' }));
    }
  }
  buttons.forEach((b, i) => {
    b.addEventListener('click', () => { if (!dragged) choose(i); });
    const img = b.querySelector('img'); if (img) img.addEventListener('error', () => { img.hidden = true; b.querySelector('.hc-initials').hidden = false; });
  });
  stage.onpointerdown = e => { if (e.button !== 0) return; start = e.clientX; offset = 0; dragged = false; stage.classList.add('dragging'); };
  stage.onpointermove = e => { if (start == null) return; offset = e.clientX - start; if (Math.abs(offset) > 5) { dragged = true; stage.setPointerCapture(e.pointerId); layout(offset * .78, true); } };
  const release = () => {
    if (start == null) return; start = null; stage.classList.remove('dragging');
    if (!dragged) return;
    const next = selected + (Math.abs(offset) > 28 ? (offset > 0 ? 1 : -1) : 0);
    requestAnimationFrame(() => requestAnimationFrame(() => { if (stage.isConnected) choose(next); }));
    setTimeout(() => { dragged = false; }, 80);
  };
  stage.onpointerup = release; stage.onpointercancel = release;
  stage.onkeydown = e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); choose(selected + (e.key === 'ArrowLeft' ? 1 : -1)); } };
  choose(selected, true); homeCarousel = { stage, layout };
}
window.addEventListener('resize', () => { if (homeCarousel && homeCarousel.stage.isConnected) homeCarousel.layout(0, true); });

/* ---------------- الشاشات الرئيسية ---------------- */
const emptyState = () => `<div class="card empty"><div class="big">${I.users}</div><h2>لسه مفيش عمال</h2><p>ابدأ بإضافة أول عامل، أو ارفع ملف الإكسل أو نسخة احتياطية سبق حفظتها.</p><div class="row2" style="justify-content:center"><button class="btn" data-act="add">إضافة عامل</button><button class="btn ghost2" data-act="import">رفع ملف Excel</button></div></div>`;

function renderList() {
  const el = $('#v-list');
  if (!D) { el.innerHTML = emptyState(); return; }
  const st = stats(D.workers);
  const q = state.q.trim();
  el.innerHTML = `${homeShell(st)}${backupBanner()}${flagsCard()}
    <div class="stick"><label class="search">${I.search}<input id="q" placeholder="ابحث باسم العامل" aria-label="ابحث باسم العامل" value="${esc(state.q)}" autocomplete="off"></label>
    <div class="chips"><button class="fchip ${state.sec ? '' : 'on'}" data-sec="">الكل</button>${D.sections.map(s => `<button class="fchip ${state.sec === s ? 'on' : ''}" data-sec="${esc(s)}">${esc(s)}</button>`).join('')}</div></div>
    <div class="fsel"><label>ترتيب<select id="sortSel" aria-label="ترتيب القائمة">${[['orig', 'الترتيب الأصلي'], ['name', 'الاسم'], ['rank', 'التقييم، الأعلى أولًا'], ['abs', 'الغياب، الأكثر أولًا'], ['vio', 'المخالفات، الأكثر أولًا']].map(x => `<option value="${x[0]}" ${state.sort === x[0] ? 'selected' : ''}>${x[1]}</option>`).join('')}</select></label>
    <label>القرار<select id="decSel" aria-label="فلتر القرار">${[['', 'الكل'], ['ok', 'مؤهل ويكمل'], ['warn', 'يكمل مع متابعة'], ['bad', 'تدريب وإعادة تقييم'], ['none', 'لم يُقيَّم']].map(x => `<option value="${x[0]}" ${state.dec === x[0] ? 'selected' : ''}>${x[1]}</option>`).join('')}</select></label></div>
    <div class="list" id="wl"></div>`;
  fillWL(wlList());
  $('#q').addEventListener('input', e => { state.q = e.target.value; fillWL(wlList()); });
  $('#sortSel').addEventListener('change', e => { state.sort = e.target.value; fillWL(wlList()); });
  $('#decSel').addEventListener('change', e => { state.dec = e.target.value; fillWL(wlList()); });
}
function wlList() {
  const q = state.q.trim();
  const l = D.workers.filter(w => (!state.sec || w.section === state.sec) && (!q || w.name.includes(q)) && (!state.dec || w.tone === state.dec));
  const cmp = { name: (x, y) => x.name.localeCompare(y.name, 'ar'), rank: byRank, abs: (x, y) => y.cntAbs - x.cntAbs || byRank(x, y), vio: (x, y) => y.cntVio - x.cntVio || byRank(x, y) }[state.sort];
  return cmp ? l.slice().sort(cmp) : l;
}
const backupDue = () => RAW && !RAW.builtin && (!RAW.lastBackup || (Date.now() - new Date(RAW.lastBackup).getTime()) / 864e5 > 7);
const backupBanner = () => backupDue() ? `<div class="banner"><span>مفيش نسخة احتياطية من أكتر من أسبوع. احفظ نسخة عشان بياناتك ما تضيعش.</span><button class="btn sm" data-act="backup">حفظ نسخة</button></div>` : '';
const flagsCard = () => { const f = D.workers.filter(w => w.absFlags.length); return f.length ? `<div class="card info flags"><h3>تنبيهات الغياب (${f.length})</h3><div class="dchips">${f.map(w => `<button class="dchip tone-bad" data-w="${w.id}">${esc(w.name)}: ${esc(w.absFlags[0])}</button>`).join('')}</div></div>` : ''; };
function fillWL(list) {
  mountHomeCarousel(list);
  $('#wl').innerHTML = list.length ? list.map(w => `<button class="wrow tone-${w.tone}" data-w="${w.id}" >${w.photo ? `<div class="av ph"><img src="${w.photo}" alt=""></div>` : `<div class="av">${I.user}</div>`}<div class="wmain"><b>${esc(w.name)}${w.absFlags.length ? ' <span class="flag">غياب متكرر</span>' : ''}</b><small>${esc(w.section)}${(state.sec ? w.srank : w.rank) ? '، الترتيب ' + (state.sec ? w.srank : w.rank) : ''}</small></div><div class="wscore ${w.avg == null ? 'na' : ''}">${w.avg == null ? 'لم يقيَّم' : fmt(w.avg)}</div></button>`).join('') : `<div class="card empty" style="padding:26px"><p style="margin:0">مفيش نتايج</p></div>`;
}
function renderReports() {
  const el = $('#v-rep');
  if (!D) { el.innerHTML = emptyState(); return; }
  const all = stats(D.workers);
  const card = (title, sub, st, hue, icon, attr) => `<button class="rep tone-${toneOf(st.avg)}" ${attr} ><div class="ic">${icon}</div><div class="tx"><b>${esc(title)}</b><small>${sub}</small></div><div class="av2">${fmt(st.avg)}</div></button>`;
  const absToday = D.workers.filter(w => dayStatus(w, isoToSerial(att.iso)) === 'غياب').length;
  el.innerHTML = `<div class="list"><button class="rep" data-pre="open"><div class="ic">${I.doc}</div><div class="tx"><b>تقرير ما قبل التقييم</b><small>غياب وأذونات وإجازات ومخالفات كل عامل خلال شهر تختاره</small></div></button>${card('تقرير قسم التجهيز كامل', `${all.n} عامل في كل الأقسام`, all, '#4F46E5', I.chart, 'data-r=""')}<button class="rep tone-${absToday ? 'bad' : 'ok'}" data-act="absrep"><div class="ic">${I.cal}</div><div class="tx"><b>تقرير الغياب للإدارة</b><small>غياب اليوم والإجمالي الشهري من الأكثر للأقل</small></div><div class="av2">${absToday}</div></button><button class="rep" data-act="pdf"><div class="ic">${I.doc}</div><div class="tx"><b>طباعة أو PDF للتقارير</b><small>كل العمال أو قسم أو حزمة الإدارة</small></div></button></div>
    <div class="h2">تقارير الأقسام (كل قسم لوحده)</div>
    <div class="list">${D.sections.map((s, i) => { const l = D.workers.filter(w => w.section === s), st = stats(l); return card(s, `${st.n} عمال، ${st.dec.ok} مؤهل، ${st.dec.warn} متابعة`, st, HUES[i % HUES.length], I.doc, `data-r="${esc(s)}"`); }).join('')}</div>`;
}
/* ---------------- تقرير ما قبل التقييم ---------------- */
const pre = { source: 'current', month: '', sec: '' };
function preDataset() {
  return pre.source === 'current' ? RAW : ((RAW.archive || [])[Number(pre.source)] || RAW);
}
function preDefaultMonth(data) {
  const label = String(data.month || '').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  const year = label.match(/\b(\d{4})\b/), m = MONTHS.findIndex(n => label.includes(n));
  if (year && m >= 0) return `${year[1]}-${String(m + 1).padStart(2, '0')}`;
  if (/^\d{4}-(0[1-9]|1[0-2])$/.test(label)) return label;
  const dates = (data.workers || []).flatMap(w => [...(w.abs || []), ...(w.vio || [])]).map(x => x.s).filter(Number.isFinite);
  if (dates.length) { const p = ymd(Math.max(...dates)); if (p.y >= 1900 && p.y <= 9999) return `${p.y}-${String(p.m).padStart(2, '0')}`; }
  return todayISO().slice(0, 7);
}
function preRows(data, month, section = '') {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return [];
  const [year, m] = month.split('-').map(Number);
  const from = isoToSerial(month + '-01'), to = Math.round(Date.UTC(year, m, 1) / 86400000) + 25569;
  const inside = x => x && Number.isFinite(x.s) && x.s >= from && x.s < to;
  return (data.workers || []).filter(w => !section || w.section === section).map(w => {
    const abs = (w.abs || []).filter(inside).slice().sort((a, b) => a.s - b.s);
    const vio = (w.vio || []).filter(inside).slice().sort((a, b) => a.s - b.s);
    const days = t => new Set(abs.filter(x => x.t === t).map(x => Math.floor(x.s))).size;
    return { name: w.name, section: w.section, abs, vio, absent: days('غياب'), permissions: abs.filter(x => x.t === 'إذن').length, leave: days('إجازة'), violations: vio.length };
  });
}
function preMonthLabel() {
  const [y, m] = pre.month.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}
const preNote = 'الأرقام من التسجيلات الموجودة فقط. الصفر يعني لا توجد أحداث مسجلة، وليس إثبات حضور. التقرير لا يغيّر درجات التقييم.';
function preDetails(r) {
  return `<div class="pre-events"><h4>الغياب والأذونات والإجازات</h4>${r.abs.length ? r.abs.map(a => `<p><b>${esc(a.t)}</b> · ${esc(fmtDate(a.s))}${a.r ? ' · ' + esc(a.r) : ''}</p>`).join('') : '<p>لا توجد أحداث مسجلة خلال الشهر.</p>'}<h4>المخالفات</h4>${r.vio.length ? r.vio.map(v => `<div class="pre-violation"><b>${esc(v.type || 'مخالفة')}</b><small>${esc(fmtDate(v.s))}</small>${v.detail ? `<p>${esc(v.detail)}</p>` : ''}${v.action ? `<p>الإجراء: ${esc(v.action)}</p>` : ''}</div>`).join('') : '<p>لا توجد مخالفات مسجلة خلال الشهر.</p>'}</div>`;
}
function renderPre() {
  const el = $('#v-pre'); if (!D || !RAW) { el.innerHTML = emptyState(); return; }
  const data = preDataset(); if (!pre.month) pre.month = preDefaultMonth(data);
  const sections = [...new Set((data.workers || []).map(w => w.section))];
  if (!sections.includes(pre.sec)) pre.sec = '';
  const rows = preRows(data, pre.month, pre.sec), totals = rows.reduce((a, r) => a.map((v, i) => v + [r.absent, r.permissions, r.leave, r.violations][i]), [0, 0, 0, 0]);
  const labels = ['أيام غياب', 'أذونات', 'أيام إجازة', 'مخالفات'];
  el.innerHTML = `<button class="btn ghost2 sm" data-tab="rep">رجوع للتقارير</button>
    <div class="pre-heading"><span>متابعة الانضباط والحضور</span><h2>تقرير ما قبل التقييم</h2><p>راجع تسجيلات كل عامل قبل ما تحدد تقييمه.</p></div>
    <div class="card pre-filters"><label>مصدر البيانات<select id="preSource"><option value="current" ${pre.source === 'current' ? 'selected' : ''}>البيانات الحالية${RAW.month ? ' · ' + esc(RAW.month) : ''}</option>${(RAW.archive || []).map((a, i) => `<option value="${i}" ${pre.source === String(i) ? 'selected' : ''}>أرشيف · ${esc(a.month)} (${i + 1})</option>`).join('')}</select></label><label>الشهر<input type="month" id="preMonth" value="${esc(pre.month)}"></label><label>القسم<select id="preSection"><option value="">كل الأقسام</option>${sections.map(s => `<option ${s === pre.sec ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></label></div>
    <div class="pre-meta"><b>${esc(preMonthLabel())}</b><span>${rows.length} عامل · ${esc(pre.sec || 'كل الأقسام')}</span></div>
    <div class="pre-totals">${totals.map((n, i) => `<div><b>${n}</b><span>${labels[i]}</span></div>`).join('')}</div>
    <div class="hint pre-note">${preNote} أيام الغياب والإجازة تُحسب بدون تكرار اليوم، والأذونات تُحسب بعدد التسجيلات.</div>
    <div class="row2 pre-tools"><button class="btn sm" data-pre="print">طباعة / PDF</button><button class="btn ghost2 sm" data-pre="excel">تصدير Excel</button></div>
    <div class="pre-workers">${rows.length ? rows.map(r => `<article class="card pre-worker"><header><div><h3>${esc(r.name)}</h3><small>${esc(r.section)}</small></div><span class="pre-status ${r.abs.length || r.vio.length ? '' : 'clean'}">${r.abs.length || r.vio.length ? 'له تسجيلات' : 'بدون تسجيلات'}</span></header><div class="pre-counts">${[r.absent, r.permissions, r.leave, r.violations].map((n, i) => `<div><b>${n}</b><span>${labels[i]}</span></div>`).join('')}</div><details><summary>التواريخ وتفاصيل المخالفات</summary>${preDetails(r)}</details></article>`).join('') : '<div class="card info"><p>لا يوجد عمال في مصدر البيانات أو القسم المختار.</p></div>'}</div>`;
}
function exportPre() {
  const rows = preRows(preDataset(), pre.month, pre.sec), wb = XLSX.utils.book_new();
  const summary = [['تقرير ما قبل التقييم', preMonthLabel()], ['المصدر', pre.source === 'current' ? 'البيانات الحالية' : 'الأرشيف: ' + preDataset().month], ['ملاحظة', preNote], [], ['العامل', 'القسم', 'أيام الغياب', 'عدد الأذونات', 'أيام الإجازة', 'عدد المخالفات'], ...rows.map(r => [r.name, r.section, r.absent, r.permissions, r.leave, r.violations])];
  const attendance = [['العامل', 'القسم', 'التاريخ', 'النوع', 'السبب']], violations = [['العامل', 'القسم', 'التاريخ', 'المخالفة', 'التفاصيل', 'الإجراء']];
  const date = s => { const p = ymd(s); return `${p.y}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`; };
  rows.forEach(r => { r.abs.forEach(a => attendance.push([r.name, r.section, date(a.s), a.t, a.r || ''])); r.vio.forEach(v => violations.push([r.name, r.section, date(v.s), v.type || '', v.detail || '', v.action || ''])); });
  [['ما قبل التقييم', summary], ['الغياب والأذونات', attendance], ['المخالفات', violations]].forEach(([name, cells]) => { const ws = XLSX.utils.aoa_to_sheet(cells); ws['!cols'] = [{wch:28},{wch:22},{wch:18},{wch:24},{wch:40},{wch:32}]; XLSX.utils.book_append_sheet(wb, ws, name); });
  download(new Blob([XLSX.write(wb, { type: 'array', bookType: 'xlsx' })], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `تقرير ما قبل التقييم ${pre.month}.xlsx`);
}
function printPre() {
  const rows = preRows(preDataset(), pre.month, pre.sec);
  let root = document.getElementById('printRoot'); if (!root) { root = document.createElement('div'); root.id = 'printRoot'; document.body.appendChild(root); }
  root.innerHTML = `<div class="pre-print" dir="rtl"><h1>تقرير ما قبل التقييم</h1><p>${esc(preMonthLabel())} · ${esc(pre.sec || 'كل الأقسام')} · ${rows.length} عامل</p><p>المصدر: ${esc(pre.source === 'current' ? 'البيانات الحالية' : 'الأرشيف: ' + preDataset().month)}</p><p>${preNote}</p><table><thead><tr>${['العامل','القسم','أيام الغياب','الأذونات','أيام الإجازة','المخالفات'].map(s => `<th>${s}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${[r.name,r.section,r.absent,r.permissions,r.leave,r.violations].map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table><h2>التواريخ وتفاصيل المخالفات</h2>${rows.filter(r => r.abs.length || r.vio.length).map(r => `<section><h3>${esc(r.name)} · ${esc(r.section)}</h3>${preDetails(r)}</section>`).join('') || '<p>لا توجد أحداث مسجلة خلال الشهر.</p>'}</div>`;
  document.body.classList.add('printing'); document.fonts.ready.then(() => window.print());
}
document.addEventListener('change', e => {
  if (e.target.id === 'preSource') { pre.source = e.target.value; pre.sec = ''; pre.month = preDefaultMonth(preDataset()); renderPre(); }
  if (e.target.id === 'preMonth') { if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(e.target.value)) { e.target.value = pre.month; return toast('اختار الشهر والسنة'); } pre.month = e.target.value; renderPre(); }
  if (e.target.id === 'preSection') { pre.sec = e.target.value; renderPre(); }
});
document.addEventListener('click', e => {
  const t = e.target.closest('[data-pre]'); if (!t || !D) return;
  if (t.dataset.pre === 'open') { pre.month = ''; pre.sec = ''; pre.source = 'current'; setTab('pre'); }
  if (t.dataset.pre === 'print') printPre();
  if (t.dataset.pre === 'excel') exportPre();
});

function renderData() {
  const el = $('#v-data');
  if (!D) { el.innerHTML = emptyState(); return; }
  const tm = localStorage.getItem('twh_theme') || 'dark', hasPin = !!localStorage.getItem('twh_pin');
  const arcHtml = (D.archive || []).length ? `<div class="card info"><h3>الشهور السابقة</h3><p>كل شهر بتبدأ شهر جديد، الشهر القديم بيتحفظ هنا، وبيظهر تطور تقييم كل عامل في ملفه.</p>${D.archive.map((m, i) => `<div class="arc"><b>${esc(m.month)}</b><div class="row2"><button class="btn ghost2 sm" data-act="arcrep" data-i="${i}">تقرير القسم كله</button><button class="btn danger sm" data-act="arcdel" data-i="${i}">حذف</button></div></div>`).join('')}</div>` : '';
  const pinHtml = `<div class="card info"><h3>قفل التطبيق</h3><p>${hasPin ? 'القفل شغال: التطبيق بيطلب الرقم السري عند الفتح وبعد ما تسيبه دقيقتين.' : 'اختياري: رقم سري من 4 أرقام لفتح التطبيق. بيحمي من الاستخدام العادي، مش تشفير كامل. لو نسيته مفيش استرجاع غير مسح بيانات التطبيق، فاحفظ نسخة احتياطية الأول.'}</p><div class="row2">${hasPin ? '<button class="btn ghost2" data-act="pinon">تغيير الرقم</button><button class="btn danger" data-act="pinoff">إلغاء القفل</button>' : '<button class="btn" data-act="pinon">تفعيل القفل</button>'}</div></div>`;
  el.innerHTML = `<div class="card info"><h3>المظهر</h3><div class="seg2">${[['dark', 'داكن'], ['light', 'فاتح'], ['auto', 'تلقائي']].map(x => `<button data-th="${x[0]}" class="${tm === x[0] ? 'on' : ''}">${x[1]}</button>`).join('')}</div></div>
    <div class="card info"><h3>الشهر الحالي</h3><input class="fin" id="monthIn" aria-label="اسم الشهر" value="${esc(D.month)}" placeholder="مثال: ديسمبر 2026"><p style="margin-top:10px">${D.workers.length} عامل، ${D.sections.length} أقسام<br>آخر تعديل: ${esc(D.importedAt || '—')}</p><div class="row2"><button class="btn" data-act="newmonth">بدء شهر جديد</button></div></div>${arcHtml}
    <div class="card info"><h3>نسخة احتياطية</h3><p>كل تعديلاتك بتتخزن على موبايلك. احفظ نسخة من وقت للتاني عشان لو اتمسحت بيانات المتصفح أو غيرت الموبايل.</p><div class="row2"><button class="btn" data-act="backup">حفظ نسخة احتياطية</button><button class="btn ghost2" data-act="restore">استرجاع نسخة</button><button class="btn ghost2" data-act="xlsx">تصدير إلى Excel</button></div></div>
    ${pinHtml}
    <div class="card info"><h3>سجل التعديلات</h3><p>مين غيّر إيه ومتى (آخر 300 عملية).</p><div class="row2"><button class="btn ghost2" data-act="log">عرض السجل</button></div></div>
    <div class="card info"><h3>تحديث التطبيق</h3><p>الإصدار ${VER}. لو التطبيق مش بيتحدث أو في حاجة مش شغالة، دوس الزرار وهيحمّل آخر نسخة. بياناتك مش بتتمسح.</p><div class="row2"><button class="btn ghost2" data-act="refreshapp">تحديث التطبيق لآخر نسخة</button><button class="btn ghost2" data-act="check">فحص ملفات التطبيق</button></div></div>
    <div class="card info"><h3>استيراد من Excel</h3><p>اختياري. الملف بيحل محل البيانات الحالية.</p><div class="row2"><button class="btn ghost2" data-act="import">اختيار ملف Excel</button>${D.builtin ? '' : '<button class="btn danger" data-act="clear">الرجوع للبيانات الأصلية</button>'}</div></div>`;
}
function applyTheme(m) { const light = m === 'light' || (m === 'auto' && matchMedia('(prefers-color-scheme: light)').matches); document.documentElement.dataset.theme = light ? 'light' : 'dark'; const mt = document.querySelector('meta[name=theme-color]'); if (mt) mt.content = document.body.classList.contains('home-redesign') ? (light ? '#D6A779' : '#3D5F88') : light ? '#F3E9D7' : '#0C1220'; }
function setTheme(m) { try { localStorage.setItem('twh_theme', m); } catch (e) {} applyTheme(m); renderData(); }
function reportErr(e) { console.error(e); const b = document.getElementById('fixbtn'); if (b) { b.classList.remove('hide'); b.innerHTML = 'التطبيق مش بيفتح؟ دوس هنا للتحديث<br><small>' + esc(String(e && e.message || e)).slice(0, 90) + '</small>'; } }
function renderAll() { [renderList, renderAtt, renderVio, renderReports, renderPre, renderData].forEach(f => { try { f(); } catch (e) { reportErr(e); } }); $('#month').textContent = D ? D.month : ''; }
function setTab(t) {
  state.tab = t;
  document.body.classList.toggle('home-redesign', t === 'list');
  try { applyTheme(localStorage.getItem('twh_theme') || 'dark'); } catch (e) {}
  ['list','att','vio','rep','pre','data'].forEach(k => $('#v-' + k).classList.toggle('hide', k !== t));
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('on', b.dataset.tab === t || (t === 'pre' && b.dataset.tab === 'rep')));
  $('#title').textContent = { list:'عمال التجهيز', att:'الحضور والغياب', vio:'المخالفات', rep:'التقارير', pre:'ما قبل التقييم', data:'البيانات' }[t];
  $('#fab').classList.toggle('hide', t !== 'list');
  try { if (D) ({ att: renderAtt, vio: renderVio, list: renderList, rep: renderReports, pre: renderPre, data: renderData })[t](); } catch (e) { reportErr(e); } syncVioBar();
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
  const opt = sheet ? { style: { transform: 'none' }, backgroundColor: '#FCF7F0' } : { backgroundColor: '#0C1220' };
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
function downloadImg(b) { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = cur.file + '.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000); }
const doSave = () => withBlob(async b => { downloadImg(b); toast('الصورة اتحفظت (في التحميلات)'); });
const doShare = () => withBlob(async b => {
  const f = new File([b], cur.file + '.png', { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [f] })) {
    try { await navigator.share({ files: [f], title: cur.title }); } catch (e) { if (e && e.name !== 'AbortError') throw e; }
  } else { downloadImg(b); toast('الصورة اتحفظت، ابعتها من الواتساب'); window.open('https://wa.me/', '_blank'); }
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
    d.innerHTML = `<div class="box" role="dialog" aria-modal="true"><h3>${esc(o.title || '')}</h3>${o.text ? `<p>${esc(o.text)}</p>` : ''}${o.input ? `<input class="fin" id="dlgIn" type="${o.itype || 'text'}" ${o.itype === 'password' ? 'inputmode="numeric" maxlength="4"' : ''} placeholder="${esc(o.input)}" aria-label="${esc(o.input)}" autocomplete="off">` : ''}<div class="row2"><button class="btn ${o.danger ? 'danger' : ''}" data-d="ok">${esc(o.ok || 'تأكيد')}</button><button class="btn ghost2" data-d="no">إلغاء</button></div></div>`;
    document.body.appendChild(d);
    const done = v => { d.remove(); res(v); };
    d.addEventListener('click', e => { const k = e.target.dataset && e.target.dataset.d; if (k === 'ok') done(o.input ? (d.querySelector('#dlgIn').value.trim() || null) : true); else if (k === 'no' || e.target === d) done(null); });
    const inp = d.querySelector('input'); if (inp) setTimeout(() => inp.focus(), 60);
  });
}

/* ---------------- استيراد وتخزين ---------------- */
function save(raw) { try { localStorage.setItem(LS, JSON.stringify(raw)); } catch (e) { toast('مقدرتش أحفظ البيانات على الجهاز'); } }
const now = () => new Date().toLocaleString('en-GB', { hour12: false }).slice(0, 17);
const avgOfScores = sc => (sc && sc.length === 8 && sc.every(x => typeof x === 'number')) ? Math.round(sc.reduce((p, q) => p + q, 0) / 8 * 100 + 1e-7) / 100 : null;
function absFlagsOf(w) {
  const days = [...new Set(w.abs.filter(x => x.t === 'غياب').map(x => x.s))].sort((x, y) => x - y);
  let best = 0, cur = 0, prev = null; days.forEach(s => { cur = prev != null && s - prev === 1 ? cur + 1 : 1; best = Math.max(best, cur); prev = s; });
  const f = []; if (best >= 3) f.push(best + ' أيام غياب متتالية');
  for (let i = 0; i + 2 < days.length; i++) if (days[i + 2] - days[i] <= 6) { f.push('3 غيابات في أسبوع واحد'); break; }
  return f;
}
const snapshotOf = r => ({ month: r.month, T: r.T, workers: r.workers.map(w => ({ name: w.name, section: w.section, status: w.status, scores: w.scores.slice(), abs: w.abs.slice(), vio: w.vio.slice() })) });
function logAct(m) { RAW.log = (RAW.log || []).concat([{ t: Date.now(), m }]).slice(-300); }
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
  if (RAW && RAW.builtin) { try { localStorage.setItem(LS, JSON.stringify(RAW)); } catch (e) {} }
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
    raw.importedAt = now(); raw.builtin = false; RAW = raw; logAct('استيراد ملف ' + file.name);
    state.q = ''; state.sec = '';
    commit(`تم التحديث: ${RAW.workers.length} عامل`); setTab('list');
  } catch (e) { console.error(e); toast(e.message || 'مقدرتش أقرا الملف'); }
}

/* ---------------- تعديل البيانات من التطبيق ---------------- */
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const isoToSerial = iso => { const [y, m, d] = iso.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 86400000) + 25569; };
let ed = null;
function openEditor(i, mode) {
  if (!RAW) RAW = sanitize({ workers: [] });
  const base = i >= 0 ? RAW.workers[i] : { name: '', section: '', scores: Array(8).fill(null), status: '', abs: [], vio: [] };
  ed = { i, mode: mode || '', w: JSON.parse(JSON.stringify(base)) };
  const w = ed.w, hd = ed.mode === 'reeval' ? ' hide' : '', uniq = f => [...new Set(RAW.workers.flatMap(x => f(x)).filter(Boolean))];
  const dl = (id, arr) => `<datalist id="${id}">${arr.map(v => `<option value="${esc(v)}">`).join('')}</datalist>`;
  $('#editor').innerHTML = `<div class="pbar"><button class="back" data-e="cancel" aria-label="رجوع">${I.back}</button><h2>${i < 0 ? 'عامل جديد' : (ed.mode === 'reeval' ? 'إعادة تقييم ' : 'تعديل ') + esc(w.name)}</h2></div>
  <div class="ebody">
    <div class="fs${hd}"><h3>بيانات العامل</h3><label>الاسم<input id="eName" value="${esc(w.name)}" autocomplete="off"></label>
      <label>ملاحظات (اختياري)<textarea id="eNote" rows="2" placeholder="أي ملاحظة عن العامل">${esc(w.note || '')}</textarea></label>
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
    img.onload = () => { const s = Math.min(img.width, img.height), c = document.createElement('canvas'); c.width = c.height = size; c.getContext('2d').drawImage(img, (img.width - s) / 2, 0, s, s, 0, 0, size, size); URL.revokeObjectURL(u); res(c.toDataURL(file.type === 'image/png' || file.type === 'image/webp' ? 'image/png' : 'image/jpeg', .88)); };
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
    if (ed.mode !== 'reeval') ed.w.note = ($('#eNote').value || '').trim();
    const isNew = ed.i < 0; logAct((isNew ? 'إضافة عامل ' : ed.mode === 'reeval' ? 'إعادة تقييم ' : 'تعديل ') + name); commit(isNew ? 'اتضاف العامل' : 'اتحفظت التعديلات'); return history.back();
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
    <div class="row2" style="margin:0 0 12px"><button class="btn ghost2 sm" data-act="allpres">كل العمال حاضرين</button><button class="btn ghost2 sm" data-act="copyyest">نسخ غياب أمس</button></div>
    <div class="h2" id="attRecTitle"></div><div class="dchips" id="attChips" style="margin-bottom:12px"></div>
    <div class="stick"><label class="search">${I.search}<input id="aq" placeholder="ابحث باسم العامل" aria-label="ابحث باسم العامل" value="${esc(att.q)}" autocomplete="off"></label>
    ${secChips('data-asec', att.sec)}</div><div class="list" id="attRows"></div>
    <button class="btn" data-act="attrep" style="width:100%;margin-top:14px">تقرير الحضور اليومي (صورة)</button>
    <button class="btn ghost2" data-act="absrep" style="width:100%;margin-top:10px">تقرير الغياب للإدارة (اليوم والشهر)</button>`;
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
  const y = window.scrollY, removed = old && old.t === att.type; logAct(`${w.name}: ${removed ? 'إلغاء ' : ''}${att.type} ${att.iso}`); commit(); window.scrollTo(0, y);
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
  logAct(`مخالفة (${type}) لـ ${n} عامل في ${vst.iso}`); commit(`اتسجلت المخالفة لـ ${n} عامل`); syncVioBar();
}

function attReportCard(iso) {
  const s = isoToSerial(iso), total = D.workers.length, by = t => D.workers.filter(w => dayStatus(w, s) === t);
  const A = by('غياب'), P = by('إذن'), L = by('إجازة'), present = total - A.length - P.length - L.length, pct = total ? Math.round(present / total * 100) : 0;
  const secRows = D.sections.map(sec => { const l = D.workers.filter(w => w.section === sec), c = t => l.filter(w => dayStatus(w, s) === t).length, a1 = c('غياب'), p1 = c('إذن'), l1 = c('إجازة');
    return tr([esc(sec), { h: l.length - a1 - p1 - l1, c: 'n' }, { h: a1, c: 'n' }, { h: p1, c: 'n' }, { h: l1, c: 'n' }]); });
  const lst = (title, arr) => arr.length ? H(`${title} (${arr.length})`) + tbl([['العامل'], ['القسم', '30%'], ['السبب', '28%']], arr.map(w => tr([{ h: esc(w.name), c: 'nm' }, esc(w.section), { h: esc((w.abs.find(x => x.s === s) || {}).r || '—'), c: 'mut' }]))) : '';
  const body = H('الحضور حسب القسم') + tbl([['القسم'], ['حاضر', '14%', 'n'], ['غياب', '14%', 'n'], ['إذن', '14%', 'n'], ['إجازة', '14%', 'n']], secRows, '', 0)
    + lst('الغياب', A) + lst('الإذن', P) + lst('الإجازات', L) + (A.length + P.length + L.length ? '' : '<div class="rs-ok">كل العمال حاضرين</div>');
  return sheetFrame({ tone: A.length ? 'warn' : 'ok', score: present, unit: 'حاضر من ' + total, pill: A.length ? 'غياب ' + A.length : 'الكل حاضر',
    ranks: [{ v: pct + '%', l: 'نسبة الحضور' }, { v: total, l: 'إجمالي العمال' }], tiles: [[A.length, 'غياب'], [P.length, 'إذن'], [L.length, 'إجازة'], [present, 'حاضر']],
    title: 'تقرير الحضور اليومي', name: fmtDate(s), tags: [total + ' عامل'], body });
}
function absReportCard(iso) {
  const s = isoToSerial(iso), total = D.workers.length, isToday = iso === todayISO();
  const st = D.workers.map(w => { const ab = w.abs.filter(x => x.s <= s), c = t => ab.filter(x => x.t === t).length; return { w, a: c('غياب'), p: c('إذن'), l: c('إجازة'), day: dayStatus(w, s) }; });
  const by = (x, y) => x.w.name.localeCompare(y.w.name, 'ar');
  const today = st.filter(x => x.day === 'غياب').sort((x, y) => y.a - x.a || by(x, y));
  const permT = st.filter(x => x.day === 'إذن').length, leaveT = st.filter(x => x.day === 'إجازة').length;
  const present = total - today.length - permT - leaveT, pct = total ? Math.round(today.length / total * 100) : 0;
  const month = st.filter(x => x.a > 0).sort((x, y) => y.a - x.a || y.p - x.p || by(x, y));
  const sumDays = st.reduce((p, x) => p + x.a, 0);
  const hot = n => ({ h: n, c: n >= 3 ? 'n hot' : 'n' }), short = f => f.replace('غياب ', '').replace(' واحد', '');
  const todayRows = today.map(x => tr([{ h: esc(x.w.name), c: 'nm' }, esc(x.w.section), { h: esc((x.w.abs.find(y => y.s === s) || {}).r || '—'), c: 'mut' }, hot(x.a)]));
  let monthHtml;
  if (month.length > 12) {
    const half = Math.ceil(month.length / 2), cols = [['#', '14%', 'n'], ['العامل'], ['غياب', '22%', 'n']];
    const mrow = (x, i) => tr([{ h: i + 1, c: 'n' }, { h: esc(x.w.name), c: x.w.absFlags.length ? 'nm flagged' : 'nm' }, hot(x.a)]);
    monthHtml = `<div class="rs-two">${tbl(cols, month.slice(0, half).map((x, i) => mrow(x, i)))}${tbl(cols, month.slice(half).map((x, i) => mrow(x, i + half)))}</div>${month.some(x => x.w.absFlags.length) ? '<div class="rs-hint">الأسماء بالأحمر: غياب متكرر (3 أيام متتالية أو 3 غيابات في أسبوع)</div>' : ''}`;
  } else {
    monthHtml = tbl([['#', '10%', 'n'], ['العامل'], ['القسم', '26%'], ['غياب', '11%', 'n'], ['إذن', '10%', 'n'], ['إجازة', '12%', 'n']],
      month.map((x, i) => tr([{ h: i + 1, c: 'n' }, { h: esc(x.w.name) + (x.w.absFlags.length ? `<span class="rs-flag">${short(x.w.absFlags[0])}</span>` : ''), c: 'nm' }, esc(x.w.section), hot(x.a), { h: x.p, c: 'n' }, { h: x.l, c: 'n' }])), 'لا يوجد غياب مسجل');
  }
  const body = H(`الغياب ${isToday ? 'اليوم' : 'في اليوم ده'} (${today.length})`) + tbl([['العامل'], ['القسم', '27%'], ['السبب', '16%'], ['الإجمالي', '17%', 'n']], todayRows, 'لا يوجد غياب')
    + H('ترتيب الغياب خلال الشهر، من الأكثر للأقل') + monthHtml;
  return sheetFrame({ tone: pct >= 15 ? 'bad' : today.length ? 'warn' : 'ok', score: today.length, unit: 'غايب من ' + total, pill: today.length ? `نسبة الغياب <bdi dir="ltr">${pct}%</bdi>` : 'مفيش غياب',
    ranks: [{ v: sumDays, l: 'إجمالي أيام الغياب' }, { v: month.length, s: total + ' /', l: 'عمال لهم غياب' }],
    tiles: [[today.length, 'غياب'], [permT, 'إذن'], [leaveT, 'إجازة'], [present, 'حاضر']],
    title: 'تقرير الغياب', name: fmtDate(s), tags: ['الإجمالي حتى هذا اليوم', total + ' عامل'], body });
}
function vioReportCard(iso) {
  const s = isoToSerial(iso), list = [];
  D.workers.forEach(w => w.vio.forEach(v => { if (v.s === s) list.push({ w, v }); }));
  const people = new Set(list.map(x => x.w.id)).size, monthTotal = D.workers.reduce((p, w) => p + w.cntVio, 0), monthPeople = D.workers.filter(w => w.cntVio).length;
  const types = {}; list.forEach(x => { types[x.v.type] = (types[x.v.type] || 0) + 1; });
  const noAct = list.filter(x => !x.v.action).length;
  const body = H('مخالفات اليوم') + tbl([['العامل', '24%'], ['القسم', '20%'], ['المخالفة'], ['الإجراء', '20%']], list.map(x => tr([{ h: esc(x.w.name), c: 'nm' }, esc(x.w.section), esc(x.v.type) + (x.v.detail ? ': ' + esc(x.v.detail) : ''), { h: esc(x.v.action || '—'), c: 'mut' }])), 'لا توجد مخالفات مسجلة في اليوم ده')
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
  const snap = JSON.stringify(RAW); logAct('حذف ' + w.name); RAW.workers.splice(i, 1); skipRefresh = true; commit(); skipRefresh = false;
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
  if (d.vd) { const [id, n] = d.vd.split(':').map(Number); logAct('مسح مخالفة لـ ' + RAW.workers[id].name); RAW.workers[id].vio.splice(n, 1); return commit('اتمسحت المخالفة'); }
  if (t.id === 'vioGo') return registerVio();
  if (d.act === 'xlsx') return exportXlsx();
  if (d.act === 'pinon') return pinOn();
  if (d.act === 'pinoff') return pinOff();
  if (d.act === 'log') return openLog();
  if (d.act === 'allpres') return attAllPresent();
  if (d.act === 'copyyest') return attCopyYest();
  if (d.act === 'pdf') return printPick();
  if (d.act === 'arcrep') { const i = +d.i, m = RAW.archive[i].month; return openPage('تقرير ' + m, withMonth(i, () => reportCard(null)), 'تقرير القسم كله ' + m); }
  if (d.act === 'arcdel') { const i = +d.i; ask({ title: 'حذف شهر ' + RAW.archive[i].month, text: 'هيتحذف الشهر المحفوظ ده نهائيًا.', ok: 'حذف', danger: true }).then(ok => { if (ok) { logAct('حذف شهر محفوظ ' + RAW.archive[i].month); RAW.archive.splice(i, 1); commit('اتحذف الشهر'); } }); return; }
  if (d.act === 'absrep') return openPage('تقرير الغياب', absReportCard(att.iso), `غياب ${fmtDate(isoToSerial(att.iso))}`);
  if (d.act === 'attrep') return openPage('تقرير الحضور', attReportCard(att.iso), `حضور ${fmtDate(isoToSerial(att.iso))}`);
  if (d.act === 'viorep') return openPage('تقرير المخالفات', vioReportCard(vst.iso), `مخالفات ${fmtDate(isoToSerial(vst.iso))}`);
});
document.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.dk; if (!k || !e.target.value) return;
  (k === 'att' ? att : vst).iso = e.target.value; k === 'att' ? renderAtt() : renderVio();
});


/* ---------------- إضافات: تصدير، قفل، سجل، طباعة ---------------- */
function download(b, name) { const l = document.createElement('a'); l.href = URL.createObjectURL(b); l.download = name; document.body.appendChild(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(l.href), 5000); }
function exportXlsx() {
  if (typeof XLSX === 'undefined') return toast('ملف xlsx.mini.min.js مش مرفوع على GitHub');
  const wb = XLSX.utils.book_new();
  const r1 = [['الاسم', 'القسم', 'الحالة', ...CRIT, 'المتوسط', 'القرار', 'الترتيب العام', 'غياب', 'إذن', 'إجازة', 'مخالفات', 'ملاحظات']].concat(D.workers.map(w => [w.name, w.section, w.status, ...w.scores.map(x => x == null ? '' : x), w.avg == null ? '' : w.avg, TONE_LABEL[w.tone], w.rank || '', w.cntAbs, w.cntPerm, w.cntLeave, w.cntVio, w.note || '']));
  const r2 = [['العامل', 'القسم', 'التاريخ', 'النوع', 'السبب']], r3 = [['العامل', 'القسم', 'التاريخ', 'نوع المخالفة', 'التفاصيل', 'الإجراء']];
  D.workers.forEach(w => { w.abs.slice().sort((x, y) => x.s - y.s).forEach(x => r2.push([w.name, w.section, fmtDate(x.s), x.t, x.r || ''])); w.vio.slice().sort((x, y) => x.s - y.s).forEach(x => r3.push([w.name, w.section, fmtDate(x.s), x.type, x.detail || '', x.action || ''])); });
  [['التقييم', r1], ['الغياب', r2], ['المخالفات', r3]].forEach(p => XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(p[1]), p[0]));
  const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  download(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `تقييم عمال التجهيز ${D.month}.xlsx`); toast('اتصدّر ملف Excel');
}
async function sha(s) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('twh|' + s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
function showLock() {
  if (document.getElementById('lock') || !localStorage.getItem('twh_pin')) return;
  const d = document.createElement('div'); d.id = 'lock'; let buf = '';
  d.innerHTML = `<div class="lk"><img src="logo-emblem.png" alt=""><h2>اكتب الرقم السري</h2><div class="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'x'].map(k => k === '' ? '<span></span>' : `<button data-k="${k}" aria-label="${k === 'x' ? 'مسح' : k}">${k === 'x' ? I.del : k}</button>`).join('')}</div></div>`;
  document.body.appendChild(d);
  const paint = () => d.querySelectorAll('.dots i').forEach((x, i) => x.classList.toggle('on', i < buf.length));
  d.addEventListener('click', async e => {
    const b = e.target.closest('[data-k]'); if (!b) return; const k = b.dataset.k;
    if (k === 'x') buf = buf.slice(0, -1); else if (buf.length < 4) buf += k; paint();
    if (buf.length === 4) { if ((await sha(buf)) === localStorage.getItem('twh_pin')) d.remove(); else { d.classList.add('bad'); setTimeout(() => { d.classList.remove('bad'); buf = ''; paint(); }, 450); } }
  });
}
let hiddenAt = 0;
document.addEventListener('visibilitychange', () => { if (document.hidden) hiddenAt = Date.now(); else if (hiddenAt && Date.now() - hiddenAt > 120000) showLock(); });
function pinOn() {
  ask({ title: 'رقم سري جديد', text: 'اكتب 4 أرقام.', input: '4 أرقام', itype: 'password', ok: 'التالي' }).then(p1 => {
    if (!p1) return; if (!/^\d{4}$/.test(p1)) return toast('لازم 4 أرقام');
    ask({ title: 'أكد الرقم', input: 'اكتب الرقم تاني', itype: 'password', ok: 'تفعيل القفل' }).then(async p2 => { if (!p2) return; if (p2 !== p1) return toast('الرقمين مش متطابقين'); localStorage.setItem('twh_pin', await sha(p1)); renderData(); toast('اتفعّل القفل'); });
  });
}
function pinOff() {
  ask({ title: 'إلغاء القفل', text: 'اكتب الرقم السري الحالي.', input: 'الرقم السري', itype: 'password', ok: 'إلغاء القفل', danger: true }).then(async p => { if (!p) return; if ((await sha(p)) !== localStorage.getItem('twh_pin')) return toast('الرقم غلط'); localStorage.removeItem('twh_pin'); renderData(); toast('اتلغى القفل'); });
}
function openLog() {
  const items = (RAW.log || []).slice().reverse().slice(0, 150);
  $('#editor').innerHTML = `<div class="pbar"><button class="back" data-e="cancel" aria-label="رجوع">${I.back}</button><h2>سجل التعديلات</h2></div><div class="ebody">${items.length ? items.map(x => `<div class="fs" style="padding:12px 16px;margin-bottom:8px"><b>${esc(x.m)}</b><br><small style="color:var(--muted)">${esc(new Date(x.t).toLocaleString('en-GB', { hour12: false }).slice(0, 17))}</small></div>`).join('') : '<div class="card info"><p>لسه مفيش تعديلات متسجلة.</p></div>'}</div>`;
  ed = { log: true }; $('#editor').classList.add('show'); $('#editor').scrollTop = 0; history.pushState({ e: 1 }, '');
}
function withMonth(i, fn) {
  const keep = D;
  try { const m = RAW.archive[i]; D = enrich({ month: m.month, T: m.T || RAW.T, workers: m.workers }); return fn(); } finally { D = keep; }
}
async function attAllPresent() {
  const s = isoToSerial(att.iso), n = D.workers.filter(w => dayStatus(w, s)).length; if (!n) return toast('مفيش تسجيلات في اليوم ده');
  const ok = await ask({ title: 'كل العمال حاضرين', text: `هيتشال ${n} تسجيل (غياب أو إذن أو إجازة) يوم ${fmtDate(s)}.`, ok: 'تأكيد', danger: true }); if (!ok) return;
  const snap = JSON.stringify(RAW); RAW.workers.forEach(w => { w.abs = w.abs.filter(x => x.s !== s); }); logAct('كل العمال حاضرين ' + att.iso); commit();
  toast('كل العمال حاضرين', { label: 'تراجع', fn: () => { RAW = JSON.parse(snap); commit(); } });
}
function attCopyYest() {
  const s = isoToSerial(att.iso), y = isoToSerial(shiftISO(att.iso, -1)), snap = JSON.stringify(RAW); let n = 0;
  RAW.workers.forEach(w => { const o = w.abs.find(x => x.s === y); if (o && !w.abs.some(x => x.s === s)) { w.abs.push({ s, t: o.t, r: o.r }); n++; } });
  if (!n) return toast('مفيش غياب مسجل أمس يتنسخ');
  logAct('نسخ ' + n + ' تسجيل من أمس'); commit(); toast(`اتنسخ ${n} تسجيل من أمس`, { label: 'تراجع', fn: () => { RAW = JSON.parse(snap); commit(); } });
}
function printSheets(htmls, fit) {
  let r = document.getElementById('printRoot'); if (!r) { r = document.createElement('div'); r.id = 'printRoot'; document.body.appendChild(r); }
  const m = document.createElement('div'); m.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;visibility:hidden'; m.innerHTML = htmls.join(''); document.body.appendChild(m);
  const hs = [...m.querySelectorAll('.sheet')].map(s => s.offsetHeight); m.remove();
  r.innerHTML = htmls.map((h, i) => `<div class="pp ${fit ? 'one' : ''}" style="--z:${fit ? Math.min(.9925, 1123 / (hs[i] || 1131)).toFixed(4) : .9925}">${h}</div>`).join('');
  document.body.classList.add('printing'); setTimeout(() => window.print(), 350);
}
window.addEventListener('afterprint', () => { document.body.classList.remove('printing'); const r = document.getElementById('printRoot'); if (r) r.innerHTML = ''; });
function choose(title, opts) {
  return new Promise(res => { const d = document.createElement('div'); d.className = 'dlg';
    d.innerHTML = `<div class="box" role="dialog" aria-modal="true"><h3>${esc(title)}</h3><div class="optlist">${opts.map((o, i) => `<button class="btn ghost2" data-v="${i}">${esc(o)}</button>`).join('')}<button class="btn danger" data-v="-1">إلغاء</button></div></div>`;
    document.body.appendChild(d); d.addEventListener('click', e => { const v = e.target.dataset && e.target.dataset.v; if (v != null) { d.remove(); res(+v); } else if (e.target === d) { d.remove(); res(-1); } }); });
}
async function printPick() {
  const opts = ['كل العمال (' + D.workers.length + ')', ...D.sections.map(s => 'عمال قسم ' + s), 'حزمة الإدارة: القسم كله + الأقسام + الغياب'];
  const v = await choose('اطبع أو احفظ PDF', opts); if (v < 0) return;
  let h;
  if (v === 0) h = D.workers.map(w => workerCard(w));
  else if (v <= D.sections.length) { const s = D.sections[v - 1]; h = D.workers.filter(w => w.section === s).map(w => workerCard(w)); }
  else h = [reportCard(null), absReportCard(todayISO()), ...D.sections.map(s => reportCard(s))];
  toast('اختار "حفظ كـ PDF" من نافذة الطباعة', { ms: 4500 }); printSheets(h, v <= D.sections.length);
}

/* ---------------- الأحداث ---------------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-tab],[data-w],[data-r],[data-sec],[data-act]');
  if (!t) return;
  if (t.dataset.tab) return setTab(t.dataset.tab);
  if (t.dataset.w != null) { const w = D.workers[+t.dataset.w]; return openPage(w.name, workerCard(w), `تقييم ${w.name} - ${D.month}`, w.id); }
  if (t.dataset.r != null) { const s = t.dataset.r; return openPage(s ? 'تقرير ' + s : 'تقرير التجهيز', reportCard(s || null), `تقرير ${s || 'قسم التجهيز'} - ${D.month}`); }
  if (t.dataset.sec != null && t.closest('#v-list')) { state.sec = t.dataset.sec; return renderList(); }
  if (t.dataset.act === 'import' || t.dataset.act === 'restore') return $('#file').click();
  if (t.dataset.act === 'add') return openEditor(-1);
  if (t.dataset.act === 'check') return checkFiles();
  if (t.dataset.act === 'refreshapp') return window.hardRefresh && window.hardRefresh();
  if (t.dataset.act === 'backup') { const b = new Blob([JSON.stringify(RAW)], { type: 'application/json' }); const l = document.createElement('a'); l.href = URL.createObjectURL(b); l.download = `نسخة ملفات العمال ${todayISO()}.json`; document.body.appendChild(l); l.click(); l.remove(); RAW.lastBackup = todayISO(); save(RAW); renderList(); return toast('اتحفظت النسخة الاحتياطية'); }
  if (t.dataset.act === 'newmonth') { ask({ title: 'بدء شهر جديد', text: 'اكتب اسم الشهر الجديد.', input: 'مثال: ديسمبر 2026', ok: 'التالي' }).then(m => { if (!m) return; ask({ title: 'تأكيد', text: 'الشهر الحالي هيتحفظ في "الشهور السابقة" والغياب والمخالفات والتقييمات هتتصفّر لكل العمال. الأفضل تحفظ نسخة احتياطية الأول.', ok: 'ابدأ الشهر الجديد', danger: true }).then(ok => { if (!ok) return; RAW.archive = (RAW.archive || []).concat([snapshotOf(RAW)]).slice(-24); logAct('بدء شهر ' + m + ' (اتحفظ شهر ' + RAW.month + ')'); RAW.month = m; RAW.workers.forEach(w => { w.abs = []; w.vio = []; w.hist = []; w.scores = Array(8).fill(null); }); commit('اتحفظ الشهر القديم وبدأ الشهر الجديد'); }); }); return; }
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
try { showLock(); } catch (e) {}
window.__app = { get D() { return D; }, preRows, preDefaultMonth, printSheets, workerCard, reportCard, absReportCard, withMonth, get RAW() { return RAW; }, parseWorkbook, enrich };
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
