"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Truck, Thermometer, LayoutGrid, Warehouse, Package, Layers, Zap, Flame, Map, Navigation, Globe } from "lucide-react";
import "../home-glass.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    num: "01",
    category: "STANDARD FREIGHT",
    title: "DRY VAN\nTRUCKING",
    desc: "Reliable and cost-effective transportation for general freight. Our dry van trailers protect your goods from weather and external conditions, ensuring safe and consistent delivery across every mile.",
    img: "/img1.jpg",
    imgPosition: "center bottom",
    icon: Truck,
    tag: "FULL TRUCKLOAD",
    href: "/services/dry-van",
  },
  {
    num: "02",
    category: "TEMPERATURE CONTROLLED",
    title: "REFRIGERATED\nTRANSPORT",
    desc: "Temperature-controlled transport for perishable and sensitive goods. We maintain consistent conditions throughout transit to ensure your cargo arrives fresh, safe, and uncompromised.",
    img: "/img2.png",
    imgPosition: "center center",
    icon: Thermometer,
    tag: "CLIMATE CONTROLLED",
    href: "/services/refrigerated",
  },
  {
    num: "03",
    category: "EXCLUSIVE OPERATIONS",
    title: "DEDICATED\nFLEET",
    desc: "A dedicated fleet built around your business needs. You get consistent capacity, priority dispatch, and full control over how your freight moves every day.",
    img: "/img3.png",
    imgPosition: "left center",
    icon: LayoutGrid,
    tag: "PRIVATE ROSTER",
    href: "/services/dedicated",
  },
  {
    num: "04",
    category: "STORAGE SOLUTIONS",
    title: "WAREHOUSING",
    desc: "Secure, structured, and scalable warehousing solutions. We provide short-term and long-term storage options with full inventory management, ensuring your goods are safe and ready for dispatch.",
    img: "/img1.jpg",
    imgPosition: "center center",
    icon: Warehouse,
    tag: "SECURE STORAGE",
    href: "/services/warehousing",
  },
  {
    num: "05",
    category: "GENERAL FREIGHT",
    title: "FREIGHT\nSHIPPING",
    desc: "Comprehensive freight shipping services across domestic routes. From standard pallets to specialized loads, we coordinate the entire shipping process for seamless delivery.",
    img: "/img2.png",
    imgPosition: "center center",
    icon: Package,
    tag: "NATIONWIDE",
    href: "/services/freight-shipping",
  },
  {
    num: "06",
    category: "PARTIAL LOAD",
    title: "LTL\nTRUCKING",
    desc: "Efficient Less-Than-Truckload shipping for freight that doesn't require a full trailer. Share the ride and save on costs while maintaining reliable delivery schedules.",
    img: "/img3.png",
    imgPosition: "center center",
    icon: Layers,
    tag: "COST EFFICIENT",
    href: "/services/ltl-trucking",
  },
  {
    num: "07",
    category: "TIME-CRITICAL",
    title: "EXPEDITED\nTRUCKING",
    desc: "When time is of the essence, our expedited trucking services ensure your freight reaches its destination via the fastest possible route with zero layovers.",
    img: "/img1.jpg",
    imgPosition: "center center",
    icon: Zap,
    tag: "URGENT DELIVERY",
    href: "/services/expedited-trucking",
  },
  {
    num: "08",
    category: "RAPID RESPONSE",
    title: "HOTSHOT\nTRUCKING",
    desc: "Dedicated hotshot capabilities for time-sensitive, smaller, or specialized loads. Immediate dispatch to get your crucial freight moving at a moment's notice.",
    img: "/img2.png",
    imgPosition: "center center",
    icon: Flame,
    tag: "DIRECT DISPATCH",
    href: "/services/hotshot-trucking",
  },
  {
    num: "09",
    category: "CROSS-COUNTRY",
    title: "LONG HAUL\nTRUCKING",
    desc: "Extensive long-haul network bridging the distance. Our experienced drivers and well-maintained fleet ensure your cargo crosses state lines safely and on time.",
    img: "/img3.png",
    imgPosition: "center center",
    icon: Map,
    tag: "INTERSTATE",
    href: "/services/long-haul-trucking",
  },
  {
    num: "10",
    category: "END-TO-END",
    title: "FREIGHT\nTRANSPORTATION",
    desc: "Versatile freight transportation handling all sizes and classes. We match your specific cargo with the ideal equipment to maximize efficiency.",
    img: "/img1.jpg",
    imgPosition: "center center",
    icon: Navigation,
    tag: "VERSATILE FLEET",
    href: "/services/freight-transportation",
  },
  {
    num: "11",
    category: "SUPPLY CHAIN",
    title: "FREIGHT\nFORWARDING",
    desc: "Strategic freight forwarding logistics. We manage the network of carriers and complex routing to optimize your supply chain from origin to final destination.",
    img: "/img2.png",
    imgPosition: "center center",
    icon: Globe,
    tag: "LOGISTICS MANAGEMENT",
    href: "/services/freight-forwarding",
  },
];

const pillars = [
  { label: "REAL-TIME TRACKING", sub: "Full shipment visibility at every mile." },
  { label: "RAPID DISPATCH",     sub: "Zero lag between booking and wheels rolling." },
  { label: "CARGO PROTECTION",   sub: "Strict protocols from pickup to delivery." },
  { label: "SMART ROUTING",      sub: "Efficiency-first paths, no wasted time." },
];

export default function ServicesPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // — init invisible
    gsap.set(".s-hero-anim",   { autoAlpha: 0, y: 60 });
    gsap.set(".s-pillar",      { autoAlpha: 0, y: 40 });
    gsap.set(".s-card",        { autoAlpha: 0, y: 80 });

    // — hero stagger
    gsap.timeline({ delay: 0.15 })
      .to(".s-hero-badge",    { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(".s-hero-h1",       { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" }, "-=0.4")
      .to(".s-hero-sub",      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .to(".s-hero-line",     { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(".s-pillar",        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "-=0.3");

    // — cards scroll reveal
    ScrollTrigger.batch(".s-card", {
      onEnter: (els) =>
        gsap.to(els, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out", overwrite: true }),
      start: "top 88%",
      once: true,
    });

    // — sticky card scale-down while scrolling past
    const cards = gsap.utils.toArray(".s-card-inner") as HTMLElement[];
    cards.forEach((card, i) => {
      if (i !== cards.length - 1) {
        gsap.to(card, {
          scale: 0.88,
          opacity: 0.35,
          filter: "blur(8px)",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 110px",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    // — parallax on card imagery
    gsap.utils.toArray(".s-card-img").forEach((img: any) => {
      gsap.fromTo(
        img,
        { y: -30, scale: 1.15 },
        {
          y: 30,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".s-card"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

  }, { scope: container });

  // Mouse-track glow on service cards
  useEffect(() => {
    const cards = document.querySelectorAll(".s-card-inner");
    const onMove = (e: MouseEvent) => {
      cards.forEach((c) => {
        const r = (c as HTMLElement).getBoundingClientRect();
        (c as HTMLElement).style.setProperty("--mx", `${e.clientX - r.left}px`);
        (c as HTMLElement).style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={container} className="home-glass-wrapper">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>

        {/* full-bleed video */}
        <div style={{ position: "absolute", inset: 0, zIndex: -3 }}>
          <video className="s-hero-video desktop-only" src="/vid3.mp4" autoPlay loop muted playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <video className="s-hero-video mobile-only" src="/vid2.mp4" autoPlay loop muted playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* gradient veil — heavy at bottom so text is readable */}
        <div style={{
          position: "absolute", inset: 0, zIndex: -2,
          background: "linear-gradient(to bottom, rgba(3,3,3,0.2) 0%, rgba(3,3,3,0.4) 50%, rgba(3,3,3,0.85) 85%, #030303 100%)"
        }} />

        {/* hero copy — pinned to bottom-left with editorial feel */}
        <div style={{ position: "relative", zIndex: 10, padding: "0 5vw 100px", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>


          {/* giant headline */}
          <h1 className="display s-hero-anim s-hero-h1" style={{
            visibility: "hidden",
            fontSize: "clamp(3.5rem, 12vw, 11rem)",
            lineHeight: 0.88,
            maxWidth: "900px",
            marginBottom: "40px",
          }}>
            ELITE <span className="text-gradient-red">LOGISTICS</span><br />
            CAPABILITIES.
          </h1>

          {/* sub + divider row */}
          <div className="s-hero-anim s-hero-sub" style={{ visibility: "hidden", display: "flex", alignItems: "flex-end", gap: "48px", flexWrap: "wrap", marginBottom: "64px" }}>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: "1.85", maxWidth: "480px", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              From dispatch to delivery, we keep your freight moving efficiently. Real-time tracking and structured execution ensure nothing is left uncertain.
            </p>
            <Link href="/contact" className="glass-btn" style={{ flexShrink: 0 }}>
              GET FREIGHT QUOTE <ArrowUpRight />
            </Link>
          </div>

          {/* horizontal pillar strip */}
          <div className="s-hero-anim s-hero-line" style={{ visibility: "hidden", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "40px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
            {pillars.map((p, i) => (
              <div key={i} className="s-pillar" style={{
                visibility: "hidden",
                padding: "24px 32px 0",
                borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
              }}>
                <p className="display" style={{ fontSize: "1.05rem", color: "#fff", marginBottom: "8px", letterSpacing: "0.06em" }}>{p.label}</p>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>{p.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          STICKY SERVICE CARDS
      ══════════════════════════════════════════ */}
      <section style={{ background: "#030303", padding: "60px 5vw 280px", position: "relative" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>

          {/* section label row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "32px" }}>
            <span className="mono" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", letterSpacing: "3px" }}>SERVICES / 3 DISCIPLINES</span>
            <span className="mono" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", letterSpacing: "3px" }}>SCROLL TO EXPLORE ↓</span>
          </div>

          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="s-card" style={{
                visibility: "hidden",
                position: "sticky",
                top: `${100 + i * 32}px`,
                marginBottom: "120px",
                zIndex: i + 1,
              }}>
                <div className="s-card-inner" style={{
                  borderRadius: "28px",
                  overflow: "hidden",
                  background: "rgba(11,11,11,0.98)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 60px 120px rgba(0,0,0,0.9)",
                  display: "grid",
                  gridTemplateColumns: "1fr 480px",
                  height: "640px",
                  transformOrigin: "top center",
                  position: "relative",
                }}>
                  {/* — radial mouse glow */}
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
                    background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(232,0,13,0.07), transparent 50%)",
                    borderRadius: "inherit",
                  }} />

                  {/* IMAGE SIDE */}
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      className="s-card-img"
                      src={s.img}
                      alt={s.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: s.imgPosition, display: "block" }}
                    />
                    {/* right-edge fade into content */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 50%, rgba(11,11,11,0.98) 100%)" }} />
                    {/* bottom-edge fade */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,11,11,0.6) 0%, transparent 40%)" }} />

                    {/* giant ghost number */}
                    <span className="display" style={{
                      position: "absolute", top: "28px", left: "32px",
                      fontSize: "clamp(6rem, 14vw, 12rem)",
                      color: "rgba(255,255,255,0.06)",
                      lineHeight: 0.85, userSelect: "none", zIndex: 5,
                    }}>{s.num}</span>

                    {/* tag pill */}
                    <div style={{
                      position: "absolute", bottom: "32px", left: "32px", zIndex: 10,
                      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "100px", padding: "8px 18px",
                      display: "flex", alignItems: "center", gap: "8px",
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", boxShadow: "0 0 8px var(--red)" }} />
                      <span className="mono" style={{ fontSize: "0.72rem", letterSpacing: "2px", color: "rgba(255,255,255,0.7)" }}>{s.tag}</span>
                    </div>
                  </div>

                  {/* CONTENT SIDE */}
                  <div style={{
                    padding: "72px 64px",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    position: "relative", zIndex: 5,
                  }}>
                    {/* category + icon row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: "12px",
                        background: "rgba(232,0,13,0.12)", border: "1px solid rgba(232,0,13,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <Icon size={22} color="var(--red)" />
                      </div>
                      <span className="mono" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", letterSpacing: "3px" }}>{s.category}</span>
                    </div>

                    {/* title */}
                    <h2 className="display" style={{
                      fontSize: "clamp(2.8rem, 4vw, 4.5rem)",
                      lineHeight: 0.92, color: "#fff",
                      marginBottom: "32px",
                      whiteSpace: "pre-line",
                    }}>{s.title}</h2>

                    {/* thin red rule */}
                    <div style={{ width: 48, height: 2, background: "var(--red)", marginBottom: "32px", borderRadius: 2 }} />

                    {/* description */}
                    <p style={{
                      fontSize: "0.98rem", color: "rgba(255,255,255,0.55)",
                      lineHeight: "1.9", marginBottom: "48px",
                      fontFamily: "'Inter', sans-serif", fontWeight: 400,
                    }}>{s.desc}</p>

                    {/* CTA */}
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <Link href={s.href} style={{
                        display: "inline-flex", alignItems: "center", gap: "10px",
                        fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.15rem",
                        fontWeight: 700, letterSpacing: "0.06em",
                        color: "#fff", textTransform: "uppercase",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "100px", padding: "14px 32px",
                        transition: "background 0.3s, border-color 0.3s",
                        width: "fit-content",
                      }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "rgba(232,0,13,0.15)";
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(232,0,13,0.4)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                        }}
                      >
                        LEARN MORE <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>



      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section style={{ padding: "0 5vw 160px", background: "#030303" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <div style={{
            borderRadius: "28px", overflow: "hidden",
            position: "relative", padding: "120px 80px",
            textAlign: "center",
            border: "1px solid rgba(232,0,13,0.15)",
            background: "rgba(10,10,10,0.8)",
          }}>
            {/* video bg */}
            <video src="/vid3.mp4" autoPlay loop muted playsInline style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", opacity: 0.15, zIndex: -2,
            }} />
            {/* radial veil */}
            <div style={{
              position: "absolute", inset: 0, zIndex: -1,
              background: "radial-gradient(ellipse at center, rgba(232,0,13,0.08) 0%, rgba(3,3,3,0.96) 70%)",
            }} />

            <div className="glass-badge" style={{ margin: "0 auto 32px" }}>
              <div className="glass-badge-dot" /> LET&rsquo;S GET MOVING
            </div>

            <h2 className="display" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.9, marginBottom: "28px" }}>
              READY TO MOVE <span className="text-gradient-red">YOUR FREIGHT?</span>
            </h2>

            <p style={{
              fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: "1.85",
              maxWidth: "580px", margin: "0 auto 52px",
              fontFamily: "'Inter', sans-serif", fontWeight: 400,
            }}>
              Tell us your requirements and we will handle the rest. From planning to delivery, your shipment stays on track.
            </p>

            <Link href="/contact" className="glass-btn" style={{ boxShadow: "0 20px 50px rgba(232,0,13,0.35)" }}>
              GET FREIGHT QUOTE <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
