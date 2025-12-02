import { HttpInterceptorFn, HttpRequest, HttpHandler } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // Pegue a chave do localStorage ou coloque fixa aqui
  const apiKey = localStorage.getItem('apiKey') || 'd2b8f6b4-4a77-4f2c-9f92-3e8a6f3c91dd-6f4e3a7b9c2d4e18f01ab53c7d92e4f1';

  // Clona a requisição adicionando o header x-api-key
  const cloned = req.clone({
    setHeaders: {
      'x-api-key': apiKey
    }
  });

  return next(cloned);
};
