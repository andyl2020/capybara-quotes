"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if ("serviceWorker" in navigator) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const swPath = `${basePath}/sw.js`;
      const handleLoad = () => {
        navigator.serviceWorker.register(swPath).catch(() => {
          // Ignore registration errors in offline/unsupported cases.
        });
      };

      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  return null;
}
