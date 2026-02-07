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
      className="group w-full cursor-pointer rounded-3xl text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral/60"
      aria-label={`${title}. ${subtitle}`}
    >
      <div className="relative w-full overflow-hidden rounded-3xl border border-moss-700/15 bg-white/70 shadow-card">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] group-active:scale-[0.99]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-moss-900/55 via-moss-900/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="text-lg font-semibold tracking-wide">{title}</p>
            <p className="text-sm text-white/80">{subtitle}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
