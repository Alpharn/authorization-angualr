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

  /**
   * Intercepts an outgoing HTTP request, adds an `X-Token` header if a token is present in
   * local storage, and then passes the modified request to the next handler in the chain.
   *
   * @param request The outgoing request object to be intercepted.
   * 
   * @param next The next interceptor in the chain, or the backend if no interceptors remain.
   * 
   * @returns An Observable of the HTTP event stream.
   */
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
