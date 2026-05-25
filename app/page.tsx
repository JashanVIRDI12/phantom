"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ShieldCheck, Globe, PackageOpen } from "lucide-react";
import HeroCanvas from "@/components/HeroCanvas";
import "./home-glass.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Stat counters ──────────────────────────────────────────────────────
    const statEls = document.querySelectorAll<HTMLElement>(".stat-counter");
    statEls.forEach((el) => {
      const target = parseFloat(el.dataset.target ?? "0");
      const suffix = el.dataset.suffix ?? "";
      const prefix = el.dataset.prefix ?? "";
      const isFloat = el.dataset.float === "true";
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
        onUpdate() {
          el.textContent = prefix + (isFloat ? obj.val.toFixed(1) : Math.round(obj.val).toString()) + suffix;
        },
      });
    });

    // ── Clip-path reveal for feature cards ────────────────────────────────
    gsap.set(".feat-card", { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 });
    ScrollTrigger.batch(".feat-card", {
      onEnter: (elements) => {
        gsap.to(elements, {
          clipPath: "inset(0 0% 0 0)",
          autoAlpha: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.18,
          overwrite: true,
        });
      },
      start: "top 80%",
      once: true,
    });

    // ── Standard reveal for generic elements ──────────────────────────────
    gsap.set(".gsap-reveal", { autoAlpha: 0, y: 55 });
    ScrollTrigger.batch(".gsap-reveal", {
      onEnter: (elements) => {
        gsap.to(elements, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          overwrite: true,
        });
      },
      start: "top 85%",
      once: true,
    });

    // ── Section headline split-word reveal ────────────────────────────────
    document.querySelectorAll<HTMLElement>(".split-reveal").forEach((el) => {
      const words = el.innerHTML.split(" ").map(
        (w) => `<span class="split-word" style="display:inline-block;overflow:hidden;"><span class="split-inner" style="display:inline-block;transform:translateY(110%);opacity:0;">${w}</span></span>`
      );
      el.innerHTML = words.join(" ");
      gsap.to(el.querySelectorAll(".split-inner"), {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    });

    // ── CTA panel parallax ────────────────────────────────────────────────
    gsap.utils.toArray(".glass-parallax").forEach((el: any) => {
      gsap.to(el, {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    // ── Marquee fade-in ───────────────────────────────────────────────────
    gsap.set(".marquee-glass", { autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: ".marquee-glass",
      start: "top 90%",
      once: true,
      onEnter: () => gsap.to(".marquee-glass", { autoAlpha: 1, duration: 0.8, ease: "power2.out" }),
    });
  }, { scope: container });

  // ── Mouse tracking for glass card glow ────────────────────────────────────
  useEffect(() => {
    const cards = document.querySelectorAll(".glass-card");
    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        (card as HTMLElement).style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={container} className="home-glass-wrapper">

      {/* ─── IMAGE-SEQUENCE SCROLL HERO ─── */}
      <HeroCanvas />

      {/* ─── STATS ─── */}
      <section className="stats-section" style={{ padding: "80px 5vw 0", maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className="glass-panel stats-panel grid-4" style={{ width: "100%" }}>
          {[
            { target: 5,   suffix: "+",  label: "Years Relentless",  detail: "In Business" },
            { target: 11,  suffix: "K+", label: "Total Shipments",   detail: "Delivered" },
            { target: 10,  suffix: "M+", label: "Miles Driven",      detail: "Nationwide" },
            { target: 24,  suffix: "/7", label: "Tactical Dispatch",  detail: "Always Live" },
          ].map((s, i) => (
            <div key={i} className="glass-stat">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <p
                  className="display text-gradient-red stat-counter"
                  style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: "1", marginBottom: "0" }}
                  data-target={s.target}
                  data-suffix={s.suffix}
                >
                  0{s.suffix}
                </p>
                <p className="mono font-bold" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}>{s.label}</p>
                <p style={{ fontFamily: "Space Mono, monospace", fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SCROLLING MARQUEE ─── */}
      <div className="marquee-glass" style={{ marginTop: "80px" }}>
        <div className="marquee-glass-inner">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div className="marquee-glass-item">SEAMLESS DELIVERIES</div>
              <div className="marquee-glass-dot" />
              <div className="marquee-glass-item"><span className="outline">REAL-TIME TRACKING</span></div>
              <div className="marquee-glass-dot" />
              <div className="marquee-glass-item">DIVERSE FLEET</div>
              <div className="marquee-glass-dot" />
              <div className="marquee-glass-item"><span className="outline">CARGO PROTECTION</span></div>
              <div className="marquee-glass-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <section className="glass-section features-section" style={{ padding: "160px 5vw", position: "relative", maxWidth: "1400px", margin: "0 auto" }}>

        {/* Section header */}
        <div className="gsap-reveal features-intro" style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 100px", visibility: "hidden" }}>
          <div className="glass-badge" style={{ margin: "0 auto 28px" }}>
            <div className="glass-badge-dot" /> CAPABILITIES
          </div>
          <h2 className="display" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: "0.95" }}>
            BUILT FOR EVERY DISTANCE.<br />TRUSTED FOR EVERY <span className="text-gradient-red">LOAD.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "28px", lineHeight: "1.9", fontFamily: "Space Mono, monospace", fontSize: "0.8rem", letterSpacing: "0.06em", maxWidth: "600px", margin: "28px auto 0" }}>
            From local routes to cross-country freight — we maintain the same relentless standard of precision across every shipment, every mile.
          </p>
        </div>

        {/* Feature cards */}
        <div className="glass-grid-3">
          {[
            {
              icon: PackageOpen,
              tag: "01 — Fleet",
              title: "DIVERSE FLEET",
              desc: "A flexible fleet engineered to handle every freight type. We match the right vehicle to your shipment so every delivery moves with zero friction.",
              stat: "Fleet Ready",
              num: "100%",
            },
            {
              icon: Globe,
              tag: "02 — Routing",
              title: "SMART ROUTING",
              desc: "Every route is planned and executed with efficiency. Real-time tracking and adaptive routing reduce delays and keep shipments moving without disruption.",
              stat: "On-Time Rate",
              num: "99.2%",
            },
            {
              icon: ShieldCheck,
              tag: "03 — Security",
              title: "CARGO PROTECTION",
              desc: "Strict safety protocols at every stage. Secure movement, careful handling, and complete accountability from pickup to final delivery.",
              stat: "Coverage",
              num: "Full",
            },
          ].map((f, i) => (
            <div key={i} className="glass-card feat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                <div className="glass-icon-wrap">
                  <f.icon style={{ width: 28, height: 28 }} />
                </div>
                <span style={{
                  fontFamily: "Space Mono, monospace", fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase",
                }}>{f.tag}</span>
              </div>
              <h3 className="display" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", marginBottom: "16px", lineHeight: "0.95" }}>{f.title}</h3>
              <div style={{ width: "40px", height: "1px", background: "#E8000D", marginBottom: "20px" }} />
              <p style={{
                fontFamily: "Space Mono, monospace", fontSize: "0.75rem",
                color: "rgba(255,255,255,0.55)", lineHeight: "1.9", letterSpacing: "0.04em",
              }}>{f.desc}</p>
              <div style={{
                marginTop: "28px", paddingTop: "20px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{f.stat}</span>
                <span className="display text-gradient-red" style={{ fontSize: "1.6rem" }}>{f.num}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CALL TO ACTION ─── */}
      <section className="cta-section" style={{ padding: "0 5vw 180px", maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className="gsap-reveal glass-panel glass-parallax cta-panel" style={{ padding: "120px 60px", textAlign: "center", border: "1px solid rgba(232, 0, 13, 0.18)", position: "relative", overflow: "hidden", visibility: "hidden" }}>

          {/* Background red glow */}
          <div style={{ position: "absolute", width: "50vw", height: "50vw", maxWidth: "700px", maxHeight: "700px", borderRadius: "50%", background: "var(--red)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07, filter: "blur(100px)", zIndex: 0 }} />

          {/* Decorative corner lines */}
          <div style={{ position: "absolute", top: "32px", left: "32px", width: "64px", height: "64px", borderTop: "1px solid rgba(232,0,13,0.4)", borderLeft: "1px solid rgba(232,0,13,0.4)" }} />
          <div style={{ position: "absolute", top: "32px", right: "32px", width: "64px", height: "64px", borderTop: "1px solid rgba(232,0,13,0.4)", borderRight: "1px solid rgba(232,0,13,0.4)" }} />
          <div style={{ position: "absolute", bottom: "32px", left: "32px", width: "64px", height: "64px", borderBottom: "1px solid rgba(232,0,13,0.4)", borderLeft: "1px solid rgba(232,0,13,0.4)" }} />
          <div style={{ position: "absolute", bottom: "32px", right: "32px", width: "64px", height: "64px", borderBottom: "1px solid rgba(232,0,13,0.4)", borderRight: "1px solid rgba(232,0,13,0.4)" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="glass-badge" style={{ margin: "0 auto 32px" }}>
              <div className="glass-badge-dot" /> LET&rsquo;S GET MOVING
            </div>
            <h2 className="display" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: "0.9", marginBottom: "28px" }}>
              LET&rsquo;S GET YOUR<br /><span className="text-gradient-red">SHIPMENT MOVING.</span>
            </h2>
            <p style={{ fontFamily: "Space Mono, monospace", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginBottom: "52px", maxWidth: "560px", margin: "0 auto 52px", lineHeight: "2", letterSpacing: "0.05em" }}>
              Work with a logistics partner that values speed, reliability, and clear communication. We handle your shipments so your operations stay on track.
            </p>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="glass-btn">
                GET FREIGHT QUOTE <ArrowUpRight />
              </Link>
              <Link href="/services" className="glass-btn glass-btn-secondary" style={{ fontSize: "1.5rem" }}>
                VIEW SERVICES <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
