import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiDefinition } from './apiDefinition';
import { ApiEndpoint } from './apiEndpoint';

@Injectable({ providedIn: 'root' })
export class ApisService {
  private base = '/api/apis';

  constructor(private http: HttpClient) {}

  getMyApis(): Observable<ApiDefinition[]> {
    return this.http.get<ApiDefinition[]>(this.base);
  }

  getApi(id: number) { return this.http.get<ApiDefinition>(`${this.base}/${id}`); }
  createApi(dto: Partial<ApiDefinition>) { return this.http.post(this.base, dto); }
  updateApi(id: number, dto: Partial<ApiDefinition>) { return this.http.put(`${this.base}/${id}`, dto); }
  deleteApi(id: number) { return this.http.delete(`${this.base}/${id}`); }

  addEndpoint(apiId: number, endpoint: Partial<ApiEndpoint>) {
    return this.http.post(`${this.base}/${apiId}/endpoints`, endpoint);
  }

  updateEndpoint(endpointId: number, endpoint: Partial<ApiEndpoint>) {
    return this.http.put(`${this.base}/endpoints/${endpointId}`, endpoint);
  }

  testInvoke(dto: { url: string; method: string; body?: any }) {
    return this.http.post('/api/apitest/invoke', dto, { responseType: 'json' });
  }
}
