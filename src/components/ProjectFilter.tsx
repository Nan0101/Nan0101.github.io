import { useState } from 'react';

interface Project {
  title: string;
  slug: string;
  year: number;
  tags: string[];
  stack: string[];
  summary: string;
  thumbnail?: string;
}

interface Props {
  projects: Project[];
}

const ALL_TAGS = ['AI/ML', 'RAG', 'Full-stack', 'Data'];

export default function ProjectFilter({ projects }: Props) {
  const [active, setActive] = useState<string[]>([]);

  const filtered = active.length === 0
    ? projects
    : projects.filter(p => active.some(t => p.tags.includes(t)));

  function toggleTag(tag: string) {
    setActive(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  return (
    <>
      <div className="filter-row">
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            className={`filter-chip${active.includes(tag) ? ' active' : ''}`}
            onClick={() => toggleTag(tag)}
            aria-pressed={active.includes(tag)}
          >
            {tag}
          </button>
        ))}
        {active.length > 0 && (
          <button className="filter-chip clear" onClick={() => setActive([])}>
            Clear
          </button>
        )}
      </div>

      <div className="projects-grid">
        {filtered.map(p => (
          <a href={`/projects/${p.slug}`} key={p.slug} className="project-card-link">
            <div className="card-thumb">
              {p.thumbnail
                ? <img src={p.thumbnail} alt={p.title} loading="lazy" />
                : <div className="thumb-placeholder" />}
            </div>
            <div className="card-body">
              <div className="card-meta">
                <span className="year">{p.year}</span>
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-summary">{p.summary}</p>
              <div className="stack-chips">
                {p.stack.slice(0, 4).map(s => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
          </a>
        ))}
        {filtered.length === 0 && (
          <p className="no-results">No projects match the selected filters.</p>
        )}
      </div>

      <style>{`
        .filter-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .filter-chip {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          border: 1px solid var(--line);
          background: transparent;
          color: var(--fg);
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .filter-chip:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .filter-chip.active {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
        }
        .filter-chip.clear {
          opacity: 0.5;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
        .project-card-link {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: var(--fg);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--bg);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          transform-style: preserve-3d;
        }
        .project-card-link:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          transform: scale(1.02);
        }
        .card-thumb {
          aspect-ratio: 3 / 2;
          overflow: hidden;
        }
        .card-thumb img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        .project-card-link:hover .card-thumb img { transform: scale(1.04); }
        .thumb-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, var(--paper-dim, #EAE6DF) 0%, var(--line, #1A1A22) 100%);
        }
        .card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .card-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .year { font-family: var(--font-mono); font-size: 0.75rem; opacity: 0.5; }
        .tag {
          font-family: var(--font-mono); font-size: 0.7rem;
          padding: 2px 8px; border-radius: var(--radius-full);
          background: color-mix(in srgb, var(--nebula-violet) 15%, transparent);
          color: var(--nebula-violet);
          border: 1px solid color-mix(in srgb, var(--nebula-violet) 30%, transparent);
        }
        .card-title {
          font-family: var(--font-display); font-size: 1.1rem;
          font-weight: 600; letter-spacing: -0.01em; margin: 0; line-height: 1.3;
        }
        .card-summary {
          font-family: var(--font-body); font-size: 0.875rem; line-height: 1.5;
          opacity: 0.7; margin: 0;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .stack-chips { display: flex; gap: 4px; flex-wrap: wrap; margin-top: auto; padding-top: 8px; }
        .chip {
          font-family: var(--font-mono); font-size: 0.7rem;
          padding: 2px 8px; border-radius: var(--radius-full);
          background: var(--paper-dim, #EAE6DF); color: var(--fg);
          border: 1px solid var(--line); opacity: 0.8;
        }
        .no-results {
          font-family: var(--font-body); opacity: 0.5;
          grid-column: 1 / -1; text-align: center; padding: 48px 0;
        }
      `}</style>
    </>
  );
}
