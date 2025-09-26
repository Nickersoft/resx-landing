import type React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

interface ItemProps {
  question: string;
  id: string;
  children: React.ReactNode;
}

export function Item({ question, id, children }: ItemProps): React.JSX.Element {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="text-left">{question}</AccordionTrigger>
      <AccordionContent className="prose prose-sm text-muted-foreground max-w-none">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
