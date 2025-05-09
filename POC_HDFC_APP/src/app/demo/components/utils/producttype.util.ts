import { ProductType } from '../models/producttype';

export function createDefaultProductType(): ProductType {
  const now = new Date().toISOString();
  return {
    id: 0,
    name: '',
    type: '',
    uinNumber: '',
    intermediary: '',
    frequency: '',
    ageAtEntry: 0,
    maturityAge: 0,
    premiumTerm: 0,
    limitedPremiumTerm: 0,
    policyTerm: 0,
    installmentType: '',
    installmentPremium: '',
    singlePremium: 0,
    annuityPurchasePrice: 0,
    sumAssured: 0,
    productLaunchDate: now,
    productExitDate: now,
    clawback: '',
    createdAt: now,
    updatedAt: now,
    approvalstatus: '',
    status: ''
  };
}
