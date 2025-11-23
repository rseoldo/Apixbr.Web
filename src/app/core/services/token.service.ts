// src/app/core/services/token.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private key = 'accessToken';
  private refreshKey = 'refreshToken';

  saveToken(token: string) {
    localStorage.setItem(this.key, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.key);
  }

  saveRefreshToken(token: string) {
    localStorage.setItem(this.refreshKey, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshKey);
  }

  clearToken() {
    localStorage.removeItem(this.key);
    localStorage.removeItem(this.refreshKey);
  }

  // ✅ Método necessário para AuthGuard
  isLoggedIn(): boolean {
    const token = this.getToken();
    // Aqui você pode adicionar verificação de expiração JWT se quiser
    return !!token;
  }
}
