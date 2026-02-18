import React from "react";
import type { Quote } from "@/lib/quotes";

type QuoteBoxProps = {
  quote: Quote | null;
};

export default function QuoteBox({ quote }: QuoteBoxProps) {
  return (
    <section
      aria-live="polite"
      className="relative flex w-full min-h-0 flex-col overflow-hidden rounded-[1.75rem] border border-moss-700/15 bg-white/78 p-3 shadow-[0_18px_42px_rgba(18,44,35,0.16)] backdrop-blur-sm sm:p-4 lg:p-4"
    >
      <h2 className="sr-only">Quote</h2>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
        {quote ? (
          <blockquote
            key={quote.text}
            className="min-w-0 motion-safe:animate-quote"
          >
            <p className="break-words hyphens-auto font-[var(--font-display)] text-[clamp(1.45rem,5vw,2.2rem)] font-semibold leading-[1.15] tracking-tight text-moss-900">
              &ldquo;{quote.text}&rdquo;
            </p>
            {quote.author ? (
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-moss-700/70 sm:text-sm">
                - {quote.author}
              </p>
            ) : null}
          </blockquote>
        ) : (
          <div className="min-w-0 motion-safe:animate-quote">
            <p className="break-words font-[var(--font-display)] text-[clamp(1.45rem,5vw,2.1rem)] font-semibold leading-[1.15] tracking-tight text-moss-900">
              Tap the capybara to get a quote.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
