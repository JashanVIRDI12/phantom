"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    // Set initial position off screen
    gsap.set([cursor, follower], { x: -100, y: -100 });
    
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor hidden lg:block" />
      <div ref={followerRef} className="cursor-follower hidden lg:block" />
    </>
  );
}
