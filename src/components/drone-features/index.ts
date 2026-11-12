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
  badge?: string;
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

const DEFAULT_DRONE_IMAGE = "";

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
    return this.cfg.badge || this.cfg.title || "";
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
    return "";
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
    `,
  ];

  private renderIcon(customImg?: string) {
    if (customImg && typeof customImg === "string" && customImg.trim()) {
      return html`
        <span class="feature-icon">
          <img
            src=${customImg.trim()}
            alt=""
            loading="lazy"
          />
        </span>
      `;
    }
    return nothing;
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

    const iconBg = c.icon_bg || c.button_bg || "#0d0d0d";

    const customVars = [
      `--sec-bg:${bg}`,
      `--sec-text:${text}`,
      `--sec-desc:${desc}`,
      `--sec-line:${line}`,
      `--btn-bg:${btnBg}`,
      `--btn-text:${btnText}`,
      `--icon-bg:${iconBg}`,
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
              ${this.droneImage
                ? html`<img
                    src=${this.droneImage}
                    alt="Drone"
                    class="drone-img"
                    loading="lazy"
                  />`
                : nothing}
            </div>

            <!-- Absolute items on desktop / 2-column grid on mobile -->
            <div class="features-grid count-${features.length}">
              ${features.map(
                (f, i) => html`
                  <div class="feature-item pos-${i}">
                    <div class="feature-header">
                      ${this.renderIcon(f.icon_image)}
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
