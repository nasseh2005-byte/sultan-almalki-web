export type Locale = "ar" | "en";

export type SnapshotCompany = {
  key: string;
  nameAr: string;
  nameEn: string;
  caseCount: number;
  amountSar: number;
};

export type EnforcementCompany = {
  key: string;
  requestCount: number;
  amountSar: number;
  stayCount: number;
  stayAmountSar: number;
  referredCount: number;
  referredAmountSar: number;
  notAcceptedCount: number;
  notAcceptedAmountSar: number;
};

export type EnforcementStatusTotals = {
  stayOfExecution: {
    count: number;
    amountSar: number;
  };
  referredToJudicialCircuit: {
    count: number;
    amountSar: number;
  };
  notAccepted: {
    count: number;
    amountSar: number;
  };
};

export type FeaturedAchievement = {
  key: string;
  partnerKey: string;
  titleAr: string;
  titleEn: string;
  valueLabelAr?: string;
  valueLabelEn?: string;
  claimAr: string;
  claimEn: string;
  publicApprovalRequired: boolean;
};

export type ApprovedSnapshot = {
  schemaVersion: string;
  sourceLabelAr: string;
  sourceLabelEn: string;
  refreshPolicy: string;
  currency: "SAR";
  contractingPortfolio: {
    totalCases: number;
    totalAmountSar: number;
    companies: SnapshotCompany[];
  };
  enforcementPortfolio: {
    totalRequests: number;
    totalAmountSar: number;
    statusTotals: EnforcementStatusTotals;
    companies: EnforcementCompany[];
  };
  featuredAchievements: FeaturedAchievement[];
};
