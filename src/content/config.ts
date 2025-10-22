import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

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
    pattern: "*.yml",
    base: "src/data/articles",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      link: z.string().url(),
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

const team = defineCollection({
  loader: file("src/data/team.yml"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().optional(),
      color: z.enum(["bronze", "cinnamon", "umbra", "sand-storm"]),
      size: z.enum(["lg", "default"]),
      alert: z.string(),
      image: image(),
    }),
});

export const collections = {
  testimonials,
  articles,
  restaurants,
  faq,
  team,
};
