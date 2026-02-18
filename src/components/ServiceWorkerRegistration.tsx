"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!("serviceWorker" in navigator)) {
      return;
    }

    const cachePrefix = "capybara-quotes";
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const swPath = `${basePath}/sw.js`;

    if (process.env.NODE_ENV !== "production") {
      // If a service worker from a previous production run is still controlling
      // localhost, it can serve cached assets and make Fast Refresh look broken.
      if (!navigator.serviceWorker.controller) {
        return;
      }

      const sessionKey = "capybara-quotes:sw-dev-cleanup";
      try {
        if (window.sessionStorage.getItem(sessionKey) === "1") {
          return;
        }
        window.sessionStorage.setItem(sessionKey, "1");
      } catch {
        // Ignore session storage failures.
      }

      (async () => {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          await registration?.unregister();
        } catch {
          // Ignore unregistration errors.
        }

        try {
          if ("caches" in window) {
            const keys = await caches.keys();
            await Promise.all(
              keys.filter((key) => key.startsWith(cachePrefix)).map((key) => caches.delete(key))
            );
          }
        } catch {
          // Ignore cache deletion errors.
        }

        if (navigator.serviceWorker.controller) {
          window.location.reload();
        }
      })();

      return;
    }

    const handleLoad = () => {
      navigator.serviceWorker
        .register(swPath, { updateViaCache: "none" })
        .catch(() => {
          // Ignore registration errors in offline/unsupported cases.
        });
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null;
}
