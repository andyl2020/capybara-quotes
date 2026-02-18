"use client";

import { useEffect, useState } from "react";
import CapybaraCard from "@/components/CapybaraCard";
import QuoteBox from "@/components/QuoteBox";
import { allQuotes, getRandomQuote, type Quote } from "@/lib/quotes";

type CapybaraImage = {
  src: string;
  alt: string;
};

type StoredState = {
  quote: Quote;
  imageIndex: number;
  imageSrc?: string;
  timestamp: number;
};

const STORAGE_KEY = "capybara-quotes:last";
const CAPYBARA_IMAGES: CapybaraImage[] = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/028_Capybara_and_Pink_Ip%C3%AA_trees_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/1280px-028_Capybara_and_Pink_Ip%C3%AA_trees_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    alt: "Capybara near pink trees"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/046_Capybara_by_the_river_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/1280px-046_Capybara_by_the_river_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    alt: "Capybara by a river"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/053_Capybara_with_Cattle_tyrant_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/1280px-053_Capybara_with_Cattle_tyrant_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    alt: "Capybara with a bird perched on it"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/055_Capybara_swimming_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/1280px-055_Capybara_swimming_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    alt: "Capybara swimming"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/057_Capybara_mother_nursing_her_babies_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/1280px-057_Capybara_mother_nursing_her_babies_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    alt: "Capybara mother and babies"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/073_Capybara_mother_and_baby_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/1280px-073_Capybara_mother_and_baby_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    alt: "Capybara with baby by the water"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/158_Capybara_jumping_in_the_river_to_escape_a_Jaguar_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/1280px-158_Capybara_jumping_in_the_river_to_escape_a_Jaguar_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    alt: "Capybara jumping into water"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Capivara%28Hydrochoerus_hydrochaeris%29.jpg/1280px-Capivara%28Hydrochoerus_hydrochaeris%29.jpg",
    alt: "Capybara portrait"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Capybara_%28Hydrochoerus_hydrochaeris%29.jpg/1280px-Capybara_%28Hydrochoerus_hydrochaeris%29.jpg",
    alt: "Capybara standing in grass"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Capybara_%28Hydrochoerus_hydrochaeris%29_alpha_male.JPG/1280px-Capybara_%28Hydrochoerus_hydrochaeris%29_alpha_male.JPG",
    alt: "Capybara alpha male"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Carpinchos_juveniles_%28Hydrochoerus_hydrochaeris%29%2C_Uruguay%2C_2019.jpg/1280px-Carpinchos_juveniles_%28Hydrochoerus_hydrochaeris%29%2C_Uruguay%2C_2019.jpg",
    alt: "Young capybaras together"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Cattle_tyrant_%28Machetornis_rixosa%29_on_Capybara.jpg/1280px-Cattle_tyrant_%28Machetornis_rixosa%29_on_Capybara.jpg",
    alt: "Capybara with cattle tyrant bird"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hydrochoerus_hydrochaeris_-_Gabriel_Jov%C3%AAncio_Ribeiro_-_423061493.jpeg/1280px-Hydrochoerus_hydrochaeris_-_Gabriel_Jov%C3%AAncio_Ribeiro_-_423061493.jpeg",
    alt: "Capybara in greenery"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Hydrochoerus_hydrochaeris_174291453.jpg/1280px-Hydrochoerus_hydrochaeris_174291453.jpg",
    alt: "Capybara in wetland habitat"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Hydrochoerus_hydrochaeris_174291458.jpg/1280px-Hydrochoerus_hydrochaeris_174291458.jpg",
    alt: "Capybara close-up in grass"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Hydrochoerus_hydrochaeris_174291463.jpg/1280px-Hydrochoerus_hydrochaeris_174291463.jpg",
    alt: "Capybara by foliage"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Hydrochoerus_hydrochaeris_181536676.jpg/1280px-Hydrochoerus_hydrochaeris_181536676.jpg",
    alt: "Capybara in brush"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Hydrochoerus_hydrochaeris_188742537.jpg/1280px-Hydrochoerus_hydrochaeris_188742537.jpg",
    alt: "Capybara outdoors"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Hydrochoerus_hydrochaeris_188912237.jpg/1280px-Hydrochoerus_hydrochaeris_188912237.jpg",
    alt: "Capybara near water edge"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Hydrochoerus_hydrochaeris_202512368.jpg/1280px-Hydrochoerus_hydrochaeris_202512368.jpg",
    alt: "Capybara in natural reserve"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Hydrochoerus_hydrochaeris_203709211.jpg/1280px-Hydrochoerus_hydrochaeris_203709211.jpg",
    alt: "Capybara looking toward camera"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hydrochoerus_hydrochaeris_214158740.jpg/1280px-Hydrochoerus_hydrochaeris_214158740.jpg",
    alt: "Capybara among plants"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Hydrochoerus_hydrochaeris_216288510.jpg/1280px-Hydrochoerus_hydrochaeris_216288510.jpg",
    alt: "Capybara in sunlight"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hydrochoerus_hydrochaeris_217191532.jpg/1280px-Hydrochoerus_hydrochaeris_217191532.jpg",
    alt: "Capybara near a riverbank"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Hydrochoerus_hydrochaeris_217252709.jpg/1280px-Hydrochoerus_hydrochaeris_217252709.jpg",
    alt: "Capybara by water plants"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Hydrochoerus_hydrochaeris_222765242.jpg/1280px-Hydrochoerus_hydrochaeris_222765242.jpg",
    alt: "Capybara resting in grass"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Hydrochoerus_hydrochaeris_222765368.jpg/1280px-Hydrochoerus_hydrochaeris_222765368.jpg",
    alt: "Capybara profile view"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hydrochoerus_hydrochaeris_222765445.jpg/1280px-Hydrochoerus_hydrochaeris_222765445.jpg",
    alt: "Capybara near a pond"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Hydrochoerus_hydrochaeris_222765519.jpg/1280px-Hydrochoerus_hydrochaeris_222765519.jpg",
    alt: "Capybara by the shoreline"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Hydrochoerus_hydrochaeris_222765566.jpg/1280px-Hydrochoerus_hydrochaeris_222765566.jpg",
    alt: "Capybara in a grassy field"
  }
];

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [lastQuoteText, setLastQuoteText] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = CAPYBARA_IMAGES[currentImageIndex] ?? CAPYBARA_IMAGES[0];

  useEffect(() => {
    let isMounted = true;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return () => {
        isMounted = false;
      };
    }

    try {
      const parsed = JSON.parse(stored) as Partial<StoredState & Quote>;
      const restoredQuote = parsed.quote?.text
        ? parsed.quote
        : parsed.text
          ? { text: parsed.text, author: parsed.author }
          : null;
      const legacyImageSrc = typeof parsed.imageSrc === "string" ? parsed.imageSrc : "";
      const legacyImageIndex = CAPYBARA_IMAGES.findIndex((image) => image.src === legacyImageSrc);
      const restoredImageIndex =
        typeof parsed.imageIndex === "number" && parsed.imageIndex >= 0 && parsed.imageIndex < CAPYBARA_IMAGES.length
          ? parsed.imageIndex
          : legacyImageIndex >= 0
            ? legacyImageIndex
            : 0;

      queueMicrotask(() => {
        if (!isMounted) {
          return;
        }

        if (restoredQuote) {
          setCurrentQuote(restoredQuote);
          setLastQuoteText(restoredQuote.text);
        }
        setCurrentImageIndex(restoredImageIndex);
      });
    } catch {
      // Ignore malformed storage.
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = () => {
    const nextImageIndex = (currentImageIndex + 1) % CAPYBARA_IMAGES.length;
    const nextQuote = getRandomQuote(allQuotes, lastQuoteText);
    const nextStored: StoredState = {
      quote: nextQuote,
      imageIndex: nextImageIndex,
      imageSrc: CAPYBARA_IMAGES[nextImageIndex].src,
      timestamp: Date.now()
    };

    setCurrentImageIndex(nextImageIndex);
    setCurrentQuote(nextQuote);
    setLastQuoteText(nextQuote.text);

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
    <main className="relative isolate min-h-screen overflow-x-clip px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/50 to-transparent sm:h-52" />
      <div className="pointer-events-none absolute right-[-7rem] top-16 h-64 w-64 rounded-full bg-coral/25 blur-3xl sm:right-[-5rem] sm:top-24 sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute left-[-8rem] bottom-[-6rem] h-72 w-72 rounded-full bg-moss-700/18 blur-3xl sm:left-[-6rem] sm:h-80 sm:w-80" />
      <div className="relative mx-auto w-full max-w-6xl">
        <header className="grid gap-4">
          <div>
            <p className="inline-flex rounded-full border border-moss-700/20 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-moss-700/85 sm:px-4 sm:text-xs">
              Capybara Quotes
            </p>
            <h1 className="mt-4 max-w-4xl font-[var(--font-display)] text-[clamp(2.1rem,6.8vw,4.8rem)] leading-[1.03] text-moss-900">
              One capybara. Better vibes. Every tap.
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-moss-700/90 sm:text-base lg:text-lg">
              Tap the capybara to get a new photo and quote.
            </p>
          </div>
        </header>

        <section className="mt-6 grid items-start gap-5 sm:mt-8 sm:gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,1fr)] xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,1fr)]">
          <CapybaraCard
            title="Capybara Gallery"
            subtitle="Tap for a new photo and a new quote."
            imageSrc={currentImage.src}
            alt={currentImage.alt}
            onSelect={handleRefresh}
          />
          <QuoteBox quote={currentQuote} />
        </section>

        <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.12em] text-moss-700/70 sm:mt-6 sm:text-xs">
          Local only storage. Works offline after first load.
        </p>
      </div>
    </main>
  );
}
