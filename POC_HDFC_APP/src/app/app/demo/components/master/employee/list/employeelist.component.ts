import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from '../../../../service/employee.service';
import { Employee } from '../../../models/employee';
import { Router } from '@angular/router';
import { createDefaultEmployee } from '../../../utils/employee.util';

@Component({
  //selector: 'app-employee-list',
  templateUrl: './employeelist.component.html',
  providers: [ConfirmationService, MessageService],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employeeCols: any[] = [];
  selectedEmployees: Employee[] = [];
  deleteEmployeeDialog: boolean = false;
  employee: Employee | null = null;
  submitted: boolean = false;
  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.initColumns();
    this.loadEmployees();
  }

  initColumns(): void {
    this.employeeCols = [
      { field: 'firstname', header: 'First Name' },
      { field: 'lastname', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'role', header: 'Role' },
    ];
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load employees.',
        });
      },
    });
  }

  onGlobalFilter(dt: any, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    dt.filterGlobal(value, 'contains');
  }

  editEmployee(employee: Employee): void {
    this.employee = { ...createDefaultEmployee(), ...employee } as Employee;
    console.log('Employee ID:', this.employee.id);
    if (!this.employee.id) {
      console.error('Employee ID is missing!');
      return;
    }
    this.router.navigate(['master/employee/update', this.employee.id]);
    //this.router.navigate(['master/employee/create']);
    console.log('Edit Employee:', this.employee);
  }

  openNewEmployee(){
      this.employee = createDefaultEmployee();
      this.submitted = false;
      this.router.navigate(['master/employee/create'])
  }

  confirmDeleteEmployee(employee: Employee): void {
    this.employee = employee;
    this.deleteEmployeeDialog = true;
  }

  deleteEmployee(): void {
    if (this.employee) {
      this.employeeService.deleteEmployee(+this.employee.id).subscribe({
        next: () => {
          this.employees = this.employees.filter((emp) => emp.id !== this.employee?.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Employee Deleted',
          });
          this.deleteEmployeeDialog = false;
          this.employee = null;
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete employee.',
          });
          this.deleteEmployeeDialog = false;
        },
      });
    }
  }

  deleteSelectedEmployees(): void {
    console.log('Delete button clicked');
    if (!this.selectedEmployees || this.selectedEmployees.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No employees selected for deletion.',
      });
      return;
    }

    const ids = this.selectedEmployees.map((emp) => emp.id);

    ids.forEach((id) => {
      const employeeToDelete = this.employees.find((emp) => emp.id === id);

      if (employeeToDelete) {
        this.employeeService.deleteEmployee(+employeeToDelete.id).subscribe({
          next: () => {
            // Update employee list and remove the deleted employee
            this.employees = this.employees.filter((emp) => emp.id !== employeeToDelete.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: `Employee ${employeeToDelete.firstname} Deleted`,
            });

            // Remove employee from selected list
            this.selectedEmployees = this.selectedEmployees.filter((emp) => emp.id !== employeeToDelete.id);
          },
          error: (err) => {
            console.error(`Error deleting employee ${employeeToDelete.firstname}:`, err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed to delete employee ${employeeToDelete.firstname}.`,
            });
          },
        });
      }
    });
  }



  exportEmployees(): void {
    // Logic to export employees (e.g., to CSV or Excel)
    console.log('Exporting employees...');
  }
}
