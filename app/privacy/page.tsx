import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Reluctant DIYers Mulch Calculator",
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-col flex-1 bg-[var(--color-rdiy-cream)]">
      <header className="w-full bg-[var(--color-rdiy-green)] text-white py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="text-white/70 hover:text-white text-sm mb-2 block"
          >
            ← Back to Calculator
          </Link>
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12 prose prose-gray">
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-[var(--color-rdiy-dark)]">
          What information we collect
        </h2>
        <p className="text-gray-600">
          When you use the mulch calculator, we ask for your email address so we
          can send you occasional tips and content from Reluctant DIYers. We do
          not collect any other personal information.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-[var(--color-rdiy-dark)]">
          How we use your email
        </h2>
        <p className="text-gray-600">
          Your email address is stored with Kit.com (formerly ConvertKit), our
          email service provider. We use it to send you DIY tips, project ideas,
          and occasional product recommendations relevant to home improvement and
          gardening. We will never sell, rent, or share your email address with
          third parties.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-[var(--color-rdiy-dark)]">
          Unsubscribing
        </h2>
        <p className="text-gray-600">
          Every email we send includes an unsubscribe link. You can opt out at
          any time with one click. You can also request deletion of your data by
          emailing us directly.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-[var(--color-rdiy-dark)]">
          Cookies and analytics
        </h2>
        <p className="text-gray-600">
          This site may use basic analytics (such as Vercel Analytics) to
          understand page traffic. No personally identifiable information is
          collected through analytics. We do not use third-party advertising
          cookies.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-[var(--color-rdiy-dark)]">
          Third-party services
        </h2>
        <p className="text-gray-600">
          We use Kit.com for email management. Their privacy policy is available
          at{" "}
          <a
            href="https://kit.com/privacy"
            className="text-[var(--color-rdiy-green)] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            kit.com/privacy
          </a>
          .
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-[var(--color-rdiy-dark)]">
          Contact
        </h2>
        <p className="text-gray-600">
          Questions about this policy? Reach out through the Reluctant DIYers
          YouTube channel or by replying to any email we send you.
        </p>
      </div>

      <footer className="border-t border-gray-100 py-6 px-4 text-center text-sm text-gray-400">
        <Link href="/" className="hover:text-[var(--color-rdiy-green)]">
          ← Back to the Mulch Calculator
        </Link>
      </footer>
    </main>
  );
}
