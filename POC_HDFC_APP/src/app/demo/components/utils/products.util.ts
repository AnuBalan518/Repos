import { Products } from '../models/products';

export function createDefaultProductType(): Products {
  const now = new Date().toISOString();
  return {
    id: 0,
    company_code: '',
    name: '',
    plan_code: '',
    type: '',
    uinNumber: '',
    intermediary: '',
    frequency: '',
    minAgeAtEntry: 0,
    maxAgeAtEntry: 0,
    minMaturityAge: 0,
    maxMaturityAge: 0,
    minRegularPremium: 0,
    maxRegularPremium: 0,

    premiumtype: '',
    limitedPremium1: 0,
    limitedPremium2: 0,
    limitedPremium3: 0,
    limitedPremium4: 0,
    launchDate: '',

    minPolicyTerm: 0,
    maxPolicyTerm: 0,
    minInstallmentPremiumYearly: 0,
    maxInstallmentPremiumYearly: 0,
    minInstallmentPremiumHalfYearly: 0,
    maxInstallmentPremiumHalfYearly: 0,
    minInstallmentPremiumQuarterly: 0,
    maxInstallmentPremiumQuarterly: 0,
    minInstallmentPremiumMonthly: 0,
    maxInstallmentPremiumMonthly: 0,
    minSinglePremiumAmount: 0,
    maxSinglePremiumAmount: 0,
    minAnnuityPurchasePrice: 0,
    maxAnnuityPurchasePrice: 0,
    minSumAssured: 0,
    maxSumAssured: 0,

    exitDate: '',
    clawback: '',
    chequeClearance: '',
    bonusCommissionEligibility: '',
    bonusCommissionPercentage: 0,
    createdBy: '',
    modifiedBy: '',
    createdAt: '',
    updatedAt: '',
    approval_status: '',
    status: ''
  };
}
