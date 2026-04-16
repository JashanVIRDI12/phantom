"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Layers, Target, CheckCircle2, DollarSign } from "lucide-react";
import "../../home-glass.css";

export default function LtlTruckingPage() {
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
          <img src="/img3.png" alt="LTL Trucking" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        
        <div style={{ position: "absolute", inset: 0, zIndex: -2, background: "linear-gradient(to bottom, rgba(3,3,3,0.4) 0%, rgba(3,3,3,0.85) 60%, #030303 100%)" }} />

        <div style={{ position: "relative", zIndex: 10, padding: "0 5vw 80px", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <div className="glass-badge hero-fade" style={{ marginBottom: "24px" }}>
            <div className="glass-badge-dot" /> PARTIAL LOAD
          </div>
          
          <h1 className="display hero-fade" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 0.9, marginBottom: "32px", textTransform: "uppercase" }}>
            LTL <br /><span className="text-gradient-red">TRUCKING</span>
          </h1>
          
          <p className="hero-fade" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "600px", fontFamily: "'Inter', sans-serif" }}>
            Partial loads require disciplined coordination. Our LTL operations are designed to integrate smaller shipments into structured freight networks, ensuring smooth transitions across multiple stops while maintaining operational clarity.
          </p>
        </div>
      </section>

      <section className="container mx-auto hero-fade" style={{ padding: "80px 5vw 160px" }}>
        <div className="glass-grid-3">
            {[ 
              { icon: DollarSign, title: "OPTIMIZED ALLOCATION", desc: "Ship smaller volumes without committing to full capacity. Our LTL structure ensures space is utilized efficiently across shared routes." },
              { icon: Layers, title: "SCALABLE THROUGHPUT", desc: "Adjust shipment volumes as demand changes, without disrupting your distribution flow or requiring dedicated assets." },
              { icon: Target, title: "NETWORK RHYTHM", desc: "Consistent movement through established hubs and transfer points keeps partial loads progressing with structured timing." }
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
              <div className="glass-badge-dot" /> DYNAMIC SCALING
            </div>
            <h2 className="display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "32px", lineHeight: 1 }}>
              SHIP SMARTER <br/><span className="text-gradient-red">NOT HARDER</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "24px", fontFamily: "'Inter', sans-serif" }}>
              LTL requires more than shared space; it demands precise coordination across multiple touchpoints. Our system aligns consolidation, routing, and terminal handling to ensure partial shipments move with consistency and control. Every load is managed to maintain flow, accuracy, and accountability across the network.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Consolidated routing is designed to maximize load efficiency",
                "Accessorial support tailored for complex delivery requirements",
                "Controlled handling processes across transfer terminals",
                "Verified weight management to prevent billing discrepancies"
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "1rem", color: "rgba(255,255,255,0.8)", fontFamily: "'Inter', sans-serif" }}>
                  <CheckCircle2 size={20} color="var(--red)" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="glass-image-panel" style={{ height: "600px", width: "100%" }}>
              <img src="/img3.png" alt="LTL Transport" style={{ objectPosition: "right" }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 5vw 160px" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <div className="glass-panel" style={{ padding: "80px 40px", textAlign: "center", border: "1px solid rgba(232,0,13,0.15)" }}>
            <h2 className="display" style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", marginBottom: "24px" }}>READY TO OPTIMIZE YOUR LTL?</h2>
            <Link href="/contact" className="glass-btn">
              REQUEST QUOTE <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
