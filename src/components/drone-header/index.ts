import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";

interface NavLinkItem {
  label?: string;
  url?: string;
  active?: boolean;
}

interface DroneHeaderConfig {
  logo_type?: unknown;
  logo_image?: string;
  logo_text?: string;
  logo_height?: number;
  logo_url?: unknown;

  links?: NavLinkItem[];
  active_index?: number;

  show_button?: boolean;
  button_text?: string;
  source_url?: unknown;

  bg_color?: string;
  text_color?: string;
  active_color?: string;
  button_bg?: string;
  button_color?: string;

  sticky?: boolean;
  border_bottom?: boolean;
  border_color?: string;
}

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: "Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©", url: "#", active: true },
  { label: "Ø§Ù„Ù…Ù…ÙŠØ²Ø§Øª", url: "#features", active: false },
  { label: "Ø§Ù„Ù‚ØµØ©", url: "#story", active: false },
  { label: "Ø§Ù„Ø£Ø¬Ø²Ø§Ø¡", url: "#parts", active: false },
  { label: "Ø§Ù„Ø§Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ø§Ø¦Ø¹Ø©", url: "#faq", active: false },
  { label: "Ø§Ù„ÙÙŠØ¯ÙˆÙ‡Ø§Øª", url: "#videos", active: false },
];

const DEFAULT_LOGO_B64 =
  "data:image/png;base64,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";

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

export default class DroneHeader extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  @state()
  private mobileMenuOpen = false;

  private get cfg(): DroneHeaderConfig {
    const c = parseJsonSafe(this.config) || {};
    return c;
  }

  private get logoType(): string {
    const t = pick(this.cfg.logo_type);
    return t || "default";
  }

  private get logoImage(): string {
    return this.cfg.logo_image || DEFAULT_LOGO_B64;
  }

  private get logoText(): string {
    return this.cfg.logo_text || "Drone";
  }

  private get logoHeight(): number {
    const h = Number(this.cfg.logo_height);
    return Number.isFinite(h) && h > 0 ? h : 38;
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

  private get links(): NavLinkItem[] {
    const raw = this.cfg.links;
    if (Array.isArray(raw) && raw.length > 0) return raw;
    return DEFAULT_LINKS;
  }

  private get showButton(): boolean {
    return this.cfg.show_button !== false;
  }

  private get buttonText(): string {
    return this.cfg.button_text || "Ø§Ø·Ù„Ø¨ Ø¯Ø±ÙˆÙ†Ùƒ Ø§Ù„Ø¢Ù†";
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
      --hdr-bg: #0d0d0d;
      --hdr-text: #ffffff;
      --hdr-active: #ffffff;
      --btn-bg: #ffffff;
      --btn-text: #0d0d0d;
      --hdr-border: #262626;
    }

    * {
      box-sizing: border-box;
    }

    .header-wrap {
      background: var(--hdr-bg);
      color: var(--hdr-text);
      width: 100%;
      position: relative;
      z-index: 100;
      transition: background 0.2s ease;
    }

    .header-wrap.sticky {
      position: sticky;
      top: 0;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }

    .header-wrap.bordered {
      border-bottom: 1px solid var(--hdr-border);
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }

    /* =================== LOGO =================== */
    .logo-link {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      color: var(--hdr-text);
      flex-shrink: 0;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .logo-link:hover {
      opacity: 0.9;
      transform: scale(1.02);
    }

    .logo-img {
      height: var(--logo-h, 38px);
      width: auto;
      object-fit: contain;
      display: block;
    }

    .logo-text {
      font-size: 1.4rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--hdr-text);
    }

    /* =================== NAV LINKS =================== */
    .nav-desktop {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.8rem;
      flex: 1;
      margin: 0 1rem;
    }

    .nav-link {
      position: relative;
      color: var(--hdr-text);
      text-decoration: none;
      font-size: 0.92rem;
      font-weight: 500;
      padding: 0.5rem 0.2rem;
      transition: color 0.2s ease, opacity 0.2s ease;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      opacity: 0.85;
    }

    .nav-link:hover {
      opacity: 1;
      color: var(--hdr-active);
    }

    .nav-link.active {
      opacity: 1;
      font-weight: 700;
      color: var(--hdr-active);
    }

    /* Active dash indicators _ text _ */
    .nav-link .dash {
      display: inline-block;
      font-weight: 700;
      opacity: 0.9;
      color: var(--hdr-active);
    }

    /* =================== CTA BUTTON =================== */
    .cta-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.55rem 1.6rem;
      text-decoration: none;
      color: var(--btn-text);
      font-weight: 700;
      font-size: 0.88rem;
      white-space: nowrap;
      flex-shrink: 0;
      cursor: pointer;
      background: transparent;
      border: none;
      min-width: 140px;
      height: 40px;
      transition: transform 0.15s ease, filter 0.15s ease;
    }

    .cta-btn:hover {
      transform: translateY(-1px);
      filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.25));
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

    /* =================== HAMBURGER =================== */
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: var(--hdr-text);
      cursor: pointer;
      padding: 0.5rem;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 40px;
      height: 40px;
      z-index: 102;
    }

    .menu-toggle span {
      display: block;
      height: 2px;
      width: 24px;
      background: var(--hdr-text);
      border-radius: 1px;
      transition: transform 0.25s ease, opacity 0.25s ease;
    }

    .menu-toggle.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .menu-toggle.open span:nth-child(2) {
      opacity: 0;
    }
    .menu-toggle.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* =================== MOBILE DRAWER =================== */
    .mobile-drawer {
      display: none;
    }

    @media (max-width: 900px) {
      .nav-desktop {
        display: none;
      }
      .cta-btn {
        display: none;
      }
      .menu-toggle {
        display: flex;
      }

      .mobile-drawer {
        display: block;
        position: fixed;
        top: 72px;
        right: 0;
        left: 0;
        background: var(--hdr-bg);
        border-bottom: 1px solid var(--hdr-border);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
        padding: 1.5rem;
        transform: translateY(-120%);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
          opacity 0.25s ease;
        z-index: 99;
      }

      .mobile-drawer.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      .mobile-links {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        margin-bottom: 1.5rem;
      }

      .mobile-links .nav-link {
        font-size: 1rem;
        padding: 0.6rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }

      .mobile-drawer .cta-btn {
        display: inline-flex;
        width: 100%;
      }
    }
  `;

  private toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  private renderLogo() {
    const type = this.logoType;
    const height = `${this.logoHeight}px`;

    if (type === "text") {
      return html`<span class="logo-text">${this.logoText}</span>`;
    }

    const src = type === "image" && this.cfg.logo_image ? this.cfg.logo_image : this.logoImage;
    return html`<img
      class="logo-img"
      src=${src}
      alt=${this.logoText}
      style="--logo-h: ${height};"
    />`;
  }

  private renderButton() {
    if (!this.showButton) return nothing;
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

  render() {
    const c = this.cfg;
    const bg = c.bg_color || "#0d0d0d";
    const text = c.text_color || "#ffffff";
    const active = c.active_color || "#ffffff";
    const btnBg = c.button_bg || "#ffffff";
    const btnText = c.button_color || "#0d0d0d";
    const border = c.border_color || "#262626";

    const customVars = [
      `--hdr-bg:${bg}`,
      `--hdr-text:${text}`,
      `--hdr-active:${active}`,
      `--btn-bg:${btnBg}`,
      `--btn-text:${btnText}`,
      `--hdr-border:${border}`,
    ].join(";");

    const links = this.links;

    return html`
      <header
        class="header-wrap ${c.sticky ? "sticky" : ""} ${c.border_bottom ? "bordered" : ""}"
        style="${customVars}"
      >
        <div class="container">
          <!-- Logo (Right in RTL) -->
          <a class="logo-link" href=${this.logoUrl}>
            ${this.renderLogo()}
          </a>

          <!-- Nav Links (Center in RTL) -->
          <nav class="nav-desktop">
            ${links.map(
              (l) => html`
                <a
                  class="nav-link ${l.active ? "active" : ""}"
                  href=${l.url || "#"}
                >
                  ${l.active ? html`<span class="dash">_</span>` : nothing}
                  <span>${l.label || ""}</span>
                  ${l.active ? html`<span class="dash">_</span>` : nothing}
                </a>
              `
            )}
          </nav>

          <!-- CTA Button (Left in RTL) -->
          ${this.renderButton()}

          <!-- Mobile Hamburger Toggle -->
          <button
            class="menu-toggle ${this.mobileMenuOpen ? "open" : ""}"
            @click=${this.toggleMenu}
            aria-label="Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <!-- Mobile Drawer Menu -->
        <div class="mobile-drawer ${this.mobileMenuOpen ? "open" : ""}">
          <div class="mobile-links">
            ${links.map(
              (l) => html`
                <a
                  class="nav-link ${l.active ? "active" : ""}"
                  href=${l.url || "#"}
                  @click=${() => (this.mobileMenuOpen = false)}
                >
                  ${l.active ? html`<span class="dash">_</span>` : nothing}
                  <span>${l.label || ""}</span>
                  ${l.active ? html`<span class="dash">_</span>` : nothing}
                </a>
              `
            )}
          </div>
          ${this.renderButton()}
        </div>
      </header>
    `;
  }
}

