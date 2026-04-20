import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function HeroPhoto() {
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [2, -2]), { stiffness: 100, damping: 25 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-2, 2]), { stiffness: 100, damping: 25 });

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
    function onMouseLeave() {
      rawX.set(0);
      rawY.set(0);
    }
    const el = containerRef.current;
    el?.addEventListener('mousemove', onMouseMove);
    el?.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el?.removeEventListener('mousemove', onMouseMove);
      el?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [rawX, rawY]);

  const frameStyle: React.CSSProperties = {
    borderRadius: 'var(--radius-lg) var(--radius-sm) var(--radius-lg) var(--radius-sm)',
    overflow: 'hidden',
    width: '100%',
    aspectRatio: '4 / 5',
  };

  return (
    <div ref={containerRef} style={{ perspective: 800 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {imgError ? (
          <div
            style={{
              ...frameStyle,
              background: 'linear-gradient(135deg, var(--nebula-plum), var(--nebula-violet), var(--nebula-magenta))',
            }}
          />
        ) : (
          <img
            src="/assets/NANDINI_SONI_PHOTO_NEW.png"
            alt="Nandini Soni"
            onError={() => setImgError(true)}
            style={{
              ...frameStyle,
              display: 'block',
              objectFit: 'cover',
              width: '100%',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
