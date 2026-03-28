"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const benefits = [
  { title: "COMPETITIVE PAY", desc: "Industry-competitive compensation packages with aggressive, regular performance reviews." },
  { title: "HEALTH BENEFITS", desc: "Comprehensive medical, dental, and vision coverage for you and your whole family." },
  { title: "FLEXIBLE SCHEDULES", desc: "We truly understand the demands of logistics work-life balance. Highly flexible options available." },
  { title: "CAREER GROWTH", desc: "Endless internal opportunities for rapid career advancement and total professional development." },
  { title: "MODERN EQUIPMENT", desc: "Drive and work with meticulously maintained, state-of-the-art dispatch and fleet equipment." },
  { title: "NATIONWIDE ROUTES", desc: "Explore constantly updating, dynamic freight routes and terminal locations across the country." },
];

const jobs = [
  { title: "CDL-A TRUCK DRIVER", location: "MULTIPLE LOCATIONS", type: "FULL-TIME", desc: "We're looking for experienced, elite drivers to join our expanding team. Excellent home time and competitive performance pay available." },
  { title: "LOGISTICS COORDINATOR", location: "HALIFAX, NS", type: "FULL-TIME", desc: "Coordinate aggressive shipments, manage demanding schedules, and consistently ensure flawlessly smooth logistics operations." },
  { title: "FLEET MAINT. TECHNICIAN", location: "DARTMOUTH, NS", type: "FULL-TIME", desc: "Keep our massive fleet in absolute top condition with your mechanical expertise and intense attention to detail." },
];

export default function CareerPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-up", { y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 });
    
    ScrollTrigger.batch(".reveal-block", {
      onEnter: (els) => gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }),
      start: "top 85%", once: true
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ minHeight: '100vh' }}>
      <div className="page-header container">
        <p className="page-label mono hero-up">Operations Careers</p>
        <h1 className="page-title display hero-up" style={{ maxWidth: '900px' }}>
          DRIVE WITH THE <span className="text-red">ELITE.</span>
        </h1>
        <p className="text-xl text-muted hero-up" style={{ maxWidth: '700px' }}>
          Build your career with Phantom Logistics and become part of a specialized team that aggressively values extreme safety, high reliability, and absolute excellence in long-distance logistics.
        </p>
      </div>

      <div className="section section-gray">
          <div className="container">
              <p className="page-label mono reveal-block">Why Work With Us</p>
              <h2 className="display reveal-block mb-16" style={{ fontSize: '4rem' }}>THE REWARDS OF EXCELLENCE.</h2>
              <div className="grid-3">
                 {benefits.map((b, i) => (
                    <div key={i} className="card clip-top reveal-block">
                       <h3 className="display" style={{ fontSize: '2rem' }}>{b.title}</h3>
                       <p className="text-muted">{b.desc}</p>
                    </div>
                 ))}
              </div>
          </div>
      </div>

      <div className="container section">
        <p className="page-label mono reveal-block">Current Operations</p>
        <h2 className="display reveal-block" style={{ fontSize: '4rem' }}>ACTIVE DEPLOYMENTS.</h2>
        <div style={{ borderTop: '4px solid var(--black)', marginTop: '40px' }} className="reveal-block">
           {jobs.map((j, i) => (
             <div key={i} className="job-row">
                 <div style={{ flex: 1, maxWidth: '800px' }}>
                    <h3 className="job-title display">{j.title}</h3>
                    <p className="text-muted" style={{ marginBottom: '24px', lineHeight: '1.7' }}>{j.desc}</p>
                    <div className="job-meta mono">
                       <span>{j.location}</span>
                       <span className="text-red" style={{ fontWeight: 'bold' }}>{j.type}</span>
                    </div>
                 </div>
                 <Link href="/contact" className="btn-outline">
                    APPLY NOW <ArrowUpRight size={20} />
                 </Link>
             </div>
           ))}
        </div>

        <div className="text-center mt-32 reveal-block">
           <h2 className="display" style={{ fontSize: '3rem', marginBottom: '24px' }}>DON'T SEE YOUR DREAM JOB?</h2>
           <p className="text-lg text-muted" style={{ marginBottom: '32px' }}>We're continually searching for intensely talented logistics individuals to join the team. Send us your resume.</p>
           <Link href="/contact" className="btn-red">SUBMIT RESUME <ArrowUpRight /></Link>
        </div>
      </div>

      <div className="section section-black text-center">
         <div className="container">
             <h2 className="display" style={{ fontSize: '4rem', marginBottom: '24px' }}>PHANTOM CULTURE.</h2>
             <p className="text-xl text-white mx-auto mb-16" style={{ maxWidth: '800px', opacity: 0.6 }}>
                 We believe our people are our massive, unquestionable greatest asset. When you join our operations center, you become part of a family that forces your growth to the top.
             </p>
             <div className="display flex" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--red)', justifyContent: 'center', flexWrap: 'wrap', gap: '32px 64px' }}>
                 <span>SAFETY FIRST.</span>
                 <span>TEAMWORK.</span>
                 <span>INTEGRITY.</span>
                 <span>EXCELLENCE.</span>
                 <span>INNOVATION.</span>
             </div>
         </div>
      </div>
    </div>
  );
}
