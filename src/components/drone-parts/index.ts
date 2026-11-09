import { css, html, LitElement, svg } from "lit";
import { property } from "lit/decorators.js";

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
    text: "جسم الطائرة أساسي ومتكامل",
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

  static styles = css`
    :host {
      display: block;
      direction: rtl;
      font-family: inherit;
    }

    .wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 1600 / 1133;
      color: #fff;
      container-type: inline-size;
      overflow: hidden;
      box-sizing: border-box;
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
      padding: 5cqw 5cqw 4cqw;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      z-index: 1;
    }

    .head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 2cqw;
      padding-bottom: 0.8cqw;
    }

    .head h2 {
      margin: 0;
      font-size: 2.1cqw;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .head h3 {
      margin: 0;
      font-size: 1.35cqw;
      font-weight: 600;
      color: #ffffff;
    }

    .line {
      position: relative;
      height: 1px;
      background: rgba(255, 255, 255, 0.45);
      margin-bottom: 3cqw;
    }

    .line::before {
      content: "";
      position: absolute;
      top: -2px;
      left: 0;
      width: 7.5cqw;
      height: 4px;
      background: #ffffff;
    }

    .body {
      flex: 1;
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      align-items: center;
      gap: 3cqw;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 2cqw;
    }

    .row {
      display: grid;
      grid-template-columns: 8.5cqw 23.5cqw 7.5cqw;
      align-items: center;
      gap: 1.5cqw;
    }

    .label-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5cqw;
      min-width: 0;
    }

    .label-name {
      font-size: 1.25cqw;
      font-weight: 700;
      color: #ffffff;
      white-space: nowrap;
      text-align: center;
    }

    .pointer-line {
      position: relative;
      width: 100%;
      height: 2px;
      background: #ffffff;
    }

    .pointer-line::after {
      content: "";
      position: absolute;
      left: -2px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-right: 7px solid #ffffff;
    }

    .card {
      position: relative;
      aspect-ratio: 368 / 125;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1cqw 2cqw;
      box-sizing: border-box;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
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
      z-index: 1;
      padding-top: 0.5cqw;
    }

    .thumb {
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1 / 1;
      max-width: 7.5cqw;
    }

    .thumb img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
    }

    .drone {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 1cqw;
      box-sizing: border-box;
    }

    .drone img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.7));
    }

    .cta {
      position: absolute;
      bottom: 3.5cqw;
      left: 5cqw;
      background: #ffffff;
      color: #000000;
      padding: 0.65cqw 1.8cqw;
      font-size: 1.05cqw;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      clip-path: polygon(0 0, 100% 0, 100% 70%, 92% 100%, 0 100%);
      transition: transform 0.2s ease, background 0.2s ease;
      cursor: pointer;
    }

    .cta:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .wrap {
        aspect-ratio: auto;
        min-height: 800px;
      }
      .content {
        position: relative;
        padding: 2rem 1.5rem;
      }
      .head {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .head h2 {
        font-size: 1.5rem;
      }
      .head h3 {
        font-size: 1.1rem;
      }
      .line::before {
        width: 60px;
      }
      .body {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .row {
        grid-template-columns: 90px 1fr 70px;
        gap: 0.75rem;
      }
      .label-name {
        font-size: 0.95rem;
      }
      .card-text {
        font-size: 0.85rem;
      }
      .thumb {
        max-width: 70px;
      }
      .cta {
        position: static;
        margin-top: 2rem;
        align-self: flex-start;
        padding: 0.75rem 1.5rem;
        font-size: 0.95rem;
      }
    }
  `;

  render() {
    return html`
      <div class="wrap">
        ${MAIN_BG}
        <div class="content">
          <div class="head">
            <h2>${this.currentHeading}</h2>
            <h3>${this.currentTitle}</h3>
          </div>
          <div class="line"></div>
          <div class="body">
            <div class="list">
              ${this.currentParts.map(
                (p) => html`
                  <div class="row">
                    <div class="label-wrap">
                      <span class="label-name">${p.label}</span>
                      <div class="pointer-line"></div>
                    </div>
                    <div class="card">
                      ${TEXT_BG}
                      <span class="card-text">${p.text}</span>
                    </div>
                    <div class="thumb">
                      ${p.image
                        ? html`<img src=${p.image} alt=${p.label} />`
                        : ""}
                    </div>
                  </div>`
              )}
            </div>
            <div class="drone">
              ${this.currentDroneImage
                ? html`<img src=${this.currentDroneImage} alt="drone" />`
                : ""}
            </div>
          </div>
          <a class="cta" href=${this.currentButtonLink}
            >${this.currentButtonText}</a
          >
        </div>
      </div>
    `;
  }
}
