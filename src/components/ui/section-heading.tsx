import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em]",
            align === "center" && "justify-center",
            light ? "text-gold-light" : "text-gold-dark"
          )}
        >
          <span className="h-px w-8 bg-gold/60" />
          {eyebrow}
          <span className="h-px w-8 bg-gold/60" />
        </div>
      )}
      <h2
        className={cn(
          "font-display text-3xl leading-tight sm:text-4xl md:text-5xl",
          light ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed", light ? "text-cream/70" : "text-ink/65")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
