"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../home-glass.css";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const faqs = [
  {
    question: "What Kinds of Things Can You Transport?",
    answer: "As a full-service trucking company, we’re happy to transport just about anything that complies with the law. From perishables to luxury goods, we offer safe and efficient freight transportation that we can tailor to any time constraint and any supplier specifications. If you need shipping and handling, we have you covered no matter what."
  },
  {
    question: "How Do I Get an Estimate for a Shipment?",
    answer: "If you need a shipment estimate, the first step is to give us a call. We’re happy to speak with you over the phone and go over the information we need to be able to get you an accurate quote. We’ll need to know the product type, dimensions, weight, as well as any additional details."
  },
  {
    question: "What’s the Difference Between Less-Than-Truckload and Full Truckload? Which One Do I Need?",
    answer: "Less-than-truckload (LTL) shipping is when your freight only needs a portion of the truck space. On the other hand, full truckload (FTL) shipping is when your load fills the truck.\n\nLTL trucking is perfect for small and medium-sized cargo that doesn’t require specialized care, and it is a cost-effective option. Our team recommends FTL trucking for larger shipments or fragile, temperature-sensitive freight."
  },
  {
    question: "How Should I Package My Items?",
    answer: "Depending on the items, packaging can differ. We recommend using shipping-grade boxes, crates, or containers specific to your industry. For heavier items, we always suggest double boxing just in case. It’s essential to cushion the contents, seal all closures, and label each item with the appropriate information.\n\nMost commonly, freight is either palletized or loose. Smaller items are often palletized, while larger ones remain as is. During the loading process, we’ll establish what’s best for your cargo, and we’ll place everything in the trailer safely and securely."
  },
  {
    question: "What Is Temperature-Controlled Freight Shipping?",
    answer: "Temperature-controlled freight shipping is specialized transportation in refrigerated and insulated trucks. This way, if you deal in perishable goods or products that are sensitive to heat, you can rest assured knowing that they will remain in their pre-shipped condition."
  },
  {
    question: "Will You Need Specialized Equipment to Deliver My Goods?",
    answer: "If you require specialized equipment, we can provide it. Our company prides itself on offering a broad range of trucking services to accommodate you best. Contact us to learn more about how we can customize your transportation to your needs."
  },
  {
    question: "How Do I Know What the Transit Time Is?",
    answer: "Once you’ve set up transportation with us, we can determine transit time depending on the departure, destination, and the trucking service you’ve chosen. Whether it’s expedited or standard shipping, we keep you up to date on the timeline of your delivery."
  },
  {
    question: "Is My Freight Likely to Get Damaged?",
    answer: "If you’ve adequately packaged your freight and specified the contents to us, the chances of it getting damaged are slim to none. Our team handles your merchandise with the utmost care from pick-up to drop-off."
  },
  {
    question: "What Is a Freight Forwarder?",
    answer: "A freight forwarder plans and organizes different shipments to get goods and products from the manufacturing facility to many distribution points."
  }
];

export default function FAQPage() {
  const container = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(() => {
    // Conceal
    gsap.set(".hero-title-word", { autoAlpha: 0, y: 100, rotateX: -45 });
    gsap.set(".hero-desc", { autoAlpha: 0, y: 40 });
    gsap.set(".hero-badge", { autoAlpha: 0, scale: 0.5 });
    gsap.set(".hero-line-x", { scaleX: 0 });
    gsap.set(".gsap-slide-up", { autoAlpha: 0, y: 50 });

    // Hero Animation
    const tl = gsap.timeline({ delay: 0.1 });
    
    tl.to(".hero-line-x", { scaleX: 1, duration: 1.2, ease: "power4.inOut", transformOrigin: "center" })
      .to(".hero-badge", { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(2)" }, "-=0.8")
      .to(".hero-title-word", { 
         autoAlpha: 1, 
         y: 0, 
         rotateX: 0, 
         duration: 1.2, 
         stagger: 0.1, 
         ease: "power4.out" 
      }, "-=0.6")
      .to(".hero-desc", { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8");

    gsap.to(".hero-float", { y: -10, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });

    // FAQ items scroll reveal
    ScrollTrigger.batch(".gsap-slide-up", {
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power4.out", overwrite: true }),
      start: "top 85%", once: true
    });

  }, { scope: container });

  return (
    <div ref={container} className="home-glass-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Hero Section */}
      <section style={{ minHeight: '60vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '180px 5vw 100px', overflow: 'hidden' }}>
        
        <div className="home-ambient-bg" style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
           <div className="home-blob hero-ambient-blob" style={{ width: '80vw', height: '80vw', background: 'var(--red)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.15 }} />
           <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 0%, #030303 90%)', zIndex: -1 }} />
        </div>

        <div style={{ width: '100%', maxWidth: '1000px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          
          <div className="hero-line-x" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(232,0,13,0.5), transparent)', width: '100%', marginBottom: '40px', visibility: 'hidden' }} />

          <div className="glass-badge hero-badge hero-float" style={{ margin: '0 auto 40px', background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(232,0,13,0.3)', boxShadow: '0 0 30px rgba(232,0,13,0.2)', visibility: 'hidden' }}>
            <div className="glass-badge-dot" /> KNOWLEDGE BASE
          </div>
          
          <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: '0.9', margin: '0 0 32px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', perspective: '1000px' }}>
            <span className="text-white hero-title-word" style={{ display: 'inline-block', visibility: 'hidden' }}>FREQUENTLY</span>
            <span className="text-white hero-title-word" style={{ display: 'inline-block', visibility: 'hidden' }}>ASKED</span>
            <span className="text-gradient-red hero-title-word" style={{ display: 'inline-block', padding: '0.05em 0', visibility: 'hidden' }}>QUESTIONS.</span>
          </h1>
          
          <p className="mono hero-desc" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.15rem', margin: '0 auto 30px', lineHeight: 1.8, textTransform: 'none', letterSpacing: 'normal', maxWidth: '800px', visibility: 'hidden' }}>
            Here are some of the most commonly asked questions by our clients about our trucking and transportation services. Let us clear things up for you!
          </p>

          <div className="hero-desc" style={{ visibility: 'hidden', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="tel:9024030112" className="glass-button" style={{ display: 'inline-flex', padding: '16px 32px', background: 'rgba(232,0,13,0.15)', border: '1px solid rgba(232,0,13,0.5)', borderRadius: '100px', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}>
              Call (902) 403-0112
            </a>
            <Link href="/contact" className="glass-button" style={{ display: 'inline-flex', padding: '16px 32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}>
              Get A Quote
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="container mx-auto" style={{ padding: '40px 5vw 160px', maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
               <div 
                 key={idx} 
                 className="glass-card gsap-slide-up" 
                 style={{ 
                   visibility: 'hidden', 
                   padding: '32px', 
                   background: isOpen ? 'rgba(0,0,0,0.8)' : 'rgba(10, 10, 10, 0.6)', 
                   border: isOpen ? '1px solid rgba(232,0,13,0.5)' : '1px solid rgba(255,255,255,0.05)', 
                   borderRadius: '24px', 
                   cursor: 'pointer',
                   transition: 'all 0.3s ease-out'
                 }}
                 onClick={() => toggleAccordion(idx)}
               >
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <h3 className="display" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: isOpen ? '#e8000d' : '#fff', margin: 0, lineHeight: 1.2, textTransform: 'uppercase', paddingRight: '20px' }}>
                     {faq.question}
                   </h3>
                   <div style={{ 
                     width: '40px', height: '40px', 
                     borderRadius: '50%', 
                     background: isOpen ? 'rgba(232,0,13,0.1)' : 'rgba(255,255,255,0.05)', 
                     display: 'flex', alignItems: 'center', justifyContent: 'center', 
                     flexShrink: 0,
                     transition: 'all 0.3s ease'
                   }}>
                     <span style={{ 
                       color: isOpen ? '#e8000d' : '#fff', 
                       fontSize: '1.5rem', 
                       lineHeight: 1,
                       transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                       transition: 'transform 0.3s ease'
                     }}>+</span>
                   </div>
                 </div>
                 
                 <div style={{ 
                   overflow: 'hidden', 
                   height: isOpen ? 'auto' : 0, 
                   opacity: isOpen ? 1 : 0, 
                   marginTop: isOpen ? '24px' : 0,
                   transition: 'all 0.3s ease-out' 
                 }}>
                   <p className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.8', textTransform: 'none', letterSpacing: 'normal', whiteSpace: 'pre-line' }}>
                     {faq.answer}
                   </p>
                 </div>
               </div>
            )
          })}
        </div>

        <div className="gsap-slide-up" style={{ marginTop: '80px', textAlign: 'center', visibility: 'hidden' }}>
          <p className="mono" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px', fontSize: '1.1rem' }}>
            If ever you have any other questions for us, a representative is always standing by to be of assistance.
          </p>
          <a href="tel:9024030112" className="text-gradient-red display hover-glow" style={{ fontSize: '2rem', textDecoration: 'none', letterSpacing: '2px' }}>
            (902) 403-0112
          </a>
        </div>
      </section>

    </div>
  );
}
