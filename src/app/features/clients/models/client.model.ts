import {CreateApiKeyDto } from "./apikey.model";

export interface Client {
    id: string;
    name: string;
    description?: string;
    plan: 'Free' | 'Basic' | 'Pro' | 'Enterprise';
    createdAt: string;
    apiKeys?: CreateApiKeyDto[];
}