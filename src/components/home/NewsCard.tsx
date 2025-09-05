import type { CollectionEntry } from "astro:content";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";

interface NewsCardProps {
  article: CollectionEntry<"articles">;
  image?: React.ReactNode;
}

export function NewsCard({ article, image }: NewsCardProps) {
  return (
    <div className="hover:shadow-primary/20 group cursor-pointer rounded-3xl transition-all duration-400 ease-out hover:scale-101 hover:rotate-x-1 hover:shadow-[0_12px_24px]">
      <Card className="group-hover:border-primary overflow-hidden rounded-[inherit] bg-gradient-to-br from-white/0 via-white/10 to-white/0 transition-all duration-400">
        <CardHeader className="p-0">{image}</CardHeader>
        <CardContent className="border-t p-4">
          <Typography variant="title" size="md" className="mb-3">
            {article.data.title}
          </Typography>
          <Typography variant="body" size="md">
            {article.data.description}
          </Typography>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="p-0" asChild>
            <a href="#">Read more</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
