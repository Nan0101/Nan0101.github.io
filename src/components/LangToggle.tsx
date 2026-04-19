import { useEffect, useState } from 'react';

export default function LangToggle() {
  const [lang, setLang] = useState<'en' | 'ja'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'en' | 'ja' | null;
    if (saved) {
      setLang(saved);
      document.documentElement.dataset.lang = saved;
    }
  }, []);

  function toggle() {
    const next = lang === 'en' ? 'ja' : 'en';
    setLang(next);
    document.documentElement.dataset.lang = next;
    localStorage.setItem('lang', next);
  }

  return (
    <button
      onClick={toggle}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        color: 'var(--fg)',
        padding: 0,
      }}
    >
      {lang === 'en' ? 'EN' : 'JA'}
    </button>
  );
}
