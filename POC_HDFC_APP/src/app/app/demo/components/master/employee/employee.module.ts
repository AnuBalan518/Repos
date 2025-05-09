import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        EmployeeRoutingModule
    ],
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeModule { }
