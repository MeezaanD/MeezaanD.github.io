import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const hero = defineCollection({
    loader: glob({ pattern: '**/*.md', base: 'src/content/hero' }),
    schema: z.object({
        name: z.string(),
        headline: z.string(),
        description: z.string(),
        cta: z.object({
            text: z.string(),
            href: z.string(),
        }),
        github: z.string(),
    }),
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: 'src/content/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        techStack: z.string(),
        liveLink: z.string().optional(),
        code: z.string().optional(),
        order: z.number(),
    }),
});

const experience = defineCollection({
    loader: glob({ pattern: '**/*.md', base: 'src/content/experience' }),
    schema: z.object({
        company: z.string(),
        title: z.string(),
        date: z.string(),
        url: z.string().optional(),
        order: z.number(),
    }),
});

const education = defineCollection({
    loader: glob({ pattern: '**/*.md', base: 'src/content/education' }),
    schema: z.object({
        institution: z.string(),
        title: z.string(),
        date: z.string(),
        url: z.string().optional(),
        order: z.number(),
    }),
});

const cta = defineCollection({
    loader: glob({ pattern: '**/*.md', base: 'src/content/cta' }),
    schema: z.object({
        headline: z.string(),
        buttonText: z.string(),
        buttonHref: z.string(),
    }),
});

export const collections = { hero, projects, experience, education, cta };
