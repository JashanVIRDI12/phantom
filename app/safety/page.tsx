"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import "../home-glass.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SafetyPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero concealment
    gsap.set(".hero-title-word", { autoAlpha: 0, y: 100, rotateX: -45 });
    gsap.set(".hero-desc", { autoAlpha: 0, y: 40 });
    gsap.set(".hero-badge", { autoAlpha: 0, scale: 0.5 });
    gsap.set(".hero-line-x", { scaleX: 0 });

    gsap.set(".gsap-slide-left", { autoAlpha: 0, x: -100 });
    gsap.set(".gsap-slide-right", { autoAlpha: 0, x: 100 });

    // Hero Animation
    const tl = gsap.timeline({ delay: 0.1 });
    
    tl.to(".hero-line-x", { scaleX: 1, duration: 1.2, ease: "power4.inOut", transformOrigin: "center" })
      .to(".hero-badge", { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(2)" }, "-=0.8")
      .to(".hero-title-word", { 
         autoAlpha: 1, 
         y: 0, 
         rotateX: 0, 
         duration: 1.2, 
         stagger: 0.1, 
         ease: "power4.out" 
      }, "-=0.6")
      .to(".hero-desc", { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8");

    gsap.to(".hero-float", { y: -10, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });


    ScrollTrigger.batch(".gsap-slide-left", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, x: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", overwrite: true }),
      start: "top 80%", once: true
    });
    ScrollTrigger.batch(".gsap-slide-right", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, x: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", overwrite: true }),
      start: "top 80%", once: true
    });

    // Extreme Parallax layers for visuals
    gsap.utils.toArray('.heavy-parallax').forEach((el: any) => {
      gsap.to(el, { y: -100, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    gsap.utils.toArray('.reverse-parallax').forEach((el: any) => {
      gsap.to(el, { y: 150, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
    });

  }, { scope: container });

  return (
    <div ref={container} className="home-glass-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Hero Section */}
      <section style={{ minHeight: '80vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '180px 5vw 100px', overflow: 'hidden' }}>
        
        {/* Cinematic Background */}
        <div className="home-ambient-bg" style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
           <video src="/vid2.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, filter: 'grayscale(100%)' }} />
           <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(3,3,3,0.3) 0%, #030303 90%)', zIndex: -1 }} />
        </div>

        <div style={{ width: '100%', maxWidth: '1000px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          
          <div className="hero-line-x" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(232,0,13,0.5), transparent)', width: '100%', marginBottom: '40px', visibility: 'hidden' }} />

          <div className="glass-badge hero-badge hero-float" style={{ margin: '0 auto 40px', background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(232,0,13,0.3)', boxShadow: '0 0 30px rgba(232,0,13,0.2)', visibility: 'hidden' }}>
            <div className="glass-badge-dot" /> CORE VALUES
          </div>
          
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '0.9', margin: '0 0 32px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', perspective: '1000px' }}>
            <span className="text-white hero-title-word" style={{ display: 'inline-block', visibility: 'hidden' }}>SAFETY</span>
            <span className="text-white hero-title-word" style={{ display: 'inline-block', visibility: 'hidden' }}>COMES</span>
            <span className="text-gradient-red hero-title-word" style={{ display: 'inline-block', padding: '0.05em 0', visibility: 'hidden' }}>FIRST.</span>
          </h1>
          
          <p className="mono hero-desc" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.15rem', margin: '0 auto 40px', lineHeight: 1.8, textTransform: 'none', letterSpacing: 'normal', maxWidth: '800px', visibility: 'hidden' }}>
            Safety is our unwavering commitment to our drivers, our families, our customers, and the public. Every Phantom teammate understands the importance of embracing and living that value.
          </p>

          <div className="hero-desc" style={{ visibility: 'hidden', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="glass-button" style={{ display: 'inline-flex', padding: '16px 32px', background: 'rgba(232,0,13,0.15)', border: '1px solid rgba(232,0,13,0.5)', borderRadius: '100px', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}>
              Get A Quote
            </Link>
          </div>

        </div>
      </section>

      {/* Block 1: Guiding Principle */}
      <section className="container mx-auto" style={{ padding: '80px 5vw 80px', overflow: 'hidden' }}>
         <div className="editorial-grid">
            <div className="gsap-slide-left hero-float editorial-text-even" style={{ zIndex: 10, visibility: 'hidden' }}>
               <div className="glass-panel" style={{ padding: '60px', background: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}>
                 <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#fff', marginBottom: '32px', lineHeight: 0.9, textTransform: 'uppercase' }}>
                   GUIDING <span className="text-gradient-red" style={{ padding: '0.05em 0' }}>PRINCIPLE</span>
                 </h2>
                 <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal', marginBottom: '24px' }}>
                   Safety is the guiding principle in our daily work and our long-term planning. We continuously implement and improve processes that support our safety values. 
                 </p>
                 <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal' }}>
                   Our team has exceptional driving and performance histories and dedicate themselves to working with our drivers to help ensure they are safe and successful. Thorough vehicle inspections ensure all trucks are safe before drivers start driving. While DOT inspections are required, we use tools that ensure all inspections are thorough and accurately documented.
                 </p>
               </div>
            </div>
            
            <div className="gsap-slide-right heavy-parallax editorial-img-even" style={{ zIndex: 5, visibility: 'hidden' }}>
              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(232,0,13,0.1)', borderRadius: '32px' }}>
                 <Image src="/img1.jpg" alt="Thorough trucking inspections" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} className="reverse-parallax" />
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #030303 0%, transparent 100%)', opacity: 0.5 }} />
              </div>
            </div>
         </div>
      </section>

      {/* Block 2: AI & Dash Cams (Reversed) */}
      <section className="container mx-auto" style={{ padding: '80px 5vw 80px', overflow: 'hidden' }}>
         <div className="editorial-grid" style={{ direction: 'rtl' }}>
            <div className="gsap-slide-right hero-float editorial-text-even" style={{ zIndex: 10, visibility: 'hidden', direction: 'ltr' }}>
               <div className="glass-panel" style={{ padding: '60px', background: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}>
                 <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#fff', marginBottom: '32px', lineHeight: 0.9, textTransform: 'uppercase' }}>
                   AI-ASSISTED <span className="text-gradient-red" style={{ padding: '0.05em 0' }}>COMPLIANCE</span>
                 </h2>
                 <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal', marginBottom: '24px' }}>
                   The Federal Motor Carrier Safety Administration (FMCSA) identified distracted driving as the number one cause of accidents for truck drivers. Distractions can range from eating lunch to staring at a billboard, but predominately cellphone usage.
                 </p>
                 <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal' }}>
                   Phantom Logistics vehicles are equipped with dual-facing dash cams featuring artificial intelligence. These cameras identify distractions like gazing down at a smartphone, allowing us to coach drivers, correct behaviors, and drastically reduce the likelihood of incidents.
                 </p>
               </div>
            </div>
            
            <div className="gsap-slide-left heavy-parallax editorial-img-even" style={{ zIndex: 5, visibility: 'hidden', direction: 'ltr' }}>
              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(232,0,13,0.1)', borderRadius: '32px' }}>
                 <video src="/vid3.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="reverse-parallax" />
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg, #030303 0%, transparent 100%)', opacity: 0.5 }} />
              </div>
            </div>
         </div>
      </section>

      {/* Block 3: GPS Tracking & Routing */}
      <section className="container mx-auto" style={{ padding: '80px 5vw 160px', overflow: 'hidden' }}>
         <div className="editorial-grid">
            <div className="gsap-slide-left hero-float editorial-text-even" style={{ zIndex: 10, visibility: 'hidden' }}>
               <div className="glass-panel" style={{ padding: '60px', background: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}>
                 <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#fff', marginBottom: '32px', lineHeight: 0.9, textTransform: 'uppercase' }}>
                   REAL-TIME <span className="text-gradient-red" style={{ padding: '0.05em 0' }}>TELEMATICS</span>
                 </h2>
                 <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal', marginBottom: '24px' }}>
                   With our centralized fleet management platform, we obtain real-time GPS tracking for all our drivers. This is essential for ensuring driver safety, especially during emergency situations or breakdowns.
                 </p>
                 <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal' }}>
                   Knowing the exact coordinates allows us to quickly reroute loads or dispatch maintenance crews to mitigate downtime. Additionally, we enforce rigorous preventative maintenance schedules—brakes, oil, and parts—because the safety of our drivers essentially starts with the proactive safety of their vehicles.
                 </p>
               </div>
            </div>
            
            <div className="gsap-slide-right heavy-parallax editorial-img-even" style={{ zIndex: 5, visibility: 'hidden' }}>
              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(232,0,13,0.1)', borderRadius: '32px' }}>
                 <Image src="/img3.png" alt="Phantom logistics trucks parked" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} className="reverse-parallax" />
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #030303 0%, transparent 100%)', opacity: 0.5 }} />
              </div>
            </div>
         </div>
      </section>

    </div>
  );
}
