import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../../service/profile.service';
import { AppConfig } from "../../models/appconfig";
import { ProductType } from "../../models/producttype";
import { TagModule } from 'primeng/tag';

@Component({
    templateUrl: './profilecreate.component.html'
})
export class ProfileCreateComponent implements OnInit {

    profileForm!: FormGroup;

    productTypes: any[] = [];
    paymentOptions: any[] = [];
    frequency: any[] = [];
    intermediatries: any[] = [];
    configOptions: AppConfig[] = [];
    selectedConfigKey: string = '';

    constructor(private router: Router,private fb: FormBuilder,
        private profileService: ProfileService) {

    }

    initGroup()
    {
        this.profileForm = this.fb.group({
            productName: ['', Validators.required],
            productType: [null, Validators.required],
            uinNumber: ['', Validators.required],
            intermediary: [null, Validators.required],
            frequency: [null, Validators.required],
            ageAtEntry: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
            maturityAge: ['', [Validators.required]],
            premiumTerm: ['', Validators.required],
            limitedPremiumTerm: ['', Validators.required],
            //chooseOne: ['1', Validators.required],
            installmentType: ['', Validators.required],
            installmentPremium: ['', Validators.required],
            singlePremium: ['', Validators.required],
            sumAssured: ['', Validators.required],
            //launchDateInput: ['', Validators.required],
            clawback: [false],
            launchDate: [null, Validators.required],
            exitDate: [null, Validators.required]
          });
    }

    ngOnInit() {
        this.initGroup();

        this.profileService.getConfigByCategory('ProductType').subscribe((data: AppConfig[]) => {
          this.productTypes = data.map((item: AppConfig) => ({
            name: item.configValue,
            code: item.configKey
          }));
        });

        this.profileService.getConfigByCategory('Frequency').subscribe((data: AppConfig[]) => {
          this.frequency = data.map((item: AppConfig) => ({
            name: item.configValue,
            code: item.configKey
          }));
        });

        this.profileService.getConfigByCategory('Intermediary').subscribe((data: AppConfig[]) => {
          this.intermediatries = data.map((item: AppConfig) => ({
            name: item.configValue,
            code: item.configKey
          }));
        });

        this.profileService.getConfigByCategory('Installment Premium').subscribe((data: AppConfig[]) => {
            this.paymentOptions = data.map((item: AppConfig) => ({
                 name: item.configValue,
                 code: item.configKey
            }));
        });

//         this.paymentOptions = [
//             { name: 'Yearly', value: 1 },
//             { name: 'Half Yearly', value: 2 },
//             { name: 'Quarterly', value: 3 },
//             { name: 'Monthly', value: 4 },
//             { name: 'Single', value: 5 }
//         ];
    }

    save() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched(); // trigger validation messages
            return;
        }

        const form = this.profileForm.controls;

//         const productType: ProductType = {
//             ...this.profileForm.value,
//             productLaunchDate: new Date(form['launchDate'].value).toISOString(),
//             productExitDate: new Date(form['exitDate'].value).toISOString(),
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString()
//             }
        const clawbackValue = this.profileForm.get('clawback')?.value;
        console.log('Clawback Value:', clawbackValue);
        const productType: ProductType = {
            id: 0, // or existing ID if editing
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
            //installmentType: form['chooseOne'].value === 'installment' ? 'INSTALLMENT' : 'SINGLE',
            installmentPremium: form['installmentPremium'].value,
            singlePremium: +form['singlePremium'].value,
            annuityPurchasePrice: 0, // You can replace it if input exists
            sumAssured: +form['sumAssured'].value,
            productLaunchDate: new Date(form['launchDate'].value).toISOString(),
            productExitDate: new Date(form['exitDate'].value).toISOString(),
            //clawback: form['clawback']?. 'Y' : 'N',
            clawback: clawbackValue ? 'Y' : 'N',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            approvalstatus: 'New',
            status: 'A'
        };

        console.log(productType);

        this.profileService.saveProductType(productType).subscribe({
            next: (res: any) => console.log('Saved', res),
            error: (err: any) => console.error('Error', err)
        })
        this.router.navigateByUrl('/profile/list');
    }

    discard() {
        this.router.navigateByUrl('/profile/list');
    }
}
