import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimate,
} from 'framer-motion';

export default function Cat() {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [emojiScope, animateEmoji] = useAnimate();
  const [blinkScope, animateBlink] = useAnimate();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const rotateZ = useTransform(springX, [-4, 4], [-4, 4]);

  // Route guard
  useEffect(() => {
    if (!window.location.pathname.startsWith('/shishin')) {
      setVisible(true);
    }
  }, []);

  // Mouse tracking
  useEffect(() => {
    if (!visible) return;
    function onMouseMove(e: MouseEvent) {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const maxDist = Math.max(window.innerWidth, window.innerHeight) / 2;
      rawX.set((dx / maxDist) * 4);
      rawY.set((dy / maxDist) * 4);
    }
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [visible, rawX, rawY]);

  // Idle animations
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let blinkTimeout: ReturnType<typeof setTimeout>;
    let tailTimeout: ReturnType<typeof setTimeout>;

    function scheduleBlink() {
      const delay = 4000 + Math.random() * 3000;
      blinkTimeout = setTimeout(async () => {
        if (blinkScope.current) {
          await animateBlink(blinkScope.current, { scaleY: [1, 0.05, 1] }, { duration: 0.15 });
        }
        scheduleBlink();
      }, delay);
    }

    function scheduleTail() {
      const delay = 6000 + Math.random() * 4000;
      tailTimeout = setTimeout(async () => {
        if (emojiScope.current) {
          await animateEmoji(
            emojiScope.current,
            { rotate: [0, 3, -3, 0] },
            { duration: 0.4, ease: 'easeInOut' }
          );
        }
        scheduleTail();
      }, delay);
    }

    scheduleBlink();
    scheduleTail();

    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(tailTimeout);
    };
  }, [visible, animateBlink, animateEmoji, blinkScope, emojiScope]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        .cat-button {
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          position: relative;
          filter: drop-shadow(0 0 10px rgba(109, 40, 217, 0.6));
        }
        .cat-emoji {
          font-size: 48px;
          display: block;
        }
        @media (max-width: 480px) {
          .cat-emoji { font-size: 36px; }
        }
        .cat-blink {
          position: absolute;
          inset: 0;
          background: var(--bg, #F7F5F0);
          border-radius: 4px;
          pointer-events: none;
        }
      `}</style>
      <motion.button
        ref={buttonRef}
        className="cat-button"
        style={{
          x: springX,
          y: springY,
          rotateZ,
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 100,
        }}
        whileHover={{ scale: 1.1, y: -4 }}
        onClick={() => window.dispatchEvent(new CustomEvent('portal:open'))}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('portal:open'));
          }
        }}
        aria-label="secret passage"
      >
        <motion.span ref={emojiScope} className="cat-emoji">🐈‍⬛</motion.span>
        <div ref={blinkScope} className="cat-blink" style={{ opacity: 0 }} />
      </motion.button>
    </>
  );
}
