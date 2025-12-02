import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Client {
    id: string;
    name: string;
    email: string;
    plan: string;
    isActive: boolean;
    apiKey?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminClientService {
    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiUrl}/admin/clients`);
    }

    regenerateKey(clientId: string): Observable<{ name: string, apiKey: string }> {
        return this.http.post<{ name: string, apiKey: string }>(`${this.apiUrl}/admin/clients/${clientId}/regenerate`, {});
    }

    toggleClient(clientId: string): Observable<{ id: string, isActive: boolean }> {
        return this.http.post<{ id: string, isActive: boolean }>(`${this.apiUrl}/admin/clients/${clientId}/toggle`, {});
    }
}
