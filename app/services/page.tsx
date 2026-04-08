"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Zap, ShieldCheck } from "lucide-react";
import "../home-glass.css"; 

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  { num: "01", category: "STANDARD FREIGHT", title: "DRY VAN TRUCKING", desc: "Standard freight transportation doesn't have to be ordinary. We utilize heavily secure, weather-protected trailers designed to move massive volumes of general merchandise flawlessly and with absolute precision.", img: "/img1.jpg", imgPosition: "center bottom" },
  { num: "02", category: "TEMPERATURE CONTROLLED", title: "REFRIGERATED TRANSPORT", desc: "Temperature deviation is unacceptable. Our state-of-the-art climate-controlled fleet handles perishable goods and pharmaceuticals with intense, food-grade safety standards that guarantee integrity from origin to destination.", img: "/img2.png" },
  { num: "03", category: "EXCLUSIVE OPERATIONS", title: "DEDICATED FLEET", desc: "Gain exclusive access to our modern trucks and interchangeable trailers. Build a private fleet operated by our tactical transport teams dedicated entirely to mapping and executing your unique supply chain.", img: "/img3.png", imgPosition: "left center" },
];

export default function ServicesPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hidden initialization
    gsap.set(".hero-element", { autoAlpha: 0, y: 50 });
    gsap.set(".service-card", { autoAlpha: 0, y: 100 });
    
    // Hero Timeline
    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(".hero-element", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out" });

    // Staggered entrance for cards initially
    ScrollTrigger.batch(".service-card", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out", overwrite: true }),
      start: "top 85%", once: true
    });

    // Advanced Sticky Card Stacking effect
    const cards = gsap.utils.toArray('.service-card-inner') as HTMLElement[];
    cards.forEach((card, i) => {
      // Don't animate the last card because nothing stacks on top of it
      if (i !== cards.length - 1) {
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.4,
          filter: "blur(10px)",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 120px", // When this card hits sticky position
            end: "bottom top",  // When the sequence moves completely past
            scrub: true
          }
        });
      }
    });

    // Background image scrub parallax within the cards
    gsap.utils.toArray('.card-bg-img').forEach((img: any) => {
      gsap.fromTo(img, 
        { y: -30, scale: 1.15 },
        { y: 30, scale: 1.15, ease: "none", scrollTrigger: { trigger: img.closest('.service-card'), start: "top bottom", end: "bottom top", scrub: true } }
      );
    });

  }, { scope: container });

  return (
    <div ref={container} className="home-glass-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ─── KINETIC HERO ─── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '160px 5vw 80px', overflow: 'hidden' }}>
        
        {/* Background elements */}
        <div style={{ position: 'absolute', inset: 0, zIndex: -3 }}>
           <video src="/vid2.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.1)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.7) 100%), linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 40%, transparent 60%, rgba(3,3,3,1) 100%)', zIndex: -2 }} />
        
        {/* Ambient floating blobs */}
        <div className="home-blob hero-element" style={{ width: '50vw', height: '50vw', background: 'var(--red)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.15, filter: 'blur(150px)', zIndex: -1 }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1200px', width: '100%' }}>
            <div className="glass-badge hero-element" style={{ marginBottom: '32px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(232,0,13,0.3)', boxShadow: '0 0 20px rgba(232,0,13,0.2)' }}>
              <div className="glass-badge-dot" /> COMPREHENSIVE PROTOCOLS
            </div>
            
            <h1 className="display hero-element" style={{ fontSize: 'clamp(2.5rem, 10vw, 10rem)', lineHeight: '0.9', margin: '0 0 24px 0', textShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
              ELITE <span className="text-gradient-red" style={{ padding: '0.05em 0' }}>LOGISTICS</span> CAPABILITIES.
            </h1>
            
            <p className="mono hero-element" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto 48px', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal' }}>
              We orchestrate hyper-efficient supply chain execution across multiple specialized disciplines. Complete transparency, zero compromise.
            </p>

            <div className="hero-element" style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '16px 24px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <Zap size={20} color="var(--red)"/> <span className="mono" style={{ fontSize: '0.85rem' }}>RAPID DISPATCH</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '16px 24px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <ShieldCheck size={20} color="var(--red)"/> <span className="mono" style={{ fontSize: '0.85rem' }}>SECURED CARGO</span>
              </div>
            </div>
        </div>
      </section>

      {/* ─── STICKY CARD STACK SECTION ─── */}
      <section style={{ padding: '40px 5vw 240px', background: '#030303', position: 'relative' }}>
         <div className="container" style={{ maxWidth: '1200px' }}>
            
            {services.map((s, i) => (
              <div key={i} className="service-card" style={{ 
                position: 'sticky', 
                top: `${100 + i * 40}px`,  // Cards stack slightly below the previous one
                paddingTop: '20px',        // visual offset
                marginBottom: '100px',     // scrolling distance between cards
                zIndex: i + 1              // Ensures correct overlapping
              }}>
                 
                 {/* The actual visual glass card that receives the scale/opacity animation */}
                 <div className="service-card-inner" style={{ 
                   height: 'max-content',
                   minHeight: '600px', /* Ensure it looks like a huge premium card */
                   background: 'rgba(12, 12, 12, 0.95)',
                   border: '1px solid rgba(255,255,255,0.08)',
                   borderRadius: '32px',
                   position: 'relative',
                   overflow: 'hidden',
                   display: 'grid',
                   gridTemplateColumns: '1fr 1fr',
                   boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
                   transformOrigin: 'top center'
                 }}>
                    
                    {/* Media Half */}
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(12,12,12,0) 0%, rgba(12,12,12,1) 100%)', zIndex: 10 }} className="card-gradient-mask" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,12,12,1) 0%, transparent 100%)', zIndex: 10, display: 'none' }} className="card-gradient-mask-mobile" />
                      
                      <img className="card-bg-img" src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: s.imgPosition || 'center' }} />
                      
                      <span className="display text-red" style={{ position: 'absolute', top: '24px', left: '24px', fontSize: '10rem', opacity: 0.15, lineHeight: 0.8, zIndex: 5 }}>{s.num}</span>
                    </div>

                    {/* Content Half */}
                    <div className="card-content-wrap" style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
                       <p className="mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '16px', fontWeight: 'bold' }}>{s.category}</p>
                       <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#fff', marginBottom: '32px', lineHeight: '1' }}>{s.title}</h2>
                       <p className="mono" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal', marginBottom: '48px' }}>{s.desc}</p>
                       
                       <div>
                         <Link href="/contact" className="glass-btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', borderRadius: '100px', fontSize: '1.25rem', fontFamily: "'Bebas Neue', sans-serif" }}>
                           REQUEST DISPATCH <ArrowUpRight />
                         </Link>
                       </div>
                    </div>

                 </div>
                 
              </div>
            ))}

         </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ padding: '0 5vw 160px', background: '#030303' }}>
         <div className="container" style={{ maxWidth: '1200px' }}>
            <div className="glass-panel" style={{ padding: '100px 40px', textAlign: 'center', border: '1px solid rgba(232, 0, 13, 0.2)', position: 'relative', overflow: 'hidden', borderRadius: '32px' }}>
              <video src="/vid3.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, zIndex: -2, borderRadius: 'inherit' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(232,0,13,0.1) 0%, rgba(3,3,3,0.95) 100%)', zIndex: -1, borderRadius: 'inherit' }} />

              <h2 className="display" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '24px', textShadow: '0 10px 30px rgba(0,0,0,0.6)', lineHeight: 1 }}>
                SECURE YOUR <span className="text-gradient-red">ADVANTAGE.</span>
              </h2>
              <p className="mono" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', textTransform: 'none', letterSpacing: 'normal', marginBottom: '48px', maxWidth: '650px', margin: '0 auto 48px', lineHeight: '1.6' }}>
                Phantom Logistics is fully equipped. Align our expansive fleet capabilities with your specific shipping requirements today.
              </p>
              <Link href="/contact" className="glass-btn" style={{ boxShadow: '0 20px 40px rgba(232,0,13,0.3)' }}>
                CONSULT OPERATIONS <ArrowUpRight />
              </Link>
            </div>
         </div>
      </section>

    </div>
  );
}

