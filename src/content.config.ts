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
        quote: z.string().optional(),
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

const transcript = defineCollection({
    loader: glob({ pattern: '**/*.json', base: 'src/content/transcript' }),
    schema: z.array(
        z.object({
            section: z.enum([
                'Formal Degree',
                'Bootcamps & Institutions',
                'Online Courses — Udemy',
                'Online Courses — Great Learning',
            ]),
            title: z.string(),
            institution: z.string(),
            status: z.enum(['Completed', 'In Progress']),
            date: z.string().optional(),
            description: z.string().optional(),
            detail: z.string().optional(),
            tagLabel: z.string().optional(),
            tags: z.array(z.string()).optional(),
            certificateImage: z.string().optional(),
            certificateAlt: z.string().optional(),
            order: z.number(),
        }),
    ),
});

export const collections = { hero, projects, experience, education, cta, transcript };
