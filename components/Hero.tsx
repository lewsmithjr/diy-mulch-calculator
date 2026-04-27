import Image from "next/image";

export default function Hero() {
  return (
    <header className="relative w-full bg-[var(--color-rdiy-green)] text-white print:hidden overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Gold radial glow at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 120%, rgba(201,168,76,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-4 pt-6 pb-10 flex flex-col items-center text-center gap-3">
        <Image
          src="/RDIYers Vector WHITE (2).png"
          alt="Reluctant DIYers"
          width={160}
          height={58}
          priority
        />

        <h1
          className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          How Much Mulch Do You{" "}
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "#C9A84C" }}>
            Actually
          </em>{" "}
          Need?
        </h1>

        {/* Stat pills */}
        <div className="flex gap-3 flex-wrap justify-center w-full mt-1">
          <div className="flex-1 min-w-[120px] bg-white/[0.12] border border-white/[0.25] rounded-xl px-4 py-3 text-center">
            <strong
              className="block text-4xl leading-none mb-0.5"
              style={{ fontFamily: "var(--font-fraunces)", color: "#C9A84C" }}
            >
              ~30%
            </strong>
            <span className="text-xs text-white/80 leading-snug">avg overage when<br />estimating by eye</span>
          </div>
          <div className="flex-1 min-w-[120px] bg-white/[0.12] border border-white/[0.25] rounded-xl px-4 py-3 text-center">
            <strong
              className="block text-4xl leading-none mb-0.5"
              style={{ fontFamily: "var(--font-fraunces)", color: "#C9A84C" }}
            >
              2 min
            </strong>
            <span className="text-xs text-white/80 leading-snug">to get your<br />exact number</span>
          </div>
          <div className="flex-1 min-w-[120px] bg-white/[0.12] border border-white/[0.25] rounded-xl px-4 py-3 text-center">
            <strong
              className="block text-4xl leading-none mb-0.5"
              style={{ fontFamily: "var(--font-fraunces)", color: "#C9A84C" }}
            >
              $0
            </strong>
            <span className="text-xs text-white/80 leading-snug">completely<br />free to use</span>
          </div>
        </div>
      </div>

      {/* Diagonal cream cut at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 bg-[var(--color-rdiy-cream)]"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
      />
    </header>
  );
}
