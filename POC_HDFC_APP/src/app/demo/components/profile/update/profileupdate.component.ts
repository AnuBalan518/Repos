import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../service/products.service';
import { AppConfig } from "../../models/appconfig";
import { Products, ProductsData } from "../../models/products";

import { MultiSelectModule } from 'primeng/multiselect';
import { MinMaxDisplayComponent } from '../../controls/min-max-display.component'

@Component({
    templateUrl: './profileupdate.component.html'
})
export class ProfileUpdateComponent implements OnInit {

    profileForm!: FormGroup;
    editingId: number | null = null;

    productTypes: any[] = [];
    paymentOptions: any[] = [];
    applicable: any[] = [];
    frequency: any[] = [];
    intermediatries: any[] = [];
    configOptions: AppConfig[] = [];
        selectedConfigKey: string = '';

    createdDate: string = '';
    chkEligibility: string = 'N';

        minMaxValues: { [key: string]: { minValue: string; maxValue: string } } = {};
        @ViewChild('ageAtEntryComponent') ageAtEntryComponent!: MinMaxDisplayComponent;
        @ViewChild('maturityAgeComponent') maturityAgeComponent!: MinMaxDisplayComponent;
        @ViewChild('regularPremiumComponent') regularPremiumComponent!: MinMaxDisplayComponent;
        @ViewChild('policyTermComponent') policyTermComponent!: MinMaxDisplayComponent;
        @ViewChild('installmentPremiumYearlyComponent') installmentPremiumYearlyComponent!: MinMaxDisplayComponent;
        @ViewChild('installmentPremiumHalfYearlyComponent') installmentPremiumHalfYearlyComponent!: MinMaxDisplayComponent;
        @ViewChild('installmentPremiumQuarterlyComponent') installmentPremiumQuarterlyComponent!: MinMaxDisplayComponent;
        @ViewChild('installmentPremiumMonthlyComponent') installmentPremiumMonthlyComponent!: MinMaxDisplayComponent;
        @ViewChild('singlePremiumAmountComponent') singlePremiumAmountComponent!: MinMaxDisplayComponent;
        @ViewChild('annuityPurchasePriceComponent') annuityPurchasePriceComponent!: MinMaxDisplayComponent;
        @ViewChild('sumAssuredComponent') sumAssuredComponent!: MinMaxDisplayComponent;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private productsService: ProductsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.initGroup();
        this.loadDropdowns();

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            this.editingId = +idParam;
            this.productsService.getProductTypeById(this.editingId).subscribe((product: Products) => {
                this.patchForm(product);
            });
        }
    }

    initGroup() {
        this.profileForm = this.fb.group({
                    name: ['', Validators.required],
                    plan_code: ['', Validators.required],
                    type: [null, Validators.required],
                    uinNumber: ['', Validators.required],
                    intermediary: [[], Validators.required], // Multi-select control
                    frequency: [[], Validators.required],   // Multi-select control
                    premiumtype: [[], Validators.required], // Multi-select control

                    limitedPremium1: ['', [Validators.required, Validators.min(10), Validators.max(99)]],
                    limitedPremium2: ['', [Validators.required, Validators.min(10), Validators.max(99)]],
                    limitedPremium3: ['', [Validators.required, Validators.min(10), Validators.max(99)]],
                    limitedPremium4: ['', [Validators.required, Validators.min(10), Validators.max(99)]],
                    launchDate: [null, Validators.required],

                    exitDate: [null, Validators.required],
                    clawBack: [null, Validators.required],
                    chequeClearance: [null, Validators.required],
                    bonusCommissionEligibility: [false, Validators.required],
                    bonusCommissionPercentage: [{ value: '', disabled: true }]
                  });
    }

    loadDropdowns() {
        this.productsService.getConfigByCategory('ProductType').subscribe((data: AppConfig[]) => {
            this.productTypes = data.map(item => ({ name: item.configValue, code: item.configKey }));
        });

        this.productsService.getConfigByCategory('Frequency').subscribe((data: AppConfig[]) => {
            this.frequency = data.map(item => ({ name: item.configValue, code: item.configKey }));
        });

        this.productsService.getConfigByCategory('Intermediary').subscribe((data: AppConfig[]) => {
            this.intermediatries = data.map(item => ({ name: item.configValue, code: item.configKey }));
        });

        this.productsService.getConfigByCategory('Installment Premium').subscribe((data: AppConfig[]) => {
            this.paymentOptions = data.map(item => ({ name: item.configValue, code: item.configKey }));
        });

    this.productsService.getConfigByCategory('Applicable').subscribe((data: AppConfig[]) => {
                        this.applicable = data.map((item: AppConfig) => ({
                             name: item.configValue,
                             code: item.configKey
                        }));
                    });

            this.profileForm.get('bonusCommissionEligibility')?.valueChanges.subscribe((value) => {

                const bonusCommissionPercentageControl = this.profileForm.get('bonusCommissionPercentage');
                if (value) {
                  bonusCommissionPercentageControl?.enable();
                } else {
                  bonusCommissionPercentageControl?.reset();
                  bonusCommissionPercentageControl?.disable();
                }
              });
    }

    patchForm(product: Products) {
        this.createdDate = product.createdAt;
        console.log("X", product.intermediary);
                    console.log("Age Min", product.minAgeAtEntry);
                    console.log("Age max", product.maxAgeAtEntry);
                    console.log("Product Name", product.name);
                    console.log("Product Type", product.bonusCommissionEligibility === 'Y');
                    console.log("Product", product);

        let intermediaryOptions: ProductsData[] = [];
        if (product.productsDataList) {
          intermediaryOptions = product.productsDataList.filter(
            data => data.category === 'Intermediary'
          );
        }

    let frequencyOptions: ProductsData[] = [];
            if (product.productsDataList) {
              frequencyOptions = product.productsDataList.filter(
                data => data.category === 'Frequency'
              );
            }

        let premiumtypeOptions: ProductsData[] = [];
                    if (product.productsDataList) {
                      premiumtypeOptions = product.productsDataList.filter(
                        data => data.category === 'Installment Premium'
                      );
                    }

    console.log("Intermediary", intermediaryOptions);
    console.log("ProductsData", product.productsDataList)

        this.profileForm.patchValue({
              name: product.name,
              plan_code: product.plan_code,
              type: product.type,
              uinNumber: product.uinNumber,
              intermediary: intermediaryOptions.map(option => option.configKey),
              frequency: frequencyOptions.map(option => option.configKey),
              premiumtype: premiumtypeOptions.map(option => option.configKey),
              limitedPremium1: product.limitedPremium1,
              limitedPremium2: product.limitedPremium2,
              limitedPremium3: product.limitedPremium3,
              limitedPremium4: product.limitedPremium4,
              launchDate: new Date(product.launchDate),
              exitDate: new Date(product.exitDate),
              clawBack: product.clawback,
              chequeClearance: product.chequeClearance,
              bonusCommissionEligibility: product.bonusCommissionEligibility === 'Y',
              bonusCommissionPercentage: product.bonusCommissionPercentage
            });

            this.setMinMaxValuesFromData(product);

    }

setMinMaxValuesFromData(data: any) {
  // Age at Entry
  this.ageAtEntryComponent.minValue = data.min_AgeAtEntry;
  this.ageAtEntryComponent.maxValue = data.max_AgeAtEntry;

  // Maturity Age
  this.maturityAgeComponent.minValue = data.min_MaturityAge;
  this.maturityAgeComponent.maxValue = data.max_MaturityAge;

  // Regular Premium
  this.regularPremiumComponent.minValue = data.min_RegularPremium;
  this.regularPremiumComponent.maxValue = data.max_RegularPremium;

  // Policy Term
  this.policyTermComponent.minValue = data.min_PolicyTerm;
  this.policyTermComponent.maxValue = data.max_PolicyTerm;

  // Installment Premium Yearly
  this.installmentPremiumYearlyComponent.minValue = data.min_InstallmentPremiumYearly;
  this.installmentPremiumYearlyComponent.maxValue = data.max_InstallmentPremiumYearly;

  // Installment Premium Half-Yearly
  this.installmentPremiumHalfYearlyComponent.minValue = data.min_InstallmentPremiumHalfYearly;
  this.installmentPremiumHalfYearlyComponent.maxValue = data.max_InstallmentPremiumHalfYearly;

  // Installment Premium Quarterly
  this.installmentPremiumQuarterlyComponent.minValue = data.min_InstallmentPremiumQuarterly;
  this.installmentPremiumQuarterlyComponent.maxValue = data.max_InstallmentPremiumQuarterly;

  // Installment Premium Monthly
  this.installmentPremiumMonthlyComponent.minValue = data.min_InstallmentPremiumMonthly;
  this.installmentPremiumMonthlyComponent.maxValue = data.max_InstallmentPremiumMonthly;

  // Single Premium Amount
  this.singlePremiumAmountComponent.minValue = data.min_SinglePremiumAmount;
  this.singlePremiumAmountComponent.maxValue = data.max_SinglePremiumAmount;

  // Annuity Purchase Price
  this.annuityPurchasePriceComponent.minValue = data.min_AnnuityPurchasePrice;
  this.annuityPurchasePriceComponent.maxValue = data.max_AnnuityPurchasePrice;

  // Sum Assured
  this.sumAssuredComponent.minValue = data.min_SumAssured;
  this.sumAssuredComponent.maxValue = data.max_SumAssured;
}

    save() {
        console.log("Profile Form values", this.profileForm.value);
        //         console.log("Min -", sumAssuredMin)
        //         console.log("Max -", sumAssuredMax)
                if (this.profileForm.invalid) {
                    console.log("Form is Invalid")
                    this.profileForm.markAllAsTouched(); // trigger validation messages
                    // Debug invalid controls
                        Object.keys(this.profileForm.controls).forEach(key => {
                            const control = this.profileForm.get(key);
                            if (control?.invalid) {
                                console.log(`Control: ${key}, Errors:`, control.errors);
                            }
                        });
                    return;
                }


        const form = this.profileForm.controls;
        //         const clawbackValue = this.profileForm.get('clawback')?.value;
        //         console.log('Clawback Value:', clawbackValue);

                var minMax = this.minMaxValues['ageAtEntry'];
                const minAgeAtEntry = this.ageAtEntryComponent.minValue;//minMax?.minValue || 0;
                const maxAgeAtEntry = this.ageAtEntryComponent.maxValue;//minMax?.maxValue || 120;

                minMax = this.minMaxValues['maturityAge'];
                const minMaturityAge = this.maturityAgeComponent.minValue;//minMax?.minValue || 0;
                const maxMaturityAge = this.maturityAgeComponent.maxValue;//minMax?.maxValue || 120;

                minMax = this.minMaxValues['regularPremium'];
                const minRegularPremium = this.regularPremiumComponent.minValue;//minMax?.minValue || 0;
                const maxRegularPremium = this.regularPremiumComponent.maxValue;//minMax?.maxValue || 120;

                minMax = this.minMaxValues['policyTerm'];
                const minPolicyTerm = this.policyTermComponent.minValue;//minMax?.minValue || 0;
                const maxPolicyTerm = this.policyTermComponent.maxValue;//minMax?.maxValue || 120;

                minMax = this.minMaxValues['installmentPremiumYearly'];
                const minInstallmentPremiumYearly = this.installmentPremiumYearlyComponent.minValue;//minMax?.minValue || 0;
                const maxInstallmentPremiumYearly = this.installmentPremiumYearlyComponent.maxValue;//minMax?.maxValue || 120;

                minMax = this.minMaxValues['installmentPremiumHalfYearly'];
                const minInstallmentPremiumHalfYearly = this.installmentPremiumHalfYearlyComponent.minValue;//minMax?.minValue || 0;
                const maxInstallmentPremiumHalfYearly = this.installmentPremiumHalfYearlyComponent.maxValue;//minMax?.maxValue || 120;

                minMax = this.minMaxValues['installmentPremiumQuarterly'];
                const minInstallmentPremiumQuarterly = this.installmentPremiumQuarterlyComponent.minValue;//minMax?.minValue || 0;
                const maxInstallmentPremiumQuarterly = this.installmentPremiumQuarterlyComponent.maxValue;//minMax?.maxValue || 120;

                minMax = this.minMaxValues['installmentPremiumMonthly'];
                const minInstallmentPremiumMonthly = this.installmentPremiumMonthlyComponent.minValue;//minMax?.minValue || 0;
                const maxInstallmentPremiumMonthly = this.installmentPremiumMonthlyComponent.maxValue;//minMax?.maxValue || 120;

                minMax = this.minMaxValues['singlePremiumAmount'];
                const minSinglePremiumAmount = this.singlePremiumAmountComponent.minValue; //minMax?.minValue || 0;
                const maxSinglePremiumAmount = this.singlePremiumAmountComponent.maxValue; //minMax?.maxValue || 120;

                minMax = this.minMaxValues['annuityPurchasePrice'];
                const minAnnuityPurchasePrice = this.annuityPurchasePriceComponent.minValue;//minMax?.minValue || 0;
                const maxAnnuityPurchasePrice = this.annuityPurchasePriceComponent.maxValue;//minMax?.maxValue || 120;

                minMax = this.minMaxValues['sumAssured'];
                const minSumAssured = this.sumAssuredComponent.minValue;//minMax?.minValue || 0;
                const maxSumAssured = this.sumAssuredComponent.maxValue;//minMax?.maxValue || 120;

                const productType: Products = {
                        id: this.editingId ?? 0,
                        company_code: 'xyz',
                        name: form['name'].value,
                        plan_code: form['plan_code'].value,
                        type: form['type'].value,
                        uinNumber: form['uinNumber'].value,
                         intermediary: form['intermediary'].value,
                         frequency: form['frequency'].value,
                         premiumtype: form['premiumtype'].value,
                        minAgeAtEntry: +minAgeAtEntry || 0,
                        maxAgeAtEntry: +maxAgeAtEntry || 120,
                        minMaturityAge: +minMaturityAge || 0,
                        maxMaturityAge: +maxMaturityAge || 120,
                        minRegularPremium: +minRegularPremium || 0,
                        maxRegularPremium: +maxRegularPremium || 120,
                        minPolicyTerm: +minPolicyTerm || 0,
                        maxPolicyTerm: +maxPolicyTerm || 120,
                        minInstallmentPremiumYearly: +minInstallmentPremiumYearly || 0,
                        maxInstallmentPremiumYearly: +maxInstallmentPremiumYearly || 120,
                        minInstallmentPremiumHalfYearly: +minInstallmentPremiumHalfYearly || 0,
                        maxInstallmentPremiumHalfYearly: +maxInstallmentPremiumHalfYearly || 120,
                        minInstallmentPremiumQuarterly: +minInstallmentPremiumQuarterly || 0,
                        maxInstallmentPremiumQuarterly: +maxInstallmentPremiumQuarterly || 120,
                        minInstallmentPremiumMonthly: +minInstallmentPremiumMonthly || 0,
                        maxInstallmentPremiumMonthly: +maxInstallmentPremiumMonthly || 120,
                        minSinglePremiumAmount: +minSinglePremiumAmount || 0,
                        maxSinglePremiumAmount: +maxSinglePremiumAmount || 120,
                        minAnnuityPurchasePrice: +minAnnuityPurchasePrice || 0,
                        maxAnnuityPurchasePrice: +maxAnnuityPurchasePrice || 120,
                        minSumAssured: +minSumAssured || 0,
                        maxSumAssured: +maxSumAssured || 120,

                        limitedPremium1: form['limitedPremium1'].value,
                        limitedPremium2: form['limitedPremium2'].value,
                        limitedPremium3: form['limitedPremium3'].value,
                        limitedPremium4: form['limitedPremium4'].value,
                        launchDate: new Date(form['launchDate'].value).toISOString(),

                        exitDate: new Date(form['exitDate'].value).toISOString(),
                        clawback: form['clawBack'].value, //form['clawback']?.value ? 'Y' : 'N',
                        bonusCommissionEligibility: this.chkEligibility,//form['bonusCommissionEligibility']?.value ? 'Y' : 'N',
                        chequeClearance: form['chequeClearance'].value,
                        bonusCommissionPercentage: form['bonusCommissionPercentage']?.value ? form['bonusCommissionPercentage']?.value : '0.0',

                        createdBy: localStorage.getItem('loginid') ?? '***',
                        modifiedBy: localStorage.getItem('loginid') ?? '***',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        approval_status: 'New',
                        status: 'A',
                }

                console.log(productType);

                this.productsService.updateProductType(productType, productType.id).subscribe({
                            next: (res: any) => {
                                console.log('Updated', res);
                                this.router.navigateByUrl('/profile/list');
                            },
                            error: (err: any) => console.error('Error', err)
                        });
    }

updateMinMaxValues(fieldName: string, values: { minValue: string; maxValue: string }) {
        this.minMaxValues[fieldName] = values;
        //console.log(`Updated values for ${fieldName}:`, values);
      }

    discard() {
        this.router.navigateByUrl('/profile/list');
    }

    onBonusEligibilityChange(event: any) {
        const checked = event.checked;
        const bonusCommissionPercentageControl = this.profileForm.get('bonusCommissionPercentage');
        if (checked) {
            this.chkEligibility = 'Y';
            bonusCommissionPercentageControl?.enable();
        } else {
            this.chkEligibility = 'N';
            bonusCommissionPercentageControl?.disable();
            bonusCommissionPercentageControl?.reset();
        }
        console.log('Checkbox checked:', checked); // Debug log
    }
}
