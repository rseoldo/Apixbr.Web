import { ApiEndpoint } from "./api-endpoint.model";


export interface ApiDefinition {
  id: number;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  endpoints?: ApiEndpoint[];
}