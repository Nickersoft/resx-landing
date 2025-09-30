import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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
    pattern: "*.{mdx,md}",
    base: "src/data/testimonials",
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

const faq = defineCollection({
  loader: glob({
    pattern: "faq/*.md",
    base: "src/data",
  }),
  schema: z.object({
    question: z.string(),
    order: z.number().optional(),
    pages: z.array(z.enum(["home", "submit", "claim"])).default(["home"]),
  }),
});

export const collections = {
  testimonials,
  articles,
  restaurants,
  faq,
};
