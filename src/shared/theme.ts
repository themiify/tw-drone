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
 * Tactical Framed Media (Outer notched frame & inner media container)
 * Precision 12-point vector polygon matching Figma design 575x327:
 * M 28.8746 0 H 274.621 L 305.78 46.2005 H 546.749 L 575 83.8249 V 327 H 497.309 L 467.187 286.886 H 335.901 L 305.78 327 H 0 V 38.4543 L 28.8746 0 Z
 */
export const TACTICAL_FRAME_PATH =
  "M 28.8746 0 H 274.621 L 305.78 46.2005 H 546.749 L 575 83.8249 V 327 H 497.309 L 467.187 286.886 H 335.901 L 305.78 327 H 0 V 38.4543 L 28.8746 0 Z";

export const TACTICAL_FRAME_POLYGON =
  "polygon(5.0217% 0%, 47.7602% 0%, 53.1791% 14.1286%, 95.0868% 14.1286%, 100% 25.6345%, 100% 100%, 86.4885% 100%, 81.2499% 87.7327%, 58.4176% 87.7327%, 53.1791% 100%, 0% 100%, 0% 11.7597%)";

export const tacticalFrameStyles = css`
  .frame {
    position: relative;
    aspect-ratio: 575 / 327;
    width: 100%;
    filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.1));
    box-sizing: border-box;
  }

  .frame-outer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.04));
    transition: transform 0.3s ease;
  }

  .frame-inner {
    position: absolute;
    inset: clamp(10px, 2.2cqw, 18px);
    z-index: 2;
    clip-path: polygon(
      5.0217% 0%,
      47.7602% 0%,
      53.1791% 14.1286%,
      95.0868% 14.1286%,
      100% 25.6345%,
      100% 100%,
      86.4885% 100%,
      81.2499% 87.7327%,
      58.4176% 87.7327%,
      53.1791% 100%,
      0% 100%,
      0% 11.7597%
    );
    background: #1e1e1e;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .frame-inner img,
  .frame-inner video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .frame:hover .frame-inner img,
  .frame:hover .frame-inner video {
    transform: scale(1.03);
  }

  .frame-inner .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 0.85rem;
    opacity: 0.6;
    color: #999;
  }
`;

export function renderTacticalFrame(contentNode: unknown) {
  return html`
    <div class="frame">
      <svg
        class="frame-outer"
        viewBox="0 0 575 327"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="${TACTICAL_FRAME_PATH}" fill="var(--frame-color, #ececec)" />
      </svg>
      <div class="frame-inner">
        ${contentNode || nothing}
      </div>
    </div>
  `;
}
