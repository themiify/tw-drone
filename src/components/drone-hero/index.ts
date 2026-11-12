import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

export interface DroneHeroConfig {
  heading?: string;
  description?: string;
  drone_image?: string;
  panel_bg_image?: string;

  feature1_title?: string;
  feature1_text?: string;
  feature1_icon?: unknown;
  feature1_icon_image?: string;

  feature2_title?: string;
  feature2_text?: string;
  feature2_icon?: unknown;
  feature2_icon_image?: string;

  show_connectors?: boolean;

  show_price_box?: boolean;
  price_label?: string;
  price?: string;
  show_currency?: boolean;
  price_note?: string;

  show_button?: boolean;
  button_text?: string;
  source_url?: unknown;
  button_link?: string;

  /* Custom colors for all fields */
  bg_color?: string;
  panel_color?: string;
  heading_color?: string;
  description_color?: string;
  feature1_title_color?: string;
  feature1_text_color?: string;
  feature2_title_color?: string;
  feature2_text_color?: string;
  feature_card_bg?: string;
  feature_border_color?: string;
  feature_icon_bg?: string;
  feature_icon_color?: string;
  price_box_bg?: string;
  price_label_bg?: string;
  price_label_color?: string;
  price_color?: string;
  price_note_color?: string;
  button_bg?: string;
  button_color?: string;
  button_border_color?: string;
}

const DEFAULT_DRONE =
  "https://cdn.files.salla.network/other/1343631853/f3a3c1ac-5721-40f7-8ef4-d65c99129987-original.png";

function pick(v: unknown): string {
  if (Array.isArray(v)) {
    const first: any = v[0];
    return String(first?.value ?? first?.key ?? first ?? "");
  }
  if (v && typeof v === "object") {
    return String((v as any).value ?? (v as any).key ?? "");
  }
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

function toBool(val: unknown, fallback = true): boolean {
  if (val === undefined || val === null || val === "") return fallback;
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val !== 0;
  if (typeof val === "string") {
    const s = val.trim().toLowerCase();
    if (s === "false" || s === "0" || s === "no") return false;
    if (s === "true" || s === "1" || s === "yes") return true;
  }
  return fallback;
}

function renderFeatureIcon(type: string, customImg?: string) {
  if (customImg) {
    return html`<img class="feat-custom-img" src=${customImg} alt="" />`;
  }
  switch (type) {
    case "wind":
      return html`<svg
        class="feat-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
      </svg>`;
    case "propeller":
      return html`<svg
        class="feat-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 9.5C12 6 9.5 3 7 3s-3 2-1 5.5M14.5 12c3.5 0 6.5-2.5 6.5-5s-2-3-5.5-1M12 14.5c0 3.5 2.5 6.5 5 6.5s3-2 1-5.5M9.5 12C6 12 3 14.5 3 17s2 3 5.5 1" />
      </svg>`;
    case "shield":
      return html`<svg
        class="feat-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>`;
    case "bolt":
      return html`<svg
        class="feat-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>`;
    case "camera":
    default:
      return html`<svg
        class="feat-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>`;
  }
}

/* Saudi_Riyal_Symbol.svg */
const SAUDI_RIYAL_SVG = html`<svg
  class="riyal-icon"
  viewBox="0 0 1124.14 1256.39"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
  <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
</svg>`;

export default class DroneHero extends LitElement {
  @property({ type: Object }) config?: DroneHeroConfig | Record<string, any>;

  connectedCallback() {
    super.connectedCallback();
    if (!this.id) this.id = "hero";
  }

  private get cfg(): DroneHeroConfig {
    const parsed = parseJsonSafe(this.config);
    return parsed && typeof parsed === "object" ? parsed : {};
  }

  private v(key: keyof DroneHeroConfig, fallback: string): string {
    const val = this.cfg[key];
    return val === undefined || val === null || val === "" ? fallback : String(val);
  }

  private get link(): string {
    const l = this.cfg.source_url;
    if (typeof l === "string" && l) return l;
    if (Array.isArray(l) && l.length) {
      const first: any = l[0];
      return String(first?.url ?? first?.value ?? first ?? "#");
    }
    if (l && typeof l === "object") {
      return String((l as any).url ?? (l as any).value ?? "#");
    }
    return this.cfg.button_link || "#";
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      background: var(--hero-bg, #ffffff);
      color: #0d0d0d;
      font-family: inherit;
      scroll-margin-top: 80px;
      box-sizing: border-box;
      direction: ltr;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* ============================================================ */
    /* DESKTOP CANVAS: Hero 1600px x 1000px (1cqw = 16px)           */
    /* ============================================================ */
    .hero {
      position: relative;
      width: 100%;
      aspect-ratio: 1600 / 1000;
      background: var(--hero-bg, #ffffff);
      container-type: inline-size;
      overflow: hidden;
    }

    /* Desktop structural wrappers pass through */
    .frame-1,
    .frame-34408 {
      display: contents;
    }

    /* Frame 5 (Intro Heading + Description): 464x212 @ left 1004px, top 101px */
    .frame-5 {
      position: absolute;
      left: 62.75cqw; /* 1004 / 1600 */
      top: 10.1%; /* 101 / 1000 */
      width: 29cqw; /* 464 / 1600 */
      height: 21.2%; /* 212 / 1000 */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      gap: 0.75cqw; /* 12px / 1600 */
      direction: rtl;
      z-index: 3;
    }

    /* Heading: 464x128, 48px/64px Bold #0D0D0D */
    .hero-title {
      width: 100%;
      font-weight: 700;
      font-size: 3cqw; /* 48 / 1600 */
      line-height: 1.3333; /* 64 / 48 */
      color: var(--heading-color, #0d0d0d);
      text-align: right;
      display: flex;
      align-items: center;
    }

    /* Description: 464x72, 16px/24px Regular #0D0D0D */
    .hero-desc {
      width: 100%;
      font-weight: 400;
      font-size: 1cqw; /* 16 / 1600 */
      line-height: 1.5; /* 24 / 16 */
      color: var(--desc-color, #0d0d0d);
      text-align: right;
    }

    /* drone_front_3q 1: 930.298x460.253 @ left 31.5px, top 75px, angle 174.05 deg (flipped matrix) */
    .drone-img {
      position: absolute;
      left: 1.96875cqw; /* 31.5 / 1600 */
      top: 7.5%; /* 75 / 1000 */
      width: 58.1436cqw; /* 930.2978 / 1600 */
      height: 46.0253%; /* 460.2526 / 1000 */
      object-fit: contain;
      opacity: 1;
      transform: matrix(-0.9946, -0.1037, -0.1037, 0.9946, 0, 0);
      filter: drop-shadow(0 18px 28px rgba(0, 0, 0, 0.18));
      z-index: 2;
      pointer-events: none;
    }

    /* Frame 34349: 1480x632 @ left 60px, top 287px */
    .frame-34349 {
      position: absolute;
      left: 3.75cqw; /* 60 / 1600 */
      top: 28.7%; /* 287 / 1000 */
      width: 92.5cqw; /* 1480 / 1600 */
      height: 63.2%; /* 632 / 1000 */
    }

    /* Vector 3: 1480x632 @ left 0, top 0 */
    .vector-3 {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    /* ============================================================ */
    /* Frame 34353 (Camera Feature): 399x249 @ left 72px, top 314px */
    /* ============================================================ */
    .frame-34353 {
      position: absolute;
      left: 4.8649%; /* 72 / 1480 */
      top: 49.6835%; /* 314 / 632 */
      width: 26.9595%; /* 399 / 1480 */
      height: 39.3987%; /* 249 / 632 */
      z-index: 3;
    }

    /* Vector 4 (Line): 143x109 @ left 256px, top 0px */
    .vector-4 {
      position: absolute;
      left: 64.1604%; /* 256 / 399 */
      top: 0;
      width: 35.8396%; /* 143 / 399 */
      height: 43.7751%; /* 109 / 249 */
      pointer-events: none;
    }

    /* Frame 34346 (Left Card): 256x197 @ left 0px, top 52px */
    .frame-34346 {
      position: absolute;
      left: 0;
      top: 20.8835%; /* 52 / 249 */
      width: 64.1604%; /* 256 / 399 */
      height: 79.1165%; /* 197 / 249 */
      backdrop-filter: blur(4px);
    }

    /* ============================================================ */
    /* Frame 34354 (Rotor Feature): 736x280 @ left 671px, top 137px */
    /* ============================================================ */
    .frame-34354 {
      position: absolute;
      left: 45.3378%; /* 671 / 1480 */
      top: 21.6772%; /* 137 / 632 */
      width: 49.7297%; /* 736 / 1480 */
      height: 44.3038%; /* 280 / 632 */
      z-index: 3;
    }

    /* Vector 5 (Line): 481x212 @ left 0px, top 0px */
    .vector-5-line {
      position: absolute;
      left: 0;
      top: 0;
      width: 65.3533%; /* 481 / 736 */
      height: 75.7143%; /* 212 / 280 */
      pointer-events: none;
    }

    /* Frame 34348 (Right Card): 256x197 @ left 481px, top 83px */
    .frame-34348 {
      position: absolute;
      left: 65.3533%; /* 481 / 736 */
      top: 29.6429%; /* 83 / 280 */
      width: 34.7826%; /* 256 / 736 */
      height: 70.3571%; /* 197 / 280 */
      backdrop-filter: blur(4px);
    }

    .card-border {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    /* feature-top-right inner content: 220px wide, centered in 256x197 card */
    .feature-content {
      position: absolute;
      left: 7.03125%; /* (256 - 220) / 2 / 256 */
      width: 85.9375%; /* 220 / 256 */
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25cqw; /* 4px / 1600 */
      direction: rtl;
    }

    .feature-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 0.5cqw; /* 8px / 1600 */
      width: 100%;
    }

    /* 36x36 dark circle with 18x18 icon */
    .feature-icon {
      width: 2.25cqw; /* 36 / 1600 */
      height: 2.25cqw;
      min-width: 2.25cqw;
      border-radius: 50%;
      background: var(--feature-icon-bg, #1a1a1a);
      color: var(--feature-icon-color, #ffffff);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
    }

    .feat-svg,
    .feat-custom-img {
      width: 1.125cqw; /* 18 / 1600 */
      height: 1.125cqw;
      object-fit: contain;
    }

    /* كاميرا مدمجة: 24px/36px Bold #0D0D0D */
    .feature-title-lg {
      font-weight: 700;
      font-size: 1.5cqw; /* 24 / 1600 */
      line-height: 1.5; /* 36 / 24 */
      color: var(--f1-title-color, #0d0d0d);
      text-align: right;
    }

    /* تصميم متعدد المراوح: 20px/27px Bold #0D0D0D */
    .feature-title-md {
      font-weight: 700;
      font-size: 1.25cqw; /* 20 / 1600 */
      line-height: 1.35; /* 27 / 20 */
      color: var(--f2-title-color, #0d0d0d);
      text-align: right;
    }

    /* Card description: 20px/27px Regular #747474 */
    .feature-text-1 {
      width: 100%;
      font-weight: 400;
      font-size: 1.25cqw; /* 20 / 1600 */
      line-height: 1.35; /* 27 / 20 */
      color: var(--f1-text-color, #747474);
      text-align: right;
    }

    .feature-text-2 {
      width: 100%;
      font-weight: 400;
      font-size: 1.25cqw; /* 20 / 1600 */
      line-height: 1.35; /* 27 / 20 */
      color: var(--f2-text-color, #747474);
      text-align: right;
    }

    /* ============================================================ */
    /* Frame 34352 / 34392 (Price Box):                             */
    /* Desktop: 344x144 @ left 1064px, top 523px in Frame 34349      */
    /* (Hero coords: left 1124px = 70.25cqw, top 810px = 81%)        */
    /* ============================================================ */
    .frame-34392 {
      position: absolute;
      left: 70.25cqw; /* (60 + 1064) / 1600 */
      top: 81%; /* (287 + 523) / 1000 */
      width: 21.5cqw; /* 344 / 1600 */
      height: 14.4%; /* 144 / 1000 */
      z-index: 4;
    }

    .vector-6 {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    /* Frame 34350 (Price Tag): 148x39 @ left 176px, top -19px */
    .frame-34350 {
      position: absolute;
      left: 51.1628%; /* 176 / 344 */
      top: -13.1944%; /* -19 / 144 */
      width: 43.0233%; /* 148 / 344 */
      height: 27.0833%; /* 39 / 144 */
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08));
    }

    .vector-7 {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    /* سعــر منافـس: 16px/24px Bold #000000 */
    .price-tag-label {
      position: relative;
      z-index: 1;
      font-weight: 700;
      font-size: 1cqw; /* 16 / 1600 */
      line-height: 1.5;
      color: var(--price-label-color, #000000);
      text-align: right;
      direction: rtl;
      white-space: nowrap;
    }

    /* Frame 34351 (Price inner layout): 304x84 centered +10px top */
    .frame-34351 {
      position: absolute;
      left: 5.814%; /* (344 - 304) / 2 / 344 */
      width: 88.3721%; /* 304 / 344 */
      top: 27.7778%; /* (144 - 84)/2 + 10 = 40 / 144 */
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.4375cqw; /* 7px / 1600 */
      z-index: 1;
    }

    /* Frame 34359 (Price Row): 215x40, row, gap 4px */
    .frame-34359 {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 0.25cqw; /* 4px / 1600 */
      height: 2.5cqw; /* 40 / 1600 */
      color: var(--price-color, #ffffff);
      direction: ltr;
    }

    .riyal-icon {
      width: 2.5cqw; /* 40 / 1600 */
      height: 2.5cqw;
      flex-shrink: 0;
    }

    /* 999.99: Inter 700, 48px, #FFFFFF */
    .price-number {
      font-family: "Inter", system-ui, -apple-system, sans-serif;
      font-weight: 700;
      font-size: 3cqw; /* 48 / 1600 */
      line-height: 1;
      color: var(--price-color, #ffffff);
      letter-spacing: -0.02em;
    }

    /* Price note: 304x42, 12px/18px Regular #D5D5D5 */
    .price-note {
      width: 100%;
      font-weight: 400;
      font-size: 0.75cqw; /* 12 / 1600 */
      line-height: 1.5; /* 18 / 12 */
      color: var(--price-note-color, #d5d5d5);
      text-align: right;
      direction: rtl;
    }

    /* ============================================================ */
    /* Button: 179x56 @ left calc(50% - 179px/2 - 0.5px), top 575px */
    /* (Hero coords: left 50%, top 287 + 575 = 862px = 86.2%)        */
    /* ============================================================ */
    .cta-btn {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 86.2%; /* (287 + 575) / 1000 */
      width: 11.1875cqw; /* 179 / 1600 */
      aspect-ratio: 179 / 56;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5cqw 1cqw;
      text-decoration: none;
      z-index: 4;
      transition: transform 0.2s ease, filter 0.2s ease;
    }

    .cta-btn:hover {
      transform: translateX(-50%) translateY(-2px);
      filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.25));
    }

    .cta-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    /* Label: 16px/24px Bold #FFFFFF */
    .cta-label {
      position: relative;
      z-index: 1;
      font-weight: 700;
      font-size: 1cqw; /* 16 / 1600 */
      line-height: 1.5;
      color: var(--btn-color, #ffffff);
      text-align: center;
      direction: rtl;
      white-space: nowrap;
    }

    /* ============================================================ */
    /* MOBILE LAYOUT: Frame 34409 (Fluid mobile layout)             */
    /* ============================================================ */
    @media (max-width: 768px) {
      :host {
        padding: 16px 0;
      }

      /* Frame 34409: flex column, gap 4px, fluid width */
      .hero {
        aspect-ratio: auto;
        width: 100%;
        max-width: 100%;
        min-height: auto;
        margin: 0 auto;
        display: flex;
        padding-block: 20px;
        flex-direction: column;
        align-items: center;
        padding-inline: 16px;
        gap: 16px;
        overflow: visible;
      }

      /* Frame 1: flex column, align-items flex-end, gap 12px, fluid width */
      .frame-1 {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0;
        gap: 12px;
        width: 100%;
        max-width: 100%;
        height: auto;
        flex: none;
        order: 0;
        align-self: stretch;
      }

      /* Frame 5: flex column, justify center, align flex-end, gap 12px, fluid width */
      .frame-5 {
        position: static;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        padding: 0;
        gap: 12px;
        width: 100%;
        max-width: 100%;
        height: auto;
        flex: none;
        order: 0;
        align-self: stretch;
      }

      /* شــوف العالــم من زاويــة مختلفـــة: fluid width, 32px/36px Bold */
      .hero-title {
        width: 100%;
        max-width: 100%;
        height: auto;
        font-weight: 700;
        font-size: clamp(24px, 7vw, 32px);
        line-height: 1.25;
        display: flex;
        align-items: center;
        text-align: right;
      }

      /* اكتشف آفاق جديدة...: fluid width, 14px/21px Regular */
      .hero-desc {
        width: 100%;
        max-width: 100%;
        height: auto;
        font-weight: 400;
        font-size: clamp(12px, 3.8vw, 14px);
        line-height: 1.5;
        text-align: right;
      }

      /* Frame 34392: Price Box inside Frame 1 */
      .frame-34392 {
        position: relative;
        left: auto;
        top: auto;
        width: 100%;
        max-width: 280px;
        height: 130px;
        flex: none;
        order: 1;
      }

      /* Vector 6: 100% width of price box */
      .frame-34392 .vector-6 {
        position: absolute;
        width: 100%;
        height: 115px;
        right: 0;
        left: auto;
        top: 15px;
        bottom: auto;
      }

      /* Frame 34350: price tag */
      .frame-34350 {
        position: absolute;
        width: 44%;
        max-width: 110px;
        height: 30px;
        left: 50%;
        top: 0;
        filter: none;
      }

      /* سعــر منافـس: 14px/21px Regular */
      .price-tag-label {
        width: 100%;
        height: auto;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: right;
      }

      /* Frame 34351: inner price container */
      .frame-34351 {
        position: absolute;
        width: 88%;
        height: auto;
        left: 6%;
        top: calc(50% - 42px + 15px);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0;
        gap: 4px;
      }

      /* Frame 34359: Price row, gap 4px */
      .frame-34359 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0;
        gap: 4px;
        width: auto;
        height: auto;
      }

      .riyal-icon {
        width: 22px;
        height: 22px;
        flex-shrink: 0;
      }

      /* 999.99: Inter 700, 24px/22px */
      .price-number {
        width: auto;
        height: auto;
        font-size: 24px;
        line-height: 1;
        display: flex;
        align-items: center;
        text-align: right;
      }

      /* Price note: fluid width */
      .price-note {
        width: 100%;
        height: auto;
        font-weight: 400;
        font-size: 10px;
        line-height: 1.5;
        text-align: right;
      }

      /* ========================================================== */
      /* Frame 34408: Drone + Frame 34349 + Button                  */
      /* ========================================================== */
      .frame-34408 {
        margin: 0 auto;
        display: block;
        position: relative;
        width: 100%;
        max-width: 100%;
        aspect-ratio: 343 / 248;
        min-height: 240px;
        flex: none;
        order: 1;
        align-self: stretch;
      }

      /* drone_front_3q 1: scaled proportionally to container */
      .drone-img {
        position: absolute;
        width: 65%;
        height: auto;
        aspect-ratio: 223.63 / 110.64;
        left: 6%;
        top: -6%;
        transform: matrix(-0.99, -0.1, -0.1, 0.99, 0, 0);
        filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.16));
      }

      /* Frame 34349: Panel container */
      .frame-34349 {
        position: absolute;
        width: 100%;
        height: 60%;
        left: 0;
        top: 15%;
      }

      /* Vector 3: 100% width and height of panel */
      .vector-3 {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }

      /* Frame 34353 (Left Feature): fluid width */
      .frame-34353 {
        position: absolute;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 1px;
        width: 42%;
        height: 66%;
        left: 1%;
        top: 26%;
      }

      /* Frame 34346 (Left Card): fluid */
      .frame-34346 {
        position: relative;
        left: auto;
        top: auto;
        width: 74%;
        height: 100%;
        flex: none;
        order: 0;
        flex-grow: 0;
      }

      /* Vector 4 (Left Connector): fluid */
      .vector-4 {
        position: relative;
        left: auto;
        top: auto;
        width: 26%;
        height: 27%;
        flex: none;
        order: 1;
        flex-grow: 0;
      }

      /* Frame 34346 feature-top-right: fluid */
      .frame-34346 .feature-content {
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
        transform: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        padding: clamp(4px, 1.5vw, 8px);
        gap: 2px;
      }

      .frame-34346 .feature-header {
        width: 100%;
        height: auto;
        gap: 4px;
        justify-content: flex-start;
      }

      /* كاميرا مدمجة: fluid */
      .feature-title-lg {
        width: auto;
        height: auto;
        font-weight: 400;
        font-size: clamp(10px, 3.2vw, 14px);
        line-height: 1.3;
        white-space: nowrap;
      }

      .feature-text-1 {
        width: 100%;
        height: auto;
        font-weight: 400;
        font-size: clamp(8px, 2.5vw, 10px);
        line-height: 1.4;
      }

      /* Frame 34354 (Right Feature): fluid */
      .frame-34354 {
        position: absolute;
        width: 52%;
        height: 80%;
        left: 47%;
        top: calc(50% - 40%);
      }

      /* Vector 5 (Right Connector): fluid */
      .vector-5-line {
        position: absolute;
        width: 34%;
        height: 32%;
        left: 5%;
        top: 18%;
      }

      /* Frame 34348 (Right Card): fluid */
      .frame-34348 {
        position: absolute;
        width: 60%;
        height: 98%;
        left: 38%;
        top: 8%;
      }

      /* Right card feature-top-right: fluid */
      .frame-34348 .feature-content {
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
        transform: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        padding: clamp(4px, 1.5vw, 8px);
        gap: 2px;
      }

      .frame-34348 .feature-header {
        width: 100%;
        height: auto;
        gap: 4px;
        justify-content: flex-start;
      }

      /* تصميم متعدد المراوح: fluid */
      .feature-title-md {
        width: auto;
        height: auto;
        font-weight: 400;
        font-size: clamp(10px, 3.2vw, 14px);
        line-height: 1.3;
      }

      .feature-text-2 {
        width: 100%;
        height: auto;
        font-weight: 400;
        font-size: clamp(8px, 2.5vw, 10px);
        line-height: 1.4;
      }

      /* Shared mobile icon circle */
      .feature-icon {
        width: clamp(12px, 3.5vw, 16px);
        height: clamp(12px, 3.5vw, 16px);
        min-width: clamp(12px, 3.5vw, 16px);
        border-radius: 50%;
      }

      .feat-svg,
      .feat-custom-img {
        width: clamp(8px, 2.2vw, 10px);
        height: clamp(8px, 2.2vw, 10px);
      }

      /* Button: responsive width inside Frame 34408 */
      .cta-btn {
        position: absolute;
        width: auto;
        min-width: 140px;
        max-width: 80%;
        height: 48px;
        aspect-ratio: auto;
        left: 50%;
        top: 80%;
        transform: translateX(-50%);
        padding: 8px 24px;
      }

      .cta-btn:hover {
        transform: translateX(-50%) translateY(-2px);
      }

      /* Label: fluid width */
      .cta-label {
        width: auto;
        height: auto;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
    }
  `;

  private renderPanelBg(panelColor: string, panelBgImage: string) {
    return html`<svg
      class="vector-3"
      viewBox="0 0 1480 632"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="heroPanelGrad"
          x1="0"
          y1="0"
          x2="1480"
          y2="632"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color=${panelColor || "#F5F5F5"} stop-opacity="0.7" />
          <stop offset="45%" stop-color=${panelColor || "#E4E4E4"} stop-opacity="0.95" />
          <stop offset="75%" stop-color=${panelColor || "#F3F3F3"} stop-opacity="0.8" />
          <stop offset="100%" stop-color=${panelColor || "#DEDEDE"} stop-opacity="1" />
        </linearGradient>
        <linearGradient
          id="heroStreak1"
          x1="250"
          y1="0"
          x2="950"
          y2="632"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.65" />
          <stop offset="50%" stop-color="#DCDCDC" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
        </linearGradient>
        <clipPath id="heroPanelClip">
          <path d="M55 0H708L768 73H1425L1480 132V632H955L890 552H590L525 632H0V55L55 0Z" />
        </clipPath>
      </defs>
      <g clip-path="url(#heroPanelClip)">
        <rect width="1480" height="632" fill="url(#heroPanelGrad)" />
        ${panelBgImage
          ? html`<image
              href=${panelBgImage}
              width="1480"
              height="632"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.5"
            />`
          : html`
              <polygon points="180,0 620,0 1120,632 680,632" fill="url(#heroStreak1)" />
              <polygon
                points="760,0 1180,0 1480,380 1480,632 1240,632"
                fill="#FFFFFF"
                fill-opacity="0.4"
              />
            `}
      </g>
    </svg>`;
  }

  private renderCardBorder(cardBg: string, borderColor: string) {
    return html`<svg
      class="card-border"
      viewBox="0 0 256 197"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H232L255 24V196H24L1 173V1Z"
        fill=${cardBg || "rgba(255, 255, 255, 0.35)"}
        fill-opacity=${cardBg ? "0.65" : "1"}
        stroke=${borderColor || "#959595"}
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
    </svg>`;
  }

  private renderConnectorLeft(borderColor: string) {
    const stroke = borderColor || "#959595";
    return html`<svg
      class="vector-4"
      viewBox="0 0 143 109"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 108.5H142.5V2.5"
        stroke=${stroke}
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
      <circle cx="142.5" cy="2.5" r="2.5" fill=${stroke} />
    </svg>`;
  }

  private renderConnectorRight(borderColor: string) {
    const stroke = borderColor || "#959595";
    return html`<svg
      class="vector-5-line"
      viewBox="0 0 481 212"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 2.5V211.5H481"
        stroke=${stroke}
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
      <circle cx="2.5" cy="2.5" r="2.5" fill=${stroke} />
    </svg>`;
  }

  render() {
    const c = this.cfg;

    const bgColor = this.v("bg_color", "#ffffff");
    const panelColor = this.v("panel_color", "#ebebeb");
    const panelBgImage = this.v("panel_bg_image", "");
    const headingColor = this.v("heading_color", "#0d0d0d");
    const descColor = this.v("description_color", "#0d0d0d");

    const f1TitleColor = this.v("feature1_title_color", "#0d0d0d");
    const f1TextColor = this.v("feature1_text_color", "#747474");
    const f2TitleColor = this.v("feature2_title_color", "#0d0d0d");
    const f2TextColor = this.v("feature2_text_color", "#747474");

    const cardBg = this.v("feature_card_bg", "");
    const borderColor = this.v("feature_border_color", "#959595");
    const iconBg = this.v("feature_icon_bg", "#1a1a1a");
    const iconColor = this.v("feature_icon_color", "#ffffff");

    const priceBoxBg = this.v("price_box_bg", "#0d0d0d");
    const priceLabelBg = this.v("price_label_bg", "#f4f4f4");
    const priceLabelColor = this.v("price_label_color", "#000000");
    const priceColor = this.v("price_color", "#ffffff");
    const priceNoteColor = this.v("price_note_color", "#d5d5d5");

    const btnBg = this.v("button_bg", "#0d0d0d");
    const btnColor = this.v("button_color", "#ffffff");
    const btnBorderColor = this.v("button_border_color", "#959595");

    const showConnectors = toBool(c.show_connectors, true);
    const showPriceBox = toBool(c.show_price_box, true);
    const showCurrency = toBool(c.show_currency, true);
    const showButton = toBool(c.show_button, true);

    const f1IconType = pick(c.feature1_icon) || "camera";
    const f2IconType = pick(c.feature2_icon) || "wind";

    const cssVars = [
      `--hero-bg:${bgColor}`,
      `--panel-color:${panelColor}`,
      `--heading-color:${headingColor}`,
      `--desc-color:${descColor}`,
      `--f1-title-color:${f1TitleColor}`,
      `--f1-text-color:${f1TextColor}`,
      `--f2-title-color:${f2TitleColor}`,
      `--f2-text-color:${f2TextColor}`,
      `--feature-icon-bg:${iconBg}`,
      `--feature-icon-color:${iconColor}`,
      `--price-label-color:${priceLabelColor}`,
      `--price-color:${priceColor}`,
      `--price-note-color:${priceNoteColor}`,
      `--btn-color:${btnColor}`,
    ].join(";");

    return html`
      <!-- Frame 34409 (Mobile) / Hero (Desktop) -->
      <section class="hero" id="hero" style=${cssVars}>
        <!-- Frame 1: Intro (Frame 5) + Price Box (Frame 34392) -->
        <div class="frame-1">
          <div class="frame-5">
            <h2 class="hero-title">
              ${this.v("heading", "شوف العالم من زاوية مختلفة")}
            </h2>
            <p class="hero-desc">
              ${this.v(
                "description",
                "اكتشف آفاق جديدة مع درون يجمع بين متعة الطيران وإبداع التصوير الجوي. التقط لحظاتك من السماء، وحوّل كل مغامرة إلى تجربة تستحق التوثيق."
              )}
            </p>
          </div>

          ${showPriceBox
            ? html`
                <div class="frame-34392">
                  <svg
                    class="vector-6"
                    viewBox="0 0 344 144"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 0H344V122L322 144H0V22L22 0Z" fill=${priceBoxBg} />
                  </svg>
                  <div class="frame-34350">
                    <svg
                      class="vector-7"
                      viewBox="0 0 148 39"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 0H148V29L138 39H0V10L10 0Z" fill=${priceLabelBg} />
                    </svg>
                    <span class="price-tag-label">
                      ${this.v("price_label", "سعر منافس")}
                    </span>
                  </div>
                  <div class="frame-34351">
                    <div class="frame-34359">
                      ${showCurrency ? SAUDI_RIYAL_SVG : nothing}
                      <span class="price-number">${this.v("price", "999.99")}</span>
                    </div>
                    <p class="price-note">
                      ${this.v(
                        "price_note",
                        "استمتع بتجربة التصوير الجوي الرائعة مع أجهزتنا المتطورة. استكشف الأفق، واكتشف جمال العالم من الأعلى."
                      )}
                    </p>
                  </div>
                </div>
              `
            : nothing}
        </div>

        <!-- Frame 34408: Drone + Frame 34349 + Button -->
        <div class="frame-34408">
          <!-- Frame 34349: Polygon Panel + Feature Cards & Connectors -->
          <div class="frame-34349">
            ${this.renderPanelBg(panelColor, panelBgImage)}

            <!-- Frame 34353: Camera Feature + Vector 4 Line -->
            <div class="frame-34353">
              <div class="frame-34346">
                ${this.renderCardBorder(cardBg, borderColor)}
                <div class="feature-content">
                  <div class="feature-header">
                    <span class="feature-icon">
                      ${renderFeatureIcon(f1IconType, c.feature1_icon_image)}
                    </span>
                    <span class="feature-title-lg">
                      ${this.v("feature1_title", "كاميرا مدمجة")}
                    </span>
                  </div>
                  <p class="feature-text-1">
                    ${this.v(
                      "feature1_text",
                      "عينك في السماء لتوثيق المشاهد واللحظات من الأعلى."
                    )}
                  </p>
                </div>
              </div>
              ${showConnectors ? this.renderConnectorLeft(borderColor) : nothing}
            </div>

            <!-- Frame 34354: Multi-Rotor Feature + Vector 5 Line -->
            <div class="frame-34354">
              ${showConnectors ? this.renderConnectorRight(borderColor) : nothing}
              <div class="frame-34348">
                ${this.renderCardBorder(cardBg, borderColor)}
                <div class="feature-content">
                  <div class="feature-header">
                    <span class="feature-icon">
                      ${renderFeatureIcon(f2IconType, c.feature2_icon_image)}
                    </span>
                    <span class="feature-title-md">
                      ${this.v("feature2_title", "تصميم متعدد المراوح")}
                    </span>
                  </div>
                  <p class="feature-text-2">
                    ${this.v(
                      "feature2_text",
                      "توزيع المراوح حول الهيكل يمنح الدرون طابعه المميز."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- drone_front_3q 1 -->
          <img
            class="drone-img"
            src=${this.v("drone_image", DEFAULT_DRONE)}
            alt="drone"
          />

          <!-- Button: CTA -->
          ${showButton
            ? html`
                <a class="cta-btn" href=${this.link}>
                  <svg
                    class="cta-bg"
                    viewBox="0 0 179 56"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0H97.555L102.03 4.42105H115.007L111.427 0H116.35L121.72 4.42105H135.145L131.117 0H179V56H57.28L52.805 51.5789H37.59L42.065 56H35.8L30.43 51.5789H17.4525L21.0325 56H0V0Z"
                      fill=${btnBg}
                      stroke=${btnBorderColor}
                      stroke-width="1.5"
                      vector-effect="non-scaling-stroke"
                    />
                  </svg>
                  <span class="cta-label">
                    ${this.v("button_text", "اطلب درونك الآن")}
                  </span>
                </a>
              `
            : nothing}
        </div>
      </section>
    `;
  }
}
