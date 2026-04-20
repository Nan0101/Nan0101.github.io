import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  en?: string;
  hi?: string;
  gu?: string;
  ja?: string;
  ta?: string;
  ru?: string;
}

const FONTS = [
  'var(--font-display)',
  'var(--font-devanagari)',
  'var(--font-gujarati)',
  'var(--font-japanese)',
  'var(--font-tamil)',
  'var(--font-cyrillic)',
];

export default function NameCycle({
  en = 'Nandini Soni',
  hi = 'नंदिनी',
  gu = 'નંદિની',
  ja = 'ナンディニ',
  ta = 'நந்தினி',
  ru = 'Нандини'
}: Props) {
  const scripts = [en, hi, gu, ja, ta, ru];
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % scripts.length);
    }, 700);
  }

  function stop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrent(0);
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <span
      tabIndex={0}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      style={{ display: 'inline-block', cursor: 'default', position: 'relative' }}
      aria-label={en}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'block',
            fontFamily: FONTS[current],
          }}
        >
          {scripts[current]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
