import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface QuestionListProps {
  questions: Question[];
}

export function QuestionList({
  questions,
}: QuestionListProps): React.JSX.Element {
  return (
    <Accordion type="multiple" className="mx-auto max-w-3xl">
      {questions.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="prose prose-sm text-foreground prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
