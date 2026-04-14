"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ShieldCheck, Globe, PackageOpen } from "lucide-react";
import "./home-glass.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Explicitly set initial states for all animated elements to prevent flickering
    gsap.set(".gsap-reveal", { autoAlpha: 0, y: 60 });
    gsap.set(".hero-anim", { autoAlpha: 0, y: 50 });
    gsap.set(".hero-scale", { autoAlpha: 0, scale: 0.95 });


    // 2. Play Hero timeline
    const tl = gsap.timeline({ delay: 0.2 });

    // Staggered hero entrance
    tl.to(".hero-anim-1", { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(".hero-anim-2", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" }, "-=0.6")
      .to(".hero-anim-3", { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .to(".hero-scale", { autoAlpha: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" }, "-=0.5");

    // Scroll-triggered reveals for rest of the page
    ScrollTrigger.batch(".gsap-reveal", {
      onEnter: (elements) => {
        gsap.to(elements, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          overwrite: true
        });
      },
      start: "top 85%",
      once: true
    });

    // Parallax elements
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

  }, { scope: container });

  // Mouse tracking for authentic glassmorphism hover highlights
  useEffect(() => {
    const cards = document.querySelectorAll(".glass-card");
    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={container} className="home-glass-wrapper">

      {/* ─── NEW CENTRALLY REDESIGNED HERO SECTION WITH VISIBLE VIDEO ─── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '180px 5vw 80px' }}>
        
        {/* Full Screen Cinematic Hero Video */}
        <div style={{ position: 'absolute', inset: 0, zIndex: -3 }}>
           <video src="/vid1.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)' }} />
        </div>
        
        {/* A much lighter gradient so the video shines! We just need darkness at the very bottom and top for nav/content clarity */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(3,3,3,0.3) 0%, rgba(3,3,3,0.7) 100%), linear-gradient(to bottom, rgba(3,3,3,0.5) 0%, transparent 30%, transparent 70%, #030303 100%)', zIndex: -2 }} />


        {/* Centered Typography Hero Focus */}
        <div style={{ position: 'relative', zIndex: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1000px', width: '100%' }}>
            
            <div className="glass-badge hero-anim hero-anim-1" style={{ visibility: 'hidden', marginBottom: '32px', background: 'rgba(0,0,0,0.6)' }}>
              <div className="glass-badge-dot" /> FAST TRANSIT. FULL VISIBILITY.
            </div>
            
            <div style={{ padding: '20px 0' }}>
              <h1 className="display" style={{ fontSize: 'clamp(3rem, 11vw, 10rem)', lineHeight: '1.1', margin: 0, textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <span className="text-white hero-anim hero-anim-2" style={{ visibility: 'hidden', display: 'block', padding: '0.05em 0' }}>SEAMLESS</span>
                <span className="text-gradient-red hero-anim hero-anim-2" style={{ visibility: 'hidden', display: 'block', padding: '0.05em 0' }}>DELIVERIES.</span>
              </h1>
            </div>
            
            <p className="mono hero-anim hero-anim-3" style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(255,255,255,0.85)', 
              maxWidth: '650px',
              textTransform: 'none',
              letterSpacing: 'normal',
              lineHeight: '1.8',
              margin: '32px auto 48px',
              visibility: 'hidden',
              textShadow: '0 4px 10px rgba(0,0,0,0.5)'
            }}>
              Phantom Logistics delivers fast, reliable transportation backed by real-time tracking. From local hauls to long-distance freight, every shipment is handled with precision and accountability.
            </p>
            
            <div className="hero-scale" style={{ visibility: 'hidden' }}>
              <Link href="/contact" className="glass-btn" style={{ boxShadow: '0 15px 40px rgba(232,0,13,0.4)' }}>
                GET FREIGHT QUOTE <ArrowUpRight />
              </Link>
            </div>
        </div>

      </section>

      {/* ─── STATS SECTION ─── */}
      <section className="container mx-auto" style={{ padding: '0 5vw', margin: '40px auto 120px', display: 'flex', justifyContent: 'center', zIndex: 10, position: 'relative' }}>
        <div className="glass-panel gsap-reveal grid-4" style={{ width: '100%', visibility: 'hidden' }}>
          {[
            { v: "5+", l: "Years Relentless" },
            { v: "11K+", l: "Total Shipments" },
            { v: "10M+", l: "Miles Driven" },
            { v: "24/7", l: "Tactical Dispatch" },
          ].map((s,i) => (
            <div key={i} className="glass-stat">
              <p className="display text-gradient-red" style={{ fontSize: '4rem', lineHeight: '1', marginBottom: '12px' }}>{s.v}</p>
              <p className="mono font-bold" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SCROLLING MARQUEE ─── */}
      <div className="marquee-glass gsap-reveal" style={{ visibility: 'hidden' }}>
        <div className="marquee-glass-inner">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
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

      {/* ─── FEATURES GRID ─── */}
      <section className="glass-section container mx-auto" style={{ padding: '160px 5vw', position: 'relative' }}>
        <div className="home-ambient-bg" style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
          <div className="home-blob home-blob-2" style={{ opacity: 0.1, background: '#110002' }} />
        </div>
        
        <div className="gsap-reveal mb-16" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 80px', visibility: 'hidden' }}>
          <div className="glass-badge" style={{ margin: '0 auto 24px' }}>
            <div className="glass-badge-dot" /> BUILT FOR EVERY DISTANCE
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>
            BUILT FOR EVERY DISTANCE. TRUSTED FOR EVERY <span className="text-gradient-red">LOAD.</span>
          </h2>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px', lineHeight: '1.8' }}>
            From local routes to long-distance freight, we maintain the same level of control and consistency across every shipment. With disciplined operations and real-time tracking, we deliver without delays or uncertainty.
          </p>
        </div>

        <div className="glass-grid-3">
          {[ 
            { icon: PackageOpen, title: "DIVERSE FLEET", desc: "A flexible fleet designed to handle every freight seamlessly. We match the right vehicle to your shipment so every delivery moves efficiently without delays or constraints." },
            { icon: Globe, title: "SMART ROUTING", desc: "We plan and execute every route with efficiency in mind. Using real-time tracking and smart routing, we reduce delays, improve transit time, and keep your shipments moving without disruption." },
            { icon: ShieldCheck, title: "CARGO PROTECTION", desc: "Your cargo is handled with strict safety protocols at every stage. From pickup to delivery, we ensure secure movement, careful handling, and complete accountability." }
          ].map((f, i) => (
            <div key={i} className="glass-card gsap-reveal" style={{ visibility: 'hidden' }}>
              <div className="glass-icon-wrap">
                <f.icon style={{ width: 32, height: 32 }} />
              </div>
              <h3 className="display" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{f.title}</h3>
              <p className="mono" style={{ textTransform: 'none', letterSpacing: 'normal', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CALL TO ACTION ─── */}
      <section className="glass-section container mx-auto gsap-reveal" style={{ padding: '0 5vw 160px', visibility: 'hidden' }}>
        <div className="glass-panel glass-parallax" style={{ padding: '100px 40px', textAlign: 'center', border: '1px solid rgba(232, 0, 13, 0.2)' }}>
          <div className="home-blob" style={{ background: 'var(--red)', width: '40vw', height: '40vw', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: '0.15', zIndex: -1 }} />
          
          <div className="glass-badge" style={{ margin: '0 auto 24px' }}>
             <div className="glass-badge-dot" /> LET&rsquo;S GET MOVING
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', marginBottom: '24px' }}>
            LET&rsquo;S GET YOUR <span className="text-gradient-red">SHIPMENT MOVING.</span>
          </h2>
          <p className="text-xl" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '48px', maxWidth: '640px', margin: '0 auto 48px', lineHeight: '1.7' }}>
            Work with a logistics partner that values speed, reliability, and clear communication. We handle your shipments so your operations stay on track.
          </p>
          <Link href="/contact" className="glass-btn">
            GET FREIGHT QUOTE <ArrowUpRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
