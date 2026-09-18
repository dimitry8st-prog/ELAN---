import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ÉLAN — кабинет доказательной косметологии",
  description: "Консультации по уходу за кожей, понятный план процедур и естественный результат.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
