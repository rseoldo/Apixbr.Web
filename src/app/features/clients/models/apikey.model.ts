export interface CreateApiKeyDto {
  expiresAt?: string; // ISO 8601
}

export interface ApiKeyResponse {
  apiKey: string;
}