// Routeur, pages et moteur de quiz.
const app = document.getElementById('app');
const PASS = 0.7;           // seuil de validation d'un niveau
const LETTERS = 'ABCD';
let timerId = null;

const state = store.load();
state.best = state.best || {};
const save = () => store.save(state);

const renderMath = (el) => {
  if (window.renderMathInElement) {
    renderMathInElement(el, {
      delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }],
      throwOnError: false,
      strict: false,
    });
  }
};
const show = (html) => { app.innerHTML = html; renderMath(app); window.scrollTo(0, 0); };

const passed = (id) => (state.best[id] || 0) >= PASS;
const unlocked = (id) => state.free || id === 1 || passed(id - 1);
const examUnlocked = () => state.free || passed(LEVELS.length);

/* ---------- Construction des questions ---------- */
const sample = (pool, k) => {
  let out = [];
  while (out.length < k && pool.length) out = out.concat(shuffle(pool));
  return out.slice(0, k);
};
const build = (lvl, item) => ({ ...(typeof item === 'function' ? item() : concept(item)), level: lvl.id });
const levelQuestions = (lvl, nNum, nCon) => [
  ...sample(lvl.gen, nNum).map(g => build(lvl, g)),
  ...sample(lvl.concepts, nCon).map(c => build(lvl, c)),
];
function quizFor(lvl) {
  if (lvl.synthese) return shuffle(LEVELS.filter(l => !l.synthese).flatMap(l => levelQuestions(l, 2, 0)));
  return shuffle(levelQuestions(lvl, 6, 4));
}
const examQuestions = () => LEVELS.filter(l => !l.synthese).flatMap(l => shuffle(levelQuestions(l, 3, 2)));

/* ---------- Pages ---------- */
function home() {
  const done = LEVELS.filter(l => passed(l.id)).length;
  const cards = LEVELS.map(l => {
    const best = state.best[l.id], ok = passed(l.id), open = unlocked(l.id);
    const status = !open ? '🔒 Valide le niveau précédent' : best == null ? 'À commencer' : ok ? `✓ Validé · meilleur score ${Math.round(best * 100)} %` : `Meilleur score ${Math.round(best * 100)} % · objectif 70 %`;
    return `<a class="card level-card ${ok ? 'done' : ''} ${open ? '' : 'locked'}" href="#/niveau/${l.id}/cours">
      <div class="num">${ok ? '✓' : l.id}</div><h3>${l.title}</h3><p>${l.short}</p><div class="status">${status}</div></a>`;
  }).join('');
  const ex = state.examBest;
  show(`
    <div class="hero">
      <div><h1>Prépare ton QCM de finance</h1>
      <p class="lead">7 niveaux, chacun avec le cours, le TD corrigé et un quiz. Valide un niveau avec 70 % pour débloquer le suivant, puis passe l'examen blanc.</p></div>
      <div class="card stats"><p>Progression : ${done} / ${LEVELS.length} niveaux</p>
        <div class="progress"><div style="width:${done / LEVELS.length * 100}%"></div></div>
        <p style="margin-top:10px">Examen blanc : ${ex == null ? 'pas encore tenté' : `meilleure note ${f(ex * 20, 1)} / 20`}</p></div>
    </div>
    <div class="grid">${cards}
      <a class="card level-card final-card ${examUnlocked() ? '' : 'locked'}" href="#/examen">
        <div class="num">★</div><h3>Examen blanc</h3><p>30 questions, 45 minutes, tous les chapitres. Correction détaillée à la fin.</p>
        <div class="status">${examUnlocked() ? 'Disponible' : '🔒 Valide les 7 niveaux'}</div></a>
    </div>
    <h2>Comment réviser avec ce site</h2>
    <div class="content"><ul>
      <li><strong>Cours</strong> : toutes les formules à connaître, les méthodes et les pièges.</li>
      <li><strong>TD corrigé</strong> : la correction pas à pas des TD 1 à 6.</li>
      <li><strong>Quiz</strong> : 10 questions avec des valeurs tirées au hasard. Chaque nouvelle tentative donne de nouveaux chiffres, et chaque réponse est expliquée.</li>
      <li>Le <a href="#/formulaire">formulaire</a> regroupe toutes les formules sur une page, pour la relecture de la veille.</li>
    </ul></div>
    <p class="row" style="margin-top:20px"><button class="btn ghost" id="free">${state.free ? 'Revenir au parcours guidé' : 'Débloquer tous les niveaux'}</button>
    ${Object.keys(state.best).length || ex != null ? '<button class="btn ghost" id="reset">Effacer ma progression</button>' : ''}</p>`);
  document.getElementById('free').onclick = () => { state.free = !state.free; save(); home(); };
  const r = document.getElementById('reset');
  if (r) r.onclick = () => { if (confirm('Effacer tous tes scores ?')) { state.best = {}; delete state.examBest; save(); home(); } };
}

function levelPage(id, tab) {
  const lvl = LEVELS.find(l => l.id === id);
  if (!lvl) return home();
  if (!unlocked(id)) {
    return show(`<a class="crumb" href="#/">← Parcours</a><h1>Niveau ${id} verrouillé</h1>
      <p class="lead">Valide d'abord le niveau ${id - 1} avec au moins 70 %.</p><a class="btn" href="#/niveau/${id - 1}/quiz">Aller au niveau ${id - 1}</a>`);
  }
  const tabs = [['cours', 'Cours'], ['exemple', 'TD corrigé'], ['quiz', 'Quiz']]
    .map(([k, v]) => `<a href="#/niveau/${id}/${k}" class="${tab === k ? 'active' : ''}">${v}</a>`).join('');
  const head = `<a class="crumb" href="#/">← Parcours</a><h1>Niveau ${id} · ${lvl.title}</h1><p class="lead">${lvl.short}</p><div class="tabs">${tabs}</div>`;
  if (tab === 'quiz') return quizIntro(lvl, head);
  const body = tab === 'exemple' ? lvl.exemple() : lvl.cours;
  const next = tab === 'exemple'
    ? `<a class="btn" href="#/niveau/${id}/quiz">Passer au quiz →</a>`
    : `<a class="btn" href="#/niveau/${id}/exemple">Voir le TD corrigé →</a> <a class="btn ghost" href="#/niveau/${id}/quiz">Aller au quiz</a>`;
  show(`${head}<div class="content">${body}</div><p class="row" style="margin-top:28px">${next}</p>`);
}

function quizIntro(lvl, head) {
  const n = lvl.synthese ? 12 : 10;
  const best = state.best[lvl.id];
  show(`${head}<div class="card">
    <h2 style="margin-top:0">Quiz · ${n} questions</h2>
    <p>${lvl.synthese ? 'Questions de calcul tirées de tous les chapitres, pour vérifier que tout est solide avant l\'examen.' : '6 questions de calcul et 4 questions de cours.'} Les valeurs changent à chaque tentative. Il faut <strong>70 %</strong> pour valider le niveau.</p>
    ${best != null ? `<p>Ton meilleur score : <strong>${Math.round(best * 100)} %</strong></p>` : ''}
    <p class="row"><button class="btn" id="go">Commencer</button></p>
    <p style="color:var(--muted);font-size:14px">Prévois une calculatrice et un brouillon, comme le jour de l'examen.</p></div>`);
  document.getElementById('go').onclick = () => practice(lvl, quizFor(lvl));
}

/* ---------- Quiz d'entraînement (correction immédiate) ---------- */
function questionHTML(q, i, total, extraHead = '') {
  const lvl = LEVELS.find(l => l.id === q.level);
  return `<div class="quiz-head"><span>Question ${i + 1} / ${total} <span class="chip">${lvl.title}</span></span>${extraHead}</div>
    <div class="progress" style="margin-bottom:16px"><div style="width:${i / total * 100}%"></div></div>
    <div class="card"><div class="quiz-q">${q.q}</div>
    <div class="options">${q.options.map((o, k) => `<button class="opt" data-k="${k}"><span class="letter">${LETTERS[k]}</span><span>${o}</span></button>`).join('')}</div>
    <div id="after"></div></div>`;
}

function practice(lvl, qs) {
  const answers = [];
  const step = (i) => {
    if (i >= qs.length) return practiceResult(lvl, qs, answers);
    const q = qs[i];
    show(`<a class="crumb" href="#/niveau/${lvl.id}/cours">← Niveau ${lvl.id} · ${lvl.title}</a>` + questionHTML(q, i, qs.length));
    app.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const k = +b.dataset.k, good = k === q.answer;
      answers[i] = k;
      app.querySelectorAll('.opt').forEach(x => {
        x.disabled = true;
        if (+x.dataset.k === q.answer) x.classList.add('correct');
        else if (+x.dataset.k === k) x.classList.add('wrong');
      });
      const after = document.getElementById('after');
      after.innerHTML = `<div class="feedback ${good ? 'ok' : 'ko'}"><div class="verdict">${good ? 'Bonne réponse' : `Raté : la bonne réponse est ${LETTERS[q.answer]}`}</div><div class="expl">${q.expl}</div></div>
        <button class="btn" id="next">${i + 1 < qs.length ? 'Question suivante →' : 'Voir mon score'}</button>`;
      renderMath(after);
      document.getElementById('next').onclick = () => step(i + 1);
      document.getElementById('next').focus();
    });
  };
  step(0);
}

function practiceResult(lvl, qs, answers) {
  const good = qs.filter((q, i) => answers[i] === q.answer).length, s = good / qs.length;
  const wasPassed = passed(lvl.id);
  state.best[lvl.id] = Math.max(state.best[lvl.id] || 0, s); save();
  const ok = s >= PASS;
  const nextLvl = LEVELS.find(l => l.id === lvl.id + 1);
  const wrong = qs.map((q, i) => ({ q, a: answers[i] })).filter(x => x.a !== x.q.answer);
  show(`<a class="crumb" href="#/niveau/${lvl.id}/cours">← Niveau ${lvl.id} · ${lvl.title}</a>
    <div class="card"><div class="score-big ${ok ? 'pass' : 'fail'}">${good} / ${qs.length}</div>
    <p><strong>${Math.round(s * 100)} %</strong> · ${ok ? (wasPassed ? 'Niveau déjà validé, bien joué.' : 'Niveau validé ! Le suivant est débloqué.') : 'Pas encore 70 %. Relis les corrections ci-dessous, puis relance un quiz : les chiffres seront différents.'}</p>
    <p class="row"><button class="btn ${ok ? 'ghost' : ''}" id="again">Nouveau quiz</button>
    ${ok && nextLvl ? `<a class="btn" href="#/niveau/${nextLvl.id}/cours">Niveau ${nextLvl.id} : ${nextLvl.title} →</a>` : ''}
    ${ok && !nextLvl ? '<a class="btn" href="#/examen">Passer l\'examen blanc →</a>' : ''}
    <a class="btn ghost" href="#/niveau/${lvl.id}/cours">Revoir le cours</a></p></div>
    ${wrong.length ? `<h2>À retravailler (${wrong.length})</h2>` + wrong.map(x => reviewItem(x.q, x.a)).join('') : ''}`);
  document.getElementById('again').onclick = () => practice(lvl, quizFor(lvl));
}

function reviewItem(q, a) {
  const lvl = LEVELS.find(l => l.id === q.level);
  return `<div class="review-item"><span class="chip">${lvl.title}</span><div class="quiz-q" style="margin-top:6px">${q.q}</div>
    <p class="your">${a == null ? '<span class="fail">Pas de réponse</span>' : `Ta réponse : <span class="${a === q.answer ? 'pass' : 'fail'}">${LETTERS[a]}. ${q.options[a]}</span>`}<br>
    Bonne réponse : <span class="pass">${LETTERS[q.answer]}. ${q.options[q.answer]}</span></p>
    <div class="expl box tip">${q.expl}</div></div>`;
}

/* ---------- Examen blanc ---------- */
function examIntro() {
  if (!examUnlocked()) {
    return show(`<h1>Examen blanc</h1><p class="lead">Il se débloque quand les 7 niveaux sont validés. Tu peux aussi tout débloquer depuis la page Parcours.</p><a class="btn" href="#/">Retour au parcours</a>`);
  }
  show(`<h1>Examen blanc</h1><p class="lead">Conditions réelles : 30 questions sur tous les chapitres, 45 minutes, pas de correction avant la fin. Tu peux naviguer entre les questions et changer tes réponses.</p>
    <div class="card"><ul><li>5 questions par chapitre (3 calculs, 2 questions de cours)</li><li>1 point par bonne réponse, pas de points négatifs</li><li>Note sur 20 et bilan par chapitre à la fin</li></ul>
    ${state.examBest != null ? `<p>Ta meilleure note : <strong>${f(state.examBest * 20, 1)} / 20</strong></p>` : ''}
    <button class="btn" id="go">Lancer le chrono</button></div>`);
  document.getElementById('go').onclick = () => exam(examQuestions());
}

function exam(qs) {
  const answers = new Array(qs.length).fill(null);
  const end = Date.now() + 45 * 60 * 1000;
  let cur = 0;
  const submit = () => { clearInterval(timerId); timerId = null; examResult(qs, answers); };
  const tick = () => {
    const left = Math.max(0, end - Date.now()), el = document.getElementById('timer');
    if (el) {
      el.textContent = `${String(Math.floor(left / 60000)).padStart(2, '0')}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`;
      el.classList.toggle('low', left < 5 * 60000);
    }
    if (left <= 0) submit();
  };
  const render = () => {
    const q = qs[cur];
    show(questionHTML(q, cur, qs.length, '<span>⏱ <span class="timer" id="timer"></span></span>') + `
      <div class="row" style="margin-top:14px;justify-content:space-between">
        <span class="row"><button class="btn ghost" id="prev" ${cur ? '' : 'disabled'}>← Précédente</button>
        <button class="btn ghost" id="nxt" ${cur < qs.length - 1 ? '' : 'disabled'}>Suivante →</button></span>
        <button class="btn" id="submit">Rendre la copie</button></div>
      <div class="palette">${qs.map((_, k) => `<button data-k="${k}" class="${answers[k] != null ? 'answered' : ''} ${k === cur ? 'current' : ''}">${k + 1}</button>`).join('')}</div>`);
    tick();
    app.querySelectorAll('.opt').forEach(b => {
      if (+b.dataset.k === answers[cur]) b.classList.add('selected');
      b.onclick = () => { answers[cur] = +b.dataset.k; if (cur < qs.length - 1) { cur++; } render(); };
    });
    document.getElementById('prev').onclick = () => { cur--; render(); };
    document.getElementById('nxt').onclick = () => { cur++; render(); };
    app.querySelectorAll('.palette button').forEach(b => b.onclick = () => { cur = +b.dataset.k; render(); });
    document.getElementById('submit').onclick = () => {
      const blank = answers.filter(a => a == null).length;
      if (!blank || confirm(`Il te reste ${blank} question(s) sans réponse. Rendre quand même ?`)) submit();
    };
  };
  clearInterval(timerId);
  timerId = setInterval(tick, 1000);
  render();
}

function examResult(qs, answers) {
  const good = qs.filter((q, i) => answers[i] === q.answer).length, s = good / qs.length;
  state.examBest = Math.max(state.examBest || 0, s); save();
  const bars = LEVELS.filter(l => !l.synthese).map(l => {
    const idx = qs.map((q, i) => i).filter(i => qs[i].level === l.id);
    const g = idx.filter(i => answers[i] === qs[i].answer).length, r = g / idx.length;
    return `<div class="bar-row"><span>${l.title}</span><div class="progress"><div style="width:${r * 100}%;background:${r >= PASS ? 'var(--ok)' : 'var(--ko)'}"></div></div><span>${g}/${idx.length}</span></div>`;
  }).join('');
  const weak = LEVELS.filter(l => !l.synthese).filter(l => {
    const idx = qs.map((q, i) => i).filter(i => qs[i].level === l.id);
    return idx.filter(i => answers[i] === qs[i].answer).length / idx.length < PASS;
  });
  const note = s * 20;
  show(`<h1>Résultat de l'examen blanc</h1>
    <div class="card"><div class="score-big ${s >= .5 ? 'pass' : 'fail'}">${f(note, 1)} / 20</div>
    <p>${good} bonnes réponses sur ${qs.length}. ${note >= 16 ? 'Excellent, tu es prêt(e) pour le jour J.' : note >= 12 ? 'Solide ! Retravaille les chapitres en rouge et refais un examen.' : note >= 10 ? 'C\'est la moyenne, mais il reste des points faibles : cible les chapitres en rouge.' : 'Reprends les chapitres en rouge (cours + quiz), puis retente un examen.'}</p>
    <div class="bars">${bars}</div>
    ${weak.length ? `<p style="margin-top:12px">À revoir en priorité : ${weak.map(l => `<a href="#/niveau/${l.id}/cours">${l.title}</a>`).join(', ')}</p>` : ''}
    <p class="row"><button class="btn" id="again">Nouvel examen</button><a class="btn ghost" href="#/formulaire">Relire le formulaire</a></p></div>
    <h2>Correction complète</h2>${qs.map((q, i) => reviewItem(q, answers[i])).join('')}`);
  document.getElementById('again').onclick = () => exam(examQuestions());
}

/* ---------- Formulaire ---------- */
function formulaire() {
  const F = (label, tex) => `<div class="formula"><div class="label">${label}</div>${tex}</div>`;
  show(`<h1>Formulaire</h1><p class="lead">Toutes les formules du cours, à relire la veille de l'examen.</p><div class="content">
  <h2>1 · Flux de trésorerie</h2>
  ${F('CAF additive', T`\[CAF = RN + DAP - Rep - PCEA + VCEAC - QPSI\]`)}
  ${F('CAF soustractive', T`\[CAF = EBE - \text{charges fi} - IS\]`)}
  ${F('BFR', T`\[BFR = Stocks + Créances - Dettes\ d'exploitation \qquad FTE = CAF - \Delta BFR\]`)}
  ${F('Investissement', T`\[FTI = PCEA - CAPEX \qquad CAPEX = \Delta Immo_{nettes} + DAP + VNC_{cédées} - Rep\]`)}
  ${F('Disponible et financement', T`\[FTD = FTE + FTI \qquad FTF = \Delta Capital + \Delta Subv_{131} - Div + \Delta Dettes_{fi}\]`)}
  ${F('Dividendes', T`\[Div_N = Résultat_{N-1} + Réserves_{N-1} - Réserves_N\]`)}
  ${F('Bouclage', T`\[\Delta Tréso = FTE + FTI + FTF \qquad Dette\ nette = Dettes_{fi} - Tréso \qquad Désendettement = FTD + \Delta CP - Div\]`)}
  <h2>2 · Business plan</h2>
  ${F('Du CA au FCF', T`\[RE = EBE - DAP \quad NOPAT = RE(1-t) \quad OCF = NOPAT + DAP - \Delta BFR \quad FCF = OCF - CAPEX\]`)}
  ${F('BFR normatif', T`\[BFR_t = x\% \times CA_t \qquad \text{jours de CA} = x\% \times 360\]`)}
  <h2>3 · Valeur temps</h2>
  ${F('Capitalisation / actualisation', T`\[V_n = V_0(1+r)^n \qquad V_0 = \frac{V_n}{(1+r)^n} \qquad r = \left(\frac{V_n}{V_0}\right)^{1/n} - 1\]`)}
  ${F('Taux équivalent', T`\[r_m = (1+r)^{1/12} - 1\]`)}
  ${F('Annuités', T`\[VA = a\,\frac{1-(1+r)^{-n}}{r} \qquad a = VA\,\frac{r}{1-(1+r)^{-n}}\]`)}
  <h2>4 · Critères d'investissement</h2>
  ${F('VAN et TRI', T`\[VAN = -I_0 + \sum_{t=1}^n \frac{CF_t}{(1+k)^t} \qquad VAN(TRI) = 0\]`)}
  ${F('TRI sur 2 ans', T`\[X = \frac{1}{1+TRI}: \; CF_2X^2 + CF_1X - I_0 = 0 \Rightarrow X = \frac{-CF_1 + \sqrt{CF_1^2 + 4CF_2I_0}}{2CF_2}\]`)}
  ${F('IP, DRCI, VAE', T`\[IP = \frac{VA}{I_0} = \frac{VAN + I_0}{I_0} \qquad DRCI = (t-1) + \frac{reste}{CF_t} \qquad VAE = VAN\,\frac{k}{1-(1+k)^{-n}}\]`)}
  ${F('Fisher', T`<p>Taux où \(VAN_A = VAN_B\) : TRI des flux \(B - A\).</p>`)}
  <h2>5 · Dette bancaire</h2>
  ${F('Toujours', T`\[Intérêts_t = CRD_{début} \times i \qquad Annuité = Intérêts + Amortissement\]`)}
  ${F('Amortissement constant', T`\[A = \frac{D_0}{n} \qquad Annuité_t = \frac{D_0}{n} + \Big(D_0 - (t-1)\frac{D_0}{n}\Big)\, i \qquad \Sigma\, Int = D_0\, i\, \frac{n+1}{2}\]`)}
  ${F('Annuités constantes', T`\[a = D_0\,\frac{i}{1-(1+i)^{-n}} \qquad A_1 = a - D_0 i \qquad A_t = A_1(1+i)^{t-1} \qquad \frac{Int_n}{a} = \frac{i}{1+i}\]`)}
  ${F('In fine', T`\[Annuité_{1..n-1} = D_0 i \qquad Annuité_n = D_0(1+i) \qquad \Sigma\, Int = n D_0 i\]`)}
  ${F('Différés (sur n − 1 ans ensuite)', T`\[\text{partiel} : a = D_0\frac{i}{1-(1+i)^{-(n-1)}} \qquad \text{total} : a = D_0(1+i)\frac{i}{1-(1+i)^{-(n-1)}}\]`)}
  ${F('TAE', T`\[D_0 - frais = \sum_t \frac{Annuité_t + assurance_t}{(1+TAE)^t}\]`)}
  <h2>6 · Obligations</h2>
  ${F('Prix', T`\[P_0 = C\,\frac{1-(1+TRA)^{-n}}{TRA} + \frac{VR}{(1+TRA)^n} \qquad C = taux\ de\ coupon \times N\]`)}
  ${F('Zéro-coupon', T`\[P_0 = \frac{VR}{(1+TRA)^n} \qquad TRA = \left(\frac{VR}{P_0}\right)^{1/n} - 1\]`)}
  ${F('Pair (si VR = 100 %)', T`<p>coupon = TRA → au pair · coupon &gt; TRA → au-dessus · coupon &lt; TRA → en dessous</p>`)}
  ${F('Coupon couru', T`\[Prix_{transaction} = Prix_{pied\ de\ coupon} + \frac{jours\ écoulés}{jours\ période} \times C\]`)}
  ${F('Variable / inflation', T`<p>Coupon variable = taux de référence + spread · Indexée : \(N_t = N_0 \times coef\), taux de coupon fixe</p>`)}
  </div>`);
}

/* ---------- Routeur ---------- */
function route() {
  clearInterval(timerId); timerId = null;
  const [page, a, b] = location.hash.replace(/^#\/?/, '').split('/');
  document.querySelectorAll('.topnav a').forEach(x => x.classList.toggle('active', x.dataset.nav === (page || 'home') || (page === 'niveau' && x.dataset.nav === 'home')));
  if (page === 'niveau') return levelPage(+a, ['cours', 'exemple', 'quiz'].includes(b) ? b : 'cours');
  if (page === 'formulaire') return formulaire();
  if (page === 'examen') return examIntro();
  home();
}
window.addEventListener('hashchange', route);
route();
