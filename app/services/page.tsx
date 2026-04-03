"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import "../home-glass.css"; 

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  { num: "01", title: "DRY VAN TRUCKING", desc: "Standard freight transportation doesn't have to be ordinary. We utilize heavily secure, weather-protected trailers designed to move massive volumes of general merchandise flawlessly and with absolute precision.", img: "/img1.jpg", isPhoto: true, imgPosition: "center bottom" },
  { num: "02", title: "REFRIGERATED TRANSPORT", desc: "Temperature deviation is unacceptable. Our state-of-the-art climate-controlled fleet handles perishable goods and pharmaceuticals with intense, food-grade safety standards that guarantee integrity from origin to destination.", img: "/img2.png", isPhoto: true },
  { num: "03", title: "DEDICATED FLEET", desc: "Gain exclusive access to our modern trucks and interchangeable trailers. Build a private fleet operated by our tactical transport teams dedicated entirely to mapping and executing your unique supply chain.", img: "/img3.png", isPhoto: true, imgPosition: "left center" },
];

export default function ServicesPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Initial hidden states for anti-flickering
    gsap.set(".gsap-reveal", { autoAlpha: 0, y: 60 });
    gsap.set(".hero-anim", { autoAlpha: 0, y: 50 });
    gsap.set(".gsap-slide-up", { autoAlpha: 0, y: 80 });

    // 2. Hero sequence
    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(".hero-anim-1", { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(".hero-anim-2", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }, "-=0.6")
      .to(".hero-anim-3", { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

    // 3. Editorial scroll batches
    ScrollTrigger.batch(".gsap-slide-up", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", overwrite: true }),
      start: "top 80%", once: true
    });
    
    // Parallax logic for overlapping images and CTA
    gsap.utils.toArray('.glass-parallax').forEach((el: any) => {
      gsap.to(el, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    });

    // Image Parallax Effect
    gsap.utils.toArray('.img-parallax').forEach((img: any) => {
      gsap.fromTo(img, 
        { y: -30, scale: 1.15 },
        {
          y: 30, scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

  }, { scope: container });

  return (
    <div ref={container} className="home-glass-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ─── SERVICES HERO ─── */}
      <section style={{ minHeight: '80vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '160px 5vw 80px' }}>
        
        <div style={{ position: 'absolute', inset: 0, zIndex: -3 }}>
           {/* Zoomed in background video */}
           <video src="/vid2.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)' }} />
        </div>
        
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(3,3,3,0.3) 0%, rgba(3,3,3,0.9) 100%), linear-gradient(to bottom, rgba(3,3,3,0.5) 0%, transparent 40%, transparent 60%, #030303 100%)', zIndex: -2 }} />

        <div style={{ position: 'relative', zIndex: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1000px', width: '100%' }}>
            <div className="glass-badge hero-anim hero-anim-1" style={{ visibility: 'hidden', marginBottom: '24px', background: 'rgba(0,0,0,0.6)' }}>
              <div className="glass-badge-dot" /> COMPREHENSIVE CAPABILITIES
            </div>
            
            <div style={{ padding: '20px 0' }}>
              <h1 className="display" style={{ fontSize: 'clamp(4rem, 8vw, 7.5rem)', lineHeight: '1.1', margin: 0, textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <span className="text-white hero-anim hero-anim-2" style={{ visibility: 'hidden', display: 'block', padding: '0.05em 0' }}>TAILORED SOLUTIONS.</span>
                <span className="text-gradient-red hero-anim hero-anim-2" style={{ visibility: 'hidden', display: 'block', padding: '0.05em 0' }}>COMMANDING RATES.</span>
              </h1>
            </div>
            
            <p className="mono hero-anim hero-anim-3" style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(255,255,255,0.85)', 
              maxWidth: '800px',
              textTransform: 'none',
              letterSpacing: 'normal',
              lineHeight: '1.8',
              margin: '32px auto 0',
              visibility: 'hidden',
              textShadow: '0 4px 10px rgba(0,0,0,0.5)'
            }}>
              Not only do our partners appreciate our blistering shipment speeds and armored transportation, but they utilize our wide selection of logistical capabilities. No matter the cargo, Phantom Logistics is fully equipped to deploy right now.
            </p>
        </div>
      </section>

      {/* ─── MODERN EDITORIAL SERVICES GRID ─── */}
      <div className="container" style={{ padding: '80px 5vw 160px', overflowX: 'hidden' }}>
        {services.map((s, i) => (
          <div key={i} style={{ padding: '80px 0', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', alignItems: 'center', position: 'relative' }}>
            
            {/* Image Block (background layer) */}
            <div className="glass-image-panel gsap-slide-up" style={{ 
              gridColumn: i % 2 === 0 ? '4 / 13' : '1 / 10', 
              gridRow: '1',
              height: '550px', 
              backgroundColor: 'rgba(255,255,255,0.02)',
              visibility: 'hidden',
              border: '1px solid rgba(255,255,255,0.05)',
              zIndex: 1
            }}>
               <span className="display text-red" style={{ fontSize: '8rem', opacity: 0.05, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, whiteSpace: 'nowrap' }}>PHANTOM</span>
               <img className="img-parallax" src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: s.isPhoto ? 'cover' : 'contain', padding: s.isPhoto ? '0px' : '60px', position: 'relative', zIndex: 1, objectPosition: s.imgPosition || 'center' }} />
            </div>

            {/* Overlapping Text Card (foreground layer) */}
            <div className="gsap-slide-up" style={{ 
              gridColumn: i % 2 === 0 ? '1 / 7' : '7 / 13', 
              gridRow: '1',
              background: 'rgba(10, 10, 10, 0.7)', 
              backdropFilter: 'blur(32px)', 
              WebkitBackdropFilter: 'blur(32px)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '24px', 
              padding: '60px', 
              zIndex: 10,
              visibility: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
            }}>
              <span className="display text-gradient-red" style={{ fontSize: '6rem', lineHeight: '1', display: 'block', marginBottom: '16px', opacity: 0.6 }}>{s.num}</span>
              <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '24px', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.1)' }}>{s.title}</h2>
              <p className="mono" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', letterSpacing: 'normal', textTransform: 'none', marginBottom: '40px' }}>{s.desc}</p>
              <Link href="/contact" className="glass-btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', borderRadius: '100px', fontSize: '1.25rem', fontFamily: "'Bebas Neue', sans-serif" }}>
                REQUEST DISPATCH <ArrowUpRight />
              </Link>
            </div>

          </div>
        ))}

        {/* ─── CTA SECTION WITH ZOOMED VID3 ─── */}
        <section className="glass-section gsap-slide-up" style={{ padding: '160px 0 0', visibility: 'hidden' }}>
          <div className="glass-panel glass-parallax" style={{ padding: '140px 40px', textAlign: 'center', border: '1px solid rgba(232, 0, 13, 0.2)', position: 'relative', overflow: 'hidden' }}>
            
            <video src="/vid3.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: -2, borderRadius: 'inherit', transform: 'scale(1.15)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 0%, rgba(3,3,3,0.85) 100%)', zIndex: -1, borderRadius: 'inherit' }} />

            <h2 className="display" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '24px', textShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
              AND MANY MORE <span className="text-gradient-red">SPECIALIZED SERVICES.</span>
            </h2>
            <p className="mono" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', textTransform: 'none', letterSpacing: 'normal', marginBottom: '48px', maxWidth: '650px', margin: '0 auto 48px', lineHeight: '1.6' }}>
               Contact our operations command today to align our expansive fleet capabilities with your extremely specific shipping requirements.
            </p>
            <Link href="/contact" className="glass-btn" style={{ boxShadow: '0 20px 40px rgba(232,0,13,0.3)' }}>
              CONSULT OPERATIONS <ArrowUpRight />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
