"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileCheck,
  Landmark,
  Moon,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Volume2,
} from "lucide-react";
import {
  approvedSnapshot,
  insights,
  methodology,
  partners,
  sectors,
  serviceLines,
  siteCopy,
} from "@/lib/data";
import { formatInteger, formatSarCompact, getLocalized } from "@/lib/format";
import type { Locale } from "@/types/snapshot";

type SiteExperienceProps = {
  locale: Locale;
};

type Theme = "dark" | "light";

const iconMap = {
  FileCheck,
  Building2,
  Scale,
  ShieldCheck,
  Landmark,
  BriefcaseBusiness,
};

const chartColors = ["#C9A44C", "#1E6BFF", "#22C55E", "#8BA6FF", "#D8C27A"];

export function SiteExperience({ locale }: SiteExperienceProps) {
  const copy = siteCopy[locale];
  const isRtl = locale === "ar";
  const [theme, setTheme] = useState<Theme>("dark");
  const audioContext = useRef<AudioContext | null>(null);

  const playClick = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const AudioContextCtor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextCtor) {
      return;
    }

    audioContext.current ??= new AudioContextCtor();
    const context = audioContext.current;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(720, now);
    oscillator.frequency.exponentialRampToValueAtTime(420, now + 0.095);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.13);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const initial = stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = useCallback(() => {
    playClick();
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("theme", next);
      return next;
    });
  }, [playClick]);

  const chartData = useMemo(() => {
    const portfolio = approvedSnapshot.contractingPortfolio.companies.map((company) => ({
      key: company.key,
      name: locale === "ar" ? company.nameAr : company.nameEn,
      cases: company.caseCount,
      amount: company.amountSar,
    }));

    const enforcement = approvedSnapshot.enforcementPortfolio.companies.map((company) => {
      const partner = approvedSnapshot.contractingPortfolio.companies.find(
        (item) => item.key === company.key,
      );

      return {
        key: company.key,
        name: locale === "ar" ? partner?.nameAr ?? company.key : partner?.nameEn ?? company.key,
        requests: company.requestCount,
        amount: company.amountSar,
      };
    });

    const statuses = [
      {
        key: "stayOfExecution",
        name: locale === "ar" ? "إيقاف التنفيذ" : "Stay of execution",
        count: approvedSnapshot.enforcementPortfolio.statusTotals.stayOfExecution.count,
        amount: approvedSnapshot.enforcementPortfolio.statusTotals.stayOfExecution.amountSar,
      },
      {
        key: "referredToJudicialCircuit",
        name: locale === "ar" ? "محال إلى دائرة قضائية" : "Referred to judicial circuit",
        count: approvedSnapshot.enforcementPortfolio.statusTotals.referredToJudicialCircuit.count,
        amount:
          approvedSnapshot.enforcementPortfolio.statusTotals.referredToJudicialCircuit.amountSar,
      },
      {
        key: "notAccepted",
        name: locale === "ar" ? "عدم قبول" : "Not accepted",
        count: approvedSnapshot.enforcementPortfolio.statusTotals.notAccepted.count,
        amount: approvedSnapshot.enforcementPortfolio.statusTotals.notAccepted.amountSar,
      },
    ];

    return { portfolio, enforcement, statuses };
  }, [locale]);

  const stats = [
    {
      value: formatInteger(approvedSnapshot.contractingPortfolio.totalCases, locale),
      label: locale === "ar" ? "ملف ومخالفة مدارة" : "Managed matters and violations",
      ring: "82%",
      color: "#C9A44C",
    },
    {
      value: formatSarCompact(approvedSnapshot.contractingPortfolio.totalAmountSar, locale),
      label: locale === "ar" ? "قيمة المحفظة المسجلة" : "Registered portfolio value",
      ring: "74%",
      color: "#1E6BFF",
    },
    {
      value: formatInteger(approvedSnapshot.enforcementPortfolio.totalRequests, locale),
      label: locale === "ar" ? "طلب تنفيذ متابع" : "Tracked enforcement requests",
      ring: "64%",
      color: "#22C55E",
    },
    {
      value: formatSarCompact(approvedSnapshot.enforcementPortfolio.totalAmountSar, locale),
      label: locale === "ar" ? "قيمة طلبات التنفيذ" : "Enforcement request value",
      ring: "68%",
      color: "#D8C27A",
    },
  ];

  const navTargets = [
    { label: copy.nav[0], href: "#services" },
    { label: copy.nav[1], href: "#partners" },
    { label: copy.nav[2], href: "#data" },
    { label: copy.nav[3], href: "#methodology" },
    { label: copy.nav[4], href: "#contact" },
  ];
  const oppositeLocale = locale === "ar" ? "en" : "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="site-shell" lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/brand/office-sign.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-scrim" />
        <div className="hero-linework" />

        <header className="topbar">
          <Link href={`/${locale}`} className="brand-lockup" onPointerDown={playClick}>
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

          <nav className="nav-links" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main"}>
            {navTargets.map((item) => (
              <a href={item.href} key={item.href} onPointerDown={playClick}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="top-actions">
            <button className="control-button" type="button" onPointerDown={toggleTheme}>
              {theme === "dark" ? <Moon size={17} /> : <SunMedium size={17} />}
              <span>{theme === "dark" ? copy.themeDark : copy.themeLight}</span>
            </button>
            <Link className="control-button" href={`/${oppositeLocale}`} onPointerDown={playClick}>
              <Volume2 size={17} />
              <span>{copy.language}</span>
            </Link>
          </div>
        </header>

        <div className="hero-content">
          <div className="hero-copy">
            <span className="hero-kicker">
              <Sparkles size={17} />
              {copy.tagline}
            </span>
            <h1 id="hero-title">{copy.heroTitle}</h1>
            <p className="hero-lead">{copy.heroLead}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact" onPointerDown={playClick}>
                {copy.primaryCta}
                <ArrowIcon size={18} />
              </a>
              <a className="button button-secondary" href="#data" onPointerDown={playClick}>
                <BarChart3 size={18} />
                {copy.secondaryCta}
              </a>
              <a className="button button-secondary" href="#profile" onPointerDown={playClick}>
                <FileCheck size={18} />
                {copy.profileCta}
              </a>
            </div>
          </div>
        </div>

        <div className="trust-strip" aria-label={copy.lastUpdated}>
          {stats.map((item) => (
            <div className="trust-item" key={item.label}>
              <span className="trust-value" dir="ltr">
                {item.value}
              </span>
              <span className="trust-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-inner">
          <span className="section-kicker">
            <Scale size={18} />
            {copy.servicesTitle}
          </span>
          <h2 className="section-title">{copy.servicesTitle}</h2>
          <p className="section-lead">{copy.servicesLead}</p>

          <div className="grid-3">
            {serviceLines.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] ?? FileCheck;
              return (
                <article className="card service-card" key={service.title.en}>
                  <span className="icon-tile">
                    <Icon size={22} />
                  </span>
                  <h3>{getLocalized(service.title, locale)}</h3>
                  <p>{getLocalized(service.text, locale)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="sectors">
        <div className="section-inner">
          <span className="section-kicker">
            <Building2 size={18} />
            {copy.sectorsTitle}
          </span>
          <h2 className="section-title">{copy.sectorsTitle}</h2>
          <div className="chip-list">
            {sectors.map((sector) => (
              <span className="chip" key={sector.en}>
                <CheckCircle2 size={17} />
                {getLocalized(sector, locale)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="methodology">
        <div className="section-inner">
          <span className="section-kicker">
            <ShieldCheck size={18} />
            {copy.methodologyTitle}
          </span>
          <h2 className="section-title">{copy.methodologyTitle}</h2>
          <div className="timeline">
            {methodology.map((step, index) => (
              <article className="timeline-step" data-step={index + 1} key={step.title.en}>
                <h3>{getLocalized(step.title, locale)}</h3>
                <p>{getLocalized(step.text, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="partners">
        <div className="section-inner">
          <span className="section-kicker">
            <BriefcaseBusiness size={18} />
            {copy.partnersTitle}
          </span>
          <h2 className="section-title">{copy.partnersTitle}</h2>
          <p className="section-lead">{copy.partnersLead}</p>
          <div className="partner-grid">
            {partners.map((partner) => (
              <article className="card partner-card" key={partner.key}>
                <div className="logo-box">
                  <Image
                    src={partner.logo}
                    alt={`${getLocalized(partner.name, locale)} logo`}
                    fill
                    sizes="(max-width: 760px) 50vw, 170px"
                    className="partner-logo"
                  />
                </div>
                <div className="partner-meta">
                  <span className="partner-sector">{getLocalized(partner.sector, locale)}</span>
                  <h3>{getLocalized(partner.name, locale)}</h3>
                  <p>{getLocalized(partner.summary, locale)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="data">
        <div className="section-inner">
          <span className="section-kicker">
            <BarChart3 size={18} />
            {copy.dataTitle}
          </span>
          <h2 className="section-title">{copy.dataTitle}</h2>
          <p className="section-lead">{copy.dataLead}</p>

          <div className="data-layout">
            <div className="ring-grid">
              {stats.map((item) => (
                <article
                  className="card stat-ring"
                  key={item.label}
                  style={
                    {
                      "--ring-color": item.color,
                      "--ring-value": item.ring,
                    } as React.CSSProperties
                  }
                >
                  <div className="ring">
                    <strong dir="ltr">{item.value}</strong>
                  </div>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>

            <div className="grid-2" style={{ marginBlockStart: 0 }}>
              <ChartCard title={copy.chartPortfolioCases}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.portfolio} layout="vertical" margin={{ left: 8, right: 8 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.10)" horizontal={false} />
                    <XAxis type="number" tickFormatter={(value) => formatInteger(Number(value), locale)} />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => formatInteger(Number(value), locale)} />
                    <Bar dataKey="cases" fill="#C9A44C" radius={[4, 4, 4, 4]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title={copy.chartPortfolioAmount}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.portfolio} layout="vertical" margin={{ left: 8, right: 8 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.10)" horizontal={false} />
                    <XAxis type="number" tickFormatter={(value) => formatSarCompact(Number(value), locale)} />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => formatSarCompact(Number(value), locale)} />
                    <Bar dataKey="amount" fill="#1E6BFF" radius={[4, 4, 4, 4]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>

          <div className="grid-2">
            <ChartCard title={copy.chartEnforcement}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.enforcement} margin={{ left: 8, right: 8 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.10)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
                  <YAxis tickFormatter={(value) => formatInteger(Number(value), locale)} />
                  <Tooltip formatter={(value, name) =>
                    name === "amount"
                      ? formatSarCompact(Number(value), locale)
                      : formatInteger(Number(value), locale)
                  } />
                  <Legend />
                  <Bar dataKey="requests" name={copy.tableRequests} fill="#22C55E" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="amount" name={copy.tableAmount} fill="#8BA6FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={copy.chartStatuses}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.statuses}
                    dataKey="count"
                    nameKey="name"
                    innerRadius="58%"
                    outerRadius="82%"
                    paddingAngle={3}
                    label={({ name, percent }) =>
                      `${name} ${new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
                        maximumFractionDigits: 0,
                      }).format((percent ?? 0) * 100)}%`
                    }
                  >
                    {chartData.statuses.map((entry, index) => (
                      <Cell key={entry.key} fill={chartColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatInteger(Number(value), locale)} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

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
              {chartData.portfolio.map((company) => {
                const enforcement = chartData.enforcement.find((item) => item.key === company.key);
                return (
                  <tr key={company.key}>
                    <td>{company.name}</td>
                    <td dir="ltr">{formatInteger(company.cases, locale)}</td>
                    <td dir="ltr">{formatSarCompact(company.amount, locale)}</td>
                    <td dir="ltr">{formatInteger(enforcement?.requests ?? 0, locale)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="disclaimer">{copy.privacyNote}</p>
        </div>
      </section>

      <section className="section" id="achievements">
        <div className="section-inner">
          <span className="section-kicker">
            <Landmark size={18} />
            {copy.achievementTitle}
          </span>
          <h2 className="section-title">{copy.achievementTitle}</h2>
          <div className="achievement-grid">
            {approvedSnapshot.featuredAchievements.map((achievement) => {
              const partner = partners.find((item) => item.key === achievement.partnerKey);
              return (
                <article className="card achievement-card" key={achievement.key}>
                  <div className="achievement-logo">
                    {partner ? (
                      <Image
                        src={partner.logo}
                        alt={`${getLocalized(partner.name, locale)} logo`}
                        fill
                        sizes="140px"
                        className="partner-logo"
                      />
                    ) : null}
                  </div>
                  <div>
                    <h3>{locale === "ar" ? achievement.titleAr : achievement.titleEn}</h3>
                    {achievement.valueLabelAr ? (
                      <div className="achievement-value" dir="ltr">
                        {locale === "ar" ? achievement.valueLabelAr : achievement.valueLabelEn}
                      </div>
                    ) : null}
                    <p>{locale === "ar" ? achievement.claimAr : achievement.claimEn}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="insights">
        <div className="section-inner">
          <span className="section-kicker">
            <FileCheck size={18} />
            {locale === "ar" ? "مكتبة قانونية" : "Legal insights"}
          </span>
          <div className="grid-3">
            {insights.map((item) => (
              <article className="card" key={item.slug}>
                <h3>{getLocalized(item.title, locale)}</h3>
                <p>
                  {locale === "ar"
                    ? "محتوى توعوي لا يشكل استشارة قانونية مخصصة."
                    : "General awareness content and not tailored legal advice."}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-band" id="contact">
        <div className="section-inner contact-panel">
          <div>
            <span className="section-kicker">
              <Phone size={18} />
              {copy.contactTitle}
            </span>
            <h2 className="section-title">{copy.contactTitle}</h2>
            <p className="section-lead">{copy.contactLead}</p>
          </div>
          <form className="card contact-form">
            <input
              className="field"
              aria-label={locale === "ar" ? "الاسم" : "Name"}
              placeholder={locale === "ar" ? "الاسم" : "Name"}
            />
            <input
              className="field"
              aria-label={locale === "ar" ? "وسيلة التواصل" : "Contact method"}
              placeholder={locale === "ar" ? "رقم الجوال أو البريد" : "Mobile or email"}
              dir="ltr"
            />
            <textarea
              className="field"
              aria-label={locale === "ar" ? "ملخص الملف" : "Matter summary"}
              placeholder={locale === "ar" ? "ملخص مختصر للملف" : "Brief matter summary"}
            />
            <button className="button button-primary" type="button" onPointerDown={playClick}>
              {copy.contactButton}
              <ArrowIcon size={18} />
            </button>
          </form>
        </div>
      </section>

      <div className="mobile-actions" aria-label={locale === "ar" ? "إجراءات سريعة" : "Quick actions"}>
        <a href="https://wa.me/" onPointerDown={playClick}>
          {copy.mobileWhatsApp}
        </a>
        <a href="tel:TODO" onPointerDown={playClick}>
          {copy.mobileCall}
        </a>
        <a href="#contact" onPointerDown={playClick}>
          {copy.primaryCta}
        </a>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="card chart-card">
      <div className="chart-title">
        <h3>{title}</h3>
      </div>
      <div className="chart-frame">{children}</div>
    </article>
  );
}
