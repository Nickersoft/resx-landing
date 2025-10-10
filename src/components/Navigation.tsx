import { NavigationBar } from "@/components/ui/NavigationBar";
import Logo from "~icons/assets/logo";
import { Button } from "./ui/Button";
import { Stack } from "./ui/Stack";

interface NavigationProps {
  currentPage: URL;
}

export function Navigation({
  currentPage,
}: NavigationProps): React.JSX.Element {
  const links = [
    { href: "/about", label: "About ResX" },
    { href: "/submit", label: "Submit" },
    { href: "/claim", label: "Claim" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 z-999 container -translate-x-1/2 px-8">
      <div className="flex min-h-17.5 w-full flex-row items-center justify-between rounded-full border bg-black/85 bg-gradient-to-br from-white/0 via-white/6 to-white/0 px-4 py-0 pl-8 ring-1 ring-black backdrop-blur-md max-md:pr-8">
        <a href="/" className="h-full">
          <Logo className="h-9 w-20" />
        </a>

        <NavigationBar>
          <Stack
            orientation="row"
            align="center"
            gap="md"
            className="max-md:h-full max-md:flex-col max-md:items-start"
          >
            <Stack
              orientation="row"
              gap="none"
              align="center"
              className="[&>a]:text-muted-foreground [&>a]:hover:text-primary flex text-sm max-md:flex-1 max-md:flex-col max-md:items-start max-md:justify-center max-md:text-lg lg:h-full [&>a]:transition-colors [&>a]:duration-300"
            >
              {links.map((link) => (
                <a
                  className="aria-[current=page]:text-primary flex items-center px-4 py-4 font-medium"
                  aria-current={
                    currentPage.pathname.startsWith(link.href)
                      ? "page"
                      : "false"
                  }
                  key={link.href}
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </Stack>

            <Button
              className="my-4 max-md:h-12 max-md:w-full max-md:text-lg"
              asChild
            >
              <a href="/download">Download</a>
            </Button>
          </Stack>
        </NavigationBar>
      </div>
    </nav>
  );
}
