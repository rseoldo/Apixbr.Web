import { Injectable, signal } from '@angular/core';
import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  token = signal<string | null>(null);

  constructor(private tokenService: TokenService) {
    this.token.set(this.tokenService.getToken());
  }

  setToken(token: string) {
    this.tokenService.saveToken(token);
    this.token.set(token);
  }

  clear() {
    this.tokenService.clearToken();
    this.token.set(null);
  }
}
