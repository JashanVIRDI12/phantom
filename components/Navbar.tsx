"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import "./navbar.css";

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
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const moveIndicator = () => {
    const list = linksRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const active = list.querySelector<HTMLAnchorElement>(".nav-link.active");
    if (!active) {
      gsap.to(indicator, { autoAlpha: 0, duration: 0.25 });
      return;
    }

    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    gsap.to(indicator, {
      autoAlpha: 1,
      x: activeRect.left - listRect.left,
      width: activeRect.width,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    moveIndicator();
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [pathname, scrolled]);

  useGSAP(() => {
    gsap.fromTo(
      ".nav-animate",
      { y: -16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.7, ease: "power3.out", delay: 0.15 }
    );
  }, { scope: navRef });

  useEffect(() => {
    if (!isOpen) return;
    gsap.fromTo(
      ".mobile-nav-link",
      { y: 48, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.55, ease: "power3.out", delay: 0.1 }
    );
    gsap.fromTo(
      ".mobile-nav-footer",
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out", delay: 0.45 }
    );
  }, [isOpen]);

  return (
    <>
      <header ref={navRef} className={`nav-shell ${scrolled ? "nav-shell--scrolled" : ""}`}>
        <nav className="nav-bar" aria-label="Main navigation">
          <Link href="/" className="nav-animate nav-brand">
            <Image
              src="/1313Asset.png"
              alt="Phantom Logistics"
              width={200}
              height={42}
              priority
              className="nav-brand-img"
            />
          </Link>

          <div className="nav-center nav-animate">
            <ul ref={linksRef} className="nav-links">
              <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-animate nav-actions">
            <div className="nav-status">
              <span className="nav-status-dot" />
              Live Dispatch
            </div>
            <Link href="/contact" className="nav-cta">
              Get Quote
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="nav-menu-btn"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </nav>
      </header>

      <div className={`nav-mobile ${isOpen ? "nav-mobile--open" : ""}`} aria-hidden={!isOpen}>
        <div className="nav-mobile-backdrop" onClick={() => setIsOpen(false)} role="presentation" />
        <div className="nav-mobile-panel">
          <div className="nav-mobile-top">
            <span className="nav-mobile-label">Navigation</span>
            <button type="button" className="nav-mobile-close" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>

          <nav className="nav-mobile-links">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-link ${isActive(link.href) ? "active" : ""}`}
              >
                <span className="mobile-nav-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="mobile-nav-text">{link.label}</span>
                <ArrowUpRight size={20} className="mobile-nav-arrow" />
              </Link>
            ))}
          </nav>

          <div className="mobile-nav-footer">
            <div className="nav-status nav-status--mobile">
              <span className="nav-status-dot" />
              24/7 Fleet Operations
            </div>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="nav-cta nav-cta--mobile">
              Get Freight Quote
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
