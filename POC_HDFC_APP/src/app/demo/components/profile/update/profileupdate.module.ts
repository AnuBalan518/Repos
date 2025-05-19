import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProfileUpdateComponent } from './profileupdate.component';
import { ProfileUpdateRoutingModule } from './profileupdate-routing.module';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { ControlsModule } from '../../controls/controls.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ProfileUpdateRoutingModule,
		ButtonModule,
		RippleModule,
		InputTextModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule,
		InputGroupModule,
        InputGroupAddonModule,
		SelectButtonModule,
		CalendarModule,
		ToolbarModule,
		ReactiveFormsModule,
		CheckboxModule,
		TagModule,
		ControlsModule,
		MultiSelectModule
	],
	declarations: [ProfileUpdateComponent]
})
export class ProfileUpdateModule { }
