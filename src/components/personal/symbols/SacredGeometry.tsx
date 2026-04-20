interface Props { size?: number; color?: string; opacity?: number; }
export default function SacredGeometry({ size = 120, color = 'currentColor', opacity = 0.1 }: Props) {
  const r = size * 0.28;
  const cx = size / 2, cy = size / 2;
  const offsets = [0, 60, 120, 180, 240, 300].map(deg => ({
    x: cx + r * Math.cos((deg * Math.PI) / 180),
    y: cy + r * Math.sin((deg * Math.PI) / 180),
  }));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth="0.8" opacity={opacity} />
      {offsets.map((o, i) => (
        <circle key={i} cx={o.x} cy={o.y} r={r} stroke={color} strokeWidth="0.8" opacity={opacity} />
      ))}
    </svg>
  );
}
