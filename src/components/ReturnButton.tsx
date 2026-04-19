export default function ReturnButton() {
  function handleClick() {
    window.dispatchEvent(new CustomEvent('portal:return'));
  }

  return (
    <button
      onClick={handleClick}
      aria-label="return through portal"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: 'var(--nebula-mist)',
        background: 'transparent',
        border: '1px solid var(--nebula-plum)',
        padding: 'var(--space-1) var(--space-3)',
        borderRadius: 'var(--radius-full)',
        opacity: 0.7,
        cursor: 'pointer',
      }}
    >
      ← portal
    </button>
  );
}
