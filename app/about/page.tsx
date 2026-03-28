"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-up", { y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 });
    
    ScrollTrigger.batch(".reveal-block", {
      onEnter: (els) => gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }),
      start: "top 85%", once: true
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ minHeight: '100vh' }}>
      <div className="page-header container">
        <p className="page-label mono hero-up">Operations Command</p>
        <h1 className="page-title display hero-up">
          A TRUSTED NAME IN <span className="text-red">LOGISTICS.</span>
        </h1>
        <p className="page-desc text-xl hero-up">
           With over 5 years of ruthless efficiency in the transportation industry, Phantom Logistics has established itself as an elite, heavily trusted name in supply chain management.
        </p>
      </div>
        
      <div className="section-gray section" style={{ padding: '120px 0' }}>
         <div className="container grid-2-asym">
            <div className="reveal-block">
               <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '32px', lineHeight: 0.9 }}>
                 OPERATIONAL EXPERTISE NEVER SETTLES.
               </h2>
               <p className="text-lg text-muted mb-8">
                 We pride ourselves on delivering exceptional service, guaranteed on-time performance, and innovative strategic solutions that forcefully assist our clients in succeeding inside today's hyper-competitive business environments.
               </p>
               <p className="text-lg text-muted">
                 Phantom Logistics believes our people are our absolute greatest asset. From the dispatch room to the highway, our culture of respect, safety, and uncompromising integrity ensures that your goods are managed by professionals who care about the mission just as much as you do.
               </p>
            </div>
            <div className="reveal-block" style={{ position: 'relative', height: '100%', minHeight: '500px', width: '100%', border: '1px solid var(--border)', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
               <div className="display text-black" style={{ fontSize: '20rem', opacity: 0.03, lineHeight: '0.8' }}>P<br/>L</div>
            </div>
         </div>
      </div>

      <div className="container" style={{ padding: '120px 0' }}>
        <p className="page-label mono reveal-block text-center">Operational Footprint</p>
        <div className="grid-4 reveal-block" style={{ marginTop: '48px' }}>
            {[ 
               { val: "5+", lbl: "YEARS EXP" },
               { val: "11K", lbl: "SHIPMENTS" },
               { val: "10M", lbl: "MILES DRIVEN" },
               { val: "24/7", lbl: "SUPPORT" },
            ].map((s,i) => (
               <div key={i} className="card clip-top text-center" style={{ padding: '64px 32px' }}>
                  <p className="display text-red" style={{ fontSize: '5rem', marginBottom: '16px' }}>{s.val}</p>
                  <p className="mono text-black" style={{ fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 'bold' }}>{s.lbl}</p>
               </div>
            ))}
        </div>
      </div>
    </div>
  );
}
