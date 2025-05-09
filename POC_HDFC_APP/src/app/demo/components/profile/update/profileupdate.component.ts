import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../service/profile.service';
import { AppConfig } from "../../models/appconfig";
import { ProductType } from "../../models/producttype";

@Component({
    templateUrl: './profileupdate.component.html'
})
export class ProfileUpdateComponent implements OnInit {

    profileForm!: FormGroup;
    editingId: number | null = null;

    productTypes: any[] = [];
    paymentOptions: any[] = [];
    frequency: any[] = [];
    intermediatries: any[] = [];

    createdDate: string = '';

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private profileService: ProfileService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.initGroup();
        this.loadDropdowns();

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            this.editingId = +idParam;
            this.profileService.getProductTypeById(this.editingId).subscribe((product: ProductType) => {
                this.patchForm(product);
            });
        }
    }

    initGroup() {
        this.profileForm = this.fb.group({
            productName: ['', Validators.required],
            productType: [null, Validators.required],
            uinNumber: ['', Validators.required],
            intermediary: [null, Validators.required],
            frequency: [null, Validators.required],
            ageAtEntry: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
            maturityAge: ['', Validators.required],
            premiumTerm: ['', Validators.required],
            limitedPremiumTerm: ['', Validators.required],
            installmentType: ['', Validators.required],
            installmentPremium: ['', Validators.required],
            singlePremium: ['', Validators.required],
            sumAssured: ['', Validators.required],
            //launchDateInput: ['', Validators.required],
            launchDate: [null, Validators.required],
            exitDate: [null, Validators.required],
            clawback: [false]
        });
    }

    loadDropdowns() {
        this.profileService.getConfigByCategory('ProductType').subscribe((data: AppConfig[]) => {
            this.productTypes = data.map(item => ({ name: item.configValue, code: item.configKey }));
        });

        this.profileService.getConfigByCategory('Frequency').subscribe((data: AppConfig[]) => {
            this.frequency = data.map(item => ({ name: item.configValue, code: item.configKey }));
        });

        this.profileService.getConfigByCategory('Intermediary').subscribe((data: AppConfig[]) => {
            this.intermediatries = data.map(item => ({ name: item.configValue, code: item.configKey }));
        });

        this.profileService.getConfigByCategory('Installment Premium').subscribe((data: AppConfig[]) => {
            this.paymentOptions = data.map(item => ({ name: item.configValue, code: item.configKey }));
        });
    }

    patchForm(product: ProductType) {
        this.createdDate = product.createdAt;
        this.profileForm.patchValue({
            productName: product.name,
            productType: product.type,
            uinNumber: product.uinNumber,
            intermediary: product.intermediary,
            frequency: product.frequency,
            ageAtEntry: product.ageAtEntry,
            maturityAge: product.maturityAge,
            premiumTerm: product.premiumTerm,
            limitedPremiumTerm: product.limitedPremiumTerm,
            installmentType: product.installmentType,
            installmentPremium: product.installmentPremium,
            singlePremium: product.singlePremium,
            sumAssured: product.sumAssured,
            launchDate: new Date(product.productLaunchDate),
            exitDate: new Date(product.productExitDate),
            clawback: product.clawback === 'Y'
        });
    }

    save() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        const form = this.profileForm.controls;

        const productType: ProductType = {
            id: this.editingId ?? 0,
            name: form['productName'].value,
            type: form['productType'].value,
            uinNumber: form['uinNumber'].value,
            intermediary: form['intermediary'].value,
            frequency: form['frequency'].value,
            ageAtEntry: +form['ageAtEntry'].value,
            maturityAge: +form['maturityAge'].value,
            premiumTerm: +form['premiumTerm'].value,
            limitedPremiumTerm: +form['limitedPremiumTerm'].value,
            policyTerm: +form['premiumTerm'].value,
            installmentType: form['installmentType'].value,
            installmentPremium: form['installmentPremium'].value,
            singlePremium: +form['singlePremium'].value,
            annuityPurchasePrice: 0,
            sumAssured: +form['sumAssured'].value,
            productLaunchDate: new Date(form['launchDate'].value).toISOString(),
            productExitDate: new Date(form['exitDate'].value).toISOString(),
            clawback: form['clawback']?.value ? 'Y' : 'N',
            createdAt: this.createdDate,//new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            approvalstatus: 'New',
            status: 'A'
        };
        console.log(productType)
        this.profileService.updateProductType(productType, productType.id).subscribe({
            next: (res: any) => {
                console.log('Updated', res);
                this.router.navigateByUrl('/profile/list');
            },
            error: (err: any) => console.error('Error', err)
        });
    }

    discard() {
        this.router.navigateByUrl('/profile/list');
    }
}
