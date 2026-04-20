import { useEffect, useRef } from 'react';

interface Props { size?: number; color?: string; opacity?: number; }

export default function FibonacciSpiral({ size = 200, color = 'currentColor', opacity = 0.15 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !svgRef.current) return;
    let start: number;
    let raf: number;
    function rotate(ts: number) {
      if (!start) start = ts;
      const deg = ((ts - start) / 60000) * 360;
      svgRef.current!.style.transform = `rotate(${deg}deg)`;
      raf = requestAnimationFrame(rotate);
    }
    raf = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Approximate golden spiral via arcs
  const arcs = [
    { x: 100, y: 100, r: 4,   sa: 180, ea: 270 },
    { x: 96,  y: 100, r: 6.5, sa: 270, ea: 360 },
    { x: 96,  y: 93,  r: 11,  sa: 0,   ea: 90  },
    { x: 107, y: 93,  r: 18,  sa: 90,  ea: 180 },
    { x: 107, y: 111, r: 29,  sa: 180, ea: 270 },
    { x: 78,  y: 111, r: 47,  sa: 270, ea: 360 },
  ];

  function arc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
    const s = (startDeg * Math.PI) / 180;
    const e = (endDeg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  }

  return (
    <svg ref={svgRef} width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true"
      style={{ transformOrigin: '50% 50%' }}>
      {arcs.map((a, i) => (
        <path key={i} d={arc(a.x, a.y, a.r, a.sa, a.ea)}
          stroke={color} strokeWidth="1" opacity={opacity} />
      ))}
    </svg>
  );
}
