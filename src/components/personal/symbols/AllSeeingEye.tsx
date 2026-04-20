interface Props { size?: number; color?: string; opacity?: number; }
export default function AllSeeingEye({ size = 80, color = 'currentColor', opacity = 0.1 }: Props) {
  const h = size, w = size;
  return (
    <svg width={w} height={h} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <polygon points="40,8 72,68 8,68" stroke={color} strokeWidth="1.2" opacity={opacity} />
      <ellipse cx="40" cy="44" rx="10" ry="10" stroke={color} strokeWidth="1" opacity={opacity} />
      <circle cx="40" cy="44" r="4" fill={color} opacity={opacity} />
      <line x1="40" y1="8" x2="40" y2="20" stroke={color} strokeWidth="1" opacity={opacity * 0.6} />
    </svg>
  );
}
