import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// [glyph, fontFamily] pairs — literal font names so they resolve reliably in React inline styles
const GLYPHS: [string, string][] = [
  ['n', 'DotGothic16, monospace'],
  ['a', 'DotGothic16, monospace'],
  ['n', 'DotGothic16, monospace'],
  ['o', 'DotGothic16, monospace'],
  ['m', 'DotGothic16, monospace'],
  ['न', 'Noto Sans Devanagari, sans-serif'],
  ['म', 'Noto Sans Devanagari, sans-serif'],
  ['स', 'Noto Sans Devanagari, sans-serif'],
  ['ते', 'Noto Sans Devanagari, sans-serif'],
  ['र', 'Noto Sans Devanagari, sans-serif'],
  ['ન', 'Noto Sans Gujarati, sans-serif'],
  ['મ', 'Noto Sans Gujarati, sans-serif'],
  ['સ', 'Noto Sans Gujarati, sans-serif'],
  ['તે', 'Noto Sans Gujarati, sans-serif'],
  ['ર', 'Noto Sans Gujarati, sans-serif'],
  ['猫', 'Noto Sans JP, sans-serif'],
  ['道', 'Noto Sans JP, sans-serif'],
  ['標', 'Noto Sans JP, sans-serif'],
  ['指', 'Noto Sans JP, sans-serif'],
  ['針', 'Noto Sans JP, sans-serif'],
  ['夢', 'Noto Sans JP, sans-serif'],
  ['界', 'Noto Sans JP, sans-serif'],
  ['空', 'Noto Sans JP, sans-serif'],
  ['光', 'Noto Sans JP, sans-serif'],
];

export default function Portal() {
  const [phase, setPhase] = useState<'idle' | 'active'>('idle');
  const destinationRef = useRef<string>('/shishin');
  const overlayRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    function handleOpen() {
      destinationRef.current = '/shishin';
      setPhase('active');
    }
    function handleReturn() {
      destinationRef.current = '/';
      setPhase('active');
    }
    window.addEventListener('portal:open', handleOpen);
    window.addEventListener('portal:return', handleReturn);
    return () => {
      window.removeEventListener('portal:open', handleOpen);
      window.removeEventListener('portal:return', handleReturn);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'active' || !overlayRef.current || !ringRef.current) return;

    const dest = destinationRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.25,
        onComplete: () => {
          sessionStorage.setItem(dest === '/' ? 'portal-return' : 'portal-entry', '1');
          window.location.href = dest;
        },
      });
      return;
    }

    const glyphEls = ringRef.current.querySelectorAll<HTMLSpanElement>('.portal-glyph');
    gsap.set(overlayRef.current, { opacity: 0, pointerEvents: 'all' });
    gsap.set(glyphEls, { opacity: 0, scale: 0 });
    gsap.set(ringRef.current, { scale: 1, rotation: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    // 1. Overlay fade in
    tl.to(overlayRef.current, { opacity: 1, duration: 0.2, ease: 'none' });

    // 2. Glyphs stagger onto ring
    tl.to(
      glyphEls,
      { opacity: 1, scale: 1, duration: 0.25, stagger: 0.03, ease: 'back.out(1.7)' },
      0.2
    );

    // 3. Ring collapse
    tl.to(ringRef.current, { scale: 0, rotation: '+=30', duration: 0.3, ease: 'power2.in' }, 0.9);

    // 4. Navigate (after collapse finishes at 0.9 + 0.3 = 1.2s)
    tl.call(
      () => {
        sessionStorage.setItem(dest === '/' ? 'portal-return' : 'portal-entry', '1');
        window.location.href = dest;
      },
      [],
      1.2
    );

    return () => {
      tl.kill();
    };
  }, [phase]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10,10,15,0.98)',
        opacity: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{ position: 'relative', width: 0, height: 0 }}
      >
        <div ref={ringRef} style={{ position: 'relative', width: 0, height: 0 }}>
          {GLYPHS.map(([g, font], i) => (
            <span
              key={i}
              className="portal-glyph"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `rotate(${(i / GLYPHS.length) * 360}deg) translateY(-160px)`,
                transformOrigin: '0 0',
                fontSize: '1.2rem',
                fontFamily: font,
                color: 'var(--nebula-glow)',
                opacity: 0,
                userSelect: 'none',
              }}
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
