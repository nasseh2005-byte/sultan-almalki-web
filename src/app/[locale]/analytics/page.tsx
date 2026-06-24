import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnalyticsExperience } from "@/components/analytics-experience";
import { isLocale, siteCopy } from "@/lib/data";
import type { Locale } from "@/types/snapshot";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title:
      locale === "ar"
        ? "لوحة الرسوم البيانية | شركة سلطان محمد المالكي"
        : "Analytics Board | Sultan Al-Maliki Legal",
    description: siteCopy[locale].dataLead,
  };
}

export default async function AnalyticsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <AnalyticsExperience locale={locale as Locale} />;
}
