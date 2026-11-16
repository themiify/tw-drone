var He = Object.defineProperty;
var Fe = (e, t, i) => t in e ? He(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var le = (e, t, i) => Fe(e, typeof t != "symbol" ? t + "" : t, i);
import { LitElement as Ne, css as Re, nothing as Se, html as te } from "lit";
import { property as je } from "lit/decorators.js";
import { s as qe, r as We, V as xe, P as Ye } from "./theme-CYKg-qWL.js";
function Xe(e = "") {
  return e.trim().split(" ").filter((t) => !!t.trim());
}
function Ue(e) {
  Object.keys(e).forEach((t) => {
    try {
      e[t] = null;
    } catch {
    }
    try {
      delete e[t];
    } catch {
    }
  });
}
function Le(e, t = 0) {
  return setTimeout(e, t);
}
function se() {
  return Date.now();
}
function Je(e) {
  return window.getComputedStyle(e, null);
}
function Ke(e, t = "x") {
  const i = Je(e), s = i.transform || i.webkitTransform;
  if (!s || s === "none")
    return 0;
  const n = new DOMMatrixReadOnly(s);
  return t === "x" ? n.m41 : n.m42;
}
function ie(e) {
  return typeof e == "object" && e !== null && !!e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object";
}
function Ze(e) {
  var s;
  if (!e || typeof e != "object")
    return !1;
  const t = (s = e.ownerDocument) == null ? void 0 : s.defaultView, i = (t == null ? void 0 : t.HTMLElement) ?? (typeof HTMLElement < "u" ? HTMLElement : void 0);
  return !!i && e instanceof i;
}
function Qe(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : !!e && typeof e == "object" && (e.nodeType === 1 || e.nodeType === 11);
}
function N(e, ...t) {
  const i = Object(e);
  for (let s = 0; s < t.length; s += 1) {
    const n = t[s];
    if (n == null || Qe(n))
      continue;
    const r = n, o = Object.keys(Object(r));
    for (let l = 0, a = o.length; l < a; l += 1) {
      const c = o[l];
      if (c === "__proto__" || c === "constructor" || c === "prototype")
        continue;
      const d = Object.getOwnPropertyDescriptor(r, c);
      if (!d || !d.enumerable)
        continue;
      const f = r[c];
      ie(i[c]) && ie(f) ? f.__swiper__ ? i[c] = f : N(i[c], f) : !ie(i[c]) && ie(f) ? (i[c] = {}, f.__swiper__ ? i[c] = f : N(i[c], f)) : i[c] = f;
    }
  }
  return i;
}
function K(e, t, i) {
  e.style.setProperty(t, i);
}
function W(e, t = "") {
  const i = [...e.children];
  return e instanceof HTMLSlotElement && i.push(...e.assignedElements()), t ? i.filter((s) => s.matches(t)) : i;
}
function et(e, t) {
  const i = [t];
  for (; i.length > 0; ) {
    const s = i.shift();
    if (e === s)
      return !0;
    i.push(...s.children, ...s.shadowRoot ? s.shadowRoot.children : [], ...s.assignedElements ? s.assignedElements() : []);
  }
  return !1;
}
function tt(e, t) {
  let i = t.contains(e);
  return !i && t instanceof HTMLSlotElement && (i = [...t.assignedElements()].includes(e), i || (i = et(e, t))), i;
}
function ne(e) {
  try {
    console.warn(e);
  } catch {
  }
}
function re(e, t = []) {
  const i = document.createElement(e);
  return i.classList.add(...Array.isArray(t) ? t : Xe(t)), i;
}
function it(e, t) {
  const i = [];
  let s = e.previousElementSibling;
  for (; s; )
    (!t || s.matches(t)) && i.push(s), s = s.previousElementSibling;
  return i;
}
function st(e, t) {
  const i = [];
  let s = e.nextElementSibling;
  for (; s; )
    (!t || s.matches(t)) && i.push(s), s = s.nextElementSibling;
  return i;
}
function X(e, t) {
  return window.getComputedStyle(e, null).getPropertyValue(t);
}
function ae(e) {
  if (!(!e || !e.parentNode))
    return [...e.parentNode.children].indexOf(e);
}
function Ie(e, t) {
  const i = [];
  let s = e.parentElement;
  for (; s; )
    (!t || s.matches(t)) && i.push(s), s = s.parentElement;
  return i;
}
function pe(e, t, i) {
  {
    const s = window.getComputedStyle(e, null);
    return e[t === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getPropertyValue(t === "width" ? "margin-right" : "margin-top")) + parseFloat(s.getPropertyValue(t === "width" ? "margin-left" : "margin-bottom"));
  }
}
function H(e) {
  return (Array.isArray(e) ? e : [e]).filter((t) => !!t);
}
function he(e, t = "") {
  const i = globalThis.trustedTypes;
  typeof i < "u" ? e.innerHTML = i.createPolicy("html", { createHTML: (s) => s }).createHTML(t) : e.innerHTML = t;
}
let oe;
function nt() {
  return typeof window > "u" ? { touch: !1 } : {
    touch: "ontouchstart" in window || navigator.maxTouchPoints > 0
  };
}
function ke() {
  return oe || (oe = nt()), oe;
}
let de;
function rt({ userAgent: e } = {}) {
  if (typeof window > "u")
    return { ios: !1, android: !1 };
  const t = ke(), i = navigator.platform, s = e || navigator.userAgent, n = { ios: !1, android: !1 }, r = /(Android);?[\s/]+([\d.]+)?/.test(s), o = /(iPhone\sOS|iOS|iPod)/.test(s), l = /iPad/.test(s), a = i === "MacIntel" && t.touch && navigator.maxTouchPoints > 1, c = l || a;
  return r && !(i === "Win32") && (n.os = "android", n.android = !0), (c || o) && (n.os = "ios", n.ios = !0), n;
}
function Oe(e = {}) {
  return de || (de = rt(e)), de;
}
let ce;
function at() {
  if (typeof window > "u")
    return { isSafari: !1, isWebView: !1, need3dFix: !1 };
  const e = Oe(), t = navigator.userAgent, i = t.toLowerCase(), s = i.includes("safari") && !i.includes("chrome") && !i.includes("android"), n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t), r = s || n && e.ios;
  return { isSafari: s, isWebView: n, need3dFix: r };
}
function ze() {
  return ce || (ce = at()), ce;
}
const me = (e, t) => {
  if (!e || e.destroyed || !e.params || !e.params.lazyPreload)
    return;
  const i = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`, s = t.closest(i());
  if (s) {
    let n = s.querySelector(`.${e.params.lazyPreloaderClass}`);
    !n && e.isElement && (s.shadowRoot ? n = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      if (s.shadowRoot) {
        const r = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`);
        r && !r.lazyPreloaderManaged && r.remove();
      }
    })), n && !n.lazyPreloaderManaged && n.remove();
  }
}, fe = (e, t) => {
  if (!e.slides[t])
    return;
  const i = e.slides[t].querySelector('[loading="lazy"]');
  i && i.removeAttribute("loading");
}, Ae = (e) => {
  if (!e || e.destroyed || !e.params || !e.params.lazyPreload)
    return;
  let t = e.params.lazyPreloadPrevNext;
  const i = e.slides.length;
  if (!i || !t || t < 0)
    return;
  t = Math.min(t, i);
  const s = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), n = e.activeIndex;
  if (e.params.grid && (e.params.grid.rows ?? 1) > 1) {
    const o = n, l = [o - t];
    l.push(...Array.from({ length: t }).map((a, c) => o + s + c)), e.slides.forEach((a, c) => {
      a.column !== void 0 && l.includes(a.column) && fe(e, c);
    });
    return;
  }
  const r = n + s - 1;
  if (e.params.rewind || e.params.loop)
    for (let o = n - t; o <= r + t; o += 1) {
      const l = (o % i + i) % i;
      (l < n || l > r) && fe(e, l);
    }
  else
    for (let o = Math.max(n - t, 0); o <= Math.min(r + t, i - 1); o += 1)
      o !== n && (o > r || o < n) && fe(e, o);
};
function lt(e, t = "window", i) {
  if (!e || t === "container" && !i)
    return;
  let s = !1;
  const n = t === "window" ? window.innerHeight : i.clientHeight, r = Object.keys(e).map((o) => {
    if (typeof o == "string" && o.indexOf("@") === 0) {
      const l = parseFloat(o.substr(1));
      return { value: n * l, point: o };
    }
    return { value: o, point: o };
  });
  r.sort((o, l) => parseInt(String(o.value), 10) - parseInt(String(l.value), 10));
  for (let o = 0; o < r.length; o += 1) {
    const { point: l, value: a } = r[o];
    t === "window" ? window.matchMedia(`(min-width: ${a}px)`).matches && (s = l) : a <= i.clientWidth && (s = l);
  }
  return s || "max";
}
const we = (e, t) => !!(e.grid && t.grid && t.grid.rows > 1);
function ot() {
  const e = this, { realIndex: t, initialized: i, params: s, el: n } = e, r = s.breakpoints;
  if (!r || r && Object.keys(r).length === 0)
    return;
  const o = s.breakpointsBase === "window" || !s.breakpointsBase ? s.breakpointsBase : "container", l = ["window", "container"].includes(s.breakpointsBase) || !s.breakpointsBase ? e.el : document.querySelector(s.breakpointsBase), a = e.getBreakpoint(r, o, l);
  if (!a || e.currentBreakpoint === a)
    return;
  const c = r, f = (a in c ? c[a] : void 0) || e.originalParams, v = we(e, s), x = we(e, f), m = e.params.grabCursor, g = f.grabCursor, w = s.enabled;
  v && !x ? (n.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), e.emitContainerClasses()) : !v && x && (n.classList.add(`${s.containerModifierClass}grid`), (f.grid.fill && f.grid.fill === "column" || !f.grid.fill && s.grid.fill === "column") && n.classList.add(`${s.containerModifierClass}grid-column`), e.emitContainerClasses()), m && !g ? e.unsetGrabCursor() : !m && g && e.setGrabCursor();
  const b = (M, I) => M[I];
  ["navigation", "pagination", "scrollbar"].forEach((M) => {
    var T, S;
    const I = b(f, M);
    if (typeof I > "u")
      return;
    const C = b(s, M), D = typeof C == "object" && C !== null && C.enabled, L = typeof I == "object" && I !== null && I.enabled, z = e[M];
    D && !L && ((T = z == null ? void 0 : z.disable) == null || T.call(z)), !D && L && ((S = z == null ? void 0 : z.enable) == null || S.call(z));
  });
  const u = f.direction && f.direction !== s.direction, p = s.loop && (f.slidesPerView !== s.slidesPerView || u), y = s.loop;
  u && i && e.changeDirection(), N(e.params, f);
  const h = e.params.enabled, E = e.params.loop;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }), w && !h ? e.disable() : !w && h && e.enable(), e.currentBreakpoint = a, e.emit("_beforeBreakpoint", f), i && (p ? (e.loopDestroy(), e.updateSlides(), e.loopCreate(t)) : !y && E ? (e.updateSlides(), e.loopCreate(t)) : y && !E && e.loopDestroy()), e.emit("breakpoint", f);
}
var dt = { setBreakpoint: ot, getBreakpoint: lt };
function ct() {
  const e = this, { isLocked: t, params: i } = e, { slidesOffsetBefore: s } = i;
  if (s) {
    const n = e.slides.length - 1, r = e.slidesGrid[n] + e.slidesSizesGrid[n] + s * 2;
    e.isLocked = e.size > r;
  } else
    e.isLocked = e.snapGrid.length === 1;
  i.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), i.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var ft = { checkOverflow: ct };
function ut(e, t) {
  const i = [];
  return e.forEach((s) => {
    typeof s == "object" ? Object.keys(s).forEach((n) => {
      s[n] && i.push(t + n);
    }) : typeof s == "string" && i.push(t + s);
  }), i;
}
function pt() {
  const e = this, { classNames: t, params: i, rtl: s, el: n, device: r } = e, o = ut([
    "initialized",
    i.direction,
    { "free-mode": e.params.freeMode && i.freeMode.enabled },
    { autoheight: i.autoHeight },
    { rtl: s },
    { grid: i.grid && i.grid.rows > 1 },
    { "grid-column": i.grid && i.grid.rows > 1 && i.grid.fill === "column" },
    { android: r.android },
    { ios: r.ios },
    { "css-mode": i.cssMode },
    { centered: i.cssMode && i.centeredSlides },
    { "watch-progress": i.watchSlidesProgress }
  ], i.containerModifierClass);
  t.push(...o), n.classList.add(...t), e.emitContainerClasses();
}
function ht() {
  const e = this, { el: t, classNames: i } = e;
  !t || typeof t == "string" || (t.classList.remove(...i), e.emitContainerClasses());
}
var mt = { addClasses: pt, removeClasses: ht };
const De = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  eventsPrefix: "swiper",
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: !1,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: !1,
  // Set wrapper width
  setWrapperSize: !1,
  // Virtual Translate
  virtualTranslate: !1,
  // Effects
  effect: "slide",
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  snapToSlideEdge: !1,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: !0,
  // Round length
  roundLengths: !1,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  // Unique Navigation Elements
  uniqueNavElements: !0,
  // Resistance
  resistance: !0,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: !1,
  // Cursor
  grabCursor: !1,
  // Clicks
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  // loop
  loop: !1,
  loopAddBlankSlides: !0,
  loopAdditionalSlides: 0,
  loopPreventsSliding: !0,
  // rewind
  rewind: !1,
  // Swiping/no swiping
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreload: !0,
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: !0,
  // Internals
  _emitClasses: !1
};
var gt = {
  on(e, t, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != "function")
      return s;
    const n = i ? "unshift" : "push";
    return e.split(" ").forEach((r) => {
      s.eventsListeners[r] || (s.eventsListeners[r] = []), s.eventsListeners[r][n](t);
    }), s;
  },
  once(e, t, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != "function")
      return s;
    const n = function(...o) {
      s.off(e, n), n.__emitterProxy && delete n.__emitterProxy, t.apply(s, o);
    };
    return n.__emitterProxy = t, s.on(e, n, i);
  },
  onAny(e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function")
      return i;
    const s = t ? "unshift" : "push";
    return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners)
      return t;
    const i = t.eventsAnyListeners.indexOf(e);
    return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
  },
  off(e, t) {
    const i = this;
    return !i.eventsListeners || i.destroyed || !i.eventsListeners || e.split(" ").forEach((s) => {
      typeof t > "u" ? i.eventsListeners[s] = [] : i.eventsListeners[s] && i.eventsListeners[s].forEach((n, r) => {
        (n === t || n.__emitterProxy && n.__emitterProxy === t) && i.eventsListeners[s].splice(r, 1);
      });
    }), i;
  },
  emit(...e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners)
      return t;
    let i, s, n;
    if (typeof e[0] == "string" || Array.isArray(e[0]))
      i = e[0], s = e.slice(1, e.length), n = t;
    else {
      const o = e[0];
      i = o.events, s = o.data ?? [], n = o.context || t;
    }
    return s.unshift(n), (Array.isArray(i) ? i : i.split(" ")).forEach((o) => {
      t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach((l) => {
        l.apply(n, [o, ...s]);
      }), t.eventsListeners && t.eventsListeners[o] && t.eventsListeners[o].forEach((l) => {
        l.apply(n, s);
      });
    }), t;
  }
};
function vt(e) {
  const t = this;
  t.destroyed || t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function yt() {
  const e = this;
  e.destroyed || e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
function bt(e) {
  const t = this;
  t.destroyed || (me(t, e.target), !(e.type === "error" || t.params.cssMode || t.params.slidesPerView !== "auto" && !t.params.autoHeight) && t.update());
}
function St() {
  var d;
  const e = this, { params: t, el: i } = e;
  if (i && i.offsetWidth === 0)
    return;
  const { wrapperEl: s } = e, n = t.cssMode && s ? s.style.scrollSnapType : "none";
  n !== "none" && (s.style.scrollSnapType = "none", requestAnimationFrame(() => {
    e.destroyed || (s.style.scrollSnapType = n);
  })), t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: r, allowSlidePrev: o, snapGrid: l } = e, a = e.virtual && ((d = e.params.virtual) == null ? void 0 : d.enabled);
  e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
  const c = a && t.loop;
  if ((t.slidesPerView === "auto" || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !c) {
    const f = a ? e.virtual.slides.length : e.slides.length;
    e.slideTo(f - 1, 0, !1, !0);
  } else
    e.params.loop && !a ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
  if (t.cssMode && e.onScroll && e.onScroll(), e.autoplay && e.autoplay.running && e.autoplay.paused) {
    const f = e.autoplay;
    clearTimeout(f.resizeTimeout), f.resizeTimeout = setTimeout(() => {
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
    }, 500);
  }
  e.allowSlidePrev = o, e.allowSlideNext = r, e.params.watchOverflow && l !== e.snapGrid && e.checkOverflow();
}
function Ge(e) {
  let t, i;
  const s = e.el;
  return typeof e.params.width < "u" && e.params.width !== null ? t = e.params.width : t = s.clientWidth, typeof e.params.height < "u" && e.params.height !== null ? i = e.params.height : i = s.clientHeight, t === 0 && e.isHorizontal() || i === 0 && e.isVertical() ? null : (t = t - parseInt(X(s, "padding-left") || "0", 10) - parseInt(X(s, "padding-right") || "0", 10), i = i - parseInt(X(s, "padding-top") || "0", 10) - parseInt(X(s, "padding-bottom") || "0", 10), Number.isNaN(t) && (t = 0), Number.isNaN(i) && (i = 0), { width: t, height: i });
}
function _e(e) {
  const { params: t, el: i } = e;
  if (!t.updateOnWindowResize || !t.resizeObserver || typeof window.ResizeObserver > "u")
    return !1;
  const s = e.isHorizontal(), n = s ? i.clientWidth : i.clientHeight;
  if (n === e._clientSize)
    return !1;
  const r = Ge(e);
  return !r || (s ? r.width : r.height) !== e.size ? !0 : (e._clientSize = n, !1);
}
function xt() {
  const e = this, t = e.el, i = Ge(e);
  if (!i)
    return;
  const { width: s, height: n } = i;
  Object.assign(e, {
    width: s,
    height: n,
    size: e.isHorizontal() ? s : n,
    _clientSize: e.isHorizontal() ? t.clientWidth : t.clientHeight
  });
}
function wt() {
  const e = this;
  if (e.destroyed)
    return;
  const { wrapperEl: t, rtlTranslate: i, enabled: s } = e;
  if (!s || _e(e))
    return;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  let n;
  const r = e.maxTranslate() - e.minTranslate();
  r === 0 ? n = 0 : n = (e.translate - e.minTranslate()) / r, n !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function Tt(e) {
  var y;
  const t = this;
  if (t.destroyed)
    return;
  const i = t.touchEventsData;
  let s = e.originalEvent ?? e;
  if (s.type === "touchend" || s.type === "touchcancel") {
    const E = [...s.changedTouches].find((M) => M.identifier === i.touchId);
    if (!E || E.identifier !== i.touchId)
      return;
  } else if (i.touchId !== null || s.pointerId !== i.pointerId)
    return;
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(s.type) && !(["pointercancel", "contextmenu"].includes(s.type) && (t.browser.isSafari || t.browser.isWebView)))
    return;
  i.pointerId = null, i.touchId = null, i.startEventPath = void 0, i.lastMoveEvent = void 0;
  const { params: r, touches: o, rtlTranslate: l, slidesGrid: a, enabled: c } = t;
  if (!c || !r.simulateTouch && s.pointerType === "mouse")
    return;
  if (i.allowTouchCallbacks && t.emit("touchEnd", s), i.allowTouchCallbacks = !1, !i.isTouched) {
    i.isMoved && r.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, i.startMoving = !1;
    return;
  }
  r.grabCursor && i.isMoved && i.isTouched && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!1);
  const d = se(), f = d - i.touchStartTime;
  if (t.allowClick) {
    const h = s.path ?? (s.composedPath && s.composedPath());
    t.updateClickedSlide(h && h[0], h), t.emit("tap click", s), f < 300 && d - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", s);
  }
  if (i.lastClickTime = se(), Le(() => {
    t.destroyed || (t.allowClick = !0);
  }), !i.isTouched || !i.isMoved || !t.swipeDirection || o.diff === 0 && !i.loopSwapReset || i.currentTranslate === i.startTranslate && !i.loopSwapReset) {
    i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
    return;
  }
  i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
  let v;
  if (r.followFinger ? v = l ? t.translate : -t.translate : v = -(i.currentTranslate ?? 0), r.cssMode)
    return;
  if (r.freeMode && r.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: v });
    return;
  }
  const x = v >= -t.maxTranslate() && !t.params.loop;
  let m = 0, g = t.slidesSizesGrid[0];
  for (let h = 0; h < a.length; h += h < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup) {
    const E = h < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    typeof a[h + E] < "u" ? (x || v >= a[h] && v < a[h + E]) && (m = h, g = a[h + E] - a[h]) : (x || v >= a[h]) && (m = h, g = a[a.length - 1] - a[a.length - 2]);
  }
  let w = null, b = null;
  r.rewind && (t.isBeginning ? b = (y = r.virtual) != null && y.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (w = 0));
  const u = (v - a[m]) / g, p = m < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
  if (f > r.longSwipesMs) {
    if (!r.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.swipeDirection === "next" && (u >= r.longSwipesRatio ? t.slideTo(r.rewind && t.isEnd ? w : m + p) : t.slideTo(m)), t.swipeDirection === "prev" && (u > 1 - r.longSwipesRatio ? t.slideTo(m + p) : b !== null && u < 0 && Math.abs(u) > r.longSwipesRatio ? t.slideTo(b) : t.slideTo(m));
  } else {
    if (!r.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation && (s.target === t.navigation.nextEl || s.target === t.navigation.prevEl) ? s.target === t.navigation.nextEl ? t.slideTo(m + p) : t.slideTo(m) : (t.swipeDirection === "next" && t.slideTo(w !== null ? w : m + p), t.swipeDirection === "prev" && t.slideTo(b !== null ? b : m));
  }
}
function Et(e) {
  const t = this;
  if (t.destroyed)
    return;
  const i = t.touchEventsData, { params: s, touches: n, rtlTranslate: r, enabled: o } = t;
  if (!o || !s.simulateTouch && e.pointerType === "mouse")
    return;
  const l = e, a = l.originalEvent ?? l;
  if (a.type === "pointermove" && (i.touchId !== null || a.pointerId !== i.pointerId))
    return;
  let c;
  if (a.type === "touchmove") {
    const M = [...a.changedTouches].find((I) => I.identifier === i.touchId);
    if (!M || M.identifier !== i.touchId)
      return;
    c = M;
  } else
    c = a;
  if (!i.isTouched) {
    i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", a);
    return;
  }
  if (i.lastMoveEvent === a)
    return;
  i.lastMoveEvent = a;
  for (const E of i.startEventPath ?? []) {
    if (E === t.el)
      break;
    const M = E.swiper;
    M && M !== t && !M.destroyed && M.params.nested && M.touchEventsData.isTouched && M.onTouchMove(e);
  }
  const d = c.pageX, f = c.pageY;
  if (a.preventedByNestedSwiper) {
    n.startX = d, n.startY = f;
    return;
  }
  if (!t.allowTouchMove) {
    a.target.matches(i.focusableElements) || (t.allowClick = !1), i.isTouched && (Object.assign(n, {
      startX: d,
      startY: f,
      currentX: d,
      currentY: f
    }), i.touchStartTime = se());
    return;
  }
  if (s.touchReleaseOnEdges && !s.loop)
    if (t.isVertical()) {
      if (f < n.startY && t.translate <= t.maxTranslate() || f > n.startY && t.translate >= t.minTranslate()) {
        i.isTouched = !1, i.isMoved = !1;
        return;
      }
    } else {
      if (r && (d > n.startX && -t.translate <= t.maxTranslate() || d < n.startX && -t.translate >= t.minTranslate()))
        return;
      if (!r && (d < n.startX && t.translate <= t.maxTranslate() || d > n.startX && t.translate >= t.minTranslate()))
        return;
    }
  if (document.activeElement && document.activeElement.matches(i.focusableElements) && document.activeElement !== a.target && a.pointerType !== "mouse" && document.activeElement.blur(), document.activeElement && a.target === document.activeElement && a.target.matches(i.focusableElements)) {
    i.isMoved = !0, t.allowClick = !1;
    return;
  }
  i.allowTouchCallbacks && t.emit("touchMove", a), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = d, n.currentY = f;
  const v = n.currentX - n.startX, x = n.currentY - n.startY;
  if (t.params.threshold && Math.sqrt(v ** 2 + x ** 2) < t.params.threshold)
    return;
  if (typeof i.isScrolling > "u") {
    let E;
    t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : v * v + x * x >= 25 && (E = Math.atan2(Math.abs(x), Math.abs(v)) * 180 / Math.PI, i.isScrolling = t.isHorizontal() ? E > s.touchAngle : 90 - E > s.touchAngle);
  }
  if (i.isScrolling && t.emit("touchMoveOpposite", a), typeof i.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (i.startMoving = !0), i.isScrolling || a.type === "touchmove" && i.preventTouchMoveFromPointerMove) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving)
    return;
  t.allowClick = !1, !s.cssMode && a.cancelable && a.preventDefault(), s.touchMoveStopPropagation && !s.nested && a.stopPropagation();
  let m = t.isHorizontal() ? v : x, g = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  s.oneWayMovement && (m = Math.abs(m) * (r ? 1 : -1), g = Math.abs(g) * (r ? 1 : -1)), n.diff = m, m *= s.touchRatio, r && (m = -m, g = -g);
  const w = t.touchesDirection;
  t.swipeDirection = m > 0 ? "prev" : "next", t.touchesDirection = g > 0 ? "prev" : "next";
  const b = t.params.loop && !s.cssMode, u = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!i.isMoved) {
    if (b && u && t.loopFix({ direction: t.swipeDirection }), i.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const E = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      t.wrapperEl.dispatchEvent(E);
    }
    i.allowMomentumBounce = !1, s.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", a);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), s._loopSwapReset !== !1 && i.isMoved && i.allowThresholdMove && w !== t.touchesDirection && b && u && Math.abs(m) >= 1) {
    Object.assign(n, {
      startX: d,
      startY: f,
      currentX: d,
      currentY: f,
      startTranslate: i.currentTranslate
    }), i.loopSwapReset = !0, i.startTranslate = i.currentTranslate;
    return;
  }
  t.emit("sliderMove", a), i.isMoved = !0;
  const p = i.startTranslate ?? 0;
  i.currentTranslate = m + p;
  let y = !0, h = s.resistanceRatio;
  if (s.touchReleaseOnEdges && (h = 0), m > 0 ? (b && u && i.allowThresholdMove && i.currentTranslate > (s.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (s.slidesPerView !== "auto" && t.slides.length - s.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({ direction: "prev", setTranslate: !0, activeSlideIndex: 0 }), i.currentTranslate > t.minTranslate() && (y = !1, s.resistance && (i.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + p + m) ** h))) : m < 0 && (b && u && i.allowThresholdMove && i.currentTranslate < (s.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (s.slidesPerView !== "auto" && t.slides.length - s.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: t.slides.length - (s.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(String(s.slidesPerView))))
  }), i.currentTranslate < t.maxTranslate() && (y = !1, s.resistance && (i.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - p - m) ** h))), y && (a.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && (i.currentTranslate ?? 0) < p && (i.currentTranslate = p), !t.allowSlidePrev && t.swipeDirection === "prev" && (i.currentTranslate ?? 0) > p && (i.currentTranslate = p), !t.allowSlidePrev && !t.allowSlideNext && (i.currentTranslate = p), s.threshold > 0)
    if (Math.abs(m) > s.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, n.diff = t.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !s.followFinger || s.cssMode || ((s.freeMode && s.freeMode.enabled && t.freeMode || s.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), s.freeMode && s.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(i.currentTranslate), t.setTranslate(i.currentTranslate ?? 0));
}
function Ct(e, t) {
  function i(s) {
    if (!s || s === document || s === window)
      return null;
    let n = s;
    n.assignedSlot && (n = n.assignedSlot);
    const r = n.closest(e);
    if (!r && !n.getRootNode)
      return null;
    const o = n.getRootNode();
    return r || i(o.host);
  }
  return i(t);
}
function Te(e, t, i) {
  const { params: s } = e, n = s.edgeSwipeDetection, r = s.edgeSwipeThreshold;
  return n && (i <= r || i >= window.innerWidth - r) ? n === "prevent" ? (t.preventDefault(), !0) : !1 : !0;
}
function Pt(e) {
  const t = this;
  if (t.destroyed)
    return;
  const i = e.originalEvent ?? e, s = t.touchEventsData;
  if (i.type === "pointerdown") {
    const u = i;
    if (s.pointerId !== null && s.pointerId !== u.pointerId)
      return;
    s.pointerId = u.pointerId;
  } else i.type === "touchstart" && i.targetTouches.length === 1 && (s.touchId = i.targetTouches[0].identifier);
  if (i.type === "touchstart") {
    Te(t, i, i.targetTouches[0].pageX);
    return;
  }
  const { params: n, touches: r, enabled: o } = t;
  if (!o || !n.simulateTouch && i.pointerType === "mouse" || t.animating && n.preventInteractionOnTransition)
    return;
  !t.animating && n.cssMode && n.loop && t.loopFix();
  let l = i.target;
  if (n.touchEventsTarget === "wrapper" && !tt(l, t.wrapperEl))
    return;
  const a = i;
  if (typeof a.which == "number" && a.which === 3 || typeof a.button == "number" && a.button > 0 || s.isTouched && s.isMoved)
    return;
  const c = !!n.noSwipingClass && n.noSwipingClass !== "", d = i.composedPath ? i.composedPath() : i.path;
  c && i.target && i.target.shadowRoot && d && (l = d[0]);
  const f = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`, v = !!(i.target && i.target.shadowRoot);
  if (n.noSwiping && (v ? Ct(f, l) : l.closest(f))) {
    t.allowClick = !0;
    return;
  }
  if (n.swipeHandler && typeof n.swipeHandler == "string" && !l.closest(n.swipeHandler))
    return;
  const x = i;
  r.currentX = x.pageX, r.currentY = x.pageY;
  const m = r.currentX, g = r.currentY;
  if (!Te(t, i, m))
    return;
  Object.assign(s, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), r.startX = m, r.startY = g, s.touchStartTime = se(), s.startEventPath = d, t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, n.threshold > 0 && (s.allowThresholdMove = !1);
  let w = !0;
  l.matches(s.focusableElements) && (w = !1, l.nodeName === "SELECT" && (s.isTouched = !1)), document.activeElement && document.activeElement.matches(s.focusableElements) && document.activeElement !== l && (x.pointerType === "mouse" || x.pointerType !== "mouse" && !l.matches(s.focusableElements)) && document.activeElement.blur();
  const b = w && t.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || b) && !l.isContentEditable && i.preventDefault(), n.freeMode && n.freeMode.enabled && t.freeMode && t.animating && !n.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", i);
}
const Ve = (e, t) => {
  const { params: i, el: s, wrapperEl: n, device: r } = e, o = !!i.nested, l = t === "on" ? "addEventListener" : "removeEventListener", a = t;
  if (!s || typeof s == "string")
    return;
  document[l]("touchstart", e.onDocumentTouchStart, {
    passive: !1,
    capture: o
  }), s[l]("touchstart", e.onTouchStart, { passive: !1 }), s[l]("pointerdown", e.onTouchStart, { passive: !1 }), document[l]("touchmove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), document[l]("pointermove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), document[l]("touchend", e.onTouchEnd, { passive: !0 }), document[l]("pointerup", e.onTouchEnd, { passive: !0 }), document[l]("pointercancel", e.onTouchEnd, { passive: !0 }), document[l]("touchcancel", e.onTouchEnd, { passive: !0 }), document[l]("pointerout", e.onTouchEnd, { passive: !0 }), document[l]("pointerleave", e.onTouchEnd, { passive: !0 }), document[l]("contextmenu", e.onTouchEnd, { passive: !0 }), (i.preventClicks || i.preventClicksPropagation) && s[l]("click", e.onClick, !0), i.cssMode && n[l]("scroll", e.onScroll);
  const c = (d) => {
    e[a](d, St, !0);
  };
  i.updateOnWindowResize ? c(r.ios || r.android ? "resize orientationchange observerUpdate" : "resize observerUpdate") : c("observerUpdate"), i.lazyPreload && (s[l]("load", e.onLoad, { capture: !0 }), s[l]("error", e.onLoad, { capture: !0 }));
};
function Mt() {
  const e = this, { params: t } = e;
  e.onTouchStart = Pt.bind(e), e.onTouchMove = Et.bind(e), e.onTouchEnd = Tt.bind(e), e.onDocumentTouchStart = yt.bind(e), t.cssMode && (e.onScroll = wt.bind(e)), e.onClick = vt.bind(e), e.onLoad = bt.bind(e), Ve(e, "on");
}
function Lt() {
  Ve(this, "off");
}
var It = {
  attachEvents: Mt,
  detachEvents: Lt
};
function kt(e) {
  const t = this;
  if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
    return;
  const i = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
  t.isElement && (t.__preventObserver__ = !0), i.style.cursor = "move", i.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame(() => {
    t.__preventObserver__ = !1;
  });
}
function Ot() {
  const e = this;
  e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  }));
}
var zt = {
  setGrabCursor: kt,
  unsetGrabCursor: Ot
};
function At(e, t) {
  var x;
  const i = this, { params: s, slidesEl: n } = i;
  if (!s.loop || i.virtual && ((x = i.params.virtual) != null && x.enabled))
    return;
  const r = () => {
    W(n, `.${s.slideClass}, swiper-slide`).forEach((g, w) => {
      g.setAttribute("data-swiper-slide-index", String(w));
    });
  }, o = () => {
    const m = W(n, `.${s.slideBlankClass}`);
    m.forEach((g) => {
      g.remove();
    }), m.length > 0 && (i.recalcSlides(), i.updateSlides());
  }, l = i.grid && s.grid && s.grid.rows > 1;
  s.loopAddBlankSlides && (s.slidesPerGroup > 1 || l) && o();
  const a = s.slidesPerGroup * (l ? s.grid.rows : 1), c = i.slides.length % a !== 0, d = l && i.slides.length % s.grid.rows !== 0, f = (m) => {
    for (let g = 0; g < m; g += 1) {
      const w = i.isElement ? re("swiper-slide", [s.slideBlankClass]) : re("div", [s.slideClass, s.slideBlankClass]);
      i.slidesEl.append(w);
    }
  };
  if (c) {
    if (s.loopAddBlankSlides) {
      const m = a - i.slides.length % a;
      f(m), i.recalcSlides(), i.updateSlides();
    } else
      ne("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    r();
  } else if (d) {
    if (s.loopAddBlankSlides) {
      const m = s.grid.rows - i.slides.length % s.grid.rows;
      f(m), i.recalcSlides(), i.updateSlides();
    } else
      ne("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    r();
  } else
    r();
  const v = s.centeredSlides || !!s.slidesOffsetBefore || !!s.slidesOffsetAfter;
  i.loopFix({
    slideRealIndex: e,
    direction: v ? void 0 : "next",
    initial: t
  });
}
function Dt() {
  var n;
  const e = this, { params: t, slidesEl: i } = e;
  if (!t.loop || !i || e.virtual && ((n = e.params.virtual) != null && n.enabled))
    return;
  e.recalcSlides();
  const s = [];
  e.slides.forEach((r) => {
    const o = r, l = typeof o.swiperSlideIndex > "u" ? Number(r.getAttribute("data-swiper-slide-index")) : o.swiperSlideIndex;
    s[l] = r;
  }), e.slides.forEach((r) => {
    r.removeAttribute("data-swiper-slide-index");
  }), s.forEach((r) => {
    i.append(r);
  }), e.recalcSlides(), e.slideTo(e.realIndex, 0);
}
function Gt(e = {}) {
  var ee, be;
  const { slideRealIndex: t, slideTo: i = !0, direction: s, setTranslate: n, activeSlideIndex: r, initial: o, byController: l, byMousewheel: a } = e;
  let c = r;
  const d = this;
  if (!d.params.loop || d.params.watchOverflow && d.isLocked)
    return;
  d.emit("beforeLoopFix"), d.__loopFixInProgress__ = !0;
  const { slides: f, allowSlidePrev: v, allowSlideNext: x, slidesEl: m, params: g } = d, { centeredSlides: w, slidesOffsetBefore: b, slidesOffsetAfter: u, initialSlide: p } = g, y = w || !!b || !!u;
  if (d.allowSlidePrev = !0, d.allowSlideNext = !0, d.virtual && ((ee = g.virtual) != null && ee.enabled)) {
    if (i) {
      const O = d.virtual.slides.length, B = d.virtual.slidesBefore ?? 0;
      !y && d.snapIndex === 0 ? d.slideTo(O, 0, !1, !0) : y && d.snapIndex < g.slidesPerView ? d.slideTo(O + d.snapIndex, 0, !1, !0) : d.snapIndex === d.snapGrid.length - 1 && d.slideTo(B, 0, !1, !0);
    }
    d.allowSlidePrev = v, d.allowSlideNext = x, d.__loopFixInProgress__ = !1, d.emit("loopFix");
    return;
  }
  let h = g.slidesPerView;
  h === "auto" ? h = d.slidesPerViewDynamic() : (h = Math.ceil(parseFloat(String(g.slidesPerView))), y && h % 2 === 0 && (h = h + 1));
  const E = g.slidesPerGroupAuto ? h : g.slidesPerGroup, M = (O) => (typeof O == "function" ? O.call(d) : O) || 0, I = d.slidesGrid.length > 1 ? (d.slidesGrid[d.slidesGrid.length - 1] - d.slidesGrid[0]) / (d.slidesGrid.length - 1) : d.size, C = I > 0 ? M(b) / I : 0, D = I > 0 ? M(u) / I : 0;
  let L = y ? Math.max(E, (w ? Math.ceil(h / 2) : 0) + Math.ceil(Math.max(C, D))) : E;
  L % E !== 0 && (L += E - L % E), L += g.loopAdditionalSlides, d.loopedSlides = L;
  const z = d.grid && g.grid && g.grid.rows > 1;
  f.length < h + L || d.params.effect === "cards" && f.length < h + L * 2 ? ne("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : z && g.grid.fill === "row" && ne("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const T = [], S = [], P = z ? Math.ceil(f.length / g.grid.rows) : f.length;
  L > (P - h) / 2 && (L = Math.max(E, Math.floor((P - h - 1) / 2 / E) * E), d.loopedSlides = L);
  const _ = o && P - p < h && !y;
  let A = _ ? p : d.activeIndex;
  typeof c > "u" ? c = d.getSlideIndex(f.find((O) => O.classList.contains(g.slideActiveClass))) : A = c;
  const $ = s === "next" || !s, k = s === "prev" || !s;
  let G = 0, V = 0;
  const F = (z ? f[c].column ?? 0 : c) + (y && typeof n > "u" ? (w ? -h / 2 + 0.5 : 0) - C : 0);
  if (F < L) {
    G = Math.max(L - F, E);
    for (let O = 0; O < G; O += 1) {
      const B = O - Math.floor(O / P) * P;
      if (z) {
        const j = P - B - 1;
        for (let J = f.length - 1; J >= 0; J -= 1)
          f[J].column === j && T.push(J);
      } else
        T.push(P - B - 1);
    }
  } else if (F + h > P - L) {
    V = Math.max(F - (P - L * 2), E), _ && (V = Math.max(V, h - P + p + 1)), V = Math.max(V, Math.ceil(F + h - P));
    for (let O = 0; O < V; O += 1) {
      const B = O - Math.floor(O / P) * P;
      z ? f.forEach((j, J) => {
        j.column === B && S.push(J);
      }) : S.push(B);
    }
  }
  if (d.__preventObserver__ = !0, requestAnimationFrame(() => {
    d.__preventObserver__ = !1;
  }), d.params.effect === "cards" && f.length < h + L * 2 && (S.includes(c) && S.splice(S.indexOf(c), 1), T.includes(c) && T.splice(T.indexOf(c), 1)), k && T.forEach((O) => {
    const B = f[O];
    B.swiperLoopMoveDOM = !0, m.prepend(B), B.swiperLoopMoveDOM = !1;
  }), $ && S.forEach((O) => {
    const B = f[O];
    B.swiperLoopMoveDOM = !0, m.append(B), B.swiperLoopMoveDOM = !1;
  }), d.recalcSlides(), g.slidesPerView === "auto" ? d.updateSlides() : z && (T.length > 0 && k || S.length > 0 && $) && d.slides.forEach((O, B) => {
    d.grid.updateSlide(B, O, d.slides);
  }), g.watchSlidesProgress && d.updateSlidesOffset(), i) {
    if (T.length > 0 && k) {
      if (typeof t > "u") {
        const O = d.slidesGrid[A], j = d.slidesGrid[A + G] - O;
        a ? d.setTranslate(d.translate - j) : (d.slideTo(A + Math.ceil(G), 0, !1, !0), n && (d.touchEventsData.startTranslate = d.touchEventsData.startTranslate - j, d.touchEventsData.currentTranslate = d.touchEventsData.currentTranslate - j));
      } else if (n) {
        const O = z ? T.length / g.grid.rows : T.length;
        d.slideTo(d.activeIndex + O, 0, !1, !0), d.touchEventsData.currentTranslate = d.translate;
      }
    } else if (S.length > 0 && $)
      if (typeof t > "u") {
        const O = d.slidesGrid[A], j = d.slidesGrid[A - V] - O;
        a ? d.setTranslate(d.translate - j) : (d.slideTo(A - V, 0, !1, !0), n && (d.touchEventsData.startTranslate = d.touchEventsData.startTranslate - j, d.touchEventsData.currentTranslate = d.touchEventsData.currentTranslate - j));
      } else {
        const O = z ? S.length / g.grid.rows : S.length;
        d.slideTo(d.activeIndex - O, 0, !1, !0);
      }
  }
  d.allowSlidePrev = v, d.allowSlideNext = x;
  const Y = (be = d.controller) == null ? void 0 : be.control;
  if (Y && !l) {
    const O = {
      slideRealIndex: t,
      direction: s,
      setTranslate: n,
      activeSlideIndex: c,
      byController: !0
    };
    Array.isArray(Y) ? Y.forEach((B) => {
      !B.destroyed && B.params.loop && B.loopFix({
        ...O,
        slideTo: B.params.slidesPerView === g.slidesPerView ? i : !1
      });
    }) : Y instanceof d.constructor && Y.params.loop && Y.loopFix({
      ...O,
      slideTo: Y.params.slidesPerView === g.slidesPerView ? i : !1
    });
  }
  d.__loopFixInProgress__ = !1, d.emit("loopFix");
}
var _t = {
  loopCreate: At,
  loopFix: Gt,
  loopDestroy: Dt
};
function Vt(e, t) {
  return function(s = {}) {
    const n = Object.keys(s)[0], r = s[n];
    if (typeof r != "object" || r === null) {
      N(t, s);
      return;
    }
    if (e[n] === !0 && (e[n] = { enabled: !0 }), n === "navigation" && e[n] && e[n].enabled && !e[n].prevEl && !e[n].nextEl && (e[n].auto = !0), ["pagination", "scrollbar"].indexOf(n) >= 0 && e[n] && e[n].enabled && !e[n].el && (e[n].auto = !0), !(n in e && "enabled" in r)) {
      N(t, s);
      return;
    }
    typeof e[n] == "object" && !("enabled" in e[n]) && (e[n].enabled = !0), e[n] || (e[n] = { enabled: !1 }), N(t, s);
  };
}
const Bt = ({ swiper: e, extendParams: t, on: i }) => {
  const s = [], n = (l, a = {}) => {
    const c = window.MutationObserver || window.WebkitMutationObserver;
    if (!c)
      return;
    const d = new c((f) => {
      if (e.__preventObserver__)
        return;
      if (f.length === 1) {
        e.emit("observerUpdate", f[0]);
        return;
      }
      const v = function() {
        e.emit("observerUpdate", f[0]);
      };
      window.requestAnimationFrame ? window.requestAnimationFrame(v) : window.setTimeout(v, 0);
    });
    d.observe(l, {
      attributes: typeof a.attributes > "u" ? !0 : a.attributes,
      childList: e.isElement || (typeof a.childList > "u" ? !0 : a.childList),
      characterData: typeof a.characterData > "u" ? !0 : a.characterData
    }), s.push(d);
  }, r = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const l = Ie(e.hostEl);
        for (let a = 0; a < l.length; a += 1)
          n(l[a]);
      }
      n(e.hostEl, {
        childList: e.params.observeSlideChildren
      }), n(e.wrapperEl, { attributes: !1 });
    }
  }, o = () => {
    s.forEach((l) => {
      l.disconnect();
    }), s.splice(0, s.length);
  };
  t({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), i("init", r), i("destroy", o);
}, $t = ({ swiper: e, on: t, emit: i }) => {
  let s = null, n = null;
  const r = () => {
    !e || e.destroyed || !e.initialized || (i("beforeResize"), i("resize"));
  }, o = () => {
    if (!e || e.destroyed || !e.initialized)
      return;
    let c = e.width, d = e.height;
    s = new ResizeObserver((f) => {
      n = window.requestAnimationFrame(() => {
        let v = c, x = d;
        f.forEach(({ contentBoxSize: m, contentRect: g, target: w }) => {
          if (w && w !== e.el)
            return;
          const b = Array.isArray(m) ? m[0] : m;
          v = g ? g.width : b.inlineSize, x = g ? g.height : b.blockSize;
        }), (v !== c || x !== d) && (c = v, d = x, r());
      });
    }), s.observe(e.el);
  }, l = () => {
    n && window.cancelAnimationFrame(n), s && s.unobserve && e.el && (s.unobserve(e.el), s = null);
  }, a = () => {
    !e || e.destroyed || !e.initialized || i("orientationchange");
  };
  t("init", () => {
    if (e.params.resizeObserver && typeof window.ResizeObserver < "u") {
      o();
      return;
    }
    window.addEventListener("resize", r), window.addEventListener("orientationchange", a);
  }), t("destroy", () => {
    l(), window.removeEventListener("resize", r), window.removeEventListener("orientationchange", a);
  });
};
function Ht(e, t = !0, i) {
  var d;
  const s = this, { enabled: n, params: r, animating: o } = s;
  if (!n || s.destroyed)
    return s;
  typeof e > "u" && (e = s.params.speed);
  let l = r.slidesPerGroup;
  r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (l = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const a = s.activeIndex < r.slidesPerGroupSkip ? 1 : l, c = s.virtual && ((d = r.virtual) == null ? void 0 : d.enabled);
  if (r.loop) {
    if (o && !c && r.loopPreventsSliding)
      return !1;
    if (s.loopFix({ direction: "next" }), s._clientLeft = s.wrapperEl.clientLeft, s.activeIndex === s.slides.length - 1 && r.cssMode)
      return requestAnimationFrame(() => {
        s.slideTo(s.activeIndex + a, e, t, i);
      }), !0;
  }
  return r.rewind && s.isEnd ? s.slideTo(0, e, t, i) : s.slideTo(s.activeIndex + a, e, t, i);
}
function Ft(e, t = !0, i) {
  var u, p;
  const s = this, { params: n, snapGrid: r, slidesGrid: o, rtlTranslate: l, enabled: a, animating: c } = s;
  if (!a || s.destroyed)
    return s;
  typeof e > "u" && (e = s.params.speed);
  const d = s.virtual && ((u = n.virtual) == null ? void 0 : u.enabled);
  if (n.loop) {
    if (c && !d && n.loopPreventsSliding)
      return !1;
    s.loopFix({ direction: "prev" }), s._clientLeft = s.wrapperEl.clientLeft;
  }
  const f = l ? s.translate : -s.translate;
  function v(y) {
    return y < 0 ? -Math.floor(Math.abs(y)) : Math.floor(y);
  }
  const x = v(f), m = r.map((y) => v(y)), g = n.freeMode && n.freeMode.enabled;
  let w = r[m.indexOf(x) - 1];
  if (typeof w > "u" && (n.cssMode || g)) {
    let y;
    r.forEach((h, E) => {
      x >= h && (y = E);
    }), typeof y < "u" && (w = g ? r[y] : r[y > 0 ? y - 1 : y]);
  }
  let b = 0;
  if (typeof w < "u" && (b = o.indexOf(w), b < 0 && (b = s.activeIndex - 1), n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto)) {
    const y = s.slidesPerViewDynamic("previous", !0) - 1;
    b = Math.max(s.activeIndex - Math.max(y, 1), 0);
  }
  if (n.rewind && s.isBeginning) {
    const y = (p = s.params.virtual) != null && p.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(y, e, t, i);
  } else if (n.loop && s.activeIndex === 0 && n.cssMode)
    return requestAnimationFrame(() => {
      s.slideTo(b, e, t, i);
    }), !0;
  return s.slideTo(b, e, t, i);
}
function Nt(e, t = !0, i) {
  const s = this;
  if (!s.destroyed)
    return typeof e > "u" && (e = s.params.speed), s.slideTo(s.activeIndex, e, t, i);
}
function Rt(e = 0, t, i = !0, s, n) {
  var M;
  typeof e == "string" && (e = parseInt(e, 10));
  const r = this;
  let o = e;
  o < 0 && (o = 0);
  const { params: l, snapGrid: a, slidesGrid: c, previousIndex: d, activeIndex: f, rtlTranslate: v, wrapperEl: x, enabled: m } = r;
  if (!m && !s && !n || r.destroyed || r.animating && l.preventInteractionOnTransition)
    return !1;
  typeof t > "u" && (t = r.params.speed);
  const g = Math.min(r.params.slidesPerGroupSkip, o);
  let w = g + Math.floor((o - g) / r.params.slidesPerGroup);
  w >= a.length && (w = a.length - 1);
  const b = -a[w];
  if (l.normalizeSlideIndex)
    for (let I = 0; I < c.length; I += 1) {
      const C = -Math.floor(b * 100), D = Math.floor(c[I] * 100), L = Math.floor(c[I + 1] * 100);
      typeof c[I + 1] < "u" ? C >= D && C < L - (L - D) / 2 ? o = I : C >= D && C < L && (o = I + 1) : C >= D && (o = I);
    }
  if (r.initialized && o !== f && (!r.allowSlideNext && (v ? b > r.translate && b > r.minTranslate() : b < r.translate && b < r.minTranslate()) || !r.allowSlidePrev && b > r.translate && b > r.maxTranslate() && (f || 0) !== o))
    return !1;
  o !== (d || 0) && i && r.emit("beforeSlideChangeStart"), r.updateProgress(b);
  let u;
  o > f ? u = "next" : o < f ? u = "prev" : u = "reset";
  const p = r.virtual && ((M = r.params.virtual) == null ? void 0 : M.enabled);
  if (!(p && n) && (v && -b === r.translate || !v && b === r.translate))
    return r.updateActiveIndex(o), l.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), l.effect !== "slide" && r.setTranslate(b), u !== "reset" && (r.transitionStart(i, u), r.transitionEnd(i, u)), !1;
  if (l.cssMode) {
    _e(r) && r.updateActiveIndex(o);
    const I = r.isHorizontal(), C = v ? b : -b;
    return t === 0 ? (p && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), p && !r._cssModeVirtualInitialSet && (r.params.initialSlide ?? 0) > 0 ? (r._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
      x[I ? "scrollLeft" : "scrollTop"] = C;
    })) : x[I ? "scrollLeft" : "scrollTop"] = C, p && requestAnimationFrame(() => {
      r.wrapperEl.style.scrollSnapType = "", r._immediateVirtual = !1;
    })) : x.scrollTo({
      [I ? "left" : "top"]: C,
      behavior: "smooth"
    }), !0;
  }
  const E = ze().isSafari;
  return p && !n && E && r.isElement && r.virtual.update(!1, !1, o), r.setTransition(t), r.setTranslate(b), r.updateActiveIndex(o), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, u), t === 0 ? r.transitionEnd(i, u) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(C) {
    !r || r.destroyed || C.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, u));
  }), r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)), !0;
}
function jt() {
  const e = this;
  if (e.destroyed)
    return;
  const { params: t, slidesEl: i, clickedSlide: s, clickedIndex: n } = e;
  if (s === void 0 || n === void 0)
    return;
  const r = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
  let o = e.getSlideIndexWhenGrid(n), l;
  const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`, c = e.grid && e.params.grid && e.params.grid.rows > 1;
  if (t.loop) {
    if (e.animating)
      return;
    l = parseInt(s.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? e.slideToLoop(l) : o > (c ? (e.slides.length - r) / 2 - (e.params.grid.rows - 1) : e.slides.length - r) ? (e.loopFix(), o = e.getSlideIndex(W(i, `${a}[data-swiper-slide-index="${l}"]`)[0]), Le(() => {
      e.slideTo(o);
    })) : e.slideTo(o);
  } else
    e.slideTo(o);
}
function qt(e, t = !0, i, s = 0.5) {
  const n = this;
  if (n.destroyed)
    return;
  typeof e > "u" && (e = n.params.speed);
  let r = n.activeIndex;
  const o = Math.min(n.params.slidesPerGroupSkip, r), l = o + Math.floor((r - o) / n.params.slidesPerGroup), a = n.rtlTranslate ? n.translate : -n.translate;
  if (a >= n.snapGrid[l]) {
    const c = n.snapGrid[l], d = n.snapGrid[l + 1];
    a - c > (d - c) * s && (r += n.params.slidesPerGroup);
  } else {
    const c = n.snapGrid[l - 1], d = n.snapGrid[l];
    a - c <= (d - c) * s && (r -= n.params.slidesPerGroup);
  }
  return r = Math.max(r, 0), r = Math.min(r, n.slidesGrid.length - 1), n.slideTo(r, e, t, i);
}
function Wt(e = 0, t, i = !0, s) {
  var l;
  typeof e == "string" && (e = parseInt(e, 10));
  const n = this;
  if (n.destroyed)
    return;
  typeof t > "u" && (t = n.params.speed);
  const r = n.grid && n.params.grid && n.params.grid.rows > 1;
  let o = e;
  if (n.params.loop)
    if (n.virtual && ((l = n.params.virtual) != null && l.enabled))
      o = o + (n.virtual.slidesBefore ?? 0);
    else {
      let a;
      if (r) {
        const w = o * n.params.grid.rows, b = n.slides.find((u) => Number(u.getAttribute("data-swiper-slide-index")) === w);
        a = (b == null ? void 0 : b.column) ?? 0;
      } else
        a = n.getSlideIndexByData(o);
      const c = r ? Math.ceil(n.slides.length / n.params.grid.rows) : n.slides.length, { centeredSlides: d, slidesOffsetBefore: f, slidesOffsetAfter: v } = n.params, x = d || !!f || !!v;
      let m;
      n.params.slidesPerView === "auto" ? m = n.slidesPerViewDynamic() : (m = Math.ceil(parseFloat(String(n.params.slidesPerView))), x && m % 2 === 0 && (m = m + 1));
      let g = c - a < m;
      if (d) {
        const w = Math.floor(m / 2);
        g = a < w || c - 1 - a < w;
      } else x && (g = g || a < Math.ceil(m / 2));
      if (s && x && n.params.slidesPerView !== "auto" && !r && (g = !1), g) {
        const w = x ? a < n.activeIndex ? "prev" : "next" : a - n.activeIndex - 1 < n.params.slidesPerView ? "next" : "prev";
        n.loopFix({
          direction: w,
          slideTo: !0,
          activeSlideIndex: w === "next" ? a + 1 : a - c + 1,
          slideRealIndex: w === "next" ? n.realIndex : void 0
        });
      }
      if (r) {
        const w = o * n.params.grid.rows, b = n.slides.find((u) => Number(u.getAttribute("data-swiper-slide-index")) === w);
        o = (b == null ? void 0 : b.column) ?? 0;
      } else
        o = n.getSlideIndexByData(o);
    }
  return requestAnimationFrame(() => {
    n.slideTo(o, t, i, s);
  }), n;
}
var Yt = {
  slideTo: Rt,
  slideToLoop: Wt,
  slideNext: Ht,
  slidePrev: Ft,
  slideReset: Nt,
  slideToClosest: qt,
  slideToClickedSlide: jt
};
function Xt(e, t) {
  const i = this;
  i.params.cssMode || (i.wrapperEl.style.transitionDuration = `${e}ms`, i.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""), i.emit("setTransition", e, t);
}
function Be({ swiper: e, runCallbacks: t, direction: i, step: s }) {
  const { activeIndex: n, previousIndex: r } = e;
  let o = i;
  o || (n > r ? o = "next" : n < r ? o = "prev" : o = "reset"), e.emit(`transition${s}`), t && o === "reset" ? e.emit(`slideResetTransition${s}`) : t && n !== r && (e.emit(`slideChangeTransition${s}`), o === "next" ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`));
}
function Ut(e = !0, t) {
  const i = this, { params: s } = i;
  i.animating = !1, !s.cssMode && (i.setTransition(0), Be({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
}
function Jt(e = !0, t) {
  const i = this, { params: s } = i;
  s.cssMode || (s.autoHeight && i.updateAutoHeight(), Be({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
}
var Kt = {
  setTransition: Xt,
  transitionStart: Jt,
  transitionEnd: Ut
};
function Zt(e = this.isHorizontal() ? "x" : "y") {
  const t = this, { params: i, rtlTranslate: s, translate: n, wrapperEl: r } = t;
  if (i.virtualTranslate)
    return s ? -n : n;
  if (i.cssMode)
    return n;
  let o = Ke(r, e);
  return o += t.cssOverflowAdjustment(), s && (o = -o), o || 0;
}
function Qt() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function ei() {
  return -this.snapGrid[0];
}
function ti(e, t) {
  const i = this, { rtlTranslate: s, params: n, wrapperEl: r, progress: o } = i;
  let l = 0, a = 0;
  const c = 0;
  i.isHorizontal() ? l = s ? -e : e : a = e, n.roundLengths && (l = Math.floor(l), a = Math.floor(a)), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? l : a, n.cssMode ? r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -l : -a : n.virtualTranslate || (i.isHorizontal() ? l -= i.cssOverflowAdjustment() : a -= i.cssOverflowAdjustment(), r.style.transform = `translate3d(${l}px, ${a}px, ${c}px)`);
  let d;
  const f = i.maxTranslate() - i.minTranslate();
  f === 0 ? d = 0 : d = (e - i.minTranslate()) / f, d !== o && i.updateProgress(e), i.emit("setTranslate", i.translate, t);
}
function ii(e = 0, t = this.params.speed, i = !0, s = !0, n) {
  const r = this, { params: o, wrapperEl: l } = r;
  if (r.animating && o.preventInteractionOnTransition)
    return !1;
  const a = r.minTranslate(), c = r.maxTranslate();
  let d;
  if (s && e > a ? d = a : s && e < c ? d = c : d = e, r.updateProgress(d), o.cssMode) {
    const f = r.isHorizontal();
    return t === 0 ? l[f ? "scrollLeft" : "scrollTop"] = -d : l.scrollTo({
      [f ? "left" : "top"]: -d,
      behavior: "smooth"
    }), !0;
  }
  return t === 0 ? (r.setTransition(0), r.setTranslate(d), i && (r.emit("beforeTransitionStart", t, n), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(d), i && (r.emit("beforeTransitionStart", t, n), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(v) {
    !r || r.destroyed || v.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, r.animating = !1, i && r.emit("transitionEnd"));
  }), r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))), !0;
}
var si = {
  getTranslate: Zt,
  setTranslate: ti,
  minTranslate: ei,
  maxTranslate: Qt,
  translateTo: ii
};
function ni(e) {
  const { slidesGrid: t, params: i } = e, s = e.rtlTranslate ? e.translate : -e.translate;
  let n;
  for (let r = 0; r < t.length; r += 1)
    typeof t[r + 1] < "u" ? s >= t[r] && s < t[r + 1] - (t[r + 1] - t[r]) / 2 ? n = r : s >= t[r] && s < t[r + 1] && (n = r + 1) : s >= t[r] && (n = r);
  return i.normalizeSlideIndex && (n < 0 || typeof n > "u") && (n = 0), n;
}
function ri(e) {
  var x, m;
  const t = this, i = t.rtlTranslate ? t.translate : -t.translate, { snapGrid: s, params: n, activeIndex: r, realIndex: o, snapIndex: l } = t;
  let a = e, c;
  const d = (g) => {
    const w = t.virtual.slides;
    let b = g - (t.virtual.slidesBefore ?? 0);
    return b < 0 && (b = w.length + b), b >= w.length && (b -= w.length), b;
  };
  if (typeof a > "u" && (a = ni(t)), s.indexOf(i) >= 0)
    c = s.indexOf(i);
  else {
    const g = Math.min(n.slidesPerGroupSkip, a);
    c = g + Math.floor((a - g) / n.slidesPerGroup);
  }
  if (c >= s.length && (c = s.length - 1), a === r && !t.params.loop) {
    c !== l && (t.snapIndex = c, t.emit("snapIndexChange"));
    return;
  }
  if (a === r && t.params.loop && t.virtual && ((x = t.params.virtual) != null && x.enabled)) {
    t.realIndex = d(a);
    return;
  }
  const f = t.grid && n.grid && n.grid.rows > 1;
  let v;
  if (t.virtual && ((m = n.virtual) != null && m.enabled))
    n.loop ? v = d(a) : v = a;
  else if (f) {
    const g = t.slides.find((b) => b.column === a);
    let w = parseInt(g.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(w) && (w = Math.max(t.slides.indexOf(g), 0)), v = Math.floor(w / n.grid.rows);
  } else if (t.slides[a]) {
    const g = t.slides[a].getAttribute("data-swiper-slide-index");
    g ? v = parseInt(g, 10) : v = a;
  } else
    v = a;
  Object.assign(t, {
    previousSnapIndex: l,
    snapIndex: c,
    previousRealIndex: o,
    realIndex: v,
    previousIndex: r,
    activeIndex: a
  }), t.initialized && Ae(t), !t.__loopFixInProgress__ && (t.emit("activeIndexChange"), t.emit("snapIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && ((t.__lastEmittedRealIndex__ ?? o) !== v && t.emit("realIndexChange"), t.emit("slideChange")), t.__lastEmittedRealIndex__ = v);
}
function ai(e) {
  var l;
  const t = this, i = [], s = t.virtual && ((l = t.params.virtual) == null ? void 0 : l.enabled);
  let n = 0, r;
  typeof e == "number" ? t.setTransition(e) : e === !0 && t.setTransition(t.params.speed);
  const o = (a) => s ? t.slides[t.getSlideIndexByData(a)] : t.slides[a];
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((a) => {
        i.push(a);
      });
    else
      for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
        const a = t.activeIndex + r;
        if (a > t.slides.length && !s)
          break;
        const c = o(a);
        c && i.push(c);
      }
  else {
    const a = o(t.activeIndex);
    a && i.push(a);
  }
  for (r = 0; r < i.length; r += 1)
    if (typeof i[r] < "u") {
      const a = i[r].offsetHeight;
      n = a > n ? a : n;
    }
  (n || n === 0) && (t.wrapperEl.style.height = `${n}px`);
}
function li(e, t) {
  var l;
  const i = this, s = i.params;
  let n = e.closest(`.${s.slideClass}, swiper-slide`);
  !n && i.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((a) => {
    !n && a.matches && a.matches(`.${s.slideClass}, swiper-slide`) && (n = a);
  });
  let r = !1, o;
  if (n) {
    for (let a = 0; a < i.slides.length; a += 1)
      if (i.slides[a] === n) {
        r = !0, o = a;
        break;
      }
  }
  if (n && r)
    i.clickedSlide = n, i.virtual && ((l = i.params.virtual) != null && l.enabled) ? i.clickedIndex = parseInt(n.getAttribute("data-swiper-slide-index"), 10) : i.clickedIndex = o;
  else {
    i.clickedSlide = void 0, i.clickedIndex = void 0;
    return;
  }
  s.slideToClickedSlide && i.clickedIndex !== void 0 && i.clickedIndex !== i.activeIndex && i.slideToClickedSlide();
}
function oi(e) {
  const t = this;
  if (typeof e > "u") {
    const d = t.rtlTranslate ? -1 : 1;
    e = t && t.translate && t.translate * d || 0;
  }
  const i = t.params, s = t.maxTranslate() - t.minTranslate();
  let { progress: n, isBeginning: r, isEnd: o } = t, l = t.progressLoop;
  const a = r, c = o;
  if (s === 0)
    n = 0, r = !0, o = !0;
  else {
    n = (e - t.minTranslate()) / s;
    const d = Math.abs(e - t.minTranslate()) < 1, f = Math.abs(e - t.maxTranslate()) < 1;
    r = d || n <= 0, o = f || n >= 1, d && (n = 0), f && (n = 1);
  }
  if (i.loop) {
    const d = t.getSlideIndexByData(0), f = t.getSlideIndexByData(t.slides.length - 1), v = t.slidesGrid[d], x = t.slidesGrid[f], m = t.slidesGrid[t.slidesGrid.length - 1], g = Math.abs(e);
    g >= v ? l = (g - v) / m : l = (g + m - x) / m, l > 1 && (l -= 1);
  }
  Object.assign(t, {
    progress: n,
    progressLoop: l,
    isBeginning: r,
    isEnd: o
  }), (i.watchSlidesProgress || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), r && !a && t.emit("reachBeginning toEdge"), o && !c && t.emit("reachEnd toEdge"), (a && !r || c && !o) && t.emit("fromEdge"), t.emit("progress", n);
}
function di() {
  var L, z;
  const e = this;
  function t(T, S) {
    return parseFloat(T.getPropertyValue(e.getDirectionLabel(S)) || "0");
  }
  const i = e.params, { wrapperEl: s, slidesEl: n, rtlTranslate: r, wrongRTL: o } = e, l = !!(e.virtual && ((L = i.virtual) != null && L.enabled)), a = l ? e.virtual.slides.length : e.slides.length, c = W(n, `.${e.params.slideClass}, swiper-slide`), d = l ? e.virtual.slides.length : c.length;
  let f = [];
  const v = [], x = [], m = (T) => typeof T == "function" ? T.call(e) : T, g = m(i.slidesOffsetBefore), w = m(i.slidesOffsetAfter), b = e.snapGrid.length, u = e.slidesGrid.length, p = e.size - g - w;
  let y = i.spaceBetween, h = -g, E = 0, M = 0;
  if (typeof p > "u")
    return;
  typeof y == "string" && y.indexOf("%") >= 0 ? y = parseFloat(y.replace("%", "")) / 100 * p : typeof y == "string" && (y = parseFloat(y)), e.virtualSize = -y - g - w, c.forEach((T) => {
    r ? T.style.marginLeft = "" : T.style.marginRight = "", T.style.marginBottom = "", T.style.marginTop = "";
  }), i.centeredSlides && i.cssMode && (K(s, "--swiper-centered-offset-before", ""), K(s, "--swiper-centered-offset-after", "")), i.cssMode && (K(s, "--swiper-slides-offset-before", `${g}px`), K(s, "--swiper-slides-offset-after", `${w}px`));
  const I = i.grid && i.grid.rows > 1 && e.grid;
  I ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
  let C = 0;
  const D = i.slidesPerView === "auto" && i.breakpoints && Object.keys(i.breakpoints).filter((T) => {
    const S = i.breakpoints[T];
    return typeof (S == null ? void 0 : S.slidesPerView) < "u";
  }).length > 0;
  for (let T = 0; T < d; T += 1) {
    C = 0;
    const S = c[T];
    if (!(S && (I && e.grid.updateSlide(T, S, c), X(S, "display") === "none"))) {
      if (l && i.slidesPerView === "auto")
        (z = i.virtual) != null && z.slidesPerViewAutoSlideSize && (C = i.virtual.slidesPerViewAutoSlideSize), C && S && (i.roundLengths && (C = Math.floor(C)), S.style[e.getDirectionLabel("width")] = `${C}px`);
      else if (i.slidesPerView === "auto") {
        D && (S.style[e.getDirectionLabel("width")] = "");
        const P = getComputedStyle(S), _ = S.style.transform, A = S.style.webkitTransform;
        if (_ && (S.style.transform = "none"), A && (S.style.webkitTransform = "none"), i.roundLengths)
          C = e.isHorizontal() ? pe(S, "width") : pe(S, "height");
        else {
          const $ = t(P, "width"), k = t(P, "padding-left"), G = t(P, "padding-right"), V = t(P, "margin-left"), q = t(P, "margin-right"), F = P.getPropertyValue("box-sizing");
          if (F && F === "border-box")
            C = $ + V + q;
          else {
            const { clientWidth: Y, offsetWidth: ee } = S;
            C = $ + k + G + V + q + (ee - Y);
          }
        }
        _ && (S.style.transform = _), A && (S.style.webkitTransform = A), i.roundLengths && (C = Math.floor(C));
      } else
        C = (p - (i.slidesPerView - 1) * y) / i.slidesPerView, i.roundLengths && (C = Math.floor(C)), S && (S.style[e.getDirectionLabel("width")] = `${C}px`);
      S && (S.swiperSlideSize = C), x.push(C), i.centeredSlides ? (h = h + C / 2 + E / 2 + y, E === 0 && T !== 0 && (h = h - p / 2 - y), T === 0 && (h = h - p / 2 - y), Math.abs(h) < 1 / 1e3 && (h = 0), i.roundLengths && (h = Math.floor(h)), M % i.slidesPerGroup === 0 && f.push(h), v.push(h)) : (i.roundLengths && (h = Math.floor(h)), (M - Math.min(e.params.slidesPerGroupSkip, M)) % e.params.slidesPerGroup === 0 && f.push(h), v.push(h), h = h + C + y), e.virtualSize += C + y, E = C, M += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, p) + w, r && o && (i.effect === "slide" || i.effect === "coverflow") && (s.style.width = `${e.virtualSize + y}px`), i.setWrapperSize && (s.style[e.getDirectionLabel("width")] = `${e.virtualSize + y}px`), I && e.grid.updateWrapperSize(C, f), !i.centeredSlides) {
    const T = i.slidesPerView !== "auto" && i.slidesPerView % 1 !== 0, S = i.snapToSlideEdge && !i.loop && (i.slidesPerView === "auto" || T);
    let P = f.length;
    if (S) {
      let A;
      if (i.slidesPerView === "auto") {
        A = 1;
        let $ = 0;
        for (let k = x.length - 1; k >= 0 && ($ += x[k] + (k < x.length - 1 ? y : 0), $ <= p); k -= 1)
          A = x.length - k;
      } else
        A = Math.floor(i.slidesPerView);
      P = Math.max(d - A, 0);
    }
    const _ = [];
    for (let A = 0; A < f.length; A += 1) {
      let $ = f[A];
      i.roundLengths && ($ = Math.floor($)), S ? A <= P && _.push($) : f[A] <= e.virtualSize - p && _.push($);
    }
    f = _, Math.floor(e.virtualSize - p) - Math.floor(f[f.length - 1]) > 1 && (S || f.push(e.virtualSize - p));
  }
  if (l && i.loop) {
    const T = x[0] + y, S = e.virtual.slidesBefore ?? 0, P = e.virtual.slidesAfter ?? 0, _ = S + P;
    if (i.slidesPerGroup > 1) {
      const A = Math.ceil(_ / i.slidesPerGroup), $ = T * i.slidesPerGroup;
      for (let k = 0; k < A; k += 1)
        f.push(f[f.length - 1] + $);
    }
    for (let A = 0; A < _; A += 1)
      i.slidesPerGroup === 1 && f.push(f[f.length - 1] + T), v.push(v[v.length - 1] + T), e.virtualSize += T;
  }
  if (f.length === 0 && (f = [0]), y !== 0) {
    const T = e.isHorizontal() && r ? "marginLeft" : e.getDirectionLabel("marginRight");
    c.filter((S, P) => !i.cssMode || i.loop ? !0 : P !== c.length - 1).forEach((S) => {
      S.style[T] = `${y}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let T = 0;
    x.forEach((P) => {
      T += P + (y || 0);
    }), T -= y;
    const S = T > p ? T - p : 0;
    f = f.map((P) => P <= 0 ? -g : P > S ? S + w : P);
  }
  if (i.centerInsufficientSlides) {
    let T = 0;
    if (x.forEach((S) => {
      T += S + (y || 0);
    }), T -= y, T < p) {
      const S = (p - T) / 2;
      f.forEach((P, _) => {
        f[_] = P - S;
      }), v.forEach((P, _) => {
        v[_] = P + S;
      });
    }
  }
  if (Object.assign(e, {
    slides: c,
    snapGrid: f,
    slidesGrid: v,
    slidesSizesGrid: x
  }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
    K(s, "--swiper-centered-offset-before", `${-f[0]}px`), K(s, "--swiper-centered-offset-after", `${e.size / 2 - x[x.length - 1] / 2}px`);
    const T = -e.snapGrid[0], S = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map((P) => P + T), e.slidesGrid = e.slidesGrid.map((P) => P + S);
  }
  if (d !== a && e.emit("slidesLengthChange"), f.length !== b && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), v.length !== u && e.emit("slidesGridLengthChange"), i.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !l && !i.cssMode && (i.effect === "slide" || i.effect === "fade")) {
    const T = `${i.containerModifierClass}backface-hidden`, S = e.el.classList.contains(T);
    d <= i.maxBackfaceHiddenSlides ? S || e.el.classList.add(T) : S && e.el.classList.remove(T);
  }
}
const ue = (e, t, i) => {
  t && !e.classList.contains(i) ? e.classList.add(i) : !t && e.classList.contains(i) && e.classList.remove(i);
};
function ci() {
  var f;
  const e = this, { slides: t, params: i, slidesEl: s, activeIndex: n } = e, r = !!(e.virtual && ((f = i.virtual) != null && f.enabled)), o = e.grid && i.grid && i.grid.rows > 1, l = (v) => W(s, `.${i.slideClass}${v}, swiper-slide${v}`)[0];
  let a, c, d;
  if (r)
    if (i.loop) {
      const v = e.virtual.slides;
      let x = n - (e.virtual.slidesBefore ?? 0);
      x < 0 && (x = v.length + x), x >= v.length && (x -= v.length), a = l(`[data-swiper-slide-index="${x}"]`);
    } else
      a = l(`[data-swiper-slide-index="${n}"]`);
  else o ? (a = t.find((v) => v.column === n), d = t.find((v) => v.column === n + 1), c = t.find((v) => v.column === n - 1)) : a = t[n];
  a && (o || (d = st(a, `.${i.slideClass}, swiper-slide`)[0], i.loop && !d && (d = t[0]), c = it(a, `.${i.slideClass}, swiper-slide`)[0], i.loop && !c === 0 && (c = t[t.length - 1]))), t.forEach((v) => {
    ue(v, v === a, i.slideActiveClass), ue(v, v === d, i.slideNextClass), ue(v, v === c, i.slidePrevClass);
  }), e.emitSlidesClasses();
}
function fi() {
  const e = this, t = e.slides, i = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
  for (let s = 0; s < t.length; s += 1)
    t[s].swiperSlideOffset = (e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) - i - e.cssOverflowAdjustment();
}
const Ee = (e, t, i) => {
  t && !e.classList.contains(i) ? e.classList.add(i) : !t && e.classList.contains(i) && e.classList.remove(i);
};
function ui(e = this && this.translate || 0) {
  const t = this, i = t.params, { slides: s, rtlTranslate: n, snapGrid: r } = t;
  if (s.length === 0)
    return;
  typeof s[0].swiperSlideOffset > "u" && t.updateSlidesOffset();
  let o = -e;
  n && (o = e), t.visibleSlidesIndexes = [], t.visibleSlides = [];
  let l = i.spaceBetween;
  typeof l == "string" && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * t.size : typeof l == "string" && (l = parseFloat(l));
  for (let a = 0; a < s.length; a += 1) {
    const c = s[a];
    let d = c.swiperSlideOffset ?? 0;
    i.cssMode && i.centeredSlides && (d -= s[0].swiperSlideOffset ?? 0);
    const f = c.swiperSlideSize ?? 0, v = (o + (i.centeredSlides ? t.minTranslate() : 0) - d) / (f + l), x = (o - r[0] + (i.centeredSlides ? t.minTranslate() : 0) - d) / (f + l), m = -(o - d), g = m + t.slidesSizesGrid[a], w = m >= 0 && m <= t.size - t.slidesSizesGrid[a], b = m >= 0 && m < t.size - 1 || g > 1 && g <= t.size || m <= 0 && g >= t.size;
    b && (t.visibleSlides.push(c), t.visibleSlidesIndexes.push(a)), Ee(c, b, i.slideVisibleClass), Ee(c, w, i.slideFullyVisibleClass), c.progress = n ? -v : v, c.originalProgress = n ? -x : x;
  }
}
var pi = {
  updateSize: xt,
  updateSlides: di,
  updateAutoHeight: ai,
  updateSlidesOffset: fi,
  updateSlidesProgress: ui,
  updateProgress: oi,
  updateSlidesClasses: ci,
  updateActiveIndex: ri,
  updateClickedSlide: li
};
const hi = {
  eventsEmitter: gt,
  update: pi,
  translate: si,
  transition: Kt,
  slide: Yt,
  loop: _t,
  grabCursor: zt,
  events: It,
  breakpoints: dt,
  checkOverflow: ft,
  classes: mt
}, ge = {}, R = class R {
  constructor(...t) {
    let i, s;
    if (t.length === 1 && t[0] !== null && typeof t[0] == "object" && Object.prototype.toString.call(t[0]).slice(8, -1) === "Object" ? s = t[0] : [i, s] = t, s || (s = {}), s = N({}, s), i && !s.el && (s.el = i), s.el && typeof s.el == "string" && typeof document < "u" && document.querySelectorAll(s.el).length > 1) {
      const l = [];
      return document.querySelectorAll(s.el).forEach((a) => {
        const c = N({}, s, { el: a });
        l.push(new R(c));
      }), l;
    }
    const n = this;
    n.__swiper__ = !0, n.support = ke(), n.device = Oe({ userAgent: s.userAgent ?? void 0 }), n.browser = ze(), n.eventsListeners = {}, n.eventsAnyListeners = [], n.modules = [...n.__modules__ || []], s.modules && Array.isArray(s.modules) && s.modules.forEach((l) => {
      const a = l;
      typeof a == "function" && n.modules.indexOf(a) < 0 && n.modules.push(a);
    });
    const r = {};
    n.modules.forEach((l) => {
      l({
        params: s,
        swiper: n,
        extendParams: Vt(s, r),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n)
      });
    });
    const o = N({}, De, r);
    if (n.params = N({}, o, ge, s), n.originalParams = N({}, n.params), n.passedParams = N({}, s), n.params && n.params.on) {
      const l = n.params.on;
      Object.keys(l).forEach((a) => {
        const c = l[a];
        c && n.on(a, c);
      });
    }
    return n.params && n.params.onAny && n.onAny(n.params.onAny), Object.assign(n, {
      enabled: n.params.enabled,
      el: i,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return n.params.direction === "horizontal";
      },
      isVertical() {
        return n.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: !0,
      isEnd: !1,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: n.params.allowSlideNext,
      allowSlidePrev: n.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: n.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: !0,
      // Touches
      allowTouchMove: n.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    }), n.emit("_swiper"), n.params.init && n.init(), n;
  }
  getDirectionLabel(t) {
    return this.isHorizontal() ? t : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[t];
  }
  /**
   * !INTERNAL
   */
  isHorizontal() {
    return this.params.direction === "horizontal";
  }
  isVertical() {
    return this.params.direction === "vertical";
  }
  cssOverflowAdjustment() {
    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
  }
  getSlideIndex(t) {
    const { slidesEl: i, params: s } = this, n = W(i, `.${s.slideClass}, swiper-slide`), r = ae(n[0]);
    return ae(t) - (r ?? 0);
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(this.slides.find((i) => Number(i.getAttribute("data-swiper-slide-index")) === t));
  }
  getSlideIndexWhenGrid(t) {
    return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? t = Math.floor(t / this.params.grid.rows) : this.params.grid.fill === "row" && (t = t % Math.ceil(this.slides.length / this.params.grid.rows))), t;
  }
  recalcSlides() {
    const { slidesEl: t, params: i } = this;
    this.slides = W(t, `.${i.slideClass}, swiper-slide`);
  }
  /**
   * Enable Swiper (if it was disabled)
   */
  enable() {
    this.enabled || (this.enabled = !0, this.params.grabCursor && this.setGrabCursor(), this.emit("enable"));
  }
  /**
   * Disable Swiper (if it was enabled). When Swiper is disabled, it will hide all navigation elements and won't respond to any events and interactions
   */
  disable() {
    this.enabled && (this.enabled = !1, this.params.grabCursor && this.unsetGrabCursor(), this.emit("disable"));
  }
  /**
   * Set Swiper translate progress (from 0 to 1). Where 0 - its initial position (offset) on first slide, and 1 - its maximum position (offset) on last slide
   *
   * @param progress Swiper translate progress (from 0 to 1).
   * @param speed Transition duration (in ms).
   */
  setProgress(t, i) {
    t = Math.min(Math.max(t, 0), 1);
    const s = this.minTranslate(), r = (this.maxTranslate() - s) * t + s;
    this.translateTo(r, typeof i > "u" ? 0 : i), this.updateActiveIndex(), this.updateSlidesClasses();
  }
  emitContainerClasses() {
    if (!this.params._emitClasses || !this.el)
      return;
    const t = this.el.className.split(" ").filter((i) => i.indexOf("swiper") === 0 || i.indexOf(this.params.containerModifierClass) === 0);
    this.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(t) {
    return this.destroyed ? "" : t.className.split(" ").filter((i) => i.indexOf("swiper-slide") === 0 || i.indexOf(this.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    if (!this.params._emitClasses || !this.el)
      return;
    const t = [];
    this.slides.forEach((i) => {
      const s = this.getSlideClasses(i);
      t.push({ slideEl: i, classNames: s }), this.emit("_slideClass", i, s);
    }), this.emit("_slideClasses", t);
  }
  /**
   * Get dynamically calculated amount of slides per view, useful only when slidesPerView set to `auto`
   */
  slidesPerViewDynamic(t = "current", i = !1) {
    const { params: s, slides: n, slidesGrid: r, slidesSizesGrid: o, size: l, activeIndex: a } = this;
    let c = 1;
    if (typeof s.slidesPerView == "number")
      return s.slidesPerView;
    if (!l)
      return c;
    if (s.centeredSlides) {
      let d = n[a] ? Math.ceil(n[a].swiperSlideSize ?? 0) : 0, f = !1;
      for (let v = a + 1; v < n.length; v += 1)
        n[v] && !f && (d += Math.ceil(n[v].swiperSlideSize ?? 0), c += 1, d > l && (f = !0));
      for (let v = a - 1; v >= 0; v -= 1)
        n[v] && !f && (d += n[v].swiperSlideSize ?? 0, c += 1, d > l && (f = !0));
    } else if (t === "current")
      for (let d = a + 1; d < n.length; d += 1)
        (i ? r[d] + o[d] - r[a] < l : r[d] - r[a] < l) && (c += 1);
    else
      for (let d = a - 1; d >= 0; d -= 1)
        r[a] - r[d] < l && (c += 1);
    return c;
  }
  /**
   * You should call it after you add/remove slides
   * manually, or after you hide/show it, or do any
   * custom DOM modifications with Swiper
   * This method also includes subcall of the following
   * methods which you can use separately:
   */
  update() {
    var o, l;
    const t = this;
    if (!t || t.destroyed)
      return;
    const { snapGrid: i, params: s } = t;
    if (s.breakpoints && t.setBreakpoint(), s.lazyPreload && [...t.el.querySelectorAll('[loading="lazy"]')].forEach((a) => {
      a.complete && me(t, a);
    }), t.updateSize(), typeof t.size > "u") {
      t.emit("update");
      return;
    }
    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses();
    function n() {
      const a = t.rtlTranslate ? t.translate * -1 : t.translate, c = Math.min(Math.max(a, t.maxTranslate()), t.minTranslate());
      t.setTranslate(c), t.updateActiveIndex(), t.updateSlidesClasses();
    }
    let r;
    if ((o = s.freeMode) != null && o.enabled && !s.cssMode)
      n(), s.autoHeight && t.updateAutoHeight();
    else {
      if ((s.slidesPerView === "auto" || s.slidesPerView > 1) && t.isEnd && !s.centeredSlides) {
        const a = t.virtual && ((l = s.virtual) != null && l.enabled) ? t.virtual.slides.length : t.slides.length;
        r = t.slideTo(a - 1, 0, !1, !0);
      } else
        r = t.slideTo(t.activeIndex, 0, !1, !0);
      r || n();
    }
    s.watchOverflow && i !== t.snapGrid && t.checkOverflow(), t.emit("update");
  }
  /**
   * Changes slider direction from horizontal to vertical and back.
   *
   * @param direction New direction. If not specified, then will automatically changed to opposite direction
   * @param needUpdate Will call swiper.update(). Default true
   */
  changeDirection(t, i = !0) {
    const s = this, n = s.params.direction;
    return t || (t = n === "horizontal" ? "vertical" : "horizontal"), t === n || t !== "horizontal" && t !== "vertical" || (s.el.classList.remove(`${s.params.containerModifierClass}${n}`), s.el.classList.add(`${s.params.containerModifierClass}${t}`), s.emitContainerClasses(), s.params.direction = t, s.rtlTranslate = t === "horizontal" && s.rtl, s.slides.forEach((r) => {
      t === "vertical" ? r.style.width = "" : r.style.height = "";
    }), s.emit("changeDirection"), i && s.update()), s;
  }
  /**
   * Changes slider language
   *
   * @param direction New direction. Should be `rtl` or `ltr`
   */
  changeLanguageDirection(t) {
    const i = this;
    i.rtl && t === "rtl" || !i.rtl && t === "ltr" || (i.rtl = t === "rtl", i.rtlTranslate = i.params.direction === "horizontal" && i.rtl, i.rtl ? (i.el.classList.add(`${i.params.containerModifierClass}rtl`), i.el.dir = "rtl") : (i.el.classList.remove(`${i.params.containerModifierClass}rtl`), i.el.dir = "ltr"), i.update());
  }
  mount(t) {
    const i = this;
    if (i.mounted)
      return !0;
    if (typeof document > "u")
      return !1;
    const s = t ?? i.params.el;
    let n = null;
    if (typeof s == "string" ? n = document.querySelector(s) : Ze(s) && (n = s), !n)
      return !1;
    n.swiper = i;
    const r = n.parentNode;
    r && r.host && r.host.nodeName === i.params.swiperElementNodeName.toUpperCase() && (i.isElement = !0);
    const o = () => `.${(i.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let a = n && n.shadowRoot ? n.shadowRoot.querySelector(o()) : W(n, o())[0];
    !a && i.params.createElements && (a = re("div", i.params.wrapperClass), n.append(a), W(n, `.${i.params.slideClass}`).forEach((d) => {
      a.append(d);
    }));
    const c = i.isElement ? n.parentNode.host : null;
    return Object.assign(i, {
      el: n,
      wrapperEl: a,
      slidesEl: i.isElement && !c.slideSlots ? c : a,
      hostEl: i.isElement ? c : n,
      mounted: !0,
      // RTL
      rtl: n.dir.toLowerCase() === "rtl" || X(n, "direction") === "rtl",
      rtlTranslate: i.params.direction === "horizontal" && (n.dir.toLowerCase() === "rtl" || X(n, "direction") === "rtl"),
      wrongRTL: X(a, "display") === "-webkit-box"
    }), !0;
  }
  /**
   * Initialize slider
   */
  init(t) {
    var n;
    const i = this;
    if (i.initialized || i.mount(t) === !1)
      return i;
    if (i.emit("beforeInit"), i.params.breakpoints && i.setBreakpoint(), i.addClasses(), i.updateSize(), i.updateSlides(), i.params.watchOverflow && i.checkOverflow(), i.params.grabCursor && i.enabled && i.setGrabCursor(), i.params.loop && i.virtual && ((n = i.params.virtual) != null && n.enabled) ? i.slideTo((i.params.initialSlide ?? 0) + (i.virtual.slidesBefore ?? 0), 0, i.params.runCallbacksOnInit, !1, !0) : i.slideTo(i.params.initialSlide, 0, i.params.runCallbacksOnInit, !1, !0), i.params.loop && i.loopCreate(void 0, !0), i.attachEvents(), i.params.lazyPreload) {
      const r = [
        ...i.el.querySelectorAll('[loading="lazy"]')
      ];
      i.isElement && r.push(...i.hostEl.querySelectorAll('[loading="lazy"]')), r.forEach((o) => {
        o.complete && me(i, o);
      });
    }
    return i.initialized = !0, Ae(i), i.emit("init"), i.emit("afterInit"), i;
  }
  /**
   * Destroy slider instance and detach all events listeners
   *
   * @param deleteInstance Set it to false (by default it is true) to not to delete Swiper instance
   * @param cleanStyles Set it to true (by default it is true) and all custom styles will be removed from slides, wrapper and container.
   * Useful if you need to destroy Swiper and to init again with new options or in different direction
   */
  destroy(t = !0, i = !0) {
    const s = this, { params: n, el: r, wrapperEl: o, slides: l } = s;
    return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), n.loop && s.loopDestroy(), i && (s.removeClasses(), r && typeof r != "string" && r.removeAttribute("style"), o && o.removeAttribute("style"), l && l.length && l.forEach((a) => {
      a.classList.remove(n.slideVisibleClass, n.slideFullyVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass), a.removeAttribute("style"), a.removeAttribute("data-swiper-slide-index");
    })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((a) => {
      s.off(a);
    }), t !== !1 && (s.el && typeof s.el != "string" && (s.el.swiper = null), Ue(s)), s.destroyed = !0), null;
  }
  static extendDefaults(t) {
    N(ge, t);
  }
  static installModule(t) {
    R.prototype.__modules__ || (R.prototype.__modules__ = []);
    const i = R.prototype.__modules__;
    typeof t == "function" && i.indexOf(t) < 0 && i.push(t);
  }
  static use(t) {
    return Array.isArray(t) ? (t.forEach((i) => R.installModule(i)), R) : (R.installModule(t), R);
  }
};
le(R, "extendedDefaults"), le(R, "defaults");
let U = R;
Object.defineProperty(U, "extendedDefaults", {
  get() {
    return ge;
  }
});
Object.defineProperty(U, "defaults", {
  get() {
    return De;
  }
});
const Ce = hi, mi = U.prototype;
Object.keys(Ce).forEach((e) => {
  const t = Ce[e];
  Object.keys(t).forEach((i) => {
    mi[i] = t[i];
  });
});
U.use([$t, Bt]);
function $e(e, t, i, s) {
  const n = i ?? {}, r = t ?? {};
  return e.params.createElements && Object.keys(s).forEach((o) => {
    if (!n[o] && n.auto === !0) {
      let l = W(e.el, `.${s[o]}`)[0];
      l || (l = re("div", s[o]), l.className = s[o], e.el.append(l)), n[o] = l, r[o] = l;
    }
  }), n;
}
const Pe = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0.28 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>', gi = ({ swiper: e, extendParams: t, on: i, emit: s }) => {
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      addIcons: !0,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }), e.navigation = {
    nextEl: null,
    prevEl: null,
    arrowSvg: Pe
  };
  function n() {
    return e.params.navigation;
  }
  function r(m) {
    let g;
    return m && typeof m == "string" && e.isElement && (g = e.el.querySelector(m) || e.hostEl.querySelector(m), g) ? g : (m && (typeof m == "string" && (g = [...document.querySelectorAll(m)]), e.params.uniqueNavElements && typeof m == "string" && g && g.length > 1 && e.el.querySelectorAll(m).length === 1 ? g = e.el.querySelector(m) : g && g.length === 1 && (g = g[0])), m && !g ? m : g);
  }
  function o(m, g) {
    const w = n();
    H(m).forEach((u) => {
      u && (u.classList[g ? "add" : "remove"](...w.disabledClass.split(" ")), u.tagName === "BUTTON" && (u.disabled = g), e.params.watchOverflow && e.enabled && u.classList[e.isLocked ? "add" : "remove"](w.lockClass));
    });
  }
  function l() {
    const { nextEl: m, prevEl: g } = e.navigation;
    if (e.params.loop) {
      o(g, !1), o(m, !1);
      return;
    }
    o(g, e.isBeginning && !e.params.rewind), o(m, e.isEnd && !e.params.rewind);
  }
  function a(m) {
    m.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), s("navigationPrev"));
  }
  function c(m) {
    m.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), s("navigationNext"));
  }
  function d() {
    e.params.navigation = $e(e, e.originalParams.navigation, e.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    });
    const m = n();
    if (!(m.nextEl || m.prevEl))
      return;
    const g = r(m.nextEl), w = r(m.prevEl);
    Object.assign(e.navigation, {
      nextEl: g,
      prevEl: w
    });
    const b = H(g), u = H(w), p = (y, h) => {
      if (y) {
        if (m.addIcons && y.matches(".swiper-button-next,.swiper-button-prev") && !y.querySelector("svg")) {
          const E = document.createElement("div");
          he(E, Pe);
          const M = E.querySelector("svg");
          M && y.appendChild(M), E.remove();
        }
        y.addEventListener("click", h === "next" ? c : a);
      }
      !e.enabled && y && y.classList.add(...m.lockClass.split(" "));
    };
    b.forEach((y) => p(y, "next")), u.forEach((y) => p(y, "prev"));
  }
  function f() {
    const m = n(), { nextEl: g, prevEl: w } = e.navigation, b = H(g), u = H(w), p = (y, h) => {
      y.removeEventListener("click", h === "next" ? c : a), y.classList.remove(...m.disabledClass.split(" "));
    };
    b.forEach((y) => p(y, "next")), u.forEach((y) => p(y, "prev"));
  }
  i("init", () => {
    n().enabled === !1 ? x() : (d(), l());
  }), i("toEdge fromEdge lock unlock", () => {
    l();
  }), i("destroy", () => {
    f();
  }), i("enable disable", () => {
    const m = n(), { nextEl: g, prevEl: w } = e.navigation, b = H(g), u = H(w);
    if (e.enabled) {
      l();
      return;
    }
    [...b, ...u].filter((p) => !!p).forEach((p) => p.classList.add(m.lockClass));
  }), i("click", (m, g) => {
    const w = n(), { nextEl: b, prevEl: u } = e.navigation, p = H(b), y = H(u), h = g.target;
    let E = y.includes(h) || p.includes(h);
    if (e.isElement && !E) {
      const M = g.composedPath ? g.composedPath() : [];
      M.length && (E = M.find((I) => p.includes(I) || y.includes(I)));
    }
    if (w.hideOnClick && !E) {
      if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === h || e.pagination.el.contains(h)))
        return;
      let M;
      p.length ? M = p[0].classList.contains(w.hiddenClass) : y.length && (M = y[0].classList.contains(w.hiddenClass)), s(M === !0 ? "navigationShow" : "navigationHide"), [...p, ...y].filter((I) => !!I).forEach((I) => I.classList.toggle(w.hiddenClass));
    }
  });
  const v = () => {
    const m = n();
    e.el.classList.remove(...m.navigationDisabledClass.split(" ")), d(), l();
  }, x = () => {
    const m = n();
    e.el.classList.add(...m.navigationDisabledClass.split(" ")), f();
  };
  Object.assign(e.navigation, {
    enable: v,
    disable: x,
    update: l,
    init: d,
    destroy: f
  });
};
function Z(e = "") {
  return `.${e.trim().replace(/([.:!+/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, ".")}`;
}
const vi = (e) => {
  var t;
  return !!e.virtual && !!((t = e.params.virtual) != null && t.enabled);
}, yi = (e) => {
  var t;
  return !!((t = e.params.freeMode) != null && t.enabled);
}, Me = (e) => {
  var i;
  if (vi(e))
    return e.virtual.slides.length;
  const t = (i = e.params.grid) == null ? void 0 : i.rows;
  return e.grid && t && t > 1 ? e.slides.length / Math.ceil(t) : e.slides.length;
}, bi = ({ swiper: e, extendParams: t, on: i, emit: s }) => {
  const n = "swiper-pagination";
  t({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (u) => u,
      formatFractionTotal: (u) => u,
      bulletClass: `${n}-bullet`,
      bulletActiveClass: `${n}-bullet-active`,
      modifierClass: `${n}-`,
      currentClass: `${n}-current`,
      totalClass: `${n}-total`,
      hiddenClass: `${n}-hidden`,
      progressbarFillClass: `${n}-progressbar-fill`,
      progressbarOppositeClass: `${n}-progressbar-opposite`,
      clickableClass: `${n}-clickable`,
      lockClass: `${n}-lock`,
      horizontalClass: `${n}-horizontal`,
      verticalClass: `${n}-vertical`,
      paginationDisabledClass: `${n}-disabled`
    }
  }), e.pagination = {
    el: null,
    bullets: []
  };
  let r, o = 0;
  function l() {
    return e.params.pagination;
  }
  function a() {
    return !l().el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0;
  }
  function c(u, p) {
    const { bulletActiveClass: y } = l();
    if (!u)
      return;
    let h = u[`${p === "prev" ? "previous" : "next"}ElementSibling`];
    h && (h.classList.add(`${y}-${p}`), h = h[`${p === "prev" ? "previous" : "next"}ElementSibling`], h && h.classList.add(`${y}-${p}-${p}`));
  }
  function d(u, p, y) {
    if (u = u % y, p = p % y, p === u + 1)
      return "next";
    if (p === u - 1)
      return "previous";
  }
  function f(u) {
    const y = u.target.closest(Z(l().bulletClass));
    if (!y)
      return;
    u.preventDefault();
    const h = (ae(y) ?? 0) * (e.params.slidesPerGroup ?? 1);
    if (e.params.loop) {
      if (e.realIndex === h)
        return;
      const E = d(e.realIndex, h, e.slides.length);
      E === "next" ? e.slideNext() : E === "previous" ? e.slidePrev() : e.slideToLoop(h);
    } else
      e.slideTo(h);
  }
  function v() {
    const u = e.rtl, p = l();
    if (a())
      return;
    const y = H(e.pagination.el);
    let h, E;
    const M = Me(e), I = e.params.loop ? Math.ceil(M / (e.params.slidesPerGroup ?? 1)) : e.snapGrid.length;
    if (e.params.loop ? (E = e.previousRealIndex || 0, h = (e.params.slidesPerGroup ?? 1) > 1 ? Math.floor(e.realIndex / (e.params.slidesPerGroup ?? 1)) : e.realIndex) : typeof e.snapIndex < "u" ? (h = e.snapIndex, E = e.previousSnapIndex) : (E = e.previousIndex || 0, h = e.activeIndex || 0), p.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
      const C = e.pagination.bullets;
      let D = 0, L = 0, z = 0;
      if (p.dynamicBullets) {
        r = pe(C[0], e.isHorizontal() ? "width" : "height");
        const T = e.isHorizontal() ? "width" : "height";
        y.forEach((S) => {
          S.style[T] = `${(r ?? 0) * (p.dynamicMainBullets + 4)}px`;
        }), p.dynamicMainBullets > 1 && E !== void 0 && (o += h - (E || 0), o > p.dynamicMainBullets - 1 ? o = p.dynamicMainBullets - 1 : o < 0 && (o = 0)), D = Math.max(h - o, 0), L = D + (Math.min(C.length, p.dynamicMainBullets) - 1), z = (L + D) / 2;
      }
      if (C.forEach((T) => {
        const S = [
          "",
          "-next",
          "-next-next",
          "-prev",
          "-prev-prev",
          "-main"
        ].map((P) => `${p.bulletActiveClass}${P}`).flatMap((P) => typeof P == "string" && P.includes(" ") ? P.split(" ") : [P]);
        T.classList.remove(...S);
      }), y.length > 1)
        C.forEach((T) => {
          const S = ae(T);
          S === h ? T.classList.add(...p.bulletActiveClass.split(" ")) : e.isElement && T.setAttribute("part", "bullet"), p.dynamicBullets && S !== void 0 && (S >= D && S <= L && T.classList.add(...`${p.bulletActiveClass}-main`.split(" ")), S === D && c(T, "prev"), S === L && c(T, "next"));
        });
      else {
        const T = C[h];
        if (T && T.classList.add(...p.bulletActiveClass.split(" ")), e.isElement && C.forEach((S, P) => {
          S.setAttribute("part", P === h ? "bullet-active" : "bullet");
        }), p.dynamicBullets) {
          const S = C[D], P = C[L];
          for (let _ = D; _ <= L; _ += 1)
            C[_] && C[_].classList.add(...`${p.bulletActiveClass}-main`.split(" "));
          c(S, "prev"), c(P, "next");
        }
      }
      if (p.dynamicBullets) {
        const T = Math.min(C.length, p.dynamicMainBullets + 4), S = ((r ?? 0) * T - (r ?? 0)) / 2 - z * (r ?? 0), P = u ? "right" : "left", _ = e.isHorizontal() ? P : "top";
        C.forEach((A) => {
          A.style[_] = `${S}px`;
        });
      }
    }
    y.forEach((C, D) => {
      if (p.type === "fraction" && (C.querySelectorAll(Z(p.currentClass)).forEach((L) => {
        L.textContent = String(p.formatFractionCurrent(h + 1));
      }), C.querySelectorAll(Z(p.totalClass)).forEach((L) => {
        L.textContent = String(p.formatFractionTotal(I));
      })), p.type === "progressbar") {
        let L;
        p.progressbarOpposite ? L = e.isHorizontal() ? "vertical" : "horizontal" : L = e.isHorizontal() ? "horizontal" : "vertical";
        const z = (h + 1) / I;
        let T = 1, S = 1;
        L === "horizontal" ? T = z : S = z, C.querySelectorAll(Z(p.progressbarFillClass)).forEach((P) => {
          P.style.transform = `translate3d(0,0,0) scaleX(${T}) scaleY(${S})`, P.style.transitionDuration = `${e.params.speed}ms`;
        });
      }
      p.type === "custom" && p.renderCustom ? (he(C, p.renderCustom(e, h + 1, I)), D === 0 && s("paginationRender", C)) : (D === 0 && s("paginationRender", C), s("paginationUpdate", C)), e.params.watchOverflow && e.enabled && C.classList[e.isLocked ? "add" : "remove"](p.lockClass);
    });
  }
  function x() {
    const u = l();
    if (a())
      return;
    const p = Me(e), y = H(e.pagination.el);
    let h = "";
    if (u.type === "bullets") {
      let E = e.params.loop ? Math.ceil(p / (e.params.slidesPerGroup ?? 1)) : e.snapGrid.length;
      e.params.freeMode && yi(e) && E > p && (E = p);
      for (let M = 0; M < E; M += 1)
        u.renderBullet ? h += u.renderBullet.call(e, M, u.bulletClass) : h += `<${u.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${u.bulletClass}"></${u.bulletElement}>`;
    }
    u.type === "fraction" && (u.renderFraction ? h = u.renderFraction.call(e, u.currentClass, u.totalClass) : h = `<span class="${u.currentClass}"></span> / <span class="${u.totalClass}"></span>`), u.type === "progressbar" && (u.renderProgressbar ? h = u.renderProgressbar.call(e, u.progressbarFillClass) : h = `<span class="${u.progressbarFillClass}"></span>`), e.pagination.bullets = [], y.forEach((E) => {
      u.type !== "custom" && he(E, h || ""), u.type === "bullets" && e.pagination.bullets.push(...Array.from(E.querySelectorAll(Z(u.bulletClass))));
    }), u.type !== "custom" && s("paginationRender", y[0]);
  }
  function m() {
    e.params.pagination = $e(e, e.originalParams.pagination, e.params.pagination, { el: "swiper-pagination" });
    const u = l();
    if (!u.el)
      return;
    let p;
    if (typeof u.el == "string" && e.isElement && (p = e.el.querySelector(u.el)), !p && typeof u.el == "string" && (p = [...document.querySelectorAll(u.el)]), p || (p = u.el), !p || Array.isArray(p) && p.length === 0)
      return;
    if (e.params.uniqueNavElements && typeof u.el == "string" && Array.isArray(p) && p.length > 1 && (p = [...e.el.querySelectorAll(u.el)], p.length > 1)) {
      const h = p.find((E) => Ie(E, ".swiper")[0] === e.el);
      h && (p = h);
    }
    Array.isArray(p) && p.length === 1 && (p = p[0]), Object.assign(e.pagination, {
      el: p
    }), H(p).forEach((h) => {
      u.type === "bullets" && u.clickable && h.classList.add(...(u.clickableClass || "").split(" ")), h.classList.add(u.modifierClass + u.type), h.classList.add(e.isHorizontal() ? u.horizontalClass : u.verticalClass), u.type === "bullets" && u.dynamicBullets && (h.classList.add(`${u.modifierClass}${u.type}-dynamic`), o = 0, u.dynamicMainBullets < 1 && (u.dynamicMainBullets = 1)), u.type === "progressbar" && u.progressbarOpposite && h.classList.add(u.progressbarOppositeClass), u.clickable && h.addEventListener("click", f), e.enabled || h.classList.add(u.lockClass);
    });
  }
  function g() {
    const u = l();
    if (a())
      return;
    const p = e.pagination.el;
    p && H(p).forEach((h) => {
      h.classList.remove(u.hiddenClass), h.classList.remove(u.modifierClass + u.type), h.classList.remove(e.isHorizontal() ? u.horizontalClass : u.verticalClass), u.clickable && (h.classList.remove(...(u.clickableClass || "").split(" ")), h.removeEventListener("click", f));
    }), e.pagination.bullets && e.pagination.bullets.forEach((y) => y.classList.remove(...u.bulletActiveClass.split(" ")));
  }
  i("changeDirection", () => {
    if (!e.pagination || !e.pagination.el)
      return;
    const u = l();
    H(e.pagination.el).forEach((y) => {
      y.classList.remove(u.horizontalClass, u.verticalClass), y.classList.add(e.isHorizontal() ? u.horizontalClass : u.verticalClass);
    });
  }), i("init", () => {
    l().enabled === !1 ? b() : (m(), x(), v());
  }), i("activeIndexChange", () => {
    typeof e.snapIndex > "u" && v();
  }), i("snapIndexChange", () => {
    v();
  }), i("snapGridLengthChange", () => {
    x(), v();
  }), i("destroy", () => {
    g();
  }), i("enable disable", () => {
    const { el: u } = e.pagination;
    if (u) {
      const p = l();
      H(u).forEach((h) => h.classList[e.enabled ? "remove" : "add"](p.lockClass));
    }
  }), i("lock unlock", () => {
    v();
  }), i("click", (u, p) => {
    const y = p.target, h = H(e.pagination.el), E = l();
    if (E.el && E.hideOnClick && h && h.length > 0 && !y.classList.contains(E.bulletClass)) {
      if (e.navigation && (e.navigation.nextEl && y === e.navigation.nextEl || e.navigation.prevEl && y === e.navigation.prevEl))
        return;
      const M = h[0].classList.contains(E.hiddenClass);
      s(M === !0 ? "paginationShow" : "paginationHide"), h.forEach((I) => I.classList.toggle(E.hiddenClass));
    }
  });
  const w = () => {
    const u = l();
    e.el.classList.remove(u.paginationDisabledClass);
    const { el: p } = e.pagination;
    p && H(p).forEach((h) => h.classList.remove(u.paginationDisabledClass)), m(), x(), v();
  }, b = () => {
    const u = l();
    e.el.classList.add(u.paginationDisabledClass);
    const { el: p } = e.pagination;
    p && H(p).forEach((h) => h.classList.add(u.paginationDisabledClass)), g();
  };
  Object.assign(e.pagination, {
    enable: w,
    disable: b,
    render: x,
    update: v,
    init: m,
    destroy: g
  });
}, Si = ({ swiper: e, extendParams: t, on: i, emit: s, params: n }) => {
  e.autoplay = {
    running: !1,
    paused: !1,
    timeLeft: 0
  }, t({
    autoplay: {
      enabled: !1,
      delay: 3e3,
      waitForTransition: !0,
      disableOnInteraction: !1,
      stopOnLastSlide: !1,
      reverseDirection: !1,
      pauseOnMouseEnter: !1
    }
  });
  function r() {
    return e.params.autoplay;
  }
  const o = typeof n.autoplay == "object" && n.autoplay && typeof n.autoplay.delay == "number" ? n.autoplay.delay : 3e3;
  let l, a, c = o, d = o, f = 0, v = (/* @__PURE__ */ new Date()).getTime(), x = !1, m = !1, g = !1, w, b = !1, u = !1;
  function p(k) {
    if (!e || e.destroyed || !e.wrapperEl || k.target !== e.wrapperEl)
      return;
    e.wrapperEl.removeEventListener("transitionend", p);
    const G = k.detail;
    u || G && G.bySwiperTouchMove || L();
  }
  const y = () => {
    if (e.destroyed || !e.autoplay.running)
      return;
    e.autoplay.paused ? x = !0 : x && (d = f, x = !1);
    const k = e.autoplay.paused ? f : v + d - (/* @__PURE__ */ new Date()).getTime();
    e.autoplay.timeLeft = k, s("autoplayTimeLeft", k, k / c), a = requestAnimationFrame(() => {
      y();
    });
  }, h = () => {
    var q;
    let k;
    const G = !!((q = e.params.virtual) != null && q.enabled);
    if (e.virtual && G ? k = e.slides.find((F) => F.classList.contains("swiper-slide-active")) : k = e.slides[e.activeIndex], !k)
      return;
    const V = k.getAttribute("data-swiper-autoplay");
    if (V != null)
      return parseInt(V, 10);
  }, E = () => {
    let k = r().delay;
    const G = h();
    return typeof G == "number" && !Number.isNaN(G) && G > 0 && (k = G), k;
  }, M = (k) => {
    if (e.destroyed || !e.autoplay.running)
      return 0;
    a !== void 0 && cancelAnimationFrame(a), y();
    let G = k;
    typeof G > "u" && (G = E(), c = G, d = G), f = G;
    const V = e.params.speed, q = () => {
      if (!e || e.destroyed)
        return;
      const F = r();
      F.reverseDirection ? !e.isBeginning || e.params.loop || e.params.rewind ? (e.slidePrev(V, !0, !0), s("autoplay")) : F.stopOnLastSlide || (e.slideTo(e.slides.length - 1, V, !0, !0), s("autoplay")) : !e.isEnd || e.params.loop || e.params.rewind ? (e.slideNext(V, !0, !0), s("autoplay")) : F.stopOnLastSlide || (e.slideTo(0, V, !0, !0), s("autoplay")), e.params.cssMode && (v = (/* @__PURE__ */ new Date()).getTime(), requestAnimationFrame(() => {
        M();
      }));
    };
    return G > 0 ? (l !== void 0 && clearTimeout(l), l = setTimeout(() => {
      q();
    }, G)) : requestAnimationFrame(() => {
      q();
    }), G;
  }, I = () => e.destroyed ? !1 : (v = (/* @__PURE__ */ new Date()).getTime(), e.autoplay.running = !0, M(), s("autoplayStart"), !0), C = () => e.destroyed ? !1 : (e.autoplay.running = !1, l !== void 0 && clearTimeout(l), a !== void 0 && cancelAnimationFrame(a), s("autoplayStop"), !0), D = (k, G) => {
    if (e.destroyed || !e.autoplay.running)
      return;
    l !== void 0 && clearTimeout(l), k || (b = !0);
    const V = () => {
      s("autoplayPause"), r().waitForTransition ? e.wrapperEl.addEventListener("transitionend", p) : L();
    };
    if (e.autoplay.paused = !0, G) {
      V();
      return;
    }
    f = (f || r().delay) - ((/* @__PURE__ */ new Date()).getTime() - v), !(e.isEnd && f < 0 && !e.params.loop) && (f < 0 && (f = 0), V());
  }, L = () => {
    e.isEnd && f < 0 && !e.params.loop || e.destroyed || !e.autoplay.running || (v = (/* @__PURE__ */ new Date()).getTime(), b ? (b = !1, M(f)) : M(), e.autoplay.paused = !1, s("autoplayResume"));
  }, z = () => {
    e.destroyed || !e.autoplay.running || (document.visibilityState === "hidden" && (b = !0, D(!0)), document.visibilityState === "visible" && L());
  }, T = (k) => {
    k.pointerType === "mouse" && (b = !0, u = !0, !(e.animating || e.autoplay.paused) && D(!0));
  }, S = (k) => {
    k.pointerType === "mouse" && (u = !1, e.autoplay.paused && L());
  }, P = () => {
    r().pauseOnMouseEnter && (e.el.addEventListener("pointerenter", T), e.el.addEventListener("pointerleave", S));
  }, _ = () => {
    e.el && typeof e.el != "string" && (e.el.removeEventListener("pointerenter", T), e.el.removeEventListener("pointerleave", S));
  }, A = () => {
    document.addEventListener("visibilitychange", z);
  }, $ = () => {
    document.removeEventListener("visibilitychange", z);
  };
  i("init", () => {
    r().enabled && (P(), A(), I());
  }), i("destroy", () => {
    _(), $(), e.autoplay.running && C();
  }), i("_freeModeStaticRelease", () => {
    (g || b) && L();
  }), i("_freeModeNoMomentumRelease", () => {
    r().disableOnInteraction ? C() : D(!0, !0);
  }), i("beforeTransitionStart", (k, G, V) => {
    e.destroyed || !e.autoplay.running || (V || !r().disableOnInteraction ? D(!0, !0) : C());
  }), i("sliderFirstMove", () => {
    if (!(e.destroyed || !e.autoplay.running)) {
      if (r().disableOnInteraction) {
        C();
        return;
      }
      m = !0, g = !1, b = !1, w = setTimeout(() => {
        b = !0, g = !0, D(!0);
      }, 200);
    }
  }), i("touchEnd", () => {
    if (!(e.destroyed || !e.autoplay.running || !m)) {
      if (w !== void 0 && clearTimeout(w), l !== void 0 && clearTimeout(l), r().disableOnInteraction) {
        g = !1, m = !1;
        return;
      }
      g && e.params.cssMode && L(), g = !1, m = !1;
    }
  }), i("slideChange", () => {
    e.destroyed || !e.autoplay.running || e.autoplay.paused && (f = E(), c = E());
  }), Object.assign(e.autoplay, {
    start: I,
    stop: C,
    pause: D,
    resume: L
  });
};
var xi = Object.defineProperty, wi = (e, t, i, s) => {
  for (var n = void 0, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = o(t, i, n) || n);
  return n && xi(t, i, n), n;
};
const Ti = `
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="8,5 19,12 8,19" />
  </svg>
`, Ei = `
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
`;
function ve(e) {
  if (!e) return "";
  if (typeof e == "string") return e.trim();
  if (Array.isArray(e))
    return ve(e[0]);
  if (typeof e == "object") {
    const t = e;
    return String(t.url || t.value || t.src || t.path || "").trim();
  }
  return String(e).trim();
}
function Ci(e) {
  if (!e) return null;
  if (typeof e == "object") return e;
  if (typeof e == "string")
    try {
      const t = document.createElement("textarea");
      return t.innerHTML = e, JSON.parse(t.value);
    } catch {
      try {
        return JSON.parse(e);
      } catch {
        return null;
      }
    }
  return null;
}
const ye = class ye extends Ne {
  constructor() {
    super(...arguments), this.swiperInstance = null, this.onSwiperClick = (t) => {
      const s = t.target.closest(".card-aspect");
      if (!s) return;
      const n = s.querySelector("video");
      n && (t.preventDefault(), t.stopPropagation(), n.paused ? n.play().catch((r) => {
        console.warn("Could not play video:", r);
      }) : n.pause());
    }, this.onVideoPlay = (t) => {
      const i = t.target;
      if (!i || i.tagName !== "VIDEO") return;
      const s = i.closest(".card-aspect");
      if (!s) return;
      s.classList.add("is-playing-card");
      const n = s.querySelector(".tactical-play-btn");
      n && (n.classList.add("is-playing"), n.setAttribute("aria-label", "إيقاف الفيديو"));
      const r = s.querySelector(".play-icon");
      r && (r.innerHTML = Ei);
    }, this.onVideoPause = (t) => {
      const i = t.target;
      if (!i || i.tagName !== "VIDEO") return;
      const s = i.closest(".card-aspect");
      if (!s) return;
      s.classList.remove("is-playing-card");
      const n = s.querySelector(".tactical-play-btn");
      n && (n.classList.remove("is-playing"), n.setAttribute("aria-label", "تشغيل الفيديو"));
      const r = s.querySelector(".play-icon");
      r && (r.innerHTML = Ti);
    };
  }
  get cfg() {
    const t = Ci(this.config);
    return t && typeof t == "object" ? t : {};
  }
  get titleText() {
    return this.cfg.badge || this.cfg.title || "";
  }
  get headingText() {
    return this.cfg.heading || "";
  }
  get globalVideoAutoplay() {
    const t = this.cfg.video_autoplay;
    return t === !0 || t === "true" || t === 1 || t === "1";
  }
  get sliderAutoplay() {
    const t = this.cfg.slider_autoplay;
    return t === !0 || t === "true" || t === 1 || t === "1";
  }
  get sliderSpeed() {
    const t = Number(this.cfg.slider_speed);
    return Number.isFinite(t) && t > 0 ? t : 1e3;
  }
  get videosList() {
    const t = this.cfg.videos;
    return Array.isArray(t) ? t.map((i, s) => ({
      id: i.id || `v-${s}`,
      title: i.title || "",
      poster: ve(i.poster),
      video_url: ve(i.video_url),
      autoplay: i.autoplay === !0 || i.autoplay === "true" || i.autoplay === 1
    })) : [];
  }
  isVideoAutoplay(t) {
    return this.globalVideoAutoplay || !!t.autoplay;
  }
  connectedCallback() {
    super.connectedCallback(), this.id || (this.id = "videos");
  }
  firstUpdated() {
    this.initSwiper();
  }
  updated(t) {
    super.updated(t), t.has("config") && this.initSwiper();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.cleanEventListeners(), this.swiperInstance && (this.swiperInstance.destroy(!0, !0), this.swiperInstance = null);
  }
  cleanEventListeners() {
    const t = this.renderRoot.querySelector(".swiper");
    t && (t.removeEventListener("click", this.onSwiperClick), t.removeEventListener("play", this.onVideoPlay, !0), t.removeEventListener("pause", this.onVideoPause, !0), t.removeEventListener("ended", this.onVideoPause, !0));
  }
  initSwiper() {
    this.cleanEventListeners();
    const t = this.renderRoot.querySelector(".swiper");
    if (!t) return;
    t.addEventListener("click", this.onSwiperClick), t.addEventListener("play", this.onVideoPlay, !0), t.addEventListener("pause", this.onVideoPause, !0), t.addEventListener("ended", this.onVideoPause, !0), this.swiperInstance && (this.swiperInstance.destroy(!0, !0), this.swiperInstance = null);
    const i = this.renderRoot.querySelector(".nav-arrow-next"), s = this.renderRoot.querySelector(".nav-arrow-prev"), n = this.renderRoot.querySelector(".swiper-pagination"), r = this.videosList.length > 3;
    this.swiperInstance = new U(t, {
      modules: [gi, bi, Si],
      speed: this.sliderSpeed,
      // 1000ms transition speed
      slidesPerView: 1.1,
      spaceBetween: 16,
      loop: r,
      watchOverflow: !0,
      autoplay: this.sliderAutoplay && r ? {
        delay: Math.max(
          2500,
          Number(this.cfg.autoplay_interval || 5) * 1e3
        ),
        disableOnInteraction: !1,
        pauseOnMouseEnter: !0
      } : !1,
      navigation: i && s ? {
        nextEl: i,
        prevEl: s
      } : !1,
      pagination: n ? {
        el: n,
        clickable: !0
      } : !1,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24
        }
      }
    });
  }
  render() {
    const t = this.cfg, i = t.bg_color || "#ffffff", s = t.text_color || "#111111", n = t.line_color || "#e0e0e0", r = t.frame_stroke || "#D5D5D5", o = t.play_bg || "#0D0D0D", l = t.play_stroke || "#ffffff", a = t.play_icon_color || "#ffffff", c = t.nav_bg || "#0D0D0D", d = t.nav_color || "#ffffff", f = [
      `--sec-bg:${i}`,
      `--sec-text:${s}`,
      `--sec-line:${n}`,
      `--frame-stroke:${r}`,
      `--play-bg:${o}`,
      `--play-stroke:${l}`,
      `--play-icon:${a}`,
      `--nav-bg:${c}`,
      `--nav-color:${d}`
    ].join(";"), v = this.videosList;
    return te`
      <section class="videos-section" id="videos" style="${f}">
        <div class="container">
          <!-- Section Header (Title on left, Heading on right in RTL) -->
          ${We(
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
              ${v.map((x, m) => {
      const g = this.isVideoAutoplay(x);
      return te`
                  <div class="swiper-slide">
                    <div class="card-aspect ${g ? "is-playing-card" : ""}">
                      <!-- Inner Media (clipped to exact tactical polygon) -->
                      <div class="video-media-wrap">
                        <video
                          id="video-el-${m}"
                          class="card-video"
                          src=${x.video_url || ""}
                          poster=${x.poster || ""}
                          playsinline
                          preload="metadata"
                          ?autoplay=${g}
                          ?muted=${g}
                          ?loop=${g}
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
                          id="video-stroke-mask-${m}"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="638"
                          height="463"
                          fill="black"
                        >
                          <rect fill="white" width="638" height="463" />
                          <path
                            d="${xe}"
                            fill="black"
                          />
                        </mask>
                        <path
                          d="${xe}"
                          stroke-width="14"
                          stroke="var(--frame-stroke, #D5D5D5)"
                          mask="url(#video-stroke-mask-${m})"
                        />
                      </svg>

                      <!-- Center Play / Pause Indicator Badge (hidden completely when autoplay is active) -->
                      ${g ? Se : te`
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
                                    d="${Ye}"
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

          <!-- Slider Navigation & Indicators (only if more than 3 videos) -->
          ${v.length > 3 ? te`
                <div class="slider-controls">
                  <!-- Next & Previous Arrows (RTL aware: Right is Prev, Left is Next) -->
                  <div class="slider-arrows">
                    <button
                      class="nav-arrow-btn nav-arrow-prev"
                      aria-label="السابق"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path
                          d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                        />
                      </svg>
                    </button>
                    <button
                      class="nav-arrow-btn nav-arrow-next"
                      aria-label="التالي"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path
                          d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Swiper Pagination Dots -->
                  <div class="swiper-pagination"></div>
                </div>
              ` : Se}
        </div>
      </section>
    `;
  }
};
ye.styles = [
  qe,
  Re`
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
    `
];
let Q = ye;
wi([
  je({ type: Object })
], Q.prototype, "config");
typeof Q < "u" && Q.registerSallaComponent("salla-drone-videos");
export {
  Q as default
};
