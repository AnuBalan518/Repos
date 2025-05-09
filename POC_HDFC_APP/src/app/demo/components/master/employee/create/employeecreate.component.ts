import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../../service/employee.service';
import { AppConfig } from "../../../models/appconfig";
import { Employee } from "../../../models/employee";

@Component({
    templateUrl: './employeecreate.component.html'
})
export class EmployeeCreateComponent implements OnInit {

    employeeForm!: FormGroup;
    roles: any[] = [];
    constructor(private router: Router,private fb: FormBuilder,
        private employeeService: EmployeeService) {

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
    }

    save() {
        console.log("Save started...")
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
            id: 0, // Default to 0 for new entries
            firstname: form['firstname'].value,
            lastname: form['lastname'].value,
            username: form['username'].value,
            password: form['password'].value,
            email: form['email'].value.trim().toLowerCase(),
            mobile: form['mobile'].value.replace(/\D/g, ''),
            role: form['role'].value,
            status: 'A',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        console.log('Saving Employee:', employee);

        //Call the service to save the employee
        this.employeeService.saveEmployee(employee).subscribe({
            next: (response: any) => {
                console.log('Save successful:', response);
                this.router.navigateByUrl('/master/employee/list'); // Navigate to employee list after saving
            },
            error: (error: any) => {
                console.error('Save failed:', error);
                // Show a user-friendly message or handle specific errors
                alert('An error occurred while saving the employee details. Please try again.');
            }
        });
    }

    discard() {
        // Confirmation before navigation
        if (confirm('Are you sure you want to discard changes?')) {
            this.router.navigateByUrl('/master/employee/list');
        }
    }

}
