import Link from "next/link";
import Hero from "@/components/Hero";
import EmailGate from "@/components/EmailGate";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const initiallyUnlocked = params.subscribed === "true";

  return (
    <>
      <main className="flex flex-col flex-1 bg-[var(--color-rdiy-cream)]">
        <Hero />
        <div className="flex flex-col flex-1 items-center px-4 pb-16">
          <EmailGate initiallyUnlocked={initiallyUnlocked} />
        </div>
      </main>
      <footer className="border-t border-gray-100 bg-white py-6 px-4 text-center text-sm text-gray-400 print:hidden">
        <a
          href="https://www.youtube.com/@reluctantdiyers"
          className="hover:text-[var(--color-rdiy-green)] mr-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reluctant DIYers on YouTube
        </a>
        <Link href="/privacy" className="hover:text-[var(--color-rdiy-green)]">
          Privacy Policy
        </Link>
      </footer>
    </>
  );
}
