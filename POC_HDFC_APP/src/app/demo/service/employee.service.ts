import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environment/environment"
import { Employee } from "../components/models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiBaseUrl}/auth/login`;  // Adjust the URL according to your backend
  private employees: Employee[] = [];
  constructor(private http: HttpClient) {}

  login(employeeCode: string, password: string): Observable<any> {

    const body = {
      username: employeeCode,
      password: password
    };

    return this.http.post(this.apiUrl, body, {
                withCredentials: false // true only if backend uses cookies
           });
  }

  // Get the role from the token stored in localStorage
    getUserRole(): string | null {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        return decodedToken?.role    || null; // Assuming the role is stored in the 'role' field
      }
      return null;
    }

    // Check if the current user is a maker
    isMaker(): boolean {
      return this.getUserRole() === 'maker';
    }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiUrl}/active`);
      }

    saveEmployee(employee: Employee): Observable<Employee> {
          this.employees.push(employee);
          return this.http.post<Employee>(`${this.apiUrl}/create`, employee);
      }

  getEmployeeById(id: number) {
        return this.http.get<Employee>(`${this.apiUrl}/${id}`);
      }

  updateEmployee(employee: Employee, id: number): Observable<Employee> {
          this.employees.push(employee);
          return this.http.put<Employee>(`${this.apiUrl}/update/${id}`, employee);
      }


    deleteEmployee(id: number): Observable<any> {
        console.log("Delete", id);
        //Return from API is text, and explicitly mentioned response as json from text.
        return this.http.delete(`${this.apiUrl}/delete/${id}`, {
          responseType: "text" as "json",
        });
      }
}
