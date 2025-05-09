import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environment/environment"

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiBaseUrl}/auth/login`;  // Adjust the URL according to your backend

  constructor(private http: HttpClient) {}

  login(employeeCode: string, password: string): Observable<any> {

    const body = {
      name: employeeCode,
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
}
