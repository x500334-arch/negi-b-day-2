/* ==========================================================================
   PREMIUM PINK FAIRY-TALE BIRTHDAY — app.js
   Vanilla JS · no dependencies
   ========================================================================== */

/* ==========================================================================
   ===== PERSONAL CONTENT =====  ← EDIT EVERYTHING IN THIS BLOCK
   ========================================================================== */
const birthdayData = {
  // Her name (shown in the hero heading)
  name: "Birthday Girl",

  // Short intro paragraph under the hero heading
  heroIntro:
    "Tonight the sky is a little more purple, the stars a little more gold, " +
    "and every wish is a little more likely to come true — because it's your day.",

  // The birthday letter. Each item = one paragraph.
  letter: [
    "Dear Birthday Girl,",
    "Another year older, another year more iconic.",
    "I hope this new chapter brings beautiful surprises, peaceful moments, loud laughter, and everything your heart secretly wishes for.",
    "Never stop being wonderfully, uniquely you.",
    "With lots of magic ✦"
  ],

  // "Things That Remind Me of You" cards — icon, title, hint, hidden message
  reminders: [
    { icon: "🧸", title: "Teddy Bear",      hint: "Soft, warm, impossible not to hug.",         message: "Because you make everyone around you feel safe and looked after — exactly like the comfiest teddy in the world." },
    { icon: "🎀", title: "Pink Bow",        hint: "A little extra, always adorable.",           message: "You tie everything together. Every room gets a bit prettier and a bit more fun the moment you walk in." },
    { icon: "🍰", title: "Favourite Treat", hint: "Sweet enough to ruin dinner for.",           message: "Replace me: her favourite dessert and the story of the time you two ate way too much of it." },
    { icon: "🎶", title: "Favourite Song",  hint: "The one you always play twice.",             message: "Replace me: the song she can't stop humming and why it now reminds you of her." },
    { icon: "😂", title: "Funny Habit",     hint: "You know exactly which one.",                message: "Replace me: that tiny hilarious thing she does that you secretly adore." },
    { icon: "🤫", title: "Inside Joke",     hint: "Only two people on Earth get this.",         message: "Replace me: the inside joke. No explanation needed — she'll laugh instantly." }
  ],

  // Message shown after the cake is cut
  cakeMessage: "Wish granted… now let the celebration begin! 🎉💗",

  // Gallery polaroids — image path + caption. Add or remove as many as you like.
  memories: [
    { src: "assets/images/memory1.jpg", caption: "The day it all started" },
    { src: "assets/images/memory2.jpg", caption: "That trip we still talk about" },
    { src: "assets/images/memory3.jpg", caption: "Laughing at nothing" },
    { src: "assets/images/memory4.jpg", caption: "Golden hour, golden you" }
  ],

  // Gift surprise panel
  giftTitle: "You deserve beautiful things ✨",
  giftMessage:
    "This is just a little something to say: thank you for existing, for being you, and for making the world softer.",
  // Optional extras revealed with the gift. Leave any as "" to hide it.
  giftExtra: {
    note: "Your real gift is waiting for you… check your messages 💌",   // personal message
    code: "",                                                              // e.g. "LOVE-2026"
    linkText: "",                                                          // e.g. "Open your surprise →"
    linkUrl: ""                                                            // e.g. "https://..."
  },

  // Final section
  finalMessage:
    "May this year be soft where you need softness, bold where you need courage, and full of the kind of moments you'll want to remember forever.",
  signature: "— with all my love ♡",

  // Optional background music (leave the file out and the site still works)
  music: "assets/audio/birthday-song.mp3",

  // Hero photo
  heroImage: "assets/images/hero.jpg"
};
/* ========================== END PERSONAL CONTENT ========================== */


/* ==========================================================================
   UTILITIES
   ========================================================================== */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const prefersReduced = () => reducedMotion.matches;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Developer conveniences while editing content:
//   index.html?skipintro  → skip the 3-2-1 countdown
//   index.html?showall    → reveal every section immediately (no scroll animation)
const urlFlags = new URLSearchParams(window.location.search);
const SHOW_ALL = urlFlags.has("showall") || document.documentElement.hasAttribute("data-showall");
const SKIP_INTRO = urlFlags.has("skipintro") || SHOW_ALL;

function showToast(msg, duration = 3200) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("is-visible"), duration);
}

/** Mark an <img> wrapper as missing so the placeholder shows instead. */
function watchImage(img, wrapper) {
  const markMissing = () => wrapper.classList.add("is-missing");
  if (img.complete && img.naturalWidth === 0 && img.src) markMissing();
  img.addEventListener("error", markMissing, { once: true });
}


/* ==========================================================================
   CONTENT BINDING
   ========================================================================== */
function bindContent() {
  const d = birthdayData;

  $$('[data-bind="name"]').forEach((el) => (el.textContent = d.name));
  $$('[data-bind="heroIntro"]').forEach((el) => (el.textContent = d.heroIntro));
  $$('[data-bind="giftTitle"]').forEach((el) => (el.textContent = d.giftTitle));
  $$('[data-bind="giftMessage"]').forEach((el) => (el.textContent = d.giftMessage));
  $$('[data-bind="finalMessage"]').forEach((el) => (el.textContent = d.finalMessage));
  $$('[data-bind="signature"]').forEach((el) => (el.textContent = d.signature));
  document.title = `Happy Birthday, ${d.name} ✦`;

  // Letter paragraphs
  const letterBody = $('[data-bind="letter"]');
  if (letterBody) {
    letterBody.innerHTML = "";
    d.letter.forEach((line) => {
      const p = document.createElement("p");
      p.textContent = line;
      letterBody.appendChild(p);
    });
  }

  // Hero image
  const heroImg = $('[data-placeholder="hero"]');
  if (heroImg) {
    heroImg.src = d.heroImage;
    heroImg.alt = d.name;
    watchImage(heroImg, heroImg.parentElement);
  }

  // Music source
  const audio = $("#bg-music");
  if (audio && d.music) audio.src = d.music;

  // Gift extras
  const extra = $("#gift-extra");
  if (extra) {
    extra.innerHTML = "";
    const { note, code, linkText, linkUrl } = d.giftExtra;
    if (note) {
      const p = document.createElement("p");
      p.className = "gift-note";
      p.textContent = note;
      extra.appendChild(p);
    }
    if (code) {
      const span = document.createElement("span");
      span.className = "gift-code";
      span.textContent = code;
      extra.appendChild(span);
    }
    if (linkUrl) {
      const a = document.createElement("a");
      a.className = "btn btn--secondary";
      a.href = linkUrl;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = linkText || "Open your surprise →";
      extra.appendChild(a);
    }
  }
}


/* ==========================================================================
   STARFIELD (lightweight canvas, twinkles slowly)
   ========================================================================== */
function initStars() {
  const canvas = $("#stars-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  let w = 0, h = 0, raf = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    w = canvas.width = Math.floor(window.innerWidth * DPR);
    h = canvas.height = Math.floor(window.innerHeight * DPR);
    const count = Math.min(160, Math.floor((window.innerWidth * window.innerHeight) / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.2 + 0.4) * DPR,
      a: Math.random() * Math.PI * 2,
      s: 0.004 + Math.random() * 0.01,
      gold: Math.random() < 0.25
    }));
    drawFrame(true);
  }

  function drawFrame(staticOnly = false) {
    ctx.clearRect(0, 0, w, h);
    for (const st of stars) {
      st.a += st.s;
      const alpha = 0.35 + Math.sin(st.a) * 0.3;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = st.gold ? `rgba(255,214,140,${alpha})` : `rgba(255,240,250,${alpha})`;
      ctx.fill();
    }
    if (!staticOnly && !prefersReduced()) raf = requestAnimationFrame(() => drawFrame(false));
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  if (!prefersReduced()) raf = requestAnimationFrame(() => drawFrame(false));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (!prefersReduced()) raf = requestAnimationFrame(() => drawFrame(false));
  });
}


/* ==========================================================================
   CONFETTI (single shared canvas, only runs during bursts)
   ========================================================================== */
const Confetti = (() => {
  const canvas = $("#confetti-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const COLORS = ["#ff3d9a", "#ff7ab8", "#ffcf6f", "#a89cff", "#fff4e8", "#e9a93d"];
  let pieces = [];
  let raf = 0;

  function size() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", size, { passive: true });
  size();

  function burst({ count = 120, x = 0.5, y = 0.5, spread = 1, hearts = false } = {}) {
    if (!ctx || prefersReduced()) return;
    const cx = canvas.width * x;
    const cy = canvas.height * y;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 7 + 4) * spread;
      pieces.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 3,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.25,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        heart: hearts && Math.random() < 0.3,
        life: 1
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function drawHeart(p) {
    const s = p.w / 2;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.6);
    ctx.bezierCurveTo(-s, -s * 0.4, -s * 0.5, -s * 1.2, 0, -s * 0.4);
    ctx.bezierCurveTo(s * 0.5, -s * 1.2, s, -s * 0.4, 0, s * 0.6);
    ctx.fill();
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces = pieces.filter((p) => p.life > 0 && p.y < canvas.height + 40);
    for (const p of pieces) {
      p.vy += 0.18;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 0.006;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.heart) drawHeart(p);
      else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (pieces.length) raf = requestAnimationFrame(tick);
    else { raf = 0; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }

  return { burst };
})();


/* ==========================================================================
   1. COUNTDOWN
   ========================================================================== */
async function runCountdown() {
  const overlay = $("#countdown");
  const num = $("#countdown-number");
  const skip = $("#countdown-skip");
  if (!overlay || !num) return;

  if (SKIP_INTRO) { overlay.remove(); return; }

  document.body.classList.add("is-locked");
  let skipped = false;

  const finish = () => {
    if (overlay.classList.contains("is-done")) return;
    overlay.classList.add("is-done");
    document.body.classList.remove("is-locked");
    overlay.setAttribute("aria-hidden", "true");
    revealInViewport();
    setTimeout(() => overlay.remove(), 1600);
  };

  skip.addEventListener("click", () => { skipped = true; finish(); });

  const stepTime = prefersReduced() ? 700 : 1000;

  for (const n of ["3", "2", "1"]) {
    if (skipped) return;
    num.textContent = n;
    num.classList.remove("is-in");
    void num.offsetWidth; // restart animation
    num.classList.add("is-in");
    await wait(stepTime);
  }
  if (skipped) return;

  num.textContent = "SURPRISE!";
  num.classList.remove("is-in");
  num.classList.add("is-surprise");
  Confetti.burst({ count: 160, x: 0.5, y: 0.45, spread: 1.3, hearts: true });
  await wait(1700);
  finish();
}


/* ==========================================================================
   SCROLL REVEAL
   ========================================================================== */
function initReveal() {
  const targets = $$(".reveal, .reminder-card, .polaroid");
  if (SHOW_ALL || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  targets.forEach((t) => io.observe(t));

  // Hero content is always first-screen — never make it wait on the observer
  $$("#hero-section .reveal").forEach((t) => t.classList.add("is-visible"));

  return io;
}

/** Safety net: reveal anything already inside the viewport (e.g. after the countdown). */
function revealInViewport() {
  const vh = window.innerHeight;
  $$(".reveal:not(.is-visible), .reminder-card:not(.is-visible), .polaroid:not(.is-visible)").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) el.classList.add("is-visible");
  });
}


/* ==========================================================================
   2. HERO — Make a Wish
   ========================================================================== */
function initHero() {
  const wishBtn = $("#make-wish-btn");
  const wishes = [
    "Wish sent to the stars ✦ They're on it.",
    "Consider it granted 💗",
    "The universe has received your request ✨",
    "Shhh… don't tell anyone, it'll come true 🤫"
  ];
  let i = 0;
  wishBtn?.addEventListener("click", (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    Confetti.burst({
      count: 50,
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
      spread: 0.7,
      hearts: true
    });
    showToast(wishes[i++ % wishes.length]);
  });
}


/* ==========================================================================
   3. ENVELOPE
   ========================================================================== */
function initEnvelope() {
  const env = $("#envelope");
  const stage = $(".envelope-stage");
  const cta = $("#envelope-cta");
  const paper = $("#letter-paper");
  if (!env) return;

  env.addEventListener("click", () => {
    const open = env.classList.toggle("is-open");
    stage.classList.toggle("is-open", open);
    env.setAttribute("aria-expanded", String(open));
    env.setAttribute("aria-label", open ? "Close the birthday letter" : "Open the birthday letter");
    paper.setAttribute("aria-hidden", String(!open));
    if (cta) cta.textContent = open ? "Tap again to fold it back ✦" : "Click to open ✦";
    if (open) {
      const rect = env.getBoundingClientRect();
      Confetti.burst({
        count: 40,
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: rect.top / window.innerHeight,
        spread: 0.6,
        hearts: true
      });
      setTimeout(() => env.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "center" }), 500);
    }
  });
}


/* ==========================================================================
   4. REMINDER CARDS
   ========================================================================== */
function initReminders() {
  const grid = $("#reminder-grid");
  if (!grid) return;

  birthdayData.reminders.forEach((item, idx) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "reminder-card glass";
    card.setAttribute("aria-expanded", "false");
    card.style.transitionDelay = `${idx * 0.08}s`;

    const icon = document.createElement("span");
    icon.className = "reminder-card__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = item.icon;

    const title = document.createElement("span");
    title.className = "reminder-card__title";
    title.textContent = item.title;

    const hint = document.createElement("p");
    hint.className = "reminder-card__hint";
    hint.textContent = item.hint;

    const msg = document.createElement("p");
    msg.className = "reminder-card__msg";
    msg.textContent = item.message;

    const tap = document.createElement("span");
    tap.className = "reminder-card__tap";
    tap.textContent = "Tap to reveal";

    const shine = document.createElement("span");
    shine.className = "reminder-card__shine";

    card.append(icon, title, hint, msg, tap, shine);

    // 3D tilt following the pointer (desktop only, respects reduced motion)
    card.addEventListener("pointermove", (e) => {
      if (prefersReduced() || e.pointerType === "touch") return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
      card.style.setProperty("--rx", `${(0.5 - py) * 10}deg`);
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    });

    card.addEventListener("click", () => {
      const open = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", String(open));
      tap.textContent = open ? "♡ Tap to hide" : "Tap to reveal";
      // After the reveal transition, clear the stagger delay so hover feels instant
      card.style.transitionDelay = "0s";
    });

    grid.appendChild(card);
  });
}


/* ==========================================================================
   5. CAKE
   ========================================================================== */
function initCake() {
  const cake = $("#cake");
  const btn = $("#cut-cake-btn");
  const msg = $("#cake-message");
  if (!cake || !btn) return;
  let done = false;

  btn.addEventListener("click", async () => {
    if (done) return;
    done = true;
    btn.disabled = true;
    btn.textContent = "Cutting… 🔪";

    cake.classList.add("is-cutting");
    await wait(prefersReduced() ? 200 : 900);
    cake.classList.add("is-cut");
    cake.setAttribute("aria-label", "The cake has been cut and the candle is out");

    const rect = cake.getBoundingClientRect();
    Confetti.burst({
      count: 140,
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height * 0.4) / window.innerHeight,
      spread: 1.1,
      hearts: true
    });

    await wait(400);
    msg.textContent = birthdayData.cakeMessage;
    msg.classList.add("is-visible");
    btn.textContent = "Cake: Cut ✓";
  });
}


/* ==========================================================================
   6. GALLERY + LIGHTBOX
   ========================================================================== */
function initGallery() {
  const gallery = $("#gallery");
  const lightbox = $("#lightbox");
  const lbImg = $("#lightbox-img");
  const lbCap = $("#lightbox-caption");
  const lbClose = $("#lightbox-close");
  if (!gallery) return;

  const rotations = [-3, 2.5, -2, 3, -2.5, 2];
  let lastFocused = null;

  birthdayData.memories.forEach((m, idx) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "polaroid";
    card.style.setProperty("--rot", `${rotations[idx % rotations.length]}deg`);
    card.style.transitionDelay = `${idx * 0.1}s`;
    card.setAttribute("aria-label", `Open photo: ${m.caption}`);

    const tape = document.createElement("span");
    tape.className = "polaroid__tape";
    tape.setAttribute("aria-hidden", "true");

    const wrap = document.createElement("span");
    wrap.className = "polaroid__img-wrap";

    const img = document.createElement("img");
    img.className = "polaroid__img";
    img.src = m.src;
    img.alt = m.caption;
    img.loading = "lazy";
    img.decoding = "async";

    const ph = document.createElement("span");
    ph.className = "photo-placeholder";
    ph.setAttribute("aria-hidden", "true");
    ph.innerHTML = `<svg class="photo-placeholder__icon"><use href="#ico-heart"/></svg><span>Add <code>${m.src}</code></span>`;

    wrap.append(img, ph);
    watchImage(img, wrap);

    const cap = document.createElement("span");
    cap.className = "polaroid__caption";
    cap.textContent = m.caption;

    card.append(tape, wrap, cap);
    card.addEventListener("click", () => openLightbox(m, card));
    gallery.appendChild(card);
  });

  function openLightbox(m, trigger) {
    if (!lightbox) return;
    lastFocused = trigger;
    lbImg.src = m.src;
    lbImg.alt = m.caption;
    lbCap.textContent = m.caption;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    lbClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    setTimeout(() => { lbImg.src = ""; }, 500);
    lastFocused?.focus();
  }

  lbClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox?.classList.contains("is-open")) closeLightbox();
  });
  lbImg?.addEventListener("error", () => {
    if (lightbox.classList.contains("is-open")) {
      lbCap.textContent = `Photo not found — add ${lbImg.alt ? "this image" : "it"} to assets/images/`;
    }
  });
}


/* ==========================================================================
   7. GIFT
   ========================================================================== */
function initGift() {
  const gift = $("#gift");
  const panel = $("#gift-panel");
  const cta = $("#gift-cta");
  if (!gift || !panel) return;
  let opened = false;

  gift.addEventListener("click", () => {
    if (opened) return;
    opened = true;
    gift.classList.add("is-open");
    gift.setAttribute("aria-expanded", "true");
    gift.setAttribute("aria-label", "Gift opened");
    if (cta) cta.textContent = "Just for you ♡";

    const rect = gift.getBoundingClientRect();
    Confetti.burst({
      count: 130,
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height * 0.3) / window.innerHeight,
      spread: 1.1,
      hearts: true
    });

    setTimeout(() => {
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      setTimeout(() => panel.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "center" }), 300);
    }, 500);
  });
}


/* ==========================================================================
   8. REPLAY
   ========================================================================== */
function initReplay() {
  const btn = $("#replay-btn");
  btn?.addEventListener("click", () => {
    Confetti.burst({ count: 90, x: 0.5, y: 0.8, spread: 1, hearts: true });
    // Reset interactive states so the story can be experienced again
    $("#envelope")?.classList.remove("is-open");
    $(".envelope-stage")?.classList.remove("is-open");
    $("#envelope")?.setAttribute("aria-expanded", "false");
    const envCta = $("#envelope-cta"); if (envCta) envCta.textContent = "Click to open ✦";
    $$(".reminder-card.is-open").forEach((c) => {
      c.classList.remove("is-open");
      c.setAttribute("aria-expanded", "false");
      const tap = $(".reminder-card__tap", c); if (tap) tap.textContent = "Tap to reveal";
    });

    window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" });
  });
}


/* ==========================================================================
   MUSIC
   ========================================================================== */
function initMusic() {
  const btn = $("#music-btn");
  const audio = $("#bg-music");
  if (!btn || !audio) return;

  const setState = (playing) => {
    btn.classList.toggle("is-playing", playing);
    btn.setAttribute("aria-pressed", String(playing));
    btn.setAttribute("aria-label", playing ? "Pause birthday music" : "Play birthday music");
  };

  let missing = false;
  audio.addEventListener("error", () => {
    missing = true;
    setState(false);
    showToast("🎵 No music yet — add assets/audio/birthday-song.mp3 to play a song.");
  });

  btn.addEventListener("click", async () => {
    if (missing) {
      showToast("🎵 No music yet — add assets/audio/birthday-song.mp3 to play a song.");
      return;
    }
    if (audio.paused) {
      try {
        audio.volume = 0.7;
        await audio.play();
        setState(true);
      } catch (err) {
        setState(false);
        // Give the media element a beat to report a load error (preload="none")
        await wait(150);
        const noSource = missing || audio.error || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;
        if (noSource) {
          missing = true;
          showToast("🎵 No music yet — add assets/audio/birthday-song.mp3 to play a song.");
        } else {
          showToast("Couldn't play the music. Tap again to retry ♪");
        }
      }
    } else {
      audio.pause();
      setState(false);
    }
  });
  audio.addEventListener("ended", () => setState(false));
}


/* ==========================================================================
   GENTLE PARALLAX (hero decorations) — desktop + motion-allowed only
   ========================================================================== */
function initParallax() {
  const deco = $(".hero__deco");
  if (!deco || prefersReduced() || window.matchMedia("(pointer: coarse)").matches) return;
  let raf = 0;
  window.addEventListener("scroll", () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, 800);
      deco.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      raf = 0;
    });
  }, { passive: true });
}


/* ==========================================================================
   BOOT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  bindContent();
  initStars();
  initReminders();
  initGallery();
  initReveal();
  initHero();
  initEnvelope();
  initCake();
  initGift();
  initReplay();
  initMusic();
  initParallax();
  runCountdown();
});
