interface Props { size?: number; color?: string; opacity?: number; }
export default function AlchemySymbols({ size = 120, color = 'currentColor', opacity = 0.1 }: Props) {
  return (
    <svg width={size} height={size * 0.35} viewBox="0 0 120 42" fill="none" aria-hidden="true">
      {/* ☉ Sun/Gold */}
      <circle cx="12" cy="21" r="8" stroke={color} strokeWidth="1" opacity={opacity} />
      <circle cx="12" cy="21" r="2.5" fill={color} opacity={opacity} />
      {/* △ Fire */}
      <path d="M37 33 L47 13 L57 33Z" stroke={color} strokeWidth="1" opacity={opacity} />
      {/* ▽ Water */}
      <path d="M67 13 L77 33 L87 13Z" stroke={color} strokeWidth="1" opacity={opacity} />
      {/* ☽ Moon */}
      <path d="M110 13 C100 13 96 17 96 21 C96 25 100 29 110 29 C104 29 100 25 100 21 C100 17 104 13 110 13Z"
        stroke={color} strokeWidth="1" opacity={opacity} />
    </svg>
  );
}
