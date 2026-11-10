import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
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
}

interface DroneVideosConfig {
  title?: string;
  heading?: string;

  videos?: VideoItem[];

  autoplay?: boolean;
  autoplay_interval?: number;

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

const DEFAULT_TITLE = "فيديوهات للدرون";
const DEFAULT_HEADING = "بنقرّبك من السماء.. وبنفتحلك آفاق جديدة";

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "تحليق جبلي ساحر",
    poster:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "v2",
    title: "استكشاف الطبيعة والوديان",
    poster:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  },
  {
    id: "v3",
    title: "ثبات وتصوير سينمائي دقيق",
    poster:
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d7?auto=format&fit=crop&w=1200&q=80",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: "v4",
    title: "تصوير احترافي وقت الغروب",
    poster:
      "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=1200&q=80",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
];

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

  @state()
  private currentIndex = 0;

  @state()
  private activeModalVideo: VideoItem | null = null;

  private autoplayTimer: any = null;

  private get cfg(): DroneVideosConfig {
    const parsed = parseJsonSafe(this.config);
    return parsed && typeof parsed === "object" ? parsed : {};
  }

  private get titleText(): string {
    return this.cfg.title ?? DEFAULT_TITLE;
  }

  private get headingText(): string {
    return this.cfg.heading ?? DEFAULT_HEADING;
  }

  private get videosList(): VideoItem[] {
    const list = this.cfg.videos;
    return Array.isArray(list) && list.length > 0 ? list : DEFAULT_VIDEOS;
  }

  connectedCallback() {
    super.connectedCallback();
    this.startAutoplay();
    window.addEventListener("keydown", this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoplay();
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this.activeModalVideo) {
      this.closeModal();
    }
  };

  private startAutoplay() {
    if (!this.cfg.autoplay) return;
    this.stopAutoplay();
    const interval = Math.max(3000, Number(this.cfg.autoplay_interval || 5) * 1000);
    this.autoplayTimer = setInterval(() => {
      this.nextSlide();
    }, interval);
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private prevSlide() {
    const total = this.videosList.length;
    this.currentIndex = (this.currentIndex - 1 + total) % total;
  }

  private nextSlide() {
    const total = this.videosList.length;
    this.currentIndex = (this.currentIndex + 1) % total;
  }

  private goToSlide(i: number) {
    this.currentIndex = i;
  }

  private openModal(video: VideoItem) {
    this.activeModalVideo = video;
  }

  private closeModal() {
    this.activeModalVideo = null;
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
        padding: 4rem 1.5rem 5rem;
      }

      .container {
        max-width: 1360px;
        margin: 0 auto;
        position: relative;
      }

      /* =================== SLIDER WRAPPER =================== */
      .slider-container {
        position: relative;
        margin-top: 3.5rem;
        width: 100%;
        overflow: hidden;
        padding: 1rem 0 2rem;
      }

      .slider-track {
        display: flex;
        align-items: center;
        gap: 2rem;
        transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        will-change: transform;
      }

      /* =================== VIDEO CARD =================== */
      .video-card-slide {
        flex: 0 0 calc((100% - 4rem) / 3);
        min-width: 290px;
        position: relative;
        transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1),
          opacity 0.35s ease, filter 0.35s ease;
      }

      .video-card-slide:hover {
        transform: translateY(-4px);
      }

      .card-aspect {
        position: relative;
        width: 100%;
        aspect-ratio: 638 / 463;
        box-sizing: border-box;
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

      .video-poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.4s ease;
      }

      .video-media-wrap::after {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(
          circle at center,
          rgba(0, 0, 0, 0.15) 0%,
          rgba(0, 0, 0, 0.45) 100%
        );
        pointer-events: none;
      }

      /* Exact Figma tactical frame SVG overlay with stroke */
      .video-frame-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        pointer-events: none;
      }

      /* Tactical Play Button */
      .play-btn-wrapper {
        position: absolute;
        inset: 0;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
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
        cursor: pointer;
        padding: 0;
        box-sizing: border-box;
        transform: translateZ(0);
        transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
          filter 0.3s ease;
      }

      .tactical-play-btn:hover {
        transform: scale(1.1);
        filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.5));
      }

      .tactical-play-btn:active {
        transform: scale(0.96);
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
        margin-left: 2px;
      }

      .play-icon svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* =================== SLIDER CONTROLS (ARROWS & DOTS) =================== */
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
        transition: transform 0.25s ease, opacity 0.25s ease;
        clip-path: polygon(
          20% 0%,
          80% 0%,
          100% 20%,
          100% 80%,
          80% 100%,
          20% 100%,
          0% 80%,
          0% 20%
        );
      }

      .nav-arrow-btn:hover {
        transform: translateY(-2px);
        opacity: 0.9;
      }

      .nav-arrow-btn:active {
        transform: translateY(0);
      }

      .nav-arrow-btn svg {
        width: 20px;
        height: 20px;
      }

      .slider-dots {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        background: #d5d5d5;
        border: none;
        cursor: pointer;
        transition: width 0.3s ease, background 0.3s ease;
        padding: 0;
      }

      .dot.active {
        width: 26px;
        background: var(--nav-bg);
      }

      /* =================== MODAL VIDEO POPUP =================== */
      .modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        animation: fadeIn 0.25s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .modal-content {
        position: relative;
        width: 100%;
        max-width: 900px;
        background: #000000;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        border: 1px solid #333333;
        overflow: hidden;
      }

      .modal-close {
        position: absolute;
        top: -45px;
        left: 0;
        background: transparent;
        border: none;
        color: #ffffff;
        font-size: 2rem;
        cursor: pointer;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.85;
        transition: opacity 0.2s ease, transform 0.2s ease;
      }

      .modal-close:hover {
        opacity: 1;
        transform: scale(1.1);
      }

      .modal-video-wrap {
        width: 100%;
        aspect-ratio: 16 / 9;
        background: #000000;
      }

      .modal-video-wrap video {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* =================== RESPONSIVE =================== */
      @media (max-width: 1080px) {
        .video-card-slide {
          flex: 0 0 calc((100% - 2rem) / 2);
        }
      }

      @media (max-width: 680px) {
        .videos-section {
          padding: 3rem 1rem 3.5rem;
        }

        .slider-container {
          margin-top: 2rem;
        }

        .video-card-slide {
          flex: 0 0 100%;
        }

        .tactical-play-btn {
          width: 52px;
          height: 48px;
        }

        .play-icon {
          width: 16px;
          height: 16px;
        }
      }
    `,
  ];

  private renderPlayButton() {
    const playBg = this.cfg.play_bg || "#0D0D0D";
    const playStroke = this.cfg.play_stroke || "#ffffff";
    const playIcon = this.cfg.play_icon_color || "#ffffff";

    return html`
      <div class="tactical-play-btn">
        <svg
          class="play-btn-bg"
          viewBox="0 0 63 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="${PLAY_BTN_PATH}"
            fill="${playBg}"
            stroke="${playStroke}"
          />
        </svg>
        <span class="play-icon" style="color: ${playIcon};">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="8,5 19,12 8,19" />
          </svg>
        </span>
      </div>
    `;
  }

  private renderModal() {
    if (!this.activeModalVideo) return nothing;
    const v = this.activeModalVideo;

    return html`
      <div class="modal-backdrop" @click=${this.closeModal}>
        <div class="modal-content" @click=${(e: Event) => e.stopPropagation()}>
          <button
            class="modal-close"
            @click=${this.closeModal}
            aria-label="إغلاق"
          >
            ✕
          </button>
          <div class="modal-video-wrap">
            <video
              src=${v.video_url || ""}
              poster=${v.poster || ""}
              controls
              autoplay
            ></video>
          </div>
        </div>
      </div>
    `;
  }

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
    const total = videos.length;

    // Calculate slider offset in percentage
    // In RTL, positive translateX moves items to the right
    const offset = this.currentIndex * (100 / Math.min(3, total));

    return html`
      <section class="videos-section" style="${customVars}">
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

          <!-- Slider Container -->
          <div
            class="slider-container"
            @mouseenter=${this.stopAutoplay}
            @mouseleave=${this.startAutoplay}
          >
            <div
              class="slider-track"
              style="transform: translateX(${offset}%);"
            >
              ${videos.map(
                (v, idx) => html`
                  <div
                    class="video-card-slide"
                    @click=${() => this.openModal(v)}
                  >
                    <div class="card-aspect">
                      <!-- Inner Media (clipped to exact tactical polygon) -->
                      <div class="video-media-wrap">
                        <img
                          class="video-poster"
                          src=${v.poster || ""}
                          alt=${v.title || "Drone Video"}
                          loading="lazy"
                        />
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
                          id="stroke-mask-${idx}"
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
                          mask="url(#stroke-mask-${idx})"
                        />
                      </svg>

                      <!-- Center Play Button -->
                      <div class="play-btn-wrapper">
                        ${this.renderPlayButton()}
                      </div>
                    </div>
                  </div>
                `
              )}
            </div>
          </div>

          <!-- Slider Navigation & Indicators -->
          <div class="slider-controls">
            <!-- Next & Previous Arrows (RTL aware) -->
            <div class="slider-arrows">
              <button
                class="nav-arrow-btn"
                @click=${this.prevSlide}
                aria-label="السابق"
              >
                <!-- Right Arrow in RTL is Prev -->
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </button>
              <button
                class="nav-arrow-btn"
                @click=${this.nextSlide}
                aria-label="التالي"
              >
                <!-- Left Arrow in RTL is Next -->
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
              </button>
            </div>

            <!-- Dots -->
            <div class="slider-dots">
              ${videos.map(
                (_, idx) => html`
                  <button
                    class="dot ${idx === this.currentIndex ? "active" : ""}"
                    @click=${() => this.goToSlide(idx)}
                    aria-label="شريحة ${idx + 1}"
                  ></button>
                `
              )}
            </div>
          </div>
        </div>

        <!-- Video Modal Overlay -->
        ${this.renderModal()}
      </section>
    `;
  }
}
