import { css, html, nothing } from "lit";

/**
 * Tactical notched button SVG path:
 * Precision bevel cuts at top-right and bottom-left with parallel notches.
 */
export const TACTICAL_BTN_PATH =
  "M 0 0 L 100 0 L 106 7 L 109 7 L 114 0 L 120 0 L 126 7 L 129 7 L 134 0 L 170 0 L 170 42 L 70 42 L 64 35 L 61 35 L 56 42 L 50 42 L 44 35 L 41 35 L 36 42 L 0 42 Z";

export const tacticalButtonStyles = css`
  .cta-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1.6rem;
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
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
      filter 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .cta-btn:hover {
    transform: translateY(-2px);
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25));
  }

  .cta-btn:active {
    transform: translateY(1px);
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
  }
`;

export function renderTacticalButton(
  text: string,
  link: string = "#",
  bgVar: string = "var(--btn-bg, #ffffff)",
  extraClass: string = ""
) {
  if (!text) return nothing;
  return html`
    <a class="cta-btn ${extraClass}" href=${link}>
      <svg
        class="cta-bg"
        viewBox="0 0 170 42"
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
