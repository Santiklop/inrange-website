(function () {
  "use strict";

  // ---------- State ----------
  const STATS_KEY = "oecd-quiz-stats";
  const root = document.getElementById("quiz-root");
  const banner = document.getElementById("quiz-banner");
  const modalRoot = document.getElementById("quiz-modal-root");
  if (!root || !banner || !modalRoot) {
    console.error("quiz.js: missing mount points");
    return;
  }
  if (!Array.isArray(globalThis.QUIZ_POOL)) {
    console.error("quiz.js: QUIZ_POOL not loaded");
    return;
  }
  const POOL = globalThis.QUIZ_POOL;

  let session = null;  // { mode: 'sprint'|'deathrun', queue, index, answers, ... }

  // ---------- DOM helper (mirrors the chapter pages) ----------
  function el(tag, props, ...children) {
    const node = document.createElement(tag);
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v == null || v === false) continue;
        if (k === "class") node.className = v;
        else if (k === "attrs") for (const [ak, av] of Object.entries(v)) node.setAttribute(ak, av);
        else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
        else node.setAttribute(k, v);
      }
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return node;
  }

  // ---------- Hero mode ----------
  function setHeroMode(mode) {
    const hero = document.querySelector(".hero--quiz");
    if (!hero) return;
    hero.dataset.mode = mode || "landing";
    if (!mode) {
      hero.innerHTML =
        '<h1>Ready to play?</h1>' +
        '<p class="lead">Sprint through five random questions for a quick gut-check — ' +
        'or push your luck on a Death Run streak that ends the second you miss one. ' +
        'Pick your poison.</p>';
    } else if (mode === "sprint") {
      hero.innerHTML = '<h1><span class="hero--quiz__emoji">🏃</span> Sprint</h1>';
    } else if (mode === "deathrun") {
      hero.innerHTML = '<h1><span class="hero--quiz__emoji">💀</span> Death Run</h1>';
    }
  }

  // ---------- localStorage ----------
  function loadStats() {
    try { return JSON.parse(localStorage.getItem(STATS_KEY)) || {}; } catch { return {}; }
  }
  function saveStats(stats) {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch {}
  }

  // ---------- Fisher-Yates ----------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---------- renderLanding ----------
  function renderLanding(opts) {
    setHeroMode(null);
    banner.innerHTML = "";
    root.innerHTML = "";
    modalRoot.innerHTML = "";

    if (opts.streakHint) {
      banner.appendChild(el("p", { class: "quiz-banner-msg" },
        el("strong", {}, "Someone got " + opts.streakHint + " in a row."),
        " Can you beat them?"
      ));
    }

    const stats = loadStats();
    const bestSprint = stats.bestSprint || 0;
    const bestStreak = stats.bestStreak || 0;

    const sprintCard = el("button",
      {
        class: "quiz-mode-card",
        onClick: () => startSprint(),
      },
      el("div", { class: "quiz-mode-card__eyebrow" }, "5 questions"),
      el("div", { class: "quiz-mode-card__title" }, "Sprint"),
      el("p", { class: "quiz-mode-card__body" }, "Five random questions drawn from across all six chapters. Score yourself out of 5; come back tomorrow.")
    );

    const deathRunCard = el("button",
      {
        class: "quiz-mode-card quiz-mode-card--deathrun",
        onClick: () => startDeathRun(),
      },
      el("div", { class: "quiz-mode-card__eyebrow" }, "Streak until you miss"),
      el("div", { class: "quiz-mode-card__title" }, "Death Run"),
      el("p", { class: "quiz-mode-card__body" }, "Random questions, one at a time. The first wrong answer ends the run. Share your streak when you're done.")
    );

    // Order: if a deep link suggests Death Run, put it first.
    const order = (opts.modeHint === "deathrun" || opts.streakHint)
      ? [deathRunCard, sprintCard]
      : [sprintCard, deathRunCard];

    root.appendChild(el("section", { class: "quiz-landing" },
      el("p", { class: "quiz-landing__intro" },
        `Pick a mode. Questions are drawn at random from the ${POOL.length} worked examples on the chapter pages.`
      ),
      el("div", { class: "quiz-modes" }, ...order),
      (bestSprint || bestStreak) ? el("p", { class: "quiz-bests" },
        "Your bests on this browser — ",
        el("strong", {}, "Sprint " + bestSprint + "/5"),
        "  ·  ",
        el("strong", {}, "Longest streak " + bestStreak)
      ) : null
    ));

    if (opts.modeHint === "sprint")   startSprint();
    if (opts.modeHint === "deathrun") startDeathRun();
  }

  // ---------- renderQuestion ----------
  function renderQuestion(q, opts) {
    root.innerHTML = "";

    // Shuffle the MCQ options at render time; remember which shuffled index is correct.
    const shuffledOrder = shuffle(q.mcq.map((_, i) => i));
    const shuffledOptions = shuffledOrder.map(i => q.mcq[i]);
    const correctShuffledIdx = shuffledOrder.indexOf(q.correctIdx);

    const card = el("article", { class: "quiz-card" });

    // Source tag
    card.appendChild(el("div", { class: "quiz-card__meta" },
      q.source + " · Example " + q.caseId
    ));

    // Case title
    card.appendChild(el("h2", { class: "quiz-card__title" }, q.caseTitle));

    // Timeline
    if (Array.isArray(q.timeline) && q.timeline.length) {
      card.appendChild(el("p", { class: "quiz-card__section-label" }, "How we got here"));
      const ol = el("ol", { class: "quiz-card__timeline" });
      for (const item of q.timeline) ol.appendChild(el("li", {}, item));
      card.appendChild(ol);
    }

    // Scenario facts
    card.appendChild(el("p", { class: "quiz-card__section-label" }, "Now consider"));
    card.appendChild(el("div", { class: "quiz-card__facts" }, q.facts));

    // Question
    card.appendChild(el("p", { class: "quiz-card__question" }, q.question));

    // MCQ
    const mcqList = el("div", { class: "oecd-mcq" });
    const buttons = shuffledOptions.map((text, idx) => {
      const b = el("button", {
        class: "oecd-mcq__option",
        type: "button",
        onClick: () => onAnswer(idx),
      }, text);
      mcqList.appendChild(b);
      return b;
    });
    card.appendChild(mcqList);

    // Reveal mount + Next mount (populated after answer)
    const revealMount = el("div", {});
    const nextMount = el("div", { class: "quiz-card__next" });
    card.appendChild(revealMount);
    card.appendChild(nextMount);

    // Chip (Sprint progress or streak)
    if (opts.chip) {
      card.appendChild(opts.chip);
    }

    root.appendChild(card);
    window.scrollTo({ top: 0, behavior: "instant" });

    function onAnswer(chosenIdx) {
      const isCorrect = chosenIdx === correctShuffledIdx;

      // Mark options
      buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctShuffledIdx) btn.dataset.result = "correct";
        else if (i === chosenIdx)      btn.dataset.result = "wrong";
        else                            btn.dataset.result = "dim";
      });

      // Reveal block — shown regardless of right/wrong
      const reveal = el("div", { class: "quiz-card__reveal" },
        el("div", { class: "quiz-card__reveal-label" },
          isCorrect ? rotatingLabel(CORRECT_LABELS) : rotatingLabel(WRONG_LABELS),
          q.verdict ? el("span", { class: "quiz-card__reveal-verdict" }, q.verdict) : null
        ),
        el("div", { class: "quiz-card__reveal-body" }, q.analysis)
      );
      revealMount.appendChild(reveal);

      // Next button
      const nextBtn = el("button", {
        type: "button",
        onClick: () => opts.onNext(isCorrect),
      }, "Next →");
      nextMount.appendChild(nextBtn);
    }
  }

  const CORRECT_LABELS = ["Correct!", "Got it.", "Right.", "Nailed it."];
  const WRONG_LABELS   = ["Not this time.", "Close.", "Read again.", "Almost."];
  function rotatingLabel(pool) {
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ---------- Sprint state machine ----------
  function startSprint() {
    setHeroMode("sprint");
    session = {
      mode: "sprint",
      queue: shuffle(POOL).slice(0, 5),
      index: 0,
      answers: [],   // { id, source, chapterShort, isCorrect }
    };
    renderSprintQuestion();
  }

  function renderSprintQuestion() {
    const q = session.queue[session.index];
    const chip = el("div", { class: "quiz-card__chip" },
      "Sprint  " + (session.index + 1) + "/5"
    );
    renderQuestion(q, {
      chip,
      onNext: (wasCorrect) => {
        session.answers.push({
          id: q.id, source: q.source, chapterShort: q.chapterShort, isCorrect: wasCorrect
        });
        session.index += 1;
        if (session.index >= 5) showSprintResult();
        else renderSprintQuestion();
      },
    });
  }

  // ---------- Death Run state machine ----------
  function startDeathRun() {
    setHeroMode("deathrun");
    session = {
      mode: "deathrun",
      queue: shuffle(POOL),
      index: 0,
      streak: 0,
    };
    renderDeathRunQuestion();
  }

  function renderDeathRunQuestion() {
    // Wrap-around if we've somehow exhausted the pool
    if (session.index >= session.queue.length) {
      session.queue = shuffle(POOL);
      session.index = 0;
    }
    const q = session.queue[session.index];

    const streakNumber = el("span", {}, String(session.streak));
    // Milestone pulse at 3, 5, 10, 20, 50
    if ([3, 5, 10, 20, 50].includes(session.streak)) {
      streakNumber.style.transform = "scale(1.4)";
      setTimeout(() => { streakNumber.style.transform = ""; }, 380);
    }
    const chip = el("div", { class: "quiz-card__chip quiz-card__chip--streak" },
      "🔥 ", streakNumber
    );

    renderQuestion(q, {
      chip,
      onNext: (wasCorrect) => {
        if (wasCorrect) {
          session.streak += 1;
          session.index += 1;
          renderDeathRunQuestion();
        } else {
          // Audit-complete beat, then result
          const overlay = el("div", { class: "quiz-gameover", attrs: { "data-show": "false" } },
            "Audit complete."
          );
          document.body.appendChild(overlay);
          requestAnimationFrame(() => overlay.dataset.show = "true");
          setTimeout(() => {
            overlay.remove();
            showDeathRunResult();
          }, 700);
        }
      },
    });
  }

  // ---------- Sprint result ----------
  const SPRINT_MESSAGES = {
    0: [
      "0/5. Don't worry — we won't tell your spouse.",
      "0/5. Don't worry — we won't tell your boss.",
    ],
    1: [
      "1/5. You got lucky it's not 0/1.",
      "1/5. Better than 0 — but that's still terrible tbh.",
    ],
    2: [
      "2/5. Just below random guessing. We won't judge.",
      "2/5. The tax authority would ask follow-up questions.",
    ],
    3: [
      "3/5. Politicians get elected on less.",
      "3/5. You're in the inter-quartile range — congrats? 🤷",
    ],
    4: [
      "4/5. Comfortably defensible. The one you missed is going to haunt you.",
      "4/5. So close. The tax authority would let this slide.",
    ],
    5: [
      "5/5. Flawless. The OECD wants to hire you.",
      "5/5. Perfect — either you've read the Guidelines or you've memorised our quiz.",
    ],
  };

  function showSprintResult() {
    const score = session.answers.filter(a => a.isCorrect).length;
    const messages = SPRINT_MESSAGES[score];
    const message = messages[Math.floor(Math.random() * messages.length)];

    // Persist best
    const stats = loadStats();
    if (score > (stats.bestSprint || 0)) {
      stats.bestSprint = score;
      saveStats(stats);
    }

    // Per-question badges
    const badges = session.answers.map(a => el("span", {
      class: "quiz-modal__badge quiz-modal__badge--" + (a.isCorrect ? "right" : "wrong"),
    }, a.chapterShort.replace("Chapter ", ""), a.isCorrect ? " ✓" : " ✗"));

    const tryDeathRunPrimary = score >= 4;

    const playAgainBtn = el("button", {
      class: "quiz-modal__btn" + (tryDeathRunPrimary ? "" : " quiz-modal__btn--primary"),
      type: "button",
      onClick: () => { closeModal(); startSprint(); },
    }, "Play again");

    const deathRunBtn = el("button", {
      class: "quiz-modal__btn" + (tryDeathRunPrimary ? " quiz-modal__btn--primary" : ""),
      type: "button",
      onClick: () => { closeModal(); startDeathRun(); },
    }, "Try Death Run");

    const actionsOrder = tryDeathRunPrimary ? [deathRunBtn, playAgainBtn] : [playAgainBtn, deathRunBtn];

    showModal({
      bigNumber: score + " / 5",
      sub: "Sprint",
      message,
      breakdown: badges,
      shareKind: "sprint",
      shareValue: score,
      actions: actionsOrder,
    });
  }

  // ---------- Death Run result ----------
  function deathRunMessage(streak) {
    if (streak === 0)  return "0. Did you even read the question?";
    if (streak <= 2)   return "OECD won't hire you for sure!";
    if (streak <= 4)   return "3+. Could be worse. Could be much better.";
    if (streak <= 9)   return "You're warming up — try again!";
    if (streak <= 14)  return "Double digits. Are you working at the OECD?";
    if (streak <= 19)  return "15+. Now that's a defensible position.";
    if (streak <= 29)  return "20+. You've outlasted most TP partners on a Friday afternoon.";
    if (streak <= 49)  return "30+. The OECD wants to cite you. The questions don't get easier from here.";
    if (streak <= 79)  return "We didn't expect anyone to reach this point!";
    return                    "Please send me a screenshot — I'll hang it in my office!";
  }

  function showDeathRunResult() {
    const streak = session.streak;
    const message = deathRunMessage(streak);

    const stats = loadStats();
    if (streak > (stats.bestStreak || 0)) {
      stats.bestStreak = streak;
      saveStats(stats);
    }

    const lowStreak = streak <= 2;

    const playAgainBtn = el("button", {
      class: "quiz-modal__btn" + (lowStreak ? "" : " quiz-modal__btn--primary"),
      type: "button",
      onClick: () => { closeModal(); startDeathRun(); },
    }, "Play again");

    const sprintBtn = el("button", {
      class: "quiz-modal__btn" + (lowStreak ? " quiz-modal__btn--primary" : ""),
      type: "button",
      onClick: () => { closeModal(); startSprint(); },
    }, lowStreak ? "Go warm up with Sprint" : "Switch to Sprint");

    const actionsOrder = lowStreak ? [sprintBtn, playAgainBtn] : [playAgainBtn, sprintBtn];

    showModal({
      bigNumber: "🔥 " + streak + " 🔥",
      bigFire: true,
      sub: streak === 1 ? "1 in a row" : streak + " in a row",
      message,
      shareKind: "deathrun",
      shareValue: streak,
      actions: actionsOrder,
    });
  }

  // ---------- Modal ----------
  function closeModal() {
    modalRoot.innerHTML = "";
  }

  function showModal(opts) {
    modalRoot.innerHTML = "";
    const backdrop = el("div", { class: "quiz-modal-backdrop", attrs: { "data-show": "false" } });
    const modal = el("div", { class: "quiz-modal" });

    modal.appendChild(el("button", {
      class: "quiz-modal__close",
      type: "button",
      "aria-label": "Close",
      onClick: () => { closeModal(); renderLanding({ streakHint: null, modeHint: null }); },
    }, "×"));

    modal.appendChild(el("div", {
      class: "quiz-modal__big-number" + (opts.bigFire ? " quiz-modal__big-number--fire" : ""),
    }, opts.bigNumber));

    modal.appendChild(el("div", { class: "quiz-modal__sub" }, opts.sub));

    modal.appendChild(el("p", { class: "quiz-modal__message" }, opts.message));

    if (opts.breakdown && opts.breakdown.length) {
      modal.appendChild(el("div", { class: "quiz-modal__breakdown" }, ...opts.breakdown));
    }

    // Share buttons
    modal.appendChild(buildShareButtons(opts.shareKind, opts.shareValue));

    // Action buttons
    modal.appendChild(el("div", { class: "quiz-modal__actions" }, ...opts.actions));

    backdrop.appendChild(modal);
    modalRoot.appendChild(backdrop);
    requestAnimationFrame(() => backdrop.dataset.show = "true");
  }

  function buildShareButtons(kind, value) {
    const isStreak = kind === "deathrun";
    const url = isStreak
      ? "https://www.inrange.nl/Quiz/?streak=" + value
      : "https://www.inrange.nl/Quiz/";

    const subject = isStreak ? "OECD TP Death Run" : "OECD TP Sprint";
    const result = isStreak
      ? value + " right answers in a row"
      : value + "/5 right answers";
    const linkedinText =
      "I'm proud to announce that I've just completed this " + subject + ". " +
      "My result is " + result + ". " +
      "Thanks to my parents, spouse and children for supporting my training! " +
      url;

    const linkedinShareHref =
      "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);

    // Build the LinkedIn icon SVG inline so the namespace is correct.
    const liIcon = (() => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "currentColor");
      svg.setAttribute("aria-hidden", "true");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z");
      svg.appendChild(path);
      return svg;
    })();

    const linkedinBtn = el("button", {
      class: "quiz-modal__share-btn",
      type: "button",
      onClick: async (e) => {
        const btn = e.currentTarget;
        const labelSpan = btn.querySelector(".quiz-modal__share-btn-label");
        const originalLabel = labelSpan.textContent;
        try {
          await navigator.clipboard.writeText(linkedinText);
          labelSpan.textContent = "Text copied — paste it in LinkedIn";
        } catch {
          labelSpan.textContent = "Couldn't copy — paste manually";
        }
        window.open(linkedinShareHref, "_blank", "noopener,noreferrer");
        setTimeout(() => { labelSpan.textContent = originalLabel; }, 2400);
      },
    },
      liIcon,
      el("span", { class: "quiz-modal__share-btn-label" }, "Share on LinkedIn")
    );

    const copyBtn = el("button", {
      class: "quiz-modal__share-btn",
      type: "button",
      onClick: async (e) => {
        const btn = e.currentTarget;
        const labelSpan = btn.querySelector(".quiz-modal__share-btn-label");
        const originalLabel = labelSpan.textContent;
        const text = isStreak
          ? "I just got " + value + " OECD TP questions right in a row on the inRange Open Practice quiz. Can you beat me? " + url
          : "I scored " + value + "/5 on the inRange Open Practice OECD TP quiz. Take it: " + url;
        try {
          if (navigator.share) {
            await navigator.share({ title: "OECD TP Quiz", text, url });
            return;
          }
        } catch (err) {
          if (err && err.name !== "AbortError") console.warn("share failed", err);
        }
        try {
          await navigator.clipboard.writeText(text);
          labelSpan.textContent = "Copied!";
        } catch {
          labelSpan.textContent = "Couldn't copy";
        }
        setTimeout(() => { labelSpan.textContent = originalLabel; }, 1600);
      },
    },
      "🔗 ",
      el("span", { class: "quiz-modal__share-btn-label" }, "Copy link")
    );

    return el("div", { class: "quiz-modal__share" }, linkedinBtn, copyBtn);
  }

  // shareResult is now inlined inside showModal — see buildShareButtons.

  // ---------- Boot ----------
  const params = new URLSearchParams(location.search);
  const streakHint = parseInt(params.get("streak") || "", 10);
  const modeHint = params.get("mode");  // 'sprint' | 'deathrun'
  renderLanding({
    streakHint: Number.isFinite(streakHint) && streakHint > 0 ? streakHint : null,
    modeHint,
  });
})();
