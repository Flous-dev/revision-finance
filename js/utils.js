// Outils partagés : hasard, formatage FR, calculs financiers, construction des questions.
const T = String.raw;

const rnd = (min, max, step = 1) => min + step * Math.floor(Math.random() * (Math.floor((max - min) / step) + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Formatage français : 1 234,56
const f = (x, d = 2) => (Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : Number(x)).toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
const eur = (x, d = 2) => f(x, d) + ' €';
const keur = (x, d = 0) => f(x, d) + ' k€';
const pct = (x, d = 2) => f(x * 100, d) + ' %';
// Même chose, mais utilisable dans une formule KaTeX
const tx = (s) => s.replace(/,/g, '{,}').replace(/[\u202f\u00a0 ]/g, '\\,').replace(/%/g, '\\%').replace(/€/g, '\\text{€}');
const ft = (x, d = 2) => tx(f(x, d));
const pt = (x, d = 2) => tx(pct(x, d));

// Finance
const npv = (r, cfs) => cfs.reduce((s, c, t) => s + c / Math.pow(1 + r, t), 0);
const irr = (cfs, lo = -0.95, hi = 2) => {
  let flo = npv(lo, cfs);
  for (let k = 0; k < 200; k++) {
    const m = (lo + hi) / 2, fm = npv(m, cfs);
    if (flo * fm <= 0) hi = m; else { lo = m; flo = fm; }
  }
  return (lo + hi) / 2;
};
const annuity = (C, i, n) => C * i / (1 - Math.pow(1 + i, -n));
const pvAnnuity = (a, i, n) => a * (1 - Math.pow(1 + i, -n)) / i;
const bondPrice = (c, vr, r, n) => pvAnnuity(c, r, n) + vr / Math.pow(1 + r, n);

// Tableau d'amortissement : type 'ac' (amortissement constant), 'an' (annuités constantes), 'if' (in fine)
function loanTable(D, i, n, type) {
  const rows = [];
  let crd = D;
  const a = annuity(D, i, n);
  for (let t = 1; t <= n; t++) {
    const int = crd * i;
    let am;
    if (type === 'ac') am = D / n;
    else if (type === 'an') am = a - int;
    else am = t === n ? D : 0;
    rows.push({ t, crd, int, am, ann: int + am });
    crd -= am;
  }
  return rows;
}

// Petit tableau de données pour les énoncés
const dataTable = (pairs, unit = '') => '<div class="scroll"><table class="t">' +
  pairs.map(([k, v]) => `<tr><td>${k}</td><td>${typeof v === 'number' ? f(v, 0) + unit : v}</td></tr>`).join('') +
  '</table></div>';

const htmlTable = (head, rows, strongLast = false) => '<div class="scroll"><table class="t"><thead><tr>' +
  head.map(h => `<th>${h}</th>`).join('') + '</tr></thead><tbody>' +
  rows.map((r, idx) => `<tr${strongLast && idx === rows.length - 1 ? ' class="strong"' : ''}>` + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('') +
  '</tbody></table></div>';

/*
 * Question numérique à choix multiple.
 * ok : bonne valeur ; ko : valeurs des erreurs classiques ; fmt : formatage.
 * Complète avec des valeurs proches si les distracteurs se confondent.
 */
function num({ q, ok, ko = [], fmt = (x) => f(x), expl }) {
  const seen = new Set();
  const opts = [];
  const add = (v, correct) => {
    if (!isFinite(v)) return;
    const s = fmt(v);
    if (seen.has(s)) return;
    seen.add(s); opts.push({ s, correct });
  };
  add(ok, true);
  ko.forEach(v => opts.length < 4 && add(v, false));
  // Écart de référence : la bonne valeur, ou à défaut l'ordre de grandeur des distracteurs (cas d'une VAN ≈ 0)
  const base = Math.max(Math.abs(ok), ...ko.filter(isFinite).map(Math.abs), 1);
  const spread = [0.08, -0.06, 0.15, -0.12, 0.22, -0.18, 0.3];
  for (const mult of [1, 10, 100]) {
    for (let k = 0; opts.length < 4 && k < spread.length; k++) add(ok + base * mult * spread[k], false);
  }
  const sh = shuffle(opts);
  return { q, options: sh.map(o => o.s), answer: sh.findIndex(o => o.correct), expl };
}

// Question de cours : { q, ok, ko: [...], expl }
function concept(c) {
  const opts = shuffle([{ s: c.ok, correct: true }, ...c.ko.map(s => ({ s, correct: false }))]);
  return { q: c.q, options: opts.map(o => o.s), answer: opts.findIndex(o => o.correct), expl: c.expl };
}

const store = {
  key: 'revision-finance-v1',
  load() { try { return JSON.parse(localStorage.getItem(this.key)) || {}; } catch (e) { return {}; } },
  save(d) { try { localStorage.setItem(this.key, JSON.stringify(d)); } catch (e) { /* stockage indisponible */ } },
};
