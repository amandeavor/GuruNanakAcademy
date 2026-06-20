"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface TurnstileShieldProps {
  onChallengeSuccess: (token: string) => void;
  onChallengeExpire?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          theme?: string;
        }
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export function TurnstileShield({ onChallengeSuccess, onChallengeExpire }: TurnstileShieldProps) {
  const targetContainerRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let scriptTag = document.getElementById("cloudflare-turnstile") as HTMLScriptElement;
    let localWidgetId: string | null = null;

    const mountTurnstile = () => {
      if (window.turnstile && targetContainerRef.current && !localWidgetId) {
        try {
          const id = window.turnstile.render(targetContainerRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA", // Mock Turnstile key
            callback: onChallengeSuccess,
            "expired-callback": onChallengeExpire,
            theme: resolvedTheme === "dark" ? "dark" : "light",
          });
          localWidgetId = id;
          setWidgetId(id);
        } catch (e) {
          console.error("Error rendering Turnstile widget:", e);
        }
      }
    };

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "cloudflare-turnstile";
      scriptTag.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      scriptTag.async = true;
      scriptTag.defer = true;
      document.head.appendChild(scriptTag);
      scriptTag.onload = mountTurnstile;
    } else {
      if (window.turnstile) {
        mountTurnstile();
      } else {
        scriptTag.addEventListener("load", mountTurnstile);
      }
    }

    return () => {
      if (scriptTag) {
        scriptTag.removeEventListener("load", mountTurnstile);
      }
      if (window.turnstile && localWidgetId) {
        try {
          window.turnstile.remove(localWidgetId);
        } catch (e) {
          // Ignore removal errors on unmount
        }
      }
    };
  }, [onChallengeSuccess, onChallengeExpire, resolvedTheme]);

  return (
    <div className="flex justify-center my-4">
      <div ref={targetContainerRef} className="min-h-[65px]" />
    </div>
  );
}
