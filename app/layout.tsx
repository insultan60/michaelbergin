import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const serif = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: { default: "Michael Bergin | Los Angeles Real Estate", template: "%s | Michael Bergin Real Estate" },
  description:
    "Michael Bergin is a top 1% Los Angeles real estate agent with 15+ years in Studio City, Sherman Oaks, Encino, Toluca Lake and Tarzana.",
};

export const viewport: Viewport = { themeColor: "#0b1b3a" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')",
          }}
        />
      </head>
      <body className="min-h-dvh font-sans">
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
