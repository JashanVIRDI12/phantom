"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-up", { y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 });
  }, { scope: container });

  return (
    <div ref={container} style={{ minHeight: '100vh' }}>
      <div className="page-header container">
        <p className="page-label mono hero-up">Headquarters</p>
        <h1 className="page-title display hero-up" style={{ maxWidth: '1000px' }}>
          INITIATE <span className="text-red">DISPATCH CONTACT.</span>
        </h1>
        <p className="text-xl text-muted hero-up" style={{ maxWidth: '700px' }}>
           Our command center is prepared 24/7. Reach out to our operational representatives to instantly secure a brutally competitive freight quote or request emergency support details.
        </p>
      </div>

      <div className="section section-gray">
          <div className="container grid-2-sidebar hero-up">
               <div style={{ background: 'var(--white)', padding: '64px', border: '1px solid var(--border)' }} className="clip-top">
                   <h2 className="display" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>SEND A SECURE DIRECTIVE.</h2>
                   <p className="text-muted mb-8">We will process your encrypted request and a tactical representative will reach back within tight 24-hour turnaround windows.</p>
                   
                   <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={(e) => e.preventDefault()}>
                       <div className="grid-2" style={{ gap: '24px' }}>
                         <div>
                           <label className="label mono">First Name</label>
                           <input type="text" className="field" required />
                         </div>
                         <div>
                           <label className="label mono">Last Name</label>
                           <input type="text" className="field" required />
                         </div>
                       </div>
                       <div className="grid-2" style={{ gap: '24px' }}>
                         <div>
                           <label className="label mono">Email Comms</label>
                           <input type="email" className="field" required />
                         </div>
                         <div>
                           <label className="label mono">Phone Dispatch Line</label>
                           <input type="tel" className="field" required />
                         </div>
                       </div>
                       <div>
                          <label className="label mono">Specific Service Required</label>
                          <input type="text" className="field" required placeholder="Dry Van, Refrigerated, Dedicated..." />
                       </div>
                       <div>
                          <label className="label mono">Encrypted Message Layout</label>
                          <textarea rows={6} className="field" style={{ resize: 'vertical' }} required placeholder="Describe cargo weight, pickup locations, unique parameters..."></textarea>
                       </div>
                       <button type="submit" className="btn-red" style={{ alignSelf: 'flex-start', marginTop: '16px' }}>
                         TRANSMIT DIRECTIVE <ArrowUpRight size={20} />
                       </button>
                   </form>
               </div>

               <div className="sticky-sidebar">
                  <p className="page-label mono mb-8">Internal Routing Map</p>
                  
                  <div className="contact-item">
                     <p className="label mono">DIRECT DISPATCH</p>
                     <p className="display text-red" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>902-403-0112</p>
                     <p className="mono font-bold" style={{ fontSize: '0.875rem' }}>EXT: 101</p>
                     <p className="text-muted" style={{ marginTop: '8px' }}>dispatch@phantomlogisticsinc.com</p>
                  </div>
                  
                  <div className="contact-item">
                     <p className="label mono">SAFETY AND MAINTENANCE</p>
                     <p className="display text-red" style={{ fontSize: '2rem', marginBottom: '8px' }}>EXT: 102</p>
                     <p className="text-muted">safety@phantomlogisticsinc.com</p>
                  </div>
                  
                  <div className="contact-item">
                     <p className="label mono">TRACKING PROTOCOLS</p>
                     <p className="display text-red" style={{ fontSize: '2rem', marginBottom: '8px' }}>EXT: 103</p>
                     <p className="text-muted">info@phantomlogisticsinc.com</p>
                  </div>

                  <div className="contact-item" style={{ borderBottom: 'none', margin: 0, padding: 0 }}>
                     <p className="label mono">ACCOUNTING DIV.</p>
                     <p className="display text-red" style={{ fontSize: '2rem', marginBottom: '8px' }}>EXT: 104</p>
                     <p className="text-muted">accounting@phantomlogisticsinc.com</p>
                  </div>

                  <div style={{ marginTop: '48px', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
                     <p className="label mono">TERMINAL DEPLOYMENTS</p>
                     <div className="mt-4">
                        <p className="font-bold">Toronto Terminal:</p>
                        <p className="text-muted text-sm">365 Healey Road, Unit 19<br/>Bolton, ON L7E 5C1, Canada</p>
                     </div>
                     <div className="mt-4">
                        <p className="font-bold">Truro Terminal:</p>
                        <p className="text-muted text-sm">415 Willow Street<br/>Truro, NS B2N 6T2, Canada</p>
                     </div>
                  </div>
               </div>
          </div>
      </div>
    </div>
  );
}
