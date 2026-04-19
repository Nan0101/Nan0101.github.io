import { Link2, Code2, Camera, BookOpen, FileText, Mail } from 'lucide-react';

const links = [
  { href: 'https://www.linkedin.com/in/nandini-soni-901bb580/', icon: Link2, label: 'LinkedIn' },
  { href: 'https://github.com/Nan0101', icon: Code2, label: 'GitHub' },
  { href: 'https://www.instagram.com/nan.nomnom/', icon: Camera, label: 'Instagram' },
  { href: 'https://goodreads.com/nannomnom', icon: BookOpen, label: 'Goodreads' },
  { href: 'https://substack.com/@nannomnom', icon: FileText, label: 'Substack' },
  { href: 'mailto:nandini_soni1310@yahoo.com', icon: Mail, label: 'Email' },
];

export default function SocialLinks() {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          style={{ color: 'var(--fg)', opacity: 0.6, transition: 'opacity 0.15s', display: 'flex' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.6')}
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}
