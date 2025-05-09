import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip adding token for login requests
    if (req.url.includes('/auth/login')) {
        return next.handle(req);
    }

    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Clone the request and add the Authorization header
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Send the cloned request to the next handler
      return next.handle(cloned);
    }

    // If no token, just proceed with the request
    return next.handle(req);
  }
}
