import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employeelist.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmployeeListComponent }
	])],
	exports: [RouterModule]
})
export class EmployeeListRoutingModule { }
