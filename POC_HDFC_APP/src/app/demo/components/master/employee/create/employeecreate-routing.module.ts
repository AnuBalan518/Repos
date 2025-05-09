import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './employeecreate.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmployeeCreateComponent }
	])],
	exports: [RouterModule]
})
export class EmployeeCreateRoutingModule { }
