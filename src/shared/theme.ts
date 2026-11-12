import { css, html, nothing } from "lit";

/**
 * Main CTA Button SVG path (Figma exact vector):
 * Diagonal parallel notches on top-right and bottom-left edges.
 * Native dimensions: 179x56
 */
export const TACTICAL_BTN_PATH =
  "M0 0H97.555L102.03 4.42105H115.007L111.427 0H116.35L121.72 4.42105H135.145L131.117 0H179V56H57.28L52.805 51.5789H37.59L42.065 56H35.8L30.43 51.5789H17.4525L21.0325 56H0V0Z";

export const tacticalButtonStyles = css`
  .cta-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1.8rem;
    text-decoration: none;
    color: var(--btn-text, #0d0d0d);
    font-weight: 700;
    font-size: 0.9rem;
    white-space: nowrap;
    cursor: pointer;
    background: transparent;
    border: none;
    min-width: 145px;
    height: 42px;
    box-sizing: border-box;
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform, opacity;
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
      opacity 0.3s ease;
  }

  .cta-btn:hover {
    transform: translateY(-2.5px);
    opacity: 0.92;
  }

  .cta-btn:active {
    transform: translateY(0);
    opacity: 1;
    transition: transform 0.1s ease;
  }

  .cta-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .cta-text {
    position: relative;
    z-index: 2;
    line-height: 1;
    color: inherit;
    display: inline-block;
  }
`;

export function renderTacticalButton(
  text: string,
  link: string = "#",
  bgVar: string = "var(--btn-bg, #ffffff)",
  extraClass: string = "",
  inlineStyle: string = ""
) {
  if (!text) return nothing;
  return html`
    <a class="cta-btn ${extraClass}" href=${link} style="${inlineStyle}">
      <svg
        class="cta-bg"
        viewBox="0 0 179 56"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="${TACTICAL_BTN_PATH}" fill="${bgVar}" />
      </svg>
      <span class="cta-text">${text}</span>
    </a>
  `;
}

/**
 * Tactical Social Media Badges (Native 62x57 aspect ratio)
 * Figma exact vector for social badge icons
 */
export const SOCIAL_BTN_PATH =
  "M20.5 0H0V14H4.5V39H0V48L10.5 57H20.5V52H33V57H62V43.5H59V14H62V4L55 0H33V4H20.5V0Z";

/**
 * Tactical Video Play Button (Native 63x58 aspect ratio)
 * Figma exact vector for video play button
 */
export const PLAY_BTN_PATH =
  "M21 0.5H0.5V14.5H5V39.5H0.5V48.5L11 57.5H21V52.5H33.5V57.5H62.5V44H59.5V14.5H62.5V4.5L55.5 0.5H33.5V4.5H21V0.5Z";

/**
 * Tactical Video Card Frame (Native 638x463 aspect ratio)
 * Figma exact vector for video slider cards
 */
export const VIDEO_CARD_FRAME_PATH =
  "M20.1564 15.5934L31.2997 8H195.917L206.554 22.1744H444.109L451.707 8H605.687L616.831 15.5934V77.8596L630 85.9592V374.51L616.831 383.622V443.863L605.687 455H444.109L432.459 443.863H206.554L195.917 455H31.2997L20.1564 443.863V383.622L8 374.51V85.9592L20.1564 77.8596V15.5934Z";
export const socialButtonStyles = css`
  .social-badge {
    position: relative;
    width: 44px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--social-color, #111111);
    background: transparent;
    border: none;
    cursor: pointer;
    box-sizing: border-box;
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform;
    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1),
      color 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .social-badge:hover {
    transform: translateY(-3px);
    color: var(--social-hover-color, #ffffff);
  }

  .social-badge:active {
    transform: translateY(-1px);
    transition: transform 0.12s ease;
  }

  .social-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .social-bg path {
    transition: fill 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .social-badge:hover .social-bg path {
    fill: var(--social-hover-bg, #0d0d0d);
  }

  .social-icon {
    position: relative;
    z-index: 2;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .social-badge:hover .social-icon {
    transform: scale(1.1);
  }

  .social-icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export function renderSocialBadge(
  iconSvg: unknown,
  link: string = "#",
  label: string = "",
  bgVar: string = "var(--social-bg, #E6E6E6)"
) {
  return html`
    <a
      class="social-badge"
      href=${link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label=${label}
    >
      <svg
        class="social-bg"
        viewBox="0 0 62 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="${SOCIAL_BTN_PATH}" fill="${bgVar}" />
      </svg>
      <span class="social-icon">
        ${iconSvg}
      </span>
    </a>
  `;
}

/**
 * Unified Section Header Styles (head, heading, badge, line with angled bar)
 */
export const sectionHeaderStyles = css`
  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.5rem;
    padding-bottom: 0.6rem;
    direction: rtl;
  }

  .heading {
    margin: 0;
    font-size: clamp(1.3rem, 2.8cqw, 2.3rem);
    font-weight: 800;
    line-height: 1.3;
    color: var(--heading-color, inherit);
    letter-spacing: -0.01em;
  }

  .badge {
    margin: 0;
    font-size: clamp(0.95rem, 1.6cqw, 1.35rem);
    font-weight: 800;
    white-space: nowrap;
    color: var(--badge-color, inherit);
  }

  .line {
    position: relative;
    height: 1px;
    background: var(--line-color, rgba(128, 128, 128, 0.35));
    margin-bottom: 2.2rem;
  }

  .line::before {
    content: "";
    position: absolute;
    top: -2.5px;
    left: 0;
    width: 7.5%;
    min-width: 65px;
    height: 5px;
    background: var(--bar-color, currentColor);
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
  }

  @media (max-width: 768px) {
    .head {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      gap: 0.75rem;
    }
    .heading {
      font-size: 1.15rem;
    }
    .badge {
      font-size: 0.95rem;
    }
    .line {
      margin-bottom: 1.5rem;
    }
  }
`;

export function renderSectionHeader(
  heading: string,
  badge: string,
  headingColor?: string,
  badgeColor?: string,
  lineColor?: string,
  barColor?: string
) {
  const hStyle = headingColor ? `color: ${headingColor};` : "";
  const bStyle = badgeColor ? `color: ${badgeColor};` : "";
  const lStyle = [
    lineColor ? `background: ${lineColor};` : "",
    barColor ? `--bar-color: ${barColor};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <div class="head">
      <h2 class="heading" style="${hStyle}">${heading}</h2>
      <h3 class="badge" style="${bStyle}">${badge}</h3>
    </div>
    <div class="line" style="${lStyle}"></div>
  `;
}


/**
 * Tactical Framed Media SVG (matching Vector 3: 698x397)
 * M35.0513 0H333.366L371.191 56.0905H663.705L698 101.769V397H603.689L567.125 348.299H407.755L371.191 397H0V46.6861L35.0513 0Z
 */
export const TACTICAL_FRAME_PATH =
  "M35.0513 0H333.366L371.191 56.0905H663.705L698 101.769V397H603.689L567.125 348.299H407.755L371.191 397H0V46.6861L35.0513 0Z";

export const tacticalFrameStyles = css`
  .frame {
    position: relative;
    aspect-ratio: 698 / 397;
    width: 100%;
    filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.08));
    box-sizing: border-box;
  }

  .tactical-svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
  }

  .floating-thumb {
    position: absolute;
    bottom: -10px;
    right: -10px;
    z-index: 5;
    pointer-events: none;
  }
`;

export function renderTacticalMedia(opts: {
  id?: string;
  type?: "image" | "video";
  imageUrl?: string;
  videoUrl?: string;
  frameColor?: string;
  floatingNode?: unknown;
}) {
  const isVideo = opts.type === "video";
  const hasVideo = isVideo && Boolean(opts.videoUrl && opts.videoUrl.trim());
  const hasImage = !isVideo && Boolean(opts.imageUrl && opts.imageUrl.trim());

  // لو محطش صورة او فيديو الاسفيجي متظهرش
  if (!hasVideo && !hasImage) {
    return nothing;
  }

  const uid = opts.id || Math.random().toString(36).substring(2, 9);
  const stroke = opts.frameColor || "var(--frame-color, transparent)";

  if (hasVideo) {
    const maskId = `mask-${uid}`;
    return html`
      <div class="frame">
        <svg
          class="tactical-svg"
          viewBox="0 0 698 397"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <mask id="${maskId}">
              <path d="${TACTICAL_FRAME_PATH}" fill="#ffffff" />
            </mask>
          </defs>
          <foreignObject width="698" height="397" mask="url(#${maskId})">
            <video
              src="${opts.videoUrl}"
              autoplay
              muted
              loop
              playsinline
              style="width: 100%; height: 100%; object-fit: cover; display: block;"
            ></video>
          </foreignObject>
          <path
            d="${TACTICAL_FRAME_PATH}"
            fill="none"
            stroke="${stroke}"
            stroke-width="1.5"
          />
        </svg>
        ${opts.floatingNode || nothing}
      </div>
    `;
  }

  const patId = `pat-${uid}`;
  return html`
    <div class="frame">
      <svg
        class="tactical-svg"
        viewBox="0 0 698 397"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="${patId}" patternContentUnits="objectBoundingBox" width="1" height="1">
            <image href="${opts.imageUrl}" width="1" height="1" preserveAspectRatio="xMidYMid slice" />
          </pattern>
        </defs>
        <path
          d="${TACTICAL_FRAME_PATH}"
          fill="url(#${patId})"
          stroke="${stroke}"
          stroke-width="1.5"
        />
      </svg>
      ${opts.floatingNode || nothing}
    </div>
  `;
}

export function renderTacticalFrame(contentNode: unknown) {
  if (!contentNode) return nothing;
  return html`
    <div class="frame">
      ${contentNode}
    </div>
  `;
}
