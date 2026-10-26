// Contenu pédagogique : un objet par niveau (cours, TD corrigé, générateurs de questions).
const LEVELS = [];

/* =====================================================================
 * NIVEAU 1 — FLUX DE TRÉSORERIE
 * ===================================================================== */
LEVELS.push({
  id: 1,
  title: 'Flux de trésorerie',
  short: 'CAF, BFR, FTE, FTI, FTD, FTF, dette nette',
  cours: T`
<p>Les flux de trésorerie, c'est tout ce qui revient aux apporteurs de capitaux (actionnaires, créanciers, entreprise) sur une période. Ce n'est pas le résultat net : il faut aussi tenir compte de l'exploitation <em>et</em> de l'investissement. C'est la métrique fondamentale en finance.</p>

<h2>1. La CAF (capacité d'autofinancement)</h2>
<p>Ce sont les ressources dégagées par l'activité (pour épargner, rembourser, verser des dividendes, investir). On part du résultat net, on <strong>ajoute les charges non décaissables</strong> et on <strong>retire les produits non encaissables</strong>.</p>
<div class="formula"><div class="label">Méthode additive (depuis le résultat net)</div>
\[ CAF = RN + DAP - \text{Reprises} - PCEA + VCEAC - QPSI \]</div>
<p>DAP = dotations aux amortissements · PCEA = produits de cession d'éléments d'actif · VCEAC = valeur comptable des éléments d'actif cédés · QPSI = quote-part des subventions d'investissement virée au résultat (compte 747).</p>
<div class="formula"><div class="label">Méthode soustractive (depuis l'EBE)</div>
\[ CAF = EBE - \text{charges financières} - \text{IS} \]</div>
<div class="box tip"><strong>Réforme du PCG 2025</strong>Les PCEA et VCEAC sont maintenant dans le résultat d'exploitation (plus en exceptionnel). La QPSI se place aussi avant le résultat d'exploitation. Avec la méthode soustractive, il n'y a pas de QPSI à retirer.</div>

<h2>2. Le BFR et sa variation</h2>
<p>La CAF ignore les délais d'encaissement et de décaissement. Le BFR, c'est l'argent immobilisé par le cycle d'exploitation (en attendant que les clients paient, etc.).</p>
<div class="formula"><div class="label">BFR</div>
\[ BFR = \underbrace{\text{Stocks} + \text{Créances clients}}_{\text{emplois circulants}} - \underbrace{\text{Dettes d'exploitation}}_{\text{fournisseurs…}} \]
\[ \Delta BFR = BFR_N - BFR_{N-1} \]</div>
<div class="formula"><div class="label">Flux de trésorerie d'exploitation</div>
\[ FTE = CAF - \Delta BFR \]</div>
<div class="box trap"><strong>Piège</strong>Une <em>hausse</em> du BFR (ΔBFR &gt; 0) <em>diminue</em> le FTE : c'est du cash bloqué. Une baisse du BFR libère du cash.</div>

<h2>3. Les flux d'investissement</h2>
<div class="formula"><div class="label">FTI</div>
\[ FTI = PCEA - CAPEX \qquad (\text{en général négatif}) \]</div>
<p>Si les acquisitions (CAPEX) ne sont pas données, on les retrouve avec les immobilisations <strong>nettes</strong> du bilan :</p>
<div class="formula"><div class="label">Retrouver les CAPEX</div>
\[ Immo_N = Immo_{N-1} + CAPEX - VNC_{\text{cédées}} - DAP_N + \text{Reprises}_N \]
\[ \Rightarrow CAPEX = (Immo_N - Immo_{N-1}) + DAP_N + VNC_{\text{cédées}} - \text{Reprises}_N \]</div>

<h2>4. Flux disponible et financement</h2>
<div class="formula"><div class="label">Flux de trésorerie disponible</div>
\[ FTD = FTE + FTI \]</div>
<p>FTD &gt; 0 : excès de financement (ce qu'il reste après exploitation et investissement).</p>
<div class="formula"><div class="label">Flux de trésorerie de financement</div>
\[ FTF = \Delta \text{Capital social} + \Delta \text{Subventions (131)} - \text{Dividendes} + \Delta \text{Dettes financières} \]
\[ \text{Dividendes}_N = \text{Résultat}_{N-1} + \text{Réserves}_{N-1} - \text{Réserves}_N \]</div>
<p>Pour la variation des capitaux propres, on ne prend que le capital social (ni réserves, ni report à nouveau). Les subventions qui comptent sont celles du compte 131, pas les reprises du 139. Une nouvelle subvention est en général nulle, sauf si l'énoncé la donne.</p>
<div class="box trap"><strong>Piège</strong>Le FTF n'est <em>pas</em> l'inverse du FTD : c'est un flux à part entière.</div>

<h2>5. Bouclage : trésorerie et dette nette</h2>
<div class="formula"><div class="label">Variation de trésorerie (2 méthodes)</div>
\[ \Delta \text{Trésorerie} = FTE + FTI + FTF = \text{Tréso active}_N - \text{Tréso active}_{N-1} \]</div>
<div class="formula"><div class="label">Dette nette</div>
\[ \text{Dette nette} = \text{Dettes financières} - \text{Trésorerie active} \]
\[ \text{Désendettement net} = FTD + \Delta \text{Capitaux propres} + \Delta \text{Subventions} - \text{Dividendes} = -\Delta \text{Dette nette} \]</div>
<p>La dette nette est la <strong>variable d'ajustement</strong> : une fois le FTD connu, l'entreprise choisit de verser ou non des dividendes, de lever du capital, de rembourser ou d'emprunter. Si le désendettement est positif, la dette nette diminue.</p>

<div class="box tip"><strong>Méthode type examen</strong><ul>
<li>CAF → BFR N et N-1 → ΔBFR → FTE</li>
<li>CAPEX (donné ou via immo nettes) → FTI = PCEA − CAPEX</li>
<li>FTD = FTE + FTI</li>
<li>Dividendes via les réserves → FTF</li>
<li>Vérifier : FTE + FTI + FTF = Δ trésorerie au bilan</li></ul></div>
`,
  exemple: () => T`
<h2>TD 1 · Cas Rhône-Équipements (en k€)</h2>
<p>Données : RN 290, DAP 150, reprises 50, PCEA 30, VCEAC 10, EBE 500, intérêts 40, IS 90. Bilan : stocks 150/120, clients 200/180, fournisseurs 160/150, trésorerie 240/50, dettes financières 300/250 (N / N-1). Machines achetées : 150. Emprunt : +100, remboursement : −50. Dividendes : 70.</p>
<div class="step"><div class="n">1</div><div><strong>CAF</strong> \( = 290 + 150 - 50 - 30 + 10 = \) <span class="ans">370 k€</span><br>Vérification soustractive : \(500 - 40 - 90 = 370\) ✔</div></div>
<div class="step"><div class="n">2</div><div><strong>BFR</strong> : \(BFR_N = 150 + 200 - 160 = 190\) ; \(BFR_{N-1} = 120 + 180 - 150 = 150\) ; \(\Delta BFR = 40\).<br><strong>FTE</strong> \( = 370 - 40 = \) <span class="ans">330 k€</span> (la hausse du BFR a absorbé 40 k€ de cash).</div></div>
<div class="step"><div class="n">3</div><div><strong>FTI</strong> \( = 30 - 150 = \) <span class="ans">−120 k€</span> ; <strong>FTD</strong> \( = 330 - 120 = \) <span class="ans">210 k€</span></div></div>
<div class="step"><div class="n">4</div><div><strong>FTF</strong> \( = 0 + 100 - 50 - 70 = \) <span class="ans">−20 k€</span><br>Δ tréso par les flux : \(330 - 120 - 20 = 190\) ; par le bilan : \(240 - 50 = 190\) ✔</div></div>
<div class="step"><div class="n">5</div><div><strong>Dette nette</strong> : \(N-1 = 250 - 50 = 200\) ; \(N = 300 - 240 = 60\) → baisse de 140.<br>Par les flux : \(FTD + \Delta CP - Div = 210 + 0 - 70 = \) <span class="ans">140 k€ de désendettement</span> ✔</div></div>

<details class="sol"><summary>Prévision N+1 (exercice 5)</summary>
<p>EBE +2 % = 510 ; DAP 150 → RE = 360 ; intérêts 40 ; IS 25 % × 320 = 80 → RN = 240 ; CAF = 240 + 150 = 390.<br>BFR +3 % = 195,7 → ΔBFR = 5,7 → FTE = 384,3. FTI = −500 (machine). FTD = −115,7.<br>FTF = −50 (remboursement) → Δ tréso = −165,7 → nouvelle trésorerie ≈ 74,3 k€. Dette = 250 → dette nette ≈ 175,7 k€.<br>La trésorerie reste positive : pas besoin d'émettre de dette, mais elle devient faible. Un moratoire d'un an sur le capital (garder 50 k€) donne de la marge.</p></details>

<h2>TD 1 · Cas Garonne-Industrie (en k€)</h2>
<div class="step"><div class="n">1</div><div>CAF \(= 320 + 200 - 50 - 30 + 20 = 460\) ; BFR : \(390 - 320 = +70\) → <strong>FTE</strong> = <span class="ans">390</span></div></div>
<div class="step"><div class="n">2</div><div>CAPEX \(= (780 - 700) + 200 + 20 - 50 = 250\) → <strong>FTI</strong> \(= 30 - 250 =\) <span class="ans">−220</span> ; <strong>FTD</strong> = <span class="ans">170</span></div></div>
<div class="step"><div class="n">3</div><div>Dividendes \(= 180 + 140 - 240 = 80\) ; Δ capital = +100 ; Δ dettes fi = 260 − 400 = −140<br><strong>FTF</strong> \(= 100 - 80 - 140 =\) <span class="ans">−120</span></div></div>
<div class="step"><div class="n">4</div><div>Δ tréso \(= 390 - 220 - 120 = 50 = 150 - 100\) ✔</div></div>
<div class="step"><div class="n">5</div><div>Dette nette : \(400 - 100 = 300 \to 260 - 150 = 110\), soit −190. Par les flux : \(170 + 100 - 80 = 190\) ✔</div></div>
`,
  gen: [
    () => {
      const RN = rnd(150, 600, 10), DAP = rnd(80, 300, 10), REP = rnd(10, 60, 5), PCEA = rnd(20, 80, 5), VC = rnd(5, 40, 5), Q = pick([0, 0, rnd(5, 30, 5)]);
      const caf = RN + DAP - REP - PCEA + VC - Q;
      const rows = [['Résultat net', RN], ['Dotations aux amortissements', DAP], ['Reprises sur amortissements', REP], ['Produits de cession (PCEA)', PCEA], ['VCEAC', VC]];
      if (Q) rows.push(['Quote-part subv. d\'investissement (QPSI)', Q]);
      return num({
        q: 'Calcule la CAF (méthode additive), en k€.' + dataTable(rows),
        ok: caf, ko: [RN + DAP + REP - PCEA + VC - Q, RN + DAP - REP + PCEA - VC - Q, RN + DAP - Q, RN + DAP - REP - PCEA + VC + Q], fmt: keur,
        expl: T`\(CAF = RN + DAP - Rep - PCEA + VCEAC - QPSI = ${RN} + ${DAP} - ${REP} - ${PCEA} + ${VC}${Q ? ' - ' + Q : ''} = ${caf}\) k€`,
      });
    },
    () => {
      const EBE = rnd(300, 900, 10), DAP = rnd(80, 250, 10), INT = rnd(10, 60, 5), IS = rnd(40, 150, 5);
      const caf = EBE - INT - IS;
      return num({
        q: 'Avec la méthode soustractive, quelle est la CAF ? (k€)' + dataTable([['EBE', EBE], ['Dotations aux amortissements', DAP], ['Charges financières', INT], ['Impôt sur les sociétés', IS]]),
        ok: caf, ko: [EBE - DAP - INT - IS, EBE - IS, EBE - INT, EBE + DAP - INT - IS], fmt: keur,
        expl: T`\(CAF = EBE - \text{charges fi} - IS = ${EBE} - ${INT} - ${IS} = ${caf}\). Les DAP ne sont pas déduites : elles ne sortent pas de la trésorerie (elles ne sont pas encore dans l'EBE).`,
      });
    },
    () => {
      const s1 = rnd(80, 300, 10), c1 = rnd(100, 400, 10), d1 = rnd(80, 300, 10);
      const s0 = s1 - rnd(-30, 60, 10), c0 = c1 - rnd(-30, 60, 10), d0 = d1 - rnd(-20, 40, 10);
      const b1 = s1 + c1 - d1, b0 = s0 + c0 - d0, db = b1 - b0;
      return num({
        q: 'Quelle est la variation du BFR entre N-1 et N ? (k€)' + htmlTable(['', 'N', 'N-1'], [['Stocks', s1, s0], ['Créances clients', c1, c0], ['Dettes fournisseurs', d1, d0]]),
        ok: db, ko: [-db, (s1 + c1 + d1) - (s0 + c0 + d0), b1, (s1 - s0) + (c1 - c0)], fmt: keur,
        expl: T`\(BFR_N = ${s1} + ${c1} - ${d1} = ${b1}\) ; \(BFR_{N-1} = ${s0} + ${c0} - ${d0} = ${b0}\) ; \(\Delta BFR = ${b1} - ${b0} = ${db}\) k€`,
      });
    },
    () => {
      const caf = rnd(200, 700, 10), b0 = rnd(100, 400, 10), b1 = b0 + rnd(-50, 120, 10);
      const db = b1 - b0, fte = caf - db;
      return num({
        q: `La CAF est de ${keur(caf)}. Le BFR passe de ${keur(b0)} (N-1) à ${keur(b1)} (N). Quel est le flux de trésorerie d'exploitation (FTE) ?`,
        ok: fte, ko: [caf + db, caf, caf - b1], fmt: keur,
        expl: T`\(\Delta BFR = ${b1} - ${b0} = ${db}\) ; \(FTE = CAF - \Delta BFR = ${caf} - (${db}) = ${fte}\) k€. ${db > 0 ? 'Le BFR augmente : il consomme du cash.' : 'Le BFR baisse : il libère du cash.'}`,
      });
    },
    () => {
      const capex = rnd(100, 500, 10), i0 = rnd(500, 1500, 10), dap = rnd(80, 250, 10), vnc = rnd(5, 40, 5), rep = rnd(0, 50, 10);
      const i1 = i0 + capex - vnc - dap + rep;
      return num({
        q: 'Retrouve les CAPEX (acquisitions) de l\'année N, en k€.' + dataTable([['Immobilisations nettes N-1', i0], ['Immobilisations nettes N', i1], ['Dotations aux amortissements N', dap], ['VNC des immobilisations cédées', vnc], ['Reprises sur amortissements N', rep]]),
        ok: capex, ko: [i1 - i0, i1 - i0 + dap, i1 - i0 + dap + vnc + rep, i1 - i0 + dap - vnc - rep], fmt: keur,
        expl: T`\(CAPEX = \Delta Immo + DAP + VNC - Rep = (${i1} - ${i0}) + ${dap} + ${vnc} - ${rep} = ${capex}\) k€`,
      });
    },
    () => {
      const pcea = rnd(10, 80, 5), vc = rnd(5, 40, 5), capex = rnd(100, 500, 10);
      const fti = pcea - capex;
      return num({
        q: `L'entreprise a acheté des machines pour ${keur(capex)} et cédé un actif pour un prix de ${keur(pcea)} (VCEAC : ${keur(vc)}). Quel est le FTI ?`,
        ok: fti, ko: [-(pcea + capex), capex - pcea, vc - capex, pcea - vc - capex], fmt: keur,
        expl: T`\(FTI = PCEA - CAPEX = ${pcea} - ${capex} = ${fti}\) k€. Le prix de cession (PCEA) est ce qui rentre en trésorerie ; la VCEAC est une valeur comptable, pas un flux.`,
      });
    },
    () => {
      const r1 = rnd(100, 400, 10), res1 = rnd(50, 300, 10), dv = rnd(20, Math.min(r1, 200), 10), res = res1 + r1 - dv;
      return num({
        q: 'Quels dividendes ont été versés en N ? (k€)' + dataTable([['Résultat N-1', r1], ['Réserves N-1', res1], ['Réserves N', res]]),
        ok: dv, ko: [res - res1, r1, r1 + res - res1, r1 - res1], fmt: keur,
        expl: T`\(Div = Résultat_{N-1} + Réserves_{N-1} - Réserves_N = ${r1} + ${res1} - ${res} = ${dv}\) k€. Le résultat N-1 est soit mis en réserve, soit distribué.`,
      });
    },
    () => {
      const dcap = pick([0, rnd(50, 150, 10)]), dv = rnd(20, 120, 10), em = rnd(0, 200, 20), rb = rnd(20, 150, 10);
      const ftf = dcap - dv + em - rb;
      return num({
        q: `En N : augmentation de capital de ${keur(dcap)}, dividendes versés ${keur(dv)}, nouvel emprunt ${keur(em)}, remboursement d'emprunt ${keur(rb)}. Quel est le FTF ?`,
        ok: ftf, ko: [dcap + dv + em - rb, dcap - dv - em + rb, -dv + em - rb, dcap - dv + em + rb], fmt: keur,
        expl: T`\(FTF = \Delta Capital - Div + \Delta Dettes = ${dcap} - ${dv} + (${em} - ${rb}) = ${ftf}\) k€`,
      });
    },
    () => {
      const fte = rnd(200, 600, 10), fti = -rnd(80, 400, 10), ftf = rnd(-200, 100, 10);
      const dt = fte + fti + ftf;
      return num({
        q: `FTE = ${keur(fte)}, FTI = ${keur(fti)}, FTF = ${keur(ftf)}. De combien varie la trésorerie active ?`,
        ok: dt, ko: [fte + fti, fte - fti + ftf, fte + fti - ftf], fmt: keur,
        expl: T`\(\Delta Tréso = FTE + FTI + FTF = ${fte} ${fti} ${ftf >= 0 ? '+' : ''}${ftf} = ${dt}\) k€`,
      });
    },
    () => {
      const d0 = rnd(200, 600, 10), d1 = d0 + rnd(-150, 100, 10), t0 = rnd(20, 200, 10), t1 = rnd(20, 300, 10);
      const dn = (d1 - t1) - (d0 - t0);
      return num({
        q: 'De combien varie la dette nette entre N-1 et N ? (k€)' + htmlTable(['', 'N', 'N-1'], [['Dettes financières', d1, d0], ['Trésorerie active', t1, t0]]),
        ok: dn, ko: [d1 - d0, (d1 + t1) - (d0 + t0), -dn], fmt: keur,
        expl: T`Dette nette = dettes fi − tréso active. \(N-1 : ${d0} - ${t0} = ${d0 - t0}\) ; \(N : ${d1} - ${t1} = ${d1 - t1}\) ; \(\Delta = ${dn}\) k€ ${dn < 0 ? '(désendettement)' : '(endettement)'}`,
      });
    },
    () => {
      const ftd = rnd(50, 400, 10), dcp = pick([0, rnd(20, 150, 10)]), dv = rnd(20, 150, 10);
      const des = ftd + dcp - dv;
      return num({
        q: `FTD = ${keur(ftd)}, augmentation de capital = ${keur(dcp)}, dividendes = ${keur(dv)}, pas de nouvelle subvention. Quel est le désendettement net ?`,
        ok: des, ko: [ftd - dcp - dv, ftd + dcp + dv, ftd], fmt: keur,
        expl: T`\(Désendettement = FTD + \Delta CP - Div = ${ftd} + ${dcp} - ${dv} = ${des}\) k€ : la dette nette ${des >= 0 ? 'baisse' : 'augmente'} de ${Math.abs(des)} k€.`,
      });
    },
  ],
  concepts: [
    { q: 'Une hausse du BFR entre N-1 et N…', ok: 'diminue le flux de trésorerie d\'exploitation', ko: ['augmente le flux de trésorerie d\'exploitation', 'n\'a aucun effet sur la trésorerie', 'augmente la CAF'], expl: 'FTE = CAF − ΔBFR : une hausse du BFR (ΔBFR > 0) bloque du cash, donc elle réduit le FTE.' },
    { q: 'Dans la CAF (méthode additive), les reprises sur amortissements sont…', ok: 'soustraites', ko: ['ajoutées', 'ignorées', 'ajoutées seulement si elles dépassent les dotations'], expl: 'Ce sont des produits non encaissables : on les retire du résultat net.' },
    { q: 'Quelle est la bonne formule de la CAF ?', ok: T`\(RN + DAP - Rep - PCEA + VCEAC - QPSI\)`, ko: [T`\(RN - DAP + Rep + PCEA - VCEAC - QPSI\)`, T`\(RN + DAP - Rep + PCEA - VCEAC + QPSI\)`, T`\(EBE - DAP - IS\)`], expl: 'On ajoute les charges non décaissables (DAP, VCEAC), on retire les produits non encaissables (reprises, PCEA, QPSI).' },
    { q: 'Le flux de trésorerie disponible (FTD) est égal à…', ok: 'FTE + FTI', ko: ['FTE + FTI + FTF', 'CAF − FTI', '− FTF'], expl: 'FTD = FTE + FTI. Le FTF n\'en est pas l\'inverse, c\'est un flux à part.' },
    { q: 'La dette nette se calcule comme…', ok: 'dettes financières − trésorerie active', ko: ['dettes financières + trésorerie active', 'total du passif − capitaux propres', 'dettes financières − dettes d\'exploitation'], expl: 'Dette nette = dettes financières − trésorerie active (cash).' },
    { q: 'Dans le FTF, la variation des capitaux propres retenue correspond à…', ok: 'la variation du capital social uniquement', ko: ['la variation de tous les capitaux propres, réserves comprises', 'la variation des réserves', 'le résultat de l\'exercice'], expl: 'On ne prend que le capital social, sans les réserves ni le report à nouveau (le résultat passe déjà par la CAF et les dividendes).' },
    { q: 'Pourquoi la CAF ne suffit-elle pas à mesurer le cash généré par l\'exploitation ?', ok: 'Elle ignore les délais d\'encaissement et de décaissement (le BFR)', ko: ['Elle inclut les investissements', 'Elle inclut les dividendes', 'Elle ne tient pas compte des impôts'], expl: 'La CAF est construite depuis le compte de résultat : elle ignore les délais de paiement, d\'où la correction par la ΔBFR.' },
    { q: 'Le FTI est en général…', ok: 'négatif', ko: ['positif', 'nul', 'égal à la CAF'], expl: 'FTI = PCEA − CAPEX : les acquisitions dépassent en général les cessions.' },
    { q: 'Comment vérifie-t-on un tableau des flux ?', ok: 'FTE + FTI + FTF = trésorerie N − trésorerie N-1', ko: ['FTD = FTF', 'CAF = FTE', 'FTE + FTI = 0'], expl: 'Le total des flux doit être égal à la variation de la trésorerie active au bilan.' },
    { q: 'Le désendettement net est positif. Cela signifie que…', ok: 'la dette nette diminue', ko: ['la dette nette augmente', 'la trésorerie diminue forcément', 'les dividendes sont nuls'], expl: 'Désendettement net = FTD + ΔCP − dividendes = −Δ dette nette.' },
  ],
});

/* =====================================================================
 * NIVEAU 2 — BUSINESS PLAN & FREE CASH FLOWS
 * ===================================================================== */
LEVELS.push({
  id: 2,
  title: 'Business plan et FCF',
  short: 'NOPAT, OCF, ΔBFR en % du CA, Free Cash Flows',
  cours: T`
<p>Les flux prévisionnels servent à <strong>valoriser</strong> un projet ou une entreprise. On raisonne avant financement : on <strong>ne déduit pas les charges d'intérêts</strong>, car elles dépendent du mode de financement (alors que les FTD du niveau 1 les déduisent).</p>

<h2>1. Du chiffre d'affaires au NOPAT</h2>
<div class="formula"><div class="label">Résultat d'exploitation</div>
\[ RE = EBE - DAP \qquad (EBE = \text{marge d'EBE} \times CA) \]</div>
<div class="formula"><div class="label">NOPAT (Net Operating Profit After Tax)</div>
\[ NOPAT = RE \times (1 - t_{IS}) = RE - RE \times t_{IS} \]</div>
<p>L'impôt est calculé directement sur le résultat d'exploitation (\(IS = RE \times t\)). Les dotations peuvent être données ou à calculer : en linéaire, \(DAP = \dfrac{\text{Investissement}}{\text{durée}}\).</p>

<h2>2. Le BFR prévisionnel</h2>
<p>On l'exprime souvent en % du CA de l'année : \(BFR_t = x\% \times CA_t\). La proportion reste la même mais le montant varie avec le CA. On calcule le BFR, <em>puis</em> sa variation.</p>
<div class="formula"><div class="label">BFR</div>
\[ \Delta BFR_t = BFR_t - BFR_{t-1} \qquad BFR \text{ en jours de CA} = x\% \times 360 \]</div>
<p>Exemple : un BFR de 5 % du CA ≈ 18 jours de CA (0,05 × 360).</p>
<ul>
<li>Si le BFR est nul, sa variation l'est aussi : aucun impact sur l'OCF.</li>
<li>En <strong>fin de projet</strong>, le BFR est récupéré : on l'<strong>ajoute</strong> au dernier flux.</li>
<li>Au lancement d'un projet, le BFR de l'année 1 est constitué en entier : \(\Delta BFR_1 = BFR_1\).</li>
</ul>

<h2>3. OCF et Free Cash Flow</h2>
<div class="formula"><div class="label">Cash flow opérationnel</div>
\[ OCF = NOPAT + DAP - \Delta BFR \]</div>
<p>Les dotations réduisent le résultat mais ne sortent pas de la trésorerie : on les <strong>réintègre</strong>.</p>
<div class="formula"><div class="label">Free Cash Flow</div>
\[ FCF = OCF - CAPEX \]</div>
<div class="box trap"><strong>Pièges classiques</strong><ul>
<li>Oublier de rajouter les DAP au NOPAT.</li>
<li>Calculer l'IS sur l'EBE au lieu du RE.</li>
<li>Prendre le BFR au lieu de sa <em>variation</em>.</li>
<li>Déduire les intérêts (pas en logique de valorisation).</li>
<li>Oublier la récupération du BFR la dernière année.</li></ul></div>
`,
  exemple: () => {
    const CA = [4000, 5000, 6000, 7000, 8000], m = [.2, .25, .3, .3, .3], DA = [400, 500, 600, 600, 600], CX = [1200, 800, 600, 600, 600], b = [.1, .15, .15, .1, .1];
    const EBE = CA.map((c, i) => c * m[i]), RE = EBE.map((e, i) => e - DA[i]), NOP = RE.map(r => r * .75);
    const BFR = CA.map((c, i) => c * b[i]), dB = BFR.map((x, i) => x - (i ? BFR[i - 1] : 300));
    const OCF = NOP.map((x, i) => x + DA[i] - dB[i]), FCF = OCF.map((x, i) => x - CX[i]);
    const r = (lab, arr, d = 0) => [lab, ...arr.map(x => f(x, d))];
    return T`
<h2>TD 2 · Business plan EcoData (k€)</h2>
<p>CA N = 3 000, +1 000 par an. Marge d'EBE 20 %, 25 %, puis 30 %. IS 25 % sur le RE. BFR N = 300, puis 10 %, 15 %, 15 %, 10 %, 10 % du CA.</p>
${htmlTable(['', 'N+1', 'N+2', 'N+3', 'N+4', 'N+5'], [
      r('CA', CA), r('EBE', EBE), r('− DAP', DA), r('= RE', RE), r('NOPAT = RE × 75 %', NOP, 1),
      r('BFR', BFR), r('ΔBFR', dB), r('OCF = NOPAT + DAP − ΔBFR', OCF, 1), r('− CAPEX', CX), r('FCF', FCF, 1)], true)}
<p>Lecture : les FCF sont négatifs au début (gros investissement serveur, BFR qui gonfle), puis très positifs. En N+4, le BFR redescend à 10 % : sa variation est <strong>négative</strong> (−200), ce qui augmente l'OCF.</p>
<div class="box tip"><strong>Détail N+2</strong>RE = 1 250 − 500 = 750 → NOPAT = 562,5. BFR = 15 % × 5 000 = 750, ΔBFR = 750 − 400 = 350. OCF = 562,5 + 500 − 350 = 712,5. FCF = 712,5 − 800 = −87,5.</div>
<h3>Partie 2 : les investisseurs prudents</h3>
<p>CA +10 %/an, marge 20 % puis 22 %, BFR à 15 % du CA : l'EBE et donc le NOPAT sont bien plus faibles, et le BFR plus lourd pèse sur l'OCF. Les FCF baissent fortement, donc la valeur d'entreprise et le prix proposé aux fondateurs aussi : les investisseurs négocieront le prix à la baisse.</p>`;
  },
  gen: [
    () => {
      const ebe = rnd(400, 2000, 50), da = rnd(100, 500, 50), t = pick([.25, .25, .3]);
      const re = ebe - da, nop = re * (1 - t);
      return num({
        q: `EBE = ${keur(ebe)}, dotations = ${keur(da)}, taux d'IS = ${pct(t, 0)}. Quel est le NOPAT ?`,
        ok: nop, ko: [ebe * (1 - t), re, re * t, ebe * (1 - t) - da], fmt: (x) => keur(x, 1),
        expl: T`\(RE = ${ebe} - ${da} = ${re}\) ; \(NOPAT = RE \times (1-t) = ${re} \times ${ft(1 - t)} = ${ft(nop, 1)}\) k€`,
      });
    },
    () => {
      const ca0 = rnd(2000, 6000, 500), g = rnd(500, 1500, 250), p = pick([.05, .1, .15, .2]);
      const d = p * g;
      return num({
        q: `Le BFR représente toujours ${pct(p, 0)} du CA. Le CA passe de ${keur(ca0)} à ${keur(ca0 + g)}. Quelle est la variation du BFR ?`,
        ok: d, ko: [p * (ca0 + g), -d, p * ca0], fmt: keur,
        expl: T`\(\Delta BFR = ${pt(p, 0)} \times ${ca0 + g} - ${pt(p, 0)} \times ${ca0} = ${ft(p * (ca0 + g), 0)} - ${ft(p * ca0, 0)} = ${ft(d, 0)}\) k€`,
      });
    },
    () => {
      const b0 = rnd(200, 500, 50), ca = rnd(3000, 8000, 500), p = pick([.1, .15]);
      const d = p * ca - b0;
      return num({
        q: `BFR fin N = ${keur(b0)}. En N+1, le CA prévu est de ${keur(ca)} et le BFR normatif est de ${pct(p, 0)} du CA. Quelle est la ΔBFR de N+1 ?`,
        ok: d, ko: [p * ca, b0 - p * ca, p * ca + b0], fmt: keur,
        expl: T`\(BFR_{N+1} = ${pt(p, 0)} \times ${ca} = ${ft(p * ca, 0)}\) ; \(\Delta BFR = ${ft(p * ca, 0)} - ${b0} = ${ft(d, 0)}\) k€`,
      });
    },
    () => {
      const nop = rnd(200, 1500, 25), da = rnd(100, 600, 50), db = rnd(-150, 300, 50);
      const ocf = nop + da - db;
      return num({
        q: `NOPAT = ${keur(nop)}, DAP = ${keur(da)}, ΔBFR = ${keur(db)}. Quel est l'OCF (cash flow opérationnel) ?`,
        ok: ocf, ko: [nop - da - db, nop + da + db, nop - db], fmt: keur,
        expl: T`\(OCF = NOPAT + DAP - \Delta BFR = ${nop} + ${da} - (${db}) = ${ocf}\) k€`,
      });
    },
    () => {
      const ca = rnd(800, 3000, 100), m = pick([.2, .25, .3, .35]), da = rnd(100, 300, 50), t = .25, db = rnd(0, 120, 10), cx = rnd(100, 600, 50), it = rnd(20, 60, 10);
      const ebe = ca * m, re = ebe - da, nop = re * (1 - t), fcf = nop + da - db - cx;
      return num({
        q: 'Calcule le Free Cash Flow de l\'année (k€).' + dataTable([['Chiffre d\'affaires', ca], ['Marge d\'EBE', pct(m, 0)], ['Dotations aux amortissements', da], ['Taux d\'IS', '25 %'], ['ΔBFR', db], ['CAPEX', cx], ['Charges d\'intérêts', it]]),
        ok: fcf, ko: [nop - db - cx, fcf - it * (1 - t), nop + da + db - cx, ebe * (1 - t) - db - cx], fmt: (x) => keur(x, 1),
        expl: T`\(EBE = ${ft(ebe, 0)}\) ; \(RE = ${ft(ebe, 0)} - ${da} = ${ft(re, 0)}\) ; \(NOPAT = ${ft(re, 0)} \times 0{,}75 = ${ft(nop, 1)}\)<br>\(FCF = NOPAT + DAP - \Delta BFR - CAPEX = ${ft(nop, 1)} + ${da} - ${db} - ${cx} = ${ft(fcf, 1)}\) k€. Les intérêts sont ignorés (logique de valorisation).`,
      });
    },
    () => {
      const nop = rnd(100, 300, 10), da = rnd(100, 250, 50), bfr = rnd(80, 200, 10);
      const fcf = nop + da + bfr;
      return num({
        q: `Dernière année d'un projet : NOPAT = ${keur(nop)}, DAP = ${keur(da)}, aucun CAPEX. Le BFR (stable à ${keur(bfr)}) est entièrement récupéré en fin de projet. Quel est le FCF de cette dernière année ?`,
        ok: fcf, ko: [nop + da, nop + da - bfr, nop + bfr], fmt: keur,
        expl: T`ΔBFR = 0 (BFR stable), mais on récupère le BFR : \(FCF = ${nop} + ${da} + ${bfr} = ${fcf}\) k€`,
      });
    },
    () => {
      const p = pick([.05, .1, .15, .2, .025]);
      return num({
        q: `Un BFR égal à ${pct(p, 1)} du CA correspond à combien de jours de CA (année commerciale de 360 jours) ?`,
        ok: p * 360, ko: [p * 365, p * 100, 360 / (p * 100)], fmt: (x) => f(x, 1) + ' jours',
        expl: T`\(${pt(p, 1)} \times 360 = ${ft(p * 360, 1)}\) jours de CA (le cours : 5 % ≈ 18 jours).`,
      });
    },
    () => {
      const I = rnd(5, 20, 1) * 100, n = pick([4, 5, 8, 10]), ebe = rnd(3, 8, 1) * 100;
      const da = I / n, re = ebe - da;
      return num({
        q: `Une machine de ${keur(I)} est amortie linéairement sur ${n} ans. L'EBE annuel est de ${keur(ebe)}. Quel est le résultat d'exploitation annuel ?`,
        ok: re, ko: [ebe - I, ebe, ebe + da], fmt: (x) => keur(x, 1),
        expl: T`\(DAP = ${I} / ${n} = ${ft(da, 1)}\) ; \(RE = ${ebe} - ${ft(da, 1)} = ${ft(re, 1)}\) k€`,
      });
    },
  ],
  concepts: [
    { q: 'Pourquoi ne déduit-on pas les charges d\'intérêts dans les FCF de valorisation ?', ok: 'Elles dépendent du mode de financement, pas de l\'activité', ko: ['Elles sont déjà dans l\'EBE', 'Elles sont non décaissables', 'Elles sont toujours nulles en prévisionnel'], expl: 'On valorise l\'actif indépendamment de sa façon d\'être financé : les intérêts sont exclus.' },
    { q: 'Pourquoi rajoute-t-on les dotations aux amortissements dans l\'OCF ?', ok: 'Ce sont des charges comptables qui ne sortent pas de la trésorerie', ko: ['Ce sont des produits exceptionnels', 'Pour compenser l\'impôt', 'Parce que ce sont des investissements'], expl: 'Les DAP réduisent le RE (et donc l\'impôt) mais ne correspondent à aucun décaissement.' },
    { q: 'Quelle est la formule du Free Cash Flow ?', ok: T`\(FCF = NOPAT + DAP - \Delta BFR - CAPEX\)`, ko: [T`\(FCF = RN + DAP - \Delta BFR\)`, T`\(FCF = NOPAT - DAP + \Delta BFR - CAPEX\)`, T`\(FCF = EBE - IS - CAPEX + \Delta BFR\)`], expl: 'FCF = OCF − CAPEX avec OCF = NOPAT + DAP − ΔBFR.' },
    { q: 'Le NOPAT est égal à…', ok: T`\(RE \times (1 - t_{IS})\)`, ko: [T`\(EBE \times (1 - t_{IS})\)`, T`\(RN + DAP\)`, T`\(RE \times t_{IS}\)`], expl: 'Résultat d\'exploitation après impôt : RE × (1 − taux d\'IS).' },
    { q: 'En fin de projet, que fait-on du BFR ?', ok: 'On le récupère : il s\'ajoute au dernier flux', ko: ['On le soustrait du dernier flux', 'On l\'ignore', 'On l\'amortit'], expl: 'Si le BFR revient à l\'entreprise en fin de projet, on l\'ajoute au dernier OCF.' },
    { q: 'Si le BFR est nul toutes les années…', ok: 'la ΔBFR est nulle et n\'a aucun impact sur l\'OCF', ko: ['l\'OCF est nul', 'il faut quand même déduire le BFR', 'le FCF est égal au NOPAT'], expl: 'BFR = 0 ⇒ ΔBFR = 0 : aucun impact sur l\'OCF.' },
    { q: 'Dans le business plan, la différence entre le FTD (niveau 1) et le FCF est que…', ok: 'le FTD tient compte des intérêts, pas le FCF de valorisation', ko: ['le FCF inclut les dividendes', 'le FTD exclut le BFR', 'il n\'y a aucune différence'], expl: 'Les FTD sont calculés depuis la CAF, donc après intérêts. Pour valoriser, on part du NOPAT, sans les intérêts.' },
  ],
});

/* =====================================================================
 * NIVEAU 3 — VALEUR TEMPS DE L'ARGENT
 * ===================================================================== */
LEVELS.push({
  id: 3,
  title: 'Valeur temps de l\'argent',
  short: 'Capitalisation, actualisation, taux équivalent, annuités',
  cours: T`
<p>Un euro aujourd'hui ne vaut pas un euro demain, à cause du rendement qu'on pourrait en tirer (proche de la notion de coût d'opportunité).</p>
<h2>1. Capitalisation</h2>
<div class="formula"><div class="label">Valeur future</div>
\[ V_n = V_0 \times (1 + r)^n \]</div>
<p>\(n\) peut être fractionnaire : 2 ans et 4 mois → \(n = 28/12\).</p>
<div class="box tip"><strong>Exemple du cours</strong>857 € placés 2 ans et 4 mois à 3,37 % : \(857 \times 1{,}0337^{28/12} = 925{,}91\) €.</div>
<div class="formula"><div class="label">Taux équivalent (mensuel, etc.)</div>
\[ r_m = (1 + r)^{1/12} - 1 \quad (\neq r/12 \text{, qui est le taux proportionnel}) \]</div>

<h2>2. Actualisation</h2>
<div class="formula"><div class="label">Valeur actuelle</div>
\[ V_0 = \frac{V_n}{(1 + r)^n} = V_n \times DF \qquad DF = \frac{1}{(1+r)^n} \]</div>
<ul>
<li>Si \(r &gt; 0\), le facteur d'actualisation \(DF &lt; 1\).</li>
<li>\(r\) peut se voir comme un taux de « patience » (importance accordée au futur).</li>
<li><strong>Plus \(r\) est élevé, plus la valeur actuelle d'un flux futur est faible.</strong></li>
</ul>
<div class="formula"><div class="label">Retrouver le taux</div>
\[ r = \left(\frac{V_n}{V_0}\right)^{1/n} - 1 \]</div>

<h2>3. Série de flux et annuités constantes</h2>
<div class="formula"><div class="label">Valeur actuelle d'une série de flux</div>
\[ VA = \sum_{t=1}^{n} \frac{CF_t}{(1+r)^t} \]</div>
<div class="formula"><div class="label">Flux constants \(a\) pendant \(n\) périodes</div>
\[ VA = a \times \frac{1 - (1 + r)^{-n}}{r} \]</div>
<p>Cette formule est la base de la VAN, des emprunts à annuités constantes et des obligations.</p>

<h2>4. Culture générale du cours</h2>
<ul>
<li>La finance met en relation des agents qui ont de l'argent avec des agents qui ont besoin de financement, d'abord par des titres financiers.</li>
<li>Il y a des marchés organisés (S&amp;P, CAC 40) et des marchés de gré à gré (non organisés).</li>
<li>La <strong>valeur fondamentale</strong> est la valeur théorique réelle qu'on serait prêt à payer pour un bien.</li>
<li><strong>P/E ratio</strong> = cours de l'action / bénéfice par action : plus il est élevé, plus les investisseurs paient cher.</li>
</ul>
`,
  exemple: () => T`
<h2>Exercices types</h2>
<div class="step"><div class="n">1</div><div><strong>Capitaliser</strong> 857 € sur 2 ans et 4 mois à 3,37 % : \(857 \times 1{,}0337^{28/12} =\) <span class="ans">925,91 €</span></div></div>
<div class="step"><div class="n">2</div><div><strong>Actualiser</strong> 1 000 € reçus dans 5 ans à 4 % : \(1000 / 1{,}04^5 =\) <span class="ans">821,93 €</span> (c'est aussi le prix d'un zéro-coupon, TD 5).</div></div>
<div class="step"><div class="n">3</div><div><strong>Taux mensuel équivalent</strong> à 6 % annuel : \(1{,}06^{1/12} - 1 =\) <span class="ans">0,487 %</span> (et non 0,5 %).</div></div>
<div class="step"><div class="n">4</div><div><strong>Annuités</strong> : la valeur actuelle de 4 flux de 28 201,18 € à 5 % est \(28\,201{,}18 \times \frac{1 - 1{,}05^{-4}}{0{,}05} =\) <span class="ans">100 000 €</span> : c'est bien le capital emprunté du TD 4.</div></div>
`,
  gen: [
    () => {
      const V0 = rnd(500, 5000, 1), r = rnd(150, 600, 1) / 10000, y = rnd(1, 5), m = rnd(1, 11), n = y + m / 12;
      const Vn = V0 * Math.pow(1 + r, n);
      return num({
        q: `Quelle est la valeur de ${eur(V0, 0)} dans ${y} an${y > 1 ? 's' : ''} et ${m} mois, à un taux annuel de ${pct(r)} ?`,
        ok: Vn, ko: [V0 * (1 + r * n), V0 * Math.pow(1 + r, y), V0 * Math.pow(1 + r, y + m / 10)], fmt: eur,
        expl: T`\(V_n = ${V0} \times (1 + ${ft(r, 4)})^{${y * 12 + m}/12} = ${ft(Vn)}\) €`,
      });
    },
    () => {
      const Vn = rnd(1, 50) * 1000, r = rnd(2, 10) / 100, n = rnd(2, 10);
      const V0 = Vn / Math.pow(1 + r, n);
      return num({
        q: `Quelle est la valeur actuelle de ${eur(Vn, 0)} reçus dans ${n} ans, au taux de ${pct(r, 0)} ?`,
        ok: V0, ko: [Vn * Math.pow(1 + r, n), Vn / (1 + r * n), Vn / Math.pow(1 + r, n - 1)], fmt: eur,
        expl: T`\(V_0 = \dfrac{${Vn}}{(1 + ${ft(r)})^{${n}}} = ${ft(V0)}\) €`,
      });
    },
    () => {
      const r = rnd(2, 12) / 100, rm = Math.pow(1 + r, 1 / 12) - 1;
      return num({
        q: `Quel est le taux mensuel équivalent à un taux annuel de ${pct(r, 0)} ?`,
        ok: rm, ko: [r / 12, Math.pow(1 + r, 12) - 1, r / 12 * 1.1], fmt: (x) => pct(x, 3),
        expl: T`\(r_m = (1 + ${ft(r)})^{1/12} - 1 = ${pt(rm, 3)}\). \(r/12\) est le taux proportionnel, pas le taux équivalent.`,
      });
    },
    () => {
      const V0 = rnd(5, 50) * 100, r = rnd(2, 9) / 100, n = rnd(2, 8), Vn = Math.round(V0 * Math.pow(1 + r, n));
      const rr = Math.pow(Vn / V0, 1 / n) - 1;
      return num({
        q: `Un placement de ${eur(V0, 0)} vaut ${eur(Vn, 0)} au bout de ${n} ans. Quel est son taux de rendement annuel ?`,
        ok: rr, ko: [(Vn / V0 - 1) / n, Vn / V0 - 1, Math.pow(Vn / V0, 1 / (n + 1)) - 1], fmt: pct,
        expl: T`\(r = \left(\dfrac{${Vn}}{${V0}}\right)^{1/${n}} - 1 = ${pt(rr)}\)`,
      });
    },
    () => {
      const r = rnd(2, 15) / 100, n = rnd(1, 10), df = 1 / Math.pow(1 + r, n);
      return num({
        q: `Quel est le facteur d'actualisation (DF) pour ${n} an${n > 1 ? 's' : ''} au taux de ${pct(r, 0)} ?`,
        ok: df, ko: [Math.pow(1 + r, n), 1 - r * n, 1 / (1 + r * n)], fmt: (x) => f(x, 4),
        expl: T`\(DF = \dfrac{1}{(1 + ${ft(r)})^{${n}}} = ${ft(df, 4)}\) (inférieur à 1 car r > 0).`,
      });
    },
    () => {
      const a = rnd(5, 50) * 1000, r = rnd(3, 10) / 100, n = rnd(3, 10);
      const va = pvAnnuity(a, r, n);
      return num({
        q: `Quelle est la valeur actuelle de ${n} flux annuels de ${eur(a, 0)} (premier flux dans un an), au taux de ${pct(r, 0)} ?`,
        ok: va, ko: [a * n, a * n / Math.pow(1 + r, n), pvAnnuity(a, r, n) * (1 + r)], fmt: eur,
        expl: T`\(VA = ${a} \times \dfrac{1 - (1 + ${ft(r)})^{-${n}}}{${ft(r)}} = ${ft(va)}\) €`,
      });
    },
  ],
  concepts: [
    { q: 'Quand le taux d\'actualisation augmente, la valeur actuelle d\'un flux futur…', ok: 'diminue', ko: ['augmente', 'ne change pas', 'devient négative'], expl: 'V₀ = Vₙ / (1+r)ⁿ : le dénominateur augmente, donc V₀ baisse.' },
    { q: 'Si r > 0, le facteur d\'actualisation DF = 1/(1+r)ⁿ est…', ok: 'strictement inférieur à 1', ko: ['supérieur à 1', 'égal à 1', 'négatif'], expl: '(1+r)ⁿ > 1, donc son inverse est inférieur à 1.' },
    { q: 'Le P/E ratio mesure…', ok: 'le rapport entre le prix de l\'action et le bénéfice par action', ko: ['le rapport entre la dette et les capitaux propres', 'le rendement d\'une obligation', 'le taux de distribution des dividendes'], expl: 'P/E = cours / bénéfice : plus il est élevé, plus les investisseurs paient cher chaque euro de bénéfice.' },
    { q: 'La valeur fondamentale d\'un actif est…', ok: 'la valeur théorique réelle qu\'on serait prêt à payer pour l\'acquérir', ko: ['le dernier cours coté', 'sa valeur comptable au bilan', 'sa valeur nominale'], expl: 'Définition du cours : c\'est la valeur théorique « réelle », qui peut différer du prix observé.' },
    { q: 'Quelle formule donne la valeur actuelle de n flux constants a ?', ok: T`\(a \times \dfrac{1 - (1+r)^{-n}}{r}\)`, ko: [T`\(a \times \dfrac{(1+r)^{n} - 1}{r}\)`, T`\(\dfrac{a \times n}{(1+r)^n}\)`, T`\(a \times \dfrac{r}{1 - (1+r)^{-n}}\)`], expl: 'C\'est la formule de la valeur actuelle d\'une annuité. La 2ᵉ proposition donne une valeur future, la 4ᵉ donne l\'annuité à partir d\'un capital.' },
    { q: 'Le taux mensuel équivalent à un taux annuel r est…', ok: T`\((1+r)^{1/12} - 1\)`, ko: [T`\(r / 12\)`, T`\((1+r)^{12} - 1\)`, T`\(12 \times r\)`], expl: 'Le taux équivalent conserve la capitalisation composée. r/12 est le taux proportionnel.' },
  ],
});

/* =====================================================================
 * NIVEAU 4 — VAN, TRI ET CRITÈRES D'INVESTISSEMENT
 * ===================================================================== */
LEVELS.push({
  id: 4,
  title: 'VAN, TRI et critères',
  short: 'VAN, TRI (2nd degré), pièges du TRI, Fisher, IP, DRCI, VAE',
  cours: T`
<h2>1. La VAN</h2>
<div class="formula"><div class="label">Valeur actuelle nette</div>
\[ VAN = -I_0 + \sum_{t=1}^{n} \frac{CF_t}{(1+k)^t} \]</div>
<p>\(k\) est le <strong>coût du capital</strong> (coût du projet), lié au risque. Plus \(k\) est élevé, plus le projet est risqué et plus la VAN est faible (projet d'investissement classique).</p>
<div class="box tip"><strong>Règle d'or</strong>On investit si et seulement si <strong>VAN &gt; 0</strong>. C'est le seul critère vraiment fiable : ne jamais faire du TRI le critère de décision.</div>

<h2>2. Le TRI</h2>
<p>Le TRI est le taux \(k\) qui annule la VAN. Règle « classique » : si \(TRI &gt; k\), on investit.</p>
<div class="formula"><div class="label">TRI sur 2 périodes (polynôme du 2nd degré)</div>
\[ -I_0 + \frac{CF_1}{1+x} + \frac{CF_2}{(1+x)^2} = 0 \quad\text{on pose } X = \frac{1}{1+x} \]
\[ CF_2 X^2 + CF_1 X - I_0 = 0 \;\Rightarrow\; X = \frac{-CF_1 + \sqrt{CF_1^2 + 4\,CF_2\,I_0}}{2\,CF_2} \;\Rightarrow\; TRI = \frac{1}{X} - 1 \]</div>
<p>Sur 1 période : \(TRI = CF_1 / I_0 - 1\).</p>
<div class="box trap"><strong>Les pièges du TRI</strong><ul>
<li>Il peut ne pas exister, ou il peut y en avoir <strong>plusieurs</strong> (flux qui changent plusieurs fois de signe).</li>
<li><strong>Projet de financement</strong> (flux + puis −, ex. une avance client) : la VAN est <em>croissante</em> avec \(k\). La règle s'inverse : on accepte si \(TRI &lt; k\). On peut avoir TRI &gt; k et VAN &lt; 0.</li>
<li><strong>Conflit de classement</strong> entre projets exclusifs : le TRI dépend du profil des flux (rapides ou tardifs). On tranche avec la VAN au taux \(k\).</li></ul></div>
<div class="formula"><div class="label">Taux de Fisher (croisement des VAN)</div>
<p>Le taux où \(VAN_A = VAN_B\) est le TRI des flux différentiels \((B - A)\). En dessous, le projet aux flux tardifs a la meilleure VAN ; au-dessus, c'est celui aux flux rapides.</p></div>

<h2>3. Critères alternatifs</h2>
<div class="formula"><div class="label">Indice de profitabilité</div>
\[ IP = \frac{VA}{I_0} \quad\text{avec}\quad VA = VAN + I_0 \qquad IP &gt; 1 \Leftrightarrow VAN &gt; 0 \]</div>
<p>L'IP permet de classer des projets.</p>
<div class="formula"><div class="label">DRCI (délai de récupération du capital investi)</div>
<p>Nombre d'années nécessaires pour que les flux cumulés remboursent \(I_0\). Facile à comprendre, mais <strong>ignore la valeur temps de l'argent</strong> (et les flux après le délai) : ne jamais l'utiliser seul.<br>Avec interpolation : \(DRCI = (t-1) + \dfrac{\text{reste à récupérer}}{CF_t}\).</p></div>
<div class="formula"><div class="label">Durées de vie inégales → VAE (valeur annuelle équivalente)</div>
\[ VAE = VAN \times \frac{k}{1 - (1+k)^{-n}} \]</div>
<p>On ne compare pas directement les VAN de projets de durées différentes : on les ramène à un flux annuel équivalent.</p>
`,
  exemple: () => T`
<h2>TD 3 · VAN et TRI</h2>
<h3>Ex. 1 : machine à 100 000 €</h3>
<p>Flux : 30 000, 40 000, 40 000, 20 000.</p>
<div class="step"><div class="n">1</div><div>À 8 % : \(VAN = -100\,000 + \frac{30\,000}{1{,}08} + \frac{40\,000}{1{,}08^2} + \frac{40\,000}{1{,}08^3} + \frac{20\,000}{1{,}08^4} =\) <span class="ans">+8 525 €</span> → accepté.</div></div>
<div class="step"><div class="n">2</div><div>À 15 % : <span class="ans">−5 932 €</span> → refusé. La VAN est très sensible à \(k\) (TRI ≈ 11,93 %).</div></div>
<h3>Ex. 2 : TRI sur 2 ans (−50 000 ; 25 000 ; 35 000)</h3>
<div class="step"><div class="n">1</div><div>\(35\,000X^2 + 25\,000X - 50\,000 = 0\) → \(7X^2 + 5X - 10 = 0\)</div></div>
<div class="step"><div class="n">2</div><div>\(\Delta = 25 + 280 = 305\) ; \(X = \frac{-5 + \sqrt{305}}{14} = 0{,}8903\) → \(TRI = 1/0{,}8903 - 1 =\) <span class="ans">12,32 %</span></div></div>
<div class="step"><div class="n">3</div><div>À \(k = 10\%\) : TRI &gt; k et VAN = +1 653 € : les deux critères sont cohérents.</div></div>
<h3>Ex. 3 : le piège du projet de financement (+100 000 ; −115 000)</h3>
<p>TRI = 115/100 − 1 = <span class="ans">15 %</span>. À 10 % : VAN = 100 000 − 115 000/1,1 = <span class="ans">−4 545 €</span> alors que TRI &gt; k ! À 20 % : VAN = <span class="ans">+4 167 €</span>. La VAN croît avec \(k\) : c'est un emprunt déguisé à 15 %. On l'accepte seulement si \(k &gt; 15\%\) (TRI &lt; k).</p>
<h3>Ex. 4 : conflit de classement (k = 5 %)</h3>
${htmlTable(['Projet', 'I₀', 'CF₁', 'CF₂', 'TRI', 'VAN 5 %', 'VAN 10 %'], [['A', '10 000', '7 000', '5 400', '16,39 %', '1 565', '826'], ['B', '10 000', '2 000', '10 800', '14,40 %', '1 701', '744']])}
<p>Le TRI préfère A (flux rapides), la VAN à 5 % préfère <strong>B</strong> : on retient B. Taux de Fisher : flux B − A = (0 ; −5 000 ; +5 400) → \(1 + x = 5\,400/5\,000\) → <span class="ans">8 %</span>. Au-delà de 8 % (ex. 10 %), A devient meilleur.</p>
<h3>Ex. 5 : durées de vie inégales (k = 10 %)</h3>
<p>Machine C (20 000 €, 2 ans, 12 400/an) : VAN = 1 521 €. Machine D (30 000 €, 4 ans, 10 000/an) : VAN = 1 699 €. D semble meilleure, mais elle dure deux fois plus longtemps.<br>VAE C = 1 521 × 0,1 / (1 − 1,1⁻²) = <span class="ans">876 €/an</span> ; VAE D = 1 699 × 0,1 / (1 − 1,1⁻⁴) = <span class="ans">536 €/an</span> → on choisit <strong>C</strong>.</p>
`,
  gen: [
    () => {
      const I = rnd(50, 200, 10) * 1000, k = rnd(4, 12) / 100, n = 3;
      const cf = Array.from({ length: n }, () => Math.round(I * rnd(30, 50) / 100 / 1000) * 1000);
      const v = npv(k, [-I, ...cf]);
      return num({
        q: `Investissement ${eur(I, 0)}, flux annuels ${cf.map(c => eur(c, 0)).join(' ; ')}, coût du capital ${pct(k, 0)}. Quelle est la VAN ?`,
        ok: v, ko: [cf.reduce((a, b) => a + b) - I, v + I, npv(k, [-I, ...cf]) * (1 + k)], fmt: (x) => eur(x, 0),
        expl: T`\(VAN = -${I} + \frac{${cf[0]}}{${ft(1 + k)}} + \frac{${cf[1]}}{${ft(1 + k)}^2} + \frac{${cf[2]}}{${ft(1 + k)}^3} = ${ft(v, 0)}\) € → ${v > 0 ? 'VAN > 0 : on investit.' : 'VAN < 0 : on n\'investit pas.'}`,
      });
    },
    () => {
      const I = rnd(20, 100, 5) * 1000, c1 = Math.round(I * rnd(30, 60) / 100 / 1000) * 1000, c2 = Math.round(I * rnd(60, 90) / 100 / 1000) * 1000;
      const X = (-c1 + Math.sqrt(c1 * c1 + 4 * c2 * I)) / (2 * c2), tri = 1 / X - 1;
      return num({
        q: `Projet : I₀ = ${eur(I, 0)}, CF₁ = ${eur(c1, 0)}, CF₂ = ${eur(c2, 0)}. Quel est le TRI ?`,
        ok: tri, ko: [(c1 + c2 - I) / I, Math.sqrt((c1 + c2) / I) - 1, (c1 + c2 - I) / I / 2, X - 1], fmt: pct,
        expl: T`Avec \(X = 1/(1+TRI)\) : \(${c2}X^2 + ${c1}X - ${I} = 0\). \(X = \frac{-${c1} + \sqrt{${c1}^2 + 4 \times ${c2} \times ${I}}}{2 \times ${c2}} = ${ft(X, 4)}\) → \(TRI = 1/X - 1 = ${pt(tri)}\)`,
      });
    },
    () => {
      const I = rnd(10, 100, 5) * 1000, r = rnd(4, 20) / 100, c = Math.round(I * (1 + r));
      const tri = c / I - 1;
      return num({
        q: `Un projet coûte ${eur(I, 0)} aujourd'hui et rapporte ${eur(c, 0)} dans un an (rien d'autre). Quel est son TRI ?`,
        ok: tri, ko: [c / I, I / c, (c - I) / c], fmt: pct,
        expl: T`\(-${I} + \frac{${c}}{1 + TRI} = 0 \Rightarrow TRI = \frac{${c}}{${I}} - 1 = ${pt(tri)}\)`,
      });
    },
    () => {
      const I = rnd(50, 300, 10) * 1000, van = rnd(-20, 60, 2) * 1000;
      const ip = (van + I) / I;
      return num({
        q: `Un projet a une VAN de ${eur(van, 0)} pour un investissement initial de ${eur(I, 0)}. Quel est son indice de profitabilité ?`,
        ok: ip, ko: [van / I, I / (van + I), 1 + I / (van + I)], fmt: (x) => f(x, 3),
        expl: T`\(VA = VAN + I_0 = ${van + I}\) ; \(IP = VA / I_0 = ${van + I} / ${I} = ${ft(ip, 3)}\) → ${ip > 1 ? 'IP > 1 ⇔ VAN > 0' : 'IP < 1 ⇔ VAN < 0'}`,
      });
    },
    () => {
      const I = rnd(50, 150, 10) * 1000;
      const cf = Array.from({ length: 5 }, () => rnd(15, 45) * 1000);
      let cum = 0, t = 0;
      while (t < 5 && cum + cf[t] < I) { cum += cf[t]; t++; }
      if (t === 5) return LEVELS[3].gen[4]();
      const d = t + (I - cum) / cf[t];
      return num({
        q: `I₀ = ${eur(I, 0)}. Flux annuels : ${cf.map(c => eur(c, 0)).join(' ; ')}. Quel est le DRCI (non actualisé, interpolation linéaire) ?`,
        ok: d, ko: [t + 1, t, I / (cf.reduce((a, b) => a + b) / 5)], fmt: (x) => f(x, 2) + ' ans',
        expl: T`Cumul fin d'année ${t} : ${f(cum, 0)} € ; il reste ${f(I - cum, 0)} € à récupérer sur le flux de l'année ${t + 1} (${f(cf[t], 0)} €) → \(DRCI = ${t} + ${I - cum}/${cf[t]} = ${ft(d)}\) ans`,
      });
    },
    () => {
      const van = rnd(5, 50) * 100, k = rnd(5, 12) / 100, n = rnd(2, 8);
      const vae = van * k / (1 - Math.pow(1 + k, -n));
      return num({
        q: `Un projet de ${n} ans a une VAN de ${eur(van, 0)} au taux de ${pct(k, 0)}. Quelle est sa valeur annuelle équivalente (VAE) ?`,
        ok: vae, ko: [van / n, van * k, van * (1 - Math.pow(1 + k, -n)) / k], fmt: eur,
        expl: T`\(VAE = VAN \times \dfrac{k}{1-(1+k)^{-n}} = ${van} \times \dfrac{${ft(k)}}{1 - ${ft(1 + k)}^{-${n}}} = ${ft(vae)}\) €`,
      });
    },
    () => {
      const I = 10000, a1 = rnd(60, 80, 5) * 100, d1 = rnd(30, 50, 5) * 100, fr = rnd(4, 12) / 100;
      const a2 = rnd(40, 60, 2) * 100, b1 = a1 - d1, b2 = Math.round(a2 + d1 * (1 + fr));
      const fisher = (b2 - a2) / (a1 - b1) - 1;
      return num({
        q: 'Deux projets exclusifs, même investissement de 10 000 €. À partir de quel taux d\'actualisation le projet A (flux rapides) devient-il préférable à B (taux de Fisher) ?' + htmlTable(['Projet', 'I₀', 'CF₁', 'CF₂'], [['A', '10 000', f(a1, 0), f(a2, 0)], ['B', '10 000', f(b1, 0), f(b2, 0)]]),
        ok: fisher, ko: [(irr([-I, a1, a2]) + irr([-I, b1, b2])) / 2, irr([-I, a1, a2]), irr([-I, b1, b2])], fmt: pct,
        expl: T`Flux différentiels B − A : \(0\) ; \(${b1 - a1}\) ; \(+${b2 - a2}\). VAN différentielle nulle : \(\frac{${b2 - a2}}{(1+x)^2} = \frac{${a1 - b1}}{1+x} \Rightarrow 1 + x = \frac{${b2 - a2}}{${a1 - b1}}\) → \(x = ${pt(fisher)}\)`,
      });
    },
    () => {
      const adv = rnd(50, 200, 10) * 1000, r = rnd(8, 20) / 100, cost = Math.round(adv * (1 + r)), k = pick([r - 0.04, r + 0.05]);
      const v = adv - cost / (1 + k);
      return num({
        q: `Un projet de financement : encaissement de ${eur(adv, 0)} en t = 0, décaissement de ${eur(cost, 0)} en t = 1. Quelle est sa VAN pour k = ${pct(k, 0)} ?`,
        ok: v, ko: [-v, adv - cost, cost / (1 + k) - adv * (1 + k)], fmt: (x) => eur(x, 0),
        expl: T`\(VAN = ${adv} - \frac{${cost}}{${ft(1 + k)}} = ${ft(v, 0)}\) €. TRI = ${pct(r, 0)} : ${k < r ? 'TRI > k mais VAN < 0 → on refuse (règle du TRI inversée).' : 'TRI < k et VAN > 0 → on accepte : le « prêt » coûte moins que k.'}`,
      });
    },
  ],
  concepts: [
    { q: 'Quel est le seul critère d\'investissement vraiment fiable selon le cours ?', ok: 'VAN > 0', ko: ['TRI > k', 'DRCI le plus court', 'IP le plus élevé'], expl: 'Le TRI peut ne pas exister, être multiple ou s\'inverser. Seule la VAN > 0 est un critère valable.' },
    { q: 'Un projet a des flux +100 en t = 0 puis −115 en t = 1 (projet de financement). La règle de décision du TRI…', ok: 's\'inverse : on accepte si TRI < k', ko: ['reste valable : on accepte si TRI > k', 'ne s\'applique pas car la VAN est toujours positive', 'impose de prendre k = 0'], expl: 'La VAN est croissante avec k : c\'est un emprunt. On accepte si son coût (TRI) est inférieur à k.' },
    { q: 'Pour un projet d\'investissement classique (−I₀ puis flux positifs), quand k augmente, la VAN…', ok: 'diminue', ko: ['augmente', 'reste constante', 'devient toujours négative'], expl: 'Les flux futurs sont plus fortement actualisés : la VAN baisse.' },
    { q: 'Le TRI est…', ok: 'le taux d\'actualisation qui annule la VAN', ko: ['le taux qui maximise la VAN', 'le coût du capital de l\'entreprise', 'le rapport VA / I₀'], expl: 'Par définition : VAN(TRI) = 0.' },
    { q: 'Deux projets ont des durées de vie différentes. Pour les comparer, on utilise…', ok: 'la VAE (valeur annuelle équivalente)', ko: ['la VAN brute', 'le DRCI', 'la somme des flux non actualisés'], expl: 'La VAN brute avantage le projet le plus long : on ramène chaque VAN à un flux annuel équivalent.' },
    { q: 'Le principal défaut du DRCI est…', ok: 'qu\'il ne tient pas compte de la valeur temps de l\'argent', ko: ['qu\'il est difficile à calculer', 'qu\'il nécessite de connaître le TRI', 'qu\'il est toujours supérieur à la durée du projet'], expl: 'Le DRCI cumule des flux non actualisés et ignore les flux après le délai.' },
    { q: 'IP > 1 est équivalent à…', ok: 'VAN > 0', ko: ['TRI < k', 'DRCI < 1 an', 'VAN < 0'], expl: 'IP = VA / I₀ > 1 ⇔ VA > I₀ ⇔ VAN > 0.' },
    { q: 'Pourquoi la VAN et le TRI peuvent-ils classer différemment deux projets exclusifs ?', ok: 'À cause du profil temporel des flux (rapides ou tardifs) et de l\'hypothèse de réinvestissement', ko: ['Parce que la VAN est fausse quand k est faible', 'Parce que le TRI tient compte du risque', 'Ils donnent toujours le même classement'], expl: 'Le TRI favorise les flux rapides. Sous le taux de Fisher, le projet aux flux tardifs a une meilleure VAN.' },
    { q: 'Quelle formule donne la VAE ?', ok: T`\(VAN \times \dfrac{k}{1-(1+k)^{-n}}\)`, ko: [T`\(\dfrac{VAN}{n}\)`, T`\(VAN \times \dfrac{1-(1+k)^{-n}}{k}\)`, T`\(VAN \times (1+k)^n\)`], expl: 'On divise la VAN par le facteur d\'annuité : VAE = VAN × k / (1 − (1+k)⁻ⁿ).' },
    { q: 'Le taux de Fisher correspond…', ok: 'au taux pour lequel les VAN de deux projets sont égales', ko: ['au TRI le plus élevé des deux projets', 'au coût du capital moyen', 'au taux qui annule la VAN du projet le plus long'], expl: 'C\'est le TRI des flux différentiels (B − A) : le point de croisement des deux courbes de VAN.' },
  ],
});

/* =====================================================================
 * NIVEAU 5 — DETTE BANCAIRE
 * ===================================================================== */
LEVELS.push({
  id: 5,
  title: 'Dette bancaire',
  short: 'Amortissement constant, annuités constantes, in fine, différés, TAE',
  cours: T`
<h2>1. L'intermédiation bancaire</h2>
<p>La banque collecte des dépôts très <strong>liquides</strong> (on peut les retirer tout de suite) et prête à long terme de façon <strong>illiquide</strong> (prêt à une PME). Son métier : identifier les emprunteurs. Modèles : <em>originate to hold</em> (garder les prêts) ou <em>originate to distribute</em> (les revendre).</p>
<p>Liquidité ≠ solvabilité : une entreprise est liquide si elle peut payer ses échéances, mais elle peut être insolvable (valeur de l'actif &lt; valeur de la dette). Si elle ne paie pas, c'est le défaut et la procédure collective (faillite).</p>

<h2>2. Le tableau d'amortissement</h2>
<p>Colonnes : capital restant dû (CRD) <strong>en début de période</strong> · intérêts · amortissement (capital remboursé) · annuité.</p>
<div class="formula"><div class="label">Toujours vrai</div>
\[ \text{Intérêts}_t = CRD_{\text{début } t} \times i \qquad \text{Annuité}_t = \text{Intérêts}_t + \text{Amortissement}_t \]
\[ CRD = \text{capital initial} - \text{capital déjà remboursé} \]</div>

<h3>a) Amortissement constant du capital</h3>
<div class="formula">\[ A = \frac{D_0}{n} \qquad \text{Annuité}_t = \frac{D_0}{n} + \left(D_0 - (t-1)\frac{D_0}{n}\right) \times i \]</div>
<p>Les annuités sont <strong>décroissantes</strong>. Question QCM type : « quelle est l'annuité en N+3 ? »</p>

<h3>b) Annuités constantes</h3>
<div class="formula">\[ a = D_0 \times \frac{i}{1 - (1+i)^{-n}} \]</div>
<p>Étapes : ① calculer \(a\) ; ② intérêts = CRD début × i ; ③ amortissement = \(a\) − intérêts. Les amortissements croissent : \(A_t = A_1 (1+i)^{t-1}\), avec \(A_1 = a - D_0 i\).</p>
<div class="box tip"><strong>Question QCM probable : part d'intérêt dans l'annuité</strong>
1ʳᵉ annuité : \(\dfrac{D_0 \times i}{a}\). Dernière annuité : \(\dfrac{i}{1+i}\) (car \(CRD_n = A_n\) et \(a = A_n(1+i)\)).<br>
Exemple du cours (Chablais Express, 150 000 € à 4 % sur 4 ans, a = 41 323,51 €) : la réponse donnée, 3,85 %, est \(0{,}04/1{,}04\) = part d'intérêt de la <em>dernière</em> annuité. Pour la 1ʳᵉ année, c'est 6 000 / 41 323,51 = 14,52 %. Lis bien de quelle année parle l'énoncé.</div>

<h3>c) In fine (bullet)</h3>
<div class="formula">\[ \text{Annuités } 1 \ldots n-1 = D_0 \times i \qquad \text{Annuité}_n = D_0 (1 + i) \]</div>
<p>On ne rembourse le capital qu'à la fin, mais on paie les intérêts chaque année.</p>

<div class="formula"><div class="label">Coût total du crédit (somme des intérêts)</div>
\[ \text{Amort. constant} : D_0\, i \frac{n+1}{2} \quad &lt; \quad \text{Annuités constantes} : n a - D_0 \quad &lt; \quad \text{In fine} : n D_0 i \]</div>
<p>Plus on garde le capital longtemps, plus on paie d'intérêts. Mais le <strong>TAE est le même</strong> (= taux nominal) quelle que soit la modalité, sans frais et avec des flux annuels.</p>

<h2>3. Différés de remboursement</h2>
<div class="formula"><div class="label">Différé partiel (franchise de capital)</div>
<p>Année 1 : on ne paie que les intérêts \(D_0 \times i\). Ensuite : \(a = D_0 \times \dfrac{i}{1-(1+i)^{-(n-1)}}\).</p></div>
<div class="formula"><div class="label">Différé total (franchise totale)</div>
<p>Année 1 : on ne paie rien, les intérêts sont capitalisés : \(D_1 = D_0(1+i)\). Ensuite : \(a = D_0(1+i) \times \dfrac{i}{1-(1+i)^{-(n-1)}}\).</p></div>

<h2>4. Le taux actuariel effectif (TAE)</h2>
<p>C'est le TRI de la dette : le taux qui égalise ce que l'on reçoit vraiment et ce que l'on rembourse.</p>
<div class="formula">\[ D_0 - \text{frais} = \sum_{t=1}^{n} \frac{\text{Annuité}_t + \text{assurance}_t}{(1 + TAE)^t} \]</div>
<ul>
<li>Sans frais : TAE = taux nominal, pour les 3 modalités.</li>
<li>Avec frais : TAE &gt; taux nominal.</li>
<li>Avec des frais fixes en t = 0, le TAE est <strong>le plus élevé</strong> en amortissement constant (le capital est gardé le moins longtemps, donc les frais pèsent plus) et <strong>le plus faible</strong> en in fine.</li>
</ul>

<h2>5. Pourquoi un taux d'intérêt ?</h2>
<ul>
<li><strong>Premium temporel</strong> : prêter, c'est différer sa consommation (coût d'opportunité) et compenser l'inflation. Il augmente en général avec la durée, et le taux sans risque est en général positif.</li>
<li><strong>Prime de risque</strong>, surtout le <strong>risque de crédit</strong> : défaillance de la contrepartie (non-paiement d'une annuité) ou dégradation de sa qualité de crédit (probabilité de défaut).</li>
<li>Autres risques : <strong>risque de taux</strong> (variation des taux dans l'économie : il touche les nouveaux emprunts et la valeur des anciens) et <strong>risque de liquidité</strong> (côté prêteur, quand tout le monde veut du liquide en même temps).</li>
<li><strong>Structure par terme</strong> : les taux varient selon la maturité et le risque.</li>
</ul>
`,
  exemple: () => {
    const fmtRows = (rows) => rows.map(r => [r.t, f(r.crd), f(r.int), f(r.am), f(r.ann)]);
    const H = ['Année', 'CRD début', 'Intérêts', 'Amortissement', 'Annuité'];
    return T`
<h2>TD 4 · LYON-PROD : 100 000 € à 5 % sur 4 ans</h2>
<h3>Option A : amortissement constant</h3>${htmlTable(H, fmtRows(loanTable(100000, .05, 4, 'ac')))}
<h3>Option B : annuités constantes (a = 28 201,18 €)</h3>${htmlTable(H, fmtRows(loanTable(100000, .05, 4, 'an')))}
<h3>Option C : in fine</h3>${htmlTable(H, fmtRows(loanTable(100000, .05, 4, 'if')))}
<div class="step"><div class="n">1</div><div><strong>Start-up à la trésorerie tendue</strong> : l'option C (in fine), qui a les plus petites sorties au début (5 000 €/an).</div></div>
<div class="step"><div class="n">2</div><div><strong>Coût total</strong> : A = <span class="ans">12 500 €</span> ; B = <span class="ans">12 804,73 €</span> ; C = <span class="ans">20 000 €</span>. Pourtant, le TAE vaut 5 % dans les trois cas (la valeur actualisée à 5 % des annuités est toujours égale à 100 000 €).</div></div>
<h3>Différés (ex. 2)</h3>
<div class="step"><div class="n">1</div><div><strong>Partiel</strong> : année 1 = 5 000 € d'intérêts ; puis \(100\,000 \times \frac{0{,}05}{1 - 1{,}05^{-3}} =\) <span class="ans">36 720,86 €</span> pendant 3 ans.</div></div>
<div class="step"><div class="n">2</div><div><strong>Total</strong> : dette fin d'année 1 = 105 000 € ; puis \(105\,000 \times \frac{0{,}05}{1 - 1{,}05^{-3}} =\) <span class="ans">38 556,90 €</span> pendant 3 ans.</div></div>
<h3>TAE avec frictions (ex. 3)</h3>
<div class="step"><div class="n">1</div><div>Flux net reçu en t = 0 : 100 000 − 2 000 = <span class="ans">98 000 €</span>. Assurance : 0,3 % × 100 000 = 300 €/an → flux annuel = 28 501,18 €.</div></div>
<div class="step"><div class="n">2</div><div>\(98\,000 = \sum_{t=1}^{4} \frac{28\,501{,}18}{(1+TAE)^t}\) → <span class="ans">TAE ≈ 6,34 %</span> (&gt; 5 %).</div></div>
<div class="step"><div class="n">3</div><div>Mêmes frictions : option A ≈ <span class="ans">6,37 %</span> (le plus élevé), option C ≈ <span class="ans">5,88 %</span> (le plus faible) : les frais sont étalés sur un capital gardé plus longtemps.</div></div>`;
  },
  gen: [
    () => {
      const D = rnd(5, 30) * 10000, i = pick([3, 4, 5, 6, 7]) / 100, n = pick([4, 5, 6]), t = rnd(2, n);
      const A = D / n, ann = A + (D - (t - 1) * A) * i;
      return num({
        q: `Emprunt de ${eur(D, 0)} à ${pct(i, 0)} sur ${n} ans, remboursé par <strong>amortissement constant</strong>. Quelle est l'annuité de l'année ${t} ?`,
        ok: ann, ko: [A + D * i, A + (D - t * A) * i, annuity(D, i, n), A * (1 + i)], fmt: eur,
        expl: T`\(A = ${D}/${n} = ${ft(A)}\) ; \(CRD_{\text{début } ${t}} = ${D} - ${t - 1} \times ${ft(A)} = ${ft(D - (t - 1) * A)}\) ; intérêts \(= ${ft((D - (t - 1) * A) * i)}\) → annuité \(= ${ft(ann)}\) €`,
      });
    },
    () => {
      const D = rnd(5, 50) * 10000, i = pick([3, 4, 5, 6, 7]) / 100, n = pick([3, 4, 5, 8, 10]);
      const a = annuity(D, i, n);
      return num({
        q: `Quelle est l'annuité constante d'un emprunt de ${eur(D, 0)} à ${pct(i, 0)} sur ${n} ans ?`,
        ok: a, ko: [D / n + D * i, D * (1 + i * n) / n, D * i / (1 - Math.pow(1 + i, n)) * -1 / (1 + i), D / n * (1 + i)], fmt: eur,
        expl: T`\(a = ${D} \times \dfrac{${ft(i)}}{1 - ${ft(1 + i)}^{-${n}}} = ${ft(a)}\) €`,
      });
    },
    () => {
      const D = rnd(5, 30) * 10000, i = pick([4, 5, 6]) / 100, n = pick([4, 5]);
      const rows = loanTable(D, i, n, 'an'), r2 = rows[1];
      return num({
        q: `Emprunt de ${eur(D, 0)} à ${pct(i, 0)} sur ${n} ans, en annuités constantes. Quel est le montant des <strong>intérêts payés en année 2</strong> ?`,
        ok: r2.int, ko: [D * i, rows[0].am * i, (D - D / n) * i, r2.am], fmt: eur,
        expl: T`\(a = ${ft(rows[0].ann)}\) ; année 1 : intérêts \(${ft(rows[0].int)}\), amortissement \(${ft(rows[0].am)}\) → \(CRD_2 = ${ft(r2.crd)}\) ; intérêts année 2 \(= ${ft(r2.crd)} \times ${ft(i)} = ${ft(r2.int)}\) €`,
      });
    },
    () => {
      const D = rnd(5, 30) * 10000, i = pick([3, 4, 5, 6]) / 100, n = pick([4, 5]);
      const a = annuity(D, i, n), first = Math.random() < .5;
      const ok = first ? D * i / a : i / (1 + i);
      return num({
        q: `Emprunt de ${eur(D, 0)} à ${pct(i, 0)} sur ${n} ans, en annuités constantes. Quelle est la part des intérêts (en %) dans <strong>la ${first ? 'première' : 'dernière'} annuité</strong> ?`,
        ok, ko: [first ? i / (1 + i) : D * i / a, i, 1 - (first ? D * i / a : i / (1 + i))], fmt: pct,
        expl: first
          ? T`\(a = ${ft(a)}\) ; intérêts année 1 \(= ${D} \times ${ft(i)} = ${ft(D * i)}\) → part \(= ${ft(D * i)}/${ft(a)} = ${pt(ok)}\)`
          : T`Dernière année : \(CRD = A_n\) et \(a = A_n(1+i)\), donc intérêts / annuité \(= \dfrac{i}{1+i} = \dfrac{${ft(i)}}{${ft(1 + i)}} = ${pt(ok)}\)`,
      });
    },
    () => {
      const D = rnd(5, 50) * 10000, i = pick([3, 4, 5, 6, 7]) / 100, n = pick([4, 5, 6]), type = pick(['ac', 'an', 'if']);
      const tot = loanTable(D, i, n, type).reduce((s, r) => s + r.int, 0);
      const name = { ac: 'amortissement constant', an: 'annuités constantes', if: 'in fine' }[type];
      const others = ['ac', 'an', 'if'].filter(x => x !== type).map(x => loanTable(D, i, n, x).reduce((s, r) => s + r.int, 0));
      return num({
        q: `Quel est le coût total (somme des intérêts) d'un emprunt de ${eur(D, 0)} à ${pct(i, 0)} sur ${n} ans remboursé en <strong>${name}</strong> ?`,
        ok: tot, ko: [...others, D * i], fmt: eur,
        expl: { ac: T`\(D_0 \, i \, \frac{n+1}{2} = ${D} \times ${ft(i)} \times \frac{${n + 1}}{2} = ${ft(tot)}\) €`, an: T`\(n \times a - D_0 = ${n} \times ${ft(annuity(D, i, n))} - ${D} = ${ft(tot)}\) €`, if: T`\(n \times D_0 \times i = ${n} \times ${D} \times ${ft(i)} = ${ft(tot)}\) €` }[type],
      });
    },
    () => {
      const D = rnd(5, 30) * 10000, i = pick([4, 5, 6]) / 100, n = pick([4, 5]), total = Math.random() < .5;
      const a = annuity(total ? D * (1 + i) : D, i, n - 1);
      return num({
        q: `Emprunt de ${eur(D, 0)} à ${pct(i, 0)}, durée totale ${n} ans, avec un <strong>différé ${total ? 'total' : 'partiel'}</strong> d'un an, puis des annuités constantes. Quel est le montant des ${n - 1} annuités constantes ?`,
        ok: a, ko: [annuity(total ? D : D * (1 + i), i, n - 1), annuity(D, i, n), annuity(total ? D * (1 + i) : D, i, n)], fmt: eur,
        expl: total
          ? T`Intérêts capitalisés : \(D_1 = ${D} \times ${ft(1 + i)} = ${ft(D * (1 + i))}\), puis \(a = ${ft(D * (1 + i))} \times \dfrac{${ft(i)}}{1 - ${ft(1 + i)}^{-${n - 1}}} = ${ft(a)}\) €`
          : T`Année 1 : on paie seulement \(${ft(D * i)}\) € d'intérêts, puis \(a = ${D} \times \dfrac{${ft(i)}}{1 - ${ft(1 + i)}^{-${n - 1}}} = ${ft(a)}\) €`,
      });
    },
    () => {
      const D = rnd(5, 30) * 10000, i = pick([3, 4, 5, 6, 7]) / 100, n = pick([4, 5, 6]), t = rnd(2, n);
      const crd = D - (t - 1) * D / n;
      return num({
        q: `Emprunt de ${eur(D, 0)} sur ${n} ans en amortissement constant. Quel est le capital restant dû au <strong>début</strong> de l'année ${t} ?`,
        ok: crd, ko: [D - t * D / n, D - (t - 1) * annuity(D, i, n), D / n], fmt: eur,
        expl: T`\(CRD = ${D} - ${t - 1} \times \frac{${D}}{${n}} = ${ft(crd)}\) €`,
      });
    },
    () => {
      const D = rnd(5, 20) * 10000, i = .05, n = 4, fr = rnd(1, 4) * 1000, as = pick([.002, .003, .005]);
      const a = annuity(D, i, n), flux = a + as * D;
      return num({
        q: `Emprunt de ${eur(D, 0)} à 5 % sur 4 ans en annuités constantes, avec des frais de dossier de ${eur(fr, 0)} en t = 0 et une assurance de ${pct(as, 1)} par an du capital initial. Quel est le flux décaissé chaque année ?`,
        ok: flux, ko: [a, a + fr / n + as * D, a + as * a], fmt: eur,
        expl: T`\(a = ${ft(a)}\) ; assurance \(= ${pt(as, 1)} \times ${D} = ${ft(as * D)}\) → flux \(= ${ft(flux)}\) €. Les frais de dossier jouent en t = 0 : l'entreprise reçoit ${f(D - fr, 0)} €.`,
      });
    },
  ],
  concepts: [
    { q: 'Sans frais et avec des flux annuels, le TAE d\'un emprunt au taux nominal de 5 %…', ok: 'vaut 5 % quelle que soit la modalité de remboursement', ko: ['est plus élevé en in fine', 'est plus faible en amortissement constant', 'dépend de la durée'], expl: 'La modalité change les annuités et le coût total, pas le TAE.' },
    { q: 'Avec des frais de dossier fixes en t = 0, quelle modalité a le TAE le plus élevé ?', ok: 'L\'amortissement constant', ko: ['L\'in fine', 'Les annuités constantes', 'Elles ont toutes le même TAE'], expl: 'Le capital est remboursé le plus vite : les frais fixes pèsent sur un capital × durée plus faible. L\'in fine a le TAE le plus faible.' },
    { q: 'Quelle modalité coûte le plus en intérêts totaux ?', ok: 'In fine', ko: ['Amortissement constant', 'Annuités constantes', 'Elles coûtent toutes la même chose'], expl: 'En in fine, on garde tout le capital jusqu\'au bout : les intérêts sont maximaux (n × D × i).' },
    { q: 'Une start-up à la trésorerie très tendue devrait privilégier…', ok: 'l\'in fine', ko: ['l\'amortissement constant', 'les annuités constantes', 'un remboursement anticipé'], expl: 'Les premières échéances ne contiennent que les intérêts : ce sont les plus faibles sorties de trésorerie au départ.' },
    { q: 'En amortissement constant, les annuités sont…', ok: 'décroissantes', ko: ['constantes', 'croissantes', 'nulles jusqu\'à la dernière année'], expl: 'L\'amortissement est fixe et les intérêts baissent avec le CRD : l\'annuité diminue.' },
    { q: 'En annuités constantes, la part de capital remboursé chaque année…', ok: 'augmente', ko: ['diminue', 'est constante', 'est nulle la première année'], expl: 'Les intérêts baissent avec le CRD, donc la part d\'amortissement (a − intérêts) augmente : A_t = A₁(1+i)^(t−1).' },
    { q: 'Le risque de crédit désigne…', ok: 'le risque de défaillance de la contrepartie (ou de dégradation de sa qualité de crédit)', ko: ['le risque de variation des taux dans l\'économie', 'le risque que la banque manque de liquidités', 'le risque d\'inflation'], expl: 'C\'est le risque majeur : le non-paiement d\'une annuité, ou la hausse de la probabilité de défaut.' },
    { q: 'Le risque de taux…', ok: 'touche les taux des nouveaux emprunts et la valeur des anciens', ko: ['ne concerne que les emprunts à taux variable', 'est le risque de défaut de l\'emprunteur', 'n\'existe pas pour les banques'], expl: 'Une variation des taux de marché change le coût des nouveaux emprunts et la valeur des dettes existantes.' },
    { q: 'Une entreprise est liquide mais insolvable. Cela signifie que…', ok: 'elle peut payer ses échéances, mais la valeur de son actif est inférieure à sa dette', ko: ['elle ne peut pas payer ses échéances', 'elle n\'a aucune dette', 'sa trésorerie est négative'], expl: 'Liquidité = capacité à payer maintenant ; solvabilité = actif ≥ dette.' },
    { q: 'Le principe de l\'intermédiation bancaire est…', ok: 'collecter des dépôts liquides pour faire des prêts longs et illiquides', ko: ['émettre des obligations sur le marché', 'acheter des actions pour ses clients', 'prêter uniquement à court terme'], expl: 'La banque transforme des dépôts exigibles à tout moment en prêts à long terme.' },
    { q: 'Différé total d\'un an : à la fin de l\'année 1, la dette vaut…', ok: T`\(D_0 (1+i)\)`, ko: [T`\(D_0\)`, T`\(D_0 (1 - i)\)`, T`\(D_0 + D_0 \times i \times n\)`], expl: 'On ne paie rien : les intérêts sont capitalisés.' },
  ],
});

/* =====================================================================
 * NIVEAU 6 — OBLIGATIONS
 * ===================================================================== */
LEVELS.push({
  id: 6,
  title: 'Obligations',
  short: 'Zéro-coupon, prix et TRA, pair, primes, coupon couru',
  cours: T`
<h2>1. Définitions</h2>
<p>Une obligation est un titre de dette émis et négociable sur un marché financier : une créance sur l'émetteur. En l'achetant, on <strong>devient prêteur</strong> (dette désintermédiée, sans banque). Maturité d'origine ≥ 1 an (en dessous, ce sont des <em>titres monétaires</em>).</p>
<ul>
<li><strong>Marché primaire</strong> : émission, c'est là que l'argent entre pour la première fois. <strong>Marché secondaire</strong> : le « marché d'occasion », où le détenteur peut revendre l'obligation à un nouveau prix.</li>
<li>La majorité des obligations s'échangent de <strong>gré à gré</strong> (accord entre deux acteurs) et sont gardées jusqu'à l'échéance.</li>
<li><strong>Nominal</strong> (N) : montant facial ; coupons et remboursement s'expriment en % du nominal (voir le prospectus).</li>
<li><strong>Valeur d'émission</strong> (VE) : ce que paie l'acheteur et reçoit l'émetteur. <strong>Valeur de remboursement</strong> (VR) : ce qui est remboursé in fine.</li>
<li><strong>Coupon</strong> : \(C = \text{taux de coupon} \times N\), en général annuel en France et en Europe.</li>
<li>Distinguer maturité d'origine et maturité résiduelle.</li>
</ul>

<h2>2. Valorisation</h2>
<div class="formula"><div class="label">Zéro-coupon</div>
\[ P_0 = \frac{VR}{(1 + TRA)^n} \qquad TRA = \left(\frac{VR}{P_0}\right)^{1/n} - 1 \]</div>
<div class="formula"><div class="label">Obligation couponnée (même principe que la VAN)</div>
\[ P_0 = \sum_{t=1}^{n} \frac{C}{(1+TRA)^t} + \frac{VR}{(1+TRA)^n} = C \times \frac{1-(1+TRA)^{-n}}{TRA} + \frac{VR}{(1+TRA)^n} \]</div>
<p>Le <strong>TRA</strong> (taux de rendement actuariel, ou YTM) est le TRI de l'obligation : la rentabilité annuelle si on la garde jusqu'à l'échéance, que les paiements sont faits et que les coupons sont réinvestis à ce taux. C'est le rendement que <strong>le marché exige aujourd'hui</strong>.</p>
<div class="box tip"><strong>Relation inverse</strong>Si les taux montent, le prix baisse (d'où les ventes massives d'obligations quand les taux montent). Les obligations « cotent en taux » parce que c'est plus lisible qu'un prix.</div>

<h2>3. Pair, coupon et TRA (si VR = 100 % du nominal)</h2>
${htmlTable(['Situation', 'Prix', 'Pourquoi'], [['Coupon = TRA', 'Au pair (100 %)', 'Elle paie exactement le rendement exigé'], ['Coupon &gt; TRA', 'Au-dessus du pair (surcote)', 'Elle paie plus que nécessaire : elle coûte plus cher'], ['Coupon &lt; TRA', 'En dessous du pair (décote)', 'Elle paie trop peu pour son risque : elle coûte moins cher']])}
<p>Exemple du prof : émise au pair avec un coupon de 4 %, puis l'émetteur devient moins risqué et le TRA tombe à 2 % : l'obligation cote au-dessus du pair. Une entreprise proche de la faillite (TRA de 15 à 18 %, coupon d'environ 3 %) voit ses obligations à ~80 % du pair.</p>
<div class="box trap"><strong>Attention</strong>Cette règle ne marche que si VR = 100 % du nominal. Sinon, il faut refaire le calcul.</div>

<h2>4. Extensions</h2>
<ul>
<li><strong>Convergence vers la VR (pull to par)</strong> : quel que soit son prix actuel, le prix tend vers la VR à l'échéance (sauf défaut). La courbe n'est pas une droite. Si VR = 120 %, le prix converge vers 1 200 €. Si le TRA change en route, le prix se « promène » mais revient à la VR. Ce n'est pas « sans risque » : il reste le risque de crédit et le risque de taux si on revend avant la fin.</li>
<li><strong>Prime d'émission</strong> : émise sous le pair (ex. à 95 % d'1 M€ : l'entreprise reçoit 950 000 € mais doit toujours 1 M€). <strong>Prime de remboursement</strong> : remboursée au-dessus du pair (110 % → 1,1 M€). Elles sont indépendantes. Bien réglées, coupon / prime d'émission / prime de remboursement peuvent donner le même TRA : on compare toujours les obligations par leur <strong>TRA</strong>.</li>
<li><strong>Coupon variable</strong> : taux de référence (Euribor 3 mois, SOFR ; ex-Libor, abandonné après le scandale de 2012) + spread de crédit (selon la note). Il <strong>réduit le risque de taux</strong> : le prix reste proche du nominal.</li>
<li><strong>Indexée sur l'inflation</strong> : le taux de coupon est fixe, c'est le <strong>nominal qui est indexé</strong> (\(N_t = N_0 \times \text{coef}\)), donc coupons et VR suivent l'inflation.</li>
<li><strong>Fréquence</strong> : avec m coupons par an sur N années, on verse m × N coupons de C/m (formule pas à retenir pour l'examen ; le marché utilise le taux proportionnel TRA/m).</li>
</ul>

<h2>5. Prix pied de coupon et coupon couru</h2>
<div class="formula"><div class="label">Prix de la transaction</div>
\[ \text{Prix coupon couru (dirty)} = \text{Prix pied de coupon (clean, coté)} + \frac{\text{jours écoulés}}{\text{jours de la période}} \times C \]</div>
<p>Conventions : <strong>exact/exact</strong> (vrais jours, 365 ou 366) ou <strong>30/360</strong> (30 jours par mois, 360 par an). On cote en pied de coupon, car comparer des prix coupon couru serait impossible (dates et fréquences différentes). Le prix coupon couru fait des « dents de scie » au-dessus du prix pied de coupon.</p>
<div class="box tip"><strong>Exemple du cours</strong>N = 1 000 €, coupon 5 % le 1ᵉʳ janvier, transaction le 1ᵉʳ juillet 2026 : 31+28+31+30+31+30 = 181 jours → coupon couru = 181/365 × 50 = <strong>24,79 €</strong> (en 30/360 : 180/360 × 50 = 25 €).</div>
`,
  exemple: () => T`
<h2>TD 5 · Obligations</h2>
<h3>Ex. 1 : zéro-coupon, N = 1 000 €, 5 ans</h3>
<div class="step"><div class="n">1</div><div>À 4 % : \(P_0 = 1000/1{,}04^5 =\) <span class="ans">821,93 €</span></div></div>
<div class="step"><div class="n">2</div><div>4 mois plus tard à 800 € (il reste 56 mois) : \(TRA = (1000/800)^{12/56} - 1 =\) <span class="ans">4,90 %</span>. Rendement réalisé si on vend : \(800/821{,}93 - 1 =\) <span class="ans">−2,67 %</span> en 4 mois.</div></div>
<div class="step"><div class="n">3</div><div>Le prix d'un zéro-coupon est inférieur au nominal tant que TRA &gt; 0 : il n'y a aucun coupon, toute la rémunération vient de la décote.</div></div>
<h3>Ex. 2 : N = 1 000 €, coupon 5 %, 4 ans, au pair</h3>
${htmlTable(['TRA', '3 %', '5 %', '7 %'], [['Prix', '1 074,34 €', '1 000,00 €', '932,26 €'], ['Situation', 'Au-dessus du pair', 'Au pair', 'En dessous du pair']])}
<p>Règle fondamentale : <strong>quand les taux montent, le prix baisse</strong>.</p>
<h3>Ex. 3 : coupon 4,5 %, 10 ans, VR = 1 040 €</h3>
<div class="step"><div class="n">1</div><div>C = 45 €. À 3,5 % : \(45 \times \frac{1-1{,}035^{-10}}{0{,}035} + \frac{1040}{1{,}035^{10}} =\) <span class="ans">1 111,52 €</span></div></div>
<div class="step"><div class="n">2</div><div>Remboursée au pair, le prix serait plus faible (<span class="ans">1 083,17 €</span>) : on reçoit moins à la fin.</div></div>
<div class="step"><div class="n">3</div><div>À 4,70 % et au pair : coupon &lt; TRA → sous le pair (<span class="ans">984,33 €</span>) ; avec la prime : <span class="ans">1 009,60 €</span>.</div></div>
<h2>TD 6 · Partie 4 : obligation comparable</h2>
<p>N = 1 000 €, coupon 6,5 %, 5 ans, au pair, TRA = 6 % : \(P_0 = 65 \times \frac{1-1{,}06^{-5}}{0{,}06} + \frac{1000}{1{,}06^5} =\) <span class="ans">1 021,06 €</span> → surcote (coupon &gt; TRA). Émise à 95 % et remboursée à 110 % : \(950 = \sum \frac{65}{(1+x)^t} + \frac{1100}{(1+x)^5}\) → <span class="ans">TRA ≈ 9,46 %</span>.</p>
`,
  gen: [
    () => {
      const N = 1000, r = rnd(15, 70, 5) / 1000, n = rnd(2, 10);
      const P = N / Math.pow(1 + r, n);
      return num({
        q: `Une obligation zéro-coupon de nominal 1 000 €, remboursée au pair dans ${n} ans. Le TRA exigé est de ${pct(r, 1)}. Quel est son prix ?`,
        ok: P, ko: [N / (1 + r * n), N * Math.pow(1 + r, -(n - 1)), N * (1 - r * n)], fmt: eur,
        expl: T`\(P_0 = \dfrac{1000}{${ft(1 + r, 3)}^{${n}}} = ${ft(P)}\) €`,
      });
    },
    () => {
      const N = 1000, n = rnd(2, 8), P = rnd(60, 95) * 10;
      const tra = Math.pow(N / P, 1 / n) - 1;
      return num({
        q: `Un zéro-coupon de nominal 1 000 € (remboursé au pair) à ${n} ans cote ${eur(P, 0)}. Quel est son TRA ?`,
        ok: tra, ko: [(N / P - 1) / n, N / P - 1, Math.pow(P / N, 1 / n) - 1 + 0.1], fmt: pct,
        expl: T`\(TRA = \left(\dfrac{1000}{${P}}\right)^{1/${n}} - 1 = ${pt(tra)}\)`,
      });
    },
    () => {
      const N = 1000, c = rnd(2, 8) / 100, n = rnd(3, 6), r = rnd(1, 9) / 100;
      const P = bondPrice(c * N, N, r, n);
      return num({
        q: `Obligation : nominal 1 000 €, coupon ${pct(c, 0)} annuel, ${n} ans, remboursée au pair. TRA = ${pct(r, 0)}. Quel est son prix ?`,
        ok: P, ko: [bondPrice(c * N, N, c, n) + (c === r ? 50 : 0), pvAnnuity(c * N, r, n), c * N * n + N / Math.pow(1 + r, n), N * (1 + (c - r) * n)], fmt: eur,
        expl: T`\(P_0 = ${c * N} \times \dfrac{1 - ${ft(1 + r)}^{-${n}}}{${ft(r)}} + \dfrac{1000}{${ft(1 + r)}^{${n}}} = ${ft(P)}\) € (${c > r ? 'coupon > TRA : au-dessus du pair' : c < r ? 'coupon < TRA : en dessous du pair' : 'coupon = TRA : au pair'})`,
      });
    },
    () => {
      const N = 1000, c = rnd(30, 60, 5) / 1000, n = rnd(4, 10), r = rnd(25, 60, 5) / 1000, vr = pick([1020, 1040, 1050, 1100]);
      const P = bondPrice(c * N, vr, r, n);
      return num({
        q: `Nominal 1 000 €, coupon ${pct(c, 1)}, maturité ${n} ans, remboursement à ${eur(vr, 0)}. TRA = ${pct(r, 1)}. Quel est le prix ?`,
        ok: P, ko: [bondPrice(c * N, N, r, n), bondPrice(c * vr, vr, r, n), pvAnnuity(c * N, r, n) + vr], fmt: eur,
        expl: T`\(P_0 = ${ft(c * N, 0)} \times \dfrac{1 - ${ft(1 + r, 3)}^{-${n}}}{${ft(r, 3)}} + \dfrac{${vr}}{${ft(1 + r, 3)}^{${n}}} = ${ft(P)}\) €. Le coupon reste calculé sur le nominal, pas sur la VR.`,
      });
    },
    () => {
      const C = pick([30, 40, 50, 60]), m = rnd(2, 12), d = rnd(1, 28), conv = pick(['exact/exact', '30/360']);
      const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const exact = months.slice(0, m - 1).reduce((a, b) => a + b, 0) + d - 1;
      const days = conv === '30/360' ? (m - 1) * 30 + (d - 1) : exact, base = conv === '30/360' ? 360 : 365;
      const cc = days / base * C;
      const other = conv === '30/360' ? exact / 365 * C : ((m - 1) * 30 + d - 1) / 360 * C;
      const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'][m - 1];
      return num({
        q: `Une obligation verse un coupon annuel de ${eur(C, 0)} chaque 1ᵉʳ janvier. Transaction le ${d === 1 ? '1ᵉʳ' : d} ${mois} 2026, convention <strong>${conv}</strong>. Quel est le coupon couru ?`,
        ok: cc, ko: [other, C - cc, (days + 1) / base * C], fmt: eur,
        expl: T`Jours écoulés depuis le 1ᵉʳ janvier : ${days} ${conv === '30/360' ? '(30 jours par mois)' : '(vrais jours, année 2026 de 365 jours)'} → \(\frac{${days}}{${base}} \times ${C} = ${ft(cc)}\) €`,
      });
    },
    () => {
      const N = 1000, clean = rnd(920, 1080) / 1000, C = pick([30, 40, 50]), days = rnd(30, 330);
      const dirty = clean * N + days / 365 * C;
      return num({
        q: `Une obligation (N = 1 000 €) cote ${pct(clean, 1)} pied de coupon. Coupon annuel de ${eur(C, 0)}, ${days} jours écoulés depuis le dernier (exact/exact, 365 j). Quel prix l'acheteur paie-t-il ?`,
        ok: dirty, ko: [clean * N, clean * N - days / 365 * C, clean * N + C], fmt: eur,
        expl: T`\(\text{Prix} = ${ft(clean * N)} + \frac{${days}}{365} \times ${C} = ${ft(dirty)}\) € (prix coupon couru = prix de la transaction).`,
      });
    },
    () => {
      const N = 1000, c = rnd(3, 8) / 100, vr = pick([1000, 1000, 1050]), P = rnd(95, 102) * 10;
      const tra = (c * N + vr) / P - 1;
      return num({
        q: `Obligation à 1 an : coupon ${pct(c, 0)} sur un nominal de 1 000 €, remboursée ${eur(vr, 0)}, prix actuel ${eur(P, 0)}. Quel est son TRA ?`,
        ok: tra, ko: [c, (c * N + vr) / N - 1, c * N / P], fmt: pct,
        expl: T`\(P = \frac{C + VR}{1 + TRA} \Rightarrow TRA = \frac{${c * N} + ${vr}}{${P}} - 1 = ${pt(tra)}\)`,
      });
    },
    () => {
      const nb = rnd(1, 10) * 1000, N = 1000, e = pick([.95, .96, .97, .98]);
      const rec = nb * N * e;
      return num({
        q: `Une entreprise émet ${f(nb, 0)} obligations de nominal 1 000 € à ${pct(e, 0)} du pair. Combien encaisse-t-elle ?`,
        ok: rec, ko: [nb * N, nb * N * (1 - e), nb * N * (2 - e)], fmt: (x) => eur(x, 0),
        expl: T`Elle encaisse \(${ft(nb, 0)} \times 1000 \times ${pt(e, 0)} = ${ft(rec, 0)}\) €, mais sa dette reste de ${eur(nb * N, 0)} (prime d'émission).`,
      });
    },
    () => {
      const N0 = 1000, c = rnd(1, 4) / 100, coef = 1 + rnd(5, 60) / 1000;
      const C = c * N0 * coef;
      return num({
        q: `Une obligation indexée sur l'inflation : nominal initial 1 000 €, taux de coupon fixe ${pct(c, 0)}, coefficient d'indexation ${f(coef, 3)}. Quel est le coupon versé ?`,
        ok: C, ko: [c * N0, (c + coef - 1) * N0, c * coef], fmt: eur,
        expl: T`Le nominal est indexé : \(N = 1000 \times ${ft(coef, 3)} = ${ft(N0 * coef)}\) ; coupon \(= ${pt(c, 0)} \times ${ft(N0 * coef)} = ${ft(C)}\) €`,
      });
    },
  ],
  concepts: [
    { q: 'Si les taux d\'intérêt de marché augmentent, le prix des obligations à taux fixe existantes…', ok: 'baisse', ko: ['augmente', 'ne change pas', 'converge immédiatement vers le nominal'], expl: 'Relation inverse taux / prix : le TRA monte, les flux sont plus actualisés, le prix baisse.' },
    { q: 'Une obligation remboursée au pair a un taux de coupon supérieur à son TRA. Elle cote…', ok: 'au-dessus du pair', ko: ['au pair', 'en dessous du pair', 'impossible à dire'], expl: 'Elle paie plus que ce que le marché exige : elle doit coûter plus cher (surcote).' },
    { q: 'Le TRA d\'une obligation est…', ok: 'le taux de rendement que le marché exige aujourd\'hui (le TRI de l\'obligation)', ko: ['le taux de coupon', 'le taux fixé à l\'émission pour toute la vie du titre', 'le taux de référence Euribor'], expl: 'C\'est le TRI des flux de l\'obligation au prix actuel : il change quand le prix change.' },
    { q: 'À l\'approche de l\'échéance, le prix d\'une obligation (sans défaut)…', ok: 'converge vers sa valeur de remboursement', ko: ['converge vers zéro', 'converge vers son prix d\'émission', 'reste égal à son prix actuel'], expl: 'C\'est le « pull to par » : à l\'échéance, il ne reste que la VR à recevoir.' },
    { q: 'Une prime d\'émission signifie que…', ok: 'l\'obligation est émise sous le pair : l\'entreprise reçoit moins, mais doit toujours le nominal', ko: ['l\'obligation est remboursée au-dessus du pair', 'le coupon est plus élevé', 'l\'investisseur paie plus que le nominal'], expl: 'Ex. émise à 95 % : 950 000 € encaissés pour 1 M€ de dette.' },
    { q: 'Un coupon variable est égal à…', ok: 'un taux de référence (Euribor, SOFR) + un spread de crédit', ko: ['le TRA de l\'émission + l\'inflation', 'un taux fixe indexé sur le CAC 40', 'le taux de coupon divisé par la fréquence'], expl: 'Il est recalculé à chaque coupon avec les conditions de marché.' },
    { q: 'Le principal intérêt d\'une obligation à taux variable est de…', ok: 'réduire le risque de taux (le prix reste proche du nominal)', ko: ['supprimer le risque de crédit', 'garantir un coupon élevé', 'rembourser au-dessus du pair'], expl: 'Le coupon suit les taux de marché, donc il reste proche du TRA.' },
    { q: 'Dans une obligation indexée sur l\'inflation…', ok: 'le taux de coupon est fixe et c\'est le nominal qui est indexé', ko: ['le taux de coupon suit l\'inflation, le nominal est fixe', 'seul le dernier coupon est indexé', 'le prix d\'émission est indexé'], expl: 'Coupons et VR se calculent en % du nominal indexé : ils suivent donc l\'inflation.' },
    { q: 'Le prix coté d\'une obligation est…', ok: 'le prix pied de coupon (clean price)', ko: ['le prix coupon couru (dirty price)', 'la valeur de remboursement', 'la valeur nominale'], expl: 'On cote en pied de coupon ; on paie le prix coupon couru (pied de coupon + coupon couru).' },
    { q: 'Un titre de dette de maturité d\'origine inférieure à 1 an est…', ok: 'un titre monétaire', ko: ['une obligation', 'une action', 'un zéro-coupon long'], expl: 'Une obligation a une maturité d\'origine d\'au moins 1 an.' },
    { q: 'Le marché secondaire est…', ok: 'le marché d\'occasion, où l\'on revend des obligations déjà émises', ko: ['le marché où la dette est émise pour la première fois', 'un marché réservé aux banques centrales', 'le marché des titres monétaires'], expl: 'Le marché primaire est celui de l\'émission ; le secondaire est celui de la revente.' },
    { q: 'La plupart des obligations s\'échangent…', ok: 'de gré à gré', ko: ['sur des marchés organisés cotés', 'uniquement à l\'émission', 'via les banques centrales'], expl: 'Le cours précise que la majorité des obligations s\'échangent de gré à gré, pas sur des marchés organisés.' },
    { q: 'La règle « coupon vs TRA » pour savoir si l\'obligation cote au pair n\'est valable que si…', ok: 'la valeur de remboursement est égale à 100 % du nominal', ko: ['l\'obligation est un zéro-coupon', 'le TRA est positif', 'la maturité est inférieure à 5 ans'], expl: 'Avec une prime de remboursement, il faut refaire le calcul.' },
    { q: 'Quelle convention compte 30 jours par mois et 360 jours par an ?', ok: '30/360', ko: ['exact/exact', 'exact/360', '30/365'], expl: '30/360 : 30 jours par mois, 360 par an. Exact/exact : les vrais jours (année bissextile de 366 jours).' },
  ],
});

/* =====================================================================
 * NIVEAU 7 — SYNTHÈSE (Projet Alpha)
 * ===================================================================== */
LEVELS.push({
  id: 7,
  title: 'Cas de synthèse',
  short: 'Projet Alpha : FCF → VAN/TRI → dette bancaire → obligation',
  synthese: true,
  cours: T`
<p>Le TD 6 enchaîne tout le programme : c'est le format le plus proche d'un examen. Lis la correction dans l'onglet <strong>TD corrigé</strong>, puis fais le quiz : il mélange des questions de tous les niveaux.</p>
<div class="box tip"><strong>Le fil rouge</strong><ul>
<li><strong>Business plan</strong> : CA → EBE → RE → NOPAT → + DAP − ΔBFR → OCF → − CAPEX → FCF (récupération du BFR la dernière année).</li>
<li><strong>Décision</strong> : VAN au coût du capital, TRI, IP / DRCI comme critères alternatifs.</li>
<li><strong>Financement bancaire</strong> : 3 tableaux d'amortissement, choix selon la trésorerie.</li>
<li><strong>Financement obligataire</strong> : prix d'une obligation comparable, surcote ou décote, primes et TRA.</li></ul></div>
<div class="box trap"><strong>Checklist anti-erreurs</strong><ul>
<li>Le BFR de l'année 1 est constitué en entier : ΔBFR₁ = BFR₁.</li>
<li>L'IS se calcule sur le RE (pas sur l'EBE), sans les intérêts.</li>
<li>VAN : n'oublie pas \(-I_0\) en t = 0.</li>
<li>Intérêts = CRD <em>début</em> de période × taux.</li>
<li>Coupon = taux de coupon × <em>nominal</em> (pas × prix, ni × VR).</li></ul></div>
`,
  exemple: () => {
    const CA = [800, 1000, 1200, 1200, 1200], EBE = CA.map(c => .3 * c), RE = EBE.map(e => e - 200), NOP = RE.map(r => r * .75);
    const BFR = CA.map(c => .1 * c), dB = BFR.map((b, i) => b - (i ? BFR[i - 1] : 0)), rec = [0, 0, 0, 0, 120];
    const FCF = NOP.map((x, i) => x + 200 - dB[i] + rec[i]);
    const r = (l, a, d = 0) => [l, ...a.map(x => f(x, d))];
    const H = ['Année', 'CRD début', 'Intérêts', 'Amort.', 'Annuité'];
    const tb = (t) => htmlTable(H, loanTable(600, .07, 5, t).map(x => [x.t, f(x.crd), f(x.int), f(x.am), f(x.ann)]));
    return T`
<h2>TD 6 · Rhône-Équipements, Projet Alpha (k€)</h2>
<h3>Partie 1 : Free Cash Flows</h3>
<p>Investissement 1 000, amorti linéairement sur 5 ans (DAP = 200). EBE = 30 % du CA, BFR = 10 % du CA, IS 25 %.</p>
${htmlTable(['', '1', '2', '3', '4', '5'], [r('CA', CA), r('EBE (30 %)', EBE), r('RE = EBE − 200', RE), r('NOPAT (× 0,75)', NOP), r('+ DAP', [200, 200, 200, 200, 200]), r('BFR (10 % CA)', BFR), r('− ΔBFR', dB), r('+ récup. BFR', rec), r('FCF', FCF)], true)}
<h3>Partie 2 : décision à k = 8 %</h3>
<div class="step"><div class="n">1</div><div>\(VAN = -1000 + \frac{150}{1{,}08} + \frac{255}{1{,}08^2} + \frac{300}{1{,}08^3} + \frac{320}{1{,}08^4} + \frac{440}{1{,}08^5} =\) <span class="ans">+130,3 k€</span> → projet accepté.</div></div>
<div class="step"><div class="n">2</div><div>TRI (Excel) ≈ <span class="ans">12,13 %</span> &gt; 8 %.</div></div>
<div class="step"><div class="n">3</div><div>Critères alternatifs : IP = 1 130,3 / 1 000 = <span class="ans">1,13</span> ; DRCI : cumul −850, −595, −295, +25 → récupéré pendant l'année 4 (≈ 3 + 295/320 = <span class="ans">3,92 ans</span>).</div></div>
<h3>Partie 3 : emprunt de 600 k€ à 7 % sur 5 ans</h3>
<p><strong>A : amortissement constant</strong></p>${tb('ac')}
<p><strong>B : annuités constantes</strong> (a = 146,33)</p>${tb('an')}
<p><strong>C : in fine</strong></p>${tb('if')}
<p>Pour minimiser les sorties de la 1ʳᵉ année : <strong>l'in fine</strong> (42 k€ contre 146,33 et 162).</p>
<h3>Partie 4 : obligation comparable</h3>
<p>N = 1 000, coupon 6,5 %, 5 ans, au pair, TRA = 6 % : \(P = 65 \times \frac{1 - 1{,}06^{-5}}{0{,}06} + \frac{1000}{1{,}06^5} =\) <span class="ans">1 021,06 €</span> → <strong>surcote</strong> : le coupon (6,5 %) est supérieur au rendement exigé (6 %).</p>
<p>Émission à 95 % (950 €) et remboursement à 110 % (1 100 €), coupon 65 € : \(950 = \sum_{t=1}^{5} \frac{65}{(1+x)^t} + \frac{1100}{(1+x)^5}\) → <span class="ans">TRA ≈ 9,46 %</span>. Plus attractif pour l'investisseur, mais bien plus cher pour l'entreprise.</p>`;
  },
  gen: [],
  concepts: [],
});
