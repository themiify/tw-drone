import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import {
  renderSectionHeader,
  renderTacticalButton,
  renderTacticalFrame,
  renderTacticalMedia,
  sectionHeaderStyles,
  tacticalButtonStyles,
  tacticalFrameStyles,
} from "../../shared/theme.js";

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

  connectedCallback() {
    super.connectedCallback();
    if (!this.id) this.id = "story";
  }

  static styles = [
    tacticalButtonStyles,
    sectionHeaderStyles,
    tacticalFrameStyles,
    css`
      :host {
        display: block;
        direction: rtl;
        font-family: inherit;
        scroll-margin-top: 80px;
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

      /* ---------- body ---------- */
      .body {
        display: flex;
        flex-direction: row; /* rtl => first child sits on the right */
        align-items: flex-start;
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
        justify-content: flex-start;
        width: 100%;
      }
      .float img,
      .float video {
        max-width: 400px;
        max-height: 200px;
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

      .info .cta-btn {
        align-self: flex-end;
      }
      .body.reverse .info .cta-btn {
        align-self: flex-start;
      }

      @media (max-width: 768px) {
        .info .cta-btn {
          align-self: center;
          margin: 0.5rem auto 0;
        }
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
  `];

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

    private get hasMedia(): boolean {
    const c = this.cfg;
    if (pick(c.media_type) === "video") {
      return Boolean(c.media_video && c.media_video.trim());
    }
    return Boolean(c.media_image && c.media_image.trim());
  }

  render() {
    const c = this.cfg;
    const heading = c.heading || "";
    const badge = c.badge || "";
    const text = c.text || "";
    const buttonText = c.button_text || "";
    const floatImg = c.float_image || "";

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

    const mediaImg = c.media_image || "";
    const floatNode = this.renderMedia(floatType, floatImg, c.float_video);
    const mediaNode = this.renderMedia(mediaType, mediaImg, c.media_video);

    return html`
      <div class="wrap" id="story" style="${wrapStyle}${frameVars}">
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
          ${renderSectionHeader(
            heading,
            badge,
            c.heading_color,
            c.badge_color,
            c.line_color,
            c.bar_color
          )}

          <div class="body ${c.reverse ? "reverse" : ""}">
            <div class="col info ${!this.hasMedia ? "full-width" : ""}">
              ${floatNode ? html`<div class="float">${floatNode}</div>` : nothing}
              <div class="text" style="color:${c.text_color || "inherit"}">
                ${unsafeHTML(richText(text))}
              </div>
              ${buttonText
                ? renderTacticalButton(
                    buttonText,
                    this.link,
                    c.button_bg || "#0d0d0d",
                    "",
                    `--btn-text:${c.button_color || "#ffffff"};`
                  )
                : nothing}
            </div>

            ${this.hasMedia
              ? html`
                  <div class="col media-col">
                    ${renderTacticalMedia({
                      id: "story-media",
                      type: pick(c.media_type) === "video" ? "video" : "image",
                      imageUrl: c.media_image,
                      videoUrl: c.media_video,
                      frameColor: c.frame_color,
                    })}
                  </div>
                `
              : nothing}
          </div>
        </div>
      </div>
    `;
  }
}

