import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

interface Part {
  label: string;
  text: string;
  image?: string;
}

const DEFAULT_MAIN_IMAGE =
  "https://cdn.files.salla.network/other/1170101317/60160ecd-c557-4213-b5c0-3c8d0b555b05-standard.png";

const DEFAULT_PARTS: Part[] = [
  {
    label: "المراوح",
    text: "مراوح قوية لتحقيق استقرار وسرعة",
    image:
      "https://cdn.files.salla.network/other/1343631853/891c4f0b-f26e-4ea9-a565-22b47a63a4c4-original.webp",
  },
  {
    label: "الكاميرا",
    text: "نظام استقرار للكاميرا والتصوير",
    image:
      "https://cdn.files.salla.network/other/1343631853/a3affed3-1f7b-4e9b-ab38-711774c1e0a5-original.webp",
  },
  {
    label: "هيكل الهبوط",
    text: "هيكل هبوط متين وآمن",
    image:
      "https://cdn.files.salla.network/other/1343631853/9142b156-0fc5-4f22-81f5-62993db4cf38-original.webp",
  },
  {
    label: "جسم الطائرة",
    text: "جسم الطائرة أساسي و متكامل",
    image:
      "https://cdn.files.salla.network/other/1343631853/2774442d-6065-42f7-ad4f-44dea60a39eb-original.webp",
  },
];

function parseJsonSafe(val: any): Record<string, any> {
  if (!val) return {};
  if (typeof val === "object") return val;
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return {};
    }
  }
  return {};
}

export default class DroneParts extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  connectedCallback() {
    super.connectedCallback();
    if (!this.id) this.id = "parts";
  }

  @property({ type: String }) title = "أجزاء الدرون";
  @property({ type: String }) heading = "مش مجرد درون.. دي زاوية جديدة للعالم.";
  @property({ type: String, attribute: "drone-image" }) droneImage =
    DEFAULT_MAIN_IMAGE;
  @property({ type: String, attribute: "button-text" }) buttonText =
    "اطلب درونك الآن";
  @property({ type: String, attribute: "button-link" }) buttonLink = "#";
  @property({ type: Array }) parts: Part[] = DEFAULT_PARTS;

  private get cfg(): Record<string, any> {
    return parseJsonSafe(this.config);
  }

  private v(key: string, fallback: string): string {
    const val = this.cfg[key];
    return typeof val === "string" && val.trim() ? val.trim() : fallback;
  }

  private renderMainBg() {
    const fill = this.v("bg_color", "#0D0D0D");
    return html`<svg
      class="vector-9"
      viewBox="0 0 1600 1133"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1443.5 42.8202H1600V1133H212.335L142.5 1084.78H0V0H1381.57L1443.5 42.8202Z"
        fill=${fill}
      />
    </svg>`;
  }

  private renderVector8() {
    const fill = this.v("bar_color", "#FFFFFF");
    return html`<svg
      class="vector-8"
      viewBox="0 0 129 7"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H129L117.273 7H0V0Z" fill=${fill} />
    </svg>`;
  }

  private renderTextBg() {
    const fill = this.v("card_bg", "#2B2B2B");
    const stroke = this.v("card_border_color", "#FFFFFF");
    return html`<svg
      class="vector-10"
      viewBox="0 0 368 125"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M225.26 18.3051H347.413L367.5 41.1974V124.5H172.056L160.655 111.146H150.34L138.939 124.5H15.7012L0.5 106.695V18.3051H76.5059L91.7071 0.5H205.173L225.26 18.3051Z"
        fill=${fill}
        stroke=${stroke}
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
    </svg>`;
  }

  private renderButtonBg() {
    const fill = this.v("button_bg", "#FFFFFF");
    const stroke = this.v("button_border_color", "#959595");
    return html`<svg
      class="cta-bg"
      viewBox="0 0 179 56"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0H97.555L102.03 4.42105H115.007L111.427 0H116.35L121.72 4.42105H135.145L131.117 0H179V56H57.28L52.805 51.5789H37.59L42.065 56H35.8L30.43 51.5789H17.4525L21.0325 56H0V0Z"
        fill=${fill}
        stroke=${stroke}
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
      />
    </svg>`;
  }

  private renderArrowSvg() {
    const fill = this.v("arrow_color", "#FFFFFF");
    return html`<svg
      class="pointer-arrow"
      viewBox="0 0 196 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M195 3.68201V3.18201L0 3.18201V3.68201V4.18201L195 4.18201V3.68201ZM195.354 4.03556C195.549 3.8403 195.549 3.52372 195.354 3.32845L192.172 0.146473C191.976 -0.0487893 191.66 -0.0487893 191.464 0.146473C191.269 0.341735 191.269 0.658318 191.464 0.85358L194.293 3.68201L191.464 6.51043C191.269 6.7057 191.269 7.02228 191.464 7.21754C191.66 7.4128 191.976 7.4128 192.172 7.21754L195.354 4.03556Z"
        fill=${fill}
      />
      <path d="M0 3.68201H129L117.273 10.682H0V3.68201Z" fill=${fill} />
    </svg>`;
  }

  get currentTitle(): string {
    return this.cfg.title ?? this.title;
  }

  get currentHeading(): string {
    return this.cfg.heading ?? this.heading;
  }

  get currentDroneImage(): string {
    return (
      this.cfg.drone_image ||
      this.cfg.droneImage ||
      this.droneImage ||
      DEFAULT_MAIN_IMAGE
    );
  }

  get currentButtonText(): string {
    return this.cfg.button_text ?? this.cfg.buttonText ?? this.buttonText;
  }

  get currentButtonLink(): string {
    const link =
      this.cfg.source_url ??
      this.cfg.button_link ??
      this.cfg.buttonLink ??
      this.buttonLink;
    if (typeof link === "string" && link) return link;
    if (Array.isArray(link) && link.length > 0) {
      return link[0]?.value || link[0] || "#";
    }
    return "#";
  }

  get currentParts(): Part[] {
    const list = this.cfg.parts ?? this.parts;
    if (!Array.isArray(list) || list.length === 0) return DEFAULT_PARTS;
    return list;
  }

  static styles = css`
    :host {
      display: block;
      font-family: inherit;
      color: #ffffff;
      box-sizing: border-box;
      scroll-margin-top: 80px;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    /* ============================================================ */
    /* DESKTOP LAYOUT: Frame 34362 (1600px base, 1cqw = 16px)       */
    /* ============================================================ */
    .wrap {
      position: relative;
      width: 100%;
      height: auto;
      min-height: 70.8125cqw; /* 1133 / 1600 */
      padding: 6.0625cqw 0; /* 97px / 1600 */
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      container-type: inline-size;
      overflow: hidden;
      direction: ltr;
    }

    /* Vector 9: stretches to full dynamic height of .wrap */
    .vector-9 {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    /* Frame 34375: flex column, gap 80px, 1336px wide, dynamic height */
    .frame-34375 {
      position: relative;
      width: 83.5cqw; /* 1336 / 1600 */
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0;
      gap: 5cqw; /* 80px / 1600 */
      z-index: 1;
    }

    /* Frame 34357 (Desktop) / Frame 34376 (Mobile): 1336px wide, gap 24px */
    .frame-34357 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0;
      gap: 1.5cqw; /* 24px / 1600 */
      width: 83.5cqw; /* 1336 / 1600 */
      height: auto;
      flex: none;
      order: 0;
      align-self: stretch;
    }

    /* Frame 34355: row, space-between, align-items flex-end */
    .frame-34355 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0;
      width: 83.5cqw; /* 1336 / 1600 */
      min-height: 2.25cqw; /* 36 / 1600 */
      height: auto;
      flex: none;
      order: 0;
      align-self: stretch;
    }

    /* أجزاء الدرون: 24px/36px Bold #FFFFFF */
    .head-title {
      margin: 0;
      min-width: 8.0625cqw; /* 129 / 1600 */
      min-height: 2.25cqw; /* 36 / 1600 */
      height: auto;
      font-weight: 700;
      font-size: 1.5cqw; /* 24 / 1600 */
      line-height: 2.25cqw; /* 36 / 1600 */
      text-align: right;
      color: var(--dp-title-color, #ffffff);
      direction: rtl;
      white-space: nowrap;
      flex: none;
      order: 0;
    }

    /* Frame 34344: column, align-items flex-end, gap 8px */
    .frame-34344 {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 0;
      gap: 0.5cqw; /* 8 / 1600 */
      width: 45.375cqw; /* 726 / 1600 */
      min-height: 2.25cqw; /* 36 / 1600 */
      height: auto;
      flex: none;
      order: 1;
    }

    /* Heading: 32px/36px Bold #FFFFFF */
    .head-heading {
      margin: 0;
      min-height: 2.25cqw; /* 36 / 1600 */
      height: auto;
      font-weight: 700;
      font-size: 2cqw; /* 32 / 1600 */
      line-height: 2.25cqw; /* 36 / 1600 */
      text-align: right;
      color: var(--dp-heading-color, #ffffff);
      direction: rtl;
    }

    /* Frame 34356: column, align-items flex-start, 1336x7 */
    .frame-34356 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0;
      width: 83.5cqw; /* 1336 / 1600 */
      height: 0.4375cqw; /* 7 / 1600 */
      flex: none;
      order: 1;
      align-self: stretch;
    }

    /* Line 1: 1336x0, 1px solid #E6E6E6 */
    .line-1 {
      width: 100%;
      height: 0;
      border-top: 1px solid var(--dp-line-color, #e6e6e6);
      flex: none;
      order: 0;
      align-self: stretch;
    }

    /* Vector 8: 129x7 */
    .vector-8 {
      width: 8.0625cqw; /* 129 / 1600 */
      height: 0.4375cqw; /* 7 / 1600 */
      display: block;
      flex: none;
      order: 1;
    }

    /* ============================================================ */
    /* Frame 34374: row, space-between, align center, dynamic height */
    /* ============================================================ */
    .frame-34374 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      gap: 0.625cqw; /* 10 / 1600 */
      width: 83.5cqw; /* 1336 / 1600 */
      min-height: 49.5cqw; /* 792 / 1600 */
      height: auto;
      flex: none;
      order: 1;
      align-self: stretch;
    }

    /* Frame 34369: 528x792 (Drone + 7 Ellipses) */
    .frame-34369 {
      position: relative;
      width: 33cqw; /* 528 / 1600 */
      height: 49.5cqw; /* 792 / 1600 */
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      order: 0;
    }

    /* drone_pose_topdown_focus 1: 792x528 rotated -90deg */
    .drone-img {
      width: 49.5cqw; /* 792 / 1600 */
      height: 33cqw; /* 528 / 1600 */
      max-width: none;
      object-fit: contain;
      transform: rotate(-90deg);
      flex-shrink: 0;
      filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.7));
    }

    /* Drone glow ellipses (Ellipse 5..11) */
    .drone-ellipse {
      position: absolute;
      background: #ffffff;
      mix-blend-mode: overlay;
      filter: blur(1.7588cqw); /* 28.1408px / 1600 */
      transform: rotate(-90deg);
      border-radius: 50%;
      pointer-events: none;
    }

    /* Ellipse 5: 123x79 @ left 361px, top 335px */
    .drone-ellipse-5 {
      width: 7.6875cqw;
      height: 4.9375cqw;
      left: 22.5625cqw;
      top: 20.9375cqw;
    }

    /* Ellipse 6: 49x51 @ left 374px, top 151px */
    .drone-ellipse-6 {
      width: 3.0625cqw;
      height: 3.1875cqw;
      left: 23.375cqw;
      top: 9.4375cqw;
    }

    /* Ellipse 7: 50x52 @ left 196px, top 111px */
    .drone-ellipse-7 {
      width: 3.125cqw;
      height: 3.25cqw;
      left: 12.25cqw;
      top: 6.9375cqw;
    }

    /* Ellipse 8: 50x51 @ left 47px, top 232px */
    .drone-ellipse-8 {
      width: 3.125cqw;
      height: 3.1875cqw;
      left: 2.9375cqw;
      top: 14.5cqw;
    }

    /* Ellipse 9: 49x52 @ left 37px, top 517px */
    .drone-ellipse-9 {
      width: 3.0625cqw;
      height: 3.25cqw;
      left: 2.3125cqw;
      top: 32.3125cqw;
    }

    /* Ellipse 10: 50x52 @ left 196px, top 640px */
    .drone-ellipse-10 {
      width: 3.125cqw;
      height: 3.25cqw;
      left: 12.25cqw;
      top: 40cqw;
    }

    /* Ellipse 11: 50x52 @ left 361px, top 584px */
    .drone-ellipse-11 {
      width: 3.125cqw;
      height: 3.25cqw;
      left: 22.5625cqw;
      top: 36.5cqw;
    }

    /* ============================================================ */
    /* Frame 34368 (Desktop) / Frame 34421 (Mobile): dynamic height  */
    /* ============================================================ */
    .frame-34368 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0;
      gap: 0;
      width: 47.5cqw; /* 760 / 1600 */
      height: auto;
      flex: none;
      order: 1;
    }

    /* Frame 34364 / 34365 / 34366 / 34367: row, space-between, align center */
    .part-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      gap: 1.3125cqw; /* (760 - 195 - 367 - 177) / 2 */
      width: 47.5cqw; /* 760 / 1600 */
      min-height: 11.0625cqw; /* 177 / 1600 */
      height: auto;
      flex: none;
      cursor: pointer;
    }

    /* Wrapper for Label+Arrow and Thumb: transparent on desktop, row on mobile */
    .frame-34420 {
      display: contents;
    }

    .part-item:hover .card {
      transform: translateY(-2px);
      filter: drop-shadow(0 6px 20px rgba(255, 255, 255, 0.2));
    }

    .part-item:hover .thumb img {
      transform: scale(1.06);
    }

    .part-item:hover .pointer-arrow {
      filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
    }

    /* Frame 34385 / 34387 / 34386 / 34388: column, align flex-start, gap 14px */
    .label-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0;
      gap: 0.875cqw; /* 14 / 1600 */
      width: 12.1875cqw; /* 195 / 1600 */
      min-height: 3.5625cqw; /* 57 / 1600 */
      height: auto;
      flex: none;
      order: 0;
    }

    /* المراوح / الكاميرا / هيكل الهبوط / جسم الطائرة: 195x36, 24px/36px Bold */
    .label-name {
      width: 12.1875cqw; /* 195 / 1600 */
      min-height: 2.25cqw; /* 36 / 1600 */
      height: auto;
      font-weight: 700;
      font-size: 1.5cqw; /* 24 / 1600 */
      line-height: 2.25cqw; /* 36 / 1600 */
      color: var(--dp-part-label-color, #ffffff);
      text-align: left;
      direction: rtl;
      white-space: nowrap;
      flex: none;
      order: 0;
    }

    /* Frame 34381: 195x7 arrow */
    .pointer-arrow {
      width: 12.1875cqw; /* 195 / 1600 */
      height: auto;
      display: block;
      flex: none;
      order: 1;
      transition: filter 0.2s ease;
    }

    /* Frame 34365 (Card): 367x124, order 1 */
    .card {
      position: relative;
      width: 22.9375cqw; /* 367 / 1600 */
      min-height: 7.75cqw; /* 124 / 1600 */
      height: auto;
      padding: 1.625cqw 1.75cqw 1cqw;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: none;
      order: 1;
      transition: transform 0.2s ease, filter 0.2s ease;
    }

    /* Vector 10: 367x124 @ left 0, top 0 */
    .vector-10 {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    /* Card Text: 310px wide centered inside .card via flex, 24px/36px Bold */
    .card-text {
      position: relative;
      width: 19.375cqw; /* 310 / 1600 */
      min-height: 4.5cqw; /* 72 / 1600 */
      height: auto;
      font-weight: 700;
      font-size: 1.5cqw; /* 24 / 1600 */
      line-height: 2.25cqw; /* 36 / 1600 */
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: right;
      color: var(--dp-card-text-color, #ffffff);
      direction: rtl;
      z-index: 1;
    }

    /* Frame 34370 / 34371 / 34372 / 34373 (Thumb): 177x177, order 2 */
    .thumb {
      position: relative;
      width: 11.0625cqw; /* 177 / 1600 */
      height: 11.0625cqw; /* 177 / 1600 */
      flex: none;
      order: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .thumb img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: contain;
      z-index: 1;
      transition: transform 0.25s ease;
    }

    /* Thumb Ellipse 5 glow centered via flex on .thumb */
    .thumb-ellipse {
      position: absolute;
      background: var(--dp-thumb-glow-color, #ffffff);
      mix-blend-mode: overlay;
      filter: blur(1.7588cqw); /* 28.1408px / 1600 */
      border-radius: 50%;
      pointer-events: none;
      z-index: 2;
    }

    /* Part 0 Ellipse 5: 106x68 */
    .thumb-ellipse-0 {
      width: 6.625cqw;
      height: 4.25cqw;
    }

    /* Part 1 Ellipse 5: 117x75 */
    .thumb-ellipse-1 {
      width: 7.3125cqw;
      height: 4.6875cqw;
    }

    /* Part 2 Ellipse 5: 117x75 */
    .thumb-ellipse-2 {
      width: 7.3125cqw;
      height: 4.6875cqw;
    }

    /* Part 3 Ellipse 5: 143x92 */
    .thumb-ellipse-3 {
      width: 8.9375cqw;
      height: 5.75cqw;
    }

    /* ============================================================ */
    /* Button: 179x56 in flex flow, aligned right on desktop         */
    /* ============================================================ */
    .cta-btn {
      position: relative;
      width: 11.1875cqw; /* 179 / 1600 */
      min-height: 3.5cqw; /* 56 / 1600 */
      height: auto;
      align-self: flex-end;
      margin-top: -4.9375cqw; /* sits right below 792px row when 4 items, pushes down when >4 items */
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 0.5cqw 1cqw; /* 8px 16px */
      text-decoration: none;
      direction: rtl;
      transition: transform 0.2s ease, filter 0.2s ease;
      cursor: pointer;
      z-index: 2;
      order: 2;
    }

    .cta-btn:hover {
      transform: translateY(-2px);
      filter: drop-shadow(0 4px 16px rgba(255, 255, 255, 0.25));
    }

    .cta-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    /* Label: 16px/24px Bold #0D0D0D */
    .cta-text {
      position: relative;
      z-index: 1;
      min-width: 9.1875cqw; /* 147 / 1600 */
      min-height: 1.5cqw; /* 24 / 1600 */
      height: auto;
      font-weight: 700;
      font-size: 1cqw; /* 16 / 1600 */
      line-height: 1.5cqw; /* 24 / 1600 */
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--dp-button-color, #0d0d0d);
      white-space: nowrap;
    }

    /* ============================================================ */
    /* MOBILE LAYOUT: Frame 34416 (375px wide, dynamic height)      */
    /* ============================================================ */
    @media (max-width: 768px) {
      /* Frame 34416: 375px wide, dynamic height */
      .wrap {
        aspect-ratio: auto;
        width: 375px;
        max-width: 100%;
        min-height: auto;
        height: auto;
        padding: 64px 0;
        margin: 0 auto;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }

      /* Vector 9: stretches to full dynamic height */
      .vector-9 {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      /* Outer Frame 34375: column, center, gap 24px, dynamic height */
      .frame-34375 {
        position: relative;
        width: 375px;
        max-width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        gap: 24px;
      }

      /* Frame 34376: column, align flex-start, padding 0 16px, gap 12px */
      .frame-34357 {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 16px;
        gap: 12px;
        width: 375px;
        max-width: 100%;
        height: auto;
        flex: none;
        order: 0;
      }

      /* Frame 34355: row, space-between, align flex-end */
      .frame-34355 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0;
        width: 343px;
        max-width: 100%;
        min-height: 48px;
        height: auto;
        flex: none;
        order: 0;
        align-self: stretch;
      }

      /* أجزاء الدرون: 14px/21px Regular #FFFFFF */
      .head-title {
        min-width: 68px;
        min-height: 21px;
        height: auto;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        text-align: right;
        flex: none;
        order: 0;
      }

      /* Frame 34344: column, align flex-end, gap 8px */
      .frame-34344 {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0;
        gap: 8px;
        max-width: 275px;
        min-height: 48px;
        height: auto;
        flex: none;
        order: 1;
        flex-grow: 1;
      }

      /* Heading: 275px wide, 16px/24px Bold #FFFFFF */
      .head-heading {
        width: 275px;
        min-height: 48px;
        height: auto;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        text-align: right;
      }

      /* Frame 34356: 343x7 */
      .frame-34356 {
        width: 343px;
        max-width: 100%;
        height: 7px;
      }

      /* Vector 8: 70x7 */
      .vector-8 {
        width: 70px;
        height: 7px;
      }

      /* Inner Frame 34375: column, center, gap 20px, dynamic height */
      .frame-34374 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        gap: 20px;
        margin:auto;
        width: 343px;
        max-width: 100%;
        min-height: auto;
        height: auto;
        flex: none;
        order: 1;
      }

      /* Frame 34369: 255x171 */
      .frame-34369 {
        position: relative;
        width: 255px;
        height: 171px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none;
        order: 0;
      }

      /* drone_pose_topdown_focus 1: 254x170 centered via flex */
      .drone-img {
        position: relative;
        width: 254px;
        height: 170px;
        transform: rotate(0deg);
      }

      /* Frame 34421: column, align flex-start, gap 24px, dynamic height */
      .frame-34368 {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0;
        gap: 24px;
        width: 343px;
        max-width: 100%;
        padding-inline:16px !important;
        height: auto;
        flex: none;
        order: 1;
        align-self: stretch;
      }

      /* Frame 34364 / 34392 / 34393 / 34394: column, justify center, align flex-end, gap 12px */
      .part-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        padding: 0;
        gap: 12px;
        width: 343px;
        max-width: 100%;
        min-height: 162px;
        height: auto;
        flex: none;
        align-self: stretch;
      }

      /* Frame 34420: row, space-between, align center, gap 12px */
      .frame-34420 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        gap: 12px;
        width: 343px;
        max-width: 100%;
        min-height: 64px;
        height: auto;
        flex: none;
        order: 0;
        align-self: stretch;
      }

      /* Frame 34386: column, align flex-start, gap 14px */
      .label-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0;
        gap: 14px;
        width: 195px;
        min-height: 45px;
        height: auto;
        flex: none;
        order: 0;
      }

      /* المراوح / الكاميرا / هيكل الهبوط / جسم الطائرة: 16px/24px Bold */
      .label-name {
        width: 195px;
        min-height: 24px;
        height: auto;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        text-align: left;
      }

      /* Frame 34381: 195x7 arrow */
      .pointer-arrow {
        width: 195px;
        height: auto;
      }

      /* Frame 34370 / 34371 / 34372 / 34373: 64x64 */
      .thumb {
        width: 64px;
        height: 64px;
        flex: none;
        order: 1;
      }

      .thumb-ellipse {
        filter: blur(10.1752px);
      }

      .thumb-ellipse-0 {
        width: 38.33px;
        height: 24.59px;
      }

      .thumb-ellipse-1 {
        width: 42.31px;
        height: 27.12px;
      }

      .thumb-ellipse-2 {
        width: 42.55px;
        height: 27.27px;
      }

      .thumb-ellipse-3 {
        width: 52px;
        height: 33.45px;
      }

      /* Frame 34365 (Card): 343px wide, dynamic height, order 1 */
      .card {
        width: 343px;
        max-width: 100%;
        min-height: 86px;
        height: auto;
        padding: 20px 16px 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none;
        order: 1;
        align-self: stretch;
      }

      /* Mobile Card Text: 16px/24px Bold centered via flex */
      .card-text {
        width: 260px;
        min-height: 24px;
        height: auto;
        margin-top: 0;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        justify-content: center;
        text-align: center;
      }

      /* Button: 159x48 centered in flex flow */
      .cta-btn {
        position: relative;
        align-self: center;
        margin-top: 0;
        width: 159px;
        min-height: 48px;
        height: auto;
        padding: 8px 16px;
        flex: none;
        order: 2;
      }

      /* Label: 16px/24px Bold #0D0D0D */
      .cta-text {
        min-width: 127px;
        min-height: 24px;
        height: auto;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
      }
    }
  `;

  render() {
    const cssVars = [
      `--dp-title-color:${this.v("title_color", "#ffffff")}`,
      `--dp-heading-color:${this.v("heading_color", "#ffffff")}`,
      `--dp-line-color:${this.v("line_color", "#e6e6e6")}`,
      `--dp-part-label-color:${this.v("part_label_color", "#ffffff")}`,
      `--dp-card-text-color:${this.v("card_text_color", "#ffffff")}`,
      `--dp-thumb-glow-color:${this.v("thumb_glow_color", "#ffffff")}`,
      `--dp-button-color:${this.v("button_color", "#0d0d0d")}`,
    ].join(";");

    return html`
      <!-- Frame 34362 (Desktop) / Frame 34416 (Mobile) -->
      <div class="wrap" id="parts" style=${cssVars}>
        ${this.renderMainBg()}

        <!-- Frame 34375 -->
        <div class="frame-34375">
          <!-- Frame 34357 (Desktop) / Frame 34376 (Mobile) -->
          <div class="frame-34357">
            <div class="frame-34355">
              <h3 class="head-title">${this.currentTitle}</h3>
              <div class="frame-34344">
                <h2 class="head-heading">${this.currentHeading}</h2>
              </div>
            </div>
            <div class="frame-34356">
              <div class="line-1"></div>
              ${this.renderVector8()}
            </div>
          </div>

          <!-- Frame 34374 (Desktop) / Inner Frame 34375 (Mobile) -->
          <div class="frame-34374">
            <!-- Frame 34369: Drone -->
            <div class="frame-34369">
              ${this.currentDroneImage
                ? html`<img
                    class="drone-img"
                    src=${this.currentDroneImage}
                    alt="drone"
                  />`
                : ""}
            </div>

            <!-- Frame 34368 (Desktop) / Frame 34421 (Mobile) -->
            <div class="frame-34368">
              ${this.currentParts.map(
                (p, idx) => html`
                  <div class="part-item">
                    <!-- Frame 34420: contents on desktop, flex row on mobile -->
                    <div class="frame-34420">
                      <div class="label-wrap">
                        <span class="label-name">${p.label}</span>
                        ${this.renderArrowSvg()}
                      </div>
                      <div class="thumb">
                        ${p.image
                          ? html`<img src=${p.image} alt=${p.label} />`
                          : ""}
                        <span
                          class="thumb-ellipse thumb-ellipse-${idx % 4}"
                        ></span>
                      </div>
                    </div>
                    <!-- Frame 34365 -->
                    <div class="card">
                      ${this.renderTextBg()}
                      <span class="card-text">${p.text}</span>
                    </div>
                  </div>
                `
              )}
            </div>
          </div>

          <!-- Button in normal flex flow inside Frame 34375 -->
          <a class="cta-btn" href=${this.currentButtonLink}>
            ${this.renderButtonBg()}
            <span class="cta-text">${this.currentButtonText}</span>
          </a>
        </div>
      </div>
    `;
  }
}
