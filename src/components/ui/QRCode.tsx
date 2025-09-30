import { Cuer } from "cuer";

interface QRCodeProps extends Cuer.Root.Props {
  children?: React.ReactNode;
}

export function QRCode({ value, children, ...props }: QRCodeProps) {
  return (
    <Cuer.Root value={value} {...props}>
      <Cuer.Finder fill="white" radius={0.3} />
      <Cuer.Cells fill="white" radius={1} />
      <Cuer.Arena>{children}</Cuer.Arena>
    </Cuer.Root>
  );
}
