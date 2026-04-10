import Image from "next/image";

export default function Hero() {
  return (
    <header className="w-full bg-[var(--color-rdiy-green)] text-white print:hidden">
      <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col items-center text-center gap-4">
        <Image
          src="/RDIYers Vector WHITE (2).png"
          alt="Reluctant DIYers"
          width={220}
          height={80}
          priority
        />

        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          How Much Mulch Do You Actually Need?
        </h1>

        <p className="text-base sm:text-lg opacity-85 max-w-lg">
          Stop guessing and stop overbuying. Enter your email below for instant
          access to our free mulch calculator — handles bulk orders and bags.
        </p>
      </div>
    </header>
  );
}
