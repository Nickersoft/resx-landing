import { Accordion } from "@/components/ui/Accordion";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function List({ children }: ListProps): React.JSX.Element {
  return (
    <Accordion type="multiple" className="mx-auto max-w-3xl">
      {children}
    </Accordion>
  );
}
