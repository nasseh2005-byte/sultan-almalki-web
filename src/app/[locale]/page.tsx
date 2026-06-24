import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteExperience } from "@/components/site-experience";
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

  const copy = siteCopy[locale];

  return {
    title: copy.legalName,
    description: copy.tagline,
    alternates: {
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },
  };
}

export default async function LocaleHome({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <SiteExperience locale={locale as Locale} />;
}
