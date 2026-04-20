import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'ambient-unmuted';

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);
  const rotRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const audio = new Audio('/audio/ambient.mp3');
    audio.loop = true;
    audio.volume = 0;
    audio.muted = true;
    audioRef.current = audio;
    audio.play().catch(() => {});

    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      audio.muted = false;
      fadeIn(audio);
      setPlaying(true);
    }

    return () => { audio.pause(); audio.src = ''; };
  }, []);

  // Vinyl rotation animation
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    function spin() {
      if (playing) {
        rotRef.current = (rotRef.current + 0.3) % 360;
        setRotation(rotRef.current);
      }
      rafRef.current = requestAnimationFrame(spin);
    }
    rafRef.current = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fadeOut(audio, () => { audio.muted = true; });
      setPlaying(false);
    } else {
      audio.muted = false;
      fadeIn(audio);
      setPlaying(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Mute ambient audio' : 'Play ambient audio'}
      title={playing ? 'Mute' : 'Play ambient'}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {/* Vinyl disc SVG */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        style={{
          transform: `rotate(${rotation}deg)`,
          opacity: playing ? 1 : 0.4,
          transition: 'opacity 0.2s',
        }}
      >
        {/* Outer disc */}
        <circle cx="14" cy="14" r="13" fill="var(--arch-leather)" stroke="var(--arch-gold)" strokeWidth="0.6" />
        {/* Groove rings */}
        {[10, 8, 6].map(r => (
          <circle key={r} cx="14" cy="14" r={r} stroke="color-mix(in srgb, var(--arch-gold) 25%, transparent)" strokeWidth="0.5" fill="none" />
        ))}
        {/* Label */}
        <circle cx="14" cy="14" r="4" fill="var(--arch-oxblood)" />
        {/* Spindle hole */}
        <circle cx="14" cy="14" r="1.2" fill="var(--arch-parchment)" />
        {/* Muted X overlay */}
        {!playing && (
          <>
            <line x1="8" y1="8" x2="20" y2="20" stroke="var(--arch-stone)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="8" x2="8" y2="20" stroke="var(--arch-stone)" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
      </svg>
    </button>
  );
}

function fadeIn(audio: HTMLAudioElement) {
  audio.volume = 0;
  const step = () => {
    if (audio.volume < 0.38) { audio.volume = Math.min(0.4, audio.volume + 0.04); requestAnimationFrame(step); }
    else audio.volume = 0.4;
  };
  requestAnimationFrame(step);
}

function fadeOut(audio: HTMLAudioElement, onDone: () => void) {
  const step = () => {
    if (audio.volume > 0.04) { audio.volume = Math.max(0, audio.volume - 0.04); requestAnimationFrame(step); }
    else { audio.volume = 0; onDone(); }
  };
  requestAnimationFrame(step);
}
