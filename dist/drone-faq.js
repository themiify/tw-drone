import { LitElement as y, css as _, nothing as l, html as t } from "lit";
import { property as x, state as w } from "lit/decorators.js";
import { unsafeHTML as $ } from "lit/directives/unsafe-html.js";
import { s as S, t as q, r as k, a as j } from "./theme-CYKg-qWL.js";
var z = Object.defineProperty, v = (i, e, r, f) => {
  for (var o = void 0, s = i.length - 1, c; s >= 0; s--)
    (c = i[s]) && (o = c(e, r, o) || o);
  return o && z(e, r, o), o;
};
function p(i) {
  if (Array.isArray(i)) {
    const e = i[0];
    return String((e == null ? void 0 : e.value) ?? e ?? "");
  }
  return i && typeof i == "object" ? String(i.value ?? "") : i == null ? "" : String(i);
}
function C(i) {
  return i.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function M(i) {
  if (!i) return null;
  if (typeof i == "object") return i;
  if (typeof i == "string")
    try {
      const e = document.createElement("textarea");
      return e.innerHTML = i, JSON.parse(e.value);
    } catch {
      try {
        return JSON.parse(i);
      } catch {
        return null;
      }
    }
  return null;
}
function I(i) {
  return i ? C(i).replace(/\*\*(.+?)\*\*/gs, "<strong>$1</strong>").replace(/\r?\n/g, "<br>") : "";
}
const g = class g extends y {
  constructor() {
    super(...arguments), this.openIndexes = /* @__PURE__ */ new Set(), this.initialised = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.id || (this.id = "faq");
  }
  get cfg() {
    const e = M(this.config);
    return e && typeof e == "object" ? e : {};
  }
  willUpdate() {
    this.initialised || (this.initialised = !0, this.cfg.first_open !== !1 && this.items.length && (this.openIndexes = /* @__PURE__ */ new Set([0])));
  }
  get items() {
    const e = this.cfg.items;
    return Array.isArray(e) ? e : [];
  }
  toggle(e) {
    const r = new Set(this.openIndexes);
    r.has(e) ? r.delete(e) : (this.cfg.single_open !== !1 && r.clear(), r.add(e)), this.openIndexes = r;
  }
  renderMedia() {
    const e = this.cfg;
    if (p(e.media_type) === "video")
      return e.media_video ? t`<video
            src=${e.media_video}
            autoplay
            muted
            loop
            playsinline
          ></video>` : l;
    const r = e.media_image;
    return r ? t`<img src=${r} alt="" />` : l;
  }
  get hasMedia() {
    const e = this.cfg;
    return p(e.media_type) === "video" ? !!(e.media_video && e.media_video.trim()) : !!(e.media_image && e.media_image.trim());
  }
  render() {
    const e = this.cfg, r = e.heading || "", f = e.badge || "", o = p(e.bg_type) || "none", s = o === "color" && e.bg_color ? `background:${e.bg_color};` : "", c = (o === "image" || o === "video") && Number(e.bg_overlay) > 0 ? Number(e.bg_overlay) / 100 : 0, m = Number(e.anim_duration), b = {
      "--frame-color": e.frame_color,
      "--bar-color": e.bar_color,
      "--item-bg": e.item_bg,
      "--q-color": e.question_color,
      "--a-color": e.answer_color,
      "--icon-color": e.icon_color,
      "--active-bg": e.active_bg,
      "--active-q-color": e.active_question_color,
      "--active-a-color": e.active_answer_color,
      "--active-icon-color": e.active_icon_color,
      "--dur": m > 0 ? `${m}ms` : void 0
    }, h = Object.entries(b).filter(([, a]) => a).map(([a, d]) => `${a}:${d}`).join(";");
    return t`
      <div class="wrap" id="faq" style="${s}${h}">
        ${o === "image" && e.bg_image ? t`<div class="bg"><img src=${e.bg_image} alt="" /></div>` : o === "video" && e.bg_video ? t`<div class="bg">
                <video
                  src=${e.bg_video}
                  autoplay
                  muted
                  loop
                  playsinline
                ></video>
              </div>` : l}
        ${c ? t`<div class="bg-overlay" style="opacity:${c}"></div>` : l}

        <div class="inner">
          ${k(
      r,
      f,
      e.heading_color,
      e.badge_color,
      e.line_color,
      e.bar_color
    )}

          <div class="body ${e.reverse ? "reverse" : ""}">
            ${this.hasMedia ? t`
                  <div class="col media-col">
                    ${j({
      id: "faq-media",
      type: p(e.media_type) === "video" ? "video" : "image",
      imageUrl: e.media_image,
      videoUrl: e.media_video,
      frameColor: e.frame_color,
      useSvgFrame: e.use_svg_frame !== !1
    })}
                  </div>
                ` : l}

            <div class="col faq ${this.hasMedia ? "" : "full-width"}">
              ${this.items.map((a, d) => {
      const u = this.openIndexes.has(d);
      return t`
                  <div class="item ${u ? "open" : ""}">
                    <button
                      class="q"
                      type="button"
                      aria-expanded=${u ? "true" : "false"}
                      @click=${() => this.toggle(d)}
                    >
                      <span>${a.question ?? ""}</span>
                      <span class="icon" aria-hidden="true"></span>
                    </button>
                    <div class="a-wrap">
                      <div class="a-clip">
                        <div class="a">${$(I(a.answer))}</div>
                      </div>
                    </div>
                  </div>
                `;
    })}
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
g.styles = [
  S,
  q,
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

      .body {
        display: flex;
        flex-direction: row;
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

      /* ---------- accordion ---------- */
    .faq {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .item {
      background: var(--item-bg, #f4f4f4);
      color: var(--q-color, #111);
      transition: background 0.4s ease, color 0.4s ease;
    }
    .item.open {
      background: var(--active-bg, #2b2b2b);
      color: var(--active-q-color, #fff);
    }
    .q {
      all: unset;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.1rem 1.5rem;
      cursor: pointer;
      font-weight: 800;
      font-size: 0.95rem;
      text-align: right;
    }
    .q:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: -4px;
    }
    .icon {
      position: relative;
      flex: none;
      width: 16px;
      height: 16px;
      color: var(--icon-color, #111);
      transition: color 0.4s ease;
    }
    .item.open .icon {
      color: var(--active-icon-color, #fff);
    }
    .icon::before,
    .icon::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 14px;
      height: 1.5px;
      background: currentColor;
      transform: translate(-50%, -50%);
      transition: transform var(--dur, 0.4s) ease;
    }
    .icon::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
    .item.open .icon::after {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    /* smooth open/close: animate grid row 0fr -> 1fr */
    .a-wrap {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--dur, 0.4s) ease;
    }
    .item.open .a-wrap {
      grid-template-rows: 1fr;
    }
    .a-clip {
      overflow: hidden;
      min-height: 0;
    }
    .a {
      padding: 0 1.5rem 1.25rem;
      font-size: 0.8rem;
      line-height: 1.9;
      color: var(--a-color, #555);
      opacity: 0;
      transform: translateY(-6px);
      transition:
        opacity var(--dur, 0.4s) ease,
        transform var(--dur, 0.4s) ease,
        color 0.4s ease;
    }
    .item.open .a {
      color: var(--active-a-color, #cfcfcf);
      opacity: 1;
      transform: none;
    }
    .a strong {
      font-weight: 800;
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition-duration: 0.01ms !important;
      }
    }

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
    }
  `
];
let n = g;
v([
  x({ type: Object })
], n.prototype, "config");
v([
  w()
], n.prototype, "openIndexes");
typeof n < "u" && n.registerSallaComponent("salla-drone-faq");
export {
  n as default
};
