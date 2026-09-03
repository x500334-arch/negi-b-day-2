# ✦ Premium Pink Fairy-Tale Birthday Website

A fully static, interactive birthday-surprise experience:
**a magical pink-and-gold celebration under a dreamy purple midnight sky.**

Dark · Dreamy · Elegant · Cinematic · Premium — built with plain HTML5, CSS3, vanilla JavaScript and inline SVG. No frameworks, no backend, no video.

---

## 🎬 The Journey (8 chapters)

| # | Section | What happens |
|---|---------|--------------|
| 1 | **Cinematic Countdown** | Full-screen `3 → 2 → 1 → SURPRISE!` with glowing gold Baloo 2 numerals, pink glow, confetti + hearts, fade into hero. Skip button included. |
| 2 | **Hero** | Gold eyebrow, giant heading with glowing pink name, intro text, `Start the Surprise ✦` / `Make a Wish ♡` buttons, circular photo with animated gradient ring + bow, balloons, butterfly, hearts, sparkles, swirl. |
| 3 | **Birthday Letter** | Premium dark-pink envelope with gold heart seal. Click → flap folds back, cream letter slides up with your paragraphs. Click again to fold. |
| 4 | **Things That Remind Me of You** | 6 glass cards (Teddy Bear, Pink Bow, Favourite Treat, Favourite Song, Funny Habit, Inside Joke). 3D pointer tilt + glow. Click → reveals a personal note. |
| 5 | **Interactive Cake** | Pure-CSS 3-layer cake (pink / purple / pink, icing drips, sprinkles, gold plate, striped candle with flickering flame). `Cut the Cake 🎂` → knife animates, flame goes out with smoke, layers shift, confetti, message appears. |
| 6 | **Memories Gallery** | Cream polaroids with tape, random rotation, hover lift + pink glow. Click → full-screen lightbox (blurred backdrop, close button, Esc / backdrop click). Lazy-loaded images. |
| 7 | **Gift Surprise** | Floating pink gift box with gold ribbon and bow. Click → lid flies off, sparkle burst, glow, confetti, glass panel reveals your message + optional note / gift code / link. |
| 8 | **Final Message** | Huge glowing pink `Happy Birthday! ♡`, final text, floating hearts, `Replay the Magic ✦` (resets interactions and scrolls to top). |

Plus: **floating music button** (never autoplays; friendly toast if the MP3 is missing), **animated star-field canvas**, **aurora + blurred light orbs**, **scroll-reveal** via IntersectionObserver, **gentle hero parallax** (desktop only).

---

## ✏️ How to Personalise (the only file you need to touch)

Open **`js/app.js`** — everything personal lives at the very top in one clearly marked block:

```js
// ===== PERSONAL CONTENT =====
const birthdayData = {
  name: "Birthday Girl",
  heroIntro: "...",
  letter: [ "Dear Birthday Girl,", "...", "With lots of magic ✦" ],
  reminders: [ { icon, title, hint, message }, ... ],   // 6 cards
  cakeMessage: "Wish granted… now let the celebration begin! 🎉💗",
  memories: [ { src: "assets/images/memory1.jpg", caption: "..." }, ... ],
  giftTitle: "You deserve beautiful things ✨",
  giftMessage: "...",
  giftExtra: { note: "...", code: "", linkText: "", linkUrl: "" },  // leave "" to hide
  finalMessage: "...",
  signature: "— with all my love ♡",
  music: "assets/audio/birthday-song.mp3",
  heroImage: "assets/images/hero.jpg"
};
```

- **Name** → `name`
- **Letter** → `letter` (one string per paragraph)
- **Card notes** → `reminders[*].message`
- **Photo captions / more photos** → `memories` (add as many as you like)
- **Gift code / link** → `giftExtra`
- **Final words** → `finalMessage`, `signature`

### 📸 Add your photos → `assets/images/`
```
assets/images/hero.jpg       (main portrait, square crop ≈ 800×800 looks best)
assets/images/memory1.jpg
assets/images/memory2.jpg
assets/images/memory3.jpg
assets/images/memory4.jpg
```
Until a photo exists, an elegant placeholder is shown automatically naming the file to add.

### 🎵 Add music → `assets/audio/birthday-song.mp3`
Optional. Site works without it; the ♪ button shows a hint if the file is missing.

---

## 📁 Project Structure

```
index.html              – all 8 sections, SVG sprite, overlays (countdown, lightbox, toast)
css/style.css           – design tokens, glass system, buttons, every component, responsive + reduced-motion
js/app.js               – PERSONAL CONTENT block + all interactions (no dependencies)
assets/images/          – your photos (README.txt inside explains filenames)
assets/audio/           – your song   (README.txt inside)
README.md
```

### Handy URL flags (for editing/preview)
- `index.html?skipintro` – skip the countdown
- `index.html?showall`  – skip countdown **and** reveal every section instantly

---

## 🎨 Design System

- **Fonts:** Baloo 2 (headings) · Inter (body) — Google Fonts
- **Palette (CSS variables):** `--night` `--midnight` `--plum` `--violet` · `--pink` `--rose` `--gold` `--periwinkle` · `--cream` `--muted` · `--glass` `--border`
- **Glass:** `rgba(255,255,255,.07)` fill, `.14` border, `blur(20px)`, inner highlight, soft shadow
- **Buttons:** pill-shaped; primary = hot-pink → warm-pink → gold gradient with glow, lift, sheen; secondary = dark glass
- **Animations:** transform/opacity only, CSS keyframes, staggered durations/delays, IntersectionObserver reveals
- **Reduced motion:** all floating/parallax/aurora/ring-spin disabled, reveals instant, essential interactions still work

## 📱 Responsive
Mobile-first. On phones: photo moves above the heading, text centres, buttons go full-width, fewer/smaller balloons, swirl hidden, 1-column cards, 2-column gallery, lighter blur. Tablet: 2-column cards. Desktop ≥ 900px: 2-column hero, 3-column cards, 4-column staggered gallery.

## ♿ Accessibility
Semantic landmarks, alt text, `aria-expanded` / `aria-controls` on envelope, cards, gift; `aria-live` on countdown, cake message and toast; keyboard-operable everything (all interactives are real `<button>`s), visible gold focus rings, Esc closes lightbox with focus return.

---

## ✅ Verified
- Desktop + mobile renders of every section and every interaction state (envelope open, card reveal, cake cut, gift open, lightbox, toast)
- No horizontal overflow on 390px
- Console clean except expected 404s for not-yet-added placeholder images
- Missing image / missing audio fallbacks working

## 🚫 Not included (by design)
- No video, backend, database, auth, or API
- No autoplaying audio

## 💡 Ideas for later
- Add more polaroids or a second letter page
- Swap emoji card icons for custom SVGs
- Add a date-based "days until your birthday" mode to the countdown
- Add a downloadable e-card image (client-side canvas)

## 🚀 Deploy
Pure static — drop the folder on GitHub Pages, Netlify, Cloudflare Pages, or use the **Publish** tab here.
