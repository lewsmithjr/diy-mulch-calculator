"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import MulchCalculator from "@/components/MulchCalculator";

interface EmailGateProps {
  initiallyUnlocked: boolean;
}

export default function EmailGate({ initiallyUnlocked }: EmailGateProps) {
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);

  useEffect(() => {
    const reveal = () => setUnlocked(true);

    // Method 1: Kit.com custom JS event (fires on same-page success)
    document.addEventListener("formkit:submit", reveal);

    // Method 2: MutationObserver fallback — watches for Kit.com's success
    // message element appearing in the DOM, in case the JS event doesn't fire.
    const observer = new MutationObserver(() => {
      if (document.querySelector(".formkit-alert-success")) {
        reveal();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("formkit:submit", reveal);
      observer.disconnect();
    };
  }, []);

  if (unlocked) {
    return (
      <div className="w-full max-w-2xl mt-8">
        <div className="bg-[var(--color-rdiy-green-light)] border border-[var(--color-rdiy-green)] rounded-xl px-6 py-4 mb-8 text-center print:hidden">
          <p className="text-[var(--color-rdiy-green-dark)] font-medium">
            You&apos;re in! Use the calculator below to figure out exactly how
            much mulch to order.
          </p>
        </div>
        <MulchCalculator />
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mt-8">
      {/* ============================================================
          VALUE PROP SECTION
          ============================================================ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-semibold text-[var(--color-rdiy-dark)] mb-3">
          What you&apos;ll get:
        </h2>
        <ul className="space-y-2 text-gray-600 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-rdiy-green)] font-bold mt-0.5">✓</span>
            Calculate cubic yards for bulk mulch deliveries
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-rdiy-green)] font-bold mt-0.5">✓</span>
            Calculate exact bag count for any bed depth
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-rdiy-green)] font-bold mt-0.5">✓</span>
            Add multiple garden beds and get a combined total
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-rdiy-green)] font-bold mt-0.5">✓</span>
            Works for rectangular and circular beds
          </li>
        </ul>

        {/* Kit.com inline form — renders itself into the page */}
        <Script
          async
          data-uid="65d48e0bd2"
          src="https://reluctant-diyers.kit.com/65d48e0bd2/index.js"
          strategy="afterInteractive"
        />

        <p className="text-xs text-gray-400 text-center mt-3">
          No spam. Unsubscribe anytime.{" "}
          <a href="/privacy" className="underline hover:text-gray-600">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
