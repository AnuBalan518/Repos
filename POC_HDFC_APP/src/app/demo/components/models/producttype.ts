export interface ProductType {
  id: number;
  name: string;
  type: string;
  uinNumber: string;
  intermediary: string;
  frequency: string;
  ageAtEntry: number;
  maturityAge: number;
  premiumTerm: number;
  limitedPremiumTerm: number;
  policyTerm: number;
  installmentType: string;
  installmentPremium: string;
  singlePremium: number;
  annuityPurchasePrice: number;
  sumAssured: number;
  productLaunchDate: string;  // Use string to represent date as ISO string
  productExitDate: string;    // Use string to represent date as ISO string
  clawback: string;
  createdAt: string;          // Use string to represent date as ISO string
  updatedAt: string;          // Use string to represent date as ISO string
  approvalstatus: string,
  status: string
}
