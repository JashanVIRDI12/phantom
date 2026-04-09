"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Safety", href: "/safety" },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useGSAP(() => {
    gsap.fromTo(".nav-item", { y: -20, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power3.out", delay: 0.2
    });
  }, { scope: navRef });

  return (
    <>
      <nav ref={navRef} className={`navbar navbar-dark-glass ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link href="/" className="nav-item nav-logo display" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Image 
              src="/1313Asset.png" 
              alt="Phantom Logistics Logo" 
              width={220} 
              height={45} 
              priority
              loading="eager"
              style={{ objectFit: 'contain', objectPosition: 'left' }} 
            />
          </Link>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-item">
                <Link href={link.href} className={`mono ${pathname === link.href ? "active" : ""}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-item nav-cta">
            <Link href="/contact" className="glass-btn" style={{ fontSize: '1rem', padding: '12px 28px', border: '1px solid rgba(232,0,13,0.5)', background: 'rgba(232,0,13,0.1)', color: 'var(--white)', textShadow: '0 0 10px rgba(232,0,13,0.5)', boxShadow: '0 0 20px rgba(232,0,13,0.2)' }}>
              GET QUOTE
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="menu-btn">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} 
            className={`mobile-nav-link ${pathname === link.href ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setIsOpen(false)} className="glass-btn" style={{ marginTop: '32px', textAlign: 'center', display: 'block', border: '1px solid rgba(232,0,13,0.5)', background: 'rgba(232,0,13,0.1)', color: 'var(--white)', textShadow: '0 0 10px rgba(232,0,13,0.5)', boxShadow: '0 0 20px rgba(232,0,13,0.2)' }}>
          GET QUOTE
        </Link>
      </div>
    </>
  );
}
