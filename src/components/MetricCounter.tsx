import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  value: string;
  label: string;
}

export default function MetricCounter({ value, label }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ textAlign: 'center' }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: 'var(--nebula-violet)',
        lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        opacity: 0.6,
        marginTop: '8px',
      }}>
        {label}
      </div>
    </motion.div>
  );
}
