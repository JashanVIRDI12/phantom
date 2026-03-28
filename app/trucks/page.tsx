"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const fleet = [
  { name: "FREIGHTLINER CASCADIA", type: "PROFESSIONAL MACHINE", specs: { payload: "48K LBS", interchangeable: "YES", security: "MAXIMUM" }, img: "/freightliner.png" },
  { name: "KENWORTH T680", type: "AERODYNAMIC RIG", specs: { payload: "45K LBS", interchangeable: "YES", security: "MAXIMUM" }, img: "/kenworth.png" },
  { name: "PETERBILT 579", type: "PREMIUM HAULER", specs: { payload: "44K LBS", interchangeable: "YES", security: "MAXIMUM" }, img: "/peterbilt.png" },
  { name: "VOLVO VNL 860", type: "LONG HAUL COMMAND", specs: { payload: "47K LBS", interchangeable: "YES", security: "MAXIMUM" }, img: "/volvo_vnl.png" },
];

export default function TrucksPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-up", { y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 });
    
    ScrollTrigger.batch(".truck-card", {
      onEnter: (els) => gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }),
      start: "top 85%", once: true
    });
  }, { scope: container });

  return (
    <div ref={container} className="page-header" style={{ minHeight: '100vh' }}>
      <div className="container">
        <p className="page-label mono hero-up">Professional Fleet</p>
        <h1 className="page-title display hero-up">
          MODERN TRUCKS.<br/><span className="text-red">ANY CARGO.</span>
        </h1>
        <p className="text-xl text-muted hero-up" style={{ marginBottom: '80px', maxWidth: '800px' }}>
          Our professional fleet is defined by exceptionally well-maintained, aggressively powerful modern machines. Outfitted with completely interchangeable trailers, we seamlessly tailor our equipment to exactly fit your unique transportation circumstances.
        </p>

        <div className="grid-2">
          {fleet.map((t, i) => (
             <div key={i} className="card truck-card clip-top hero-up" style={{ display: 'flex', flexDirection: 'column' }}>
                <p className="tag-red mono">{t.type}</p>
                <h2 className="display" style={{ fontSize: '3rem', marginBottom: '24px' }}>{t.name}</h2>
                <div style={{ width: '100%', height: '300px', backgroundColor: 'var(--white-2)', marginBottom: '32px', overflow: 'hidden' }}>
                    <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="truck-img" />
                </div>
                <div className="truck-specs" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                  <div>
                     <p className="spec-label mono font-bold text-red" style={{ fontSize: '0.8rem', marginBottom: '8px' }}>Payload Capacity</p>
                     <p className="spec-val display" style={{ fontSize: '1.5rem' }}>{t.specs.payload}</p>
                  </div>
                  <div>
                     <p className="spec-label mono font-bold text-red" style={{ fontSize: '0.8rem', marginBottom: '8px' }}>Interchangeable Trailer</p>
                     <p className="spec-val display" style={{ fontSize: '1.5rem' }}>{t.specs.interchangeable}</p>
                  </div>
                  <div>
                     <p className="spec-label mono font-bold text-red" style={{ fontSize: '0.8rem', marginBottom: '8px' }}>Transit Security</p>
                     <p className="spec-val display" style={{ fontSize: '1.5rem' }}>{t.specs.security}</p>
                  </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
