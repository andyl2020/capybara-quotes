export type Quote = {
  text: string;
  author?: string;
};

export type QuotePool = "calm" | "motivation";

export const calmQuotes: Quote[] = [
  { text: "Breathe in the quiet and let the day soften around you." },
  { text: "Slow moments are not empty; they are where clarity settles." },
  { text: "Let peace be a practice, not a place." },
  { text: "A calm mind turns small steps into steady progress." },
  { text: "Still water reflects the sky; still thoughts reflect your heart." },
  { text: "Rest is not a pause from life, it is part of living well." },
  { text: "Gentle focus can move mountains without raising dust." },
  { text: "Choose softness, and strength will follow." },
  { text: "The present moment already knows the way home." },
  { text: "Patience is the quiet confidence of time." },
  { text: "Ease arrives when you stop wrestling the tide." },
  { text: "Peace begins with a single unhurried breath." },
  { text: "Let your pace be kind, and your path will be clear." },
  { text: "Serenity is a decision you can renew each morning." },
  { text: "When you slow down, your spirit catches up." }
];

export const motivationQuotes: Quote[] = [
  { text: "Start before you feel ready, and readiness will meet you." },
  { text: "Action is the spark that turns intention into change." },
  { text: "Small moves, repeated, create unstoppable momentum." },
  { text: "You are allowed to be a beginner with big goals." },
  { text: "Courage grows every time you do the next right thing." },
  { text: "Your future self is cheering for today's effort." },
  { text: "Progress is louder than perfection." },
  { text: "Decide, commit, and let the path reveal itself." },
  { text: "Energy follows effort; show up and it will come." },
  { text: "Bold steps are just ordinary steps taken on purpose." },
  { text: "Turn your curiosity into your next concrete action." },
  { text: "The best time to begin is the moment you stop waiting." },
  { text: "Motion turns doubt into direction." },
  { text: "If it matters to you, make a move today." },
  { text: "Success is built from the brave choice to begin." }
];

export const quotePools: Record<QuotePool, Quote[]> = {
  calm: calmQuotes,
  motivation: motivationQuotes
};

export const allQuotes: Quote[] = [...calmQuotes, ...motivationQuotes];

export function getRandomQuote(pool: Quote[], previousText?: string | null): Quote {
  if (pool.length === 0) {
    return { text: "A calm moment is still a moment." };
  }

  if (pool.length === 1) {
    return pool[0];
  }

  let nextQuote = pool[Math.floor(Math.random() * pool.length)];
  while (previousText && nextQuote.text === previousText) {
    nextQuote = pool[Math.floor(Math.random() * pool.length)];
  }

  return nextQuote;
}
