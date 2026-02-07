"use client";

import { useEffect, useState } from "react";
import CapybaraCard from "@/components/CapybaraCard";
import QuoteBox from "@/components/QuoteBox";
import InstallButton from "@/components/InstallButton";
import { getRandomQuote, quotePools, type Quote, type QuotePool } from "@/lib/quotes";

type StoredQuote = Quote & {
  pool: QuotePool;
  timestamp: number;
};

const STORAGE_KEY = "capybara-quotes:last";

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<StoredQuote | null>(null);
  const [lastByPool, setLastByPool] = useState<Record<QuotePool, string | null>>({
    calm: null,
    motivation: null
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as StoredQuote;
      if (parsed?.text && parsed?.pool) {
        setCurrentQuote(parsed);
        setLastByPool((prev) => ({ ...prev, [parsed.pool]: parsed.text }));
      }
    } catch {
      // Ignore malformed storage.
    }
  }, []);

  const handlePick = (pool: QuotePool) => {
    const nextQuote = getRandomQuote(quotePools[pool], lastByPool[pool]);
    const nextStored: StoredQuote = {
      ...nextQuote,
      pool,
      timestamp: Date.now()
    };

    setCurrentQuote(nextStored);
    setLastByPool((prev) => ({ ...prev, [pool]: nextQuote.text }));

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStored));
    } catch {
      // Ignore storage failures (private mode, etc.).
    }

    if ("vibrate" in navigator) {
      navigator.vibrate(12);
    }
  };

  return (
    <main className="flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-moss-700/70">Capybara Quotes</p>
            <h1 className="mt-3 text-3xl font-semibold text-moss-900 md:text-4xl">
              Two capybaras. Two moods. One gentle boost.
            </h1>
            <p className="mt-3 max-w-2xl text-base text-moss-700">
              Tap a capybara to pull a quote from its pool. Calm for quiet days, motivation for action days.
            </p>
          </div>
          <InstallButton />
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-2" aria-label="Choose a capybara">
          <CapybaraCard
            title="Calm Capybara"
            subtitle="Peaceful, grounding quotes"
            imageSrc="/images/capybara-a.jpg"
            alt="A relaxed capybara resting near water"
            onSelect={() => handlePick("calm")}
          />
          <CapybaraCard
            title="Motivation Capybara"
            subtitle="Action-focused quotes"
            imageSrc="/images/capybara-b.jpg"
            alt="A capybara looking alert in green grass"
            onSelect={() => handlePick("motivation")}
          />
        </section>

        <QuoteBox quote={currentQuote} />

        <p className="mt-6 text-xs text-moss-700/70">
          Quotes stay on this device and continue to show offline after you've picked one.
        </p>
      </div>
    </main>
  );
}
