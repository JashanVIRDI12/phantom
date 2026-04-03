"use client";
import React, { useRef, useEffect, MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import "../home-glass.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hidden initialization 
    gsap.set(".hero-anim", { autoAlpha: 0, y: 50 });
    gsap.set(".form-field", { autoAlpha: 0, x: -30 });
    gsap.set(".contact-map-item", { autoAlpha: 0, x: 50 });
    gsap.set(".contact-globe", { scale: 0.8, autoAlpha: 0 });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(".hero-anim", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" })
      .to(".contact-globe", { scale: 1, autoAlpha: 0.05, duration: 3, ease: "power4.out" }, "-=0.5");

    ScrollTrigger.batch(".form-field", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }),
      start: "top 85%", once: true
    });

    ScrollTrigger.batch(".contact-map-item", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }),
      start: "top 85%", once: true
    });
    
    // Continuous rotation for globe
    gsap.to(".contact-globe", { rotate: 360, duration: 60, repeat: -1, ease: "none" });

  }, { scope: container });



  return (
    <div ref={container} className="home-glass-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ─── CONTACT HERO ─── */}
      <section style={{ minHeight: '60vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '160px 5vw 80px' }}>
        
        <div className="home-ambient-bg" style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
           <div className="home-blob" style={{ background: 'var(--red)', opacity: 0.15, top: '-20vw', right: '-10vw', width: '60vw', height: '60vw', animation: 'none', filter: 'blur(120px)' }} />
           <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 0%, #030303 90%)', zIndex: -1 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px' }}>
          <div className="glass-badge hero-anim" style={{ marginBottom: '32px', background: 'rgba(0,0,0,0.5)', visibility: 'hidden' }}>
            <div className="glass-badge-dot" /> HEADQUARTERS
          </div>
          
          <div style={{ padding: '10px 0' }}>
            <h1 className="display hero-anim" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: '1.1', margin: 0, textShadow: '0 20px 40px rgba(0,0,0,0.5)', visibility: 'hidden' }}>
              INITIATE <span className="text-gradient-red" style={{ padding: '0.05em 0' }}>DISPATCH CONTACT.</span>
            </h1>
          </div>
          
          <p className="mono hero-anim" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', margin: '24px auto 0', lineHeight: 1.8, textTransform: 'none', letterSpacing: 'normal', maxWidth: '750px', visibility: 'hidden' }}>
            Our tactical command center is prepared 24/7. Reach out to our operational representatives to instantly secure a brutally competitive freight quote or request emergency support details.
          </p>
        </div>
      </section>

      {/* ─── NEXT-LEVEL CONTACT GRID ─── */}
      <section className="container mx-auto" style={{ padding: '40px 5vw 160px', overflow: 'hidden', maxWidth: '1400px' }}>
         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'start', perspective: '1200px' }}>
            
            {/* LEFT: Secure Form Layer */}
            <div 
               className="glass-panel" 
               style={{ 
                 flex: '1.6 1 650px',
                 padding: '80px', 
                 background: 'rgba(10, 10, 10, 0.65)', 
                 border: '1px solid rgba(255,255,255,0.08)',
                 position: 'relative',
                 overflow: 'hidden',
                 boxShadow: '0 40px 80px rgba(0,0,0,0.5)'
               }}
            >
               {/* Massive Rotating Globe Background Layer */}
               <img src="/globe.svg" alt="Globe" className="contact-globe" style={{ position: 'absolute', top: '10%', right: '-20%', width: '120%', opacity: 0, zIndex: 0, pointerEvents: 'none' }} />
               
               <div style={{ position: 'relative', zIndex: 10 }}>
                  <h2 className="display form-field" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#fff', marginBottom: '16px', lineHeight: 1, visibility: 'hidden' }}>SEND A SECURE <span className="text-gradient-red" style={{ padding: '0.05em 0' }}>DIRECTIVE.</span></h2>
                  <p className="mono form-field" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal', marginBottom: '40px', visibility: 'hidden' }}>
                    We routinely process encrypted logistics requests. A tactical representative will relay communications within extreme 24-hour turnaround windows.
                  </p>
                  
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} onSubmit={(e) => e.preventDefault()}>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                       <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px', visibility: 'hidden' }}>
                         <label className="mono text-red" style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>FIRST NAME</label>
                         <input type="text" required style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'inherit', borderRadius: '4px', backdropFilter: 'blur(10px)' }} className="glass-input" />
                       </div>
                       <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px', visibility: 'hidden' }}>
                         <label className="mono text-red" style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>LAST NAME</label>
                         <input type="text" required style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'inherit', borderRadius: '4px', backdropFilter: 'blur(10px)' }} className="glass-input" />
                       </div>
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                       <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px', visibility: 'hidden' }}>
                         <label className="mono text-red" style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>EMAIL COMMS</label>
                         <input type="email" required style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'inherit', borderRadius: '4px', backdropFilter: 'blur(10px)' }} className="glass-input" />
                       </div>
                       <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px', visibility: 'hidden' }}>
                         <label className="mono text-red" style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>PHONE DISPATCH LINE</label>
                         <input type="tel" required style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'inherit', borderRadius: '4px', backdropFilter: 'blur(10px)' }} className="glass-input" />
                       </div>
                     </div>

                     <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px', visibility: 'hidden' }}>
                       <label className="mono text-red" style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>SPECIFIC SERVICE REQUIRED</label>
                       <input type="text" required placeholder="Dry Van, Refrigerated, Dedicated..." style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'inherit', borderRadius: '4px', backdropFilter: 'blur(10px)' }} className="glass-input" />
                     </div>

                     <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px', visibility: 'hidden' }}>
                       <label className="mono text-red" style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>ENCRYPTED MESSAGE LAYOUT</label>
                       <textarea rows={5} required placeholder="Describe cargo weight, pickup locations, unique parameters..." style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'inherit', borderRadius: '4px', resize: 'vertical', backdropFilter: 'blur(10px)' }} className="glass-input" />
                     </div>

                     <button type="submit" className="glass-btn form-field" style={{ alignSelf: 'flex-start', marginTop: '16px', fontSize: '1.2rem', padding: '16px 36px', visibility: 'hidden', border: '1px solid rgba(232,0,13,0.5)', background: 'rgba(232,0,13,0.1)', boxShadow: '0 0 20px rgba(232,0,13,0.2)' }}>
                       TRANSMIT DIRECTIVE <ArrowUpRight size={20} />
                     </button>
                  </form>
               </div>
            </div>
            
            {/* RIGHT: Internal Routing Map */}
            <div style={{ flex: '1 1 350px', padding: '40px 0' }}>
               <div className="glass-badge contact-map-item" style={{ marginBottom: '50px', background: 'rgba(255,255,255,0.02)', visibility: 'hidden' }}>
                  <div className="glass-badge-dot"/> INTERNAL ROUTING MAP
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                  
                  {/* Item 1 */}
                  <div className="contact-map-item" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'center', visibility: 'hidden' }}>
                     <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(232,0,13,0.1)', border: '1px solid rgba(232,0,13,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)' }}>
                        <Phone size={28} />
                     </div>
                     <div>
                        <p className="mono font-bold text-red" style={{ fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '8px' }}>DIRECT DISPATCH</p>
                        <h3 className="display" style={{ fontSize: '2.5rem', color: '#fff', lineHeight: 1 }}>902-403-0112</h3>
                        <p className="mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '8px' }}>EXT: 101 <span style={{ opacity: 0.3, margin: '0 8px' }}>|</span> dispatch@phantomlogisticsinc.com</p>
                     </div>
                  </div>

                  {/* Item 2 */}
                  <div className="contact-map-item" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'center', visibility: 'hidden' }}>
                     <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <Mail size={24} />
                     </div>
                     <div>
                        <p className="mono font-bold text-red" style={{ fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '8px' }}>SAFETY & MAINTENANCE</p>
                        <h3 className="display" style={{ fontSize: '2rem', color: '#fff', lineHeight: 1 }}>EXT: 102</h3>
                        <p className="mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '8px' }}>safety@phantomlogisticsinc.com</p>
                     </div>
                  </div>

                  {/* Item 3 */}
                  <div className="contact-map-item" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'center', visibility: 'hidden' }}>
                     <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <Mail size={24} />
                     </div>
                     <div>
                        <p className="mono font-bold text-red" style={{ fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '8px' }}>TRACKING PROTOCOLS</p>
                        <h3 className="display" style={{ fontSize: '2rem', color: '#fff', lineHeight: 1 }}>EXT: 103</h3>
                        <p className="mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '8px' }}>info@phantomlogisticsinc.com</p>
                     </div>
                  </div>

                  {/* Item 4 */}
                  <div className="contact-map-item" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'center', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', visibility: 'hidden' }}>
                     <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <Mail size={24} />
                     </div>
                     <div>
                        <p className="mono font-bold text-red" style={{ fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '8px' }}>ACCOUNTING DIV.</p>
                        <h3 className="display" style={{ fontSize: '2rem', color: '#fff', lineHeight: 1 }}>EXT: 104</h3>
                        <p className="mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '8px' }}>accounting@phantomlogisticsinc.com</p>
                     </div>
                  </div>

                  {/* Terminals */}
                  <div className="contact-map-item" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', visibility: 'hidden' }}>
                     <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--red)' }}>
                           <MapPin size={18} /> <span className="mono font-bold" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>TORONTO TERMINAL</span>
                        </div>
                        <p className="mono" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', textTransform: 'none', letterSpacing: 'normal', lineHeight: 1.8 }}>
                           365 Healey Road, Unit 19<br/>Bolton, ON L7E 5C1, Canada
                        </p>
                     </div>
                     <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--red)' }}>
                           <MapPin size={18} /> <span className="mono font-bold" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>TRURO TERMINAL</span>
                        </div>
                        <p className="mono" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', textTransform: 'none', letterSpacing: 'normal', lineHeight: 1.8 }}>
                           415 Willow Street<br/>Truro, NS B2N 6T2, Canada
                        </p>
                     </div>
                  </div>

               </div>
            </div>

         </div>
      </section>

    </div>
  );
}
