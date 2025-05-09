import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeUpdateComponent } from './employeeupdate.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmployeeUpdateComponent }
	])],
	exports: [RouterModule]
})
export class EmployeeUpdateRoutingModule { }
