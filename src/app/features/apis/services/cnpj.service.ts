import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface CnpjEntity {
  cnpj: string;
  nome: string;
  nome_fantasia: string;
  situacao: string;
  tipo: string;
  abertura: string;
  natureza_juridica: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  telefone: string;
  email: string;
  consultaEm: string;
  cnaes_secundarios: CnaesSecundarios[];
}

interface CnaesSecundarios{
  codigo: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class CnpjService {
  private apiUrl = `${environment.apiUrl}/cnpj`;

  constructor(private http: HttpClient) { }

  getCnpj(cnpj: string): Observable<CnpjEntity> {
    return this.http.get<CnpjEntity>(`${this.apiUrl}/v1/${cnpj}`).pipe(
      catchError(err => {
        if(err.status === 404) return throwError(() => ({ message: 'CNPJ não encontrado' }));
        if(err.status === 429) return throwError(() => ({ message: 'Limite de consultas atingido' }));
        return throwError(() => ({ message: 'Erro ao consultar CNPJ' }));
      })
    );
  }
}
