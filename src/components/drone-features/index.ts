import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import {
  renderSectionHeader,
  renderTacticalButton,
  sectionHeaderStyles,
  tacticalButtonStyles,
} from "../../shared/theme.js";

interface FeatureItem {
  id?: string;
  title?: string;
  desc?: string;
  icon_image?: string;
}

interface DroneFeaturesConfig {
  title?: string;
  heading?: string;
  bg_type?: unknown;
  bg_color?: string;
  bg_image?: string;
  bg_overlay?: number;
  drone_image?: string;

  features?: FeatureItem[];

  show_button?: boolean;
  button_text?: string;
  source_url?: unknown;

  text_color?: string;
  desc_color?: string;
  line_color?: string;
  button_bg?: string;
  button_color?: string;
}

const DEFAULT_BG_IMAGE =
  "https://cdn.files.salla.network/other/1637672648/885bcc6e-97cc-47ce-86ad-7cd492be4d05-original.webp";

const DEFAULT_DRONE_IMAGE = "/images/drone-features-main.png";

function pick(v: unknown): string {
  if (Array.isArray(v)) {
    const first: any = v[0];
    return String(first?.value ?? first?.key ?? first ?? "").trim();
  }
  if (v && typeof v === "object") {
    const obj = v as any;
    return String(obj.value ?? obj.key ?? "").trim();
  }
  return v == null ? "" : String(v).trim();
}

function parseJsonSafe(val: unknown): any {
  if (!val) return null;
  if (typeof val === "object") return val;
  if (typeof val === "string") {
    try {
      const txt = document.createElement("textarea");
      txt.innerHTML = val;
      return JSON.parse(txt.value);
    } catch {
      try {
        return JSON.parse(val);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export default class DroneFeatures extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  connectedCallback() {
    super.connectedCallback();
    if (!this.id) this.id = "features";
  }

  private get cfg(): DroneFeaturesConfig {
    const parsed = parseJsonSafe(this.config);
    return parsed && typeof parsed === "object" ? parsed : {};
  }

  private get titleText(): string {
    return this.cfg.title || "";
  }

  private get headingText(): string {
    return this.cfg.heading || "";
  }

  private get bgType(): string {
    return pick(this.cfg.bg_type) || "image";
  }

  private get bgImage(): string {
    const img = this.cfg.bg_image;
    if (typeof img === "string" && img) return img;
    return DEFAULT_BG_IMAGE;
  }

  private get droneImage(): string {
    const img = this.cfg.drone_image;
    if (typeof img === "string" && img) return img;
    return DEFAULT_DRONE_IMAGE;
  }

  private get featuresList(): FeatureItem[] {
    const list = this.cfg.features;
    return Array.isArray(list) ? list : [];
  }

  private get showButton(): boolean {
    return this.cfg.show_button !== false;
  }

  private get buttonText(): string {
    return this.cfg.button_text || "";
  }

  private get buttonLink(): string {
    const link = this.cfg.source_url;
    if (typeof link === "string" && link) return link;
    if (Array.isArray(link) && link.length > 0) {
      const f: any = link[0];
      return String(f?.value ?? f ?? "#");
    }
    return "#";
  }

  static styles = [
    tacticalButtonStyles,
    sectionHeaderStyles,
    css`
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
      .features-stage {
        position: relative;
        width: 100%;
        max-width: 1120px;
        margin: 3.5rem auto 2.5rem;
        min-height: 520px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .drone-center {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 520px;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
      }

      .drone-img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
        filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.12));
      }

      /* Container for radial items on desktop / 2-col grid on mobile */
      .features-grid {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 3;
      }

      /* =================== FEATURE CARD =================== */
      .feature-item {
        position: absolute;
        pointer-events: auto;
        z-index: 4;
        display: flex;
        flex-direction: column;
        max-width: 240px;
        transition: transform 0.25s ease;
      }

      .feature-item:hover {
        transform: translateY(-2px);
      }

      .feature-header {
        display: inline-flex;
        align-items: center;
        gap: 0.65rem;
        margin-bottom: 0.35rem;
      }

      .feature-icon {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .feature-icon svg {
        width: 100%;
        height: 100%;
        display: block;
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
      }

      .feature-desc {
        font-size: 0.88rem;
        line-height: 1.6;
        color: var(--sec-desc);
        margin: 0;
      }

      /* =================== DESKTOP RADIAL POSITIONS =================== */
      /* --- Default / 6 Items Layout --- */
      .features-grid.count-6 .pos-0,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-0 {
        top: 2%;
        right: 42%;
        text-align: right;
      }
      .features-grid.count-6 .pos-0 .feature-header,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-0 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-6 .pos-1,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-1 {
        top: 12%;
        right: 4%;
        text-align: right;
      }
      .features-grid.count-6 .pos-1 .feature-header,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-1 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-6 .pos-2,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-2 {
        top: 58%;
        right: 5%;
        text-align: right;
      }
      .features-grid.count-6 .pos-2 .feature-header,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-2 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-6 .pos-3,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-3 {
        bottom: 2%;
        left: 45%;
        text-align: right;
      }
      .features-grid.count-6 .pos-3 .feature-header,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-3 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-6 .pos-4,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-4 {
        top: 58%;
        left: 5%;
        text-align: right;
      }
      .features-grid.count-6 .pos-4 .feature-header,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-4 .feature-header {
        flex-direction: row-reverse;
      }

      .features-grid.count-6 .pos-5,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-5 {
        top: 12%;
        left: 4%;
        text-align: right;
      }
      .features-grid.count-6 .pos-5 .feature-header,
      .features-grid:not(.count-3):not(.count-4):not(.count-5) .pos-5 .feature-header {
        flex-direction: row-reverse;
      }

      /* --- 5 Items Layout: 1 Top Center, 2 on Right, 2 on Left --- */
      .features-grid.count-5 .pos-0 {
        top: 2%;
        right: 42%;
        text-align: right;
      }
      .features-grid.count-5 .pos-0 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-5 .pos-1 {
        top: 20%;
        right: 5%;
        text-align: right;
      }
      .features-grid.count-5 .pos-1 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-5 .pos-2 {
        top: 60%;
        right: 5%;
        text-align: right;
      }
      .features-grid.count-5 .pos-2 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-5 .pos-3 {
        top: 60%;
        left: 5%;
        text-align: right;
      }
      .features-grid.count-5 .pos-3 .feature-header {
        flex-direction: row-reverse;
      }

      .features-grid.count-5 .pos-4 {
        top: 20%;
        left: 5%;
        text-align: right;
      }
      .features-grid.count-5 .pos-4 .feature-header {
        flex-direction: row-reverse;
      }

      /* --- 4 Items Layout: 2 on Right, 2 on Left (Balanced 2x2) --- */
      .features-grid.count-4 .pos-0 {
        top: 20%;
        right: 6%;
        text-align: right;
      }
      .features-grid.count-4 .pos-0 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-4 .pos-1 {
        top: 60%;
        right: 6%;
        text-align: right;
      }
      .features-grid.count-4 .pos-1 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-4 .pos-2 {
        top: 60%;
        left: 6%;
        text-align: right;
      }
      .features-grid.count-4 .pos-2 .feature-header {
        flex-direction: row-reverse;
      }

      .features-grid.count-4 .pos-3 {
        top: 20%;
        left: 6%;
        text-align: right;
      }
      .features-grid.count-4 .pos-3 .feature-header {
        flex-direction: row-reverse;
      }

      /* --- 3 Items Layout: 1 Top Center, 1 Mid Right, 1 Mid Left (Balanced Triangle) --- */
      .features-grid.count-3 .pos-0 {
        top: 2%;
        right: 42%;
        text-align: right;
      }
      .features-grid.count-3 .pos-0 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-3 .pos-1 {
        top: 48%;
        right: 6%;
        text-align: right;
      }
      .features-grid.count-3 .pos-1 .feature-header {
        flex-direction: row;
      }

      .features-grid.count-3 .pos-2 {
        top: 48%;
        left: 6%;
        text-align: right;
      }
      .features-grid.count-3 .pos-2 .feature-header {
        flex-direction: row-reverse;
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
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .drone-center {
          max-width: 320px;
          margin: 0 auto;
        }

        /* 2-Column Grid exactly matching Image 2 */
        .features-grid {
          position: static;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem 1rem;
          width: 100%;
          pointer-events: auto;
        }

        .feature-item,
        .pos-0,
        .pos-1,
        .pos-2,
        .pos-3,
        .pos-4,
        .pos-5 {
          position: static;
          max-width: 100%;
          transform: none;
          text-align: right !important;
          background: transparent;
          border: none;
          padding: 0;
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
    `,
  ];

  private renderIcon(customImg?: string, index: number = 0) {
    if (customImg && typeof customImg === "string" && customImg.trim()) {
      return html`
        <img
          src=${customImg.trim()}
          alt="icon"
          loading="lazy"
        />
      `;
    }

    const idx = index % 6;

    switch (idx) {
      case 0: // propeller
        return html`
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#0D0D0D" />
            <path
              d="M16 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-7c-1.5 2-2 4.5-.5 6 1.5 1.5 4 1 6-.5 2-1.5 2.5-4 1-5.5s-4.5-1.5-6.5 0zm-5.5 13.5c-1.5-2-4-2.5-5.5-1s-1.5 4.5 0 6.5 4.5 2 6 .5 1-4-.5-6zm12 2c-.5 2.5 0 5 1.5 6s4 0 5-2-.5-4.5-2-5.5-4-.5-4.5 1.5z"
              fill="#FFFFFF"
            />
          </svg>
        `;
      case 1: // camera
        return html`
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#0D0D0D" />
            <path
              d="M12 11h2l1-1.5h2l1 1.5h2c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H12c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2zm4 2.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0 1.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
              fill="#FFFFFF"
            />
          </svg>
        `;
      case 2: // aerial
        return html`
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#0D0D0D" />
            <path
              d="M16 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4.24-2.24a6 6 0 0 1 8.48 0l1.42-1.42a8 8 0 0 0-11.32 0l1.42 1.42zm-2.83-2.83a10 10 0 0 1 14.14 0l1.42-1.42a12 12 0 0 0-16.98 0l1.42 1.42z"
              fill="#FFFFFF"
            />
          </svg>
        `;
      case 3: // guard
        return html`
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#0D0D0D" />
            <circle
              cx="16"
              cy="16"
              r="6"
              stroke="#FFFFFF"
              stroke-width="2.5"
              fill="none"
            />
            <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
          </svg>
        `;
      case 4: // record
        return html`
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#0D0D0D" />
            <rect
              x="10"
              y="11"
              width="12"
              height="10"
              rx="2"
              stroke="#FFFFFF"
              stroke-width="1.8"
              fill="none"
            />
            <path d="M15 14l3 2-3 2v-4z" fill="#FFFFFF" />
            <circle cx="12" cy="13" r="0.8" fill="#FFFFFF" />
            <circle cx="20" cy="13" r="0.8" fill="#FFFFFF" />
          </svg>
        `;
      case 5: // wide
      default:
        return html`
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#0D0D0D" />
            <circle
              cx="16"
              cy="16"
              r="6.5"
              stroke="#FFFFFF"
              stroke-width="1.8"
              fill="none"
            />
            <path
              d="M16 9.5L18.5 14M22.5 16L18 18.5M16 22.5L13.5 18M9.5 16L14 13.5"
              stroke="#FFFFFF"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        `;
    }
  }

  private renderButton() {
    if (!this.showButton || !this.buttonText) return nothing;
    return html`
      <div class="cta-wrapper">
        ${renderTacticalButton(
          this.buttonText,
          this.buttonLink,
          "var(--btn-bg, #0d0d0d)"
        )}
      </div>
    `;
  }

  render() {
    const c = this.cfg;
    const bg = c.bg_color || "#ffffff";
    const text = c.text_color || "#111111";
    const desc = c.desc_color || "#666666";
    const line = c.line_color || "#e0e0e0";
    const btnBg = c.button_bg || "#0d0d0d";
    const btnText = c.button_color || "#ffffff";

    const bgType = this.bgType;
    const bgImage = this.bgImage;
    const overlay = Number(c.bg_overlay || 0) / 100;

    const customVars = [
      `--sec-bg:${bg}`,
      `--sec-text:${text}`,
      `--sec-desc:${desc}`,
      `--sec-line:${line}`,
      `--btn-bg:${btnBg}`,
      `--btn-text:${btnText}`,
    ].join(";");

    const features = this.featuresList;

    return html`
      <section class="features-section" id="features" style="${customVars}">
        <!-- Wireframe blueprint drone background -->
        ${bgType === "image" && bgImage
          ? html`<div
              class="bg-layer"
              style="background-image: url('${bgImage}');"
            ></div>`
          : nothing}
        ${overlay > 0
          ? html`<div class="bg-overlay" style="opacity: ${overlay};"></div>`
          : nothing}

        <div class="container">
          <!-- Section Header (Title on left, Heading on right in RTL) -->
          ${renderSectionHeader(
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
              <img
                src=${this.droneImage}
                alt="Drone"
                class="drone-img"
                loading="lazy"
              />
            </div>

            <!-- Absolute items on desktop / 2-column grid on mobile -->
            <div class="features-grid count-${features.length}">
              ${features.map(
                (f, i) => html`
                  <div class="feature-item pos-${i}">
                    <div class="feature-header">
                      <span class="feature-icon">
                        ${this.renderIcon(f.icon_image, i)}
                      </span>
                      <h4 class="feature-title">${f.title || ""}</h4>
                    </div>
                    <p class="feature-desc">${f.desc || ""}</p>
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
}
