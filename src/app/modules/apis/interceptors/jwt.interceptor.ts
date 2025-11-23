import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  const cloned = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  // ✅ Com HttpHandlerFn, basta chamar next(cloned)
  return next(cloned);
};
