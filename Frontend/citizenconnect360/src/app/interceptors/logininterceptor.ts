import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted request:', req);

    // Don't modify login or register requests
    if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
      return next.handle(req);
    }

    const token = localStorage.getItem('token');
    let headers = req.headers;

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const modifiedRequest = req.clone({ headers });

    console.log('Modified request with headers:', modifiedRequest.headers);

    return next.handle(modifiedRequest);
  }
}
