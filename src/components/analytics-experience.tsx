"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, Home, Moon, SunMedium } from "lucide-react";
import { approvedSnapshot, siteCopy } from "@/lib/data";
import { formatInteger, formatSarCompact } from "@/lib/format";
import type { Locale } from "@/types/snapshot";

type AnalyticsExperienceProps = {
  locale: Locale;
};

type Theme = "dark" | "light";

const colors = {
  gold: "#C9A44C",
  blue: "#1E6BFF",
  green: "#22C55E",
  softBlue: "#8BA6FF",
};

export function AnalyticsExperience({ locale }: AnalyticsExperienceProps) {
  const copy = siteCopy[locale];
  const isRtl = locale === "ar";
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const initial = stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("theme", next);
      return next;
    });
  };

  const data = useMemo(() => {
    const companies = approvedSnapshot.contractingPortfolio.companies.map((company) => {
      const enforcement = approvedSnapshot.enforcementPortfolio.companies.find(
        (item) => item.key === company.key,
      );

      return {
        key: company.key,
        name: locale === "ar" ? company.nameAr : company.nameEn,
        cases: company.caseCount,
        portfolioAmount: company.amountSar,
        requests: enforcement?.requestCount ?? 0,
        enforcementAmount: enforcement?.amountSar ?? 0,
      };
    });

    const statuses = [
      {
        key: "stay",
        label: locale === "ar" ? "إيقاف التنفيذ" : "Stay of execution",
        count: approvedSnapshot.enforcementPortfolio.statusTotals.stayOfExecution.count,
        amount: approvedSnapshot.enforcementPortfolio.statusTotals.stayOfExecution.amountSar,
        color: colors.gold,
      },
      {
        key: "referred",
        label: locale === "ar" ? "محال إلى دائرة قضائية" : "Referred to judicial circuit",
        count: approvedSnapshot.enforcementPortfolio.statusTotals.referredToJudicialCircuit.count,
        amount:
          approvedSnapshot.enforcementPortfolio.statusTotals.referredToJudicialCircuit.amountSar,
        color: colors.blue,
      },
      {
        key: "notAccepted",
        label: locale === "ar" ? "عدم قبول" : "Not accepted",
        count: approvedSnapshot.enforcementPortfolio.statusTotals.notAccepted.count,
        amount: approvedSnapshot.enforcementPortfolio.statusTotals.notAccepted.amountSar,
        color: colors.green,
      },
    ];

    return { companies, statuses };
  }, [locale]);

  const maxCases = Math.max(...data.companies.map((item) => item.cases));
  const maxPortfolioAmount = Math.max(...data.companies.map((item) => item.portfolioAmount));
  const maxRequests = Math.max(...data.companies.map((item) => item.requests));
  const maxEnforcementAmount = Math.max(...data.companies.map((item) => item.enforcementAmount));
  const statusTotal = data.statuses.reduce((total, item) => total + item.count, 0);

  const metrics = [
    {
      label: locale === "ar" ? "ملف ومخالفة مدارة" : "Managed matters",
      value: formatInteger(approvedSnapshot.contractingPortfolio.totalCases, locale),
      tone: colors.gold,
    },
    {
      label: locale === "ar" ? "قيمة المحفظة المسجلة" : "Registered portfolio value",
      value: formatSarCompact(approvedSnapshot.contractingPortfolio.totalAmountSar, locale),
      tone: colors.blue,
    },
    {
      label: locale === "ar" ? "طلبات تنفيذ متابعة" : "Tracked enforcement requests",
      value: formatInteger(approvedSnapshot.enforcementPortfolio.totalRequests, locale),
      tone: colors.green,
    },
    {
      label: locale === "ar" ? "قيمة طلبات التنفيذ" : "Enforcement request value",
      value: formatSarCompact(approvedSnapshot.enforcementPortfolio.totalAmountSar, locale),
      tone: colors.softBlue,
    },
  ];

  return (
    <main className="analytics-shell" lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <header className="analytics-topbar">
        <Link className="brand-lockup" href={`/${locale}`}>
          <span className="brand-mark brand-logo-mark">
            <Image
              src="/brand/office-sign.jpg"
              alt={`${copy.brand} logo`}
              fill
              sizes="46px"
              className="brand-logo-img"
            />
          </span>
          <span>
            <span className="brand-title">{copy.brand}</span>
            <span className="brand-subtitle">{copy.legalName}</span>
          </span>
        </Link>

        <div className="top-actions">
          <button className="control-button" type="button" onClick={toggleTheme}>
            {theme === "dark" ? <Moon size={17} /> : <SunMedium size={17} />}
            <span>{theme === "dark" ? copy.themeDark : copy.themeLight}</span>
          </button>
          <Link className="control-button" href={`/${locale === "ar" ? "en" : "ar"}/analytics`}>
            {copy.language}
          </Link>
          <Link className="control-button" href={`/${locale}`}>
            <Home size={17} />
            <span>{locale === "ar" ? "الرئيسية" : "Home"}</span>
          </Link>
        </div>
      </header>

      <section className="analytics-hero">
        <span className="section-kicker">
          <BarChart3 size={18} />
          {locale === "ar" ? "صفحة رسوم مستقلة" : "Dedicated analytics page"}
        </span>
        <h1>
          {locale === "ar"
            ? "الرسوم البيانية بمساحة واضحة وقوية"
            : "Large, clear, evidence-led charts"}
        </h1>
        <p>
          {locale === "ar"
            ? "كل رسم يأخذ مساحته: أسماء الشركات ظاهرة، القيم مباشرة، والنسب لا تعتمد على التحويم."
            : "Each visual gets room to breathe: company names stay visible, values are direct, and percentages do not depend on hover."}
        </p>
      </section>

      <section className="metric-tiles-large" aria-label={copy.lastUpdated}>
        {metrics.map((metric) => (
          <article className="metric-tile-large" key={metric.label}>
            <span className="metric-accent" style={{ background: metric.tone }} />
            <strong dir="ltr">{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="analytics-board">
        <MegaBarChart
          title={copy.chartPortfolioCases}
          subtitle={
            locale === "ar"
              ? "مقارنة مباشرة لحجم المحفظة حسب عدد الملفات والمخالفات."
              : "Direct comparison of portfolio volume by matter count."
          }
          rows={data.companies.map((item) => ({
            id: item.key,
            label: item.name,
            value: item.cases,
            formattedValue: formatInteger(item.cases, locale),
            ratio: item.cases / maxCases,
          }))}
          color={colors.gold}
        />

        <MegaBarChart
          title={copy.chartPortfolioAmount}
          subtitle={
            locale === "ar"
              ? "القيمة المسجلة لكل شركة مع تسمية مالية مباشرة."
              : "Registered value per company with direct financial labels."
          }
          rows={data.companies.map((item) => ({
            id: item.key,
            label: item.name,
            value: item.portfolioAmount,
            formattedValue: formatSarCompact(item.portfolioAmount, locale),
            ratio: item.portfolioAmount / maxPortfolioAmount,
          }))}
          color={colors.blue}
        />

        <section className="mega-card mega-card-wide">
          <div className="mega-card-header">
            <div>
              <h2>{copy.chartEnforcement}</h2>
              <p>
                {locale === "ar"
                  ? "كل شركة تعرض عدد الطلبات وقيمتها في نفس السطر بدون ضغط المحاور."
                  : "Each company shows request count and value on the same row without squeezed axes."}
              </p>
            </div>
          </div>

          <div className="dual-bars">
            {data.companies.map((item) => (
              <article className="dual-bar-row" key={item.key}>
                <h3>{item.name}</h3>
                <InlineBar
                  label={copy.tableRequests}
                  value={formatInteger(item.requests, locale)}
                  ratio={item.requests / maxRequests}
                  color={colors.green}
                />
                <InlineBar
                  label={copy.tableAmount}
                  value={formatSarCompact(item.enforcementAmount, locale)}
                  ratio={item.enforcementAmount / maxEnforcementAmount}
                  color={colors.softBlue}
                />
              </article>
            ))}
          </div>
        </section>

        <section className="mega-card mega-card-wide donut-section">
          <div className="mega-card-header">
            <div>
              <h2>{copy.chartStatuses}</h2>
              <p>
                {locale === "ar"
                  ? "النسب مبنية على عدد مسارات التنفيذ، مع إبقاء القيم المالية في الجدول."
                  : "Percentages use path counts, with financial values kept in the table."}
              </p>
            </div>
          </div>

          <div className="donut-layout">
            <DonutChart
              total={statusTotal}
              segments={data.statuses.map((item) => ({
                id: item.key,
                label: item.label,
                value: item.count,
                color: item.color,
              }))}
              centerLabel={locale === "ar" ? "إجمالي المسارات" : "Total paths"}
              centerValue={formatInteger(statusTotal, locale)}
            />

            <div className="donut-legend">
              {data.statuses.map((item) => {
                const percent = statusTotal ? Math.round((item.count / statusTotal) * 100) : 0;
                return (
                  <div className="legend-row" key={item.key}>
                    <span className="legend-dot" style={{ background: item.color }} />
                    <strong>{item.label}</strong>
                    <span dir="ltr">{formatInteger(item.count, locale)}</span>
                    <span dir="ltr">{percent}%</span>
                    <span dir="ltr">{formatSarCompact(item.amount, locale)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </section>

      <section className="analytics-table-wrap">
        <h2>{locale === "ar" ? "الجدول المرجعي" : "Reference table"}</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>{copy.tableCompany}</th>
              <th>{copy.tableCases}</th>
              <th>{copy.tableAmount}</th>
              <th>{copy.tableRequests}</th>
            </tr>
          </thead>
          <tbody>
            {data.companies.map((company) => (
              <tr key={company.key}>
                <td>{company.name}</td>
                <td dir="ltr">{formatInteger(company.cases, locale)}</td>
                <td dir="ltr">{formatSarCompact(company.portfolioAmount, locale)}</td>
                <td dir="ltr">{formatInteger(company.requests, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="disclaimer">{copy.privacyNote}</p>
      </section>
    </main>
  );
}

function MegaBarChart({
  title,
  subtitle,
  rows,
  color,
}: {
  title: string;
  subtitle: string;
  rows: Array<{
    id: string;
    label: string;
    value: number;
    formattedValue: string;
    ratio: number;
  }>;
  color: string;
}) {
  return (
    <section className="mega-card">
      <div className="mega-card-header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="mega-bars">
        {rows
          .slice()
          .sort((a, b) => b.value - a.value)
          .map((row) => (
            <div className="mega-bar-row" key={row.id}>
              <div className="mega-bar-head">
                <strong>{row.label}</strong>
                <span dir="ltr">{row.formattedValue}</span>
              </div>
              <div className="mega-bar-track">
                <span
                  className="mega-bar-fill"
                  style={{
                    width: `${Math.max(row.ratio * 100, 4)}%`,
                    background: color,
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

function InlineBar({
  label,
  value,
  ratio,
  color,
}: {
  label: string;
  value: string;
  ratio: number;
  color: string;
}) {
  return (
    <div className="inline-bar">
      <div className="inline-bar-label">
        <span>{label}</span>
        <strong dir="ltr">{value}</strong>
      </div>
      <div className="mega-bar-track">
        <span
          className="mega-bar-fill"
          style={{
            width: `${Math.max(ratio * 100, 4)}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}

function DonutChart({
  total,
  segments,
  centerLabel,
  centerValue,
}: {
  total: number;
  segments: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
  centerLabel: string;
  centerValue: string;
}) {
  const radius = 112;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="donut-visual" aria-label={centerLabel}>
      <svg viewBox="0 0 320 320" className="donut-svg" role="img">
        <circle className="donut-base" cx="160" cy="160" r={radius} />
        {segments.map((segment) => {
          const length = total ? (segment.value / total) * circumference : 0;
          const strokeDasharray = `${length} ${circumference - length}`;
          const strokeDashoffset = -offset;
          offset += length;

          return (
            <circle
              key={segment.id}
              className="donut-slice"
              cx="160"
              cy="160"
              r={radius}
              stroke={segment.color}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
            >
              <title>{`${segment.label}: ${segment.value}`}</title>
            </circle>
          );
        })}
      </svg>
      <div className="donut-center">
        <strong dir="ltr">{centerValue}</strong>
        <span>{centerLabel}</span>
      </div>
    </div>
  );
}
