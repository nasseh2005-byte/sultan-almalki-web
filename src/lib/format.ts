import type { Locale } from "@/types/snapshot";

export function formatInteger(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatSarCompact(value: number, locale: Locale) {
  const amount = value / 1_000_000;
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    minimumFractionDigits: amount >= 10 ? 1 : 2,
    maximumFractionDigits: amount >= 10 ? 1 : 2,
  }).format(amount);

  return locale === "ar" ? `${formatted} مليون ريال` : `SAR ${formatted}M`;
}

export function getLocalized<T extends { ar: string; en: string }>(
  value: T,
  locale: Locale,
) {
  return value[locale];
}
