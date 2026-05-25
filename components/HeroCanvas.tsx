"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 301;
const LEFT_TEXT_END = 100;
const RIGHT_TEXT_END = 200;
const FRAME_PATH = (n: number) =>
  `/frames/frame_${String(n).padStart(4, "0")}.jpg`;

function fadeOpacity(
  idx: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
) {
  if (idx < fadeInStart) return 0;
  if (idx < fadeInEnd) return (idx - fadeInStart) / (fadeInEnd - fadeInStart);
  if (idx <= fadeOutStart) return 1;
  if (idx < fadeOutEnd) return 1 - (idx - fadeOutStart) / (fadeOutEnd - fadeOutStart);
  return 0;
}

export default function HeroCanvas() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const currentIdxRef  = useRef(0);
  const progressRef  = useRef(0);
  const canvasSizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // ── Resize canvas once; reuse dimensions for drawing ──────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w   = canvas.clientWidth;
    const h   = canvas.clientHeight;
    if (
      canvas.width  !== Math.round(w * dpr) ||
      canvas.height !== Math.round(h * dpr)
    ) {
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    canvasSizeRef.current = { w, h, dpr };
  }, []);

  // ── Draw a frame with Ken Burns ────────────────────────────────────────────
  const drawFrame = useCallback((img: HTMLImageElement, progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !img?.complete || !img.naturalWidth) return;
    const { w: cw, h: ch, dpr } = canvasSizeRef.current;
    if (!cw || !ch) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, cw, ch);

    // Gentle Ken Burns: 1.0 → 1.10 zoom + subtle drift
    const zoom = 1 + progress * 0.10;
    const panX = Math.sin(progress * Math.PI * 0.5) * 20;
    const panY = progress * 14;

    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw: number, dh: number;
    if (ir > cr) { dh = ch * zoom; dw = dh * ir; }
    else          { dw = cw * zoom; dh = dw / ir; }

    const dx = (cw - dw) / 2 + panX;
    const dy = (ch - dh) / 2 + panY;
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // ── Preload: keyframes first, then sequential ──────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    const onLoad = (i: number) => {
      loaded++;
      setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      if (loaded === 1) {
        resizeCanvas();
        drawFrame(images[0], 0);
      }
      if (loaded === TOTAL_FRAMES) {
        framesRef.current = images;
        setReady(true);
      }
    };

    const load = (i: number) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = FRAME_PATH(i + 1);
      img.onload  = () => onLoad(i);
      img.onerror = () => onLoad(i);
      images[i] = img;
    };

    // Spread keyframes, then fill start/end, then rest
    const order: number[] = [];
    const step = Math.max(1, Math.floor(TOTAL_FRAMES / 20));
    for (let i = 0; i < TOTAL_FRAMES; i += step) order.push(i);
    for (let i = 0; i < 20 && !order.includes(i); i++) order.push(i);
    for (let i = TOTAL_FRAMES - 20; i < TOTAL_FRAMES; i++) if (!order.includes(i)) order.push(i);
    for (let i = 0; i < TOTAL_FRAMES; i++) if (!order.includes(i)) order.push(i);
    order.forEach(load);
  }, [drawFrame, resizeCanvas]);

  // ── Scroll animation ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    if (!section) return;

    resizeCanvas();
    drawFrame(framesRef.current[0], 0);

    // ── Text overlay update (frame-driven, not tween-driven) ──────────────
    const updateText = (idx: number) => {
      const leftOp  = idx >= LEFT_TEXT_END  ? 0 : idx < 86  ? 1 : 1 - (idx - 86)  / (LEFT_TEXT_END  - 86);
      const rightOp = fadeOpacity(idx, 92, 106, 186, RIGHT_TEXT_END);
      const metaOp  = idx >= RIGHT_TEXT_END ? 0 : idx < 186 ? 1 : 1 - (idx - 186) / (RIGHT_TEXT_END - 186);

      const leftEl  = section.querySelector<HTMLElement>(".hc-panel-left-intro");
      const rightEl = section.querySelector<HTMLElement>(".hc-panel-right-intro");
      const metaEls = section.querySelectorAll<HTMLElement>(".hc-hero-text-meta");

      if (leftEl) {
        leftEl.style.opacity    = String(leftOp);
        leftEl.style.visibility = leftOp > 0.01 ? "visible" : "hidden";
        leftEl.style.transform  = `translateY(-50%) translateX(${-28 * (1 - leftOp)}px) translateY(${12 * (1 - leftOp)}px)`;
        leftEl.style.filter     = `blur(${(1 - leftOp) * 5}px)`;
      }
      if (rightEl) {
        rightEl.style.opacity    = String(rightOp);
        rightEl.style.visibility = rightOp > 0.01 ? "visible" : "hidden";
        rightEl.style.transform  = `translateY(-50%) translateX(${28 * (1 - rightOp)}px) translateY(${12 * (1 - rightOp)}px)`;
        rightEl.style.filter     = `blur(${(1 - rightOp) * 5}px)`;
      }
      metaEls.forEach((el) => {
        el.style.opacity    = String(metaOp);
        el.style.visibility = metaOp > 0.01 ? "visible" : "hidden";
        el.style.transform  = `translateY(${8 * (1 - metaOp)}px)`;
      });
    };

    const updateHUD = (idx: number, p: number) => {
      const counter = section.querySelector<HTMLElement>(".hc-frame-counter");
      const pctEl   = section.querySelector<HTMLElement>(".hc-scroll-pct");
      if (counter) counter.textContent = String(idx + 1).padStart(3, "0");
      if (pctEl)   pctEl.textContent   = `${Math.round(p * 100)}%`;
    };

    // Progress bar
    const progressFill = section.querySelector<HTMLElement>(".hc-progress-fill");
    const hint         = section.querySelector<HTMLElement>(".hc-hint");

    // ── Initial states ─────────────────────────────────────────────────────
    if (progressFill) progressFill.style.transform = "scaleX(0)";
    if (hint)         { hint.style.opacity = "0"; hint.style.transform = "translateX(-50%) translateY(10px)"; }

    // ── Corner brackets entrance ───────────────────────────────────────────
    const brackets = section.querySelectorAll<HTMLElement>(".hc-corner-bracket");
    brackets.forEach((b) => { b.style.opacity = "0"; b.style.transform = "scale(0.85)"; });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(Array.from(brackets), {
      opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.07,
    });
    tl.to(hint, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");

    // Init left panel visible
    updateText(0);

    // ── Scrubbed ScrollTrigger ─────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=350%",
      pin: true,
      pinSpacing: true,
      scrub: 1.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        progressRef.current = p;

        // Map progress → frame (segmented pacing)
        let rawIdx: number;
        if (p < 0.34)      rawIdx = (p / 0.34) * (LEFT_TEXT_END - 1);
        else if (p < 0.68) rawIdx = LEFT_TEXT_END + ((p - 0.34) / 0.34) * (RIGHT_TEXT_END - LEFT_TEXT_END - 1);
        else               rawIdx = RIGHT_TEXT_END + ((p - 0.68) / 0.32) * (TOTAL_FRAMES - 1 - RIGHT_TEXT_END);

        const idx = Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, rawIdx)));
        currentIdxRef.current = idx;

        const frame = framesRef.current[idx];
        if (frame?.complete && frame.naturalWidth) drawFrame(frame, p);

        updateText(idx);
        updateHUD(idx, p);

        // Progress bar
        if (progressFill) progressFill.style.transform = `scaleX(${p})`;

        // Fade hint out early
        if (hint) hint.style.opacity = String(Math.max(0, 1 - p * 20));

        // Fade corner brackets out at scroll start
        brackets.forEach((b) => {
          const op = Math.max(0, 1 - p * 12);
          b.style.opacity = String(op);
        });
      },
    });

    // ── Resize handler ─────────────────────────────────────────────────────
    const onResize = () => {
      resizeCanvas();
      const frame = framesRef.current[currentIdxRef.current];
      if (frame) drawFrame(frame, progressRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      st.kill();
      tl.kill();
    };
  }, [ready, drawFrame, resizeCanvas]);

  return (
    <div ref={sectionRef} className="hc-root">
      <style>{`
        .hc-root {
          position: relative;
          height: 100vh;
          overflow: hidden;
          background: #030303;
        }
        .hc-canvas-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hc-canvas-wrap canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .hc-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 80% 70% at 50% 48%, transparent 0%, rgba(3,3,3,0.4) 100%),
            linear-gradient(to bottom, rgba(3,3,3,0.12) 0%, transparent 10%, transparent 76%, rgba(3,3,3,0.95) 100%),
            linear-gradient(to right, rgba(3,3,3,0.3) 0%, transparent 18%, transparent 82%, rgba(3,3,3,0.3) 100%);
        }
        .hc-corner-bracket {
          position: absolute;
          width: 64px;
          height: 64px;
          z-index: 8;
          pointer-events: none;
          will-change: opacity, transform;
        }
        .hc-corner-tl { top: 28px; left: 28px; }
        .hc-corner-tr { top: 28px; right: 28px; }
        .hc-corner-bl { bottom: 20px; left: 28px; }
        .hc-corner-br { bottom: 20px; right: 28px; }

        .hc-corner-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          position: absolute;
          white-space: nowrap;
          z-index: 8;
          pointer-events: none;
          will-change: opacity, transform;
          transition: none;
        }
        .hc-corner-label-tl { top: 96px;  left: 36px; }
        .hc-corner-label-tr { top: 96px;  right: 36px; text-align: right; }
        .hc-corner-label-bl { bottom: 76px; left: 36px; }
        .hc-corner-label-br { bottom: 76px; right: 36px; text-align: right; }
        .hc-corner-label .val { font-size: 0.8rem; color: rgba(255,255,255,0.65); display: block; margin-top: 2px; }
        .hc-corner-label .accent { color: #E8000D; }

        .hc-hud {
          position: absolute;
          top: 96px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 18px;
          border-radius: 100px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.38);
          text-transform: uppercase;
          pointer-events: none;
          will-change: opacity, transform;
        }
        .hc-hud-sep { color: rgba(232,0,13,0.55); }
        .hc-frame-counter { color: rgba(255,255,255,0.8); min-width: 3ch; }

        .hc-progress-track {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          z-index: 10;
          background: rgba(255,255,255,0.05);
          overflow: hidden;
        }
        .hc-progress-fill {
          height: 100%;
          width: 100%;
          transform-origin: left;
          transform: scaleX(0);
          background: linear-gradient(90deg, #E8000D 0%, #ff4d55 60%, rgba(255,255,255,0.5) 100%);
          box-shadow: 0 0 12px rgba(232,0,13,0.45);
          will-change: transform;
        }

        .hc-ticker {
          position: absolute;
          bottom: 22px; left: 0; right: 0;
          z-index: 7;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          font-family: 'Space Mono', monospace;
          font-size: 0.56rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          pointer-events: none;
          will-change: opacity, transform;
        }
        .hc-ticker .sep { color: rgba(232,0,13,0.5); }

        .hc-intro-overlay {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
        }
        .hc-panel-wrap {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 8px;
          will-change: opacity, transform, filter;
          transition: none;
        }
        .hc-panel-left-intro  { left: 5vw;  align-items: flex-start; text-align: left; }
        .hc-panel-right-intro { right: 5vw; align-items: flex-end;   text-align: right; }

        .hc-panel-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          color: #E8000D;
          text-transform: uppercase;
        }
        .hc-panel-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          letter-spacing: 0.05em;
          color: #fff;
          text-transform: uppercase;
          line-height: 0.92;
          text-shadow: 0 4px 32px rgba(0,0,0,0.85);
        }
        .hc-panel-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, #E8000D, transparent);
          margin: 4px 0 10px;
        }
        .hc-panel-right-intro .hc-panel-rule {
          background: linear-gradient(270deg, #E8000D, transparent);
        }
        .hc-panel-desc {
          font-family: 'Space Mono', monospace;
          font-size: clamp(0.52rem, 0.85vw, 0.68rem);
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.48);
          line-height: 1.9;
          text-transform: uppercase;
          max-width: 300px;
        }
        .hc-panel-stat {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.07);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.06em;
        }
        .hc-panel-stat span { color: #E8000D; }

        .hc-hint {
          position: absolute;
          bottom: 52px; left: 50%;
          transform: translateX(-50%) translateY(10px);
          z-index: 9;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.26);
          font-family: 'Space Mono', monospace;
          font-size: 0.54rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          pointer-events: none;
          will-change: opacity, transform;
        }
        .hc-hint-line {
          width: 1px; height: 38px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.32), transparent);
          animation: scrollLineAnim 1.8s ease-in-out infinite;
        }

        .hc-loader {
          position: absolute;
          inset: 0;
          z-index: 20;
          background: #030303;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
        }
        .hc-loader-bar {
          width: 240px; height: 1px;
          background: rgba(255,255,255,0.05);
          overflow: hidden;
        }
        .hc-loader-fill {
          height: 100%;
          background: linear-gradient(90deg, #E8000D, #ff4d55);
          box-shadow: 0 0 12px rgba(232,0,13,0.6);
          transition: width 0.1s linear;
        }
        .hc-loader-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          /* Hide heavy desktop-only overlays */
          .hc-corner-label, .hc-hud { display: none; }

          /* Smaller corner brackets */
          .hc-corner-bracket { width: 40px; height: 40px; }
          .hc-corner-tl { top: 16px; left: 16px; }
          .hc-corner-tr { top: 16px; right: 16px; }
          .hc-corner-bl { bottom: 12px; left: 16px; }
          .hc-corner-br { bottom: 12px; right: 16px; }

          /* Panels: constrain width so left & right never overlap */
          .hc-panel-wrap { gap: 4px; }
          .hc-panel-left-intro  { left: 4vw;  max-width: 44vw; }
          .hc-panel-right-intro { right: 4vw; max-width: 44vw; }

          .hc-panel-tag   { font-size: 0.42rem; letter-spacing: 0.16em; }
          .hc-panel-title { font-size: 1.45rem; }
          .hc-panel-rule  { margin: 2px 0 5px; }
          .hc-panel-desc  { max-width: none; font-size: 0.43rem; line-height: 1.65; }
          .hc-panel-stat  { font-size: 1.05rem; margin-top: 7px; padding-top: 7px; }

          /* Ticker */
          .hc-ticker { gap: 8px; font-size: 0.4rem; flex-wrap: wrap; padding: 0 12px; bottom: 14px; }

          /* Scroll hint */
          .hc-hint { bottom: 40px; font-size: 0.43rem; gap: 6px; }
          .hc-hint-line { height: 26px; }
        }

        @media (max-width: 480px) {
          .hc-panel-left-intro  { left: 3vw;  max-width: 46vw; }
          .hc-panel-right-intro { right: 3vw; max-width: 46vw; }
          .hc-panel-title { font-size: 1.25rem; }
          .hc-panel-desc  { font-size: 0.4rem; }
          .hc-ticker { font-size: 0.38rem; gap: 6px; }
        }
      `}</style>

      <div className="hc-canvas-wrap">
        <canvas ref={canvasRef} />
      </div>

      <div className="hc-vignette" />

      {/* Progress */}
      <div className="hc-progress-track">
        <div className="hc-progress-fill" />
      </div>

      {/* Corner brackets */}
      <div className="hc-corner-bracket hc-corner-tl">
        <svg viewBox="0 0 64 64" fill="none"><path d="M2 22 L2 2 L22 2" stroke="#E8000D" strokeWidth="2" strokeLinecap="round"/><circle cx="2" cy="2" r="2" fill="#E8000D"/></svg>
      </div>
      <div className="hc-corner-bracket hc-corner-tr">
        <svg viewBox="0 0 64 64" fill="none"><path d="M62 22 L62 2 L42 2" stroke="#E8000D" strokeWidth="2" strokeLinecap="round"/><circle cx="62" cy="2" r="2" fill="#E8000D"/></svg>
      </div>
      <div className="hc-corner-bracket hc-corner-bl">
        <svg viewBox="0 0 64 64" fill="none"><path d="M2 42 L2 62 L22 62" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
      <div className="hc-corner-bracket hc-corner-br">
        <svg viewBox="0 0 64 64" fill="none"><path d="M62 42 L62 62 L42 62" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>

      {/* Corner labels */}
      <div className="hc-hero-text-meta hc-corner-label hc-corner-label-tl">
        <span>Unit Status</span>
        <span className="val"><span className="accent">●</span> Active</span>
      </div>
      <div className="hc-hero-text-meta hc-corner-label hc-corner-label-tr">
        <span>Dispatch</span>
        <span className="val">24/7 Ops</span>
      </div>
      <div className="hc-hero-text-meta hc-corner-label hc-corner-label-bl">
        <span>Fleet</span>
        <span className="val">Full Fleet</span>
      </div>
      <div className="hc-hero-text-meta hc-corner-label hc-corner-label-br">
        <span>Coverage</span>
        <span className="val">Nationwide</span>
      </div>

      {/* HUD */}
      <div className="hc-hud hc-hero-text-meta">
        <span>SEQ</span>
        <span className="hc-hud-sep">/</span>
        <span className="hc-frame-counter">001</span>
        <span className="hc-hud-sep">·</span>
        <span className="hc-scroll-pct">0%</span>
      </div>

      {/* Ticker */}
      <div className="hc-hero-text-meta hc-ticker">
        <span>Fleet Active</span><span className="sep">◆</span>
        <span>11K+ Shipments</span><span className="sep">◆</span>
        <span>10M+ Miles</span><span className="sep">◆</span>
        <span>5+ Years</span>
      </div>

      {/* Text overlays */}
      <div className="hc-intro-overlay">
        <div className="hc-panel-wrap hc-panel-left-intro">
          <div className="hc-panel-tag">[ Fleet Deployment ]</div>
          <h2 className="hc-panel-title">Secured<br />Cargo</h2>
          <div className="hc-panel-rule" />
          <p className="hc-panel-desc">Mil-spec seal protocols with advanced cargo shielding and full coverage on every run.</p>
          <div className="hc-panel-stat">Coverage <span>100%</span></div>
        </div>
        <div className="hc-panel-wrap hc-panel-right-intro">
          <div className="hc-panel-tag">[ Satellite Comms ]</div>
          <h2 className="hc-panel-title">Live<br />Telematics</h2>
          <div className="hc-panel-rule" />
          <p className="hc-panel-desc">Two-way GPS comms providing millisecond-accurate coordinates and engine telemetry.</p>
          <div className="hc-panel-stat">Uptime <span>24/7</span></div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hc-hint">
        <span>Scroll to explore</span>
        <div className="hc-hint-line" />
      </div>

      {/* Loader */}
      {!ready && (
        <div className="hc-loader">
          <Image src="/1313Asset.png" alt="Phantom Logistics" width={260} height={54} priority
            style={{ objectFit: "contain", width: "auto", maxWidth: 200, height: "auto",
                     filter: "brightness(0) invert(1)", opacity: 0.8 }} />
          <div className="hc-loader-bar">
            <div className="hc-loader-fill" style={{ width: `${loadProgress}%` }} />
          </div>
          <p className="hc-loader-text">Loading · {loadProgress}%</p>
        </div>
      )}
    </div>
  );
}
