import { useState, useEffect, useRef, type ReactNode } from 'react';

// Atbash: A↔Z, B↔Y, etc. Non-alpha chars pass through
function atbashEncode(text: string): string {
  return text.split('').map(ch => {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(90 - (code - 65));
    if (code >= 97 && code <= 122) return String.fromCharCode(122 - (code - 97));
    return ch;
  }).join('');
}

// ── MODE 1: Atbash hover-decode ──────────────────────────────────────────────
function AtbashReveal({ text, className }: { text: string; className?: string }) {
  const encoded = atbashEncode(text);
  const [revealed, setRevealed] = useState(0); // chars revealed so far
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startReveal() {
    setHovered(true);
    timerRef.current = setInterval(() => {
      setRevealed(prev => {
        if (prev >= text.length) { clearInterval(timerRef.current!); return prev; }
        return prev + 1;
      });
    }, 20);
  }

  function resetReveal() {
    setHovered(false);
    clearInterval(timerRef.current!);
    setRevealed(0);
  }

  const display = text.split('').map((ch, i) =>
    i < revealed ? ch : encoded[i] ?? ch
  ).join('');

  return (
    <span
      className={className}
      onMouseEnter={startReveal}
      onMouseLeave={resetReveal}
      onFocus={startReveal}
      onBlur={resetReveal}
      tabIndex={0}
      aria-label={text}
      style={{ cursor: 'default', fontFamily: 'inherit' }}
    >
      {display.split('').map((ch, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transition: 'color 0.1s',
            color: i < revealed ? 'inherit' : 'var(--arch-stone)',
            fontFamily: i < revealed ? 'inherit' : "'Geist Mono', monospace",
            fontSize: i < revealed ? 'inherit' : '0.85em',
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

// ── MODE 2: Vigenère passphrase gate ─────────────────────────────────────────
function VigenereGate({ text, passphrase, className }: { text: string; passphrase: string; className?: string }) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'denied'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toUpperCase() === passphrase.toUpperCase()) {
      setStatus('success');
    } else {
      setStatus('denied');
      setTimeout(() => setStatus('idle'), 1800);
    }
  }

  if (status === 'success') {
    return (
      <div className={className} style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {text}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
    >
      <label style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--arch-stone)',
      }}>
        ENTER PASSPHRASE
      </label>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        autoComplete="off"
        spellCheck={false}
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid color-mix(in srgb, var(--arch-gold) 60%, transparent)`,
          color: 'var(--arch-ink)',
          fontFamily: "'Geist Mono', monospace",
          fontSize: '14px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          textAlign: 'center',
          padding: '6px 12px',
          outline: 'none',
          width: '200px',
          animation: status === 'denied' ? 'cipher-shake 0.4s ease' : 'none',
        }}
        aria-label="passphrase input"
      />
      <button
        type="submit"
        style={{
          background: 'transparent',
          border: `1px solid var(--arch-gold)`,
          color: 'var(--arch-gold)',
          fontFamily: "'Geist Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '6px 16px',
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}
      >
        DECODE
      </button>
      {status === 'denied' && (
        <span style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--arch-oxblood)',
        }}>
          INVALID — ACCESS DENIED
        </span>
      )}
      <style>{`@keyframes cipher-shake {
        0%,100%{transform:translateX(0)}
        20%,60%{transform:translateX(-6px)}
        40%,80%{transform:translateX(6px)}
      }`}</style>
    </form>
  );
}

// ── MODE 3: Scroll-trigger glyph reformation ─────────────────────────────────
const GLYPHS = '☩⊕⊗⊘△▽◇◈⊞⊠⌖⌗⌘⍟⎊⎋';

function ScrollReform({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !startedRef.current) {
        startedRef.current = true;
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setRevealed(i);
          if (i >= text.length) clearInterval(interval);
        }, 40);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  const display = text.split('').map((ch, i) => {
    if (i < revealed) return ch;
    return GLYPHS[i % GLYPHS.length];
  }).join('');

  return (
    <div ref={ref} className={className} aria-label={text}>
      {display.split('').map((ch, i) => (
        <span key={i} style={{
          display: 'inline-block',
          transition: 'opacity 0.2s',
          opacity: i < revealed ? 1 : 0.35,
          color: i < revealed ? 'inherit' : 'var(--arch-stone)',
          fontFamily: i < revealed ? 'inherit' : "'Geist Mono', monospace",
        }}>
          {ch}
        </span>
      ))}
    </div>
  );
}

// ── Public component ─────────────────────────────────────────────────────────
interface Props {
  mode: 'atbash' | 'vigenere' | 'scroll-reform';
  text: string;
  passphrase?: string;
  className?: string;
}

export default function CipherReveal({ mode, text, passphrase = 'SOLOMON', className }: Props) {
  if (mode === 'atbash') return <AtbashReveal text={text} className={className} />;
  if (mode === 'vigenere') return <VigenereGate text={text} passphrase={passphrase} className={className} />;
  return <ScrollReform text={text} className={className} />;
}
