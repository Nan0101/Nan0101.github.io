import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  snapEnabled?: boolean;
}

export default function HorizontalScroll({ children, snapEnabled = true }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const targetXRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isDesktopRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    isDesktopRef.current = mq.matches;

    const track = trackRef.current;
    if (!track || !isDesktopRef.current) return;

    function getMaxScroll() {
      return -(track!.scrollWidth - window.innerWidth);
    }

    function clamp(val: number, min: number, max: number) {
      return Math.min(max, Math.max(min, val));
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    // Tick loop
    function tick() {
      if (reducedMotion.matches) {
        xRef.current = targetXRef.current;
      } else {
        xRef.current = lerp(xRef.current, targetXRef.current, 0.08);
      }
      track!.style.transform = `translateX(${xRef.current}px)`;

      // Update progress bar
      const progressEl = document.getElementById('arch-progress');
      if (progressEl) {
        const max = Math.abs(getMaxScroll());
        const pct = max > 0 ? (Math.abs(xRef.current) / max) * 100 : 0;
        progressEl.style.width = `${pct}%`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      targetXRef.current = clamp(targetXRef.current - delta, getMaxScroll(), 0);

      if (snapEnabled) {
        clearTimeout((onWheel as any)._snapTimer);
        (onWheel as any)._snapTimer = setTimeout(() => snapToPanel(), 350);
      }
    }

    function snapToPanel() {
      const panels = track!.querySelectorAll<HTMLElement>('[data-panel]');
      if (!panels.length) return;
      let closest = 0;
      let minDist = Infinity;
      panels.forEach((panel, i) => {
        const panelX = -(panel.offsetLeft);
        const dist = Math.abs(xRef.current - panelX);
        const threshold = panel.offsetWidth * 0.3;
        if (dist < minDist && dist < panel.offsetWidth * 0.7) {
          minDist = dist;
          closest = i;
        }
        void threshold;
      });
      const target = panels[closest];
      if (target) targetXRef.current = clamp(-target.offsetLeft, getMaxScroll(), 0);
    }

    function onKeyDown(e: KeyboardEvent) {
      const panels = track!.querySelectorAll<HTMLElement>('[data-panel]');
      if (!panels.length) return;
      const currentIdx = [...panels].findIndex(p => -p.offsetLeft >= xRef.current - 10);
      if (e.key === 'ArrowRight') {
        const next = panels[Math.min(currentIdx + 1, panels.length - 1)];
        if (next) targetXRef.current = clamp(-next.offsetLeft, getMaxScroll(), 0);
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft') {
        const prev = panels[Math.max(currentIdx - 1, 0)];
        if (prev) targetXRef.current = clamp(-prev.offsetLeft, getMaxScroll(), 0);
        e.preventDefault();
      }
    }

    // Touch support
    let touchStartX = 0;
    function onTouchStart(e: TouchEvent) { touchStartX = e.touches[0].clientX; }
    function onTouchMove(e: TouchEvent) {
      const dx = touchStartX - e.touches[0].clientX;
      targetXRef.current = clamp(targetXRef.current - dx, getMaxScroll(), 0);
      touchStartX = e.touches[0].clientX;
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: true });

    // Expose navigate fn for index links
    (window as any).__archiveScrollTo = (panelIndex: number) => {
      const panels = track!.querySelectorAll<HTMLElement>('[data-panel]');
      const target = panels[panelIndex];
      if (target) targetXRef.current = clamp(-target.offsetLeft, getMaxScroll(), 0);
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
    };
  }, [snapEnabled]);

  return (
    <>
      {/* Progress bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          height: '2px',
          width: '100%',
          background: 'color-mix(in srgb, var(--arch-gold) 20%, transparent)',
          zIndex: 40,
        }}
      >
        <div
          id="arch-progress"
          style={{
            height: '100%',
            width: '0%',
            background: 'var(--arch-gold)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Desktop horizontal track */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
        }}
        className="arch-scroll-outer"
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            height: '100%',
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      </div>

      {/* Mobile: normal vertical flow (hidden on desktop via CSS) */}
      <div className="arch-mobile-fallback">
        {children}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .arch-mobile-fallback { display: none !important; }
        }
        @media (max-width: 767px) {
          .arch-scroll-outer { display: none !important; }
          #arch-progress { display: none; }
          .arch-mobile-fallback {
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
