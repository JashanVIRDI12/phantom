import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Image 
                src="/1313Asset.png" 
                alt="Phantom Logistics Logo" 
                width={250} 
                height={62} 
                style={{ objectFit: 'contain' }} 
              />
            </Link>
            <p className="mono" style={{ textTransform: 'none', letterSpacing: 'normal' }}>
              For short- or long-distance transportation, our company is fast, reliable, and meticulous when it comes to the distribution of your goods and products. True industry leaders.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4 className="mono">Company</h4>
              <ul className="mono">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/trucks">Our Fleet</Link></li>
                <li><Link href="/career">Careers</Link></li>
                <li><Link href="/services">Services</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="mono">Terminals</h4>
              <ul className="mono" style={{ textTransform: 'none', letterSpacing: 'normal' }}>
                <li style={{ color: 'var(--text-muted)' }}>Toronto, ON</li>
                <li style={{ color: 'var(--text-muted)' }}>Truro, NS</li>
              </ul>
              <h4 className="mono" style={{ marginTop: '24px' }}>Connect</h4>
              <ul className="mono">
                <li><Link href="/contact">Contact</Link></li>
                <li><a href="tel:902-403-0112">(902) 403-0112</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom mono">
          <p>© {new Date().getFullYear()} Phantom Logistics. All rights reserved.</p>
          <p>FOUNDED 2017</p>
        </div>
      </div>
    </footer>
  );
}
