import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule
    ],
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
