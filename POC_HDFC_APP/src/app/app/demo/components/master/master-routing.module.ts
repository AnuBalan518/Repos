import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'employee', //data: {breadcrumb: 'Employee'},
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },

    ])],
    exports: [RouterModule]
})
export class MasterRoutingModule { }
