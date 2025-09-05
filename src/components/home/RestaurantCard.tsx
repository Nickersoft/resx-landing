import { Card, CardContent } from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";

export function RestaurantCard() {
  return (
    <Card className="flex aspect-[0.9] min-w-28 flex-col overflow-hidden rounded-xl">
      <div className="w-full flex-1 bg-[red]" />
      <CardContent className="p-2">
        <Typography variant="title" className="text-xs">
          Tacos y Tequila
        </Typography>
      </CardContent>
    </Card>
  );
}
