import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'create', data: {breadcrumb: 'Create'},
            loadChildren: () => import('./create/employeecreate.module').then(m => m.EmployeeCreateModule) },
        { path: 'list', data: {breadcrumb: 'List'},
            loadChildren: () => import('./list/employeelist.module').then(m => m.EmployeeListModule) },
        { path: 'update/:id', data: {breadcrumb: 'Update'},
                loadChildren: () => import('./update/employeeupdate.module').then(m => m.EmployeeUpdateModule) }
    ])],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
