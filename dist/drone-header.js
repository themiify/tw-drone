import { LitElement as $, css as S, html as d, nothing as m } from "lit";
import { property as L, state as w } from "lit/decorators.js";
import { b as T, c as _ } from "./theme-CYKg-qWL.js";
var M = Object.defineProperty, x = (c, t, e, u) => {
  for (var o = void 0, s = c.length - 1, h; s >= 0; s--)
    (h = c[s]) && (o = h(t, e, o) || o);
  return o && M(t, e, o), o;
};
const E = "https://cdn.files.salla.network/other/1637672648/216e55b8-cde0-4628-ba37-b6dc387cc7a4-original.png";
function O(c) {
  if (!c) return null;
  if (typeof c == "object") return c;
  if (typeof c == "string")
    try {
      const t = document.createElement("textarea");
      return t.innerHTML = c, JSON.parse(t.value);
    } catch {
      try {
        return JSON.parse(c);
      } catch {
        return null;
      }
    }
  return null;
}
const k = class k extends $ {
  constructor() {
    super(...arguments), this.mobileMenuOpen = !1, this.isScrolled = !1, this.onWindowScroll = () => {
      if (!this.isSticky) {
        this.isScrolled && (this.isScrolled = !1);
        return;
      }
      const t = window.scrollY > 10;
      t !== this.isScrolled && (this.isScrolled = t);
    };
  }
  get cfg() {
    return O(this.config) || {};
  }
  get logoImage() {
    return this.cfg.logo_image || E;
  }
  get logoText() {
    return this.cfg.logo_text || "";
  }
  get logoHeight() {
    const t = Number(this.cfg.logo_height);
    return Number.isFinite(t) && t > 0 ? t : 40;
  }
  get logoHeightMobile() {
    const t = Number(this.cfg.logo_height_mobile);
    return Number.isFinite(t) && t > 0 ? t : Math.min(this.logoHeight, 30);
  }
  get logoUrl() {
    const t = this.cfg.logo_url;
    if (typeof t == "string" && t) return t;
    if (Array.isArray(t) && t.length) {
      const e = t[0];
      return String((e == null ? void 0 : e.value) ?? e ?? "#");
    }
    return "#";
  }
  get isSticky() {
    const t = this.cfg.sticky;
    return t == null ? !0 : t === !0 || t === "true" || t === 1 || t === "1";
  }
  get links() {
    const t = this.cfg.links;
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
      const e = t[0];
      return String((e == null ? void 0 : e.value) ?? e ?? "#");
    }
    return "#";
  }
  connectedCallback() {
    super.connectedCallback(), this.updateStickyHost(), window.addEventListener("scroll", this.onWindowScroll, { passive: !0 }), this.onWindowScroll();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("scroll", this.onWindowScroll);
  }
  updated(t) {
    super.updated(t), this.updateStickyHost();
  }
  updateStickyHost() {
    this.isSticky ? (this.classList.add("sticky-header"), this.style.height = "72px", this.style.minHeight = "72px", this.style.display = "block") : (this.classList.remove("sticky-header"), this.style.height = "", this.style.minHeight = "");
  }
  handleNavClick(t, e, u) {
    this.mobileMenuOpen = !1;
    let o = "";
    if (typeof e == "string")
      o = e.trim();
    else if (Array.isArray(e) && e.length) {
      const i = e[0];
      o = String((i == null ? void 0 : i.value) ?? (i == null ? void 0 : i.url) ?? i ?? "").trim();
    } else if (e && typeof e == "object") {
      const i = e;
      o = String(i.value ?? i.url ?? "").trim();
    }
    const s = (u || "").trim(), h = o.includes("#"), f = !o || o === "#" || o === "/" || o === "#hero" || h, b = s.includes("رئيسية") || s.includes("مميزات") || s.includes("قصة") || s.includes("أجزاء") || s.includes("اجزاء") || s.includes("أسئلة") || s.includes("اسئلة") || s.includes("فيديو") || s.includes("فيديوهات");
    if (!f && !b)
      return;
    if (t.preventDefault(), o === "#" || o === "" || o === "/" || o === "#hero" || s.includes("الرئيسية")) {
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
    h && (a = o.substring(o.indexOf("#") + 1).toLowerCase().trim());
    const n = [
      { tag: "drone-hero", id: "hero", keywords: ["hero", "رئيسية", "الرئيسية"] },
      { tag: "drone-features", id: "features", keywords: ["features", "feature", "مميزات", "المميزات", "ميزات"] },
      { tag: "drone-story", id: "story", keywords: ["story", "قصة", "القصة", "قصه"] },
      { tag: "drone-parts", id: "parts", keywords: ["parts", "part", "اجزاء", "أجزاء", "الأجزاء", "اجزاء الدرون", "أجزاء الدرون", "قطع"] },
      { tag: "drone-faq", id: "faq", keywords: ["faq", "أسئلة", "اسئلة", "الاسئلة", "الأسئلة", "سؤال"] },
      { tag: "drone-videos", id: "videos", keywords: ["videos", "video", "فيديو", "الفيديو", "فيديوهات", "الفيديوهات"] }
    ];
    let r = null;
    if (a && (r = document.getElementById(a), r || (r = document.querySelector(`drone-${a}`) || document.querySelector(`[component-name="drone-${a}"]`) || document.querySelector(`[component-name="${a}"]`))), !r) {
      const i = [a, s.toLowerCase()].filter(Boolean);
      for (const l of n)
        if (l.keywords.some(
          (v) => i.some((g) => g.includes(v.toLowerCase()))
        ) && (r = document.querySelector(l.tag) || document.querySelector(`[component-name="${l.tag}"]`) || document.getElementById(l.id), r))
          break;
    }
    if (!r && a) {
      const i = document.querySelectorAll(
        "drone-hero, drone-features, drone-story, drone-parts, drone-faq, drone-videos, salla-custom-component"
      );
      for (const l of Array.from(i))
        if (l.shadowRoot && l.shadowRoot.getElementById(a)) {
          r = l;
          break;
        }
    }
    if (r) {
      const i = r.parentElement && r.parentElement.tagName.toLowerCase().includes("custom-component") ? r.parentElement : r;
      i.style.scrollMarginTop = "80px", r.style.scrollMarginTop = "80px";
      try {
        i.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {
        try {
          r.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch {
        }
      }
      const l = 76, y = i.getBoundingClientRect(), v = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, g = Math.max(0, y.top + v - l);
      try {
        window.scrollTo({ top: g, behavior: "smooth" });
      } catch {
      }
      if (document.documentElement)
        try {
          document.documentElement.scrollTo({ top: g, behavior: "smooth" });
        } catch {
        }
      if (document.body)
        try {
          document.body.scrollTo({ top: g, behavior: "smooth" });
        } catch {
        }
      if (document.scrollingElement)
        try {
          document.scrollingElement.scrollTo({ top: g, behavior: "smooth" });
        } catch {
        }
      if (a)
        try {
          history.pushState(null, "", `#${a}`);
        } catch {
        }
    }
  }
  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  renderLogo() {
    const t = `${this.logoHeight}px`, e = `${this.logoHeightMobile}px`, u = this.logoImage;
    return d`<img
      class="logo-img"
      src=${u}
      alt=${this.logoText}
      style="--logo-h: ${t}; --logo-h-mobile: ${e};"
    />`;
  }
  renderButton() {
    return !this.showButton || !this.buttonText ? m : _(this.buttonText, this.buttonLink, "var(--btn-bg)");
  }
  render() {
    const t = this.cfg, e = t.bg_color || "#0d0d0d", u = t.text_color || "#ffffff", o = t.active_color || "#ffffff", s = t.button_bg || "#ffffff", h = t.button_color || "#0d0d0d", f = t.border_color || "#262626", b = [
      `--hdr-bg:${e}`,
      `--hdr-text:${u}`,
      `--hdr-active:${o}`,
      `--btn-bg:${s}`,
      `--btn-text:${h}`,
      `--hdr-border:${f}`
    ].join(";"), a = this.links;
    return d`
      <header
        class="header-wrap ${this.isSticky ? "sticky" : ""} ${t.border_bottom ? "bordered" : ""}"
        style="${b}"
      >
        <div class="container">
          <!-- Logo (Right in RTL) -->
          <a
            class="logo-link"
            href=${this.logoUrl}
            @click=${(n) => this.handleNavClick(n, this.logoUrl)}
          >
            ${this.renderLogo()}
          </a>

          <!-- Nav Links (Center in RTL) -->
          <nav class="nav-desktop">
            ${a.map(
      (n) => d`
                <a
                  class="nav-link ${n.active ? "active" : ""}"
                  href=${n.url || "#"}
                  @click=${(r) => this.handleNavClick(r, n.url, n.label)}
                >
                  ${n.active ? d`<span class="dash">_</span>` : m}
                  <span>${n.label || ""}</span>
                  ${n.active ? d`<span class="dash">_</span>` : m}
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
            ${a.map(
      (n) => d`
                <a
                  class="nav-link ${n.active ? "active" : ""}"
                  href=${n.url || "#"}
                  @click=${(r) => this.handleNavClick(r, n.url, n.label)}
                >
                  ${n.active ? d`<span class="dash">_</span>` : m}
                  <span>${n.label || ""}</span>
                  ${n.active ? d`<span class="dash">_</span>` : m}
                </a>
              `
    )}
          </div>
          ${this.renderButton()}
        </div>
      </header>
    `;
  }
};
k.styles = [
  T,
  S`
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
  `
];
let p = k;
x([
  L({ type: Object })
], p.prototype, "config");
x([
  w()
], p.prototype, "mobileMenuOpen");
x([
  w()
], p.prototype, "isScrolled");
typeof p < "u" && p.registerSallaComponent("salla-drone-header");
export {
  p as default
};
