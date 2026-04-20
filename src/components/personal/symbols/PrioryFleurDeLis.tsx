interface Props { size?: number; color?: string; opacity?: number; }
export default function PrioryFleurDeLis({ size = 60, color = 'currentColor', opacity = 0.12 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 80" fill="none" aria-hidden="true">
      {/* center petal */}
      <path d="M30 10 C20 20 16 38 30 50 C44 38 40 20 30 10Z" stroke={color} strokeWidth="1" opacity={opacity} />
      {/* left petal */}
      <path d="M30 32 C18 22 6 22 8 36 C14 44 24 42 30 38" stroke={color} strokeWidth="1" opacity={opacity} />
      {/* right petal */}
      <path d="M30 32 C42 22 54 22 52 36 C46 44 36 42 30 38" stroke={color} strokeWidth="1" opacity={opacity} />
      {/* stem */}
      <line x1="30" y1="50" x2="30" y2="70" stroke={color} strokeWidth="1.2" opacity={opacity} />
      {/* base crossbar */}
      <line x1="22" y1="64" x2="38" y2="64" stroke={color} strokeWidth="1" opacity={opacity} />
    </svg>
  );
}
