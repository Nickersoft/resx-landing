import { Carousel } from "../ui/Carousel";
import { Stack } from "../ui/Stack";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialCarousel() {
  return (
    <Stack
      orientation="column"
      className="mask-x-from-80% mask-x-to-transparent"
      align="center"
      gap="lg"
    >
      <Carousel direction="left">
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard /> <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </Carousel>
      <Carousel direction="right">
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard /> <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </Carousel>
    </Stack>
  );
}
