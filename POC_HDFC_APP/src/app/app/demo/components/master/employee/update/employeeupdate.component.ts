import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../service/employee.service';
import { AppConfig } from "../../../models/appconfig";
import { Employee } from "../../../models/employee";

@Component({
    templateUrl: './employeeupdate.component.html'
})
export class EmployeeUpdateComponent implements OnInit {

    employeeForm!: FormGroup;
    roles: any[] = [];
    editingId: number | null = null;
    createdDate: string = '';
    constructor(private router: Router,private fb: FormBuilder,
        private employeeService: EmployeeService,
        private route: ActivatedRoute) {

    }

    initGroup()
    {
        this.employeeForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            role: ['', [Validators.required]]
          });
    }

    ngOnInit() {
        this.initGroup();

        this.roles = [
            { name: 'Checker', code: 'checker' },
            { name: 'Maker', code: 'maker' }
        ];
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            this.editingId = +idParam;
            this.employeeService.getEmployeeById(this.editingId).subscribe((employee: Employee) => {
                this.patchForm(employee);
            });
        }
    }

    patchForm(employee: Employee) {
            this.createdDate = employee.createdAt;
            this.employeeForm.patchValue({
                firstname: employee.firstname,
                lastname: employee.lastname,
                username: employee.username,
                password: employee.password,
                email: employee.email,
                mobile: employee.mobile,
                role: employee.role
            });
        }

    save() {
        console.log("Update started...")
        // Check if the form is invalid
        if (this.employeeForm.invalid) {
            this.employeeForm.markAllAsTouched(); // Trigger validation messages
            // Debugging: Log the invalid controls and their errors
                    Object.keys(this.employeeForm.controls).forEach(controlName => {
                        const control = this.employeeForm.get(controlName);
                          if (control && control.invalid) {
                            console.log(`Invalid control: ${controlName}`, control.errors);
                        }
                    });
                    console.log("Invalid form...", this.employeeForm.value);
            return;
        }

        const form = this.employeeForm.controls;

        // Prepare the employee object
        const employee = {
            id: this.editingId ?? 0,
            firstname: form['firstname'].value,
            lastname: form['lastname'].value,
            username: form['username'].value,
            password: form['password'].value,
            email: form['email'].value.trim().toLowerCase(),
            mobile: form['mobile'].value.replace(/\D/g, ''),
            role: form['role'].value,
            status: 'A',
            createdAt: this.createdDate,
            updatedAt: new Date().toISOString(),
        };

        console.log('Saving Employee:', employee);

        this.employeeService.updateEmployee(employee, employee.id).subscribe({
                    next: (res: any) => {
                        console.log('Updated', res);
                        this.router.navigateByUrl('/master/employee/list');
                    },
                    error: (err: any) => console.error('Error', err)
                });
    }

    discard() {
        // Confirmation before navigation
        if (confirm('Are you sure you want to discard changes?')) {
            this.router.navigateByUrl('/master/employee/list');
        }
    }
}
