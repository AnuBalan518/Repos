import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        MasterRoutingModule
    ],
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MasterModule { }
