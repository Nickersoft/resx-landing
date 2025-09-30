import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import type { CollectionEntry } from "astro:content";

interface QuestionListProps {
  questions: CollectionEntry<"faq">[];
}

export function QuestionList({
  questions,
}: QuestionListProps): React.JSX.Element {
  return (
    <Accordion type="multiple" className="w-full">
      {questions.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-left">
            {faq.data.question}
          </AccordionTrigger>
          <AccordionContent className="prose prose-sm text-foreground prose-invert max-w-none [&_p]:first:mt-0 [&_p]:last:mb-0">
            <div
              dangerouslySetInnerHTML={{
                __html: faq.rendered?.html ?? "",
              }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
