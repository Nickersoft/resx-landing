import { NavigationBar } from "@/components/ui/NavigationBar";
import Logo from "~icons/assets/logo";
import { Button } from "./ui/Button";
import { Stack } from "./ui/Stack";

export function Navigation() {
  return (
    <nav className="bg-coal/80 fixed top-4 left-1/2 z-999 container flex h-18 -translate-x-1/2 flex-row items-center justify-between rounded-full border bg-gradient-to-br from-white/0 via-white/3 to-white/0 p-4 pl-8 backdrop-blur-md">
      <Logo className="h-9 w-20" />

      <NavigationBar>
        <Stack
          orientation="row"
          align="center"
          gap="lg"
          className="max-lg:h-full max-lg:flex-col max-lg:items-start"
        >
          <Stack
            orientation="row"
            gap="lg"
            align="center"
            className="[&>a]:text-muted-foreground [&>a]:hover:text-primary flex text-sm max-lg:flex-1 max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:text-lg [&>a]:transition-colors [&>a]:duration-300"
          >
            <a href="#">About ResX</a>
            <a href="#">Submit</a>
            <a href="#">Claim</a>
          </Stack>

          <Button className="max-lg:h-12 max-lg:w-full max-lg:text-lg">
            Download
          </Button>
        </Stack>
      </NavigationBar>
    </nav>
  );
}
