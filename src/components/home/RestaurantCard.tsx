import { Card, CardContent } from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";
import { StarRating } from "../ui/StarRating";

interface RestaurantCardProps {
  rating: number;
}

export function RestaurantCard() {
  return (
    <Card className="flex aspect-[0.9] min-w-28 flex-col overflow-hidden rounded-xl">
      <div className="w-full flex-1 bg-[red]" />
      <CardContent className="flex flex-col justify-center gap-1 p-2">
        <Typography variant="title" className="text-xs">
          Tacos y Tequila
        </Typography>
        <StarRating className="h-4" rating={3.5} />
      </CardContent>
    </Card>
  );
}
