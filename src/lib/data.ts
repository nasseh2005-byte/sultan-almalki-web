import type { ApprovedSnapshot, Locale } from "@/types/snapshot";

export const locales = ["ar", "en"] as const;

export function isLocale(value: string): value is Locale {
  return value === "ar" || value === "en";
}

export const approvedSnapshot: ApprovedSnapshot = {
  schemaVersion: "public-demo",
  sourceLabelAr: "نموذج عرض عام بأرقام توضيحية؛ تستبدل بلقطة معتمدة قبل النشر الإنتاجي",
  sourceLabelEn: "Public demo with illustrative figures; replace with approved data before production",
  refreshPolicy:
    "Use only explicitly approved public snapshots. Do not publish internal Excel-derived figures without approval.",
  currency: "SAR",
  contractingPortfolio: {
    totalCases: 252,
    totalAmountSar: 8_450_000,
    companies: [
      {
        key: "portfolio-a",
        nameAr: "محفظة مقاولات أ",
        nameEn: "Contracting Portfolio A",
        caseCount: 42,
        amountSar: 1_250_000,
      },
      {
        key: "portfolio-b",
        nameAr: "محفظة مقاولات ب",
        nameEn: "Contracting Portfolio B",
        caseCount: 58,
        amountSar: 1_740_000,
      },
      {
        key: "portfolio-c",
        nameAr: "محفظة مقاولات ج",
        nameEn: "Contracting Portfolio C",
        caseCount: 37,
        amountSar: 980_000,
      },
      {
        key: "portfolio-d",
        nameAr: "محفظة مقاولات د",
        nameEn: "Contracting Portfolio D",
        caseCount: 64,
        amountSar: 2_650_000,
      },
      {
        key: "portfolio-e",
        nameAr: "محفظة مقاولات هـ",
        nameEn: "Contracting Portfolio E",
        caseCount: 51,
        amountSar: 1_830_000,
      },
    ],
  },
  enforcementPortfolio: {
    totalRequests: 138,
    totalAmountSar: 4_320_000,
    statusTotals: {
      stayOfExecution: { count: 34, amountSar: 940_000 },
      referredToJudicialCircuit: { count: 87, amountSar: 2_820_000 },
      notAccepted: { count: 17, amountSar: 560_000 },
    },
    companies: [
      {
        key: "portfolio-a",
        requestCount: 22,
        amountSar: 620_000,
        stayCount: 6,
        stayAmountSar: 170_000,
        referredCount: 14,
        referredAmountSar: 380_000,
        notAcceptedCount: 2,
        notAcceptedAmountSar: 70_000,
      },
      {
        key: "portfolio-b",
        requestCount: 31,
        amountSar: 890_000,
        stayCount: 7,
        stayAmountSar: 210_000,
        referredCount: 21,
        referredAmountSar: 590_000,
        notAcceptedCount: 3,
        notAcceptedAmountSar: 90_000,
      },
      {
        key: "portfolio-c",
        requestCount: 18,
        amountSar: 430_000,
        stayCount: 4,
        stayAmountSar: 90_000,
        referredCount: 11,
        referredAmountSar: 270_000,
        notAcceptedCount: 3,
        notAcceptedAmountSar: 70_000,
      },
      {
        key: "portfolio-d",
        requestCount: 39,
        amountSar: 1_540_000,
        stayCount: 10,
        stayAmountSar: 310_000,
        referredCount: 25,
        referredAmountSar: 1_050_000,
        notAcceptedCount: 4,
        notAcceptedAmountSar: 180_000,
      },
      {
        key: "portfolio-e",
        requestCount: 28,
        amountSar: 840_000,
        stayCount: 7,
        stayAmountSar: 160_000,
        referredCount: 16,
        referredAmountSar: 530_000,
        notAcceptedCount: 5,
        notAcceptedAmountSar: 150_000,
      },
    ],
  },
  featuredAchievements: [
    {
      key: "real-estate-fees-demo",
      partnerKey: "national-trade-company",
      titleAr: "إدارة رسوم ومخالفات عقارية",
      titleEn: "Real Estate Fees and Violation Management",
      valueLabelAr: "ينشر بعد الاعتماد",
      valueLabelEn: "Published after approval",
      claimAr:
        "تظهر تفاصيل الإنجاز بعد اعتماد الإدارة وتوثيق الموافقة، دون أرقام قضايا أو مستندات خام.",
      claimEn:
        "Achievement details appear after management approval and documented consent, without case numbers or raw documents.",
      publicApprovalRequired: true,
    },
    {
      key: "healthcare-regulatory-demo",
      partnerKey: "jeddah-clinic-hospital",
      titleAr: "إدارة المخالفات والاعتراضات التنظيمية",
      titleEn: "Regulatory Violations and Appeals Management",
      claimAr:
        "دعم قانوني للمنشآت الصحية ضمن نطاق عمل عام، مع إبقاء التفاصيل التشغيلية خارج النشر العام.",
      claimEn:
        "Legal support for healthcare facilities within a public scope, with operational details kept out of public publishing.",
      publicApprovalRequired: true,
    },
  ],
};

export const partners = [
  {
    key: "al-asayel",
    logo: "/partners/al-asayel.jpg",
    name: {
      ar: "شركة الأصايل للمقاولات",
      en: "Al-Asayel Contracting Company",
    },
    sector: {
      ar: "المقاولات والمشاريع",
      en: "Contracting and projects",
    },
    summary: {
      ar: "مطالبات، عقود، تنفيذ، وتمثيل قضائي ضمن نطاق خدمات عام ومعتمد.",
      en: "Claims, contracts, enforcement, and legal representation within approved public scope.",
    },
    analyticsCompany: true,
  },
  {
    key: "al-suhaily",
    logo: "/partners/al-suhaily.png",
    name: {
      ar: "شركة السهلي للمقاولات",
      en: "Alsehly Contracting Company",
    },
    sector: {
      ar: "المقاولات والمشاريع",
      en: "Contracting and projects",
    },
    summary: {
      ar: "دعم قانوني منظم للملفات التشغيلية ومطالبات التنفيذ.",
      en: "Structured legal support for operational matters and enforcement claims.",
    },
    analyticsCompany: true,
  },
  {
    key: "al-hajdiya",
    logo: "/partners/al-hajdiya.jfif",
    name: {
      ar: "شركة الهاجدية للمقاولات",
      en: "Al-Hajdiya Contracting Company",
    },
    sector: {
      ar: "المقاولات والمشاريع",
      en: "Contracting and projects",
    },
    summary: {
      ar: "إدارة محفظة قانونية واسعة مع فصل كامل للبيانات والتحليلات.",
      en: "A broad legal portfolio managed with separated data and analytics.",
    },
    analyticsCompany: true,
  },
  {
    key: "haloul",
    logo: "/partners/haloul.png",
    name: {
      ar: "شركة حالول للمقاولات",
      en: "Haloul Contracting Company",
    },
    sector: {
      ar: "المقاولات والمشاريع",
      en: "Contracting and projects",
    },
    summary: {
      ar: "متابعة مطالبات ومخاطر تنفيذية ضمن مسار قانوني واضح.",
      en: "Claims and enforcement risks followed through a clear legal path.",
    },
    analyticsCompany: true,
  },
  {
    key: "mastoura",
    logo: "/partners/mastoura.png",
    name: {
      ar: "شركة مستورة للمقاولات المحدودة",
      en: "Mastoura Contracting Company Ltd.",
    },
    sector: {
      ar: "المقاولات والمشاريع",
      en: "Contracting and projects",
    },
    summary: {
      ar: "إدارة قانونية منفصلة للملفات والمطالبات وطلبات التنفيذ.",
      en: "Separate legal management for matters, claims, and enforcement requests.",
    },
    analyticsCompany: true,
  },
  {
    key: "national-trade-company",
    logo: "/partners/national-trade-company.jpg",
    name: {
      ar: "الشركة الوطنية للتجارة",
      en: "National Trade Company",
    },
    sector: {
      ar: "التجارة والعقار",
      en: "Trade and real estate",
    },
    summary: {
      ar: "خدمات قانونية متخصصة في رسوم الأراضي البيضاء والمخاطر العقارية.",
      en: "Specialized legal work for white-land fees and real estate risk.",
    },
    analyticsCompany: false,
  },
  {
    key: "jeddah-clinic-hospital",
    logo: "/partners/jeddah-clinic-hospital.jpg",
    name: {
      ar: "مستشفى جدة الوطني",
      en: "Jeddah Clinic Hospital",
    },
    sector: {
      ar: "الصحة",
      en: "Healthcare",
    },
    summary: {
      ar: "اعتراضات تنظيمية ومخالفات منشآت صحية ضمن نطاق عام غير حساس.",
      en: "Regulatory appeals and healthcare facility violations within non-sensitive public scope.",
    },
    analyticsCompany: false,
  },
];

export const siteCopy = {
  ar: {
    brand: "سلطان محمد المالكي",
    legalName: "شركة سلطان محمد المالكي للمحاماة والاستشارات القانونية",
    tagline: "حماية قانونية تدعم القرار التجاري والمالي",
    nav: ["الخدمات", "الشركاء", "البيانات", "المنهجية", "التواصل"],
    heroTitle: "شريكك القانوني لحماية القرار التجاري والمالي",
    heroLead:
      "خدمات قانونية متكاملة للمنشآت والمشاريع؛ من تقييم المخاطر وصياغة العقود، إلى إدارة النزاعات والتمثيل القضائي والتنفيذ.",
    primaryCta: "اطلب تقييماً قانونياً",
    secondaryCta: "استعرض البيانات",
    profileCta: "تحميل الملف التعريفي",
    language: "English",
    themeDark: "داكن",
    themeLight: "نهاري",
    lastUpdated: "آخر لقطة معتمدة",
    privacyNote:
      "لا تمثل البيانات وعداً بنتيجة مستقبلية، وتعرض على مستوى مجمع بعد المراجعة والاعتماد.",
    servicesTitle: "محاور قانونية عملية",
    servicesLead:
      "الواجهة القانونية هنا تبدأ من فهم الأثر التجاري والمالي، ثم تختار المسار النظامي الأنسب.",
    sectorsTitle: "قطاعات نخدمها",
    methodologyTitle: "منهجية العمل",
    partnersTitle: "شركاء وملفات عامة معتمدة",
    partnersLead:
      "شراكات وخدمات قانونية مصممة لطبيعة كل قطاع: عقود، مطالبات، مخالفات، تنفيذ، وتمثيل قضائي.",
    dataTitle: "البيانات الحالية والرسوم",
    dataLead:
      "مؤشرات مجمعة من لقطة داخلية معتمدة، مع فصل الشركات الخمس وعدم خلط طلبات التنفيذ مع المحفظة الأساسية.",
    achievementTitle: "إنجازات نوعية",
    contactTitle: "ابدأ بتقييم قانوني منظم",
    contactLead:
      "شارك ملخص الملف، وسيتم تحديد المسار المناسب: تفاوض، اعتراض، تقاضٍ، أو تنفيذ.",
    contactButton: "إرسال طلب تقييم",
    mobileWhatsApp: "واتساب",
    mobileCall: "اتصال",
    chartPortfolioCases: "حجم المحفظة حسب عدد الملفات",
    chartPortfolioAmount: "القيمة المسجلة حسب الشركة",
    chartEnforcement: "طلبات التنفيذ حسب الشركة",
    chartStatuses: "توزيع مسارات التنفيذ",
    tableCompany: "الشركة",
    tableCases: "الملفات",
    tableAmount: "القيمة",
    tableRequests: "طلبات التنفيذ",
    tableStatus: "المسار",
    sourceLabel: approvedSnapshot.sourceLabelAr,
    adminTitle: "لوحة داخلية مختصرة",
    adminLead:
      "نموذج أولي لقراءة اللقطة المعتمدة وجودة البيانات. الربط الفعلي مع Supabase والاستيراد يتم لاحقاً عبر متغيرات بيئة آمنة.",
  },
  en: {
    brand: "Sultan Mohammed Al-Maliki",
    legalName: "Sultan Mohammed Al-Maliki Attorneys & Legal Consultants",
    tagline: "Legal protection that supports commercial and financial decisions",
    nav: ["Services", "Partners", "Data", "Methodology", "Contact"],
    heroTitle: "Your legal partner for protecting commercial and financial decisions",
    heroLead:
      "Integrated legal services for businesses and projects, from risk assessment and contracts to dispute management, representation, and enforcement.",
    primaryCta: "Request legal assessment",
    secondaryCta: "View data",
    profileCta: "Download profile",
    language: "العربية",
    themeDark: "Dark",
    themeLight: "Day",
    lastUpdated: "Last approved snapshot",
    privacyNote:
      "The data is not a promise of future outcomes and is shown only in aggregated form after review and approval.",
    servicesTitle: "Practical legal service lines",
    servicesLead:
      "The legal work starts from commercial and financial impact, then moves into the right regulatory path.",
    sectorsTitle: "Sectors served",
    methodologyTitle: "Working methodology",
    partnersTitle: "Approved public partners and matters",
    partnersLead:
      "Legal support tailored to each sector: contracts, claims, violations, enforcement, and legal representation.",
    dataTitle: "Current data and charts",
    dataLead:
      "Aggregated indicators from an approved internal snapshot, with the five companies kept separate and enforcement kept distinct from the base portfolio.",
    achievementTitle: "Specialized achievements",
    contactTitle: "Start with a structured legal assessment",
    contactLead:
      "Share a concise matter summary and the team will define the right path: negotiation, objection, litigation, or enforcement.",
    contactButton: "Send assessment request",
    mobileWhatsApp: "WhatsApp",
    mobileCall: "Call",
    chartPortfolioCases: "Portfolio volume by matters",
    chartPortfolioAmount: "Registered value by company",
    chartEnforcement: "Enforcement requests by company",
    chartStatuses: "Enforcement path distribution",
    tableCompany: "Company",
    tableCases: "Matters",
    tableAmount: "Value",
    tableRequests: "Requests",
    tableStatus: "Path",
    sourceLabel: approvedSnapshot.sourceLabelEn,
    adminTitle: "Compact internal dashboard",
    adminLead:
      "A first internal reading of the approved snapshot and data quality. Supabase and import flows should be connected later through secure environment variables.",
  },
} as const;

export const serviceLines = [
  {
    icon: "FileCheck",
    title: {
      ar: "الاستشارات القانونية والعقود",
      en: "Legal advisory and contracts",
    },
    text: {
      ar: "فحص المخاطر، صياغة الاتفاقيات، ومراجعة الالتزامات قبل أن تتحول إلى نزاع.",
      en: "Risk review, agreement drafting, and obligation checks before issues become disputes.",
    },
  },
  {
    icon: "Building2",
    title: {
      ar: "قضايا الشركات والنزاعات التجارية",
      en: "Corporate and commercial disputes",
    },
    text: {
      ar: "إدارة مطالبات وشراكات وتوريد ومقاولات بمنطق تجاري واضح.",
      en: "Claims, partnerships, supply, and contracting disputes managed with commercial clarity.",
    },
  },
  {
    icon: "Scale",
    title: {
      ar: "القضاء الإداري والاعتراضات",
      en: "Administrative litigation and objections",
    },
    text: {
      ar: "اعتراضات نظامية ومذكرات مدعومة بالمستندات وتحليل الأثر.",
      en: "Regulatory objections and pleadings backed by documents and impact analysis.",
    },
  },
  {
    icon: "ShieldCheck",
    title: {
      ar: "إجراءات التنفيذ واسترداد الحقوق",
      en: "Enforcement and recovery",
    },
    text: {
      ar: "متابعة قرارات التنفيذ والتحصيل ومعالجة العوائق الإجرائية.",
      en: "Following enforcement decisions, recovery, and procedural blockers.",
    },
  },
  {
    icon: "Landmark",
    title: {
      ar: "اللجان شبه القضائية والعقار",
      en: "Quasi-judicial and real estate matters",
    },
    text: {
      ar: "تعامل متخصص مع المخالفات والرسوم والنزاعات العقارية.",
      en: "Specialized handling of violations, fees, and real estate disputes.",
    },
  },
  {
    icon: "BriefcaseBusiness",
    title: {
      ar: "العمالي والجزائي المرتبط بالأعمال",
      en: "Employment and business-linked criminal matters",
    },
    text: {
      ar: "حماية المنشآت عند تقاطع الوقائع التشغيلية مع المسارات النظامية.",
      en: "Protecting businesses when operational facts intersect with legal routes.",
    },
  },
];

export const sectors = [
  { ar: "المقاولات والبنية التحتية", en: "Contracting and infrastructure" },
  { ar: "التجارة والخدمات", en: "Trade and services" },
  { ar: "الصحة والمنشآت الطبية", en: "Healthcare facilities" },
  { ar: "العقار والاستثمار", en: "Real estate and investment" },
  { ar: "المنشآت العائلية والمتوسطة", en: "Family and mid-sized businesses" },
];

export const methodology = [
  {
    title: { ar: "التقييم والفحص الشامل", en: "Assessment and review" },
    text: {
      ar: "تحليل الوقائع والمستندات والبيانات وتحديد المخاطر.",
      en: "Analyzing facts, documents, data, and risk exposure.",
    },
  },
  {
    title: { ar: "بناء الاستراتيجية القانونية", en: "Legal strategy" },
    text: {
      ar: "اختيار المسار النظامي أو التفاوضي أو القضائي.",
      en: "Choosing the regulatory, negotiation, or litigation path.",
    },
  },
  {
    title: { ar: "الصياغة والتمثيل", en: "Drafting and representation" },
    text: {
      ar: "إعداد اللوائح والمذكرات والعقود والتمثيل أمام الجهات.",
      en: "Preparing pleadings, memos, contracts, and representation.",
    },
  },
  {
    title: { ar: "التنفيذ واسترداد الحقوق", en: "Enforcement and recovery" },
    text: {
      ar: "متابعة التنفيذ والتحصيل ومعالجة عوائق الاسترداد.",
      en: "Following enforcement, collection, and recovery blockers.",
    },
  },
];

export const insights = [
  {
    slug: "white-land-fees-risk-map",
    title: {
      ar: "خريطة مخاطر رسوم الأراضي البيضاء للمنشآت وملاك الأصول",
      en: "White Land Fee Risk Map for Businesses and Asset Owners",
    },
  },
  {
    slug: "white-land-fees-document-review",
    title: {
      ar: "مراجعة المستندات والملكية قبل التعامل مع رسوم الأراضي البيضاء",
      en: "Reviewing Ownership Documents Before Addressing White Land Fees",
    },
  },
  {
    slug: "white-land-fees-objection-strategy",
    title: {
      ar: "بناء استراتيجية الاعتراض في ملفات رسوم الأراضي البيضاء",
      en: "Building an Objection Strategy in White Land Fee Matters",
    },
  },
];
