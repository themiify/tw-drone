import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { renderTacticalButton, tacticalButtonStyles } from "../../shared/theme.js";

interface NavLinkItem {
  label?: string;
  url?: string;
  active?: boolean;
}

interface DroneHeaderConfig {
  logo_image?: string;
  logo_text?: string;
  logo_height?: number;
  logo_height_mobile?: number;
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

const DEFAULT_LOGO_URL =
  "https://cdn.files.salla.network/other/1637672648/216e55b8-cde0-4628-ba37-b6dc387cc7a4-original.png";

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

  @state()
  private isScrolled = false;

  private get cfg(): DroneHeaderConfig {
    const c = parseJsonSafe(this.config) || {};
    return c;
  }

  private get logoImage(): string {
    return this.cfg.logo_image || DEFAULT_LOGO_URL;
  }

  private get logoText(): string {
    return this.cfg.logo_text || "";
  }

  private get logoHeight(): number {
    const h = Number(this.cfg.logo_height);
    return Number.isFinite(h) && h > 0 ? h : 40;
  }

  private get logoHeightMobile(): number {
    const hm = Number(this.cfg.logo_height_mobile);
    if (Number.isFinite(hm) && hm > 0) return hm;
    return Math.min(this.logoHeight, 30);
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

  private get isSticky(): boolean {
    const s = this.cfg.sticky;
    if (s === undefined || s === null) return true;
    return s === true || s === "true" || s === 1 || s === "1";
  }

  private get links(): NavLinkItem[] {
    const raw = this.cfg.links;
    return Array.isArray(raw) ? raw : [];
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
    css`
    :host {
      display: block;
      direction: rtl;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 99999;
      --hdr-bg: #0d0d0d;
      --hdr-text: #ffffff;
      --hdr-active: #ffffff;
      --btn-bg: #ffffff;
      --btn-text: #0d0d0d;
      --hdr-border: #262626;
    }

    :host(.sticky-header) {
      display: block;
      width: 100%;
      height: 72px;
      min-height: 72px;
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
      transition: background 0.2s ease, box-shadow 0.2s ease;
    }

    .header-wrap.sticky {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      z-index: 99999 !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
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
      height: var(--logo-h, 40px);
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

      .logo-img {
        height: var(--logo-h-mobile, var(--logo-h, 30px));
      }
    }
  `];

  private onWindowScroll = () => {
    if (!this.isSticky) {
      if (this.isScrolled) this.isScrolled = false;
      return;
    }
    const scrolled = window.scrollY > 10;
    if (scrolled !== this.isScrolled) {
      this.isScrolled = scrolled;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.updateStickyHost();
    window.addEventListener("scroll", this.onWindowScroll, { passive: true });
    this.onWindowScroll();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("scroll", this.onWindowScroll);
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    this.updateStickyHost();
  }

  private updateStickyHost() {
    if (this.isSticky) {
      this.classList.add("sticky-header");
      this.style.height = "72px";
      this.style.minHeight = "72px";
      this.style.display = "block";
    } else {
      this.classList.remove("sticky-header");
      this.style.height = "";
      this.style.minHeight = "";
    }
  }

  private handleNavClick(e: Event, rawUrl?: unknown, label?: string) {
    this.mobileMenuOpen = false;

    // Extract clean URL string from whatever Salla passed (string, object, array)
    let url = "";
    if (typeof rawUrl === "string") {
      url = rawUrl.trim();
    } else if (Array.isArray(rawUrl) && rawUrl.length) {
      const f: any = rawUrl[0];
      url = String(f?.value ?? f?.url ?? f ?? "").trim();
    } else if (rawUrl && typeof rawUrl === "object") {
      const o = rawUrl as any;
      url = String(o.value ?? o.url ?? "").trim();
    }

    const cleanLabel = (label || "").trim();

    // Check if this is an in-page navigation (contains #, or starts with #, or has a section keyword in label)
    const hasHash = url.includes("#");
    const isLocalAnchor = !url || url === "#" || url === "/" || url === "#hero" || hasHash;
    const isSectionLabel =
      cleanLabel.includes("رئيسية") ||
      cleanLabel.includes("مميزات") ||
      cleanLabel.includes("قصة") ||
      cleanLabel.includes("أجزاء") ||
      cleanLabel.includes("اجزاء") ||
      cleanLabel.includes("أسئلة") ||
      cleanLabel.includes("اسئلة") ||
      cleanLabel.includes("فيديو") ||
      cleanLabel.includes("فيديوهات");

    if (!isLocalAnchor && !isSectionLabel) {
      // External page URL
      return;
    }

    e.preventDefault();

    // 1. Home / Hero navigation
    if (
      url === "#" ||
      url === "" ||
      url === "/" ||
      url === "#hero" ||
      cleanLabel.includes("الرئيسية")
    ) {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {}
      if (document.documentElement) {
        try {
          document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
        } catch {}
      }
      if (document.body) {
        try {
          document.body.scrollTo({ top: 0, behavior: "smooth" });
        } catch {}
      }
      try {
        history.pushState(null, "", window.location.pathname);
      } catch {}
      return;
    }

    // 2. Extract section hash or match by keyword
    let hash = "";
    if (hasHash) {
      hash = url.substring(url.indexOf("#") + 1).toLowerCase().trim();
    }

    // Map section names to DOM tags and IDs
    const componentKeywords: Array<{ tag: string; id: string; keywords: string[] }> = [
      { tag: "drone-hero", id: "hero", keywords: ["hero", "رئيسية", "الرئيسية"] },
      { tag: "drone-features", id: "features", keywords: ["features", "feature", "مميزات", "المميزات", "ميزات"] },
      { tag: "drone-story", id: "story", keywords: ["story", "قصة", "القصة", "قصه"] },
      { tag: "drone-parts", id: "parts", keywords: ["parts", "part", "اجزاء", "أجزاء", "الأجزاء", "اجزاء الدرون", "أجزاء الدرون", "قطع"] },
      { tag: "drone-faq", id: "faq", keywords: ["faq", "أسئلة", "اسئلة", "الاسئلة", "الأسئلة", "سؤال"] },
      { tag: "drone-videos", id: "videos", keywords: ["videos", "video", "فيديو", "الفيديو", "فيديوهات", "الفيديوهات"] },
    ];

    let target: HTMLElement | null = null;

    // A) Try finding by exact hash ID if given
    if (hash) {
      target = document.getElementById(hash);
      if (!target) {
        target =
          document.querySelector(`drone-${hash}`) ||
          document.querySelector(`[component-name="drone-${hash}"]`) ||
          document.querySelector(`[component-name="${hash}"]`);
      }
    }

    // B) If not found yet, search via matching keywords on hash and label
    if (!target) {
      const searchTerms = [hash, cleanLabel.toLowerCase()].filter(Boolean);
      for (const comp of componentKeywords) {
        const matches = comp.keywords.some((k) =>
          searchTerms.some((t) => t.includes(k.toLowerCase()))
        );
        if (matches) {
          target =
            document.querySelector(comp.tag) ||
            document.querySelector(`[component-name="${comp.tag}"]`) ||
            document.getElementById(comp.id);
          if (target) break;
        }
      }
    }

    // C) Deep shadowRoot search fallback
    if (!target && hash) {
      const allCustom = document.querySelectorAll(
        "drone-hero, drone-features, drone-story, drone-parts, drone-faq, drone-videos, salla-custom-component"
      );
      for (const el of Array.from(allCustom)) {
        if ((el as any).shadowRoot) {
          const inner = (el as any).shadowRoot.getElementById(hash);
          if (inner) {
            target = el as HTMLElement;
            break;
          }
        }
      }
    }

    if (target) {
      const scrollTarget =
        (target.parentElement && target.parentElement.tagName.toLowerCase().includes("custom-component"))
          ? target.parentElement
          : target;

      scrollTarget.style.scrollMarginTop = "80px";
      target.style.scrollMarginTop = "80px";

      // 1. Native scrollIntoView (works across all containers: window, div, iframe, body)
      try {
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {
        try {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch {}
      }

      // 2. Exact pixel offset scroll across window and document elements
      const headerOffset = 76;
      const rect = scrollTarget.getBoundingClientRect();
      const currentScrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const targetTop = Math.max(0, rect.top + currentScrollTop - headerOffset);

      try {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      } catch {}
      if (document.documentElement) {
        try {
          document.documentElement.scrollTo({ top: targetTop, behavior: "smooth" });
        } catch {}
      }
      if (document.body) {
        try {
          document.body.scrollTo({ top: targetTop, behavior: "smooth" });
        } catch {}
      }
      if (document.scrollingElement) {
        try {
          (document.scrollingElement as HTMLElement).scrollTo({ top: targetTop, behavior: "smooth" });
        } catch {}
      }

      if (hash) {
        try {
          history.pushState(null, "", `#${hash}`);
        } catch {}
      }
    }
  }

  private toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  private renderLogo() {
    const height = `${this.logoHeight}px`;
    const heightMobile = `${this.logoHeightMobile}px`;
    const src = this.logoImage;

    return html`<img
      class="logo-img"
      src=${src}
      alt=${this.logoText}
      style="--logo-h: ${height}; --logo-h-mobile: ${heightMobile};"
    />`;
  }

  private renderButton() {
    if (!this.showButton || !this.buttonText) return nothing;
    return renderTacticalButton(this.buttonText, this.buttonLink, "var(--btn-bg)");
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
        class="header-wrap ${this.isSticky ? "sticky" : ""} ${c.border_bottom ? "bordered" : ""}"
        style="${customVars}"
      >
        <div class="container">
          <!-- Logo (Right in RTL) -->
          <a
            class="logo-link"
            href=${this.logoUrl}
            @click=${(e: Event) => this.handleNavClick(e, this.logoUrl)}
          >
            ${this.renderLogo()}
          </a>

          <!-- Nav Links (Center in RTL) -->
          <nav class="nav-desktop">
            ${links.map(
              (l) => html`
                <a
                  class="nav-link ${l.active ? "active" : ""}"
                  href=${l.url || "#"}
                  @click=${(e: Event) => this.handleNavClick(e, l.url, l.label)}
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
            aria-label="القائمة"
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
                  @click=${(e: Event) => this.handleNavClick(e, l.url, l.label)}
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
