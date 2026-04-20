interface Props { size?: number; color?: string; opacity?: number; }
export default function PhiSymbol({ size = 80, color = 'currentColor', opacity = 0.15 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <text x="40" y="58" textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif" fontSize="52" fontWeight="300"
        fill={color} opacity={opacity}>φ</text>
    </svg>
  );
}
