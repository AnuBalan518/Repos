import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../../service/products.service';
import { AppConfig } from "../../models/appconfig";
import { Products } from "../../models/products";
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { MinMaxDisplayComponent } from '../../controls/min-max-display.component'

@Component({
    templateUrl: './profilecreate.component.html'
})
export class ProfileCreateComponent implements OnInit {

    profileForm!: FormGroup;

    productTypes: any[] = [];
    paymentOptions: any[] = [];
    applicable: any[] = [];
    frequency: any[] = [];
    intermediatries: any[] = [];
    configOptions: AppConfig[] = [];
    selectedConfigKey: string = '';
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

    constructor(private router: Router,private fb: FormBuilder,
        private productsService: ProductsService) {


    }

    initGroup()
    {
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

    ngOnInit() {
        this.initGroup();



        this.productsService.getConfigByCategory('ProductType').subscribe((data: AppConfig[]) => {
          this.productTypes = data.map((item: AppConfig) => ({
            name: item.configValue,
            code: item.configKey
          }));
        });

        this.productsService.getConfigByCategory('Frequency').subscribe((data: AppConfig[]) => {
          this.frequency = data.map((item: AppConfig) => ({
            name: item.configValue,
            code: item.configKey
          }));
        });

        this.productsService.getConfigByCategory('Intermediary').subscribe((data: AppConfig[]) => {
          this.intermediatries = data.map((item: AppConfig) => ({
            name: item.configValue,
            code: item.configKey
          }));
        });

        this.productsService.getConfigByCategory('Installment Premium').subscribe((data: AppConfig[]) => {
            this.paymentOptions = data.map((item: AppConfig) => ({
                 name: item.configValue,
                 code: item.configKey
            }));
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

    updateMinMaxValues(fieldName: string, values: { minValue: string; maxValue: string }) {
        this.minMaxValues[fieldName] = values;
        //console.log(`Updated values for ${fieldName}:`, values);
      }

    save() {
//         const sumAssuredMin = this.sumAssuredComponent.actualMinValue;
//         const sumAssuredMax = this.sumAssuredComponent.actualMaxValue;
//
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
                id: 0, // Default ID or existing one in edit mode
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

        this.productsService.saveProductType(productType).subscribe({
            next: (res: any) => console.log('Saved', res),
            error: (err: any) => console.error('Error', err)
        })
        this.router.navigateByUrl('/profile/list');
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
