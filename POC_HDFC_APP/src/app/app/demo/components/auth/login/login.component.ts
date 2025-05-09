import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../service/employee.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      employeeCode: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.loginForm.valid) {
      const { employeeCode, password } = this.loginForm.value;
      console.log("User Name:", employeeCode);
      console.log("Password:", password);
      this.employeeService.login(employeeCode, password).subscribe(
        (response: any) => {
          console.log("User validated");
          this.loginError = false;
          localStorage.setItem('token', response.token);
          localStorage.setItem('firstname', response.firstname);
          localStorage.setItem('role', response.role);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
            this.loginError = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid credentials, please try again.'
          });
          this.router.navigate(['/error']);
        }
      );
    }
  }
}
