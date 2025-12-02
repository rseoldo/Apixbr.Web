export interface ApiEndpoint {
  id: number;
  apiDefinitionId: number;
  path: string;
  httpMethod: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH';
  description?: string;
  enabled: boolean;
}