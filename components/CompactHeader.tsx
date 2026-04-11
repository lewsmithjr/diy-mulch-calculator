import Image from "next/image";

export default function CompactHeader() {
  return (
    <header className="w-full bg-[var(--color-rdiy-green)] print:hidden">
      <div className="max-w-2xl mx-auto px-4 h-20 flex items-center justify-between">
        <Image
          src="/RDIYers Vector WHITE (2).png"
          alt="Reluctant DIYers"
          width={220}
          height={80}
          priority
          style={{ height: "48px", width: "auto" }}
        />

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-white/85 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" style={{ boxShadow: "0 0 5px #4ade80" }} />
          Mulch Calculator
        </div>
      </div>
    </header>
  );
}
