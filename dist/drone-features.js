import { LitElement as w, css as v, html as i, nothing as a } from "lit";
import { property as j } from "lit/decorators.js";
import { b as T, s as k, c as S, r as $ } from "./theme-CYKg-qWL.js";
var L = Object.defineProperty, A = (e, t, r, d) => {
  for (var n = void 0, o = e.length - 1, g; o >= 0; o--)
    (g = e[o]) && (n = g(t, r, n) || n);
  return n && L(t, r, n), n;
};
const E = "https://cdn.files.salla.network/other/1637672648/885bcc6e-97cc-47ce-86ad-7cd492be4d05-original.webp";
function _(e) {
  if (Array.isArray(e)) {
    const t = e[0];
    return String((t == null ? void 0 : t.value) ?? (t == null ? void 0 : t.key) ?? t ?? "").trim();
  }
  if (e && typeof e == "object") {
    const t = e;
    return String(t.value ?? t.key ?? "").trim();
  }
  return e == null ? "" : String(e).trim();
}
function I(e) {
  if (!e) return null;
  if (typeof e == "object") return e;
  if (typeof e == "string")
    try {
      const t = document.createElement("textarea");
      return t.innerHTML = e, JSON.parse(t.value);
    } catch {
      try {
        return JSON.parse(e);
      } catch {
        return null;
      }
    }
  return null;
}
const l = class l extends w {
  connectedCallback() {
    super.connectedCallback(), this.id || (this.id = "features");
  }
  get cfg() {
    const t = I(this.config);
    return t && typeof t == "object" ? t : {};
  }
  get titleText() {
    return this.cfg.badge || this.cfg.title || "";
  }
  get headingText() {
    return this.cfg.heading || "";
  }
  get bgType() {
    return _(this.cfg.bg_type) || "image";
  }
  get bgImage() {
    const t = this.cfg.bg_image;
    return typeof t == "string" && t ? t : E;
  }
  get droneImage() {
    const t = this.cfg.drone_image;
    return typeof t == "string" && t ? t : "";
  }
  get featuresList() {
    const t = this.cfg.features;
    return Array.isArray(t) ? t : [];
  }
  get showButton() {
    return this.cfg.show_button !== !1;
  }
  get buttonText() {
    return this.cfg.button_text || "";
  }
  get buttonLink() {
    const t = this.cfg.source_url;
    if (typeof t == "string" && t) return t;
    if (Array.isArray(t) && t.length > 0) {
      const r = t[0];
      return String((r == null ? void 0 : r.value) ?? r ?? "#");
    }
    return "#";
  }
  renderIcon(t) {
    return t && typeof t == "string" && t.trim() ? i`
        <span class="feature-icon">
          <img
            src=${t.trim()}
            alt=""
            loading="lazy"
          />
        </span>
      ` : a;
  }
  renderButton() {
    return !this.showButton || !this.buttonText ? a : i`
      <div class="cta-wrapper">
        ${S(
      this.buttonText,
      this.buttonLink,
      "var(--btn-bg, #0d0d0d)"
    )}
      </div>
    `;
  }
  render() {
    const t = this.cfg, r = t.bg_color || "#ffffff", d = t.text_color || "#111111", n = t.desc_color || "#666666", o = t.line_color || "#e0e0e0", g = t.button_bg || "#0d0d0d", m = t.button_color || "#ffffff", h = this.bgType, u = this.bgImage, f = Number(t.bg_overlay || 0) / 100, x = t.icon_bg || t.button_bg || "#0d0d0d", b = [
      `--sec-bg:${r}`,
      `--sec-text:${d}`,
      `--sec-desc:${n}`,
      `--sec-line:${o}`,
      `--btn-bg:${g}`,
      `--btn-text:${m}`,
      `--icon-bg:${x}`
    ].join(";"), p = this.featuresList;
    return i`
      <section class="features-section" id="features" style="${b}">
        <!-- Wireframe blueprint drone background -->
        ${h === "image" && u ? i`<div
              class="bg-layer"
              style="background-image: url('${u}');"
            ></div>` : a}
        ${f > 0 ? i`<div class="bg-overlay" style="opacity: ${f};"></div>` : a}

        <div class="container">
          <!-- Section Header (Title on left, Heading on right in RTL) -->
          ${$(
      this.headingText,
      this.titleText,
      "var(--sec-text, #111111)",
      "var(--sec-text, #111111)",
      "var(--sec-line, #e0e0e0)",
      "var(--sec-text, #0d0d0d)"
    )}

          <!-- Satellite Features Stage for Desktop & Mobile -->
          <div class="features-stage">
            <div class="drone-center">
              ${this.droneImage ? i`<img
                    src=${this.droneImage}
                    alt="Drone"
                    class="drone-img"
                    loading="lazy"
                  />` : a}
            </div>

            <!-- Absolute items on desktop / 2-column grid on mobile -->
            <div class="features-grid count-${p.length}">
              ${p.map(
      (c, y) => i`
                  <div class="feature-item pos-${y}">
                    <div class="feature-header">
                      ${this.renderIcon(c.icon_image)}
                      <h4 class="feature-title">${c.title || ""}</h4>
                    </div>
                    <p class="feature-desc">${c.desc || ""}</p>
                  </div>
                `
    )}
            </div>
          </div>

          <!-- CTA Button -->
          ${this.renderButton()}
        </div>
      </section>
    `;
  }
};
l.styles = [
  T,
  k,
  v`
      :host {
        display: block;
        direction: rtl;
        font-family: inherit;
        width: 100%;
        box-sizing: border-box;
        scroll-margin-top: 80px;
        --sec-bg: #ffffff;
        --sec-text: #111111;
        --sec-desc: #666666;
        --sec-line: #e0e0e0;
        --sec-tab: #0d0d0d;
        --btn-bg: #0d0d0d;
        --btn-text: #ffffff;
      }

      * {
        box-sizing: border-box;
      }

      .features-section {
        position: relative;
        background: var(--sec-bg);
        color: var(--sec-text);
        overflow: hidden;
        padding: 4rem 1.5rem 5rem;
        isolation: isolate;
      }

      /* Blueprint wireframe background */
      .bg-layer {
        position: absolute;
        inset: 0;
        background-repeat: no-repeat;
        background-position: right 20px top 40px;
        background-size: 55% auto;
        pointer-events: none;
        z-index: 0;
        opacity: 0.35;
      }

      .bg-overlay {
        position: absolute;
        inset: 0;
        background: var(--sec-bg);
        pointer-events: none;
        z-index: 1;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }

      /* =================== SATELLITE FEATURES STAGE (DESKTOP) =================== */
      /* CSS Grid Layout: Eliminates absolute positioning completely so text never overlaps the image */
      .features-stage {
        position: relative;
        width: 100%;
        max-width: 1200px;
        margin: 3.5rem auto 2.5rem;
        min-height: 520px;
        display: grid;
        grid-template-columns: minmax(220px, 280px) minmax(280px, 1fr) minmax(220px, 280px);
        grid-template-rows: auto minmax(280px, 1fr) auto;
        align-items: center;
        gap: 1.5rem 2.5rem;
      }

      .drone-center {
        grid-column: 2;
        grid-row: 2;
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        justify-self: center;
        align-self: center;
      }

      .drone-img {
        width: 100%;
        max-height: 380px;
        height: auto;
        display: block;
        object-fit: contain;
        filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.12));
      }

      /* Container for radial items on desktop: display contents lets items sit directly in 3x3 grid */
      .features-grid {
        display: contents;
      }

      /* =================== FEATURE CARD =================== */
      .feature-item {
        position: relative;
        z-index: 4;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 280px;
        transition: transform 0.25s ease;
      }

      .feature-item:hover {
        transform: translateY(-2px);
      }

      .feature-header {
        display: inline-flex;
        align-items: center;
        gap: 0.65rem;
        justify-content: flex-start;
        margin-bottom: 0.35rem;
      }

      .feature-icon {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--icon-bg, #0d0d0d);
        border-radius: 50%;
        padding: 6px;
        box-sizing: border-box;
        overflow: hidden;
      }

      .feature-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }

      .feature-title {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--sec-text);
        margin: 0;
        white-space: nowrap;
        text-align: right;
      }

      .feature-desc {
        font-size: 0.88rem;
        line-height: 1.6;
        color: var(--sec-desc);
        margin: 0;
      }

      /* =================== DESKTOP GRID POSITIONS (NO ABSOLUTE OVERLAP) =================== */
      /* --- Default / 6 Items Layout --- */
      .features-grid.count-6 .pos-0,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-0 {
        grid-column: 2;
        grid-row: 1;
        justify-self: center;
        align-self: end;
        text-align: center;
        align-items: center;
      }
      .features-grid.count-6 .pos-0 .feature-header,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-0 .feature-header {
        justify-content: center;
      }

      .features-grid.count-6 .pos-1,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-1 {
        grid-column: 1;
        grid-row: 1 / span 2;
        align-self: start;
        justify-self: end;
        text-align: right;
        margin-top: 1.5rem;
      }

      .features-grid.count-6 .pos-2,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-2 {
        grid-column: 1;
        grid-row: 2 / span 2;
        align-self: end;
        justify-self: end;
        text-align: right;
        margin-bottom: 1.5rem;
      }

      .features-grid.count-6 .pos-3,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-3 {
        grid-column: 2;
        grid-row: 3;
        justify-self: center;
        align-self: start;
        text-align: center;
        align-items: center;
      }
      .features-grid.count-6 .pos-3 .feature-header,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-3 .feature-header {
        justify-content: center;
      }

      .features-grid.count-6 .pos-4,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-4 {
        grid-column: 3;
        grid-row: 2 / span 2;
        align-self: end;
        justify-self: start;
        text-align: right;
        margin-bottom: 1.5rem;
      }

      .features-grid.count-6 .pos-5,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-5 {
        grid-column: 3;
        grid-row: 1 / span 2;
        align-self: start;
        justify-self: start;
        text-align: right;
        margin-top: 1.5rem;
      }

      /* --- 5 Items Layout: 1 Top Center, 2 on Right, 2 on Left --- */
      .features-grid.count-5 .pos-0 {
        grid-column: 2;
        grid-row: 1;
        justify-self: center;
        align-self: end;
        text-align: center;
        align-items: center;
      }
      .features-grid.count-5 .pos-0 .feature-header {
        justify-content: center;
      }

      .features-grid.count-5 .pos-1 {
        grid-column: 1;
        grid-row: 1 / span 2;
        align-self: start;
        justify-self: end;
        text-align: right;
        margin-top: 1.5rem;
      }

      .features-grid.count-5 .pos-2 {
        grid-column: 1;
        grid-row: 2 / span 2;
        align-self: end;
        justify-self: end;
        text-align: right;
        margin-bottom: 1.5rem;
      }

      .features-grid.count-5 .pos-3 {
        grid-column: 3;
        grid-row: 2 / span 2;
        align-self: end;
        justify-self: start;
        text-align: right;
        margin-bottom: 1.5rem;
      }

      .features-grid.count-5 .pos-4 {
        grid-column: 3;
        grid-row: 1 / span 2;
        align-self: start;
        justify-self: start;
        text-align: right;
        margin-top: 1.5rem;
      }

      /* --- 4 Items Layout: 2 on Right, 2 on Left --- */
      .features-grid.count-4 .pos-0 {
        grid-column: 1;
        grid-row: 1 / span 2;
        align-self: start;
        justify-self: end;
        text-align: right;
        margin-top: 1.5rem;
      }

      .features-grid.count-4 .pos-1 {
        grid-column: 1;
        grid-row: 2 / span 2;
        align-self: end;
        justify-self: end;
        text-align: right;
        margin-bottom: 1.5rem;
      }

      .features-grid.count-4 .pos-2 {
        grid-column: 3;
        grid-row: 2 / span 2;
        align-self: end;
        justify-self: start;
        text-align: right;
        margin-bottom: 1.5rem;
      }

      .features-grid.count-4 .pos-3 {
        grid-column: 3;
        grid-row: 1 / span 2;
        align-self: start;
        justify-self: start;
        text-align: right;
        margin-top: 1.5rem;
      }

      /* --- 3 Items Layout: 1 Top Center, 1 Right, 1 Left --- */
      .features-grid.count-3 .pos-0 {
        grid-column: 2;
        grid-row: 1;
        justify-self: center;
        align-self: end;
        text-align: center;
        align-items: center;
      }
      .features-grid.count-3 .pos-0 .feature-header {
        justify-content: center;
      }

      .features-grid.count-3 .pos-1 {
        grid-column: 1;
        grid-row: 2;
        align-self: center;
        justify-self: end;
        text-align: right;
      }

      .features-grid.count-3 .pos-2 {
        grid-column: 3;
        grid-row: 2;
        align-self: center;
        justify-self: start;
        text-align: right;
      }

      /* =================== CTA BUTTON CONTAINER =================== */
      .cta-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 3rem;
        position: relative;
        z-index: 5;
      }

      /* =================== RESPONSIVE (MOBILE & TABLET: 2-COLUMN GRID) =================== */
      @media (max-width: 990px) {
        .features-section {
          padding: 2.5rem 1rem 3.5rem;
        }

        .bg-layer {
          background-size: 90% auto;
          background-position: center top;
          opacity: 0.2;
        }

        .features-stage {
          min-height: auto;
          margin: 1.5rem auto 2rem;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 1.5rem !important;
        }

        .drone-center {
          grid-column: auto !important;
          grid-row: auto !important;
          max-width: 320px !important;
          margin: 0 auto !important;
        }

        /* 2-Column Grid exactly matching mobile UI */
        .features-grid {
          position: static;
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1.5rem 1rem !important;
          width: 100% !important;
          pointer-events: auto !important;
        }

        .feature-item,
        .pos-0,
        .pos-1,
        .pos-2,
        .pos-3,
        .pos-4,
        .pos-5 {
          grid-column: auto !important;
          grid-row: auto !important;
          position: static !important;
          max-width: 100% !important;
          transform: none !important;
          text-align: right !important;
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .feature-item:hover {
          transform: none;
        }

        .feature-header {
          flex-direction: row !important; /* Always icon on right, title to its left */
          gap: 0.5rem;
          margin-bottom: 0.35rem;
          display: flex;
          align-items: center;
        }

        .feature-icon {
          width: 30px;
          height: 30px;
          padding: 5px;
        }

        .feature-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--sec-text, #111111);
          white-space: normal;
          line-height: 1.35;
          margin: 0;
        }

        .feature-desc {
          font-size: 0.8rem;
          line-height: 1.55;
          color: var(--sec-desc, #666666);
          margin: 0;
        }

        .cta-wrapper {
          margin-top: 2rem;
        }
      }
    `
];
let s = l;
A([
  j({ type: Object })
], s.prototype, "config");
typeof s < "u" && s.registerSallaComponent("salla-drone-features");
export {
  s as default
};
