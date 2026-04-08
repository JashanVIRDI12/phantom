"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../home-glass.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Conceal elements cleanly to prevent any flash of unstyled content
    gsap.set(".hero-title-word", { autoAlpha: 0, y: 100, rotateX: -45 });
    gsap.set(".hero-desc", { autoAlpha: 0, y: 40 });
    gsap.set(".hero-badge", { autoAlpha: 0, scale: 0.5 });
    gsap.set(".hero-line-x", { scaleX: 0 });
    gsap.set(".hero-ambient-blob", { autoAlpha: 0, scale: 0.5 });

    gsap.set(".gsap-slide-up", { autoAlpha: 0, y: 120 });
    gsap.set(".gsap-slide-left", { autoAlpha: 0, x: -100 });
    gsap.set(".gsap-slide-right", { autoAlpha: 0, x: 100 });
    gsap.set(".gsap-scale-up", { autoAlpha: 0, scale: 0.8 });

    // 2. High-impact cinematic hero entrance
    const tl = gsap.timeline({ delay: 0.1 });
    
    tl.to(".hero-ambient-blob", { autoAlpha: 0.15, scale: 1, duration: 2, ease: "power2.out" })
      .to(".hero-line-x", { scaleX: 1, duration: 1.2, ease: "power4.inOut", transformOrigin: "center" }, "-=1.8")
      .to(".hero-badge", { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(2)" }, "-=1.2")
      .to(".hero-title-word", { 
         autoAlpha: 1, 
         y: 0, 
         rotateX: 0, 
         duration: 1.2, 
         stagger: 0.1, 
         ease: "power4.out" 
      }, "-=1")
      .to(".hero-desc", { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8");

    // Continuous floating/breathing animations
    gsap.to(".hero-float", { y: -20, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".spin-slow", { rotate: 360, duration: 30, ease: "none", repeat: -1 });

    // 3. Ultra-dynamic batch scroll reveals
    ScrollTrigger.batch(".gsap-slide-up", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power4.out", overwrite: true }),
      start: "top 85%", once: true
    });

    ScrollTrigger.batch(".gsap-slide-left", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, x: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", overwrite: true }),
      start: "top 80%", once: true
    });

    ScrollTrigger.batch(".gsap-slide-right", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, x: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", overwrite: true }),
      start: "top 80%", once: true
    });

    ScrollTrigger.batch(".gsap-scale-up", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(1.2)", overwrite: true }),
      start: "top 85%", once: true
    });

    // 4. Extreme Parallax layers
    gsap.utils.toArray('.heavy-parallax').forEach((el: any) => {
      gsap.to(el, { y: -150, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    
    gsap.utils.toArray('.reverse-parallax').forEach((el: any) => {
      gsap.to(el, { y: 150, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
    });

    // Animate stats counter natively if required, or simply scale them beautifully

  }, { scope: container });

  return (
    <div ref={container} className="home-glass-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ─── MASSIVE KINETIC HERO SECTION ─── */}
      <section style={{ minHeight: '80vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '180px 5vw 100px', overflow: 'hidden' }}>
        
        {/* Soft background glow tied to hero animation timeline */}
        <div className="home-ambient-bg" style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
           <div className="home-blob hero-ambient-blob" style={{ width: '80vw', height: '80vw', background: 'var(--red)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', visibility: 'hidden' }} />
           <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 0%, #030303 90%)', zIndex: -1 }} />
        </div>

        <div style={{ width: '100%', maxWidth: '1200px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          
          <div className="hero-line-x" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(232,0,13,0.5), transparent)', width: '100%', marginBottom: '40px', visibility: 'hidden' }} />

          <div className="glass-badge hero-badge hero-float" style={{ margin: '0 auto 40px', background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(232,0,13,0.3)', boxShadow: '0 0 30px rgba(232,0,13,0.2)', visibility: 'hidden' }}>
            <div className="glass-badge-dot" /> ESTABLISHED COMMAND
          </div>
          
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 14vw, 12rem)', lineHeight: '0.9', margin: '0 0 32px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', perspective: '1000px' }}>
            <span className="text-white hero-title-word" style={{ display: 'inline-block', visibility: 'hidden' }}>A</span>
            <span className="text-white hero-title-word" style={{ display: 'inline-block', visibility: 'hidden' }}>TRUSTED</span>
            <span className="text-white hero-title-word" style={{ display: 'inline-block', visibility: 'hidden' }}>NAME</span>
            <span className="text-white hero-title-word" style={{ display: 'inline-block', visibility: 'hidden' }}>IN</span>
            <span className="text-gradient-red hero-title-word" style={{ display: 'inline-block', padding: '0.05em 0', visibility: 'hidden' }}>LOGISTICS.</span>
          </h1>
          
          <p className="mono hero-desc" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.25rem', margin: '0 auto', lineHeight: 1.8, textTransform: 'none', letterSpacing: 'normal', maxWidth: '800px', visibility: 'hidden' }}>
            With over 5 years of ruthless efficiency in the transportation industry, Phantom Logistics has established itself as an elite, heavily trusted name in supply chain management.
          </p>

          <div className="hero-line-x" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', width: '100%', marginTop: '80px', visibility: 'hidden' }} />
        </div>
      </section>

      {/* ─── KINETIC ABOUT EXPERTISE (OVERLAPPING SLIDES) ─── */}
      <section className="container mx-auto" style={{ padding: '80px 5vw 160px', overflow: 'hidden' }}>
         <div className="editorial-grid">
            
            {/* Left Content Sliding gracefully */}
            <div className="gsap-slide-left hero-float editorial-text-even" style={{ zIndex: 10, visibility: 'hidden' }}>
               <div className="glass-panel" style={{ padding: '80px', background: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}>
                 <h2 className="display" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#fff', marginBottom: '32px', lineHeight: 0.9 }}>
                   OPERATIONAL EXPERTISE <br/><span className="text-gradient-red" style={{ padding: '0.05em 0' }}>NEVER SETTLES.</span>
                 </h2>
                 <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal', marginBottom: '24px' }}>
                   We pride ourselves on delivering exceptional service, guaranteed on-time performance, and innovative strategic solutions that forcefully assist our clients in succeeding inside today's hyper-competitive business environments.
                 </p>
                 <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal' }}>
                   Phantom Logistics believes our people are our absolute greatest asset. From the dispatch room to the highway, our culture of respect, safety, and uncompromising integrity ensures that your goods are managed by tactical professionals.
                 </p>
               </div>
            </div>
            
            {/* Background Graphic Abstract Sliding Right with Heavy Scrub Parallax */}
            <div className="gsap-slide-right heavy-parallax editorial-img-even" style={{ zIndex: 5, visibility: 'hidden' }}>
              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '700px', backgroundColor: 'transparent', position: 'relative', overflow: 'hidden', border: '1px solid rgba(232,0,13,0.1)', borderRadius: '32px' }}>
                 
                 {/* Cinematic Video Parallax Mask */}
                 <video className="reverse-parallax" src="/vid3.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', top: '-150px', left: 0, width: '100%', height: 'calc(100% + 300px)', objectFit: 'cover', opacity: 0.85, zIndex: 0 }} />

              </div>
            </div>

         </div>
      </section>

      {/* ─── INTENSE STAGGERED FOOTPRINT GRID ─── */}
      <section className="container mx-auto" style={{ padding: '0 5vw 180px' }}>
        
        <div className="gsap-slide-up" style={{ textAlign: 'center', visibility: 'hidden', marginBottom: '80px' }}>
           <div className="glass-badge mx-auto" style={{ display: 'flex', width: 'max-content', background: 'rgba(255,255,255,0.02)' }}>
             <div className="glass-badge-dot"/> OPERATIONAL FOOTPRINT
           </div>
        </div>
        
        <div className="grid-4">
            {[ 
               { val: "5+", lbl: "YEARS EXP" },
               { val: "11K", lbl: "SHIPMENTS" },
               { val: "10M", lbl: "MILES DRIVEN" },
               { val: "24/7", lbl: "SUPPORT" },
            ].map((s,i) => (
               <div key={i} className="glass-card gsap-scale-up" style={{ padding: '80px 32px', textAlign: 'center', visibility: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="display text-gradient-red" style={{ fontSize: '6rem', margin: '0 0 16px 0', lineHeight: 1, padding: '0.05em 0', textShadow: '0 0 20px rgba(232,0,13,0.3)' }}>{s.val}</p>
                  <p className="mono text-white" style={{ fontSize: '1rem', letterSpacing: '4px', fontWeight: 'bold' }}>{s.lbl}</p>
               </div>
            ))}
        </div>
      </section>

    </div>
  );
}
