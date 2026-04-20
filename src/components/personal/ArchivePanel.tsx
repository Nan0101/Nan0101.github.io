import type { ReactNode, CSSProperties } from 'react';

type BgVariant = 'parchment' | 'navy' | 'cream' | 'ink';

interface Props {
  children: ReactNode;
  width?: string;
  bg?: BgVariant;
  style?: CSSProperties;
  panelIndex?: number;
}

const BG_MAP: Record<BgVariant, string> = {
  parchment: 'var(--arch-parchment)',
  navy:      'var(--arch-navy)',
  cream:     'var(--arch-cream)',
  ink:       'var(--arch-ink)',
};

export default function ArchivePanel({
  children,
  width = '100vw',
  bg = 'parchment',
  style,
  panelIndex,
}: Props) {
  return (
    <section
      data-panel
      data-panel-index={panelIndex}
      style={{
        width,
        minWidth: width,
        height: '100%',
        flexShrink: 0,
        backgroundColor: BG_MAP[bg],
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </section>
  );
}
