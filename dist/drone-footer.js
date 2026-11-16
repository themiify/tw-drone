import { LitElement as _, css as E, html as c, nothing as h } from "lit";
import { property as C } from "lit/decorators.js";
import { b as B, d as S, c as I, e as z } from "./theme-CYKg-qWL.js";
var M = Object.defineProperty, A = (i, e, t, m) => {
  for (var o = void 0, n = i.length - 1, g; n >= 0; n--)
    (g = i[n]) && (o = g(e, t, o) || o);
  return o && M(e, t, o), o;
};
const N = "https://cdn.files.salla.network/other/1637672648/4a12a535-9334-4c39-a14e-3c8b16f71d1d-original.png", R = "https://cdn.files.salla.network/other/1637672648/216e55b8-cde0-4628-ba37-b6dc387cc7a4-original.png";
function H(i) {
  if (Array.isArray(i)) {
    const e = i[0];
    return String((e == null ? void 0 : e.value) ?? e ?? "");
  }
  return i && typeof i == "object" ? String(i.value ?? "") : i == null ? "" : String(i);
}
function O(i) {
  if (!i) return null;
  if (typeof i == "object") return i;
  if (typeof i == "string")
    try {
      const e = document.createElement("textarea");
      return e.innerHTML = i, JSON.parse(e.value);
    } catch {
      try {
        return JSON.parse(i);
      } catch {
        return null;
      }
    }
  return null;
}
const x = class x extends _ {
  connectedCallback() {
    super.connectedCallback(), this.ensureFontLoaded();
  }
  ensureFontLoaded() {
    const e = "drone-montserrat-font";
    if (typeof document < "u" && !document.getElementById(e)) {
      const t = document.createElement("link");
      t.id = e, t.rel = "stylesheet", t.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&display=swap", document.head.appendChild(t);
    }
  }
  get cfg() {
    const e = O(this.config);
    return e && typeof e == "object" ? e : {};
  }
  get bgType() {
    return H(this.cfg.bg_type) || "image";
  }
  get bgImage() {
    const e = this.cfg.bg_image;
    return typeof e == "string" && e ? e : N;
  }
  get logoImage() {
    const e = this.cfg.logo_image;
    return typeof e == "string" && e ? e : R;
  }
  get logoText() {
    return this.cfg.logo_text || "";
  }
  get logoHeight() {
    const e = Number(this.cfg.logo_height);
    return Number.isFinite(e) && e > 0 ? e : 44;
  }
  get logoHeightMobile() {
    const e = Number(this.cfg.logo_height_mobile);
    return Number.isFinite(e) && e > 0 ? e : Math.min(this.logoHeight, 34);
  }
  get logoUrl() {
    const e = this.cfg.logo_url;
    if (typeof e == "string" && e) return e;
    if (Array.isArray(e) && e.length) {
      const t = e[0];
      return String((t == null ? void 0 : t.value) ?? t ?? "#");
    }
    return "#";
  }
  get description() {
    return this.cfg.description ?? "";
  }
  get links() {
    const e = this.cfg.links;
    return Array.isArray(e) ? e : [];
  }
  get socialTitle() {
    return this.cfg.social_title ?? "";
  }
  get buttonText() {
    return this.cfg.button_text ?? "";
  }
  get buttonLink() {
    const e = this.cfg.source_url;
    if (typeof e == "string" && e) return e;
    if (Array.isArray(e) && e.length > 0) {
      const t = e[0];
      return String((t == null ? void 0 : t.value) ?? t ?? "#");
    }
    return "#";
  }
  handleNavClick(e, t, m) {
    let o = "";
    if (typeof t == "string")
      o = t.trim();
    else if (Array.isArray(t) && t.length) {
      const r = t[0];
      o = String((r == null ? void 0 : r.value) ?? (r == null ? void 0 : r.url) ?? r ?? "").trim();
    } else if (t && typeof t == "object") {
      const r = t;
      o = String(r.value ?? r.url ?? "").trim();
    }
    const n = (m || "").trim(), g = o.includes("#"), p = !o || o === "#" || o === "/" || o === "#hero" || g, l = n.includes("رئيسية") || n.includes("مميزات") || n.includes("قصة") || n.includes("أجزاء") || n.includes("اجزاء") || n.includes("أسئلة") || n.includes("اسئلة") || n.includes("فيديو") || n.includes("فيديوهات");
    if (!p && !l)
      return;
    if (e.preventDefault(), o === "#" || o === "" || o === "/" || o === "#hero" || n.includes("الرئيسية")) {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
      }
      if (document.documentElement)
        try {
          document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
        }
      if (document.body)
        try {
          document.body.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
        }
      try {
        history.pushState(null, "", window.location.pathname);
      } catch {
      }
      return;
    }
    let a = "";
    g && (a = o.substring(o.indexOf("#") + 1).toLowerCase().trim());
    const w = [
      { tag: "drone-hero", id: "hero", keywords: ["hero", "رئيسية", "الرئيسية"] },
      { tag: "drone-features", id: "features", keywords: ["features", "feature", "مميزات", "المميزات", "ميزات"] },
      { tag: "drone-story", id: "story", keywords: ["story", "قصة", "القصة", "قصه"] },
      { tag: "drone-parts", id: "parts", keywords: ["parts", "part", "اجزاء", "أجزاء", "الأجزاء", "اجزاء الدرون", "أجزاء الدرون", "قطع"] },
      { tag: "drone-faq", id: "faq", keywords: ["faq", "أسئلة", "اسئلة", "الاسئلة", "الأسئلة", "سؤال"] },
      { tag: "drone-videos", id: "videos", keywords: ["videos", "video", "فيديو", "الفيديو", "فيديوهات", "الفيديوهات"] }
    ];
    let s = null;
    if (a && (s = document.getElementById(a), s || (s = document.querySelector(`drone-${a}`) || document.querySelector(`[component-name="drone-${a}"]`) || document.querySelector(`[component-name="${a}"]`))), !s) {
      const r = [a, n.toLowerCase()].filter(Boolean);
      for (const d of w)
        if (d.keywords.some(
          (b) => r.some((f) => f.includes(b.toLowerCase()))
        ) && (s = document.querySelector(d.tag) || document.querySelector(`[component-name="${d.tag}"]`) || document.getElementById(d.id), s))
          break;
    }
    if (!s && a) {
      const r = document.querySelectorAll(
        "drone-hero, drone-features, drone-story, drone-parts, drone-faq, drone-videos, salla-custom-component"
      );
      for (const d of Array.from(r))
        if (d.shadowRoot && d.shadowRoot.getElementById(a)) {
          s = d;
          break;
        }
    }
    if (s) {
      const r = s.parentElement && s.parentElement.tagName.toLowerCase().includes("custom-component") ? s.parentElement : s;
      r.style.scrollMarginTop = "80px", s.style.scrollMarginTop = "80px";
      try {
        r.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {
        try {
          s.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch {
        }
      }
      const d = 76, u = r.getBoundingClientRect(), b = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, f = Math.max(0, u.top + b - d);
      try {
        window.scrollTo({ top: f, behavior: "smooth" });
      } catch {
      }
      if (document.documentElement)
        try {
          document.documentElement.scrollTo({ top: f, behavior: "smooth" });
        } catch {
        }
      if (document.body)
        try {
          document.body.scrollTo({ top: f, behavior: "smooth" });
        } catch {
        }
      if (document.scrollingElement)
        try {
          document.scrollingElement.scrollTo({ top: f, behavior: "smooth" });
        } catch {
        }
      if (a)
        try {
          history.pushState(null, "", `#${a}`);
        } catch {
        }
    }
  }
  renderLogo() {
    const e = `${this.logoHeight}px`, t = `${this.logoHeightMobile}px`, m = this.logoImage;
    return c`<img
      class="logo-img"
      src=${m}
      alt=${this.logoText}
      style="--logo-h: ${e}; --logo-h-mobile: ${t};"
    />`;
  }
  renderButton() {
    return this.cfg.show_button === !1 || !this.buttonText ? h : I(this.buttonText, this.buttonLink, "var(--btn-bg)");
  }
  renderSocialIcons() {
    const e = this.cfg, t = (l) => typeof l == "string" && l.trim().length > 0 && l.trim() !== "#", m = c`<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>`, o = c`<svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>`, n = c`<svg viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>`, g = c`<svg viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>`, p = [
      { icon: m, url: e.facebook_url, label: "Facebook" },
      { icon: o, url: e.instagram_url, label: "Instagram" },
      { icon: n, url: e.x_url, label: "X" },
      { icon: g, url: e.linkedin_url, label: "LinkedIn" }
    ].filter((l) => t(l.url));
    return p.length === 0 ? h : c`
      <div class="social-section">
        ${this.socialTitle ? c`<h4 class="social-title">${this.socialTitle}</h4>` : h}
        <div class="social-icons">
          ${p.map(
      (l) => z(l.icon, l.url, l.label, "var(--social-bg, #E6E6E6)")
    )}
        </div>
      </div>
    `;
  }
  render() {
    const e = this.cfg, t = e.bg_color || "#ffffff", m = e.text_color || "#111111", o = e.desc_color || "#4a4a4a", n = e.link_color || "#0d0d0d", g = e.line_color || "#e0e0e0", p = e.social_bg || "#E6E6E6", l = e.social_color || "#111111", a = e.button_bg || "#0d0d0d", w = e.button_color || "#ffffff", s = e.watermark_color || "#0d0d0d", r = e.watermark_text || "Drone", d = this.bgType, u = this.bgImage, b = Number(e.bg_overlay || 0) / 100, k = e.invert_logo !== !1 ? "invert(1)" : "none", $ = [
      `--ftr-bg:${t}`,
      `--ftr-text:${m}`,
      `--ftr-desc:${o}`,
      `--ftr-link:${n}`,
      `--ftr-line:${g}`,
      `--social-bg:${p}`,
      `--social-color:${l}`,
      `--btn-bg:${a}`,
      `--btn-text:${w}`,
      `--wm-color:${s}`,
      `--logo-filter:${k}`
    ].join(";"), T = this.links;
    return c`
      <footer class="footer-wrap" style="${$}">
        <!-- Background image layer (wireframe blueprints) -->
        ${d === "image" && u ? c`<div
              class="bg-image-layer"
              style="background-image: url('${u}');"
            ></div>` : h}

        <!-- Background color overlay if specified -->
        ${b > 0 ? c`<div
              class="bg-overlay-layer"
              style="opacity: ${b};"
            ></div>` : h}

        <div class="container">
          <div class="columns ${e.reverse ? "reverse" : ""}">
            <!-- Child 1: Brand Column (Right side in RTL) -->
            <div class="col-brand">
              <a
                class="logo-link"
                href=${this.logoUrl}
                @click=${(y) => this.handleNavClick(y, this.logoUrl)}
              >
                ${this.renderLogo()}
              </a>

              <p class="desc">${this.description}</p>

              ${this.renderSocialIcons()}
              ${this.renderButton()}
            </div>

            <!-- Child 2: Links Column (Left side in RTL) -->
            <div class="col-links">
              ${T.map(
      (y) => c`
                  <a
                    class="link-row"
                    href=${y.url || "#"}
                    @click=${(L) => this.handleNavClick(L, y.url, y.label)}
                  >
                    <span class="link-label">${y.label || ""}</span>
                    <span class="link-arrow">
                      <!-- Up-Left arrow ↖ -->
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="17" y1="17" x2="7" y2="7"></line>
                        <polyline points="7 17 7 7 17 7"></polyline>
                      </svg>
                    </span>
                  </a>
                `
    )}
            </div>
          </div>
        </div>

        <!-- Huge Oversized Watermark "Drone" -->
        ${e.show_watermark !== !1 ? c`
              <div class="bottom-watermark-wrap">
                <span class="bottom-watermark">${r}</span>
              </div>
            ` : h}

        <!-- Optional Copyright Footer Bar -->
        ${e.show_copyright ? c`
              <div class="copyright-bar">
                ${e.copyright_text || ""}
              </div>
            ` : h}
      </footer>
    `;
  }
};
x.styles = [
  B,
  S,
  E`
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&display=swap");

    :host {
      display: block;
      direction: rtl;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
      --ftr-bg: #ffffff;
      --ftr-text: #111111;
      --ftr-desc: #4a4a4a;
      --ftr-link: #0d0d0d;
      --ftr-line: #e0e0e0;
      --social-bg: #E6E6E6;
      --social-color: #111111;
      --social-hover-bg: #0d0d0d;
      --social-hover-color: #ffffff;
      --btn-bg: #0d0d0d;
      --btn-text: #ffffff;
      --wm-color: #0d0d0d;
      --wm-opacity: 1;
    }

    * {
      box-sizing: border-box;
    }

    .footer-wrap {
      position: relative;
      background: var(--ftr-bg);
      color: var(--ftr-text);
      overflow: hidden;
      padding-top: 4.5rem;
      padding-bottom: 0;
      isolation: isolate;
    }

    /* Background image layer (wireframe blueprints) */
    .bg-image-layer {
      position: absolute;
      inset: 0;
      background-position: center bottom;
      background-repeat: no-repeat;
      background-size: cover;
      pointer-events: none;
      z-index: 0;
    }

    .bg-overlay-layer {
      position: absolute;
      inset: 0;
      background: var(--ftr-bg);
      pointer-events: none;
      z-index: 1;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 2;
    }

    /* Main two-column layout:
       In RTL: Child 1 (Brand) is on the RIGHT.
       Child 2 (Links) is on the LEFT. */
    .columns {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 5rem;
      align-items: flex-start;
    }

    .columns.reverse {
      grid-template-columns: 1.15fr 1fr;
    }

    /* =================== BRAND COLUMN (RIGHT IN RTL) =================== */
    .col-brand {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: right;
    }

    .columns.reverse .col-brand {
      order: 2;
    }
    .columns.reverse .col-links {
      order: 1;
    }

    .logo-link {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      color: var(--ftr-text);
      margin-bottom: 1.25rem;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .logo-link:hover {
      opacity: 0.85;
      transform: scale(1.02);
    }

    .logo-img {
      height: var(--logo-h, 44px);
      width: auto;
      object-fit: contain;
      display: block;
      filter: var(--logo-filter, invert(1));
    }

    .logo-text {
      font-size: 1.6rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ftr-text);
    }

    .desc {
      font-size: 0.92rem;
      line-height: 1.85;
      color: var(--ftr-desc);
      max-width: 480px;
      margin: 0 0 2rem 0;
    }

    .social-section {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      margin-bottom: 1.8rem;
    }

    .social-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--ftr-text);
      margin: 0;
    }

    .social-icons {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    /* =================== LINKS COLUMN (LEFT IN RTL) =================== */
    .col-links {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-top: 0.5rem;
    }

    .link-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.1rem 0;
      border-bottom: 1px solid var(--ftr-line);
      text-decoration: none;
      color: var(--ftr-link);
      transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    }

    .link-row:first-child {
      border-top: 1px solid var(--ftr-line);
    }

    .link-label {
      font-size: 1.05rem;
      font-weight: 700;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .link-arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      color: inherit;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
        color 0.2s ease;
      opacity: 0.85;
    }

    .link-arrow svg {
      width: 16px;
      height: 16px;
    }

    .link-row:hover {
      color: #000000;
    }

    .link-row:hover .link-label {
      transform: translateX(-4px);
    }

    .link-row:hover .link-arrow {
      opacity: 1;
      transform: translate(-4px, -4px);
    }

    /* =================== BOTTOM WATERMARK =================== */
    .bottom-watermark-wrap {
      width: 100%;
      overflow: hidden;
      margin-top: 3.5rem;
      line-height: 0.75;
      text-align: center;
      direction: ltr;
      unicode-bidi: isolate;
      user-select: none;
      pointer-events: none;
      position: relative;
      z-index: 2;
    }

    .bottom-watermark {
      display: inline-block;
      font-size: clamp(6.5rem, 24vw, 24rem);
      font-weight: 900;
      letter-spacing: 0.05em;
      color: var(--wm-color);
      opacity: var(--wm-opacity);
      margin-bottom: -0.06em;
      font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, "Helvetica Neue", Arial, sans-serif;
      text-transform: capitalize;
      white-space: nowrap;
    }

    /* Optional Copyright bar */
    .copyright-bar {
      border-top: 1px solid var(--ftr-line);
      padding: 1rem 0;
      text-align: center;
      font-size: 0.82rem;
      color: var(--ftr-desc);
      position: relative;
      z-index: 3;
    }

    /* Responsive */
    @media (max-width: 860px) {
      .footer-wrap {
        padding-top: 3rem;
      }
      .columns,
      .columns.reverse {
        grid-template-columns: 1fr;
        gap: 2.8rem;
      }
      .desc {
        max-width: 100%;
      }
      .logo-img {
        height: var(--logo-h-mobile, var(--logo-h, 34px));
      }
      .bottom-watermark-wrap {
        margin-top: 2rem;
        width: 100%;
        overflow: hidden;
      }
      .bottom-watermark {
        font-size: clamp(6.2rem, 26.5vw, 13rem);
        letter-spacing: 0.055em;
        line-height: 0.78;
        margin-bottom: -0.05em;
      }
    }

    @media (max-width: 480px) {
      .bottom-watermark-wrap {
        margin-top: 1.5rem;
      }
      .bottom-watermark {
        font-size: 27vw;
        letter-spacing: 0.06em;
      }
    }
  `
];
let v = x;
A([
  C({ type: Object })
], v.prototype, "config");
typeof v < "u" && v.registerSallaComponent("salla-drone-footer");
export {
  v as default
};
