import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { environment } from '../../../environments/environment';
import { User } from '../../features/clients/models/user.model';
import { PlanEnum } from '../enums/plan.enum';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  // Armazena os dados do usuário de forma reativa
  private usuarioSubject = new BehaviorSubject<any | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.carregarUsuarioDoToken();
  }

  // -------------------------------
  // LOGIN
  // -------------------------------
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/account/login`, { email, password })
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.accessToken);
          this.extrairUsuarioDoToken(res.accessToken);

          // 🔥 já temos os dados do usuário no backend — então atualize também:
          this.usuarioSubject.next(res.user);
        })
      );
  }


  // -------------------------------
  // REGISTRO
  // -------------------------------
  register(name: string, email: string, password: string, plan: PlanEnum): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/register`, { name, email, password, plan });
  }

  // -------------------------------
  // LOGOUT
  // -------------------------------
  logout() {
    this.tokenService.clearToken();
    this.usuarioSubject.next(null);
  }

  // -------------------------------
  // CARREGAR USUÁRIO DO TOKEN AO DAR F5
  // -------------------------------
  private carregarUsuarioDoToken() {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.warn('Nenhum token encontrado no armazenamento.');
      this.usuarioSubject.next(null);
      return;
    }

    const usuario = this.extrairUsuarioDoToken(token);

    if (!usuario) {
      console.warn('Não foi possível extrair o usuário do token.');
      this.usuarioSubject.next(null);
      return;
    }

    this.usuarioSubject.next(usuario);
  }


  // -------------------------------
  // EXTRAI NOME, EMAIL E ID DO JWT
  // -------------------------------
  private extrairUsuarioDoToken(token: string | null) {
    try {
      if (!token || token.split('.').length !== 3) {
        console.warn('Token inválido ou inexistente:', token);
        return null;
      }

      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));

      return {
        id: decoded.sub,
        email: decoded.unique_name || decoded.email,
        name: decoded.unique_name || decoded.name
      };

    } catch (error) {
      console.error('Erro ao decodificar token', error);
      return null;
    }
  }


  // Getter opcional (acesso imediato)
  get usuarioAtual() {
    return this.usuarioSubject.value;
  }
}
