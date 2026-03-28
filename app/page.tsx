"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".hero-overlay", { height: 0, duration: 1.2, ease: "power4.inOut" })
      .from(".hero-title-main", { y: 100, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "-=0.5")
      .from(".hero-sub", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .from(".hero-btn", { scale: 0.9, opacity: 0, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2");

    ScrollTrigger.batch(".gsap-up", {
      onEnter: (els) => gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }),
      start: "top 85%", once: true
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <section className="hero">
        <div className="hero-bg">
          <img src="/hero-bg.png" alt="Truck hero" />
        </div>
        
        <div className="hero-overlay" />

        <div className="container hero-content">
          <div className="hero-title-wrap">
            <h1 className="hero-title-main display text-black">SEAMLESS</h1>
          </div>
          <div className="hero-title-wrap" style={{ marginBottom: '32px' }}>
            <h1 className="hero-title-main display text-red">DELIVERIES.</h1>
          </div>
          
          <div className="hero-bottom-row">
            <p className="hero-sub mono" style={{ textTransform: 'none', letterSpacing: 'normal' }}>
              Phantom Logistics engineers supply chain supremacy. As the top tier carrier in the local area, we provide uncompromised transit speeds with surgical precision. 
            </p>
            <div className="hero-btn">
              <Link href="/contact" className="btn-red">
                GET FREIGHT QUOTE <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee marquee-black">
        <div className="marquee-inner">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="marquee-item display">MERCENARY RELIABILITY</div>
              <div className="marquee-dot" />
              <div className="marquee-item display">FULL SATELLITE TRACKING</div>
              <div className="marquee-dot" />
              <div className="marquee-item display">INDUSTRY LEADING</div>
              <div className="marquee-dot" />
              <div className="marquee-item display">NATIONWIDE SCOPE</div>
              <div className="marquee-dot" />
            </div>
          ))}
        </div>
      </div>

      <section className="section section-gray">
        <div className="container">
          <p className="page-label mono gsap-up">The Phantom Difference</p>
          <div className="grid-2-asym gsap-up mb-16">
            <h2 className="display" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>
              FOR SHORT- OR LONG-DISTANCE TRANSPORTATION, WE SECURE THE <span className="text-red">BEST</span> DISTRIBUTION OF YOUR GOODS.
            </h2>
            <p className="text-lg text-muted">
              We take all necessary precautions when transporting your freight without slowing down the process. We are known for punctuality, seamless transparency, and the capacity to accommodate any haul load with extreme care.
            </p>
          </div>

          <div className="grid-3">
            {[ 
              { title: "DIVERSE FLEET", desc: "A massive, diverse range of vehicles engineered for any load size, ensuring special transportation requirements are handled easily and efficiently." },
              { title: "SURGICAL TRANSIT", desc: "Timely and hyper-efficient transportation mapping. We execute seamless deliveries utilizing real-time route optimization." },
              { title: "ARMORED SECURITY", desc: "Rest assured, your cargo is locked down. We take all necessary precautions for the intensely safe handling of all shipments across borders." }
            ].map((f, i) => (
              <div key={i} className={`card clip-top gsap-up ${i === 1 ? 'bg-black' : ''}`}>
                <span className="card-num mono">0{i+1}</span>
                <h3 className="display">{f.title}</h3>
                <p className="mono" style={{ textTransform: 'none', letterSpacing: 'normal' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-red" style={{ backgroundColor: 'var(--red)', padding: '120px 0' }}>
        <div className="container mx-auto">
           <div className="grid-4" style={{ marginTop: 0 }}>
              {[
                { v: "5+", l: "Years Of Relentless Experience" },
                { v: "11K+", l: "Total Shipments Executed" },
                { v: "10M+", l: "Miles Driven Nationwide" },
                { v: "24/7", l: "Tactical Dispatch Support" },
              ].map((s,i) => (
                 <div key={i} className="text-center gsap-up">
                    <p className="display text-white" style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '16px' }}>{s.v}</p>
                    <p className="mono font-bold" style={{ fontSize: '0.85rem', color: 'var(--black)' }}>{s.l}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="page-label mono gsap-up">Initiate Protocol</p>
          <h2 className="display gsap-up text-black" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', marginBottom: '32px' }}>READY TO <span className="text-red">SHIP WITH US?</span></h2>
          <p className="text-xl gsap-up text-muted" style={{ marginBottom: '48px', maxWidth: '600px' }}>
             Join hundreds of satisfied partners who trust Phantom Logistics to move their cargo when failure is simply not an option.
          </p>
          <Link href="/contact" className="btn-red gsap-up">
            SECURE YOUR FREIGHT QUOTE <ArrowUpRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
