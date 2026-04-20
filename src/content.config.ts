import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    year: z.number(),
    tags: z.array(z.enum(['AI/ML', 'RAG', 'Full-stack', 'Data'])),
    stack: z.array(z.string()),
    summary: z.string(),
    thumbnail: z.string().optional(),
    hero: z.string().optional(),
    problem: z.string(),
    approach: z.string(),
    outcome: z.string(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
    featured: z.boolean().default(false),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  }),
});

const leadership = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/leadership' }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    dates: z.string(),
    impact: z.array(z.string()),
    photo: z.string().optional(),
  }),
});

export const collections = { projects, leadership };
