import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "شركة سلطان محمد المالكي للمحاماة والاستشارات القانونية",
  description:
    "موقع قانوني مؤسسي ثنائي اللغة مع مؤشرات أداء وشركاء وخدمات قانونية للمنشآت والمشاريع.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
