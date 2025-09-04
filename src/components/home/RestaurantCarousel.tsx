import { Carousel } from "../ui/Carousel";
import { Card } from "../ui/card";
import { Stack } from "../ui/Stack";
import { Typography } from "../ui/Typography";
import { RestaurantCard } from "./RestaurantCard";

interface RestaurantCarouselProps {
  duration?: number;
  gap?: number;
  count?: number;
}

export function RestaurantCarousel({
  duration = 10,
  gap = 4,
  count = 5,
}: RestaurantCarouselProps) {
  return (
    <Stack
      orientation="row"
      gap="md"
      className="mask-t-from-80% mask-t-to-transparent mask-b-from-80% mask-b-to-transparent"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Carousel
          duration={duration}
          gap={gap}
          direction={i % 2 ? "up" : "down"}
          key={i}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <RestaurantCard key={index} />
          ))}
        </Carousel>
      ))}
    </Stack>
  );
}
