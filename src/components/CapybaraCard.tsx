"use client";

import Image from "next/image";

type CapybaraCardProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
  alt: string;
  onSelect: () => void;
};

export default function CapybaraCard({ title, subtitle, imageSrc, alt, onSelect }: CapybaraCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative w-full cursor-pointer rounded-[1.75rem] border border-moss-700/15 bg-white/70 p-2 text-left shadow-[0_18px_44px_rgba(18,44,35,0.2)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_52px_rgba(18,44,35,0.24)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral/60"
      aria-label={`${title}. ${subtitle}`}
    >
      <div className="relative w-full overflow-hidden rounded-[1.35rem] border border-moss-700/15 bg-white/80">
        <div key={imageSrc} className="relative aspect-[5/6] w-full motion-safe:animate-quote sm:aspect-[4/5] lg:aspect-[4/3]">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 58vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-moss-900/5 via-moss-900/5 to-moss-900/65" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5">
            <p className="font-[var(--font-display)] text-xl leading-tight sm:text-2xl">{title}</p>
            <p className="mt-1.5 text-xs text-white/85 sm:mt-2 sm:text-sm">{subtitle}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
