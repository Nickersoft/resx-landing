import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";

import { variable } from "./units";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cssVars(vars: Record<string, string | number>) {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => {
      acc[variable(key)] = value.toString();
      return acc;
    },
    {} as Record<string, string>,
  ) as React.CSSProperties;
}

export async function markdownString(markdown: string) {
  const markdownProcessor = await createMarkdownProcessor();
  const result = await markdownProcessor.render(markdown);
  return result.code.replace(/^<p>|<\/p>$/g, "");
}
