import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiKeyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const apiKey = localStorage.getItem('apiKey'); // chave salva no login

    if (apiKey) {
      const cloned = req.clone({
        setHeaders: { 'X-API-KEY': apiKey } // ⚠️ header esperado pelo backend
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
