import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="home-blob" style={{ background: 'var(--red)', width: '60vw', height: '60vw', top: '-30vw', right: '-10vw', opacity: 0.15, filter: 'blur(100px)', zIndex: 0, position: 'absolute', pointerEvents: 'none' }} />
      
      {/* Massive Graphic Top Banner */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '80px' }}>
        <h2 className="display" style={{ fontSize: 'clamp(4rem, 12vw, 12rem)', lineHeight: 0.85, textShadow: '0 20px 40px rgba(0,0,0,0.5)', margin: 0 }}>
          PHANTOM <span className="text-gradient-red" style={{ padding: '0.05em 0' }}>LOGISTICS</span>
        </h2>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '24px' }}>
              <Image 
                src="/1313Asset.png" 
                alt="Phantom Logistics Logo" 
                width={250} 
                height={62} 
                style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))', objectPosition: 'left' }} 
              />
            </Link>
            <p className="mono">
              For short- or long-distance transportation, our company is fast, reliable, and meticulous when it comes to the distribution of your goods and products. 
              <br/><br/>
              <span className="text-red">TRUE INDUSTRY LEADERS.</span>
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4 className="mono">OPERATIONS</h4>
              <ul className="mono">
                <li><Link href="/about">COMPANY BIO <ArrowUpRight size={14} /></Link></li>
                <li><Link href="/trucks">FLEET ROSTER <ArrowUpRight size={14} /></Link></li>
                <li><Link href="/career">DEPLOYMENTS <ArrowUpRight size={14} /></Link></li>
                <li><Link href="/services">CAPABILITIES <ArrowUpRight size={14} /></Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="mono">TERMINALS</h4>
              <ul className="mono" style={{ textTransform: 'none', letterSpacing: 'normal' }}>
                <li style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Toronto, ON HQ</li>
                <li style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Truro, NS FACILITY</li>
              </ul>
              <h4 className="mono" style={{ marginTop: '32px' }}>COMMUNICATIONS</h4>
              <ul className="mono">
                <li><Link href="/contact">DISPATCH <ArrowUpRight size={14} /></Link></li>
                <li><a href="tel:902-403-0112">(902) 403-0112 <ArrowUpRight size={14} /></a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom mono">
          <p>© {new Date().getFullYear()} PHANTOM LOGISTICS INC. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
             <p>SYSTEM SECURE</p>
             <p className="text-red">EST. 2017</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
