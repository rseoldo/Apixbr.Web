// src/app/core/auth/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1) Clone request and add Authorization header if token exists
    const token = this.tokenService.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }

    // 2) Forward request and centrally handle errors (ex: 401)
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        // Opcional: tratar 401 para redirecionar ao login ou iniciar refresh
        if (err.status === 401) {
          // Limpeza local e redirecionamento
          this.tokenService.clearToken();
          // navegue para login (ou chamar fluxo de refresh)
          this.router.navigate(['/login']);
        }

        return throwError(() => err);
      })
    );
  }
}
