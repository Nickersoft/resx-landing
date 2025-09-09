import { NavigationBar } from "@/components/ui/NavigationBar";
import Logo from "~icons/assets/logo";
import { Button } from "./ui/Button";
import { Stack } from "./ui/Stack";

export function Navigation() {
  return (
    <nav className="bg-coal/80 fixed top-4 left-1/2 z-999 container h-18 -translate-x-1/2 rounded-full border bg-gradient-to-br from-white/0 via-white/3 to-white/0 p-4 pl-8 backdrop-blur-md">
      <NavigationBar>
        <Stack
          orientation="row"
          align="center"
          className="h-full"
          justify="between"
        >
          <Logo className="h-9 w-20" />

          <Stack
            orientation="row"
            gap="lg"
            align="center"
            className="[&>a]:text-muted-foreground [&>a]:hover:text-primary hidden text-sm lg:flex [&>a]:transition-colors [&>a]:duration-300"
          >
            <a href="#">About ResX</a>
            <a href="#">Submit</a>
            <a href="#">Claim</a>

            <Button>Download</Button>
          </Stack>
        </Stack>
      </NavigationBar>
    </nav>
  );
}
