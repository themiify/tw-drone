import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

interface FooterLinkItem {
  label?: string;
  url?: string;
}

interface DroneFooterConfig {
  bg_type?: unknown;
  bg_color?: string;
  bg_image?: string;
  bg_overlay?: number;

  logo_image?: string;
  logo_text?: string;
  logo_height?: number;
  logo_url?: unknown;
  invert_logo?: boolean;

  description?: string;

  links?: FooterLinkItem[];
  reverse?: boolean;

  social_title?: string;
  facebook_url?: string;
  instagram_url?: string;
  x_url?: string;
  linkedin_url?: string;

  show_button?: boolean;
  button_text?: string;
  source_url?: unknown;

  show_watermark?: boolean;
  watermark_text?: string;
  watermark_color?: string;

  show_copyright?: boolean;
  copyright_text?: string;

  text_color?: string;
  desc_color?: string;
  link_color?: string;
  line_color?: string;
  social_bg?: string;
  social_color?: string;
  button_bg?: string;
  button_color?: string;
}

const DEFAULT_BG_IMAGE =
  "https://cdn.files.salla.network/other/1637672648/4a12a535-9334-4c39-a14e-3c8b16f71d1d-original.png";

const DEFAULT_LOGO_URL =
  "https://cdn.files.salla.network/other/1637672648/216e55b8-cde0-4628-ba37-b6dc387cc7a4-original.png";

const DEFAULT_LINKS: FooterLinkItem[] = [
  { label: "الرئيسية", url: "#" },
  { label: "المميزات", url: "#features" },
  { label: "القصة", url: "#story" },
  { label: "اجزاء الدرون", url: "#parts" },
  { label: "الاسئلة الشائعة", url: "#faq" },
  { label: "الفيدوهات", url: "#videos" },
];

const DEFAULT_DESC =
  "اكتشف العالم من زاوية مختلفة مع درون يجمع بين التكنولوجيا والإبداع. خليك مستعد لمغامرات جديدة، والتقط لحظاتك من السماء، وحوّل كل تجربة لذكرى تستحق الاحتفاظ بيها.";

function pick(v: unknown): string {
  if (Array.isArray(v)) {
    const first: any = v[0];
    return String(first?.value ?? first ?? "");
  }
  if (v && typeof v === "object") return String((v as any).value ?? "");
  return v == null ? "" : String(v);
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

export default class DroneFooter extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  private get cfg(): DroneFooterConfig {
    const parsed = parseJsonSafe(this.config);
    return parsed && typeof parsed === "object" ? parsed : {};
  }

  private get bgType(): string {
    return pick(this.cfg.bg_type) || "image";
  }

  private get bgImage(): string {
    const img = this.cfg.bg_image;
    if (typeof img === "string" && img) return img;
    return DEFAULT_BG_IMAGE;
  }

  private get logoImage(): string {
    const img = this.cfg.logo_image;
    if (typeof img === "string" && img) return img;
    return DEFAULT_LOGO_URL;
  }

  private get logoText(): string {
    return this.cfg.logo_text || "Drone";
  }

  private get logoHeight(): number {
    const h = Number(this.cfg.logo_height);
    return Number.isFinite(h) && h > 0 ? h : 44;
  }

  private get logoUrl(): string {
    const u = this.cfg.logo_url;
    if (typeof u === "string" && u) return u;
    if (Array.isArray(u) && u.length) {
      const f: any = u[0];
      return String(f?.value ?? f ?? "#");
    }
    return "#";
  }

  private get description(): string {
    return this.cfg.description ?? DEFAULT_DESC;
  }

  private get links(): FooterLinkItem[] {
    const list = this.cfg.links;
    return Array.isArray(list) && list.length > 0 ? list : DEFAULT_LINKS;
  }

  private get socialTitle(): string {
    return this.cfg.social_title ?? "تابعنا على مواقعنا الآتية";
  }

  private get buttonText(): string {
    return this.cfg.button_text ?? "اطلب درونك الآن";
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

  static styles = css`
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
      --social-bg: #ebebeb;
      --social-color: #111111;
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
      gap: 0.65rem;
    }

    .social-badge {
      width: 38px;
      height: 38px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--social-bg);
      color: var(--social-color);
      clip-path: polygon(
        22% 0%,
        78% 0%,
        100% 22%,
        100% 78%,
        78% 100%,
        22% 100%,
        0% 78%,
        0% 22%
      );
      text-decoration: none;
      transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease,
        box-shadow 0.2s ease;
      cursor: pointer;
    }

    .social-badge:hover {
      background: var(--btn-bg);
      color: var(--btn-text);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .social-badge svg {
      width: 17px;
      height: 17px;
    }

    /* CTA Button */
    .cta-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.6rem 1.6rem;
      text-decoration: none;
      color: var(--btn-text);
      font-weight: 700;
      font-size: 0.88rem;
      white-space: nowrap;
      cursor: pointer;
      background: transparent;
      border: none;
      min-width: 145px;
      height: 42px;
      margin-top: 0.3rem;
      transition: transform 0.15s ease, filter 0.15s ease;
    }

    .cta-btn:hover {
      transform: translateY(-2px);
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25));
    }

    .cta-btn:active {
      transform: translateY(1px);
    }

    .cta-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
    }

    .cta-text {
      position: relative;
      z-index: 2;
      line-height: 1;
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
      line-height: 0.72;
      text-align: center;
      user-select: none;
      pointer-events: none;
      position: relative;
      z-index: 2;
    }

    .bottom-watermark {
      display: block;
      font-size: clamp(6.5rem, 23vw, 19rem);
      font-weight: 900;
      letter-spacing: -0.04em;
      color: var(--wm-color);
      opacity: var(--wm-opacity);
      margin-bottom: -0.08em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
      text-transform: capitalize;
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
      .bottom-watermark-wrap {
        margin-top: 2rem;
      }
    }
  `;

  private renderLogo() {
    const height = `${this.logoHeight}px`;
    const src = this.logoImage;

    return html`<img
      class="logo-img"
      src=${src}
      alt=${this.logoText}
      style="--logo-h: ${height};"
    />`;
  }

  private renderButton() {
    if (this.cfg.show_button === false) return nothing;
    return html`
      <a class="cta-btn" href=${this.buttonLink}>
        <svg
          class="cta-bg"
          viewBox="0 0 170 42"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Tactical sci-fi notched button -->
          <path
            d="M 0 0 L 100 0 L 106 7 L 109 7 L 114 0 L 120 0 L 126 7 L 129 7 L 134 0 L 170 0 L 170 42 L 70 42 L 64 35 L 61 35 L 56 42 L 50 42 L 44 35 L 41 35 L 36 42 L 0 42 Z"
            fill="var(--btn-bg)"
          />
        </svg>
        <span class="cta-text">${this.buttonText}</span>
      </a>
    `;
  }

  private renderSocialIcons() {
    const c = this.cfg;
    const fb = c.facebook_url || "#";
    const ig = c.instagram_url || "#";
    const x = c.x_url || "#";
    const li = c.linkedin_url || "#";

    return html`
      <div class="social-section">
        <h4 class="social-title">${this.socialTitle}</h4>
        <div class="social-icons">
          <!-- Facebook -->
          <a
            class="social-badge"
            href=${fb}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              />
            </svg>
          </a>

          <!-- Instagram -->
          <a
            class="social-badge"
            href=${ig}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
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
            </svg>
          </a>

          <!-- X (Twitter) -->
          <a
            class="social-badge"
            href=${x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </a>

          <!-- LinkedIn -->
          <a
            class="social-badge"
            href=${li}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    `;
  }

  render() {
    const c = this.cfg;
    const bg = c.bg_color || "#ffffff";
    const text = c.text_color || "#111111";
    const desc = c.desc_color || "#4a4a4a";
    const link = c.link_color || "#0d0d0d";
    const line = c.line_color || "#e0e0e0";
    const socialBg = c.social_bg || "#ebebeb";
    const socialColor = c.social_color || "#111111";
    const btnBg = c.button_bg || "#0d0d0d";
    const btnText = c.button_color || "#ffffff";
    const wmColor = c.watermark_color || "#0d0d0d";
    const wmText = c.watermark_text || "Drone";

    const bgType = this.bgType;
    const bgImage = this.bgImage;
    const overlay = Number(c.bg_overlay || 0) / 100;

    // Logo filter: Invert white logo to black on white background
    const invertLogo = c.invert_logo !== false;
    const logoFilter = invertLogo ? "invert(1)" : "none";

    const customVars = [
      `--ftr-bg:${bg}`,
      `--ftr-text:${text}`,
      `--ftr-desc:${desc}`,
      `--ftr-link:${link}`,
      `--ftr-line:${line}`,
      `--social-bg:${socialBg}`,
      `--social-color:${socialColor}`,
      `--btn-bg:${btnBg}`,
      `--btn-text:${btnText}`,
      `--wm-color:${wmColor}`,
      `--logo-filter:${logoFilter}`,
    ].join(";");

    const links = this.links;

    return html`
      <footer class="footer-wrap" style="${customVars}">
        <!-- Background image layer (wireframe blueprints) -->
        ${bgType === "image" && bgImage
          ? html`<div
              class="bg-image-layer"
              style="background-image: url('${bgImage}');"
            ></div>`
          : nothing}

        <!-- Background color overlay if specified -->
        ${overlay > 0
          ? html`<div
              class="bg-overlay-layer"
              style="opacity: ${overlay};"
            ></div>`
          : nothing}

        <div class="container">
          <div class="columns ${c.reverse ? "reverse" : ""}">
            <!-- Child 1: Brand Column (Right side in RTL) -->
            <div class="col-brand">
              <a class="logo-link" href=${this.logoUrl}>
                ${this.renderLogo()}
              </a>

              <p class="desc">${this.description}</p>

              ${this.renderSocialIcons()}
              ${this.renderButton()}
            </div>

            <!-- Child 2: Links Column (Left side in RTL) -->
            <div class="col-links">
              ${links.map(
                (l) => html`
                  <a class="link-row" href=${l.url || "#"}>
                    <span class="link-arrow">
                      <!-- Up-Left arrow ↖ -->
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 16L8 8M8 8H15M8 8V15" />
                      </svg>
                    </span>
                    <span class="link-label">${l.label || ""}</span>
                  </a>
                `
              )}
            </div>
          </div>
        </div>

        <!-- Huge Oversized Watermark "Drone" -->
        ${c.show_watermark !== false
          ? html`
              <div class="bottom-watermark-wrap">
                <span class="bottom-watermark">${wmText}</span>
              </div>
            `
          : nothing}

        <!-- Optional Copyright Footer Bar -->
        ${c.show_copyright
          ? html`
              <div class="copyright-bar">
                ${c.copyright_text || "جميع الحقوق محفوظة © 2026 درون"}
              </div>
            `
          : nothing}
      </footer>
    `;
  }
}
