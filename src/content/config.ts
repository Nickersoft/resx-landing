import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const authors = defineCollection({
  loader: glob({
    pattern: "authors/*.yml",
    base: "src/data",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image(),
      linkedin: z.string(),
    }),
});

const blog = defineCollection({
  loader: glob({
    pattern: "blog/*.{mdx,md}",
    base: "src/data",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      date: z.date(),
      authors: z
        .array(reference("authors"))
        .transform((authors) => Array.from(new Set(authors))),
      image: image(),
      draft: z.boolean().default(false),
    }),
});

const restaurants = defineCollection({
  loader: glob({
    pattern: "restaurants/*.yml",
    base: "src/data",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      rating: z.number().min(1).max(5),
      image: image(),
    }),
});

const testimonials = defineCollection({
  loader: glob({
    pattern: "testimonials/*.{mdx,md}",
    base: "src/data",
  }),
  schema: z.object({
    name: z.string(),
  }),
});

const articles = defineCollection({
  loader: glob({
    pattern: "articles/*.yml",
    base: "src/data",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
    }),
});

export const collections = {
  authors,
  blog,
  testimonials,
  articles,
  restaurants,
};
