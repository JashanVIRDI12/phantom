"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Flame, Map, AlertTriangle, TruckFast } from "lucide-react";
import "../../home-glass.css";

export default function HotshotTruckingPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(".hero-fade", { autoAlpha: 0, y: 40 });
    gsap.to(".hero-fade", { 
      autoAlpha: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out" 
    });
  }, { scope: container });

  return (
    <div ref={container} className="home-glass-wrapper">
      <section style={{ position: "relative", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", paddingTop: "140px" }}>
        
        {/* BG IMAGE */}
        <div style={{ position: "absolute", inset: 0, zIndex: -3 }}>
          <img src="/img2.png" alt="Hotshot Trucking" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        
        <div style={{ position: "absolute", inset: 0, zIndex: -2, background: "linear-gradient(to bottom, rgba(3,3,3,0.4) 0%, rgba(3,3,3,0.85) 60%, #030303 100%)" }} />

        <div style={{ position: "relative", zIndex: 10, padding: "0 5vw 80px", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <div className="glass-badge hero-fade" style={{ marginBottom: "24px" }}>
            <div className="glass-badge-dot" /> RAPID RESPONSE
          </div>
          
          <h1 className="display hero-fade" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 0.9, marginBottom: "32px", textTransform: "uppercase" }}>
            HOTSHOT <br /><span className="text-gradient-red">TRUCKING</span>
          </h1>
          
          <p className="hero-fade" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "600px", fontFamily: "'Inter', sans-serif" }}>
            Dedicated hotshot capabilities for time-sensitive, smaller, or specialized loads. Immediate dispatch to get your crucial freight moving at a moment's notice.
          </p>
        </div>
      </section>

      <section className="container mx-auto hero-fade" style={{ padding: "80px 5vw 160px" }}>
        <div className="glass-grid-3">
            {[ 
              { icon: Flame, title: "IMMEDIATE DISPATCH", desc: "No delays. Hotshot implies speed on demand, meaning our drivers receive instant load-out authorizations to move your cargo." },
              { icon: Map, title: "VERSATILE DELIVERY", desc: "Whether an oilfield site or an urban center, hotshot loads get straight to the destination without terminal stops." },
              { icon: AlertTriangle, title: "EXCLUSIVITY", desc: "Your freight is the only freight. Dedicated flatbeds or sprinters ensuring full attention from pickup to drop-off." }
            ].map((f, i) => (
              <div key={i} className="glass-card">
                <div className="glass-icon-wrap" style={{ marginBottom: "24px", width: 56, height: 56 }}>
                  <f.icon style={{ width: 28, height: 28 }} color="var(--red)" />
                </div>
                <h3 className="display" style={{ fontSize: "2rem", marginBottom: "16px" }}>{f.title}</h3>
                <p className="mono" style={{ textTransform: "none", letterSpacing: "normal", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Editorial Content */}
      <section className="container mx-auto hero-fade" style={{ padding: "0 5vw 160px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", alignItems: "center" }}>
          <div>
            <div className="glass-badge" style={{ marginBottom: "24px" }}>
              <div className="glass-badge-dot" /> DEDICATED RESPONSE
            </div>
            <h2 className="display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "32px", lineHeight: 1 }}>
              RUTHLESS <br/><span className="text-gradient-red">SPEED.</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "24px", fontFamily: "'Inter', sans-serif" }}>
              When heavy machinery breaks down or critical construction components go missing, you need solutions, not schedules. Phantom Logistics hotshot trucking delivers pure, unadulterated speed for specialized loads.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Direct-to-site deliveries skipping distribution centers.",
                "Suitable for construction, oil/gas, and specialized industries.",
                "Customized equipment for oddly shaped or heavy items.",
                "Absolute commitment to safety amidst accelerated timelines."
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "1rem", color: "rgba(255,255,255,0.8)", fontFamily: "'Inter', sans-serif" }}>
                  <AlertTriangle size={20} color="var(--red)" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="glass-image-panel" style={{ height: "600px", width: "100%" }}>
              <img src="/img2.png" alt="Hotshot Response" style={{ objectPosition: "center" }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 5vw 160px" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <div className="glass-panel" style={{ padding: "80px 40px", textAlign: "center", border: "1px solid rgba(232,0,13,0.15)" }}>
            <h2 className="display" style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", marginBottom: "24px" }}>NEED HOTSHOT DEPLOYMENT?</h2>
            <Link href="/contact" className="glass-btn">
              REQUEST QUOTE <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
