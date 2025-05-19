export interface Products {
  id: number;
  company_code: string;
  name: string;
  plan_code: string;
  type: string;
  uinNumber: string;
  intermediary: string;
  frequency: string;

//   ageAtEntry: number;
//   maturityAge: number;

  minAgeAtEntry: number;
  maxAgeAtEntry: number;
  minMaturityAge: number;
  maxMaturityAge: number;
  minRegularPremium: number;
  maxRegularPremium: number;

  premiumtype: string;
  limitedPremium1: number;
  limitedPremium2: number;
  limitedPremium3: number;
  limitedPremium4: number;
  launchDate: string;

  minPolicyTerm: number;
  maxPolicyTerm: number;
  minInstallmentPremiumYearly: number;
  maxInstallmentPremiumYearly: number;
  minInstallmentPremiumHalfYearly: number;
  maxInstallmentPremiumHalfYearly: number;
  minInstallmentPremiumQuarterly: number;
  maxInstallmentPremiumQuarterly: number;
  minInstallmentPremiumMonthly: number;
  maxInstallmentPremiumMonthly: number;
  minSinglePremiumAmount: number;
  maxSinglePremiumAmount: number;
  minAnnuityPurchasePrice: number;
  maxAnnuityPurchasePrice: number;
  minSumAssured: number;
  maxSumAssured: number;

  exitDate: string;
  clawback: string;
  chequeClearance: string;
  bonusCommissionEligibility: string;
  bonusCommissionPercentage: number;
  createdBy: string;
  modifiedBy: string;
  createdAt: string;          // Use string to represent date as ISO string
  updatedAt: string;          // Use string to represent date as ISO string
  approval_status: string;
  status: string;
  productsDataList?: ProductsData[];
}

export interface ProductsData {
  category: string;
  configKey: string;
  createdBy: number;
  modifiedBy: number;
  createdAt: string;
  modifiedAt: string;
}
