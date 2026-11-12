import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  PLAY_BTN_PATH,
  renderSectionHeader,
  sectionHeaderStyles,
  VIDEO_CARD_FRAME_PATH,
} from "../../shared/theme.js";

interface VideoItem {
  id?: string;
  title?: string;
  poster?: string;
  video_url?: string;
  autoplay?: boolean;
}

interface DroneVideosConfig {
  title?: string;
  badge?: string;
  heading?: string;

  videos?: VideoItem[];

  video_autoplay?: boolean;
  slider_autoplay?: boolean;
  autoplay_interval?: number;
  slider_speed?: number;

  bg_color?: string;
  text_color?: string;
  line_color?: string;
  frame_stroke?: string;
  play_bg?: string;
  play_stroke?: string;
  play_icon_color?: string;
  nav_bg?: string;
  nav_color?: string;
}

const PLAY_ICON_SVG = `
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="8,5 19,12 8,19" />
  </svg>
`;

const PAUSE_ICON_SVG = `
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
`;

function extractUrl(val: unknown): string {
  if (!val) return "";
  if (typeof val === "string") return val.trim();
  if (Array.isArray(val)) {
    return extractUrl(val[0]);
  }
  if (typeof val === "object") {
    const obj = val as any;
    return String(obj.url || obj.value || obj.src || obj.path || "").trim();
  }
  return String(val).trim();
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

export default class DroneVideos extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  private swiperInstance: Swiper | null = null;

  private get cfg(): DroneVideosConfig {
    const parsed = parseJsonSafe(this.config);
    return parsed && typeof parsed === "object" ? parsed : {};
  }

  private get titleText(): string {
    return this.cfg.badge || this.cfg.title || "";
  }

  private get headingText(): string {
    return this.cfg.heading || "";
  }

  private get globalVideoAutoplay(): boolean {
    const v = this.cfg.video_autoplay;
    return v === true || v === "true" || v === 1 || v === "1";
  }

  private get sliderAutoplay(): boolean {
    const s = this.cfg.slider_autoplay;
    return s === true || s === "true" || s === 1 || s === "1";
  }

  private get sliderSpeed(): number {
    const s = Number(this.cfg.slider_speed);
    return Number.isFinite(s) && s > 0 ? s : 1000;
  }

  private get videosList(): VideoItem[] {
    const list = this.cfg.videos;
    if (Array.isArray(list)) {
      return list.map((item, idx) => ({
        id: item.id || `v-${idx}`,
        title: item.title || "",
        poster: extractUrl(item.poster),
        video_url: extractUrl(item.video_url),
        autoplay: item.autoplay === true || item.autoplay === "true" || item.autoplay === 1,
      }));
    }
    return [];
  }

  private isVideoAutoplay(v: VideoItem): boolean {
    return this.globalVideoAutoplay || !!v.autoplay;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.id) this.id = "videos";
  }

  firstUpdated() {
    this.initSwiper();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has("config")) {
      this.initSwiper();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanEventListeners();
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
      this.swiperInstance = null;
    }
  }

  private cleanEventListeners() {
    const swiperEl = this.renderRoot.querySelector<HTMLElement>(".swiper");
    if (swiperEl) {
      swiperEl.removeEventListener("click", this.onSwiperClick);
      swiperEl.removeEventListener("play", this.onVideoPlay, true);
      swiperEl.removeEventListener("pause", this.onVideoPause, true);
      swiperEl.removeEventListener("ended", this.onVideoPause, true);
    }
  }

  private onSwiperClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const card = target.closest(".card-aspect") as HTMLElement | null;
    if (!card) return;

    const videoEl = card.querySelector<HTMLVideoElement>("video");
    if (!videoEl) return;

    e.preventDefault();
    e.stopPropagation();

    if (videoEl.paused) {
      videoEl.play().catch((err) => {
        console.warn("Could not play video:", err);
      });
    } else {
      videoEl.pause();
    }
  };

  private onVideoPlay = (e: Event) => {
    const video = e.target as HTMLVideoElement;
    if (!video || video.tagName !== "VIDEO") return;
    const card = video.closest(".card-aspect") as HTMLElement | null;
    if (!card) return;

    card.classList.add("is-playing-card");
    const btn = card.querySelector<HTMLElement>(".tactical-play-btn");
    if (btn) {
      btn.classList.add("is-playing");
      btn.setAttribute("aria-label", "إيقاف الفيديو");
    }
    const icon = card.querySelector<HTMLElement>(".play-icon");
    if (icon) {
      icon.innerHTML = PAUSE_ICON_SVG;
    }
  };

  private onVideoPause = (e: Event) => {
    const video = e.target as HTMLVideoElement;
    if (!video || video.tagName !== "VIDEO") return;
    const card = video.closest(".card-aspect") as HTMLElement | null;
    if (!card) return;

    card.classList.remove("is-playing-card");
    const btn = card.querySelector<HTMLElement>(".tactical-play-btn");
    if (btn) {
      btn.classList.remove("is-playing");
      btn.setAttribute("aria-label", "تشغيل الفيديو");
    }
    const icon = card.querySelector<HTMLElement>(".play-icon");
    if (icon) {
      icon.innerHTML = PLAY_ICON_SVG;
    }
  };

  private initSwiper() {
    this.cleanEventListeners();

    const swiperEl = this.renderRoot.querySelector<HTMLElement>(".swiper");
    if (!swiperEl) return;

    swiperEl.addEventListener("click", this.onSwiperClick);
    swiperEl.addEventListener("play", this.onVideoPlay, true);
    swiperEl.addEventListener("pause", this.onVideoPause, true);
    swiperEl.addEventListener("ended", this.onVideoPause, true);

    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
      this.swiperInstance = null;
    }

    const nextBtn =
      this.renderRoot.querySelector<HTMLElement>(".nav-arrow-next");
    const prevBtn =
      this.renderRoot.querySelector<HTMLElement>(".nav-arrow-prev");
    const paginationEl =
      this.renderRoot.querySelector<HTMLElement>(".swiper-pagination");

    this.swiperInstance = new Swiper(swiperEl, {
      modules: [Navigation, Pagination, Autoplay],
      speed: this.sliderSpeed, // 1000ms transition speed
      slidesPerView: 1.1,
      spaceBetween: 16,
      loop: this.videosList.length > 3,
      autoplay: this.sliderAutoplay
        ? {
            delay: Math.max(
              2500,
              Number(this.cfg.autoplay_interval || 5) * 1000
            ),
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      pagination: {
        el: paginationEl,
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  }

  static styles = [
    sectionHeaderStyles,
    css`
      :host {
        display: block;
        direction: rtl;
        font-family: inherit;
        width: 100%;
        box-sizing: border-box;
        scroll-margin-top: 80px;
        --sec-bg: #ffffff;
        --sec-text: #111111;
        --sec-line: #e0e0e0;
        --frame-stroke: #D5D5D5;
        --play-bg: #0D0D0D;
        --play-stroke: #ffffff;
        --play-icon: #ffffff;
        --nav-bg: #0D0D0D;
        --nav-color: #ffffff;
      }

      * {
        box-sizing: border-box;
      }

      .videos-section {
        position: relative;
        background: var(--sec-bg);
        color: var(--sec-text);
        overflow: hidden;
        padding: 4.5rem 1.5rem 5rem;
      }

      .container {
        max-width: 1360px;
        margin: 0 auto;
        position: relative;
      }

      /* =================== SWIPER CORE CSS =================== */
      .swiper {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        list-style: none;
        padding: 1.5rem 0 2rem;
        z-index: 1;
        display: block;
        width: 100%;
      }

      .swiper-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        transition-property: transform;
        box-sizing: content-box;
      }

      .swiper-slide {
        flex-shrink: 0;
        height: auto;
        position: relative;
        transition-property: transform;
        display: block;
      }

      /* =================== VIDEO CARD =================== */
      .card-aspect {
        position: relative;
        width: 100%;
        aspect-ratio: 638 / 463;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
        transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
      }

      .card-aspect:hover {
        transform: translateY(-4px);
      }

      /* Inner media clipped to exact tactical polygon */
      .video-media-wrap {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        overflow: hidden;
        background: #111111;
        clip-path: polygon(
          4.9% 1.73%,
          30.7% 1.73%,
          32.37% 4.79%,
          69.61% 4.79%,
          70.8% 1.73%,
          94.94% 1.73%,
          96.68% 3.37%,
          96.68% 16.82%,
          98.75% 18.57%,
          98.75% 80.89%,
          96.68% 82.85%,
          96.68% 95.87%,
          94.94% 98.27%,
          69.61% 98.27%,
          67.79% 95.87%,
          32.37% 95.87%,
          30.7% 98.27%,
          4.9% 98.27%,
          3.17% 95.87%,
          3.17% 82.85%,
          1.25% 80.89%,
          1.25% 18.57%,
          3.17% 16.82%,
          3.17% 3.37%
        );
      }

      .card-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        background: #000000;
      }

      /* Vignette overlay */
      .vignette-overlay {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          circle at center,
          rgba(0, 0, 0, 0.08) 0%,
          rgba(0, 0, 0, 0.42) 100%
        );
        pointer-events: none;
        z-index: 2;
        transition: opacity 0.3s ease;
      }

      .is-playing-card .vignette-overlay {
        opacity: 0.12;
      }

      /* Exact Figma tactical frame SVG overlay with stroke */
      .video-frame-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        pointer-events: none;
      }

      /* Play / Pause Button Overlay */
      .play-btn-wrapper {
        position: absolute;
        inset: 0;
        z-index: 4;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }

      .tactical-play-btn {
        position: relative;
        width: 63px;
        height: 58px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        padding: 0;
        box-sizing: border-box;
        pointer-events: none;
        transform: translateZ(0);
        transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
          opacity 0.3s ease, filter 0.3s ease;
      }

      .card-aspect:hover .tactical-play-btn {
        transform: scale(1.08);
        filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.4));
      }

      /* When video is playing: show pause button with clear opacity and 100% on hover */
      .tactical-play-btn.is-playing {
        opacity: 0.75;
      }

      .card-aspect:hover .tactical-play-btn.is-playing {
        opacity: 1;
        transform: scale(1.08);
        filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.5));
      }

      .play-btn-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .play-icon {
        position: relative;
        z-index: 2;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .play-icon svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* =================== SLIDER CONTROLS (ARROWS & PAGINATION) =================== */
      .slider-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.5rem;
        padding: 0 0.5rem;
      }

      .slider-arrows {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .nav-arrow-btn {
        width: 44px;
        height: 40px;
        background: var(--nav-bg);
        color: var(--nav-color);
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        clip-path: polygon(
          8px 0%,
          calc(100% - 8px) 0%,
          100% 8px,
          100% calc(100% - 8px),
          calc(100% - 8px) 100%,
          8px 100%,
          0% calc(100% - 8px),
          0% 8px
        );
        transition: transform 0.2s ease, opacity 0.2s ease;
      }

      .nav-arrow-btn:hover {
        transform: scale(1.06);
        opacity: 0.9;
      }

      .nav-arrow-btn svg {
        width: 20px;
        height: 20px;
      }

      .nav-arrow-btn.swiper-button-disabled {
        opacity: 0.35;
        cursor: not-allowed;
        pointer-events: none;
      }

      .swiper-pagination {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .swiper-pagination-bullet {
        width: 24px;
        height: 3px;
        border-radius: 2px;
        background: var(--sec-line, #e0e0e0);
        opacity: 0.7;
        transition: all 0.3s ease;
        cursor: pointer;
        display: inline-block;
      }

      .swiper-pagination-bullet-active {
        width: 40px;
        background: var(--sec-text, #111111);
        opacity: 1;
      }

      @media (max-width: 768px) {
        .videos-section {
          padding: 3rem 1rem 3.5rem;
        }

        .tactical-play-btn {
          width: 52px;
          height: 48px;
        }

        .play-icon {
          width: 18px;
          height: 18px;
        }
      }
    `,
  ];

  render() {
    const c = this.cfg;
    const bg = c.bg_color || "#ffffff";
    const text = c.text_color || "#111111";
    const line = c.line_color || "#e0e0e0";
    const frameStroke = c.frame_stroke || "#D5D5D5";
    const playBg = c.play_bg || "#0D0D0D";
    const playStroke = c.play_stroke || "#ffffff";
    const playIcon = c.play_icon_color || "#ffffff";
    const navBg = c.nav_bg || "#0D0D0D";
    const navColor = c.nav_color || "#ffffff";

    const customVars = [
      `--sec-bg:${bg}`,
      `--sec-text:${text}`,
      `--sec-line:${line}`,
      `--frame-stroke:${frameStroke}`,
      `--play-bg:${playBg}`,
      `--play-stroke:${playStroke}`,
      `--play-icon:${playIcon}`,
      `--nav-bg:${navBg}`,
      `--nav-color:${navColor}`,
    ].join(";");

    const videos = this.videosList;

    return html`
      <section class="videos-section" id="videos" style="${customVars}">
        <div class="container">
          <!-- Section Header (Title on left, Heading on right in RTL) -->
          ${renderSectionHeader(
            this.headingText,
            this.titleText,
            "var(--sec-text, #111111)",
            "var(--sec-text, #111111)",
            "var(--sec-line, #e0e0e0)",
            "var(--sec-text, #0d0d0d)"
          )}

          <!-- Swiper Slider Container -->
          <div class="swiper" dir="rtl">
            <div class="swiper-wrapper">
              ${videos.map((v, idx) => {
                const auto = this.isVideoAutoplay(v);
                return html`
                  <div class="swiper-slide">
                    <div class="card-aspect ${auto ? "is-playing-card" : ""}">
                      <!-- Inner Media (clipped to exact tactical polygon) -->
                      <div class="video-media-wrap">
                        <video
                          id="video-el-${idx}"
                          class="card-video"
                          src=${v.video_url || ""}
                          poster=${v.poster || ""}
                          playsinline
                          preload="metadata"
                          ?autoplay=${auto}
                          ?muted=${auto}
                          ?loop=${auto}
                        ></video>
                        <div class="vignette-overlay"></div>
                      </div>

                      <!-- Exact Figma Tactical Frame SVG Overlay with Stroke -->
                      <svg
                        class="video-frame-svg"
                        viewBox="0 0 638 463"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="video-stroke-mask-${idx}"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="638"
                          height="463"
                          fill="black"
                        >
                          <rect fill="white" width="638" height="463" />
                          <path
                            d="${VIDEO_CARD_FRAME_PATH}"
                            fill="black"
                          />
                        </mask>
                        <path
                          d="${VIDEO_CARD_FRAME_PATH}"
                          stroke-width="14"
                          stroke="var(--frame-stroke, #D5D5D5)"
                          mask="url(#video-stroke-mask-${idx})"
                        />
                      </svg>

                      <!-- Center Play / Pause Indicator Badge (hidden completely when autoplay is active) -->
                      ${auto
                        ? nothing
                        : html`
                            <div class="play-btn-wrapper">
                              <div
                                class="tactical-play-btn"
                                aria-label="تشغيل الفيديو"
                              >
                                <svg
                                  class="play-btn-bg"
                                  viewBox="0 0 63 58"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="${PLAY_BTN_PATH}"
                                    fill="var(--play-bg, #0D0D0D)"
                                    stroke="var(--play-stroke, #ffffff)"
                                  />
                                </svg>
                                <span
                                  class="play-icon"
                                  style="color: var(--play-icon, #ffffff);"
                                >
                                  <svg viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="8,5 19,12 8,19" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          `}
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>

          <!-- Slider Navigation & Indicators -->
          <div class="slider-controls">
            <!-- Next & Previous Arrows (RTL aware: Right is Prev, Left is Next) -->
            <div class="slider-arrows">
              <button
                class="nav-arrow-btn nav-arrow-prev"
                aria-label="السابق"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </button>
              <button
                class="nav-arrow-btn nav-arrow-next"
                aria-label="التالي"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
              </button>
            </div>

            <!-- Swiper Pagination Dots -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </section>
    `;
  }
}
