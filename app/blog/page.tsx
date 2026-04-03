"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "../home-glass.css";

export default function BlogPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Prevent flickering
    gsap.set(".gsap-reveal", { autoAlpha: 0, y: 50 });
    gsap.to(".gsap-reveal", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 });
  }, { scope: container });

  return (
    <div ref={container} className="home-glass-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 5vw' }}>
      
      {/* Ambient Orbs */}
      <div className="home-ambient-bg">
        <div className="home-blob home-blob-1" style={{ background: 'var(--red)', opacity: 0.2, top: '-20%', right: '-20%' }} />
        <div className="home-blob home-blob-2" style={{ background: '#110002', opacity: 0.3 }} />
      </div>

      <div className="glass-panel gsap-reveal" style={{ padding: '80px', textAlign: 'center', maxWidth: '650px', width: '100%', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
        
        <div className="glass-badge" style={{ margin: '0 auto 32px', background: 'rgba(0,0,0,0.4)' }}>
          <div className="glass-badge-dot" /> DEVELOPMENT PROTOCOL
        </div>
        
        <div style={{ padding: '20px 0' }}>
          <h1 className="display text-gradient-red" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: '1.1', margin: '0' }}>COMING SOON.</h1>
        </div>
        
        <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', textTransform: 'none', letterSpacing: 'normal', margin: '32px 0 0', lineHeight: 1.8 }}>
          Our tactical insights, operational dispatches, and logistical case studies are currently being mapped. Stand by for the launch of the Phantom Logistics development blog.
        </p>
      </div>

    </div>
  );
}
