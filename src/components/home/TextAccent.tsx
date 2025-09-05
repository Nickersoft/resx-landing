interface TextAccentProps {
  children: string;
}

export function TextAccent({ children }: TextAccentProps) {
  return (
    <span className="bg-sand-storm! -mb-8 inline-block bg-gradient-to-b from-white/50 bg-[size:100%_1lh] bg-clip-text bg-repeat-y pb-8 text-transparent bg-blend-soft-light">
      {children}
    </span>
  );
}
