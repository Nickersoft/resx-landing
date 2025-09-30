import type { CollectionEntry, CollectionKey } from "astro:content";

export type CollectionField<
  T extends CollectionKey,
  V extends keyof CollectionEntry<T>["data"],
> = NonNullable<CollectionEntry<T>["data"][V]>;
