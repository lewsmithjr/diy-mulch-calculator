"use client";

import { useEffect, useRef, useState } from "react";
import MulchCalculator from "@/components/MulchCalculator";
import Hero from "@/components/Hero";
import CompactHeader from "@/components/CompactHeader";

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
      <>
        <CompactHeader />
        <div className="flex flex-col flex-1 items-center px-4 pb-16 bg-[var(--color-rdiy-cream)]">
          <div className="w-full max-w-2xl mt-8">
            <div className="bg-[var(--color-rdiy-green-light)] border border-[var(--color-rdiy-green)] rounded-xl px-6 py-4 mb-8 text-center print:hidden">
              <p className="text-[var(--color-rdiy-green-dark)] font-medium">
                You&apos;re in! Use the calculator below to figure out exactly how
                much mulch to order.
              </p>
            </div>
            <MulchCalculator />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Hero />
      <div className="flex flex-col flex-1 items-center px-4 pb-16 bg-[var(--color-rdiy-cream)]">
        <div className="w-full max-w-lg mt-8">
          {/* What you'll get — shown above the Kit.com form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
            <h2 className="text-xl font-semibold text-[var(--color-rdiy-dark)] mb-4">
              What&apos;s inside the calculator:
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-rdiy-green)] flex items-center justify-center mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <polyline points="1.5,5 3.5,7.5 8.5,2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Calculate cubic yards for bulk mulch deliveries
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-rdiy-green)] flex items-center justify-center mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <polyline points="1.5,5 3.5,7.5 8.5,2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Calculate exact bag count for any bed depth
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-rdiy-green)] flex items-center justify-center mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <polyline points="1.5,5 3.5,7.5 8.5,2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Add multiple garden beds and get a combined total
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-rdiy-green)] flex items-center justify-center mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <polyline points="1.5,5 3.5,7.5 8.5,2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Works for rectangular and circular beds
              </li>
            </ul>
          </div>

        </div>

        {/* Kit.com form — wider container, centered */}
        <div className="w-full max-w-2xl">
          <div ref={formContainerRef} className="w-full" />
          <p className="text-xs text-gray-400 text-center mt-4 mb-6">
            No spam. Unsubscribe anytime.{" "}
            <a href="/privacy" className="underline hover:text-gray-600">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
