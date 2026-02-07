import React from "react";
import type { Quote } from "@/lib/quotes";

type QuoteBoxProps = {
  quote: Quote | null;
};

export default function QuoteBox({ quote }: QuoteBoxProps) {
  return (
    <section
      aria-live="polite"
      className="mt-8 w-full rounded-3xl border border-moss-700/15 bg-white/80 p-6 shadow-card md:p-8"
    >
      {quote ? (
        <div key={quote.text} className="motion-safe:animate-quote">
          <p className="text-2xl leading-relaxed text-moss-900 md:text-3xl">"{quote.text}"</p>
          {quote.author ? (
            <p className="mt-4 text-base text-moss-700">- {quote.author}</p>
          ) : null}
        </div>
      ) : (
        <div className="motion-safe:animate-quote">
          <p className="text-2xl leading-relaxed text-moss-900 md:text-3xl">
            Tap a capybara to receive a fresh quote.
          </p>
        </div>
      )}
    </section>
  );
}
