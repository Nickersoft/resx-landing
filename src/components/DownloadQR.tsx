import { Cuer } from "cuer";

import { cn } from "@/lib/utils";

import Icon from "~icons/assets/icon";

import { GradientBorder } from "@/components/ui/GradientBorder";

interface DownloadQRProps extends React.HTMLAttributes<HTMLElement> {}

export function DownloadQR({ className, ...props }: DownloadQRProps) {
  return (
    <GradientBorder
      {...props}
      className={cn(
        "before:bg-bronze bg-coal z-10 aspect-square rounded-xl p-2 shadow-lg",
        className,
      )}
    >
      <Cuer.Root value="https://resx.co/download">
        <Cuer.Finder fill="white" radius={0.3} />
        <Cuer.Cells fill="white" radius={1} />
        <Cuer.Arena>
          <Icon />
        </Cuer.Arena>
      </Cuer.Root>
    </GradientBorder>
  );
}
