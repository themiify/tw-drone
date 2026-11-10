import { css, html, LitElement, svg } from "lit";
import { property } from "lit/decorators.js";
import {
  renderSectionHeader,
  renderTacticalButton,
  sectionHeaderStyles,
  tacticalButtonStyles,
} from "../../shared/theme.js";

interface Part {
  label: string;
  text: string;
  image?: string;
}

const DEFAULT_MAIN_IMAGE =
  "https://cdn.files.salla.network/other/1343631853/f3a3c1ac-5721-40f7-8ef4-d65c99129987-original.png";

const DEFAULT_PARTS: Part[] = [
  {
    label: "المراوح",
    text: "مراوح قوية لتحقيق استقرار وسرعة",
    image:
      "https://cdn.files.salla.network/other/1343631853/bf7f9a93-b38e-4732-bc81-72a0efc8f6f1-original.png",
  },
  {
    label: "الكاميرا",
    text: "نظام استقرار للكاميرا والتصوير",
    image:
      "https://cdn.files.salla.network/other/1343631853/dbe75395-d8f9-44dc-9efd-0b546c639792-original.png",
  },
  {
    label: "هيكل الهبوط",
    text: "هيكل هبوط متين وآمن",
    image:
      "https://cdn.files.salla.network/other/1343631853/0a173af6-0bd6-460d-8aae-57da6db532f2-original.png",
  },
  {
    label: "جسم الطائرة",
    text: "جسم الطائرة أساسي و متكامل",
    image:
      "https://cdn.files.salla.network/other/1343631853/3d1ba946-2089-41e1-8a7d-890dd4d0c972-original.png",
  },
];

const MAIN_BG = svg`<svg class="main-bg" viewBox="0 0 1600 1133" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1443.5 42.8202H1600V1133H212.335L142.5 1084.78H0V0H1381.57L1443.5 42.8202Z" fill="#0D0D0D"/>
</svg>`;

const TEXT_BG = svg`<svg class="text-bg" viewBox="0 0 368 125" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M225.26 18.3051H347.413L367.5 41.1974V124.5H172.056L160.655 111.146H150.34L138.939 124.5H15.7012L0.5 106.695V18.3051H76.5059L91.7071 0.5H205.173L225.26 18.3051Z" fill="#2B2B2B" stroke="white" vector-effect="non-scaling-stroke"/>
</svg>`;

export default class DroneParts extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  @property({ type: String }) title = "أجزاء الدرون";
  @property({ type: String }) heading = "مش مجرد درون.. دي زاوية جديدة للعالم.";
  @property({ type: String, attribute: "drone-image" }) droneImage = DEFAULT_MAIN_IMAGE;
  @property({ type: String, attribute: "button-text" }) buttonText = "اطلب درونك الآن";
  @property({ type: String, attribute: "button-link" }) buttonLink = "#";
  @property({ type: Array }) parts: Part[] = DEFAULT_PARTS;

  get currentTitle(): string {
    return this.config?.title ?? this.title;
  }

  get currentHeading(): string {
    return this.config?.heading ?? this.heading;
  }

  get currentDroneImage(): string {
    return (
      this.config?.drone_image ||
      this.config?.droneImage ||
      this.droneImage ||
      DEFAULT_MAIN_IMAGE
    );
  }

  get currentButtonText(): string {
    return this.config?.button_text ?? this.config?.buttonText ?? this.buttonText;
  }

  get currentButtonLink(): string {
    const link =
      this.config?.source_url ??
      this.config?.button_link ??
      this.config?.buttonLink ??
      this.buttonLink;
    if (typeof link === "string" && link) return link;
    if (Array.isArray(link) && link.length > 0) {
      return link[0]?.value || link[0] || "#";
    }
    return "#";
  }

  get currentParts(): Part[] {
    const list = this.config?.parts ?? this.parts;
    if (!Array.isArray(list) || list.length === 0) return DEFAULT_PARTS;
    return list;
  }

  static styles = [
    tacticalButtonStyles,
    sectionHeaderStyles,
    css`
      :host {
        display: block;
        font-family: inherit;
        color: #ffffff;
        box-sizing: border-box;
      }

      *, *::before, *::after {
        box-sizing: border-box;
      }

      .wrap {
        position: relative;
        width: 100%;
        aspect-ratio: 1600 / 1133;
        color: #ffffff;
        container-type: inline-size;
        overflow: hidden;
        box-sizing: border-box;
        direction: ltr; /* Desktop layout: Drone on Left, Parts on Right */
        background: #0D0D0D;
        clip-path: polygon(0 0, calc(100% - 50px) 0, 100% 40px, 100% 100%, 70px 100%, 0 calc(100% - 48px));
      }

      .main-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .content {
        position: absolute;
        inset: 0;
        padding: 4.5cqw 5cqw 4cqw;
        display: flex;
        flex-direction: column;
        z-index: 1;
      }

      .body {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      align-items: center;
      gap: 2.5cqw;
    }

    .drone {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      position: relative;
    }

    .drone img {
      width: 49.5cqw;
      height: 33cqw;
      max-width: none;
      object-fit: contain;
      transform: rotate(90deg);
      opacity: 1;
      filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.7));
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 2.2cqw;
      direction: ltr;
    }

    .part-item {
      display: grid;
      grid-template-columns: 7.5cqw 23cqw 11cqw;
      grid-template-areas: "label card thumb";
      align-items: center;
      gap: 1.5cqw;
      transition: opacity 0.25s ease;
      cursor: pointer;
    }

    .part-item:hover .card {
      transform: translateY(-2px);
      filter: drop-shadow(0 6px 20px rgba(255, 255, 255, 0.2));
    }

    .part-item:hover .thumb img {
      transform: scale(1.08);
    }

    .part-item:hover .pointer-line {
      background: #ffffff;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
    }

    .label-wrap {
      grid-area: label;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.4cqw;
      min-width: 0;
    }

    .label-name {
      font-size: 1.25cqw;
      font-weight: 700;
      color: #ffffff;
      white-space: nowrap;
      text-align: center;
      direction: rtl;
    }

    .pointer-line {
      position: relative;
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.4);
      display: flex;
      align-items: center;
    }

    .pointer-line::before {
      content: "";
      position: absolute;
      left: 0;
      top: -2px;
      height: 4px;
      width: 60%;
      background: #ffffff;
      clip-path: polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
    }

    .pointer-line::after {
      content: "";
      position: absolute;
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 3.5px solid transparent;
      border-bottom: 3.5px solid transparent;
      border-left: 6px solid #ffffff;
    }

    .card {
      grid-area: card;
      position: relative;
      aspect-ratio: 368 / 125;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1cqw 2cqw;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
      transition: transform 0.2s ease, filter 0.2s ease;
      cursor: default;
    }

    .card:hover {
      transform: translateY(-2px);
      filter: drop-shadow(0 6px 18px rgba(255, 255, 255, 0.15));
    }

    .text-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .card-text {
      position: relative;
      font-size: 1.15cqw;
      font-weight: 700;
      line-height: 1.55;
      text-align: center;
      color: #ffffff;
      direction: rtl;
      z-index: 1;
      padding-top: 0.5cqw;
    }

    .thumb {
      grid-area: thumb;
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1 / 1;
      width: 11cqw;
      height: 11cqw;
      max-width: 11cqw;
      transition: transform 0.25s ease;
    }

    .thumb:hover {
      transform: scale(1.05);
    }

    .thumb img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
    }

    .content .cta-btn {
      position: absolute;
      bottom: 3.5cqw;
      right: 5cqw;
      z-index: 3;
    }

    /* ========================================================= */
    /* MOBILE STYLES (Matching Reference Screenshot 2)          */
    /* ========================================================= */
    @media (max-width: 768px) {
      .wrap {
        aspect-ratio: auto;
        min-height: auto;
        clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 25px, 100% 100%, 35px 100%, 0 calc(100% - 30px));
      }

      .content {
        position: relative;
        padding: 2.2rem 1.25rem 2.5rem;
      }

      .body {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: stretch;
      }

      .drone {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding: 0.5rem 0;
        height: auto;
      }

      .drone img {
        position: relative;
        top: 0.14px;
        left: 0.5px;
        width: 254px;
        height: 170px;
        max-width: 100%;
        object-fit: contain;
        transform: rotate(0deg);
        opacity: 1;
        filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.6));
      }

      .list {
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
        width: 100%;
      }

      /* Stack each part: Row 1 = [Label + Arrow] on left, [Thumb] on right; Row 2 = [Card] full width */
      .part-item {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas:
          "label thumb"
          "card  card";
        align-items: center;
        gap: 0.65rem 1rem;
        width: 100%;
        cursor: pointer;
      }

      .part-item:active .card {
        transform: scale(0.99);
      }

      .label-wrap {
        grid-area: label;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        gap: 0.35rem;
      }

      .label-name {
        font-size: 1.15rem;
        text-align: left;
      }

      .pointer-line {
        width: 100%;
        height: 2px;
      }

      .pointer-line::before {
        height: 4px;
        width: 50%;
        min-width: 55px;
      }

      .thumb {
        grid-area: thumb;
        width: 60px;
        height: 60px;
        max-width: 60px;
        justify-content: flex-end;
      }

      .thumb img {
        max-width: 60px;
        max-height: 60px;
      }

      .card {
        grid-area: card;
        width: 100%;
        aspect-ratio: 368 / 125;
        max-height: 95px;
        padding: 0.8rem 1rem;
      }

      .card-text {
        font-size: 1rem;
        line-height: 1.45;
        padding-top: 0.25rem;
      }

      .content .cta-btn {
        position: static;
        margin: 1.5rem auto 0;
        align-self: center;
      }
    }
  `];

  render() {
    return html`
      <div class="wrap">
        ${MAIN_BG}
        <div class="content">
          ${renderSectionHeader(
            this.currentHeading,
            this.currentTitle,
            "#ffffff",
            "#ffffff",
            "rgba(255, 255, 255, 0.45)",
            "#ffffff"
          )}
          <div class="body">
            <div class="drone">
              ${this.currentDroneImage
                ? html`<img src=${this.currentDroneImage} alt="drone" />`
                : ""}
            </div>
            <div class="list">
              ${this.currentParts.map(
                (p) => html`
                  <div class="part-item">
                    <div class="label-wrap">
                      <span class="label-name">${p.label}</span>
                      <div class="pointer-line"></div>
                    </div>
                    <div class="thumb">
                      ${p.image
                        ? html`<img src=${p.image} alt=${p.label} />`
                        : ""}
                    </div>
                    <div class="card">
                      ${TEXT_BG}
                      <span class="card-text">${p.text}</span>
                    </div>
                  </div>`
              )}
            </div>
          </div>
          ${renderTacticalButton(
            this.currentButtonText,
            this.currentButtonLink,
            "#ffffff"
          )}
        </div>
      </div>
    `;
  }
}
