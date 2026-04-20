interface Props { width?: number; height?: number; opacity?: number; tileSize?: number; }
export default function CheckeredFloor({ width = 400, height = 80, opacity = 0.05, tileSize = 20 }: Props) {
  const cols = Math.ceil(width / tileSize);
  const rows = Math.ceil(height / tileSize);
  const rects: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if ((r + c) % 2 === 0) rects.push({ x: c * tileSize, y: r * tileSize });
    }
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      {rects.map((rect, i) => (
        <rect key={i} x={rect.x} y={rect.y} width={tileSize} height={tileSize}
          fill="var(--arch-leather)" opacity={opacity} />
      ))}
    </svg>
  );
}
