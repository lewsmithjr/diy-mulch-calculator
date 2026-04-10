"use client";

export type BedShape = "rectangle" | "circle";

export interface Bed {
  id: string;
  shape: BedShape;
  length: string;
  width: string;
  radius: string;
}

export function calcBedSqft(bed: Bed): number {
  if (bed.shape === "rectangle") {
    const l = parseFloat(bed.length) || 0;
    const w = parseFloat(bed.width) || 0;
    return l * w;
  } else {
    const r = parseFloat(bed.radius) || 0;
    return r * r * 3.14;
  }
}

interface BedEntryProps {
  bed: Bed;
  index: number;
  onUpdate: (id: string, updates: Partial<Bed>) => void;
  onRemove: (id: string) => void;
  showRemove: boolean;
}

export default function BedEntry({
  bed,
  index,
  onUpdate,
  onRemove,
  showRemove,
}: BedEntryProps) {
  const sqft = calcBedSqft(bed);

  return (
    <div className="bg-[var(--color-rdiy-brown-light)] rounded-xl p-4 border border-[var(--color-rdiy-brown)]/20">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-[var(--color-rdiy-dark)]">
          Bed {index + 1}
        </span>
        {showRemove && (
          <button
            onClick={() => onRemove(bed.id)}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            aria-label={`Remove bed ${index + 1}`}
          >
            Remove
          </button>
        )}
      </div>

      {/* Shape selector */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => onUpdate(bed.id, { shape: "rectangle" })}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
            bed.shape === "rectangle"
              ? "bg-[var(--color-rdiy-brown)] text-white border-[var(--color-rdiy-brown)]"
              : "bg-white text-gray-600 border-gray-200 hover:border-[var(--color-rdiy-brown)]"
          }`}
        >
          Rectangle / Square
        </button>
        <button
          onClick={() => onUpdate(bed.id, { shape: "circle" })}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
            bed.shape === "circle"
              ? "bg-[var(--color-rdiy-brown)] text-white border-[var(--color-rdiy-brown)]"
              : "bg-white text-gray-600 border-gray-200 hover:border-[var(--color-rdiy-brown)]"
          }`}
        >
          Circle / Round
        </button>
      </div>

      {/* Dimension inputs */}
      {bed.shape === "rectangle" ? (
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">
              Length (ft)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={bed.length}
              onChange={(e) => onUpdate(bed.id, { length: e.target.value })}
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-rdiy-brown)] focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">
              Width (ft)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={bed.width}
              onChange={(e) => onUpdate(bed.id, { width: e.target.value })}
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-rdiy-brown)] focus:border-transparent"
            />
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <label className="text-xs text-gray-500 mb-1 block">
            Radius — center to edge (ft)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={bed.radius}
            onChange={(e) => onUpdate(bed.id, { radius: e.target.value })}
            placeholder="0"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-rdiy-brown)] focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">
            Irregular bed? Draw a loose rectangle around it instead.
          </p>
        </div>
      )}

      {/* Per-bed sq ft result */}
      {sqft > 0 && (
        <div className="text-right text-sm font-medium text-[var(--color-rdiy-brown)]">
          {sqft.toFixed(1)} sq ft
        </div>
      )}
    </div>
  );
}
