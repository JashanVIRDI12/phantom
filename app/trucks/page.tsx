"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const fleet = [
  {
    id: "01",
    name: "FREIGHTLINER CASCADIA",
    type: "HEAVY DUTY MACHINE",
    desc: "The undisputed leader in fuel efficiency and aerodynamic design, the Cascadia represents the pinnacle of modern hauling technology. Engineered for peak performance over cross-country routes with uncompromising reliability.",
    specs: { payload: "48K LBS", interchangeable: "YES", security: "MAXIMUM", engine: "DETROIT DD15" },
    img: "/freightliner.png"
  },
  {
    id: "02",
    name: "KENWORTH T680",
    type: "AERODYNAMIC RIG",
    desc: "A masterclass in aerodynamic efficiency and driver comfort. The T680 cuts through wind resistance, ensuring swift, reliable transport while minimizing our environmental impact and maximizing load stability.",
    specs: { payload: "45K LBS", interchangeable: "YES", security: "MAXIMUM", engine: "PACCAR MX-13" },
    img: "/kenworth.png"
  },
  {
    id: "03",
    name: "PETERBILT 579",
    type: "PREMIUM HAULER",
    desc: "Combining classic, bold styling with state-of-the-art technological advancement. The 579 is the robust backbone of our heavy-duty long-haul operations, delivering power where it truly matters.",
    specs: { payload: "44K LBS", interchangeable: "YES", security: "MAXIMUM", engine: "CUMMINS X15" },
    img: "/peterbilt.png"
  },
  {
    id: "04",
    name: "VOLVO VNL 860",
    type: "LONG HAUL COMMAND",
    desc: "Unparalleled safety features and driver-focused ergonomics make the VNL 860 the ultimate choice for critical, high-value, time-sensitive freight. A true powerhouse built for the modern road.",
    specs: { payload: "47K LBS", interchangeable: "YES", security: "MAXIMUM", engine: "VOLVO D13" },
    img: "/volvo_vnl.png"
  },
];

export default function TrucksPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Text Animations
    const tl = gsap.timeline();
    tl.fromTo(".hero-line-inner",
      { yPercent: 120, rotateAngle: 5 },
      { yPercent: 0, rotateAngle: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.1 }
    );
    tl.fromTo(".hero-fade",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=0.8"
    );

    // Fleet Items Scroll Animations
    const fleetItems = gsap.utils.toArray(".fleet-item");
    fleetItems.forEach((item: any) => {
      // Image Parallax
      const img = item.querySelector(".fleet-img");
      if (img) {
        gsap.fromTo(img,
          { scale: 1.15, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }

      // Staggered Content Reveal
      const texts = item.querySelectorAll(".fleet-text-reveal");
      if (texts.length > 0) {
        gsap.fromTo(texts,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            }
          }
        );
      }
      
      // Line expansion animation
      const hLine = item.querySelector(".line-expand");
      if (hLine) {
        gsap.fromTo(hLine, 
          { width: "0%" }, 
          { width: "100%", duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: item, start: "top 80%" } }
        );
      }
    });

  }, { scope: container });

  return (
    <div ref={container} style={{ overflow: "hidden" }}>
      {/* HEADER SECTION */}
      <section className="page-header container" style={{ paddingTop: '220px', paddingBottom: '120px' }}>
        <p className="page-label mono hero-fade" style={{ fontSize: '0.85rem' }}>Our Modern Fleet / Equipment</p>
        <h1 className="display" style={{ fontSize: 'clamp(4rem, 9vw, 11rem)', lineHeight: 0.85, margin: '24px 0 48px', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          <div style={{ overflow: 'hidden', paddingBottom: '10px', paddingTop: '10px' }}>
            <div className="hero-line-inner">Precision.</div>
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '10px', paddingTop: '10px' }}>
            <div className="hero-line-inner">Power. <span className="text-red">Capacity.</span></div>
          </div>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'end' }} className="hero-fade">
          <p className="text-xl text-muted" style={{ maxWidth: '600px' }}>
            Our professional fleet is defined by exceptionally well-maintained, aggressively powerful modern machines. Outfitted with completely interchangeable trailers, we seamlessly tailor our equipment to exactly fit your unique transportation circumstances.
          </p>
          <div style={{ textAlign: 'left' }}>
            <p className="mono font-bold" style={{ fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-light)' }}>ACTIVE FLEET SIZE</p>
            <p className="display text-black" style={{ fontSize: '4rem', lineHeight: 1 }}>250+ <span className="text-red" style={{ fontSize: '2rem' }}>UNITS</span></p>
          </div>
        </div>
      </section>

      {/* FLEET SHOWCASE */}
      <section className="section-gray" style={{ padding: '0', borderTop: 'none' }}>
        <div className="container">
          {fleet.map((truck, idx) => {
            const isReverse = idx % 2 !== 0;
            return (
              <div key={truck.id} className={`fleet-item serv-row ${isReverse ? 'reverse' : ''}`} style={{ padding: '140px 0', borderBottom: idx === fleet.length - 1 ? 'none' : '1px solid var(--border)', rowGap: '64px' }}>
                
                {/* Visual Block */}
                <div className="fleet-img-wrapper" style={{ height: '700px', width: '100%', overflow: 'hidden', backgroundColor: 'var(--border)' }}>
                  <img className="fleet-img" src={truck.img} alt={truck.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                {/* Content Block */}
                <div style={{ padding: isReverse ? '0' : '0' }}>
                  <div className="fleet-text-reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <span className="mono display text-red" style={{ fontSize: '2.5rem', lineHeight: 1 }}>{truck.id}</span>
                    <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border)' }} />
                  </div>
                  
                  <h2 className="display fleet-text-reveal" style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)', margin: '0 0 16px 0', lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                    {truck.name.split(' ').map((word, i) => (
                      <span key={i} style={{ display: 'block', color: i === 1 ? 'var(--text-muted)' : 'var(--text-main)' }}>{word}</span>
                    ))}
                  </h2>
                  
                  <div className="fleet-text-reveal" style={{ marginTop: '32px' }}>
                    <p className="tag-red mono" style={{ marginBottom: '40px', fontSize: '0.8rem', letterSpacing: '0.15em' }}>{truck.type}</p>
                  </div>
                  
                  <p className="text-lg text-muted fleet-text-reveal" style={{ marginBottom: '64px', maxWidth: '480px' }}>
                    {truck.desc}
                  </p>
                  
                  {/* Specs Grid */}
                  <div style={{ position: 'relative', paddingTop: '40px' }}>
                    <div className="line-expand" style={{ position: 'absolute', top: 0, left: 0, height: '1px', backgroundColor: 'var(--border-dark)', width: '0%' }} />
                    <div className="grid-2 fleet-text-reveal" style={{ gap: '32px 16px' }}>
                      <div>
                        <p className="mono font-bold" style={{ fontSize: '0.75rem', marginBottom: '8px', color: 'var(--text-light)' }}>ENGINE / POWERTRAIN</p>
                        <p className="display" style={{ fontSize: '1.8rem', letterSpacing: '0.02em', color: 'var(--text-main)' }}>{truck.specs.engine}</p>
                      </div>
                      <div>
                        <p className="mono font-bold" style={{ fontSize: '0.75rem', marginBottom: '8px', color: 'var(--text-light)' }}>MAX PAYLOAD</p>
                        <p className="display" style={{ fontSize: '1.8rem', letterSpacing: '0.02em', color: 'var(--text-main)' }}>{truck.specs.payload}</p>
                      </div>
                      <div>
                        <p className="mono font-bold" style={{ fontSize: '0.75rem', marginBottom: '8px', color: 'var(--text-light)' }}>INTERCHANGEABLE</p>
                        <p className="display text-red" style={{ fontSize: '1.8rem', letterSpacing: '0.02em' }}>{truck.specs.interchangeable}</p>
                      </div>
                      <div>
                        <p className="mono font-bold" style={{ fontSize: '0.75rem', marginBottom: '8px', color: 'var(--text-light)' }}>TRANSIT SECURITY</p>
                        <p className="display" style={{ fontSize: '1.8rem', letterSpacing: '0.02em', color: 'var(--text-main)' }}>{truck.specs.security}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section className="section-black" style={{ padding: '160px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="hero-fade">
            <p className="mono text-red" style={{ marginBottom: '24px', letterSpacing: '0.2em', fontWeight: 'bold' }}>READY TO MOVE?</p>
            <h2 className="display text-white" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', margin: '0 0 48px 0', lineHeight: 0.9 }}>
              SECURE YOUR <br/> <span style={{ color: 'var(--text-muted)' }}>TRANSPORT RIGHT NOW.</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-red" style={{ padding: '20px 48px', fontSize: '1.5rem', borderRadius: '0' }}>GET A QUOTE</Link>
              <Link href="/services" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--white)', padding: '20px 48px', fontSize: '1.5rem', borderRadius: '0' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--white)'; e.currentTarget.style.color = 'var(--black)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--white)'; }}
              >
                OUR SERVICES
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
