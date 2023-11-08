import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'X-Token': token
      });

      const authReq = request.clone({ headers });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
