interface Props { size?: number; color?: string; opacity?: number; }
export default function RoseCross({ size = 80, color = 'currentColor', opacity = 0.1 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      {/* Cross */}
      <line x1="40" y1="8"  x2="40" y2="72" stroke={color} strokeWidth="1.5" opacity={opacity} />
      <line x1="8"  y1="30" x2="72" y2="30" stroke={color} strokeWidth="1.5" opacity={opacity} />
      {/* Rose at center — concentric circles + petals */}
      <circle cx="40" cy="30" r="10" stroke={color} strokeWidth="0.8" opacity={opacity} />
      <circle cx="40" cy="30" r="6"  stroke={color} strokeWidth="0.8" opacity={opacity} />
      <circle cx="40" cy="30" r="2"  fill={color} opacity={opacity} />
      {/* Petal tips */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 40 + 10 * Math.cos(rad), y = 30 + 10 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="1.5" fill={color} opacity={opacity} />;
      })}
    </svg>
  );
}
