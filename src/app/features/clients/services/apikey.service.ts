import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { ApiKeyResponse, CreateApiKeyDto } from "../models/apikey.model";

@Injectable({ providedIn: 'root' })
export class ApiKeyService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/apikeys`
            
    generateApiKey(clientId: string, dto: CreateApiKeyDto): Observable<ApiKeyResponse> {
        return this.http.post<ApiKeyResponse>(`${this.apiUrl}/${clientId}/generate-key`, {});
    }

    regenerateKey(clientId: string): Observable<{ apiKey: string }> {
        return this.http.post<{ apiKey: string }>(`${this.apiUrl}/${clientId}/regenerate`, {});
    }
}