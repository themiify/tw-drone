import { LitElement as x, css as _, nothing as a, html as o } from "lit";
import { property as $ } from "lit/decorators.js";
import { unsafeHTML as w } from "lit/directives/unsafe-html.js";
import { b as S, s as T, t as j, r as k, c as M, a as z } from "./theme-CYKg-qWL.js";
var B = Object.defineProperty, C = (t, e, i, l) => {
  for (var r = void 0, n = t.length - 1, c; n >= 0; n--)
    (c = t[n]) && (r = c(e, i, r) || r);
  return r && B(e, i, r), r;
};
function f(t) {
  if (Array.isArray(t)) {
    const e = t[0];
    return String((e == null ? void 0 : e.value) ?? e ?? "");
  }
  return t && typeof t == "object" ? String(t.value ?? "") : t == null ? "" : String(t);
}
function H(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function N(t) {
  if (!t) return null;
  if (typeof t == "object") return t;
  if (typeof t == "string")
    try {
      const e = document.createElement("textarea");
      return e.innerHTML = t, JSON.parse(e.value);
    } catch {
      try {
        return JSON.parse(t);
      } catch {
        return null;
      }
    }
  return null;
}
function A(t) {
  return t ? H(t).replace(/\*\*(.+?)\*\*/gs, "<strong>$1</strong>").replace(/\r?\n/g, "<br>") : "";
}
const g = class g extends x {
  connectedCallback() {
    super.connectedCallback(), this.id || (this.id = "story");
  }
  renderMedia(e, i, l) {
    return e === "video" ? l ? o`<video
            src=${l}
            autoplay
            muted
            loop
            playsinline
          ></video>` : a : i ? o`<img src=${i} alt="" />` : a;
  }
  mediaType(e) {
    return f(e) === "video" ? "video" : "image";
  }
  get cfg() {
    const e = N(this.config);
    return e && typeof e == "object" ? e : {};
  }
  get link() {
    const e = this.cfg.source_url;
    if (typeof e == "string" && e) return e;
    if (Array.isArray(e) && e.length) {
      const i = e[0];
      return String((i == null ? void 0 : i.value) ?? i ?? "#");
    }
    return "#";
  }
  get hasMedia() {
    const e = this.cfg;
    return f(e.media_type) === "video" ? !!(e.media_video && e.media_video.trim()) : !!(e.media_image && e.media_image.trim());
  }
  render() {
    const e = this.cfg, i = e.heading || "", l = e.badge || "", r = e.text || "", n = e.button_text || "", c = e.float_image || "", s = f(e.bg_type) || "none", u = this.mediaType(e.float_type), y = this.mediaType(e.media_type), b = s === "color" && e.bg_color ? `background:${e.bg_color};` : "", m = (s === "image" || s === "video") && Number(e.bg_overlay) > 0 ? Number(e.bg_overlay) / 100 : 0, v = [
      e.frame_color ? `--frame-color:${e.frame_color}` : "",
      e.bar_color ? `--bar-color:${e.bar_color}` : ""
    ].filter(Boolean).join(";"), h = e.media_image || "", p = this.renderMedia(u, c, e.float_video);
    return this.renderMedia(y, h, e.media_video), o`
      <div class="wrap" id="story" style="${b}${v}">
        ${s === "image" && e.bg_image ? o`<div class="bg"><img src=${e.bg_image} alt="" /></div>` : s === "video" && e.bg_video ? o`<div class="bg">
                <video
                  src=${e.bg_video}
                  autoplay
                  muted
                  loop
                  playsinline
                ></video>
              </div>` : a}
        ${m ? o`<div class="bg-overlay" style="opacity:${m}"></div>` : a}

        <div class="inner">
          ${k(
      i,
      l,
      e.heading_color,
      e.badge_color,
      e.line_color,
      e.bar_color
    )}

          <div class="body ${e.reverse ? "reverse" : ""}">
            <div class="col info ${this.hasMedia ? "" : "full-width"}">
              ${p ? o`<div class="float">${p}</div>` : a}
              <div class="text" style="color:${e.text_color || "inherit"}">
                ${w(A(r))}
              </div>
              ${n ? M(
      n,
      this.link,
      e.button_bg || "#0d0d0d",
      "",
      `--btn-text:${e.button_color || "#ffffff"};`
    ) : a}
            </div>

            ${this.hasMedia ? o`
                  <div class="col media-col">
                    ${z({
      id: "story-media",
      type: f(e.media_type) === "video" ? "video" : "image",
      imageUrl: e.media_image,
      videoUrl: e.media_video,
      frameColor: e.frame_color,
      useSvgFrame: e.use_svg_frame !== !1
    })}
                  </div>
                ` : a}
          </div>
        </div>
      </div>
    `;
  }
};
g.styles = [
  S,
  T,
  j,
  _`
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
  `
];
let d = g;
C([
  $({ type: Object })
], d.prototype, "config");
typeof d < "u" && d.registerSallaComponent("salla-drone-story");
export {
  d as default
};
