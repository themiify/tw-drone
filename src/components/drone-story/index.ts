import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

type MediaType = "image" | "video";
type BgType = "none" | "color" | "image" | "video";

interface DroneStoryConfig {
  heading?: string;
  badge?: string;
  text?: string;
  button_text?: string;
  source_url?: unknown;
  reverse?: boolean;

  float_type?: unknown;
  float_image?: string;
  float_video?: string;

  media_type?: unknown;
  media_image?: string;
  media_video?: string;

  bg_type?: unknown;
  bg_color?: string;
  bg_image?: string;
  bg_video?: string;
  bg_overlay?: number;

  heading_color?: string;
  badge_color?: string;
  text_color?: string;
  line_color?: string;
  bar_color?: string;
  frame_color?: string;
  button_bg?: string;
  button_color?: string;
}

/** Select fields come back either as a plain string or as [{ label, value, key }]. */
function pick(v: unknown): string {
  if (Array.isArray(v)) {
    const first: any = v[0];
    return String(first?.value ?? first ?? "");
  }
  if (v && typeof v === "object") return String((v as any).value ?? "");
  return v == null ? "" : String(v);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

const DEFAULT_FLOAT_IMG =
  "https://cdn.files.salla.network/other/1343631853/f3a3c1ac-5721-40f7-8ef4-d65c99129987-original.png";
const DEFAULT_HEADING = "مش مجرد درون.. دي زاوية جديدة للعالم.";
const DEFAULT_BADGE = "قصة درون";
const DEFAULT_TEXT =
  "إحنا بنؤمن إن التكنولوجيا مش مجرد أدوات، لكنها وسيلة لاكتشاف العالم من **منظور مختلف**.\nمن هنا جت فكرتنا إننا نقدملك تجربة مميزة في **عالم الدرون** والتصوير الجوي، تجمع بين الابتكار والإبداع ومتعة الاستكشاف. بنهتم إنك تلاقي المنتج اللي يناسب احتياجاتك، سواء كنت من عشاق التصوير، أو صُنّاع المحتوى، أو بتحب المغامرات واكتشاف أماكن جديدة.";
const DEFAULT_BTN = "اطلب درونك الآن";

/** Escapes the text, then turns **bold** into <strong> and new lines into <br>. */
function richText(s?: string): string {
  if (!s) return "";
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/gs, "<strong>$1</strong>")
    .replace(/\r?\n/g, "<br>");
}

export default class DroneStory extends LitElement {
  @property({ type: Object })
  config?: DroneStoryConfig;

  static styles = css`
    :host {
      display: block;
      direction: rtl;
      font-family: inherit;
    }

    .wrap {
      position: relative;
      overflow: hidden;
      container-type: inline-size;
      box-sizing: border-box;
      isolation: isolate;
    }

    .bg {
      position: absolute;
      inset: 0;
      z-index: -2;
    }
    .bg img,
    .bg video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .bg-overlay {
      position: absolute;
      inset: 0;
      z-index: -1;
      background: #000;
    }

    .inner {
      padding: 2.5rem 3rem;
      box-sizing: border-box;
    }

    /* ---------- header ---------- */
    .head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 1.5rem;
      padding-bottom: 0.6rem;
    }
    .heading {
      margin: 0;
      font-size: clamp(1.4rem, 3.2cqw, 2.4rem);
      font-weight: 800;
      line-height: 1.3;
    }
    .badge {
      margin: 0;
      font-size: clamp(1rem, 1.7cqw, 1.4rem);
      font-weight: 800;
      white-space: nowrap;
    }
    .line {
      position: relative;
      height: 1px;
      opacity: 1;
      margin-bottom: 2rem;
    }
    .line::before {
      content: "";
      position: absolute;
      top: -3px;
      left: 0;
      width: 7.5%;
      min-width: 60px;
      height: 6px;
      background: var(--bar-color, #0d0d0d);
      clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
    }

    /* ---------- body ---------- */
    .body {
      display: flex;
      flex-direction: row; /* rtl => first child sits on the right */
      align-items: center;
      gap: 2rem;
    }
    .body.reverse {
      flex-direction: row-reverse;
    }
    .col {
      flex: 1 1 0;
      min-width: 0;
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 1.25rem;
    }

    .float {
      display: flex;
      justify-content: center;
    }
    .float img,
    .float video {
      max-width: 100%;
      max-height: 280px;
      object-fit: contain;
      display: block;
    }

    .text {
      font-size: clamp(0.85rem, 1.25cqw, 1.05rem);
      line-height: 1.9;
      text-align: justify;
    }
    .text strong {
      font-weight: 800;
    }

    .cta {
      align-self: flex-end;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.7rem 2rem;
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
      clip-path: polygon(0 0, 100% 0, 100% 72%, 90% 100%, 0 100%);
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
    .body.reverse .cta {
      align-self: flex-start;
    }
    .cta:hover {
      transform: translateY(-2px);
      opacity: 0.9;
    }

    /* ---------- framed media ---------- */
    .frame {
      position: relative;
      aspect-ratio: 450 / 255;
      width: 100%;
    }
    .frame-outer {
      position: absolute;
      inset: 0;
      background: var(--frame-color, #ececec);
      clip-path: polygon(
        2% 0,
        47% 0,
        57% 10%,
        100% 10%,
        100% 100%,
        64% 100%,
        56% 88%,
        0 88%,
        0 12%
      );
      opacity: 0.85;
    }
    .frame-inner {
      position: absolute;
      inset: 0;
      clip-path: polygon(
        4.5% 10.5%,
        43% 10.5%,
        50% 20%,
        92% 20%,
        92% 93%,
        65% 93%,
        59% 82%,
        4.5% 82%
      );
      background: #ddd;
    }
    .frame-inner img,
    .frame-inner video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 0.8rem;
      opacity: 0.6;
    }

    /* ---------- mobile ---------- */
    @media (max-width: 768px) {
      .inner {
        padding: 1.5rem 1rem;
      }
      .head {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .body,
      .body.reverse {
        flex-direction: column;
      }
      .col {
        flex: none;
        width: 100%;
      }
      .cta,
      .body.reverse .cta {
        align-self: stretch;
      }
    }
  `;

  private renderMedia(type: MediaType, image?: string, video?: string) {
    if (type === "video") {
      return video
        ? html`<video
            src=${video}
            autoplay
            muted
            loop
            playsinline
          ></video>`
        : nothing;
    }
    return image ? html`<img src=${image} alt="" />` : nothing;
  }

  private mediaType(v: unknown): MediaType {
    return pick(v) === "video" ? "video" : "image";
  }

  private get cfg(): DroneStoryConfig {
    const parsed = parseJsonSafe(this.config);
    return parsed && typeof parsed === "object" ? parsed : {};
  }

  private get link(): string {
    const l = this.cfg.source_url;
    if (typeof l === "string" && l) return l;
    if (Array.isArray(l) && l.length) {
      const first: any = l[0];
      return String(first?.value ?? first ?? "#");
    }
    return "#";
  }

  render() {
    const c = this.cfg;
    const heading = c.heading ?? DEFAULT_HEADING;
    const badge = c.badge ?? DEFAULT_BADGE;
    const text = c.text ?? DEFAULT_TEXT;
    const buttonText = c.button_text ?? DEFAULT_BTN;
    const floatImg = c.float_image || DEFAULT_FLOAT_IMG;

    const bgType = (pick(c.bg_type) || "none") as BgType;
    const floatType = this.mediaType(c.float_type);
    const mediaType = this.mediaType(c.media_type);

    const wrapStyle =
      bgType === "color" && c.bg_color ? `background:${c.bg_color};` : "";
    const overlay =
      (bgType === "image" || bgType === "video") && Number(c.bg_overlay) > 0
        ? Number(c.bg_overlay) / 100
        : 0;

    const frameVars = [
      c.frame_color ? `--frame-color:${c.frame_color}` : "",
      c.bar_color ? `--bar-color:${c.bar_color}` : "",
    ]
      .filter(Boolean)
      .join(";");

    const floatNode = this.renderMedia(floatType, floatImg, c.float_video);
    const mediaNode = this.renderMedia(mediaType, c.media_image, c.media_video);

    return html`
      <div class="wrap" style="${wrapStyle}${frameVars}">
        ${bgType === "image" && c.bg_image
          ? html`<div class="bg"><img src=${c.bg_image} alt="" /></div>`
          : bgType === "video" && c.bg_video
            ? html`<div class="bg">
                <video
                  src=${c.bg_video}
                  autoplay
                  muted
                  loop
                  playsinline
                ></video>
              </div>`
            : nothing}
        ${overlay
          ? html`<div class="bg-overlay" style="opacity:${overlay}"></div>`
          : nothing}

        <div class="inner">
          <div class="head">
            <h2 class="heading" style="color:${c.heading_color || "inherit"}">
              ${heading}
            </h2>
            <h3 class="badge" style="color:${c.badge_color || "inherit"}">
              ${badge}
            </h3>
          </div>
          <div
            class="line"
            style="background:${c.line_color || "currentColor"}"
          ></div>

          <div class="body ${c.reverse ? "reverse" : ""}">
            <div class="col info">
              ${floatNode ? html`<div class="float">${floatNode}</div>` : nothing}
              <div class="text" style="color:${c.text_color || "inherit"}">
                ${unsafeHTML(richText(text))}
              </div>
              ${buttonText
                ? html`<a
                    class="cta"
                    href=${this.link}
                    style="background:${c.button_bg || "#0d0d0d"};color:${c.button_color ||
                    "#ffffff"}"
                    >${buttonText}</a
                  >`
                : nothing}
            </div>

            <div class="col">
              <div class="frame">
                <div class="frame-outer"></div>
                <div class="frame-inner">
                  ${mediaNode ||
                  html`<div class="empty"></div>`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

