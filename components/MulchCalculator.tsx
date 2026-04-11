"use client";

import { useState } from "react";
import Image from "next/image";
import BedEntry, { calcBedSqft, type Bed } from "@/components/BedEntry";

type SqftMode = "direct" | "beds";
type OutputMode = "bulk" | "bags";

const DEPTH_MULTIPLIERS: Record<number, number> = {
  1: 0.083,
  2: 0.167,
  3: 0.25,
  4: 0.33,
};

const BAG_SIZES = [
  { label: "1.5 cu ft", value: 1.5 },
  { label: "2 cu ft — most common", value: 2 },
  { label: "3 cu ft", value: 3 },
];

const DEPTHS = [1, 2, 3, 4];

function newBed(): Bed {
  return {
    id: crypto.randomUUID(),
    shape: "rectangle",
    length: "",
    width: "",
    radius: "",
  };
}

function bedDescription(bed: Bed, index: number): string {
  if (bed.shape === "rectangle") {
    const l = parseFloat(bed.length) || 0;
    const w = parseFloat(bed.width) || 0;
    return `Bed ${index + 1}: ${l} ft × ${w} ft (rectangle) = ${(l * w).toFixed(1)} sq ft`;
  } else {
    const r = parseFloat(bed.radius) || 0;
    const sqft = r * r * 3.14;
    return `Bed ${index + 1}: radius ${r} ft (circle) = ${sqft.toFixed(1)} sq ft`;
  }
}

export default function MulchCalculator() {
  const [sqftMode, setSqftMode] = useState<SqftMode | null>(null);
  const [directSqft, setDirectSqft] = useState("");
  const [beds, setBeds] = useState<Bed[]>([newBed()]);
  const [depth, setDepth] = useState<number>(2);
  const [outputMode, setOutputMode] = useState<OutputMode>("bags");
  const [bagSize, setBagSize] = useState<number>(2);

  const totalSqft =
    sqftMode === "direct"
      ? parseFloat(directSqft) || 0
      : beds.reduce((sum, bed) => sum + calcBedSqft(bed), 0);

  const bulkResult = (totalSqft / 324) * depth;
  const bagResult = Math.ceil((totalSqft * DEPTH_MULTIPLIERS[depth]) / bagSize);

  const hasResult = totalSqft > 0;

  function addBed() {
    setBeds((prev) => [...prev, newBed()]);
  }

  function updateBed(id: string, updates: Partial<Bed>) {
    setBeds((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  }

  function removeBed(id: string) {
    setBeds((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <>
      {/* ── SCREEN UI ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-8 print:hidden">
        <h2 className="text-xl font-bold text-[var(--color-rdiy-dark)]">
          Mulch Calculator
        </h2>

        {/* ── STEP 1: Square Footage Entry Mode ── */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
            Step 1 — Square footage
          </h3>

          {sqftMode === null && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setSqftMode("direct")}
                className="flex-1 border-2 border-[var(--color-rdiy-green)] rounded-xl p-4 text-left hover:bg-[var(--color-rdiy-green-light)] transition-colors"
              >
                <div className="font-semibold text-[var(--color-rdiy-green-dark)] mb-1">
                  I know my total square footage
                </div>
                <div className="text-sm text-gray-500">
                  Enter one number and move on.
                </div>
              </button>
              <button
                onClick={() => setSqftMode("beds")}
                className="flex-1 border-2 border-[var(--color-rdiy-brown)] rounded-xl p-4 text-left hover:bg-[var(--color-rdiy-brown-light)] transition-colors"
              >
                <div className="font-semibold text-[var(--color-rdiy-dark)] mb-1">
                  Help me calculate it
                </div>
                <div className="text-sm text-gray-500">
                  Enter each bed&apos;s dimensions — I&apos;ll add them up.
                </div>
              </button>
            </div>
          )}

          {sqftMode === "direct" && (
            <div className="space-y-3">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label
                    htmlFor="direct-sqft"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Total square footage
                  </label>
                  <input
                    id="direct-sqft"
                    type="number"
                    min="0"
                    step="1"
                    value={directSqft}
                    onChange={(e) => setDirectSqft(e.target.value)}
                    placeholder="e.g. 240"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-rdiy-green)] focus:border-transparent"
                  />
                </div>
                <span className="pb-3 text-gray-500 font-medium">sq ft</span>
              </div>
              <button
                onClick={() => { setSqftMode(null); setDirectSqft(""); }}
                className="text-sm text-gray-400 hover:text-gray-600 underline"
              >
                Switch to bed-by-bed entry
              </button>
            </div>
          )}

          {sqftMode === "beds" && (
            <div className="space-y-3">
              {beds.map((bed, i) => (
                <BedEntry
                  key={bed.id}
                  bed={bed}
                  index={i}
                  onUpdate={updateBed}
                  onRemove={removeBed}
                  showRemove={beds.length > 1}
                />
              ))}

              <button
                onClick={addBed}
                className="w-full py-2 border-2 border-dashed border-[var(--color-rdiy-brown)]/40 rounded-xl text-sm font-medium text-[var(--color-rdiy-brown)] hover:border-[var(--color-rdiy-brown)] hover:bg-[var(--color-rdiy-brown-light)] transition-colors"
              >
                + Add Another Bed
              </button>

              {totalSqft > 0 && (
                <div className="flex justify-between items-center bg-[var(--color-rdiy-green-light)] rounded-xl px-4 py-3">
                  <span className="text-sm font-medium text-[var(--color-rdiy-green-dark)]">
                    Total square footage
                  </span>
                  <span className="text-lg font-bold text-[var(--color-rdiy-green-dark)]">
                    {totalSqft.toFixed(1)} sq ft
                  </span>
                </div>
              )}

              <button
                onClick={() => { setSqftMode(null); setBeds([newBed()]); }}
                className="text-sm text-gray-400 hover:text-gray-600 underline"
              >
                Switch to direct entry
              </button>
            </div>
          )}
        </section>

        {/* ── STEP 2: Depth ── */}
        {sqftMode !== null && (
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Step 2 — Mulch depth
            </h3>
            <div className="flex gap-2">
              {DEPTHS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDepth(d)}
                  className={`flex-1 py-3 rounded-lg font-semibold text-sm border-2 transition-colors ${
                    depth === d
                      ? "bg-[var(--color-rdiy-green)] text-white border-[var(--color-rdiy-green)]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[var(--color-rdiy-green)]"
                  }`}
                >
                  {d}&quot;
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Most people go 2–3 inches. 1 inch is a light refresh; 4 inches is
              a heavy new install.
            </p>
          </section>
        )}

        {/* ── STEP 3: Output mode ── */}
        {sqftMode !== null && (
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Step 3 — How are you buying?
            </h3>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setOutputMode("bags")}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm border-2 transition-colors ${
                  outputMode === "bags"
                    ? "bg-[var(--color-rdiy-green)] text-white border-[var(--color-rdiy-green)]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[var(--color-rdiy-green)]"
                }`}
              >
                Bags
              </button>
              <button
                onClick={() => setOutputMode("bulk")}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm border-2 transition-colors ${
                  outputMode === "bulk"
                    ? "bg-[var(--color-rdiy-green)] text-white border-[var(--color-rdiy-green)]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[var(--color-rdiy-green)]"
                }`}
              >
                Bulk delivery
              </button>
            </div>

            {outputMode === "bags" && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Bag size
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  {BAG_SIZES.map((bag) => (
                    <button
                      key={bag.value}
                      onClick={() => setBagSize(bag.value)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm border-2 transition-colors ${
                        bagSize === bag.value
                          ? "bg-[var(--color-rdiy-brown)] text-white border-[var(--color-rdiy-brown)]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[var(--color-rdiy-brown)]"
                      }`}
                    >
                      {bag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ── RESULT ── */}
        {sqftMode !== null && hasResult && (
          <section className="bg-[var(--color-rdiy-green)] rounded-2xl p-6 text-white text-center">
            <div className="text-sm font-medium opacity-80 mb-1 uppercase tracking-wide">
              You need
            </div>
            {outputMode === "bags" ? (
              <>
                <div className="text-5xl font-bold mb-1" style={{ fontFamily: "var(--font-fraunces)" }}>{bagResult}</div>
                <div className="text-lg opacity-90">{bagSize} cu ft bags</div>
                <p className="text-xs opacity-70 mt-3">
                  Based on {totalSqft.toFixed(0)} sq ft at {depth}&quot; deep ÷{" "}
                  {bagSize} cu ft per bag
                </p>
              </>
            ) : (
              <>
                <div className="text-5xl font-bold mb-1" style={{ fontFamily: "var(--font-fraunces)" }}>
                  {bulkResult.toFixed(2)}
                </div>
                <div className="text-lg opacity-90">cubic yards</div>
                <p className="text-xs opacity-70 mt-3">
                  Based on {totalSqft.toFixed(0)} sq ft at {depth}&quot; deep
                </p>
              </>
            )}

            <button
              onClick={() => window.print()}
              className="mt-5 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors border border-white/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print results
            </button>
          </section>
        )}

        {sqftMode !== null && !hasResult && (
          <p className="text-center text-sm text-gray-400 pt-2">
            Enter your measurements above to see the result.
          </p>
        )}
      </div>

      {/* ── PRINT-ONLY SUMMARY ── */}
      {hasResult && sqftMode !== null && (
        <div className="sr-only print:not-sr-only print-summary">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-black">
            <Image
              src="/RDIYers Transparent Logo Black.png"
              alt="Reluctant DIYers"
              width={160}
              height={55}
            />
            <div>
              <h1 className="text-xl font-bold">Mulch Calculator Results</h1>
              <p className="text-sm text-gray-500">DIYMulchCalculator.com</p>
            </div>
          </div>

          <table className="w-full text-sm border-collapse mb-6">
            <tbody>
              {/* Beds breakdown */}
              {sqftMode === "beds" && beds.filter(b => calcBedSqft(b) > 0).map((bed, i) => (
                <tr key={bed.id} className="border-b border-gray-200">
                  <td className="py-2 text-gray-500 w-1/2">{bedDescription(bed, i).split("=")[0].trim()}</td>
                  <td className="py-2 font-medium text-right">{calcBedSqft(bed).toFixed(1)} sq ft</td>
                </tr>
              ))}

              {/* Total sq ft */}
              <tr className="border-b-2 border-black font-bold">
                <td className="py-2">
                  {sqftMode === "direct" ? "Total area entered" : `Total (${beds.filter(b => calcBedSqft(b) > 0).length} bed${beds.filter(b => calcBedSqft(b) > 0).length !== 1 ? "s" : ""})`}
                </td>
                <td className="py-2 text-right">{totalSqft.toFixed(1)} sq ft</td>
              </tr>

              <tr className="border-b border-gray-200">
                <td className="py-2 text-gray-500">Mulch depth</td>
                <td className="py-2 font-medium text-right">{depth} inches</td>
              </tr>

              <tr className="border-b border-gray-200">
                <td className="py-2 text-gray-500">Purchase method</td>
                <td className="py-2 font-medium text-right">
                  {outputMode === "bags" ? `Bags (${bagSize} cu ft each)` : "Bulk delivery"}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="border-2 border-black rounded p-4 text-center">
            <div className="text-sm uppercase tracking-wide text-gray-500 mb-1">You need</div>
            {outputMode === "bags" ? (
              <>
                <div className="text-5xl font-bold">{bagResult}</div>
                <div className="text-lg">{bagSize} cu ft bags</div>
              </>
            ) : (
              <>
                <div className="text-5xl font-bold">{bulkResult.toFixed(2)}</div>
                <div className="text-lg">cubic yards</div>
              </>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-6 text-center">
            Generated by the Reluctant DIYers Mulch Calculator · DIYMulchCalculator.com
          </p>
        </div>
      )}
    </>
  );
}
