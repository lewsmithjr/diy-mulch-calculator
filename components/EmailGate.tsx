"use client";

import { useEffect, useRef, useState } from "react";
import MulchCalculator from "@/components/MulchCalculator";

interface EmailGateProps {
  initiallyUnlocked: boolean;
}

export default function EmailGate({ initiallyUnlocked }: EmailGateProps) {
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const scriptInjected = useRef(false);

  useEffect(() => {
    // Check localStorage on every visit — if they've submitted before, skip the form
    if (localStorage.getItem("mulch_calc_unlocked") === "true") {
      setUnlocked(true);
      return;
    }

    const reveal = () => {
      localStorage.setItem("mulch_calc_unlocked", "true");
      setUnlocked(true);
    };

    // Method 1: Kit.com custom JS event
    document.addEventListener("formkit:submit", reveal);

    // Method 2: MutationObserver — watches for Kit.com's success element
    const observer = new MutationObserver(() => {
      if (document.querySelector(".formkit-alert-success")) {
        reveal();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Inject the Kit.com script into the container div so the form
    // renders inside the card rather than appending to document.body.
    if (!scriptInjected.current && formContainerRef.current) {
      scriptInjected.current = true;
      const script = document.createElement("script");
      script.src = "https://reluctant-diyers.kit.com/65d48e0bd2/index.js";
      script.async = true;
      script.setAttribute("data-uid", "65d48e0bd2");
      formContainerRef.current.appendChild(script);
    }

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
      {/* Kit.com form — centered, above the value props */}
      <div className="flex justify-center mb-4">
        <div ref={formContainerRef} className="w-full" />
      </div>

      <p className="text-xs text-gray-400 text-center mb-6">
        No spam. Unsubscribe anytime.{" "}
        <a href="/privacy" className="underline hover:text-gray-600">
          Privacy Policy
        </a>
      </p>

      {/* What you'll get */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-semibold text-[var(--color-rdiy-dark)] mb-3">
          What you&apos;ll get:
        </h2>
        <ul className="space-y-2 text-gray-600">
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
      </div>
    </div>
  );
}
