import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function PortalReveal() {
  const [active, setActive] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasEntry = sessionStorage.getItem('portal-entry');
    const hasReturn = sessionStorage.getItem('portal-return');
    if (hasEntry || hasReturn) {
      sessionStorage.removeItem('portal-entry');
      sessionStorage.removeItem('portal-return');
      setActive(true);
    }
  }, []);

  useEffect(() => {
    if (!active || !overlayRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: reduced ? 0.15 : 0.4,
      ease: 'power1.out',
      onComplete: () => setActive(false),
    });
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: 'rgba(10,10,15,0.98)',
        opacity: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
