import { css, html, LitElement, svg } from "lit";
import { property } from "lit/decorators.js";

const DEFAULT_DRONE =
  "https://cdn.files.salla.network/other/1343631853/f3a3c1ac-5721-40f7-8ef4-d65c99129987-original.png";

const CAMERA_ICON = svg`<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>`;
const FANS_ICON = svg`<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M5 8h10a2.5 2.5 0 1 0-2.5-2.5M3 12h15a2.5 2.5 0 1 1-2.5 2.5M6 16h7"/></svg>`;
const CTA_BG = svg`<svg class="cta-bg" viewBox="0 0 179 56" preserveAspectRatio="none" fill="none"><path d="M0 0H97.555L102.03 4.42105H115.007L111.427 0H116.35L121.72 4.42105H135.145L131.117 0H179V56H57.28L52.805 51.5789H37.59L42.065 56H35.8L30.43 51.5789H17.4525L21.0325 56H0V0Z" fill="#0d0d0d"/></svg>`;

export default class DroneHero extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  private v(key: string, fallback: string): string {
    const val = this.config?.[key];
    return val === undefined || val === null || val === "" ? fallback : String(val);
  }

  private get link(): string {
    const l = this.config?.source_url;
    if (typeof l === "string" && l) return l;
    if (Array.isArray(l) && l.length) return l[0]?.url || l[0]?.value || "#";
    return this.config?.button_link || "#";
  }

  static styles = css`
    :host {
      display: block;
      container-type: inline-size;
      width: 100%;
      background: #fff;
      color: #0d0d0d;
      direction: rtl;
      font-family: inherit;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }

    .stage {
      position: relative;
      width: 100%;
      aspect-ratio: 975 / 606;
      overflow: hidden;
      background: #fff;
    }
    .panel {
      position: absolute;
      left: 0; right: 0; top: 38%; bottom: 7%;
      background: linear-gradient(115deg, #f4f4f4 0%, #e6e6e6 45%, #f6f6f6 70%, #dcdcdc 100%);
      clip-path: polygon(0 12%, 46% 12%, 52% 0, 100% 0, 100% 100%, 0 100%);
    }
    .drone {
      position: absolute;
      left: 3%; top: 8%;
      width: 63%;
      object-fit: contain;
      filter: drop-shadow(0 20px 20px rgba(0, 0, 0, 0.25));
    }
    .intro {
      position: absolute;
      right: 8%; top: 11%;
      width: 31%;
    }
    .title {
      font-size: 4.6cqw;
      line-height: 1.12;
      font-weight: 900;
      margin-bottom: 1.6cqw;
    }
    .desc {
      font-size: 1.05cqw;
      line-height: 1.7;
      font-weight: 500;
    }
    .lines {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .lines polyline { fill: none; stroke: #b5b5b5; stroke-width: 1.5; vector-effect: non-scaling-stroke; }
    .lines circle { fill: #a0a0a0; }

    .feature {
      position: absolute;
      width: 24%;
      padding: 1.6cqw 1.6cqw 1.6cqw 1.4cqw;
      border: 1px solid #bdbdbd;
      background: rgba(255, 255, 255, 0.55);
      backdrop-filter: blur(6px);
    }
    .feature.f1 { left: 8%; top: 66%; clip-path: polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 88%); }
    .feature.f2 { left: 64%; top: 51%; clip-path: polygon(0 0, 88% 0, 100% 12%, 100% 100%, 0 100%); }
    .f-head {
      display: flex; align-items: center; gap: 0.7cqw;
      font-size: 1.45cqw; font-weight: 800; line-height: 1.25;
      margin-bottom: 0.4cqw;
    }
    .ico {
      flex: none; width: 2.1cqw; height: 2.1cqw; border-radius: 50%;
      background: #0d0d0d; display: grid; place-items: center;
    }
    .ico svg { width: 60%; height: 60%; }
    .f-text { font-size: 1.25cqw; line-height: 1.55; color: #8a8a8a; font-weight: 500; }

    .price {
      position: absolute;
      left: 70.2%; top: 82%;
      width: 29%; height: 17.5%;
      background: #0d0d0d; color: #fff;
      padding: 2.6cqw 1.6cqw 1cqw;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    .price-tag {
      position: absolute; top: -1.4cqw; right: 2cqw;
      background: #fff; color: #0d0d0d; font-weight: 800;
      font-size: 1.2cqw; padding: 0.5cqw 1.8cqw;
      clip-path: polygon(0 0, 100% 0, 100% 70%, 94% 100%, 0 100%);
    }
    .price-value { font-size: 3.6cqw; font-weight: 900; line-height: 1.1; direction: ltr; text-align: right; }
    .price-note { font-size: 0.75cqw; line-height: 1.5; color: #cfcfcf; margin-top: 0.5cqw; }

    .cta {
      position: absolute;
      left: 44.4%; top: 88%;
      width: 11.2cqw; aspect-ratio: 179 / 56;
      display: flex; align-items: center; justify-content: center;
      text-decoration: none; color: #fff;
      font-size: 1.1cqw; font-weight: 800;
      transition: transform 0.2s ease;
    }
    .cta:hover { transform: translateY(-2px); }
    .cta-bg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .cta span { position: relative; z-index: 1; }

    @media (max-width: 768px) {
      .stage {
        aspect-ratio: auto; overflow: visible;
        display: flex; flex-direction: column; gap: 20px;
        padding: 28px 20px 32px;
      }
      .panel { display: none; }
      .lines { display: none; }
      .intro, .drone, .feature, .price, .cta, .price-tag { position: static; width: auto; clip-path: none; }
      .intro { order: 1; }
      .title { font-size: 40px; margin-bottom: 14px; }
      .desc { font-size: 15px; }
      .price { order: 2; position: relative; height: auto; padding: 30px 18px 16px; margin-top: 8px; }
      .price-tag { position: absolute; top: -14px; right: 18px; font-size: 14px; padding: 5px 18px; }
      .price-value { font-size: 40px; }
      .price-note { font-size: 11px; }
      .drone { order: 3; width: 100%; height: auto; }
      .features { order: 4; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .feature { padding: 12px; backdrop-filter: none; background: #f2f2f2; }
      .ico { width: 26px; height: 26px; }
      .f-head { font-size: 15px; gap: 8px; }
      .f-text { font-size: 12px; }
      .cta { order: 5; position: relative; width: 179px; height: 56px; font-size: 16px; align-self: center; }
    }
    @media (max-width: 768px) { .features-wrap { display: contents; } }
  `;

  render() {
    const feat = (cls: string, icon: any, t: string, x: string) => html`
      <div class="feature ${cls}">
        <div class="f-head"><span class="ico">${icon}</span><span>${t}</span></div>
        <p class="f-text">${x}</p>
      </div>`;
    return html`
      <div class="stage">
        <div class="panel"></div>
        <img class="drone" src=${this.v("drone_image", DEFAULT_DRONE)} alt="drone" />
        <svg class="lines" viewBox="0 0 975 606" preserveAspectRatio="none">
          <polyline points="323,368 323,436 236,436"></polyline>
          <polyline points="445,262 445,390 740,390"></polyline>
          <circle cx="323" cy="368" r="2.5"></circle>
          <circle cx="445" cy="262" r="2.5"></circle>
        </svg>
        <div class="intro">
          <h2 class="title">${this.v("heading", "شوف العالم من زاوية مختلفة")}</h2>
          <p class="desc">${this.v("description", "اكتشف آفاق جديدة مع درون يجمع بين متعة الطيران وإبداع التصوير الجوي. التقط لحظاتك من السماء، وحوّل كل مغامرة إلى تجربة تستحق التوثيق.")}</p>
        </div>
        <div class="features-wrap">
          <div class="features">
            ${feat("f1", CAMERA_ICON, this.v("feature1_title", "كاميرا مدمجة"), this.v("feature1_text", "عينك في السماء لتوثيق المشاهد واللحظات من الأعلى."))}
            ${feat("f2", FANS_ICON, this.v("feature2_title", "تصميم متعدد المراوح"), this.v("feature2_text", "توزيع المراوح حول الهيكل يمنح الدرون طابعه المميز."))}
          </div>
        </div>
        <div class="price">
          <span class="price-tag">${this.v("price_label", "سعر منافس")}</span>
          <div class="price-value">${this.v("price", "999.99")}</div>
          <p class="price-note">${this.v("price_note", "استمتع بتجربة التصوير الجوي الرائعة مع أجهزتنا المتطورة. استكشف الأفق، واكتشف جمال العالم من الأعلى.")}</p>
        </div>
        <a class="cta" href=${this.link}>${CTA_BG}<span>${this.v("button_text", "اطلب درونك الآن")}</span></a>
      </div>
    `;
  }
}

