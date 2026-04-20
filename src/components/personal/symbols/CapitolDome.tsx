interface Props { size?: number; color?: string; opacity?: number; }
export default function CapitolDome({ size = 160, color = 'currentColor', opacity = 0.08 }: Props) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 160 120" fill="none" aria-hidden="true">
      {/* Dome arc */}
      <path d="M20 80 Q80 10 140 80" stroke={color} strokeWidth="1.2" opacity={opacity} />
      {/* Drum / rotunda columns */}
      <rect x="50" y="80" width="60" height="8" stroke={color} strokeWidth="0.8" opacity={opacity} />
      {[54,62,70,78,86,94,102].map((x, i) => (
        <line key={i} x1={x} y1="80" x2={x} y2="88" stroke={color} strokeWidth="0.6" opacity={opacity} />
      ))}
      {/* Steps */}
      <rect x="40" y="88"  width="80" height="5" stroke={color} strokeWidth="0.6" opacity={opacity} />
      <rect x="30" y="93"  width="100" height="5" stroke={color} strokeWidth="0.6" opacity={opacity} />
      <rect x="15" y="98"  width="130" height="5" stroke={color} strokeWidth="0.6" opacity={opacity} />
      {/* Lantern atop dome */}
      <rect x="73" y="14" width="14" height="12" rx="1" stroke={color} strokeWidth="0.8" opacity={opacity} />
      <line x1="80" y1="10" x2="80" y2="14" stroke={color} strokeWidth="0.8" opacity={opacity} />
    </svg>
  );
}
