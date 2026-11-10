import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { renderSectionHeader, sectionHeaderStyles } from "../../shared/theme.js";

type BgType = "none" | "color" | "image" | "video";

interface FaqItem {
  question?: string;
  answer?: string;
}

interface DroneFaqConfig {
  heading?: string;
  badge?: string;
  items?: FaqItem[];
  reverse?: boolean;

  single_open?: boolean;
  first_open?: boolean;
  anim_duration?: number;

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
  line_color?: string;
  bar_color?: string;
  frame_color?: string;

  item_bg?: string;
  question_color?: string;
  answer_color?: string;
  icon_color?: string;
  active_bg?: string;
  active_question_color?: string;
  active_answer_color?: string;
  active_icon_color?: string;
}

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

const DEFAULT_FAQ_ITEMS: FaqItem[] = [
  {
    question: "كيف يمكنني طلب تفاصيل الخدمة؟",
    answer:
      "يمكنك طلب تفاصيل الخدمة من خلال التواصل معنا عبر الهاتف أو البريد الإلكتروني، أو إرسال استفسارك باستخدام نموذج التواصل في هذه الصفحة.",
  },
  {
    question: "ما هي مدة الشحن والتركيب؟",
    answer:
      "تختلف مدة الشحن والتركيب حسب موقعك ونوع المنتج، وغالبًا يتم التوصيل خلال أيام عمل قليلة.",
  },
  {
    question: "هل يمكنني استرجاع أو استبدال المنتج؟",
    answer:
      "نعم، يمكنك الاسترجاع أو الاستبدال خلال المدة المحددة في سياسة الاسترجاع بشرط أن يكون المنتج بحالته الأصلية.",
  },
  {
    question: "كيف يمكنني التواصل مع فريق الدعم؟",
    answer:
      "يمكنك التواصل مع فريق الدعم عبر الهاتف أو البريد الإلكتروني أو من خلال نموذج التواصل في الموقع.",
  },
];
const DEFAULT_FAQ_HEADING = "عندك سؤال؟ إحنا هنا نساعدك";
const DEFAULT_FAQ_BADGE = "الأسئلة الشائعة";

function richText(s?: string): string {
  if (!s) return "";
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/gs, "<strong>$1</strong>")
    .replace(/\r?\n/g, "<br>");
}

export default class DroneFaq extends LitElement {
  @property({ type: Object })
  config?: DroneFaqConfig;

  @state() private openIndexes: Set<number> = new Set();
  private initialised = false;

  private get cfg(): DroneFaqConfig {
    const parsed = parseJsonSafe(this.config);
    return parsed && typeof parsed === "object" ? parsed : {};
  }

  willUpdate() {
    // Apply the "first item open" option once, after the config arrives.
    if (!this.initialised) {
      this.initialised = true;
      if (this.cfg.first_open !== false && this.items.length) {
        this.openIndexes = new Set([0]);
      }
    }
  }

  private get items(): FaqItem[] {
    const list = this.cfg.items;
    return Array.isArray(list) && list.length > 0 ? list : DEFAULT_FAQ_ITEMS;
  }

  private toggle(i: number) {
    const next = new Set(this.openIndexes);
    if (next.has(i)) {
      next.delete(i);
    } else {
      // Single mode: opening one closes whichever was open before it.
      if (this.cfg.single_open !== false) next.clear();
      next.add(i);
    }
    this.openIndexes = next;
  }

  static styles = [
    sectionHeaderStyles,
    css`
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
  `];

  private renderMedia() {
    const c = this.cfg;
    if (pick(c.media_type) === "video") {
      return c.media_video
        ? html`<video
            src=${c.media_video}
            autoplay
            muted
            loop
            playsinline
          ></video>`
        : nothing;
    }
    return c.media_image ? html`<img src=${c.media_image} alt="" />` : nothing;
  }

  render() {
    const c = this.cfg;
    const heading = c.heading ?? DEFAULT_FAQ_HEADING;
    const badge = c.badge ?? DEFAULT_FAQ_BADGE;

    const bgType = (pick(c.bg_type) || "none") as BgType;
    const wrapBg =
      bgType === "color" && c.bg_color ? `background:${c.bg_color};` : "";
    const overlay =
      (bgType === "image" || bgType === "video") && Number(c.bg_overlay) > 0
        ? Number(c.bg_overlay) / 100
        : 0;

    const dur = Number(c.anim_duration);
    const vars: Record<string, string | undefined> = {
      "--frame-color": c.frame_color,
      "--bar-color": c.bar_color,
      "--item-bg": c.item_bg,
      "--q-color": c.question_color,
      "--a-color": c.answer_color,
      "--icon-color": c.icon_color,
      "--active-bg": c.active_bg,
      "--active-q-color": c.active_question_color,
      "--active-a-color": c.active_answer_color,
      "--active-icon-color": c.active_icon_color,
      "--dur": dur > 0 ? `${dur}ms` : undefined,
    };
    const varStyle = Object.entries(vars)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}:${v}`)
      .join(";");

    return html`
      <div class="wrap" style="${wrapBg}${varStyle}">
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
            <div class="col">
              <div class="frame">
                <div class="frame-outer"></div>
                <div class="frame-inner">${this.renderMedia()}</div>
              </div>
            </div>

            <div class="col faq">
              ${this.items.map((item, i) => {
                const open = this.openIndexes.has(i);
                return html`
                  <div class="item ${open ? "open" : ""}">
                    <button
                      class="q"
                      type="button"
                      aria-expanded=${open ? "true" : "false"}
                      @click=${() => this.toggle(i)}
                    >
                      <span>${item.question ?? ""}</span>
                      <span class="icon" aria-hidden="true"></span>
                    </button>
                    <div class="a-wrap">
                      <div class="a-clip">
                        <div class="a">${unsafeHTML(richText(item.answer))}</div>
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
}

