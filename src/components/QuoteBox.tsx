import React from "react";
import type { Quote } from "@/lib/quotes";

type QuoteBoxProps = {
  quote: Quote | null;
};

export default function QuoteBox({ quote }: QuoteBoxProps) {
  return (
    <section
      aria-live="polite"
      className="relative w-full rounded-[1.75rem] border border-moss-700/15 bg-white/78 p-5 shadow-[0_18px_42px_rgba(18,44,35,0.16)] backdrop-blur-sm sm:p-6 lg:min-h-[26rem] lg:p-7 xl:min-h-[28rem] xl:p-8"
    >
      <div className="flex h-full flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-moss-700/75 sm:text-xs">Fresh Quote</p>
        {quote ? (
          <div key={quote.text} className="mt-4 motion-safe:animate-quote">
            <p className="font-[var(--font-fraunces)] text-2xl leading-tight text-moss-900 sm:text-3xl lg:text-[2.2rem]">
              &ldquo;{quote.text}&rdquo;
            </p>
            {quote.author ? (
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-moss-700 sm:text-sm">
                - {quote.author}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="mt-4 motion-safe:animate-quote">
            <p className="font-[var(--font-fraunces)] text-2xl leading-tight text-moss-900 sm:text-3xl lg:text-[2.2rem]">
              Tap the capybara to swap the photo and get a new quote.
            </p>
          </div>
        )}
        <p className="mt-auto pt-6 text-[11px] font-medium uppercase tracking-[0.12em] text-moss-700/70 sm:text-xs">
          Click as often as you want.
        </p>
      </div>
    </section>
  );
}
