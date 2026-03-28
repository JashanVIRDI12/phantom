"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  { num: "01", title: "DRY VAN TRUCKING", desc: "Standard dry freight transportation doesn't have to be ordinary. We utilize heavily secure, weather-protected trailers designed to move massive volumes of general merchandise flawlessly.", img: "/dry_van.png" },
  { num: "02", title: "REFRIGERATED TRANSPORT", desc: "Temperature deviation is unacceptable. Our state-of-the-art climate-controlled fleet handles perishable goods and pharmaceuticals with intense, food-grade safety standards.", img: "/refrigerated.png" },
  { num: "03", title: "DEDICATED FLEET", desc: "Gain exclusive access to our modern trucks and interchangeable trailers. Build a private fleet operated by our tactical transport teams dedicated entirely to your supply chain.", img: "/dedicated.png" },
  { num: "04", title: "REAL-TIME TRANSPARENCY", desc: "We provide unmatched visibility into the supply chain. Stay fully informed with live satellite updates, minute-by-minute progress reports, and robust shipment tracking details.", img: "/transparency.png" },
];

export default function ServicesPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-up", { y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 });
    
    ScrollTrigger.batch(".serv-row", {
      onEnter: (els) => gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }),
      start: "top 85%", once: true
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ paddingBottom: '40px', borderBottom: '1px solid var(--border)', maxWidth: 'none', margin: 0 }}>
        <div className="container">
          <p className="page-label mono hero-up">Comprehensive Capabilities</p>
          <h1 className="page-title display hero-up" style={{ maxWidth: '1000px', marginBottom: '40px' }}>
            TAILORED SOLUTIONS. <span className="text-red">COMMANDING RATES.</span>
          </h1>
          <p className="text-xl text-muted hero-up" style={{ maxWidth: '800px' }}>
            Not only do our partners appreciate our blistering shipment speeds and armored transportation, but they utilize our wide selection of logistical capabilities. No matter the cargo, Phantom Logistics is fully equipped to deploy right now.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '120px' }}>
        {services.map((s, i) => (
          <div key={i} className={`serv-row hero-up ${i % 2 !== 0 ? 'reverse' : ''}`}>
            <div>
              <span className="serv-num display">{s.num}</span>
              <h2 className="serv-title display">{s.title}</h2>
              <p className="serv-desc">{s.desc}</p>
              <Link href="/contact" className="btn-outline">
                REQUEST DISPATCH <ArrowUpRight />
              </Link>
            </div>
            <div className="serv-image-box" style={{ padding: 0 }}>
               <span className="display text-red" style={{ fontSize: '10rem', opacity: 0.05, position: 'absolute', zIndex: 0 }}>PHANTOM / {s.num}</span>
               <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
            </div>
          </div>
        ))}

        <div className="text-center mt-32 hero-up">
           <h2 className="display" style={{ fontSize: '4rem', marginBottom: '24px' }}>AND MANY MORE SPECIALIZED SERVICES.</h2>
           <p className="text-lg text-muted" style={{ marginBottom: '32px' }}>Contact our operations command today to align our capabilities with your specific shipping requirements.</p>
           <Link href="/contact" className="btn-red">CONSULT OPERATIONS <ArrowUpRight /></Link>
        </div>
      </div>
    </div>
  );
}
