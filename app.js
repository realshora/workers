(() => {
'use strict';
const $ = s => document.querySelector(s);
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
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="3"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c0-.1-.2-.2-.5-.3z"/></svg>',
  user:'<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.7-4 3.7-6 7.5-6s6.8 2 7.5 6"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="15" rx="3.5"/><path d="M8 3v4M16 3v4M4 10h16M9 15l2 2 4-4"/></svg>',
  flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 5h12l-2.5 4L17 13H5"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>',
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
    if (firstDate) { const p = XLSX.SSF.parse_date_code(firstDate); month = MONTHS[p.m - 1] + ' ' + p.y; }
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
function fmtDate(s) { const p = XLSX.SSF.parse_date_code(s); const wd = new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay(); return `${DAYS[wd]} ${p.d} ${MONTHS[p.m - 1]}`; }
function shortDate(s) { const p = XLSX.SSF.parse_date_code(s); const wd = new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay(); return `${DAYS[wd]} ${p.d}`; }

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

/* ---------------- بطاقة العامل ---------------- */
function workerCard(w) {
  const dayChips = w.abs.length ? `<div class="dchips">${w.abs.slice().sort((a, b) => a.s - b.s).map(a => `<span class="dchip tone-${a.t === 'غياب' ? 'bad' : a.t === 'إذن' ? 'warn' : 'none'}">${a.t}: ${shortDate(a.s)}</span>`).join('')}</div>` : `<div class="good">ملتزم بالحضور، مفيش غياب مسجل</div>`;
  const vio = w.vio.length ? w.vio.slice().sort((a, b) => a.s - b.s).map(v => `<div class="vio"><div class="v1"><span>${fmtDate(v.s)}</span><span>${esc(v.action)}</span></div><b>${esc(v.type)}</b>${v.detail ? `<p>${esc(v.detail)}</p>` : ''}</div>`).join('') : `<div class="good">لا توجد مخالفات مسجلة</div>`;
  return `<div class="sc tone-${w.tone}">
    <div class="hero"><i class="tape"></i><div class="hrow"><span><img src="logo-emblem.png" alt="">التوحيد إيجيبت</span><span class="mon">${esc(D.month)}</span></div>
      <div class="worker-portrait">${w.photo ? `<img src="${w.photo}" alt="صورة ${esc(w.name)}">` : `<span>${I.user}</span>`}</div><h2>${esc(w.name)}</h2><div class="tags"><span class="tag">${esc(w.section)}</span>${w.status ? `<span class="tag">عامل ${esc(w.status)}</span>` : ''}</div>
      <div class="score"><b>${fmt(w.avg)}</b><span>من 5</span></div><span class="stamp">${TONE_LABEL[w.tone]}</span></div>
    <div class="sbody">
      ${w.avg != null ? `<div class="duo"><div><b>${w.rank}</b><span>الترتيب العام من ${D.total}</span></div><div><b>${w.srank}</b><span>الترتيب في القسم من ${w.stotal}</span></div></div>` : ''}
      ${tiles([['غياب', w.cntAbs, w.cntAbs >= 3 ? 'hot' : ''], ['إذن', w.cntPerm], ['إجازة', w.cntLeave], ['مخالفات', w.cntVio, w.cntVio ? 'hot' : '']])}
      ${w.alerts.length ? `<div class="vio" style="margin-top:12px"><div class="v1"><span>تنبيه</span></div><b>درجة منخفضة في: ${w.alerts.join(' و ')}</b></div>` : ''}
      <div class="sh">التقييم التفصيلي</div>${w.complete ? critRows(w.scores, true) + insight(w.scores) : `<div class="good" style="background:var(--none-bg)">لم يتم إدخال تقييم هذا الشهر</div>`}
      <div class="sh">سجل الغياب</div>${dayChips}
      <div class="sh">المخالفات</div>${vio}
      ${foot()}
    </div></div>`;
}

/* ---------------- بطاقة تقرير القسم / الكل ---------------- */
function miniRow(w, showSec, inSec) {
  const r = inSec ? w.srank : w.rank;
  const g = r && r <= 3 ? ' g' + r : '';
  return `<div class="mini tone-${w.tone}"><div class="rk${g}">${r ?? '—'}</div><div class="mm"><b>${esc(w.name)}</b>${showSec ? `<small style="color:var(--muted);font-size:12px">${esc(w.section)}</small>` : ''}<div class="bar"><i style="width:${w.avg == null ? 0 : w.avg / 5 * 100}%"></i></div></div><em>${fmt(w.avg)}</em></div>`;
}
function reportCard(sec) {
  const list = sec ? D.workers.filter(w => w.section === sec) : D.workers;
  const st = stats(list), tone = toneOf(st.avg);
  const hue = sec ? HUES[D.sections.indexOf(sec) % HUES.length] : '#4F46E5';
  const sorted = list.slice().sort(byRank);
  const best = sorted.find(w => w.avg != null);
  const total = st.n || 1;
  const dist = ['ok','warn','bad','none'].filter(k => st.dec[k]).map(k => `<i style="flex:${st.dec[k]};background:var(--${k === 'none' ? 'none' : k})"></i>`).join('');
  const legend = ['ok','warn','bad','none'].filter(k => st.dec[k]).map(k => `<span style="--lc:var(--${k})">${TONE_LABEL[k]} (${st.dec[k]})</span>`).join('');
  const needs = list.filter(w => w.alerts.length || w.cntVio || w.cntAbs >= 3).sort(byRank);
  const needsHtml = needs.length ? needs.map(w => `<div class="vio"><div class="v1"><span>${esc(w.name)}</span><span>${fmt(w.avg)}</span></div><b>${[w.alerts.length ? 'درجة منخفضة: ' + w.alerts.join(' و ') : '', w.cntVio ? 'مخالفات: ' + w.cntVio : '', w.cntAbs >= 3 ? 'غياب: ' + w.cntAbs + ' أيام' : ''].filter(Boolean).join(' · ')}</b></div>`).join('') : `<div class="good">مفيش تنبيهات ولا مخالفات</div>`;
  let middle;
  if (sec) middle = `<div class="sh">ترتيب العمال</div>${sorted.map(w => miniRow(w, false, true)).join('')}`;
  else {
    const ev = sorted.filter(w => w.avg != null);
    const secs = D.sections.map(s => { const l = D.workers.filter(w => w.section === s); return { s, st: stats(l), hue: HUES[D.sections.indexOf(s) % HUES.length] }; }).sort((a, b) => (b.st.avg ?? -1) - (a.st.avg ?? -1));
    middle = `<div class="sh">مقارنة الأقسام</div>${secs.map(x => `<div class="mini tone-${toneOf(x.st.avg)}"><div class="mm"><b>${esc(x.s)} <small style="color:var(--muted);font-weight:500">(${x.st.n} عمال)</small></b><div class="bar"><i style="width:${x.st.avg == null ? 0 : x.st.avg / 5 * 100}%;background:${x.hue}"></i></div></div><em style="color:var(--ink)">${fmt(x.st.avg)}</em></div>`).join('')}
      <div class="sh">الأعلى تقييماً</div>${ev.slice(0, 5).map(w => miniRow(w, true)).join('')}
      <div class="sh">الأقل تقييماً</div>${ev.slice(-5).reverse().map(w => miniRow(w, true)).join('')}`;
  }
  return `<div class="sc tone-${tone}">
    <div class="hero"><i class="tape"></i><div class="hrow"><span><img src="logo-emblem.png" alt="">التوحيد إيجيبت</span><span class="mon">${esc(D.month)}</span></div>
      <h2>${sec ? 'تقرير قسم ' + esc(sec) : 'تقرير قسم التجهيز'}</h2><div class="tags"><span class="tag">${st.n} عامل</span></div>
      <div class="score"><b>${fmt(st.avg)}</b><span>من 5</span></div><span class="stamp">متوسط ${sec ? 'القسم' : 'التجهيز'}</span></div>
    <div class="sbody">
      ${best ? `<div class="duo"><div><b>${fmt(best.avg)}</b><span>الأعلى تقييماً: ${esc(best.name)}</span></div><div><b>${st.dec.ok}</b><span>مؤهل ويكمل من ${st.n}</span></div></div>` : ''}
      <div class="dist">${dist}</div><div class="legend">${legend}</div>
      ${tiles([['غياب', st.abs], ['إذن', st.perm], ['إجازة', st.leave], ['مخالفات', st.vio, st.vio ? 'hot' : '']])}
      <div class="sh">متوسط الجوانب</div>${critRows(st.crit)}${insight(st.crit)}
      ${middle}
      <div class="sh">تنبيهات ومتابعة</div>${needsHtml}
      ${foot()}
    </div></div>`;
}

/* ---------------- الشاشات الرئيسية ---------------- */
const emptyState = () => `<div class="card empty"><div class="big">${I.db}</div><h2>ابدأ برفع ملف التقييم</h2><p>اختار ملف الإكسل بتاع تقييم العمال، والتطبيق هيعمل ملفات العمال والترتيب والتقارير لوحده. البيانات بتفضل على موبايلك بس.</p><button class="btn" data-act="import">${I.db}اختيار ملف Excel</button></div>`;

function renderList() {
  const el = $('#v-list');
  if (!D) { el.innerHTML = emptyState(); return; }
  const st = stats(D.workers);
  const q = state.q.trim();
  let list = D.workers.filter(w => (!state.sec || w.section === state.sec) && (!q || w.name.includes(q)));
  el.innerHTML = `
    <div class="bento"><div class="bb avg"><i class="tape"></i><span>متوسط التقييم</span><b>${fmt(st.avg)}</b></div><div class="bb"><b>${D.workers.length}</b><span>عامل</span></div><div class="bb sun"><b>${st.dec.ok}</b><span>مؤهل ويكمل</span></div></div>
    <label class="search">${I.search}<input id="q" placeholder="ابحث باسم العامل" value="${esc(state.q)}" autocomplete="off"></label>
    <div class="chips"><button class="fchip ${state.sec ? '' : 'on'}" data-sec="">الكل</button>${D.sections.map(s => `<button class="fchip ${state.sec === s ? 'on' : ''}" data-sec="${esc(s)}">${esc(s)}</button>`).join('')}</div>
    <div class="list" id="wl"></div>`;
  fillWL(list);
  $('#q').addEventListener('input', e => { state.q = e.target.value; fillWL(D.workers.filter(w => (!state.sec || w.section === state.sec) && (!state.q.trim() || w.name.includes(state.q.trim())))); });
}
function fillWL(list) {
  $('#wl').innerHTML = list.length ? list.map(w => `<button class="wrow tone-${w.tone}" data-w="${w.id}" ><div class="av">${w.rank ?? '–'}</div><div class="wmain"><b>${esc(w.name)}</b><small>${esc(w.section)}</small></div><div class="wscore ${w.avg == null ? 'na' : ''}">${w.avg == null ? 'لم يقيَّم' : fmt(w.avg)}</div></button>`).join('') : `<div class="card empty" style="padding:26px"><p style="margin:0">مفيش نتايج</p></div>`;
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
  const card = (title, sub, st, hue, icon, attr) => `<button class="rep tone-${toneOf(st.avg)}" ${attr} style="--h:${hue}"><div class="ic">${icon}</div><div class="tx"><b>${esc(title)}</b><small>${sub}</small></div><div class="av2">${fmt(st.avg)}</div></button>`;
  el.innerHTML = `<div class="list">${card('تقرير قسم التجهيز كامل', `${all.n} عامل في كل الأقسام`, all, '#4F46E5', I.chart, 'data-r=""')}</div>
    <div class="h2">تقارير الأقسام (كل قسم لوحده)</div>
    <div class="list">${D.sections.map((s, i) => { const l = D.workers.filter(w => w.section === s), st = stats(l); return card(s, `${st.n} عمال، ${st.dec.ok} مؤهل، ${st.dec.warn} متابعة`, st, HUES[i % HUES.length], I.doc, `data-r="${esc(s)}"`); }).join('')}</div>`;
}
function renderData() {
  const el = $('#v-data');
  if (!D) { el.innerHTML = emptyState(); return; }
  el.innerHTML = `<div class="card info"><h3>الشهر الحالي</h3><input class="fin" id="monthIn" value="${esc(D.month)}" placeholder="مثال: ديسمبر 2026"><p style="margin-top:10px">${D.workers.length} عامل، ${D.sections.length} أقسام<br>آخر تعديل: ${esc(D.importedAt || '—')}</p><div class="row2"><button class="btn" data-act="newmonth">بدء شهر جديد</button></div></div>
    <div class="card info"><h3>نسخة احتياطية</h3><p>كل تعديلاتك بتتخزن على موبايلك. احفظ نسخة من وقت للتاني عشان لو اتمسحت بيانات المتصفح أو غيرت الموبايل.</p><div class="row2"><button class="btn" data-act="backup">حفظ نسخة احتياطية</button><button class="btn ghost2" data-act="restore">استرجاع نسخة</button></div></div>
    <div class="card info"><h3>استيراد من Excel</h3><p>اختياري. الملف بيحل محل البيانات الحالية.</p><div class="row2"><button class="btn ghost2" data-act="import">اختيار ملف Excel</button>${D.builtin ? '' : '<button class="btn danger" data-act="clear">الرجوع للبيانات الأصلية</button>'}</div></div>`;
}
function renderAll() { renderList(); renderAtt(); renderVio(); renderRank(); renderReports(); renderData(); if ($('#month')) $('#month').textContent = D ? D.month : ''; }
function setTab(t) {
  state.tab = t;
  ['list','att','vio','rank','rep','data'].forEach(k => $('#v-' + k).classList.toggle('hide', k !== t));
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('on', b.dataset.tab === t));
  $('#title').textContent = { list:'عمال التجهيز', att:'الحضور والغياب', vio:'المخالفات', rank:'ترتيب العمال', rep:'التقارير', data:'البيانات' }[t];
  $('#fab').classList.toggle('hide', t !== 'list');
  if (D) ({ att: renderAtt, vio: renderVio, list: renderList, rank: renderRank, rep: renderReports, data: renderData })[t](); syncVioBar();
  window.scrollTo(0, 0);
}

/* ---------------- صفحة التفاصيل + الصورة ---------------- */
let cur = null;
function openPage(title, html, file, wid) {
  $('#ptitle').textContent = title;
  $('#shot').innerHTML = html;
  cur = { title, file, blob: null, wid: wid == null ? null : wid };
  $('#editBtn').classList.toggle('hide', wid == null); $('#reBtn').classList.toggle('hide', wid == null); $('#deleteWorkerBtn').classList.toggle('hide', wid == null);
  $('#page').classList.add('show'); $('#actions').classList.remove('hide'); $('#page').scrollTop = 0;
  history.pushState({ p: 1 }, '');
  setTimeout(() => getBlob().catch(() => {}), 450);
}
function closePage() { $('#page').classList.remove('show'); $('#actions').classList.add('hide'); cur = null; }
async function getBlob() {
  if (!cur) throw new Error('no page');
  if (!cur.blob) {
    const node = $('#shot'); const mine = cur;
    mine.blob = (async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      await Promise.all([...node.querySelectorAll('img')].map(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.onload=resolve; img.onerror=resolve; })));
      try {
        const blob = await htmlToImage.toBlob(node, { pixelRatio: 2, backgroundColor: '#1B0C03', cacheBust: true });
        if (blob && blob.size) return blob;
      } catch (err) { console.warn('html-to-image toBlob failed; trying canvas fallback', err); }
      const canvas = await htmlToImage.toCanvas(node, { pixelRatio: 2, backgroundColor: '#1B0C03', cacheBust: true });
      return await new Promise((resolve,reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('تعذر تحويل التقرير إلى صورة')), 'image/png'));
    })();
  }
  try { return await cur.blob; }
  catch (e) { cur.blob = null; throw e; }
}
function busy(on) { document.querySelectorAll('.act').forEach(b => b.disabled = on); }
async function withBlob(fn) {
  busy(true);
  try { const b = await getBlob(); if (!b) throw new Error('empty'); await fn(b); }
  catch (e) { console.error(e); toast('حصلت مشكلة في عمل الصورة، جرب تاني'); }
  finally { busy(false); }
}
function download(b) {
  const url = URL.createObjectURL(b), a = document.createElement('a');
  a.href = url; a.download = (cur?.file || 'تقرير العمال') + '.png'; a.style.display='none';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
const doSave = () => withBlob(async b => { download(b); toast('الصورة اتحفظت (في التحميلات)'); });
const doShare = () => {
  const waTab = window.open('about:blank', '_blank');
  return withBlob(async b => {
    const f = new File([b], (cur?.file || 'تقرير العمال') + '.png', { type: 'image/png' });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [f] })) {
      try { if (waTab) waTab.close(); await navigator.share({ files: [f], title: cur.title, text: cur.title }); return; }
      catch (e) { if (e && e.name === 'AbortError') return; console.warn('Share failed; using WhatsApp fallback',e); }
    }
    download(b);
    const message = encodeURIComponent(`${cur?.title || 'تقرير العمال'} — تم حفظ صورة التقرير. أرفق الصورة من التنزيلات في المحادثة.`);
    if (waTab) waTab.location.href = `https://wa.me/?text=${message}`;
    toast(waTab ? 'تم فتح واتساب وحفظ الصورة — أرفقها من التنزيلات' : 'تم حفظ الصورة — افتح واتساب وأرفقها من التنزيلات');
  });
};
const doCopy = () => withBlob(async b => {
  try {
    if (navigator.clipboard && window.ClipboardItem && window.isSecureContext) {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': b })]);
      toast('تم نسخ صورة التقرير'); return;
    }
    throw new Error('Clipboard image API unavailable');
  } catch (e) {
    try {
      const textContent = $('#shot').innerText.trim();
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textContent);
        toast('المتصفح لا يدعم نسخ الصورة؛ تم نسخ نص التقرير');
      } else toast('نسخ الصورة غير مدعوم هنا؛ استخدم حفظ الصورة');
    } catch (_) { toast('تعذر النسخ في هذا المتصفح؛ استخدم حفظ الصورة'); }
  }
});
let tT; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tT); tT = setTimeout(() => t.classList.remove('show'), 2600); }

/* ---------------- استيراد وتخزين ---------------- */
function save(raw) { try { localStorage.setItem(LS, JSON.stringify(raw)); } catch (e) { toast('مقدرتش أحفظ البيانات على الجهاز'); } }
const now = () => new Date().toLocaleString('en-GB', { hour12: false }).slice(0, 17);
function rebuild() { if (!RAW) { D = null; return; } D = enrich(RAW); D.fileName = RAW.fileName; D.importedAt = RAW.importedAt; D.builtin = !!RAW.builtin; }
function load() {
  try { const r = localStorage.getItem(LS); if (r) RAW = JSON.parse(r); } catch (e) {}
  if (!RAW && window.BUILTIN) { RAW = JSON.parse(JSON.stringify(window.BUILTIN)); RAW.builtin = true; }
  rebuild();
}
let skipRefresh = false;
function commit(msg) {
  RAW.builtin = false; RAW.fileName = RAW.fileName || 'تعديل داخل التطبيق'; RAW.importedAt = now();
  save(RAW); rebuild(); renderAll(); if (!skipRefresh) refreshPage(); if (msg) toast(msg);
}
function refreshPage() {
  if (!cur || cur.wid == null) return;
  const w = D.workers[cur.wid]; if (!w) return;
  $('#shot').innerHTML = workerCard(w); $('#ptitle').textContent = w.name; cur.file = `تقييم ${w.name} - ${D.month}`; cur.blob = null;
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
function openEditor(i) {
  const base = i >= 0 ? RAW.workers[i] : { name: '', section: '', scores: Array(8).fill(null), status: '', abs: [], vio: [] };
  ed = { i, w: JSON.parse(JSON.stringify(base)) };
  const w = ed.w, uniq = f => [...new Set(RAW.workers.flatMap(x => f(x)).filter(Boolean))];
  const dl = (id, arr) => `<datalist id="${id}">${arr.map(v => `<option value="${esc(v)}">`).join('')}</datalist>`;
  $('#editor').innerHTML = `<div class="pbar"><button class="back" data-e="cancel">${I.back}</button><h2>${i < 0 ? 'عامل جديد' : 'تعديل ' + esc(w.name)}</h2></div>
  <div class="ebody">
    <div class="fs"><h3>بيانات العامل</h3><label>الاسم<input id="eName" value="${esc(w.name)}" autocomplete="off"></label>
      <label>القسم<input id="eSec" list="dlSecs" value="${esc(w.section)}" placeholder="اختار قسم أو اكتب قسم جديد" autocomplete="off"></label>
      <label>الصورة الشخصية<input id="ePhoto" type="file" accept="image/*"><small class="photo-note">${w.photo ? "تم إضافة صورة شخصية — اختار صورة جديدة للتغيير" : "اختياري: أضف صورة واضحة للعامل"}</small></label>
      ${w.photo ? `<div class="photo-preview"><img src="${w.photo}" alt="صورة العامل"><button type="button" class="btn danger" data-e="rmphoto">حذف الصورة</button></div>` : ""}
      <div class="seg2" id="eStatus"><button data-e="status" data-v="قديم">عامل قديم</button><button data-e="status" data-v="جديد">عامل جديد</button></div></div>
    <div class="fs" id="evaluationSection"><h3>التقييم من 1 إلى 5</h3><p class="eval-note">يمكنك تحديث الدرجات في أي وقت ثم حفظ التقييم الجديد.</p>${CRIT.map((n, k) => `<div class="srow"><span>${n}</span><div class="nums" data-k="${k}">${[1,2,3,4,5].map(v => `<button data-e="score" data-k="${k}" data-v="${v}">${v}</button>`).join('')}</div></div>`).join('')}</div>
    <div class="fs"><h3>تسجيل غياب أو إذن أو إجازة</h3><input type="date" id="aDate" value="${todayISO()}">
      <div class="seg2"><button data-e="abs" data-v="غياب">غياب</button><button data-e="abs" data-v="إذن">إذن</button><button data-e="abs" data-v="إجازة">إجازة</button></div><div id="absList"></div></div>
    <div class="fs"><h3>تسجيل مخالفة</h3><input type="date" id="vDate" value="${todayISO()}"><input id="vType" list="dlTypes" placeholder="نوع المخالفة" autocomplete="off"><textarea id="vDet" rows="2" placeholder="التفاصيل"></textarea><input id="vAct" list="dlActs" placeholder="الإجراء، مثال: إنذار شفهي" autocomplete="off">
      <button class="btn" data-e="addvio" style="margin-top:10px">إضافة المخالفة</button><div id="vioList"></div></div>
    ${i >= 0 ? '<button class="btn danger" data-e="del" style="width:100%">حذف العامل</button>' : ''}
  </div>
  ${dl('dlSecs', uniq(x => [x.section]))}${dl('dlTypes', uniq(x => x.vio.map(v => v.type)))}${dl('dlActs', uniq(x => x.vio.map(v => v.action)))}
  <div class="actions"><div class="inner"><button class="act main" data-e="save">حفظ</button><button class="act" data-e="cancel">إلغاء</button></div></div>`;
  paintEd(); absList(); vioList();
  $('#editor').classList.add('show'); $('#editor').scrollTop = 0; history.pushState({ e: 1 }, '');
}
function closeEditor() { $('#editor').classList.remove('show'); ed = null; }
function paintEd() {
  document.querySelectorAll('#eStatus button').forEach(b => b.classList.toggle('on', b.dataset.v === ed.w.status));
  document.querySelectorAll('.nums button').forEach(b => b.classList.toggle('on', ed.w.scores[+b.dataset.k] === +b.dataset.v));
}
function absList() {
  $('#absList').innerHTML = ed.w.abs.slice().sort((a, b) => a.s - b.s).map(a => `<div class="chiprow"><span class="dchip tone-${a.t === 'غياب' ? 'bad' : a.t === 'إذن' ? 'warn' : 'none'}">${a.t}: ${fmtDate(a.s)}</span><button data-e="rmabs" data-n="${a.s}">×</button></div>`).join('');
}
function vioList() {
  $('#vioList').innerHTML = ed.w.vio.map((v, n) => `<div class="ve"><div><b>${esc(v.type)}</b><br><small>${fmtDate(v.s)}${v.action ? '، ' + esc(v.action) : ''}</small>${v.detail ? `<p>${esc(v.detail)}</p>` : ''}</div><button data-e="rmvio" data-n="${n}">×</button></div>`).join('');
}
$('#editor').addEventListener('click', e => {
  const t = e.target.closest('[data-e]'); if (!t || !ed) return;
  const k = t.dataset.e, v = t.dataset.v;
  if (k === 'cancel') return history.back();
  if (k === 'rmphoto') {
    ed.w.photo = '';
    const preview = t.closest('.photo-preview'); if (preview) preview.remove();
    const note = $('.photo-note'); if (note) note.textContent = 'تم حذف الصورة — اضغط حفظ لتأكيد التغيير';
    return toast('تم حذف الصورة من التعديل الحالي');
  }
  if (k === 'status') { ed.w.status = ed.w.status === v ? '' : v; return paintEd(); }
  if (k === 'score') { const kk = +t.dataset.k; ed.w.scores[kk] = ed.w.scores[kk] === +v ? null : +v; return paintEd(); }
  if (k === 'abs') { const d = $('#aDate').value; if (!d) return toast('اختار التاريخ الأول'); const s = isoToSerial(d); ed.w.abs = ed.w.abs.filter(x => x.s !== s); ed.w.abs.push({ s, t: v }); absList(); return toast(`اتسجل ${v}`); }
  if (k === 'rmabs') { ed.w.abs = ed.w.abs.filter(x => x.s !== +t.dataset.n); return absList(); }
  if (k === 'addvio') { const type = $('#vType').value.trim(), d = $('#vDate').value; if (!type || !d) return toast('اكتب نوع المخالفة والتاريخ'); ed.w.vio.push({ s: isoToSerial(d), type, detail: $('#vDet').value.trim(), action: $('#vAct').value.trim() }); ['vType','vDet','vAct'].forEach(id => $('#' + id).value = ''); vioList(); return toast('اتسجلت المخالفة'); }
  if (k === 'rmvio') { ed.w.vio.splice(+t.dataset.n, 1); return vioList(); }
  if (k === 'save') {
    const name = $('#eName').value.trim(), sec = $('#eSec').value.trim();
    if (!name) return toast('اكتب اسم العامل');
    if (!sec) return toast('اختار القسم');
    if (RAW.workers.some((x, j) => j !== ed.i && x.name.trim() === name)) return toast('فيه عامل بنفس الاسم ده');
    ed.w.name = name; ed.w.section = sec;
    if (ed.i < 0) RAW.workers.push(ed.w); else RAW.workers[ed.i] = ed.w;
    const isNew = ed.i < 0; commit(isNew ? 'اتضاف العامل' : 'اتحفظت التعديلات'); return history.back();
  }
  if (k === 'del' && confirm(`تحذف ${ed.w.name} نهائيًا؟`)) {
    RAW.workers.splice(ed.i, 1); skipRefresh = true; commit('اتحذف العامل'); skipRefresh = false;
    history.back(); setTimeout(() => { if ($('#page').classList.contains('show')) history.back(); }, 150);
  }
});

$('#editor').addEventListener('change', async e => {
  if (e.target.id !== 'ePhoto' || !ed) return;
  const file = e.target.files && e.target.files[0]; if (!file) return;
  if (!file.type.startsWith('image/')) return toast('اختار ملف صورة صحيح');
  try {
    const img = new Image(), url = URL.createObjectURL(file);
    await new Promise((resolve,reject)=>{ img.onload=resolve; img.onerror=reject; img.src=url; });
    const max=420, scale=Math.min(1,max/Math.max(img.width,img.height));
    const c=document.createElement('canvas'); c.width=Math.round(img.width*scale); c.height=Math.round(img.height*scale);
    c.getContext('2d').drawImage(img,0,0,c.width,c.height); URL.revokeObjectURL(url);
    ed.w.photo=c.toDataURL('image/jpeg',0.78);
    toast('تم تجهيز الصورة — اضغط حفظ لحفظها مع بيانات العامل');
    const note=$('.photo-note'); if(note) note.textContent='تم اختيار الصورة — اضغط حفظ لتأكيدها';
  } catch(err) { console.error(err); toast('تعذر قراءة الصورة'); }
});

document.addEventListener('change', e => { if (e.target.id === 'monthIn') { const m = e.target.value.trim(); if (m) { RAW.month = m; commit('اتحدّث الشهر'); } } });

/* ---------------- الحضور والمخالفات اليومية ---------------- */
const att = { iso: todayISO(), type: 'غياب', sec: '', q: '' };
const vst = { iso: todayISO(), sel: new Set(), sec: '', q: '', type: '', detail: '', action: '' };
const shiftISO = (iso, n) => { const [y, m, d] = iso.split('-').map(Number); const t = new Date(Date.UTC(y, m - 1, d + n)); return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, '0')}-${String(t.getUTCDate()).padStart(2, '0')}`; };
const dsel = (key, iso) => `<div class="dsel"><button data-dd="${key}:-1" aria-label="اليوم السابق">${I.back}</button><label><input type="date" data-dk="${key}" value="${iso}"><b>${fmtDate(isoToSerial(iso))}</b><small>${iso === todayISO() ? 'النهارده' : 'دوس هنا لتغيير التاريخ'}</small></label><button data-dd="${key}:1" class="flip" aria-label="اليوم التالي">${I.back}</button></div>`;
const dayStatus = (w, s) => { const a = w.abs.find(x => x.s === s); return a ? a.t : ''; };
const secChips = (attr, cur) => `<div class="chips"><button class="fchip ${cur ? '' : 'on'}" ${attr}="">الكل</button>${D.sections.map(s => `<button class="fchip ${cur === s ? 'on' : ''}" ${attr}="${esc(s)}">${esc(s)}</button>`).join('')}</div>`;

function renderAtt() {
  const el = $('#v-att'); if (!D) { el.innerHTML = emptyState(); return; }
  const verb = { 'غياب': 'غايبين', 'إذن': 'واخدين إذن', 'إجازة': 'في إجازة' }[att.type];
  el.innerHTML = `<div class="card info attendance-head"><h3>تسجيل الحضور اليومي</h3><p>اختار التاريخ ونوع الحالة، وبعدها اضغط على اسم كل عامل لتسجيلها. الضغط مرة ثانية يلغي التسجيل.</p></div>${dsel('att', att.iso)}
    <div class="seg2">${['غياب', 'إذن', 'إجازة'].map(t => `<button data-at="${t}" class="${att.type === t ? 'on' : ''}">${t}</button>`).join('')}</div>
    <div class="hint">دوس على أسماء العمال اللي ${verb} في اليوم ده. دوسة تانية بتشيل التسجيل.</div>
    <div class="stats" id="attSum"></div>
    <label class="search">${I.search}<input id="aq" placeholder="ابحث باسم العامل" value="${esc(att.q)}" autocomplete="off"></label>
    ${secChips('data-asec', att.sec)}<div class="list" id="attRows"></div>
    <button class="btn" data-act="attrep" style="width:100%;margin-top:14px">تقرير الحضور اليومي</button>`;
  fillAtt(); $('#aq').addEventListener('input', e => { att.q = e.target.value; fillAtt(); });
}
function fillAtt() {
  const s = isoToSerial(att.iso), q = att.q.trim(), cnt = { 'غياب': 0, 'إذن': 0, 'إجازة': 0 };
  D.workers.forEach(w => { const t = dayStatus(w, s); if (t) cnt[t]++; });
  $('#attSum').innerHTML = `<span class="tone-ok">حاضر<b>${D.workers.length - cnt['غياب'] - cnt['إذن'] - cnt['إجازة']}</b></span><span class="tone-bad">غياب<b>${cnt['غياب']}</b></span><span class="tone-warn">إذن<b>${cnt['إذن']}</b></span><span class="tone-none">إجازة<b>${cnt['إجازة']}</b></span>`;
  const list = D.workers.filter(w => (!att.sec || w.section === att.sec) && (!q || w.name.includes(q)));
  $('#attRows').innerHTML = list.map(w => { const t = dayStatus(w, s), tone = t === 'غياب' ? 'bad' : t === 'إذن' ? 'warn' : t ? 'none' : 'ok';
    return `<button class="arow tone-${tone} ${t ? 'is' : ''}" data-aw="${w.id}"><div class="chk">${t ? '✓' : ''}</div><div class="wmain"><b>${esc(w.name)}</b><small>${esc(w.section)}</small></div><div class="stp">${t || 'حاضر'}</div></button>`; }).join('') || '<div class="card empty" style="padding:26px"><p style="margin:0">مفيش نتايج</p></div>';
}
function tapAtt(id) {
  const w = RAW.workers[id], s = isoToSerial(att.iso), old = w.abs.find(x => x.s === s);
  w.abs = w.abs.filter(x => x.s !== s); if (!(old && old.t === att.type)) w.abs.push({ s, t: att.type });
  const y = window.scrollY; commit(); window.scrollTo(0, y);
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
    <div class="h2">مخالفة جديدة</div>
    <div class="card info vform"><input id="vt" list="dlT" placeholder="نوع المخالفة" value="${esc(vst.type)}" autocomplete="off"><textarea id="vd" rows="2" placeholder="التفاصيل">${esc(vst.detail)}</textarea><input id="va" list="dlA" placeholder="الإجراء، مثال: إنذار شفهي" value="${esc(vst.action)}" autocomplete="off"></div>${dl('dlT', uniq(v => v.type))}${dl('dlA', uniq(v => v.action))}
    <div class="h2">اختار العمال اللي عملوا المخالفة</div>
    <label class="search">${I.search}<input id="vq" placeholder="ابحث باسم العامل" value="${esc(vst.q)}" autocomplete="off"></label>
    ${secChips('data-vsec', vst.sec)}<div class="list" id="vioRows"></div>
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
    return `<button class="arow tone-bad ${on ? 'is' : ''}" data-vs="${w.id}"><div class="chk">${on ? '✓' : ''}</div><div class="wmain"><b>${esc(w.name)}</b><small>${esc(w.section)}${w.cntVio ? '، مخالفات: ' + w.cntVio : ''}</small></div></button>`; }).join('') || '<div class="card empty" style="padding:26px"><p style="margin:0">مفيش نتايج</p></div>';
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
  const A = by('غياب'), P = by('إذن'), L = by('إجازة'), present = total - A.length - P.length - L.length;
  const block = (title, list, tone) => list.length ? `<div class="sh">${title} (${list.length})</div>${D.sections.filter(sec => list.some(w => w.section === sec)).map(sec => `<div class="grp"><small>${esc(sec)}</small><div class="dchips">${list.filter(w => w.section === sec).map(w => `<span class="dchip tone-${tone}">${esc(w.name)}</span>`).join('')}</div></div>`).join('')}` : '';
  return `<div class="sc tone-${A.length ? 'warn' : 'ok'}">
    <div class="hero"><i class="tape"></i><div class="hrow"><span><img src="logo-emblem.png" alt="">التوحيد إيجيبت</span><span class="mon">${esc(D.month)}</span></div>
      <h2>تقرير الحضور اليومي</h2><div class="tags"><span class="tag">${fmtDate(s)}</span></div>
      <div class="score"><b>${present}</b><span>حاضر من ${total}</span></div><span class="stamp">${A.length ? 'غياب ' + A.length : 'الكل حاضر'}</span></div>
    <div class="sbody">${tiles([['غياب', A.length, A.length ? 'hot' : ''], ['إذن', P.length], ['إجازة', L.length], ['حاضر', present]])}
      ${block('غياب', A, 'bad')}${block('إذن', P, 'warn')}${block('إجازة', L, 'none')}
      ${A.length + P.length + L.length ? '' : '<div class="good" style="margin-top:16px">كل العمال حاضرين</div>'}${foot()}</div></div>`;
}
function vioReportCard(iso) {
  const s = isoToSerial(iso), list = [];
  D.workers.forEach(w => w.vio.forEach(v => { if (v.s === s) list.push({ w, v }); }));
  const people = new Set(list.map(x => x.w.id)).size;
  return `<div class="sc tone-${list.length ? 'bad' : 'ok'}">
    <div class="hero"><i class="tape"></i><div class="hrow"><span><img src="logo-emblem.png" alt="">التوحيد إيجيبت</span><span class="mon">${esc(D.month)}</span></div>
      <h2>تقرير المخالفات اليومي</h2><div class="tags"><span class="tag">${fmtDate(s)}</span></div>
      <div class="score"><b>${list.length}</b><span>مخالفة</span></div><span class="stamp">${list.length ? people + ' عامل' : 'مفيش مخالفات'}</span></div>
    <div class="sbody">${list.length ? list.map(x => `<div class="vio"><div class="v1"><span>${esc(x.w.name)}</span><span>${esc(x.v.action)}</span></div><b>${esc(x.v.type)}</b>${x.v.detail ? `<p>${esc(x.v.detail)}</p>` : ''}<p>${esc(x.w.section)}</p></div>`).join('') : '<div class="good">مفيش مخالفات متسجلة في اليوم ده</div>'}${foot()}</div></div>`;
}

document.addEventListener('click', e => {
  const t = e.target.closest('[data-aw],[data-vs],[data-dd],[data-vd],[data-at],[data-asec],[data-vsec],[data-act],#vioGo');
  if (!t || !D) return;
  const d = t.dataset;
  if (d.aw != null) return tapAtt(+d.aw);
  if (d.vs != null) { const id = +d.vs; vst.sel.has(id) ? vst.sel.delete(id) : vst.sel.add(id); t.classList.toggle('is'); t.querySelector('.chk').textContent = vst.sel.has(id) ? '✓' : ''; return syncVioBar(); }
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
  if (t.dataset.act === 'backup') { const b = new Blob([JSON.stringify(RAW)], { type: 'application/json' }); const l = document.createElement('a'); l.href = URL.createObjectURL(b); l.download = `نسخة ملفات العمال ${todayISO()}.json`; document.body.appendChild(l); l.click(); l.remove(); return toast('اتحفظت النسخة الاحتياطية'); }
  if (t.dataset.act === 'newmonth') { const m = prompt('اسم الشهر الجديد، مثال: ديسمبر 2026'); if (m && m.trim() && confirm('الغياب والمخالفات والتقييمات هتتصفّر لكل العمال. الأفضل تحفظ نسخة احتياطية الأول. نكمل؟')) { RAW.month = m.trim(); RAW.workers.forEach(w => { w.abs = []; w.vio = []; w.scores = Array(8).fill(null); }); commit('بدأ الشهر الجديد'); } return; }
  if (t.dataset.act === 'clear' && confirm('ترجع للبيانات الأصلية المدمجة في التطبيق؟')) { localStorage.removeItem(LS); RAW = null; load(); renderAll(); toast('رجعت للبيانات الأصلية'); }
});
$('#file').addEventListener('change', e => { const f = e.target.files[0]; if (f) importFile(f); e.target.value = ''; });
$('#back').addEventListener('click', () => history.back());
window.addEventListener('popstate', () => { if ($('#editor').classList.contains('show')) closeEditor(); else closePage(); });
$('#fab').addEventListener('click', () => openEditor(-1));
$('#editBtn').addEventListener('click', () => { if (cur && cur.wid != null) openEditor(cur.wid); });
$('#reBtn').addEventListener('click', () => { if (cur && cur.wid != null) { const id = cur.wid; openEditor(id); setTimeout(() => $('#evaluationSection')?.scrollIntoView({behavior:'smooth', block:'start'}), 80); } });
$('#deleteWorkerBtn').addEventListener('click', () => {
  if (!cur || cur.wid == null) return;
  const id=cur.wid, worker=RAW.workers[id];
  if (!worker || !confirm(`هل أنت متأكد من حذف العامل "${worker.name}"؟ سيتم حذف ملفه وسجل حضوره ومخالفاته من هذا الجهاز.`)) return;
  RAW.workers.splice(id,1); cur=null; $('#page').classList.remove('show'); $('#actions').classList.add('hide');
  commit('تم حذف العامل بنجاح');
});
$('#editBtn').innerHTML = I.edit;
$('#bSave').addEventListener('click', doSave); $('#bWa').addEventListener('click', doShare); $('#bCopy').addEventListener('click', doCopy);
$('#back').innerHTML = I.back; $('.gear').innerHTML = I.gear; $('#vioGo').textContent = '';
$('#bSave').insertAdjacentHTML('afterbegin', I.dl); $('#bWa').insertAdjacentHTML('afterbegin', I.wa); $('#bCopy').insertAdjacentHTML('afterbegin', I.copy);
document.querySelectorAll('.nav button').forEach(b => b.insertAdjacentHTML('afterbegin', I[b.dataset.icon]));

const sp = $('#splash');
if (sessionStorage.getItem('twh_in')) sp.classList.add('hide');
$('#go').addEventListener('click', () => { sp.classList.add('out'); sessionStorage.setItem('twh_in', '1'); setTimeout(() => sp.classList.add('hide'), 650); });
load(); renderAll(); setTab('list');
window.__app = { get D() { return D; }, parseWorkbook, enrich };
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
