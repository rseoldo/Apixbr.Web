// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/core/auth/auth.interceptor';
import { appRoutes } from './app/app.routes';
import { apiKeyInterceptor } from './app/modules/apis/interceptors/api-key.interceptor';
import { jwtInterceptor } from './app/modules/apis/interceptors/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([apiKeyInterceptor, jwtInterceptor])),
    provideRouter(appRoutes),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
.catch(err => console.error(err));
