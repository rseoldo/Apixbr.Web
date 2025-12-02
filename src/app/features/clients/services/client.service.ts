import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../../shared/models/client/client.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientsService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/clients`

    getAll(): Observable<Client[]> {
        return this.http.get<Client[]>(this.apiUrl);
    }

    getById(id: string): Observable<Client> {
        return this.http.get<Client>(`${this.apiUrl}/${id}`);
    }

    create(data: Partial<Client>): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, data);
    }

    update(id: string, data: Partial<Client>): Observable<Client> {
        return this.http.put<Client>(`${this.apiUrl}/${id}`, data);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}