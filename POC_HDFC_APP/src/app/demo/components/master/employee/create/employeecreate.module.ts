import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EmployeeCreateComponent } from './employeecreate.component';
import { EmployeeCreateRoutingModule } from './employeecreate-routing.module';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService } from 'primeng/api/confirmationservice';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
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
		EmployeeCreateRoutingModule
	],
	declarations: [EmployeeCreateComponent],
})
export class EmployeeCreateModule { }
